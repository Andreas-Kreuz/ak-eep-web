import {SignalModel} from './signal-model.model';

export class RoadSignalModel implements SignalModel {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public positionRed: number,
    public positionGreen: number,
    public positionYellow: number,
    public positionRedYellow: number,
    public positionPedestrians: number,
    public positionOff: number,
    public positionOffBlinking: number) {
  }

  static signalPositionName(signalModel: RoadSignalModel, signalPosition: number) {
    if (signalModel.positionRed === signalPosition) {
      return 'Rot';
    } else if (signalModel.positionGreen === signalPosition) {
      return 'Grün';
    } else if (signalModel.positionYellow === signalPosition) {
      return 'Gelb';
    } else if (signalModel.positionRedYellow === signalPosition) {
      return 'Rot-Gelb';
    } else if (signalModel.positionPedestrians === signalPosition) {
      return 'Fussgänger';
    } else if (signalModel.positionOff === signalPosition) {
      return 'Aus';
    } else if (signalModel.positionOffBlinking === signalPosition) {
      return 'Aus-Blinkend';
    }

    return '?';
  }
}
