import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import * as fromCore from '../store/core.reducers';
import * as fromEepData from '../../eep/data/store/eep-data.reducers';
import * as fromIntersection from '../../eep/intersection/store/intersection.reducers';
import * as fromSignal from '../../eep/signals/store/signal.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private eepLuaVersion$: Observable<string>;
  private eepVersion$: Observable<string>;
  private eepWebVersion$: Observable<string>;
  private intersectionsCount$: Observable<number>;
  private signalCount$: Observable<number>;
  private slotCount$: Observable<number>;
  private pollingUrl$: Observable<string>;
  private connectionEstablished$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.pollingUrl$ = this.store.pipe(select(fromCore.getPollingUrl));
    this.eepLuaVersion$ = this.store.pipe(select(fromCore.selectEepLuaVersion));
    this.eepVersion$ = this.store.pipe(select(fromCore.selectEepVersion));
    this.eepWebVersion$ = this.store.pipe(select(fromCore.selectEepWebVersion));
    this.connectionEstablished$ = this.store.pipe(select(fromCore.getConnectionEstablished));
    this.slotCount$ = this.store.pipe(select(fromEepData.eepDataCount$));
    this.signalCount$ = this.store.pipe(select(fromSignal.signalCount$));
    this.intersectionsCount$ = this.store.pipe(select(fromIntersection.intersectionsCount$));
  }
}
