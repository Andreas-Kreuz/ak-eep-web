import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as fromSignal from './signal.actions';
import {FetchAction} from './signal.actions';
import {Signal} from '../models/signal.model';
import * as CoreActions from '../../../core/store/core.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import * as fromCore from '../../../../app/core/store/core.actions';
import {of, throwError} from 'rxjs';
import {SignalType} from '../models/signal-type.model';
import {EepWebUrl} from '../../../core/server-status/eep-web-url.model';
import {Status} from '../../../core/server-status/status.enum';
import {environment} from '../../../../environments/environment';


const errorHandler = (err, path) => {
  console.log(err);
  return of(
    new CoreActions.ShowUrlError(new EepWebUrl(path, Status.ERROR, err.message)));
};

@Injectable()
export class SignalEffects {

  @Effect()
  fetchSignals = this.actions$
    .pipe(
      ofType(fromSignal.FETCH_SIGNALS),
      switchMap((action: fromSignal.FetchSignals) => {
        const url =
          location.protocol
          + '//' + location.hostname
          + ':' + environment.jsonPort
          + SIGNAL_PATH;
        console.log(url);
        return this.httpClient.get<Signal[]>(url)
          .pipe(
            // retry(3),
            map((list: Signal[]) => {
              list.sort((a, b) => a.id - b.id);

              for (const signal of list) {
                if (!signal.model) {
                  signal.model = null;
                }
              }
              return list;
            }),
            catchError((error) => {
              return throwError(error);
            }));
      }),
      switchMap((list: Signal[]) => {
          return of(
            new CoreActions.ShowUrlError(new EepWebUrl(SIGNAL_PATH, Status.SUCCESS, 'Daten geladen')),
            {
              type: fromSignal.SET_SIGNALS,
              payload: list
            });
        }
      ),
      catchError((err) => {
        return of(
          new CoreActions.ShowUrlError(new EepWebUrl(SIGNAL_PATH, Status.ERROR, err.message)));
      })
    );

  @Effect()
  fetchSignalTypes = this.actions$
    .pipe(
      ofType(fromSignal.FETCH_SIGNAL_TYPES),
      switchMap((action: fromSignal.FetchSignalTypes) => {
        const url =
          location.protocol
          + '//' + location.hostname
          + ':' + environment.jsonPort
          + SIGNAL_TYPE_PATH;
        console.log(url);
        return this.httpClient.get<SignalType[]>(url)
          .pipe(
            map((list: SignalType[]) => {
              return [
                new CoreActions.ShowUrlError(new EepWebUrl(SIGNAL_TYPE_PATH, Status.SUCCESS, 'Signal-Typ-Zuordnung geladen.')),
                {
                  type: fromSignal.SET_SIGNAL_TYPES,
                  payload: list
                }];
            }),
            catchError((error) => {
              return of(
                new CoreActions.ShowUrlError(new EepWebUrl(SIGNAL_TYPE_PATH, Status.ERROR, error.message))
              );
            })
          );
      }),
    );
  loadFromUrl = <T>(url: string, path: string, setActionType: string) => {
    return this.httpClient.get<T[]>(url)
      .pipe(
        switchMap((list: T[]) => {
          return [
            new CoreActions.ShowUrlError(new EepWebUrl(path, Status.SUCCESS, 'Daten geladen.')),
            {
              type: setActionType,
              payload: list
            }];
        })
      );
  };
  loadFromAction = (action: FetchAction, path: string, setActionType: string) => {
    const url =
      location.protocol
      + '//' + location.hostname
      + ':' + environment.jsonPort
      + path;
    console.log(url);
    return this.loadFromUrl(url, path, setActionType);
  };
  @Effect()
  fetchSignalTypeDefinitions = this.actions$
    .pipe(
      ofType(fromSignal.FETCH_SIGNAL_TYPE_DEFINITIONS),
      switchMap((action: FetchAction) =>
        this.loadFromAction(action,
          SIGNAL_TYPE_DEFINITIONS_PATH,
          fromSignal.SET_SIGNAL_TYPE_DEFINITIONS)),
      catchError(err => errorHandler(err, SIGNAL_TYPE_DEFINITIONS_PATH))
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromRoot.State>) {
  }
}

const SIGNAL_PATH = '/api/v1/signals';
const SIGNAL_TYPE_PATH = '/api/v1/signal-types';
const SIGNAL_TYPE_DEFINITIONS_PATH = '/api/v1/signal-type-definitions';
