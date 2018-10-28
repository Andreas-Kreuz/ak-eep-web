import * as SignalActions from './signals.actions';
import {Signal} from '../signal.model';

export interface State {
  signals: Signal[];
  selectedSignalIndex: number;
}

const initialState: State = {
  signals: [],
  selectedSignalIndex: -1,
};

export function signalsReducer(state: State = initialState, action: SignalActions.SignalActions) {
  switch (action.type) {
    case SignalActions.SET_SIGNALS:
      const newState: State = {
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
