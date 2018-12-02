import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {Intersection} from '../models/intersection.model';
import {IntersectionLane} from '../models/intersection-lane.model';
import {IntersectionSwitching} from '../models/intersection-switching.model';
import {IntersectionTrafficLight} from '../models/intersection-traffic-light.model';

export const SET_INTERSECTIONS = '[Intersections] Set';
export const SET_INTERSECTION_SWITCHING = '[Intersections] Set Switching';
export const SET_INTERSECTION_LANES = '[Intersections] Set Lanes';
export const SET_INTERSECTION_TRAFFIC_LIGHTS = '[Intersections] Set Traffic Lights';

export class SetIntersections implements Action {
  readonly type = SET_INTERSECTIONS;

  constructor(public payload: Intersection[]) {
  }
}

export class SetIntersectionLanes implements Action {
  readonly type = SET_INTERSECTION_LANES;

  constructor(public payload: IntersectionLane[]) {
  }
}

export class SetIntersectionSwitching implements Action {
  readonly type = SET_INTERSECTION_SWITCHING;

  constructor(public payload: IntersectionSwitching[]) {
  }
}

export class SetIntersectionTrafficLights implements Action {
  readonly type = SET_INTERSECTION_TRAFFIC_LIGHTS;

  constructor(public payload: IntersectionTrafficLight[]) {
  }
}

export type IntersectionActions =
  SetIntersections
  | SetIntersectionLanes
  | SetIntersectionSwitching
  | SetIntersectionTrafficLights;
