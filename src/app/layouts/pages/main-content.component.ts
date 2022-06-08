import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content',
  template: `<app-navbar></app-navbar>
    <div class="section-default-constraints">
      <router-outlet></router-outlet>
    </div> `,
  styles: [],
})
export class MainContentComponent {}
