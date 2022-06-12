import { Component, Input } from '@angular/core';

import { CommitInfo } from '@shared/models/commits.model';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss'],
})
export class CommitComponent {
  @Input() commit!: CommitInfo;
}
