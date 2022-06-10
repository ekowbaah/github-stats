import { Observable, map } from 'rxjs';

import { GitStatsResponse } from '@dashboard/models/general-response';

export class GeneralHelpers {
  static handleValidResponse =
    (errorMessageVariant: string) => (source: Observable<GitStatsResponse>) => {
      return source.pipe(
        map((sourceResponse) => {
          if (sourceResponse && this.isEmpty(sourceResponse)) {
            throw new Error(errorMessageVariant);
          }
          return sourceResponse;
        })
      );
    };

  // check if value is empty
  static isEmpty = (obj: any) =>
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length;
}
