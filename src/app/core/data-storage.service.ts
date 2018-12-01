import {Store} from '@ngrx/store';
import {Injectable, OnInit} from '@angular/core';

import * as fromRoot from '../app.reducers';
import * as fromCore from '../core/store/core.actions';
import * as fromGenericData from '../eep/generic-data/store/generic-data.actions';
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


  fetchStaticData(hostName) {
    this.store.dispatch(new fromCore.FetchVersion(hostName));
    this.store.dispatch(new fromGenericData.FetchDataTypes(hostName));
    this.store.dispatch(new fromEepData.FetchSlots(hostName));
    this.store.dispatch(new fromIntersection.FetchIntersections(hostName));
    this.store.dispatch(new fromIntersection.FetchIntersectionLanes(hostName));
    this.store.dispatch(new fromIntersection.FetchIntersectionSwitching(hostName));
    this.store.dispatch(new fromIntersection.FetchIntersectionTrafficLights(hostName));
    this.store.dispatch(new fromSignal.FetchSignalTypeDefinitions(hostName));
    this.store.dispatch(new fromSignal.FetchSignals(hostName));
  }

  fetchRuntimeData(hostName) {
    // this.fetchStaticData(hostName);
    // FETCH ONLY THE NEW STUFF
  }
}
