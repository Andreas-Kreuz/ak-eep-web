import {createFeatureSelector, createSelector, select, Store} from '@ngrx/store';

import * as SignalActions from './eep.actions';
import {Signal} from '../signals/signal.model';
import {SignalTypeDefinition} from '../signals/signal-type-definition.model';
import {SignalType} from '../signals/signal-type.model';
import {State} from '../../store/app.reducers';
import {combineLatest} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

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


export const signalState = createFeatureSelector('eep');

export const selectSignals = createSelector(
  signalState,
  (state: SignalState) => {
    // console.log(state.eep);
    return state.signals;
  }
);

export const selectSignalTypes = createSelector(
  signalState,
  (state: SignalState) => state.signalTypes
);

export const selectSignalTypeDefinitions = createSelector(
  signalState,
  (state: SignalState) => state.signalTypeDefinitions
);

export const selectSignalCount = createSelector(
  signalState,
  (state: SignalState) => state.signals.length
);

export const getSortedSignals = createSelector(
  selectSignals,
  (signalList: Signal[]) => {
    signalList.sort((a, b) => {
      const vehicles = b.waitingVehiclesCount - a.waitingVehiclesCount;
      if (vehicles !== 0) {
        return vehicles;
      }
      return a.id - b.id;
    });
    console.log('return sorted signals (' + signalList.length + ')');
    return signalList;
  }
);

export const selectSignalById = (signalId) => createSelector(
  selectSignals,
  signals => signals.find(s => s.id === signalId)
);


export const filledSignals$ = (store: Store<State>) => combineLatest([
  store.pipe(select(selectSignalTypes)),
  store.pipe(select(selectSignalTypeDefinitions)),
  store.pipe(select(selectSignals))
  ]).pipe(
  debounceTime(0),
  map(([
         signalTypes$,
         signalTypeDefinitions$,
         signals$
       ]) => {
    const signalMap: { [id: number]: Signal; } = {};
    for (const signal of signals$) {
      signalMap[signal.id] = signal;
    }
    const signalTypeDefMap: { [id: string]: SignalTypeDefinition; } = {};
    for (const signalTypeDefinition of signalTypeDefinitions$) {
      signalTypeDefMap[signalTypeDefinition.id] = signalTypeDefinition;
    }

    console.log('----------------------------');
    console.log(signalTypeDefMap);
    console.log(signalTypes$);
    console.log(signalMap);

    for (const signalType of signalTypes$) {
      const signal = signalMap[signalType.signalId];
      const model = signalTypeDefMap[signalType.modelId];
      if (signal) {
        signal.model = model;
      }
    }

    return signals$;
  }));
