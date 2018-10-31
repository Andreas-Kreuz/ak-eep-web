import {Action} from '@ngrx/store';
import {Alert} from '../error/alert.model';

export const SHOW_ERROR = '[App] SHOW_ERROR';
export const HIDE_ERROR = '[App] HIDE_ERROR';
export const SET_POLLING_URL = '[App] SET_POLLING_URL';
export const SET_POLLING_ENABLED = '[App] SET_POLLING_ENABLED';


export class ShowError implements Action {
  readonly type = SHOW_ERROR;

  constructor(public payload: Alert) {
  }
}

export class HideError implements Action {
  readonly type = HIDE_ERROR;

  /**
   * @param payload Index of the error message
   */
  constructor(public payload: Alert) {
  }
}

export class SetPollingUrl implements Action {
  readonly type = SET_POLLING_URL;

  /**
   * @param payload Index of the error message
   */
  constructor(public payload: string) {
  }
}

export class SetPollingEnabled implements Action {
  readonly type = SET_POLLING_ENABLED;

  /**
   * @param payload Index of the error message
   */
  constructor(public payload: boolean) {
  }
}

export type CoreActions =
  ShowError
  | HideError
  | SetPollingUrl
  | SetPollingEnabled;
