import {
  Observable,
  catchError,
  combineLatest,
  of,
  shareReplay,
  switchMap,
  timer,
} from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

import { Component } from '@angular/core';
import { DashboardService } from '@dashboard/services/dashboard-service.service';
import { FormControl } from '@angular/forms';
import { GeneralHelpers } from '@shared/utils/general-helper';
import { Repo } from '@shared/models/repos.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  repoFormControl: FormControl = new FormControl();

  repos$: Observable<Repo[]> = this.dashboardService
    .getAllRepos()
    .pipe(shareReplay(1));

  repoLanguages$ = this.getRepoLanguages().pipe(shareReplay(1));

  commitActivities$ = this.getCommitActivities().pipe(shareReplay(1));

  commitList$ = this.getCommitList().pipe(shareReplay(1));

  isLoading$ = this.dashboardService.isLoading$;

  constructor(
    private dashboardService: DashboardService,
    private alertService: TuiAlertService
  ) {}

  getRepoLanguages() {
    return this.triggerTimerAfterValueChanges().pipe(
      switchMap(([value]) => {
        return this.dashboardService.getRepoLanguages(value.full_name);
      }),
      GeneralHelpers.handleValidResponse('repository languages'),
      catchError((error) => {
        this.showErrorAlert(error.message);
        return of(null);
      })
    );
  }

  getCommitActivities() {
    return this.triggerTimerAfterValueChanges().pipe(
      switchMap(([value]) => {
        return this.dashboardService.getCommitActivity(value.full_name);
      }),
      GeneralHelpers.handleValidResponse('commit activities'),
      catchError((error) => {
        this.showErrorAlert(error.message);
        return of(null);
      })
    );
  }

  getCommitList() {
    return this.triggerTimerAfterValueChanges().pipe(
      switchMap(([value]) => {
        return this.dashboardService.getCommits(value.full_name);
      }),
      GeneralHelpers.handleValidResponse('commits'),
      catchError((error) => {
        this.showErrorAlert(error.message);
        return of(null);
      })
    );
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
    const delay = 90000;

    return combineLatest([
      this.repoFormControl.valueChanges,
      timer(start, delay),
    ]);
  }
}
