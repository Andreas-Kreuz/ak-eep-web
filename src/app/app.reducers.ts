import {ActionReducerMap} from '@ngrx/store';

import * as fromCore from './core/store/core.reducers';
import * as fromEepData from './eep/data/store/eep-data.reducers';
import * as fromGenericData from './eep/generic-data/store/generic-data.reducers';
import * as fromLogViewer from './eep/log-viewer/store/log-file.reducers';
import * as fromIntersection from './eep/intersection/store/intersection.reducers';
import * as fromSignal from './eep/signals/store/signal.reducers';


export interface State {
  core: fromCore.State;
  eepData: fromEepData.State;
  genericData: fromGenericData.State;
  logViewer: fromLogViewer.State;
  intersection: fromIntersection.State;
  signal: fromSignal.State;
}

export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer,
  eepData: fromEepData.reducer,
  genericData: fromGenericData.reducer,
  logViewer: fromLogViewer.reducer,
  intersection: fromIntersection.reducer,
  signal: fromSignal.reducer,
};
