import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="my-8 text-gray-600 w-full flex flex-col items-center">
      <div class="flex flex-row">
        <div class="border-r h-full pr-5">
          <p class="text-4xl font-bold text-indigo-700">404</p>
        </div>
        <div class="pl-5">
          <div>
            <p class="text-2xl font-bold text-black">Page not found</p>
            <p class="text-sm">The page you are looking for does not exist</p>
          </div>
          <div class="my-8">
          
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class PageNotFoundComponent {
  name = 'PageNotFoundComponent';
}
