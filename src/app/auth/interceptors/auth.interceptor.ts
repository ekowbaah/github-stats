import { EMPTY, Observable, catchError, tap, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(

  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      request = request.clone({
        setHeaders: { Authorization: `token ${accessToken}` },
        withCredentials: true,
      });
    }
    return next
      .handle(request)
      .pipe();
  }

  // observable to tap into successful http requests
  // private handleSuccess(
  //   source: Observable<HttpEvent<any>>
  // ): Observable<HttpEvent<any>> {
  //   return source.pipe(
  //     tap((response: HttpEvent<any>) => {
  //       if (response instanceof HttpResponse) {
  //         switch (response.status) {
  //           case 201:
  //             // console.log('------ 201 success ----', response);
  //             this.notificationService.success('Successfully created');
  //             break;
  //           case 200:
  //             // console.log('------ 200 success ----', response);
  //             // this.notificationService.success('Successfully updated');
  //             break;
  //           case 204:
  //             // console.log('------ 204 success ----', response);
  //             break;
  //           default:
  //             // console.log('------ default success ----', response);
  //             break;
  //         }
  //       }
  //     })
  //   );
  // }

  // observable to tap into failed http requests
  // private handleErrors(
  //   source: Observable<HttpEvent<any>>
  // ): Observable<HttpEvent<any>> {
  //   return source.pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       switch (error.status) {
  //         case 401:
  //           return this.handle401Error(error);
  //         case 404:
  //           this.notificationService.error('Not Found');
  //           return EMPTY;
  //         case 500:
  //           this.notificationService.error(
  //             'Internal Server Error. Please try again later'
  //           );
  //           return EMPTY;
  //         default:
  //           this.notificationService.error(`Error: ${error?.error?.message}`);
  //           return throwError(() => error);
  //       }
  //     })
  //   );
  // }

  // private handle401Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
  //   const authResponseHeader = error.headers;
  //   if (authResponseHeader && this.authService.isLoggedIn) {
  //     this.notificationService.error('Session Expired');
  //     this.authService.logout();
  //   } else {
  //     this.notificationService.error('Invalid Credentials');
  //   }
  //   return EMPTY;
  // }
}
