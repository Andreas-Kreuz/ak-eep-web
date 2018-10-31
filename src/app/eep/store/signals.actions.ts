import {Action} from '@ngrx/store';
import {Signal} from '../signals/signal.model';
import {HttpErrorResponse} from '@angular/common/http';
import {SignalType} from '../signals/signal-type.model';
import {SignalTypeDefinition} from '../signals/signal-type-definition.model';

export const FETCH_SIGNALS = '[Signals] FETCH_SIGNALS';
export const FETCH_SIGNAL_TYPE_DEFINITIONS = '[Signals] FETCH_SIGNAL_TYPE_DEFINITIONS';
export const FETCH_SIGNAL_TYPES = '[Signals] FETCH_SIGNAL_TYPES';
export const SET_SIGNALS = '[Signals] SET_SIGNALS';
export const SET_SIGNAL_TYPES = '[Signals] SET_SIGNAL_TYPES';
export const SET_SIGNAL_TYPE_DEFINITIONS = '[Signals] SET_SIGNAL_TYPE_DEFINITIONS';
export const SELECT = '[Signals] SELECT';
export const DESELECT = '[Signals] DESELECT';
export const ERROR = '[Signals] ERROR';

export class FetchSignals implements Action {
  readonly type = FETCH_SIGNALS;

  constructor(public payload: string) {
  }
}

export class FetchSignalTypes implements Action {
  readonly type = FETCH_SIGNAL_TYPES;

  constructor(public payload: string) {
  }
}

export class FetchSignalTypeDefinitions implements Action {
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

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: number) {
  }
}

export class Error implements Action {
  readonly type = ERROR;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class Deselect implements Action {
  readonly type = DESELECT;
}

export type SignalActions =
  FetchSignals
  | FetchSignalTypeDefinitions
  | FetchSignalTypes
  | SetSignals
  | SetSignalTypes
  | SetSignalTypeDefinitions
  | Select
  | Deselect
  | Error;
