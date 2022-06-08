import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';

import { DashboardService } from '../../services/dashboard-service.service';
import { GithubInfoModalComponent } from '../../components/github-info-modal/github-info-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  repoData: any;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {}

  // showDialog(): void {
  //   this.dialog.subscribe({
  //     next: (data) => {
  //       console.info(`Dialog emitted data = ${data}`);
  //       this.repoData = data;
  //       this.getCommitActivity();
  //     },
  //     complete: () => {
  //       console.info('Dialog closed');
  //     },
  //   });
  // }

  // getCommitActivity() {
  //   this.dashboardService
  //     .getCommitActivity(this.repoData.userName, this.repoData.repo)
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }
}
