export enum TrainType {
  Rail = 'rail',
  Road = 'road',
  Tram = 'tram',
}

export function textForTrainType(t: TrainType) {
  switch (t) {
    case TrainType.Road:
      return 'Straßenfahrzeuge';
    case TrainType.Rail:
      return 'Züge';
    case TrainType.Tram:
      return 'Straßenbahnen';
    default:
      return 'UNBEKANNT';
  }
}


