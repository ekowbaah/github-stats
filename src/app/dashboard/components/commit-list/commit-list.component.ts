import { Component, Input } from '@angular/core';

import { CommitInfo } from '@shared/models/commits.model';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss'],
})
export class CommitListComponent {
  @Input() set commitList(commitList: CommitInfo[] | null) {
    //get last 5 commits
    if (commitList) this.sortCommitsByDate(commitList.slice(0, 5));
  }

  commitDates: string[] = [];
  dateDictionary: { [key: string]: any } = {};

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
