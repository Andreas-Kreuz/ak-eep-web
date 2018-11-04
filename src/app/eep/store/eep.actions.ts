import {Action} from '@ngrx/store';
import {Signal} from '../signals/models/signal.model';
import {HttpErrorResponse} from '@angular/common/http';
import {SignalType} from '../signals/models/signal-type.model';
import {SignalTypeDefinition} from '../signals/models/signal-type-definition.model';
import {Intersection} from '../intersection/models/intersection.model';
import {IntersectionDirections} from '../intersection/models/intersection-directions.model';
import {IntersectionSwitchings} from '../intersection/models/intersection-switchings.model';

export const FETCH_SIGNALS = '[Signals] FETCH_SIGNALS';
export const FETCH_SIGNAL_TYPE_DEFINITIONS = '[Signals] FETCH_SIGNAL_TYPE_DEFINITIONS';
export const FETCH_SIGNAL_TYPES = '[Signals] FETCH_SIGNAL_TYPES';
export const SET_SIGNALS = '[Signals] SET_SIGNALS';
export const SET_SIGNAL_TYPES = '[Signals] SET_SIGNAL_TYPES';
export const SET_SIGNAL_TYPE_DEFINITIONS = '[Signals] SET_SIGNAL_TYPE_DEFINITIONS';
export const SELECT_SIGNAL = '[Signals] Select';
export const DESELECT_SIGNAL = '[Signals] Deselect';
export const ERROR = '[Signals] ERROR';
export const FETCH_INTERSECTIONS = '[Intersections] Fetch';
export const FETCH_INTERSECTION_SWITCHINGS = '[Intersections] Fetch Switchings';
export const FETCH_INTERSECTION_DIRECTIONS = '[Intersections] Fetch Directions';
export const SET_INTERSECTIONS = '[Intersections] Set';
export const SET_INTERSECTION_SWITCHINGS = '[Intersections] Set Switchings';
export const SET_INTERSECTION_DIRECTIONS = '[Intersections] Set Directions';

export interface FetchAction extends Action {
  payload: string;
}

export class FetchSignals implements Action, FetchAction {
  readonly type = FETCH_SIGNALS;

  constructor(public payload: string) {
  }
}

export class FetchSignalTypes implements Action, FetchAction {
  readonly type = FETCH_SIGNAL_TYPES;

  constructor(public payload: string) {
  }
}

export class FetchSignalTypeDefinitions implements Action, FetchAction {
  readonly type = FETCH_SIGNAL_TYPE_DEFINITIONS;

  constructor(public payload: string) {
  }
}

export class SetSignals implements Action {
  readonly type = SET_SIGNALS;

  constructor(public payload: Signal[]) {
  }
}

export class SetSignalTypes implements Action {
  readonly type = SET_SIGNAL_TYPES;

  constructor(public payload: SignalType[]) {
  }
}

export class SetSignalTypeDefinitions implements Action {
  readonly type = SET_SIGNAL_TYPE_DEFINITIONS;

  constructor(public payload: SignalTypeDefinition[]) {
  }
}

export class SelectSignal implements Action {
  readonly type = SELECT_SIGNAL;

  constructor(public payload: number) {
  }
}

export class LogError implements Action {
  readonly type = ERROR;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class DeselectSignal implements Action {
  readonly type = DESELECT_SIGNAL;
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

export class FetchIntersectionSwitchings implements Action, FetchAction {
  readonly type = FETCH_INTERSECTION_SWITCHINGS;

  constructor(public payload: string) {
  }
}

export class SetIntersectionSwitchings implements Action {
  readonly type = SET_INTERSECTION_SWITCHINGS;

  constructor(public payload: IntersectionSwitchings[]) {
  }
}


export type SignalActions =
  FetchSignals
  | FetchSignalTypeDefinitions
  | FetchSignalTypes
  | SetSignals
  | SetSignalTypes
  | SetSignalTypeDefinitions
  | SelectSignal
  | DeselectSignal
  | FetchIntersections
  | SetIntersections
  | FetchIntersectionDirections
  | SetIntersectionDirections
  | FetchIntersectionSwitchings
  | SetIntersectionSwitchings
  | LogError;
