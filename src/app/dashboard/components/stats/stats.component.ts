import {
  CommitActivity,
  CommitInfo,
} from 'src/app/shared/models/commits.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subscription,
  interval,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
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

  repoFormControl: FormControl = new FormControl();

  user: User = JSON.parse(localStorage.getItem('user')!);

  repos$: Observable<Repo[]> = this.dashboardService
    .getAllRepos()
    .pipe(shareReplay(1));

  repoLanguages$ = this.getRepoLanguages();

  commitActivities$ = this.getCommitActivities();

  commitList$ = this.getCommitList();

  intervalInMilliseconds = 900000;
  // timer = interval(this.intervalInMilliseconds);

  constructor(
    private dashboardService: DashboardService,
    private alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    // this.subscriptions.push(
    //   this.repoFormControl.valueChanges.subscribe((res) => {
    //     console.log('form changes', res);
    //     // let userNameAndRepo = res.full_name;
    //     // this.fetchData(userNameAndRepo);
    //     // this.startTimer();
    //   })
    // );
  }

  fetchData(userNameAndRepo: string) {
    this.reset();
    // this.getCommitList(userNameAndRepo);
    // this.getRepoLanguages(userNameAndRepo);
    // this.getCommitActivities(userNameAndRepo);
  }

  startTimer() {
    // this.subscriptions.push(
    //   this.timer.subscribe(() => {
    //     if (this.repoFormControl.value) {
    //       this.fetchData(this.repoFormControl.value.full_name);
    //     }
    //   })
    // );
    // return interval(this.intervalInMilliseconds).pipe();
  }

  getRepoLanguages() {
    return this.repoFormControl.valueChanges.pipe(
      switchMap((value) => {
        if (value) {
          return this.dashboardService.getRepoLanguages(value.full_name);
        } else {
          return EMPTY;
        }
      }),
      tap((res) => {
        if (res && Object.keys(res)?.length > 0) {
          return res;
        } else {
          this.showErrorAlert('languages');
          return null;
        }
      })
    );
  }

  getCommitActivities() {
    return this.repoFormControl?.valueChanges.pipe(
      switchMap((value) => {
        if (value) {
          return this.dashboardService.getCommitActivity(value.full_name);
        } else {
          return EMPTY;
        }
      }),
      tap((res) => {
        if (res && res?.length > 0) {
          return res;
        } else {
          this.showErrorAlert('commits');
          return null;
        }
      })
    );
  }

  getCommitList() {
    return this.repoFormControl?.valueChanges.pipe(
      switchMap((value) => {
        if (value) {
          return this.dashboardService.getCommits(value.full_name);
        } else {
          return EMPTY;
        }
      }),
      tap((res: CommitInfo[]) => {
        if (res && res?.length > 0) {
          return res.slice(0, 5);
        } else {
          this.showErrorAlert('commits');
          return null;
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
    // this.commitActivities = [];
    // this.commitList = [];
    // this.repoLanguages = {};
  }

  private triggerTimerAfterValueChanges() {
    this.repoFormControl.valueChanges.pipe();
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
