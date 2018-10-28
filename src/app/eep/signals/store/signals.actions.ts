import {Action} from '@ngrx/store';
import {Signal} from '../signal.model';

export const FETCH_SIGNALS = 'FETCH_SIGNALS';
export const SET_SIGNALS = 'SET_SIGNALS';
export const SELECT = 'SELECT';
export const DESELECT = 'DESELECT';
export const ROUTER_NAVIGATION = 'ROUTER_NAVIGATION';

export class FetchSignals implements Action {
  readonly type = FETCH_SIGNALS;

  constructor() {
  }
}

export class SetSignals implements Action {
  readonly type = SET_SIGNALS;

  constructor(public payload: Signal[]) {
  }
}

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: number) {
  }
}

export class Deselect implements Action {
  readonly type = DESELECT;
}

export type SignalActions =
  FetchSignals
  | SetSignals
  | Select
  | Deselect;
