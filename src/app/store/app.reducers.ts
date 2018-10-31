import {ActionReducerMap, createSelector} from '@ngrx/store';

import * as fromSignals from '../eep/store/signals.reducers';
import * as fromCore from '../core/store/core.reducers';


export interface State {
  signals: fromSignals.SignalState;
  core: fromCore.CoreState;
}

export const reducers: ActionReducerMap<State> = {
  signals: fromSignals.signalsReducer,
  core: fromCore.coreReducer,
};



