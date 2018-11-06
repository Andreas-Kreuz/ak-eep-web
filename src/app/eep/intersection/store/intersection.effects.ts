import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as fromCore from '../../../core/store/core.actions';
import * as fromIntersections from './intersection.actions';
import {Alert} from '../../../core/error/alert.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import {of} from 'rxjs';


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
      ofType(fromIntersections.FETCH_INTERSECTION_DIRECTIONS),
      switchMap((action: fromIntersections.FetchIntersectionDirections) =>
        this.loadFromAction(action,
          '/intersection_directions',
          fromIntersections.SET_INTERSECTION_DIRECTIONS)),
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

  loadFromUrl = <T>(url: string, setActionType: string) => {
    return this.httpClient.get<T[]>(url)
      .pipe(
        map((list: T[]) => {
          this.store.dispatch(new fromCore.ShowError(
            new Alert('success', 'Daten geladen von: ' + url)));
          return {
            type: setActionType,
            payload: list
          };
        })
      );
  };

  loadFromAction = (action: fromIntersections.FetchAction, urlPart: string, setActionType: string) => {
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
