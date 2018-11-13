import {ActionReducerMap} from '@ngrx/store';

import * as fromCore from './core/store/core.reducers';
import * as fromEepData from './eep/data/store/eep-data.reducers';
import * as fromIntersection from './eep/intersection/store/intersection.reducers';
import * as fromSignal from './eep/signals/store/signal.reducers';


export interface State {
  core: fromCore.State;
  eepData: fromEepData.State;
  intersection: fromIntersection.State;
  signal: fromSignal.State;
}

export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer,
  eepData: fromEepData.reducer,
  intersection: fromIntersection.reducer,
  signal: fromSignal.reducer,
};
