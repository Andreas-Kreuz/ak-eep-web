export class TrafficLightModel {
  id: string;
  name: string;
  positionRed: number;
  positionGreen: number;
  positionYellow: number;
  positionRedYellow: number;
  positionPedestrians: number;
  positionOff: number;
  positionOffBlinking: number;


  constructor(id: string, name: string, positionRed: number, positionGreen: number, positionYellow: number, positionRedYellow: number, positionPedestrians: number, positionOff: number, positionOffBlinking: number) {
    this.id = id;
    this.name = name;
    this.positionRed = positionRed;
    this.positionGreen = positionGreen;
    this.positionYellow = positionYellow;
    this.positionRedYellow = positionRedYellow;
    this.positionPedestrians = positionPedestrians;
    this.positionOff = positionOff;
    this.positionOffBlinking = positionOffBlinking;
  }
}

