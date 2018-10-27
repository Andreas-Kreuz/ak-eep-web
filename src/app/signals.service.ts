import {Injectable, Output} from '@angular/core';
import {Signal} from './signal.model';
import {Subject} from 'rxjs';
import {CrossroadTrafficLight} from './crossroad-traffic-light.model';


@Injectable({
  providedIn: 'root'
})
export class SignalsService {
  @Output() signalsUpdated: Subject<Signal[]> = new Subject();

  signals: Signal[];

  constructor() {
    this.signals = [];
  }

  getSignals() {
    return this.signals.slice();
  }

  setSignals(signals: Signal[]) {
    this.signals = signals;
    this.signalsUpdated.next(this.signals.slice());
  }

  public getSignal(id: number) {
    const signal = this.signals.find(
      (s) => {
        return s.id === id;
      }
    );
    return signal;
  }

  public updateSignal(id: number, model: string) {
    const signal = this.signals.find(
      (s) => {
        return s.id === id;
      }
    );
    if (signal) {
      signal.modelId = model;
      console.log("Update signal " + signal.id + " to model " + model);
    }
  }

  updateSignals(trafficLights: CrossroadTrafficLight[]) {
    for (const trafficLight of trafficLights) {
      this.updateSignal(trafficLight.signalId, trafficLight.modelId);
    };
    this.signalsUpdated.next(this.signals.slice());
  }
}
