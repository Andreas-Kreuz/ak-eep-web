import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import * as fromSignal from '../../eep/signals/store/signal.reducers';
import * as fromIntersection from '../../eep/intersection/store/intersection.reducers';
import * as fromCore from '../store/core.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private signalCount$: Observable<number>;
  private intersectionsCount$: Observable<number>;
  private pollingUrl$: Observable<string>;
  private connectionEstablished$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.pollingUrl$ = this.store.pipe(select(fromCore.getPollingUrl));
    this.connectionEstablished$ = this.store.pipe(select(fromCore.getConnectionEstablished));
    this.signalCount$ = this.store.pipe(select(fromSignal.signalCount$));
    this.intersectionsCount$ = this.store.pipe(select(fromIntersection.intersectionsCount$));
  }
}
