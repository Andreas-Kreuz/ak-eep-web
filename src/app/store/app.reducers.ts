import {ActionReducerMap, createSelector} from '@ngrx/store';

import * as fromSignals from '../eep/signals/store/signals.reducers';
import {SignalsState} from '../eep/signals/store/signals.reducers';
import * as fromErrors from '../core/error/store/error.reducers';
import {ErrorState} from '../core/error/store/error.reducers';


export interface AppState {
  signals: fromSignals.SignalsState;
  errors: fromErrors.ErrorState;
}

export const reducers: ActionReducerMap<AppState> = {
  signals: fromSignals.signalsReducer,
  errors: fromErrors.errorReducer,
};


export const signalState = (state: AppState) => state.signals;

export const getSignals = createSelector(
  signalState,
  (state: SignalsState) => state.signals
);

export const signalCount = createSelector(
  signalState,
  (state: SignalsState) => state.signals.length
);

export const getSortedSignals = createSelector(
  getSignals,
  (signals) => {
    signals.sort((a, b) => {
      const vehicles = b.waitingVehiclesCount - a.waitingVehiclesCount;
      if (vehicles !== 0) {
        return vehicles;
      }
      return a.id - b.id;
    });
    console.log('return sorted signals (' + signals.length + ')');
    return signals;
  }
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

