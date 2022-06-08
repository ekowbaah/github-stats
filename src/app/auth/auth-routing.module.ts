import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '../core/utils/app-routes';
import { CallbackComponent } from './components/callback/callback.component';
import { NgModule } from '@angular/core';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: AppRoutes.CALLBACK,
    component: CallbackComponent,
  },
  {
    path: AppRoutes.SIGNIN,
    component: SignInComponent,
  },
  {
    path: '',
    redirectTo: AppRoutes.SIGNIN,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
