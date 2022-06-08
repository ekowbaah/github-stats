import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GithubInfoModalComponent } from './components/github-info-modal/github-info-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StatsComponent } from './components/stats/stats.component';
import { CommitListComponent } from './components/commit-list/commit-list.component';
import { CommitComponent } from './components/commit/commit.component';
import { LanguageStatsComponent } from './components/language-stats/language-stats.component';
import { CommitStatsComponent } from './components/commit-stats/commit-stats.component';

@NgModule({
  declarations: [HomeComponent, GithubInfoModalComponent, StatsComponent, CommitListComponent, CommitComponent, LanguageStatsComponent, CommitStatsComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
