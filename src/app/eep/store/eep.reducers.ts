import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as SignalActions from './eep.actions';
import {Signal} from '../signals/signal.model';
import {SignalTypeDefinition} from '../signals/signal-type-definition.model';
import {SignalType} from '../signals/signal-type.model';

export interface SignalState {
  signals: Signal[];
  signalTypes: SignalType[];
  signalTypeDefinitions: SignalTypeDefinition[];
  selectedSignalIndex: number;
}

const initialState: SignalState = {
  signals: [],
  signalTypes: [],
  signalTypeDefinitions: [],
  selectedSignalIndex: -1,
};

export function signalsReducer(state: SignalState = initialState, action: SignalActions.SignalActions) {
  switch (action.type) {
    case SignalActions.SET_SIGNALS:
      const newState1: SignalState = {
        ...state,
        signals: [...action.payload],
      };
      return newState1;
    case SignalActions.SET_SIGNAL_TYPES:
      const newState2: SignalState = {
        ...state,
        signalTypes: [...action.payload],
      };
      return newState2;
    case SignalActions.SET_SIGNAL_TYPE_DEFINITIONS:
      const newState3: SignalState = {
        ...state,
        signalTypeDefinitions: [...action.payload],
      };
      return newState3;
    case SignalActions.SELECT:
      return {
        ...state,
        selectedSignalIndex: action.payload,
      };
    case SignalActions.DESELECT:
      return {
        ...state,
        selectedSignalIndex: -1,
      };
    default:
      return state;
  }
}


export const signalState$ = createFeatureSelector('eep');

export const signals$ = createSelector(
  signalState$,
  (state: SignalState) => state.signals
);

export const signalTypes$ = createSelector(
  signalState$,
  (state: SignalState) => state.signalTypes
);

export const signalTypeDefinitions$ = createSelector(
  signalState$,
  (state: SignalState) => state.signalTypeDefinitions
);


export const signalCount$ = createSelector(
  signalState$,
  (state: SignalState) => state.signals.length
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
  signals$,
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
