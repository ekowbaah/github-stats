import { AfterViewInit, Component } from '@angular/core';

import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  user?: User;
  constructor() {}
  ngAfterViewInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
