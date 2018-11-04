import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as SignalActions from './eep.actions';
import {FetchAction} from './eep.actions';
import {Signal} from '../signals/models/signal.model';
import * as ErrorActions from '../../core/store/core.actions';
import {Alert} from '../../core/error/alert.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';
import {of, throwError} from 'rxjs';
import {SignalType} from '../signals/models/signal-type.model';


const errorHandler = (error) => {
  return of(new ErrorActions.ShowError(new Alert(
    'danger',
    'Kann den Server nicht kontaktieren: ' + // url +
    ` - Backend returned code ${error.status}, ` +
    `body was: ${error.error}`)));
};

@Injectable()
export class EepEffects {
  @Effect({dispatch: false})
  showErrorSignals = this.actions$
    .pipe(
      ofType(SignalActions.ERROR),
      tap((error: SignalActions.LogError) => {
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
        console.log(url);
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
      ofType(SignalActions.FETCH_SIGNAL_TYPES),
      switchMap((action: SignalActions.FetchSignalTypes) => {
        const url = action.payload + '/signal_types';
        console.log(url);
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
      }),
    );

  @Effect()
  fetchSignalTypeDefinitions = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_SIGNAL_TYPE_DEFINITIONS),
      switchMap((action: FetchAction) =>
        this.loadFromAction(action,
          '/signal_type_definitions',
          SignalActions.SET_SIGNAL_TYPE_DEFINITIONS)),
      catchError(errorHandler)
    );

  @Effect()
  fetchIntersections = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_INTERSECTIONS),
      switchMap((action: SignalActions.FetchIntersections) =>
        this.loadFromAction(action,
          '/intersections',
          SignalActions.SET_INTERSECTIONS)),
      catchError(errorHandler)
    );

  @Effect()
  fetchIntersectionDirections = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_INTERSECTION_DIRECTIONS),
      switchMap((action: SignalActions.FetchIntersectionDirections) =>
        this.loadFromAction(action,
          '/intersection_directions',
          SignalActions.SET_INTERSECTION_DIRECTIONS)),
      catchError(errorHandler)
    );

  @Effect()
  fetchIntersectionSwitchings = this.actions$
    .pipe(
      ofType(SignalActions.FETCH_INTERSECTION_SWITCHINGS),
      switchMap((action: SignalActions.FetchIntersectionSwitchings) =>
        this.loadFromAction(action,
          '/intersection_switchings',
          SignalActions.SET_INTERSECTION_SWITCHINGS)),
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
