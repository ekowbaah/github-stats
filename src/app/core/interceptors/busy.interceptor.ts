import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusyService } from '@core/services/busy.service';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const msg = request.method === 'GET' ? 'Loading...' : 'Saving...';
    this.busyService.setBusy(true, msg);
    return next
      .handle(request)
      .pipe(finalize(() => this.busyService.clearBusy()));
  }
}
