import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as fromRoot from '../../store/app.reducers';
import {SignalTypeDefinition} from '../signals/signal-type-definition.model';
import {Signal} from '../signals/signal.model';
import {debounceTime, map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  constructor(private store: Store<fromRoot.State>) {
  }


  // @Output() signalsUpdated: Subject<Signal[]> = new Subject();
  // private eep: Signal[];
  // private signalModelsService: RoadSignalModelsService;
  //
  // constructor(signalModelsService: RoadSignalModelsService) {
  //   this.eep = [];
  //   this.signalModelsService = signalModelsService;
  // }
  //
  // getSignals() {
  //   return this.eep.slice();
  // }
  //
  // setSignals(eep: Signal[]) {
  //   this.eep = eep;
  //   this.signalsUpdated.next(this.eep.slice());
  // }
  //
  // public getSignal(id: number) {
  //   const signal = this.eep.find((s) => {
  //     return s.id === id;
  //   });
  //   return signal;
  // }
  //
  // public updateSignal(id: number, model: SignalType) {
  //   const signal = this.getSignal(id);
  //   if (signal) {
  //     signal.model = model;
  //   }
  // }
  //
  // updateSignals(trafficLights: RoadTrafficLight[]) {
  //   for (const trafficLight of trafficLights) {
  //     const model = this.signalModelsService.getSignalModel(trafficLight.modelId);
  //     if (model) {
  //       this.updateSignal(trafficLight.signalId, model);
  //     }
  //   }
  //   this.signalsUpdated.next(this.eep.slice());
  // }
}
