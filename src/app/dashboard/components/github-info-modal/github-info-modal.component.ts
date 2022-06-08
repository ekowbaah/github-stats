import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  TemplateRef,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-github-info-modal',
  templateUrl: './github-info-modal.component.html',
  styleUrls: ['./github-info-modal.component.scss'],
  
})
export class GithubInfoModalComponent {
  value: number | null = null;
  name = '';
  items = [10, 50, 100];

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any>
  ) {}

  get hasValue(): boolean {
    return this.value !== null;
  }

  get data(): any {
    return this.context.data;
  }

  submit(): void {
    // this.context.completeWith(this.githubInfoForm.value);
  }

  showDialog(content: TemplateRef<TuiDialogContext<void>>): void {
    this.dialogService.open(content, { dismissible: true }).subscribe();
  }
}
