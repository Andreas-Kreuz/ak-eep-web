import * as CoreAction from './core.actions';
import {Alert} from '../error/alert.model';
import {createSelector} from '@ngrx/store';
import {State} from '../../store/app.reducers';

export const appState = (state: State) => state.core;

export const getAlerts = createSelector(
  appState,
  (globalState: CoreState) => globalState.alerts
);

export const getPollingUrl = createSelector(
  appState,
  (state: CoreState) => state.pollingUrl
);

export const getLastAlert = createSelector(
  appState,
  (state: CoreState) => state.lastAlert
);

export interface CoreState {
  lastAlert: Alert;
  alerts: Alert[];
  pollingEnabled: boolean;
  pollingUrl: string;
}

const initialState: CoreState = {
  lastAlert: new Alert('info', 'Die Anwendung wurde gestartet'),
  alerts: [
    new Alert('info', 'Die Anwendung wurde gestartet')
  ],
  pollingEnabled: false,
  pollingUrl: 'http://localhost:3000',
};

export function coreReducer(state: CoreState = initialState, action: CoreAction.CoreActions) {
  switch (action.type) {
    case CoreAction.SHOW_ERROR:
      const newState: CoreState = {
        ...state,
        alerts: [action.payload, ...state.alerts.slice(0, Math.max(state.alerts.length, 9))],
        lastAlert: action.payload,
      };
      return newState;
    case CoreAction.HIDE_ERROR:
      const oldErrors = [...state.alerts];
      oldErrors.splice(state.alerts.indexOf(action.payload), 1);
      return {
        ...state,
        alerts: oldErrors
      };
    case CoreAction.SET_POLLING_ENABLED:
      return {
        ...state,
        pollingEnabled: action.payload
      };
    case CoreAction.SET_POLLING_URL:
      return {
        ...state,
        pollingUrl: action.payload
      };
    default:
      return state;
  }
}
