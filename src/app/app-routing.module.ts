import { RouterModule, Routes } from '@angular/router';

import { APP_ROUTES } from './core/utils/routes';
import { NgModule } from '@angular/core';

const routes: Routes = APP_ROUTES;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
