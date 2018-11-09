import {Phase} from './phase.enum';
import {Direction} from './direction.model';
import {TrafficType} from './traffic-type.enum';

export class IntersectionLane {
  vehicleMultiplier: number;
  id: string;
  eepSaveId: number;
  intersectionId: number;
  countByRoads: boolean;
  waitingVehiclesCount: number;
  waitingForGreenCyclesCount: number;
  type: TrafficType;
  name: string;
  phase: Phase;
  countByTrafficLights: boolean;
  directions: Direction[];
}
