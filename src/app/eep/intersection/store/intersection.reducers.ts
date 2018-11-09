import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromIntersection from './intersection.actions';
import {Intersection} from '../models/intersection.model';
import {IntersectionLane} from '../models/intersection-lane.model';
import {IntersectionSwitching} from '../models/intersection-switching.model';
import {signalsWithModel$} from '../../signals/store/signal.reducers';

export interface State {
  intersections: Intersection[];
  intersectionLanes: IntersectionLane[];
  intersectionSwitching: IntersectionSwitching[];
}

const initialState: State = {
  intersections: [],
  intersectionLanes: [],
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
    case fromIntersection.SET_INTERSECTION_LANES:
      return {
        ...state,
        intersectionLanes: [...action.payload],
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

export const intersectionLanes$ = createSelector(
  intersectionsState$,
  (state: State) => state.intersectionLanes
);

export const laneByIntersectionId$ = (intersectionId) => createSelector(
  intersectionLanes$,
  intersections => intersections.filter((i: IntersectionLane) => intersectionId === i.intersectionId)
);


export const intersectionSwitching$ = createSelector(
  intersectionsState$,
  (state: State) => state.intersectionSwitching
);

export const intersectionById$ = (intersectionId) => createSelector(
  intersections$,
  intersections => intersections.find((i: Intersection) => intersectionId === i.id)
);

