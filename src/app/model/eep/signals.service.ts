import {Injectable, Output} from '@angular/core';
import {Signal} from './signal.model';
import {Subject} from 'rxjs';
import {RoadTrafficLight} from '../road/road-traffic-light.model';
import {SignalModel} from '../shared/signal-model.model';
import {RoadSignalModelsService} from '../shared/road-signal-models.service';


@Injectable({
  providedIn: 'root'
})
export class SignalsService {
  @Output() signalsUpdated: Subject<Signal[]> = new Subject();
  private signals: Signal[];
  private signalModelsService: RoadSignalModelsService;

  constructor(signalModelsService: RoadSignalModelsService) {
    this.signals = [];
    this.signalModelsService = signalModelsService;
  }

  getSignals() {
    return this.signals.slice();
  }

  setSignals(signals: Signal[]) {
    this.signals = signals;
    this.signalsUpdated.next(this.signals.slice());
  }

  public getSignal(id: number) {
    const signal = this.signals.find((s) => {
      return s.id === id;
    });
    return signal;
  }

  public updateSignal(id: number, model: SignalModel) {
    const signal = this.getSignal(id);
    if (signal) {
      signal.model = model;
    }
  }

  updateSignals(trafficLights: RoadTrafficLight[]) {
    for (const trafficLight of trafficLights) {
      const model = this.signalModelsService.getSignalModel(trafficLight.modelId);
      if (model) {
        this.updateSignal(trafficLight.signalId, model);
      }
    }
    this.signalsUpdated.next(this.signals.slice());
  }
}
