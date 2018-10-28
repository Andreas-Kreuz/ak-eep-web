import { ActionReducerMap } from '@ngrx/store';

import * as fromSignals from '../eep/signals/store/signals.reducers';

export interface AppState {
  signalList: fromSignals.State;
}

export const reducers: ActionReducerMap<AppState> = {
  signalList: fromSignals.signalsReducer,
};
