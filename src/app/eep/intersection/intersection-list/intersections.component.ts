import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {Intersection} from '../models/intersection.model';
import * as fromRoot from '../../../app.reducers';
import * as fromIntersection from '../../intersection/store/intersection.reducers';

@Component({
  selector: 'app-crossings',
  templateUrl: './intersections.component.html',
  styleUrls: ['./intersections.component.css']
})
export class IntersectionsComponent implements OnInit {
  intersections$: Observable<Intersection[]>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.intersections$ = this.store.pipe(select(fromIntersection.intersections$));
  }

  trackById(index: number, intersection: Intersection) {
    if (!intersection) return null;
    return intersection.id;
  }
}
