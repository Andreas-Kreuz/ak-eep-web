import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromSignal from './signal.actions';
import {Signal} from '../models/signal.model';
import {SignalType} from '../models/signal-type.model';
import {SignalTypeDefinition} from '../models/signal-type-definition.model';

export interface State {
  signals: Signal[];
  signalTypes: SignalType[];
  signalTypeDefinitions: SignalTypeDefinition[];
  selectedSignalIndex: number;
}

const initialState: State = {
  signals: [],
  signalTypes: [],
  signalTypeDefinitions: [],
  selectedSignalIndex: -1,
};

export function reducer(state: State = initialState, action: fromSignal.SignalActions) {
  switch (action.type) {
    case fromSignal.SET_SIGNALS:
      return {
        ...state,
        signals: [...action.payload],
      };
    case fromSignal.SET_SIGNAL_TYPES:
      return {
        ...state,
        signalTypes: [...action.payload],
      };
    case fromSignal.SET_SIGNAL_TYPE_DEFINITIONS:
      return {
        ...state,
        signalTypeDefinitions: [...action.payload],
      };
    case fromSignal.SELECT_SIGNAL:
      return {
        ...state,
        selectedSignalIndex: action.payload,
      };
    case fromSignal.DESELECT_SIGNAL:
      return {
        ...state,
        selectedSignalIndex: -1,
      };
    default:
      return state;
  }
}


export const signalState$ = createFeatureSelector('signal');

export const signals$ = createSelector(
  signalState$,
  (state: State) => state.signals
);

export const signalTypes$ = createSelector(
  signalState$,
  (state: State) => state.signalTypes
);

export const signalTypeDefinitions$ = createSelector(
  signalState$,
  (state: State) => state.signalTypeDefinitions
);


export const signalCount$ = createSelector(
  signalState$,
  (state: State) => state.signals.length
);

const sortedSignal = (signalList: Signal[]) => {
  signalList.sort((a, b) => {
    const vehicles = b.waitingVehiclesCount - a.waitingVehiclesCount;
    if (vehicles !== 0) {
      return vehicles;
    }
    return a.id - b.id;
  });
  console.log('return sorted signals (' + signalList.length + ')');
  return signalList;
};

export const getSortedSignals$ = createSelector(
  signals$,
  sortedSignal
);

export const selectSignalById$ = (signalId) => createSelector(
  signalsWithModel$,
  signals => signals.find(s => s.id === signalId)
);


const signalIdToModels$ = createSelector(
  signalTypes$,
  signalTypeDefinitions$,
  (signalTypes, signalTypeDefinitions) => {
    const signalTypeDefMap: Map<string, SignalTypeDefinition> = new Map();
    for (const signalTypeDefinition of signalTypeDefinitions) {
      signalTypeDefMap[signalTypeDefinition.id] = signalTypeDefinition;
    }

    // Fill signal type definition map
    const signalTypeDefinitionMap = new Map<number, SignalTypeDefinition>();
    for (const signalType of signalTypes) {
      const model = signalTypeDefMap[signalType.modelId];
      signalTypeDefinitionMap.set(signalType.signalId, model);
    }
    return signalTypeDefinitionMap;
  }
);

export const signalsWithModel$ = createSelector(
  signals$,
  signalIdToModels$,
  (signals: Signal[], signalTypeDefinitionMap: Map<number, SignalTypeDefinition>) => {
    for (const signal of signals) {
      const type = signalTypeDefinitionMap.get(signal.id);
      if (type) {
        signal.model = type;
      }
    }
    return signals;
  }
);