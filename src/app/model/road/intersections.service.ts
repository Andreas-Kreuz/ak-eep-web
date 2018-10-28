import {Injectable, Output} from '@angular/core';
import {Intersection} from './intersection.model';
import {Subject} from 'rxjs';
import {Signal} from '../eep/signal.model';
import {RoadSignalModelsService} from '../shared/road-signal-models.service';

@Injectable({
  providedIn: 'root'
})
export class IntersectionsService {
  @Output() intersectionsUpdated: Subject<Intersection[]> = new Subject();
  intersections: Intersection[];

  private signalModelsService: RoadSignalModelsService;

  constructor(signalModelsService: RoadSignalModelsService) {
    this.intersections = [];
    this.signalModelsService = signalModelsService;
  }

  getIntersections() {
    return this.intersections.slice();
  }

  setIntersections(intersections: Intersection[]) {
    this.intersections = intersections;
    this.intersectionsUpdated.next(this.intersections.slice());
  }

  public find(id: number): Intersection {
    const intersection = this.intersections.find(
      (s: Intersection) => {
        return s.id === id;
      }
    );
    return intersection;
  }
}
