import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as CoreAction from './core.actions';
import {Alert} from '../error/alert.model';


export interface State {
  lastAlert: Alert;
  alerts: Alert[];
  pollingEnabled: boolean;
  pollingUrl: string;
}

const initialState: State = {
  lastAlert: new Alert('info', 'Die Anwendung wurde gestartet'),
  alerts: [
    new Alert('info', 'Die Anwendung wurde gestartet')
  ],
  pollingEnabled: false,
  pollingUrl: 'http://localhost:3000',
};

export function reducer(state: State = initialState, action: CoreAction.CoreActions) {
  switch (action.type) {
    case CoreAction.SHOW_ERROR:
      const newState: State = {
        ...state,
        alerts: [action.payload, ...state.alerts.slice(0, Math.min(state.alerts.length, 20))],
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

export const appState = createFeatureSelector('core');

export const getAlerts = createSelector(
  appState,
  (state: State) => state.alerts
);

export const getPollingUrl = createSelector(
  appState,
  (state: State) => state.pollingUrl
);

export const getLastAlert = createSelector(
  appState,
  (state: State) => state.lastAlert
);
