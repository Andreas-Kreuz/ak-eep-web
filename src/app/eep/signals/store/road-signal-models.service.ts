import {Injectable, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {RoadSignalModel} from '../road-signal-model.model';
import {SignalModel} from '../signal-model.model';

@Injectable({
  providedIn: 'root'
})
export class RoadSignalModelsService {
  @Output() signalModelsUpdated: Subject<RoadSignalModel[]> = new Subject();

  signalModels: RoadSignalModel[];

  constructor() {
    this.signalModels = [];
  }

  getSignalModels() {
    return this.signalModels.slice();
  }

  setSignalModels(signalModels: RoadSignalModel[]) {
    this.signalModels = [];
    for (const signalModel of signalModels) {
      this.signalModels.push(signalModel);
    }

    this.signalModels = signalModels;
    this.signalModelsUpdated.next(this.signalModels.slice());
  }

  public getSignalModel(modelId: string): RoadSignalModel {
    const signalModel: RoadSignalModel = this.signalModels.find(
      (s) => {
        return s.id === modelId;
      }
    );
    return signalModel;
  }
}
