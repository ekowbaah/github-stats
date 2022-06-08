import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getToken();
  }

  getCodeFromUrl(): string {
    return this.router.url.split('code=')[1];
  }

  getToken(): void {
    this.authService.getToken(this.getCodeFromUrl()).subscribe((res) => {
      console.log(res);
    });
  }
}
