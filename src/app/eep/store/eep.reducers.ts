import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as SignalActions from './eep.actions';
import {Signal} from '../signals/models/signal.model';
import {SignalTypeDefinition} from '../signals/models/signal-type-definition.model';
import {SignalType} from '../signals/models/signal-type.model';
import {Intersection} from '../intersection/models/intersection.model';
import {IntersectionDirections} from '../intersection/models/intersection-directions.model';
import {IntersectionSwitchings} from '../intersection/models/intersection-switchings.model';

export interface EepState {
  signals: Signal[];
  signalTypes: SignalType[];
  signalTypeDefinitions: SignalTypeDefinition[];
  selectedSignalIndex: number;
  intersections: Intersection[];
  intersectionDirections: IntersectionDirections[];
  intersectionSwitchings: IntersectionSwitchings[];
}

const initialState: EepState = {
  signals: [],
  signalTypes: [],
  signalTypeDefinitions: [],
  selectedSignalIndex: -1,
  intersections: [],
  intersectionDirections: [],
  intersectionSwitchings: [],
};

export function signalsReducer(state: EepState = initialState, action: SignalActions.SignalActions) {
  switch (action.type) {
    case SignalActions.SET_SIGNALS:
      return {
        ...state,
        signals: [...action.payload],
      };
    case SignalActions.SET_SIGNAL_TYPES:
      return {
        ...state,
        signalTypes: [...action.payload],
      };
    case SignalActions.SET_SIGNAL_TYPE_DEFINITIONS:
      return {
        ...state,
        signalTypeDefinitions: [...action.payload],
      };
    case SignalActions.SELECT_SIGNAL:
      return {
        ...state,
        selectedSignalIndex: action.payload,
      };
    case SignalActions.DESELECT_SIGNAL:
      return {
        ...state,
        selectedSignalIndex: -1,
      };
    case SignalActions.SET_INTERSECTIONS:
      return {
        ...state,
        intersections: [...action.payload],
      };
    case SignalActions.SET_INTERSECTION_SWITCHINGS:
      return {
        ...state,
        intersectionSwitchings: [...action.payload],
      };
    case SignalActions.SET_INTERSECTION_DIRECTIONS:
      return {
        ...state,
        intersectionDirections: [...action.payload],
      };
    default:
      return state;
  }
}


export const eepState$ = createFeatureSelector('eep');

export const signals$ = createSelector(
  eepState$,
  (state: EepState) => state.signals
);

export const signalTypes$ = createSelector(
  eepState$,
  (state: EepState) => state.signalTypes
);

export const signalTypeDefinitions$ = createSelector(
  eepState$,
  (state: EepState) => state.signalTypeDefinitions
);


export const signalCount$ = createSelector(
  eepState$,
  (state: EepState) => state.signals.length
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

export const intersections$ = createSelector(
  eepState$,
  (state: EepState) => state.intersections
);

export const intersectionsCount$ = createSelector(
  eepState$,
  (state: EepState) => state.intersections.length
);
