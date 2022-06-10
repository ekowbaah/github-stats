import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  CommitActivity,
  CommitInfo,
} from '@shared/models/commits.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repo } from '@shared/models/repos.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private isLoadingSource$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoadingSource$.asObservable();

  constructor(private http: HttpClient) {}

  getCommitActivity(userNameAndRepo: string): Observable<CommitActivity[]> {
    this.setLoading(true);
    return this.http
      .get<CommitActivity[]>(`repos/${userNameAndRepo}/stats/commit_activity`)
      .pipe(tap(() => this.setLoading(false)));
  }

  getCommits(userNameAndRepo: string): Observable<CommitInfo[]> {
    this.setLoading(true);
    return this.http
      .get<CommitInfo[]>(`repos/${userNameAndRepo}/commits`)
      .pipe(tap(() => this.setLoading(false)));
  }

  getRepoLanguages(userNameAndRepo: string): Observable<Object> {
    this.setLoading(true);
    return this.http
      .get<Object>(`repos/${userNameAndRepo}/languages`)
      .pipe(tap(() => this.setLoading(false)));
  }

  getAllRepos(): Observable<Repo[]> {
    return this.http.get<Repo[]>(`user/repos`);
  }

  private setLoading(isLoading: boolean) {
    this.isLoadingSource$.next(isLoading);
  }
}
