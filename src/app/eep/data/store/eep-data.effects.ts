import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as fromEep from './eep-data.actions';
import {SetSlots} from './eep-data.actions';
import * as fromRoot from '../../../app.reducers';
import {EepData} from '../models/eep-data.model';
import {Store} from '@ngrx/store';
import {of, throwError} from 'rxjs';
import * as ErrorActions from '../../../core/store/core.actions';
import {EepWebUrl} from '../../../core/server-status/eep-web-url.model';
import {Status} from '../../../core/server-status/status.enum';

@Injectable()
export class EepDataEffects {
  @Effect()
  fetchEepData = this.actions$
    .pipe(
      ofType(fromEep.FETCH_SLOTS),
      switchMap((action: fromEep.FetchSlots) => {
        const url = action.payload + SAVE_SLOT_PATH;
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
            catchError(err => {
              return throwError(err);
            })
          );
      }),
      switchMap((t: { list: EepData[], url: string }) => {
          return [
            new ErrorActions.ShowUrlError(
              new EepWebUrl(SAVE_SLOT_PATH, Status.SUCCESS,
                'Daten geladen.')),
            new SetSlots(t.list),
          ];
        }
      ),
      catchError(err => {
        console.log(err);
        return of(
          new ErrorActions.ShowUrlError(new EepWebUrl(SAVE_SLOT_PATH, Status.ERROR, err.message)));
      })
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromRoot.State>) {
  }
}

const SAVE_SLOT_PATH = '/api/v1/save-slots';
