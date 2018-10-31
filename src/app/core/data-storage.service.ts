import {Store} from '@ngrx/store';
import {Injectable, OnInit} from '@angular/core';

import * as fromRoot from '../store/app.reducers';
import * as SignalActions from '../eep/store/signals.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService implements OnInit {

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  fetchStaticData(hostLocation) {
    this.store.dispatch(new SignalActions.FetchSignalTypeDefinitions(hostLocation));
    this.store.dispatch(new SignalActions.FetchSignalTypes(hostLocation));
  }

  fetchRuntimeData(hostLocation) {
    this.store.dispatch(new SignalActions.FetchSignals(hostLocation));
  }

  // private updateTrafficLightModels() {
  //   const url = this.hostLocation + ':3000/traffic_light_models';
  //   this.httpClient.get<RoadSignalType[]>(url)
  //     .subscribe(
  //       (trafficLightModels: RoadSignalType[]) => {
  //         for (const t of trafficLightModels) {
  //           t.type = 'road';
  //         }
  //         this.errorSubscription.next(null);
  //         this.roadSignalModelsService.setSignalModels(trafficLightModels);
  //         this.updateSignals();
  //         this.updateIntersections();
  //       },
  //       (error: HttpErrorResponse) => {
  //         this.errorSubscription.next(new Alert('danger', error.message));
  //       }
  //     );
  // }

  // private updateSignals() {
  //   this.httpClient.get<Signal[]>(this.hostLocation + ':3000/signals')
  //     .subscribe(
  //       (signals: Signal[]) => {
  //         this.signalsService.setSignals(signals);
  //         this.updateIntersectionTrafficLights();
  //       },
  //       (error: HttpErrorResponse) => {
  //         this.errorSubscription.next(new Alert('danger', error.message));
  //       }
  //     );
  // }
  //
  // private updateIntersections() {
  //   this.httpClient.get<Intersection[]>(this.hostLocation + ':3000/intersections')
  //     .subscribe(
  //       (intersections: Intersection[]) => {
  //         this.intersectionsService.setIntersections(intersections);
  //       },
  //       (error: HttpErrorResponse) => {
  //         this.errorSubscription.next(new Alert('danger', error.message));
  //       }
  //     );
  // }
  //
  // private updateIntersectionTrafficLights() {
  //   this.httpClient.get<RoadTrafficLight[]>(this.hostLocation + ':3000/intersection_traffic_lights')
  //     .subscribe(
  //       (trafficLights: RoadTrafficLight[]) => {
  //         this.signalsService.updateSignals(trafficLights);
  //       },
  //       (error: HttpErrorResponse) => {
  //         this.errorSubscription.next(new Alert('danger', error.message));
  //       }
  //     );
  // }
  //
  // switchSignal() {
  //   return this.httpClient.post('localhost:3000/', 5);
  // }
}
