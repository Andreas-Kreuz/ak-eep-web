import * as fromEepData from './eep-data.actions';
import {EepData} from '../models/eep-data.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  eepData: EepData[];
}

const initialState: State = {
  eepData: [],
};

export function reducer(state: State = initialState, action: fromEepData.EepDataAction) {
  switch (action.type) {
    case fromEepData.SET_SLOTS:
      return {
        ...state,
        eepData: [...action.payload],
      };
    default:
      return state;
  }
}

export const eepDataState$ = createFeatureSelector('eepData');

export const eepData$ = createSelector(
  eepDataState$,
  (state: State) => state.eepData
);

export const eepDataCount$ = createSelector(
  eepDataState$,
  (state: State) => state.eepData.length
);
