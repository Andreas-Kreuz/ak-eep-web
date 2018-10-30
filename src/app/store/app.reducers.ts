import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromSignals from '../eep/signals/store/signals.reducers';
import {SignalsState} from '../eep/signals/store/signals.reducers';


export interface AppState {
  signals: fromSignals.SignalsState;
}

export const reducers: ActionReducerMap<AppState> = {
  signals: fromSignals.signalsReducer,
};




export const signalState = (state: AppState) => state.signals;

export const getSignals = createSelector(
  signalState,
  (state: SignalsState) => state.signals
);

export const bySignalId = createSelector(
  getSignals,
  (signals, signalId) => {
    if (signals) {
      return signals.find(signal => {
        return signal.id === signalId;
      });
    } else {
      return null;
    }
  });

