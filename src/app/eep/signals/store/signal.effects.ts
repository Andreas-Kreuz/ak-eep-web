import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as fromSignal from './signal.actions';
import {FetchAction} from './signal.actions';
import {Signal} from '../models/signal.model';
import * as ErrorActions from '../../../core/store/core.actions';
import {Alert} from '../../../core/error/alert.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import * as fromCore from '../../../../app/core/store/core.actions';
import {of} from 'rxjs';
import {SignalType} from '../models/signal-type.model';


const errorHandler = (error) => {
  return of(new ErrorActions.ShowError(new Alert(
    'danger',
    'Kann den Server nicht kontaktieren: ' + // url +
    ` - Backend returned code ${error.status}, ` +
    `body was: ${error.error}`)));
};

@Injectable()
export class SignalEffects {
  @Effect({dispatch: false})
  showErrorSignals = this.actions$
    .pipe(
      ofType(fromSignal.ERROR),
      tap((error: fromSignal.LogError) => {
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
      ofType(fromSignal.FETCH_SIGNALS),
      switchMap((action: fromSignal.FetchSignals) => {
        const url = action.payload + '/signals';
        console.log(url);
        return this.httpClient.get<Signal[]>(url)
          .pipe(
            map((list: Signal[]) => {
              list.sort((a, b) => a.id - b.id);

              for (const signal of list) {
                if (!signal.model) {
                  signal.model = null;
                }
              }
              this.store.dispatch(new ErrorActions.ShowError(
                new Alert('success', 'Signale geladen von: ' + url)));
              this.store.dispatch(new fromCore.SetConnected());
              return {
                type: fromSignal.SET_SIGNALS,
                payload: list
              };
            })
          );
      }),
      catchError((error) => {
        return of(new ErrorActions.ShowError(new Alert(
          'danger',
          'Kann den Server nicht kontaktieren: ' + // url +
          ` - Backend returned code ${error.status}, ` +
          `body was: ${error.error}`)));
      })
    );

  @Effect()
  fetchSignalTypes = this.actions$
    .pipe(
      ofType(fromSignal.FETCH_SIGNAL_TYPES),
      switchMap((action: fromSignal.FetchSignalTypes) => {
        const url = action.payload + '/signal_types';
        console.log(url);
        return this.httpClient.get<SignalType[]>(url)
          .pipe(
            map((list: SignalType[]) => {
              this.store.dispatch(new ErrorActions.ShowError(
                new Alert('success', 'Signal-Typ-Zuordnung geladen von: ' + url)));
              return {
                type: fromSignal.SET_SIGNAL_TYPES,
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
      }),
    );

  @Effect()
  fetchSignalTypeDefinitions = this.actions$
    .pipe(
      ofType(fromSignal.FETCH_SIGNAL_TYPE_DEFINITIONS),
      switchMap((action: FetchAction) =>
        this.loadFromAction(action,
          '/signal_type_definitions',
          fromSignal.SET_SIGNAL_TYPE_DEFINITIONS)),
      catchError(errorHandler)
    );

  loadFromUrl = <T>(url: string, setActionType: string) => {

    return this.httpClient.get<T[]>(url)
      .pipe(
        map((list: T[]) => {
          this.store.dispatch(new ErrorActions.ShowError(
            new Alert('success', 'Daten geladen von: ' + url)));
          return {
            type: setActionType,
            payload: list
          };
        })
      );
  };

  loadFromAction = (action: FetchAction, urlPart: string, setActionType: string) => {
    const url = action.payload + urlPart;
    console.log(url);
    return this.loadFromUrl(url, setActionType);
  };

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromRoot.State>) {
  }
}
