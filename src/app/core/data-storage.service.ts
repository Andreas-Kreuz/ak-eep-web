import {Store} from '@ngrx/store';
import {Injectable, OnInit} from '@angular/core';

import * as fromRoot from '../app.reducers';
import * as fromEepData from '../eep/data/store/eep-data.actions';
import * as fromIntersection from '../eep/intersection/store/intersection.actions';
import * as fromSignal from '../eep/signals/store/signal.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService implements OnInit {

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  fetchStaticData(hostLocation) {

  }

  fetchRuntimeData(hostLocation) {
    this.store.dispatch(new fromEepData.FetchSlots(hostLocation));
    this.store.dispatch(new fromIntersection.FetchIntersections(hostLocation));
    this.store.dispatch(new fromIntersection.FetchIntersectionLanes(hostLocation));
    this.store.dispatch(new fromIntersection.FetchIntersectionSwitching(hostLocation));
    this.store.dispatch(new fromIntersection.FetchIntersectionTrafficLights(hostLocation));
    this.store.dispatch(new fromSignal.FetchSignalTypeDefinitions(hostLocation));
    this.store.dispatch(new fromSignal.FetchSignals(hostLocation));
  }
}
