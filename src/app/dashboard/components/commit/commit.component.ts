import { Component, Input, OnInit } from '@angular/core';

import { CommitInfo } from 'src/app/shared/models/commits.model';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss'],
})
export class CommitComponent implements OnInit {
  @Input() commit!: CommitInfo;
  constructor() {}

  ngOnInit(): void {}
}
