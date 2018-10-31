import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoadSignalModelsService {
  // @Output() signalModelsUpdated: Subject<RoadSignalType[]> = new Subject();
  //
  // signalModels: RoadSignalType[];
  //
  // constructor() {
  //   this.signalModels = [];
  // }
  //
  // getSignalModels() {
  //   return this.signalModels.slice();
  // }
  //
  // setSignalModels(signalModels: RoadSignalType[]) {
  //   this.signalModels = [];
  //   for (const signalModel of signalModels) {
  //     this.signalModels.push(signalModel);
  //   }
  //
  //   this.signalModels = signalModels;
  //   this.signalModelsUpdated.next(this.signalModels.slice());
  // }
  //
  // public getSignalModel(modelId: string): RoadSignalType {
  //   const signalModel: RoadSignalType = this.signalModels.find(
  //     (s) => {
  //       return s.id === modelId;
  //     }
  //   );
  //   return signalModel;
  // }
}
