import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '../core/utils/app-routes';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: AppRoutes.DASHBOARD,
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: AppRoutes.HOME,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
