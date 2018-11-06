import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromIntersection from './intersection.actions';
import {Intersection} from '../models/intersection.model';
import {IntersectionDirections} from '../models/intersection-directions.model';
import {IntersectionSwitchings} from '../models/intersection-switchings.model';

export interface State {
  intersections: Intersection[];
  intersectionDirections: IntersectionDirections[];
  intersectionSwitching: IntersectionSwitchings[];
}

const initialState: State = {
  intersections: [],
  intersectionDirections: [],
  intersectionSwitching: [],
};

export function reducer(state: State = initialState, action: fromIntersection.IntersectionActions) {
  switch (action.type) {
    case fromIntersection.SET_INTERSECTIONS:
      return {
        ...state,
        intersections: [...action.payload],
      };
    case fromIntersection.SET_INTERSECTION_SWITCHING:
      return {
        ...state,
        intersectionSwitching: [...action.payload],
      };
    case fromIntersection.SET_INTERSECTION_DIRECTIONS:
      return {
        ...state,
        intersectionDirections: [...action.payload],
      };
    default:
      return state;
  }
}

export const intersectionsState$ = createFeatureSelector('intersection');

export const intersections$ = createSelector(
  intersectionsState$,
  (state: State) => state.intersections
);

export const intersectionsCount$ = createSelector(
  intersectionsState$,
  (state: State) => state.intersections.length
);
export const intersectionDirections$ = createSelector(
  intersectionsState$,
  (state: State) => state.intersectionDirections
);

export const intersectionSwitching$ = createSelector(
  intersectionsState$,
  (state: State) => state.intersectionSwitching
);

