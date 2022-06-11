import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '@auth/services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getToken();
  }

  getCodeFromUrl(): string {
    return this.router.url.split('=')[1];
  }

  getToken(): void {
    this.subscription = this.authService
      .getToken(this.getCodeFromUrl())
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
