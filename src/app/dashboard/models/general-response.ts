import { CommitActivity, CommitInfo } from '@shared/models/commits.model';

export type GitStatsResponse = CommitActivity[] | CommitInfo[] | any;
