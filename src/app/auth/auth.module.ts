import { AuthRoutingModule } from './auth-routing.module';
import { CallbackComponent } from './components/callback/callback.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignInComponent } from './components/sign-in/sign-in.component';

@NgModule({
  declarations: [CallbackComponent, SignInComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
