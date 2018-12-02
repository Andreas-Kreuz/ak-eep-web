import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromDataTypes from './data-types.actions';
import {DataType} from '../data-type';

export interface State {
  availableDataTypes: DataType[];
}

const initialState: State = {
  availableDataTypes: [],
};

export function reducer(state: State = initialState, action: fromDataTypes.DataTypesActions) {
  switch (action.type) {
    case fromDataTypes.SET_DATA_TYPES:
      return {
        ...state,
        availableDataTypes: [...action.payload],
      };
    default:
      return state;
  }
}

export const dataTypesState$ = createFeatureSelector('signal');

export const availableDataTypes$ = createSelector(
  dataTypesState$,
  (state: State) => state.availableDataTypes
);
