import { AppRoutes } from '@core/utils/app-routes';
import { Component } from '@angular/core';
@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="my-8 text-gray-600 w-full flex flex-col items-center">
      <div class="flex flex-row">
        <div class="border-r h-full pr-5">
          <p class="text-4xl font-bold text-gray-500">404</p>
        </div>
        <div class="pl-5">
          <div>
            <p class="text-2xl font-bold text-red-700">Page not found</p>
            <p class="text-sm">The page you are looking for does not exist</p>
          </div>
          <div class="my-8">
            <button
              routerLink="{{ AppRoutes.HOME + '/' + AppRoutes.DASHBOARD }}"
              tuiButton
              type="button"
              appearance="outline"
              class="tui-space_right-3 tui-space_bottom-3 text-gray-500 bg-gray-500"
            >
              Go back home
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PageNotFoundComponent {
  AppRoutes = AppRoutes;
}
