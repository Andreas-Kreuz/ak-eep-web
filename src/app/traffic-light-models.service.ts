import {Injectable, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {TrafficLightModel} from './traffic-light-model.model';

@Injectable({
  providedIn: 'root'
})
export class TrafficLightModelsService {

  @Output() trafficLightsUpdated: Subject<TrafficLightModel[]> = new Subject();

  trafficLightModels: TrafficLightModel[];

  constructor() {
    this.trafficLightModels = [];
  }

  getTrafficLightModels() {
    return this.trafficLightModels.slice();
  }

  setTrafficLightModels(trafficLightModels: TrafficLightModel[]) {
    this.trafficLightModels = trafficLightModels;
    this.trafficLightsUpdated.next(this.trafficLightModels.slice());
  }

  public getSignal(modelId: string) {
    const trafficLightModel = this.trafficLightModels.find(
      (s) => {
        return s.id === modelId;
      }
    );
    return trafficLightModel;
  }
}
