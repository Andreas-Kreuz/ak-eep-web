import * as fromGenericData from './generic-data.actions';


export interface State {
  data: { [key: string]: {} };
}

const initialState: State = {
  data: {},
};

export function reducer(state: State = initialState, action: fromGenericData.GenericDataActions) {
  switch (action.type) {
    case fromGenericData.SET_DATA:
      const type = action.payload.type;
      const values = action.payload.values;
      const newState = { ...state };
      const newData = {
        ...newState.data,
        [type]: values
      };

      return {
        ...state,
        data: newData,
      };
    default:
      return state;
  }
}
