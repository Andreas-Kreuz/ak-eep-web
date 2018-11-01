import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as SignalActions from './eep.actions';
import {Signal} from '../signals/signal.model';
import * as ErrorActions from '../../core/store/core.actions';
import {Alert} from '../../core/error/alert.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';
import {of} from 'rxjs';
import {SignalType} from '../signals/signal-type.model';
import {SignalTypeDefinition} from '../signals/signal-type-definition.model';


@Injectable()
export class EepEffects {
  @Effect({dispatch: false})
  showErrorSignals = this.actions$
    .pipe(
      ofType(SignalActions.ERROR),
      tap((error: SignalActions.Error) => {
        console.log(error);
        this.store.dispatch(new Alert(
          'danger',
          'Kann den Server nicht kontaktieren: ' +
          ` - Backend returned code ${error.payload.status}, ` +
          `body was: ${error.payload.error}`));
      }));

  @Effect()
  fetchSignals = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_SIGNALS),
      switchMap((action: SignalActions.FetchSignals) => {
        const url = action.payload + '/signals';
        return this.httpClient.get<Signal[]>(url)
          .pipe(
            map((list: Signal[]) => {
              for (const signal of list) {
                if (!signal.model) {
                  signal.model = null;
                }
              }
              this.store.dispatch(new ErrorActions.ShowError(
                new Alert('success', 'Signale geladen von: ' + url)));
              return {
                type: SignalActions.SET_SIGNALS,
                payload: list
              };
            }),
            catchError((error) => {
              return of(new ErrorActions.ShowError(new Alert(
                'danger',
                'Kann den Server nicht kontaktieren: ' + url +
                ` - Backend returned code ${error.status}, ` +
                `body was: ${error.error}`)));
            })
          );
      })
    );

  @Effect()
  fetchSignalTypes = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_SIGNAL_TYPES),
      switchMap((action: SignalActions.FetchSignalTypes) => {
        const url = action.payload + '/signal_types';
        return this.httpClient.get<SignalType[]>(url)
          .pipe(
            map((list: SignalType[]) => {
              this.store.dispatch(new ErrorActions.ShowError(
                new Alert('success', 'Signal-Typ-Zuordnung geladen von: ' + url)));
              return {
                type: SignalActions.SET_SIGNAL_TYPES,
                payload: list
              };
            }),
            catchError((error) => {
              return of(new ErrorActions.ShowError(new Alert(
                'danger',
                'Kann den Server nicht kontaktieren: ' + url +
                ` - Backend returned code ${error.status}, ` +
                `body was: ${error.error}`)));
            })
          );
      })
    );

  @Effect()
  fetchIntersections = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_SIGNAL_TYPE_DEFINITIONS),
      switchMap((action: SignalActions.FetchSignalTypeDefinitions) => {
        const url = action.payload + '/signal_type_definitions';
        return this.httpClient.get<SignalTypeDefinition[]>(url)
          .pipe(
            map((list: SignalTypeDefinition[]) => {
              this.store.dispatch(new ErrorActions.ShowError(
                new Alert('success', 'Signal-Modelle geladen von: ' + url)));
              return {
                type: SignalActions.SET_SIGNAL_TYPE_DEFINITIONS,
                payload: list
              };
            }),
            catchError((error) => {
              return of(new ErrorActions.ShowError(new Alert(
                'danger',
                'Kann den Server nicht kontaktieren: ' + url +
                ` - Backend returned code ${error.status}, ` +
                `body was: ${error.error}`)));
            })
          );
      })
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromRoot.State>) {
  }
}
