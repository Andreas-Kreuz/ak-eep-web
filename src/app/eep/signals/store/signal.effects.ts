import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as SignalActions from './signals.actions';
import {Signal} from '../signal.model';
import * as ErrorActions from '../../../core/error/store/error.actions';
import {Alert} from '../../../core/error/alert.model';
import {Store} from '@ngrx/store';
import * as fromSignals from '../../../store/app.reducers';
import {of} from 'rxjs';


@Injectable()
export class SignalEffects {
  hostLocation = 'http://localhost:3000';
  url = this.hostLocation + '/signals';
  @Effect( { dispatch: false } )
  showErrorSignals = this.actions$
    .pipe(
      ofType(SignalActions.ERROR),
      tap((error: SignalActions.Error) =>
        this.store.dispatch(new Alert(
          'danger',
          'Kann den Server nicht kontaktieren: ' + this.url +
          ` - Backend returned code ${error.payload.status}, ` +
          `body was: ${error.payload.error}`))));

  @Effect()
  refreshSignals = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_SIGNALS),
      switchMap((ignored: SignalActions.FetchSignals) => {
        return this.httpClient.get<Signal[]>(this.url)
          .pipe(
            map((signals: Signal[]) => {
              for (const signal of signals) {
                if (!signal.model) {
                  signal.model = null;
                }
              }
              this.store.dispatch(new ErrorActions.ShowError(
                new Alert('success', 'Signale geladen von: ' + this.url)));
              return {
                type: SignalActions.SET_SIGNALS,
                payload: signals
              };
            }),
            catchError((error) => {
              return of(new ErrorActions.ShowError(new Alert(
                'danger',
                'Kann den Server nicht kontaktieren: ' + this.url +
                ` - Backend returned code ${error.status}, ` +
                `body was: ${error.error}`)));
            })
          );
      })
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromSignals.AppState>) {
  }
}
