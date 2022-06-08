import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { NotificationService } from '@shared/services/notification.service';
import { EMPTY, Observable, catchError, mergeMap, tap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.token$.pipe(
      mergeMap((token) => {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        return next
          .handle(request)
          .pipe(this.handleSuccess.bind(this), this.handleErrors.bind(this));
      })
    );
  }

  // observable to tap into successful http requests
  private handleSuccess(
    source: Observable<HttpEvent<any>>
  ): Observable<HttpEvent<any>> {
    return source.pipe(
      tap((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          switch (response.status) {
            case 201:
              break;
            case 200:
              break;
            case 204:
              break;
            default:
              break;
          }
        }
      })
    );
  }

  // observable to tap into failed http requests
  private handleErrors(
    source: Observable<HttpEvent<any>>
  ): Observable<HttpEvent<any>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.notificationService.error(error.error.message);
            // this.router.navigate([`/${AppRoutes.PAGE_NOT_FOUND}`]);
            return EMPTY;
          case 401:
            return this.handle401Error(error);
          case 404:
            this.notificationService.error('Not Found');
            return EMPTY;
          case 500:
            this.notificationService.error(
              'Internal Server Error. Please try again later'
            );
            return EMPTY;
          default:
            this.notificationService.error(error?.error?.message);
            return throwError(() => error);
        }
      })
    );
  }

  private handle401Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    const authResponseHeader = error.headers.get('WWW-Authenticate');
    // console.log('authResponseHeader', authResponseHeader);
    if (authResponseHeader) {
      this.notificationService.error('Session Expired');
      this.authService.logout();
    } else {
      this.notificationService.error('Invalid Credentials');
    }
    return EMPTY;
  }
}
