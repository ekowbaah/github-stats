import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AppRoutes } from '@core/utils/app-routes';
import { AuthService } from '@auth/services/auth-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements AfterViewInit {
  @ViewChild('header') header!: PolymorpheusContent;
  @ViewChild('content') content!: PolymorpheusContent<TuiDialogContext>;

  constructor(
    private router: Router,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private authService: AuthService
  ) {}
  ngAfterViewInit(): void {
    if (!localStorage.getItem('access_token')) {
      this.openLoginModal(this.content, this.header, 'm');
    } else {
      this.router.navigateByUrl(`${AppRoutes.HOME}/${AppRoutes.DASHBOARD}`, {
        replaceUrl: true,
      });
    }
  }

  openLoginModal(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: 'Hi welcome to my fun github app!',
        header,
        size,
        closeable: false,
        dismissible: false,
      })
      .subscribe();
  }

  goToGitubSignIn() {
    // this.authService.login().subscribe()
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${environment.client_id}`;
  }
}
