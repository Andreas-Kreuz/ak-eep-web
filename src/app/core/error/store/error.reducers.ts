import * as ErrorActions from './error.actions';
import {Alert} from '../alert.model';
import {createSelector} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';

export const errorState = (state: AppState) => state.errors;

export const getAlerts = createSelector(
  errorState,
  (state: ErrorState) => state.errors
);

export const getLastAlert = createSelector(
  errorState,
  (state: ErrorState) => state.lastError
);

export interface ErrorState {
  lastError: Alert;
  errors: Alert[];
}

const initialState: ErrorState = {
  lastError: new Alert('info', 'App started'),
  errors: [
    new Alert('info', 'App started')
  ],
};

export function errorReducer(state: ErrorState = initialState, action: ErrorActions.ErrorActions) {
  switch (action.type) {
    case ErrorActions.SHOW:
      const newState: ErrorState = {
        ...state,
        errors: [...state.errors.slice(Math.max(state.errors.length - 9, 0)), action.payload],
        lastError: action.payload,
      };
      return newState;
    case ErrorActions.HIDE:
      const oldErrors = [...state.errors];
      oldErrors.splice(state.errors.indexOf(action.payload), 1);
      return {
        ...state,
        errors: oldErrors
      };
    default:
      return state;
  }
}
