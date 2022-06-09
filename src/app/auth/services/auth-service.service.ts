import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { AppRoutes } from 'src/app/core/utils/app-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  getToken(code: string) {
    let headers = new HttpHeaders({
      Accept: 'application/json',
    });

    const queryParams = {
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      code,
    };
    return this.http
      .post(
        `${environment.oauthBaseUrl}/access_token?${this.getQueryString(
          queryParams
        )}`,
        null,
        { headers }
      )
      .pipe(
        map((response: any) => {
          if (response.access_token) {
            localStorage.setItem('access_token', response['access_token']);
            this.alertService
              .open('Login was successful', {
                label: 'Login Success!',
                autoClose: true,
                status: TuiNotification.Success,
              })
              .subscribe();
            this.getUserInfo();
          } else {
            this.alertService
              .open('Please try again later', {
                label: 'Login Failed!',
                autoClose: true,
                status: TuiNotification.Error,
              })
              .subscribe();

            this.router.navigateByUrl(`${AppRoutes.AUTH}/${AppRoutes.SIGNIN}`, {
              replaceUrl: true,
            });
          }
          return response;
        })
      );
  }

  getUserInfo() {
    this.http.get('user').subscribe((response: any) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.router.navigateByUrl(`${AppRoutes.HOME}/${AppRoutes.DASHBOARD}`, {
        replaceUrl: true,
      });
    });
  }

  protected getQueryString(filter: any): string {
    const queryString = Object.keys(filter)
      .map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]);
      })
      .join('&');

    return queryString;
  }
}
