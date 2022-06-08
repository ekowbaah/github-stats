import { CommitComponent } from './components/commit/commit.component';
import { CommitListComponent } from './components/commit-list/commit-list.component';
import { CommitStatsComponent } from './components/commit-stats/commit-stats.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LanguageStatsComponent } from './components/language-stats/language-stats.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [
    HomeComponent,
    StatsComponent,
    CommitListComponent,
    CommitComponent,
    LanguageStatsComponent,
    CommitStatsComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
