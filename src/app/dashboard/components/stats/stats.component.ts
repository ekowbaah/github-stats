import {
  Observable,
  combineLatest,
  map,
  shareReplay,
  switchMap,
  timer,
} from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

import { Component } from '@angular/core';
import { DashboardService } from '@dashboard/services/dashboard-service.service';
import { FormControl } from '@angular/forms';
import { GeneralHelpers } from '@shared/utils/general-helper';
import { GitStatsResponse } from '@dashboard/models/general-response';
import { Repo } from '@shared/models/repos.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  repoFormControl: FormControl = new FormControl();

  repos$ = this.getRepos();

  repoLanguages$ = this.getRepoLanguages();

  commitActivities$ = this.getCommitActivities();

  commitList$ = this.getCommitList();

  isLoading$ = this.dashboardService.isLoading$;

  constructor(
    private dashboardService: DashboardService,
    private alertService: TuiAlertService
  ) {}

  getRepoLanguages() {
    return this.triggerTimerAfterValueChanges()
      .pipe(
        switchMap(([value]) => {
          return this.dashboardService.getRepoLanguages(value.full_name);
        }),
        this.handleValidResponse('repos')
      )
      .pipe(shareReplay(1));
  }

  getCommitActivities() {
    return this.triggerTimerAfterValueChanges()
      .pipe(
        switchMap(([value]) => {
          return this.dashboardService.getCommitActivity(value.full_name);
        }),
        this.handleValidResponse('commit activities')
      )
      .pipe(shareReplay(1));
  }

  getCommitList() {
    return this.triggerTimerAfterValueChanges()
      .pipe(
        switchMap(([value]) => {
          return this.dashboardService.getCommits(value.full_name);
        }),
        this.handleValidResponse('commits')
      )
      .pipe(shareReplay(1));
  }

  getRepos() {
    return this.dashboardService.getAllRepos().pipe(shareReplay(1));
  }

  showErrorAlert(messageVariant: string) {
    this.alertService
      .open(`Sorry no ${messageVariant} were found`, {
        label: `No ${messageVariant}  found`,
        autoClose: true,
        status: TuiNotification.Error,
      })
      .subscribe();
  }

  private triggerTimerAfterValueChanges(): Observable<[Repo, number]> {
    const start = 0;
    const delay = 900000; // 15 minutes in milliseconds;

    return combineLatest([
      this.repoFormControl.valueChanges,
      timer(start, delay),
    ]);
  }

  handleValidResponse(errorMessageVariant: string) {
    return (source: Observable<GitStatsResponse>) => {
      return source.pipe(
        map((sourceResponse) => {
          if (sourceResponse && GeneralHelpers.isEmpty(sourceResponse)) {
            this.showErrorAlert(errorMessageVariant);
            return null;
          }
          return sourceResponse;
        })
      );
    };
  }
}
