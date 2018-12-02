import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import * as fromIntersections from './intersection.actions';
import {of} from 'rxjs';
import {IntersectionLane} from '../models/intersection-lane.model';
import * as fromSignals from '../../signals/store/signal.actions';
import {IntersectionTrafficLight} from '../models/intersection-traffic-light.model';
import {IntersectionService} from './intersection.service';
import {WsEvent} from '../../../core/socket/ws-event';
import {Intersection} from '../models/intersection.model';
import {IntersectionSwitching} from '../models/intersection-switching.model';

@Injectable()
export class IntersectionEffects {
  @Effect()
  fetchIntersectionTrafficLights$ = this.intersectionService.getTrafficLightActions()
    .pipe(
      switchMap(
        (wsEvent: WsEvent) => {
          const list: IntersectionTrafficLight[] = JSON.parse(wsEvent.payload);
          const signalModels = new Map<number, string>();
          for (const element of list) {
            if (!element.lightStructures) {
              element.lightStructures = {};
            }
            if (!element.axisStructures) {
              element.axisStructures = [];
            }
            if (element.modelId) {
              signalModels.set(element.signalId, element.modelId);
            }
          }
          return of(
            new fromIntersections.SetIntersectionTrafficLights(list),
            new fromSignals.SetSignalTypes(signalModels),
          );
        }
      )
    );

  @Effect()
  fetchIntersections$ = this.intersectionService.getIntersectionActions()
    .pipe(
      switchMap(
        (wsEvent: WsEvent) => {
          const list: Intersection[] = JSON.parse(wsEvent.payload);

          return of(
            new fromIntersections.SetIntersections(list),
          );
        }
      )
    );

  @Effect()
  fetchIntersectionSwitchings$ = this.intersectionService.getSwitchingActions()
    .pipe(
      switchMap(
        (wsEvent: WsEvent) => {
          const list: IntersectionSwitching[] = JSON.parse(wsEvent.payload);

          return of(
            new fromIntersections.SetIntersectionSwitching(list),
          );
        }
      )
    );

  @Effect()
  intersectionLanesActions$ = this.intersectionService.getLaneActions()
    .pipe(
      switchMap(
        (wsEvent: WsEvent) => {
          const list: IntersectionLane[] = JSON.parse(wsEvent.payload);

          return of(
            new fromIntersections.SetIntersectionLanes(list),
          );
        }
      )
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private intersectionService: IntersectionService) {
  }
}
