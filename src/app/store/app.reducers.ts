import {ActionReducerMap, createSelector} from '@ngrx/store';

import * as fromEep from '../eep/store/eep.reducers';
import * as fromCore from '../core/store/core.reducers';


export interface State {
  eep: fromEep.SignalState;
  core: fromCore.CoreState;
}

export const reducers: ActionReducerMap<State> = {
  eep: fromEep.signalsReducer,
  core: fromCore.coreReducer,
};



