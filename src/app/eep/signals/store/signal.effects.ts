import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs/operators';

import * as SignalActions from './signals.actions';
import {Signal} from '../signal.model';
import * as ErrorActions from '../../../core/error/store/error.actions';
import {Alert} from '../../../core/error/alert.model';
import {Store} from '@ngrx/store';
import * as fromSignals from '../../../store/app.reducers';

@Injectable()
export class SignalEffects {
  hostLocation = 'http://localhost';
  private alert: Alert = new Alert('warning', this.hostLocation + ':3000/signals');

  @Effect()
  refreshSignals = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_SIGNALS),
      switchMap((action: SignalActions.FetchSignals) => {
        this.store.dispatch(new ErrorActions.ShowError(this.alert));
        return this.httpClient.get<Signal[]>(this.hostLocation + ':3000/signals');
      }),
      map((signals) => {
        for (const signal of signals) {
          if (!signal.model) {
            signal.model = null;
          }
        }
        this.store.dispatch(new ErrorActions.HideError(this.alert));
        return {
          type: SignalActions.SET_SIGNALS,
          payload: signals
        };
      },
        (error) => console.log(error))
    );

  // @Effect()
  // selectSignal = this.actions$
  //   .pipe(
  //     ofType(SignalActions.SELECT),
  //     tap((action: SignalActions.Select) => {
  //       // this.router.navigate(['/signals/' + action.payload]);
  //     }));
  //
  // @Effect()
  // deselectSignal = this.actions$
  //   .pipe(
  //     ofType(SignalActions.DESELECT),
  //     tap((action: SignalActions.Deselect) => {
  //       // this.router.navigate(['/signals']);
  //     }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromSignals.AppState>) {
  }
}
