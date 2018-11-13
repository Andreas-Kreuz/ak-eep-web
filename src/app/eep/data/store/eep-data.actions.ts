import {EepData} from '../models/eep-data.model';
import {Action} from '@ngrx/store';

export const FETCH_SLOTS = '[EEP-Data] Fetch slots';
export const SET_SLOTS = '[EEP-Data] Set slots';

export interface FetchAction extends Action {
  payload: string;
}

export class FetchSlots implements Action, FetchAction {
  readonly type = FETCH_SLOTS;

  constructor(public payload: string) {
  }
}

export class SetSlots implements Action {
  readonly type = SET_SLOTS;

  constructor(public payload: EepData[]) {
  }
}

export type EepDataAction =
  FetchSlots
  | SetSlots;
