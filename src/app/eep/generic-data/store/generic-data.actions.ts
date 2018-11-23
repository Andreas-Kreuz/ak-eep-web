import {Action} from '@ngrx/store';

export const FETCH_DATA = '[Generic Data] Fetch Data';
export const SET_DATA = '[Generic Data] Set Data';

export class FetchData implements Action {
  readonly type = FETCH_DATA;

  constructor(public payload: { host: string, path: string }) {
  }
}

export class UpdateData implements Action {
  readonly type = SET_DATA;

  /**
   * @param payload Version as String
   */
  constructor(public payload: { type: string, values: {} }) {
  }
}

export type GenericDataActions =
  FetchData |
  UpdateData;
