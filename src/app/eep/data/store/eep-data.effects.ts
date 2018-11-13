import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as fromEep from './eep-data.actions';
import * as fromRoot from '../../../app.reducers';
import {EepData} from '../models/eep-data.model';
import {SetSlots} from './eep-data.actions';
import {Store} from '@ngrx/store';
import {throwError} from 'rxjs';
import {Alert} from '../../../core/error/alert.model';

@Injectable()
export class EepDataEffects {
  @Effect()
  fetchEepData = this.actions$
    .pipe(
      ofType(fromEep.FETCH_SLOTS),
      switchMap((action: fromEep.FetchSlots) => {
        const url = action.payload + '/saveSlots';
        console.log(url);
        return this.httpClient.get<EepData[]>(url)
          .pipe(
            map((list: EepData[]) => {
              for (const element of list) {
                if (!element.name) {
                  element.name = '?';
                }
              }
              return {list: list, url: url};
            }),
            switchMap((t: { list, url }) => {
                return [
                  new Alert('success', 'Daten geladen von: ' + t.url),
                  new SetSlots(t.list),
                ];
              }
            ),
            catchError(err => throwError(err))
          );
      })
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromRoot.State>) {
  }
}

