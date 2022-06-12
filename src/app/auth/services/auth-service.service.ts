import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { AppRoutes } from '@core/utils/app-routes';

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
    const params = {
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      code,
    };
    return this.http
      .post(`${environment.oauthBaseUrl}/access_token`, params, { headers })
      .pipe(
        switchMap((response: any) => {
          if (response.access_token) {
            return this.onLoginSuccess(response);
          } else {
            this.onLoginFailure();
          }
          return response;
        })
      );
  }

  authorize() {
    return `${environment.oauthBaseUrl}/authorize?client_id=${environment.client_id}`;
  }

  getUserInfo() {
    return this.http.get('user');
  }

  private onLoginSuccess(response?: any) {
    localStorage.setItem('access_token', response['access_token']);
    this.alertService
      .open('Login was successful', {
        label: 'Login Success!',
        autoClose: true,
        status: TuiNotification.Success,
      })
      .subscribe();
    return this.getUserInfo().pipe(
      map((userResponse: any) => {
        localStorage.setItem('user', JSON.stringify(userResponse));
        this.router.navigateByUrl(`${AppRoutes.HOME}/${AppRoutes.DASHBOARD}`, {
          replaceUrl: true,
        });
      })
    );
  }
  
  private onLoginFailure() {
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
}
