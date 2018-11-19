import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as CoreActions from '../../../core/store/core.actions';
import * as fromIntersections from './intersection.actions';
import {SetIntersectionTrafficLights} from './intersection.actions';
import {Alert} from '../../../core/error/alert.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import {of, throwError} from 'rxjs';
import {IntersectionLane} from '../models/intersection-lane.model';
import {CountType} from '../models/count-type.enum';
import {SetSignalTypes} from '../../signals/store/signal.actions';
import {EepWebUrl} from '../../../core/server-status/eep-web-url.model';
import {Status} from '../../../core/server-status/status.enum';
import {IntersectionTrafficLight} from '../models/intersection-traffic-light.model';

const errorHandler = (error, path) => {
  console.log(error);
  return of(
    new CoreActions.ShowUrlError(new EepWebUrl(path, Status.ERROR, error.message))
  );
};

@Injectable()
export class IntersectionEffects {
  @Effect({dispatch: false})
  showErrorSignals = this.actions$
    .pipe(
      ofType(fromIntersections.ERROR),
      tap((error: fromIntersections.LogError) => {
        console.log(error);
        this.store.dispatch(new Alert(
          'danger',
          'Kann den Server nicht kontaktieren: ' +
          ` - Backend returned code ${error.payload.status}, ` +
          `body was: ${error.payload.error}`));
      }));

  @Effect()
  fetchIntersectionTrafficLights = this.actions$
    .pipe(
      ofType(fromIntersections.FETCH_INTERSECTION_TRAFFIC_LIGHTS),
      switchMap((action: fromIntersections.FetchIntersectionSwitching) => {
        const url = action.payload + '/api/v1/intersection-traffic-lights';
        console.log(url);
        return this.httpClient.get<IntersectionTrafficLight[]>(url)
          .pipe(
            map((list) => {
              const signalModels = new Map<number, string>();

              for (const element of list) {
                if (!element.lightStructures) {
                  element.lightStructures = {};
                }
                if (!element.axisStructures) {
                  element.axisStructures = [];
                }
                if (element.modelId) {
                  signalModels.set(element.signalId, element.modelId);
                }
              }
              return {list: list, url: url, signalModels: signalModels};
            }),
            catchError(err => throwError(err))
          );
      }),
      switchMap((t: { list, url, signalModels }) => {
          return [
            new CoreActions.ShowUrlError(new EepWebUrl('/api/v1/intersection-traffic-lights', Status.SUCCESS, 'Daten geladen.')),
            new SetIntersectionTrafficLights(t.list),
            new SetSignalTypes(t.signalModels),
          ];
        }
      ),
      catchError(err => errorHandler(err, '/api/v1/intersection-traffic-lights'))
    );
  loadFromUrl = <T>(url: string, path: string, setActionType: string, init) => {
    return this.httpClient.get<T[]>(url)
      .pipe(
        map((list: T[]) => {
          if (init) {
            for (const element of list) {
              init(element);
            }
          }
          return list;
        }),
        switchMap(list => {
          return [
            new CoreActions.ShowUrlError(new EepWebUrl(path, Status.SUCCESS, 'Daten geladen.')),
            {type: setActionType, payload: list},
          ];
        }),
        catchError(err => throwError(err))
      );
  };
  loadFromAction = (action: fromIntersections.FetchAction, path: string, setActionType: string, init?) => {
    const url = action.payload + path;
    const observable = this.loadFromUrl(url, path, setActionType, init);
    return observable;
  };
  @Effect()
  fetchIntersections = this.actions$
    .pipe(
      ofType(fromIntersections.FETCH_INTERSECTIONS),
      switchMap((action: fromIntersections.FetchIntersections) =>
        this.loadFromAction(action,
          '/api/v1/intersections',
          fromIntersections.SET_INTERSECTIONS)),
      catchError(err => errorHandler(err, '/api/v1/intersections'))
    );
  @Effect()
  fetchIntersectionDirections = this.actions$
    .pipe(
      ofType(fromIntersections.FETCH_INTERSECTION_LANES),
      switchMap((action: fromIntersections.FetchIntersectionLanes) =>
        this.loadFromAction(action,
          '/api/v1/intersection-lanes',
          fromIntersections.SET_INTERSECTION_LANES,
          (e: IntersectionLane) => {
            if (!e.waitingTrains) {
              e.waitingTrains = ['Test1', 'Test2'];
            }
            if (!e.countType) {
              e.countType = CountType.CONTACTS;
            }
          })),
      catchError(err => errorHandler(err, '/api/v1/intersection-lanes'))
    );
  @Effect()
  fetchIntersectionSwitching = this.actions$
    .pipe(
      ofType(fromIntersections.FETCH_INTERSECTION_SWITCHING),
      switchMap((action: fromIntersections.FetchIntersectionSwitching) =>
        this.loadFromAction(action,
          '/api/v1/intersection-switchings',
          fromIntersections.SET_INTERSECTION_SWITCHING)),
      catchError(err => errorHandler(err, '/api/v1/intersection-switchings'))
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromRoot.State>) {
  }
}
