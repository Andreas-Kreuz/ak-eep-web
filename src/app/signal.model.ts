export class Signal {
  id: number;
  position: number;
  modelId: string;
  waitingVehiclesCount: number;

  constructor(id: number, position: number, modelId: string, waitingVehiclesCount: number) {
    this.id = id;
    this.position = position;
    this.modelId = modelId;
    this.waitingVehiclesCount = waitingVehiclesCount;
  }
}
