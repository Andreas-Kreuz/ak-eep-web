import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {Intersection} from '../models/intersection.model';
import {IntersectionLane} from '../models/intersection-lane.model';
import {IntersectionSwitching} from '../models/intersection-switching.model';
import {IntersectionTrafficLight} from '../models/intersection-traffic-light.model';

export const ERROR = '[Intersections] Error on fetching';
export const FETCH_INTERSECTIONS = '[Intersections] Fetch';
export const FETCH_INTERSECTION_SWITCHING = '[Intersections] Fetch Switching';
export const FETCH_INTERSECTION_LANES = '[Intersections] Fetch Lanes';
export const FETCH_INTERSECTION_TRAFFIC_LIGHTS = '[Intersections] Fetch Traffic Lights';
export const SET_INTERSECTIONS = '[Intersections] Set';
export const SET_INTERSECTION_SWITCHING = '[Intersections] Set Switching';
export const SET_INTERSECTION_LANES = '[Intersections] Set Lanes';
export const SET_INTERSECTION_TRAFFIC_LIGHTS = '[Intersections] Set Traffic Lights';

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

export class FetchIntersectionLanes implements Action, FetchAction {
  readonly type = FETCH_INTERSECTION_LANES;

  constructor(public payload: string) {
  }
}

export class SetIntersectionDirections implements Action {
  readonly type = SET_INTERSECTION_LANES;

  constructor(public payload: IntersectionLane[]) {
  }
}

export class FetchIntersectionSwitching implements Action, FetchAction {
  readonly type = FETCH_INTERSECTION_SWITCHING;

  constructor(public payload: string) {
  }
}

export class SetIntersectionSwitching implements Action {
  readonly type = SET_INTERSECTION_SWITCHING;

  constructor(public payload: IntersectionSwitching[]) {
  }
}

export class FetchIntersectionTrafficLights implements Action, FetchAction {
  readonly type = FETCH_INTERSECTION_TRAFFIC_LIGHTS;

  constructor(public payload: string) {
  }
}

export class SetIntersectionTrafficLights implements Action {
  readonly type = SET_INTERSECTION_TRAFFIC_LIGHTS;

  constructor(public payload: IntersectionTrafficLight[]) {
  }
}

export type IntersectionActions =
  FetchIntersections
  | SetIntersections
  | FetchIntersectionLanes
  | SetIntersectionDirections
  | FetchIntersectionSwitching
  | SetIntersectionSwitching
  | FetchIntersectionTrafficLights
  | SetIntersectionTrafficLights
  | LogError;
