import {Component, OnDestroy, OnInit} from '@angular/core';
import {Intersection} from '../models/intersection.model';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromEep from '../../store/eep.reducers';

@Component({
  selector: 'app-crossings',
  templateUrl: './intersections.component.html',
  styleUrls: ['./intersections.component.css']
})
export class IntersectionsComponent implements OnInit {
  setIntersection$: Observable<Intersection[]>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.setIntersection$ = this.store.pipe(select(fromEep.intersections$));
  }
}
