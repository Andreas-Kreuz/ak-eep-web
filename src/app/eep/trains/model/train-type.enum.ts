export enum TrainType {
  Rail = 'rail',
  Road = 'road',
}

export function textForTrainType(t: TrainType) {
  switch (t) {
    case TrainType.Road:
      return 'Straßenfahrzeuge';
    case TrainType.Rail:
      return 'Züge';
    default:
      return 'UNBEKANNT';
  }
}


