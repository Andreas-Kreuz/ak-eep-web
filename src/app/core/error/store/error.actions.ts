import {Action} from '@ngrx/store';
import {Alert} from '../alert.model';

export const SHOW = 'SHOW';
export const HIDE = 'HIDE';


export class ShowError implements Action {
  readonly type = SHOW;

  constructor(public payload: Alert) {
  }
}

export class HideError implements Action {
  readonly type = HIDE;

  /**
   * @param payload Index of the error message
   */
  constructor(public payload: Alert) {
  }
}

export type ErrorActions =
  ShowError
  | HideError;
