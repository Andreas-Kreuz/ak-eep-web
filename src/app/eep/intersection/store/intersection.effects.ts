import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as fromCore from '../../../core/store/core.actions';
import * as fromIntersections from './intersection.actions';
import {Alert} from '../../../core/error/alert.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import {of} from 'rxjs';
import {IntersectionLane} from '../models/intersection-lane.model';
import {CountType} from '../models/count-type.enum';
import {IntersectionTrafficLight} from '../models/intersection-traffic-light.model';
import {SetSignalTypes} from '../../signals/store/signal.actions';
import {SetIntersectionTrafficLights} from './intersection.actions';

const errorHandler = (error) => {
  return of(new fromCore.ShowError(new Alert(
    'danger',
    'Kann den Server nicht kontaktieren: ' + // url +
    ` - Backend returned code ${error.status}, ` +
    `body was: ${error.error}`)));
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
  fetchIntersections = this.actions$
    .pipe(
      ofType(fromIntersections.FETCH_INTERSECTIONS),
      switchMap((action: fromIntersections.FetchIntersections) =>
        this.loadFromAction(action,
          '/intersections',
          fromIntersections.SET_INTERSECTIONS)),
      catchError(errorHandler)
    );

  @Effect()
  fetchIntersectionDirections = this.actions$
    .pipe(
      ofType(fromIntersections.FETCH_INTERSECTION_LANES),
      switchMap((action: fromIntersections.FetchIntersectionLanes) =>
        this.loadFromAction(action,
          '/intersection_lanes',
          fromIntersections.SET_INTERSECTION_LANES,
          (e: IntersectionLane) => {
            if (!e.waitingTrains) {
              e.waitingTrains = ['Test1', 'Test2'];
            }
            if (!e.countType) {
              e.countType = CountType.CONTACTS;
            }
          })),
      catchError(errorHandler)
    );

  @Effect()
  fetchIntersectionSwitching = this.actions$
    .pipe(
      ofType(fromIntersections.FETCH_INTERSECTION_SWITCHING),
      switchMap((action: fromIntersections.FetchIntersectionSwitching) =>
        this.loadFromAction(action,
          '/intersection_switchings',
          fromIntersections.SET_INTERSECTION_SWITCHING)),
      catchError(errorHandler)
    );

  @Effect()
  fetchIntersectionTrafficLights = this.actions$
    .pipe(
      ofType(fromIntersections.FETCH_INTERSECTION_TRAFFIC_LIGHTS),
      switchMap((action: fromIntersections.FetchIntersectionSwitching) => {
        const url = action.payload + '/intersection_traffic_lights';
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
            switchMap((t: {list, url, signalModels}) => {
                return [
                  new Alert('success', 'Daten geladen von: ' + t.url),
                  new SetIntersectionTrafficLights(t.list),
                  new SetSignalTypes(t.signalModels),
                ];
              }
            )
          );
      })
    );

  loadFromUrl = <T>(url: string, setActionType: string, init) => {
    return this.httpClient.get<T[]>(url)
      .pipe(
        map((list: T[]) => {
          if (init) {
            for (const element of list) {
              init(element);
            }
          }
          this.store.dispatch(new fromCore.ShowError(
            new Alert('success', 'Daten geladen von: ' + url)));
          return {
            type: setActionType,
            payload: list
          };
        })
      );
  };

  loadFromAction = (action: fromIntersections.FetchAction, urlPart: string, setActionType: string, init?) => {
    const url = action.payload + urlPart;
    console.log(url);
    return this.loadFromUrl(url, setActionType, init);
  };

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromRoot.State>) {
  }
}
