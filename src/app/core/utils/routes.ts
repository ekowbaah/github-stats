import { AppRoutes } from './app-routes';
import { EmptyComponent } from 'src/app/layouts/pages/empty.component';
import { MainContentComponent } from 'src/app/layouts/pages/main-content.component';
import { PageNotFoundComponent } from 'src/app/layouts/pages/page-not-found.component';
import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: AppRoutes.AUTH,
    component: EmptyComponent,
    loadChildren: () =>
      import('../../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: AppRoutes.HOME,
    component: MainContentComponent,
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '',
    redirectTo: AppRoutes.AUTH,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: AppRoutes.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: EmptyComponent,
    children: [{ path: '', component: PageNotFoundComponent }],
  },
];
