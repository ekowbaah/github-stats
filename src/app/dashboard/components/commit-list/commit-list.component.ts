import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { CommitInfo } from 'src/app/shared/models/commits.model';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss'],
})
export class CommitListComponent implements OnChanges {
  @Input() commitList?: CommitInfo[] | null;
  commitDates: string[] = [];
  dateDictionary: { [key: string]: any } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commitList']) {
      this.sortCommitsByDate(changes['commitList'].currentValue.slice(0, 5));
      console.log(changes['commitList'].currentValue)
    }
  }
  sortCommitsByDate(commitList: CommitInfo[]) {
    let dateDict: any = {};
    commitList?.forEach((commit) => {
      let dateString = new Date(commit.commit.author.date).toDateString();
      if (dateDict[dateString]) {
        dateDict[dateString].push(commit);
      } else {
        dateDict[dateString] = [commit];
      }
    });
    this.commitDates = Object.keys(dateDict);
    this.dateDictionary = dateDict;
  }
}
