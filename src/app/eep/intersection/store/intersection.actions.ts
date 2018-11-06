import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {Intersection} from '../models/intersection.model';
import {IntersectionDirections} from '../models/intersection-directions.model';
import {IntersectionSwitchings} from '../models/intersection-switchings.model';

export const ERROR = '[Intersections] Error on fetching';
export const FETCH_INTERSECTIONS = '[Intersections] Fetch';
export const FETCH_INTERSECTION_SWITCHING = '[Intersections] Fetch Switching';
export const FETCH_INTERSECTION_DIRECTIONS = '[Intersections] Fetch Directions';
export const SET_INTERSECTIONS = '[Intersections] Set';
export const SET_INTERSECTION_SWITCHING = '[Intersections] Set Switching';
export const SET_INTERSECTION_DIRECTIONS = '[Intersections] Set Directions';

export interface FetchAction extends Action {
  payload: string;
}

export class LogError implements Action {
  readonly type = ERROR;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class FetchIntersections implements Action, FetchAction {
  readonly type = FETCH_INTERSECTIONS;

  constructor(public payload: string) {
  }
}

export class SetIntersections implements Action {
  readonly type = SET_INTERSECTIONS;

  constructor(public payload: Intersection[]) {
  }
}

export class FetchIntersectionDirections implements Action, FetchAction {
  readonly type = FETCH_INTERSECTION_DIRECTIONS;

  constructor(public payload: string) {
  }
}

export class SetIntersectionDirections implements Action {
  readonly type = SET_INTERSECTION_DIRECTIONS;

  constructor(public payload: IntersectionDirections[]) {
  }
}

export class FetchIntersectionSwitching implements Action, FetchAction {
  readonly type = FETCH_INTERSECTION_SWITCHING;

  constructor(public payload: string) {
  }
}

export class SetIntersectionSwitching implements Action {
  readonly type = SET_INTERSECTION_SWITCHING;

  constructor(public payload: IntersectionSwitchings[]) {
  }
}

export type IntersectionActions =
  FetchIntersections
  | SetIntersections
  | FetchIntersectionDirections
  | SetIntersectionDirections
  | FetchIntersectionSwitching
  | SetIntersectionSwitching
  | LogError;
