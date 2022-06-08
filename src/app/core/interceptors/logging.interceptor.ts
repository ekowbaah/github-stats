import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private logger: NGXLogger) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.logger.log('Request: ', request);
    return next.handle(request).pipe(
      tap({
        next: (response) => this.logger.log('Response: ', response),
        error: (error) => this.logger.log('Error: ', error),
      })
    );
  }
}
