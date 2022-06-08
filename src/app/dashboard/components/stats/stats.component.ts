import { CommitActivity, CommitInfo } from 'src/app/shared/models/commits.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

import { DashboardService } from '../../services/dashboard-service.service';
import { FormControl } from '@angular/forms';
import { Repo } from 'src/app/shared/models/repos.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user?: User;
  repos: Repo[] = [];
  commitActivities: CommitActivity[] = [];
  commitList: CommitInfo[] = [];
  repoLanguages: any = {};
  repoFormControl = new FormControl();
  intervalInMilliseconds = 900000;
  timer = interval(this.intervalInMilliseconds);
  constructor(
    private dashboardService: DashboardService,
    private alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.setUser();
    this.getRepos();
    this.subscriptions.push(
      this.repoFormControl.valueChanges.subscribe((res) => {
        let userNameAndRepo = res.full_name;
        this.fetchData(userNameAndRepo);
        this.startTimer();
      })
    );
  }

  fetchData(userNameAndRepo: string) {
    this.reset();
    this.getCommitList(userNameAndRepo);
    this.getRepoLanguages(userNameAndRepo);
    this.getCommitActivities(userNameAndRepo);
  }

  startTimer() {
    this.subscriptions.push(
      this.timer.subscribe(() => {
        if (this.repoFormControl.value) {
          this.fetchData(this.repoFormControl.value.full_name);
        }
      })
    );
  }

  setUser() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  getRepos() {
    this.subscriptions.push(
      this.dashboardService.getAllRepos().subscribe((res) => {
        this.repos = res;
      })
    );
  }

  getRepoLanguages(userNameAndRepo: string) {
    this.subscriptions.push(
      this.dashboardService
        .getRepoLanguages(userNameAndRepo)
        .subscribe((res) => {
          if (JSON.stringify(res) !== '{}') {
            this.repoLanguages = res;
          } else {
            this.showErrorAlert('languages');
          }
        })
    );
  }

  getCommitActivities(userNameAndRepo: string) {
    this.subscriptions.push(
      this.dashboardService
        .getCommitActivity(userNameAndRepo)
        .subscribe((res) => {
          if (res?.length > 0) {
            this.commitActivities = res;
          } else {
            this.showErrorAlert('commits');
          }
        })
    );
  }

  getCommitList(userNameAndRepo: string) {
    this.subscriptions.push(
      this.dashboardService
        .getCommits(userNameAndRepo)
        .subscribe((res: CommitInfo[]) => {
          if (res?.length > 0) {
            if (res.length >= 5) {
              this.commitList = res.slice(0, 5);
            } else {
              this.commitList = res;
            }
          } else {
            this.showErrorAlert('commits');
          }
        })
    );
  }

  showErrorAlert(variant: string) {
    this.alertService.open(`No ${variant} found in the last year`, {
      label: `No ${variant} found`,
      autoClose: true,
      status: TuiNotification.Error,
    });
  }

  reset() {
    this.commitActivities = [];
    this.commitList = [];
    this.repoLanguages = {};
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
