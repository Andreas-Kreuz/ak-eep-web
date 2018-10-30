import * as SignalActions from './signals.actions';
import {Signal} from '../signal.model';

export interface SignalsState {
  signals: Signal[];
  selectedSignalIndex: number;
}

const initialState: SignalsState = {
  signals: [],
  selectedSignalIndex: -1,
};

export function signalsReducer(state: SignalsState = initialState, action: SignalActions.SignalActions) {
  switch (action.type) {
    case SignalActions.SET_SIGNALS:
      const newState: SignalsState = {
        ...state,
        signals: [...action.payload],
      };
      return newState;
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
