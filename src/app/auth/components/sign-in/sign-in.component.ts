import {
  AfterViewInit,
  Component,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  PolymorpheusComponent,
  PolymorpheusContent,
} from '@tinkoff/ng-polymorpheus';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';

import { GithubInfoModalComponent } from 'src/app/dashboard/components/github-info-modal/github-info-modal.component';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/core/utils/app-routes';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements AfterViewInit {
  private readonly dialog = this.dialogService.open<number>(
    new PolymorpheusComponent(GithubInfoModalComponent, this.injector),
    {
      data: 237,
      dismissible: true,
      label: 'Heading',
    }
  );
  @ViewChild('header') header!: PolymorpheusContent;
  @ViewChild('content') content!: PolymorpheusContent<TuiDialogContext>;

  constructor(
    private router: Router,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
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
        label: 'Hi welcome!',
        header,
        size,
      })
      .subscribe();
  }

  goToGitubSignIn() {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=d31daf692001dd08152b';
  }
}
