import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';
import * as fromEep from '../../eep/store/eep.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private signalCount$: Observable<number>;
  private intersectionsCount$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.signalCount$ = this.store.pipe(select(fromEep.signalCount$));
    this.intersectionsCount$ = this.store.pipe(select(fromEep.intersectionsCount$));
  }
}
