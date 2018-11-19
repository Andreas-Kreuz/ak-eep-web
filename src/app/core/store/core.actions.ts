import {Action} from '@ngrx/store';
import {Alert} from '../error/alert.model';
import {EepWebUrl} from '../server-status/eep-web-url.model';

export const SHOW_ERROR = '[App] SHOW_ERROR';
export const HIDE_ERROR = '[App] HIDE_ERROR';
export const SET_POLLING_URL = '[App] SET_POLLING_URL';
export const SET_POLLING_ENABLED = '[App] Set Polling Enabled';
export const SET_CONNECTED = '[App] Connected';
export const SET_EEP_VERSION = '[App] Set EEP version';
export const SET_EEP_LUA_VERSION = '[App] Set EEP Lua version';
export const SET_EEP_WEB_VERSION = '[App] Set EEP Web version';
export const SHOW_URL_ERROR = '[App] Show URL error';
export const SHOW_URL_SUCCESS = '[App] Show URL success';


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

export class ShowUrlError implements Action {
  readonly type = SHOW_URL_ERROR;

  /** @param payload URL   */
  constructor(public payload: EepWebUrl) {
  }
}

export class ShowUrlSuccess implements Action {
  readonly type = SHOW_URL_SUCCESS;

  /** @param payload URL   */
  constructor(public payload: EepWebUrl) {
  }
}

export class SetEepVersion implements Action {
  readonly type = SET_EEP_VERSION;

  /**
   * @param payload Version as String
   */
  constructor(public payload: string) {
  }
}

export class SetEepLuaVersion implements Action {
  readonly type = SET_EEP_LUA_VERSION;

  /**
   * @param payload Version as String
   */
  constructor(public payload: string) {
  }
}

export class SetEepWebVersion implements Action {
  readonly type = SET_EEP_WEB_VERSION;

  /**
   * @param payload Version as String
   */
  constructor(public payload: string) {
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

export class SetConnected implements Action {
  readonly type = SET_CONNECTED;
}

export type CoreActions =
  ShowError
  | HideError
  | ShowUrlError
  | ShowUrlSuccess
  | SetPollingUrl
  | SetPollingEnabled
  | SetConnected
  | SetEepVersion
  | SetEepLuaVersion
  | SetEepWebVersion;
