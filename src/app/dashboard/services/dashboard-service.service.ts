import { CommitActivity, CommitInfo } from 'src/app/shared/models/commits.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repo } from 'src/app/shared/models/repos.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getCommitActivity(userNameAndRepo: string): Observable<CommitActivity[]> {
    return this.http.get<CommitActivity[]>(`repos/${userNameAndRepo}/stats/commit_activity`);
  }

  getCommits(userNameAndRepo: string): Observable<CommitInfo[]> {
    return this.http.get<CommitInfo[]>(`repos/${userNameAndRepo}/commits`);
  }
  getRepoLanguages(userNameAndRepo: string): Observable<any> {
    return this.http.get<any>(`repos/${userNameAndRepo}/languages`);
  }

  getAllRepos(): Observable<Repo[]> {
    return this.http.get<Repo[]>(`user/repos`);
  }
}
