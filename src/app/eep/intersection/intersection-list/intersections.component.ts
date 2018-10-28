import {Component, OnDestroy, OnInit} from '@angular/core';
import {Intersection} from '../intersection.model';
import {IntersectionsService} from '../store/intersections.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-crossings',
  templateUrl: './intersections.component.html',
  styleUrls: ['./intersections.component.css']
})
export class IntersectionsComponent implements OnInit, OnDestroy {
  intersections: Intersection[] = [];
  private dataSubscription: Subscription;

  constructor(private intersectionsService: IntersectionsService) {
  }

  ngOnInit() {
    this.setIntersections(this.intersectionsService.getIntersections());
    this.dataSubscription = this.intersectionsService.intersectionsUpdated.subscribe(
      (intersections: Intersection[]) => {
        this.setIntersections(intersections);
      }
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  private setIntersections(intersections: Intersection[]) {
    this.intersections = intersections;
  }
}
