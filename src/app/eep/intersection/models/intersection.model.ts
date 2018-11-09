import {IntersectionLane} from './intersection-lane.model';
import {IntersectionSwitching} from './intersection-switching.model';

export class Intersection {
  id: number;
  name: string;
  timeForGreen: number;
  ready: boolean;
}
