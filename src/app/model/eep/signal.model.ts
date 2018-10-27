import {SignalModel} from '../shared/signal-model.model';

export class Signal {
  id: number;
  position: number;
  model: SignalModel;
  waitingVehiclesCount: number;

  constructor(id: number, position: number, model: SignalModel, waitingVehiclesCount: number) {
    this.id = id;
    this.position = position;
    this.model = model;
    this.waitingVehiclesCount = waitingVehiclesCount;
  }
}
