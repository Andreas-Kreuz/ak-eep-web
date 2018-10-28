import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, switchMap, tap} from 'rxjs/operators';

import * as SignalActions from './signals.actions';
import * as fromSignals from './signals.reducers';
import {Signal} from '../signal.model';

@Injectable()
export class SignalEffects {
  hostLocation = 'http://localhost';

  @Effect()
  refreshSignals = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_SIGNALS),
        switchMap((action: SignalActions.FetchSignals) => {
        return this.httpClient.get<Signal[]>(this.hostLocation + ':3000/signals');
      }),
      map((signals) => {
        for (const signal of signals) {
          if (!signal.model) {
            signal.model = null;
          }
        }
        return {
          type: SignalActions.SET_SIGNALS,
          payload: signals
        };
      })
    );

  @Effect()
  selectSignal = this.actions$
    .pipe(
      ofType(SignalActions.SELECT),
      tap((action: SignalActions.Select) => {
        // this.router.navigate(['/signals/' + action.payload]);
      }));

  @Effect()
  deselectSignal = this.actions$
    .pipe(
      ofType(SignalActions.DESELECT),
      tap((action: SignalActions.Deselect) => {
        this.router.navigate(['/signals']);
      }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromSignals.State>) {
  }
}
