import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import * as fromRoot from '../../app.reducers';
import * as fromCore from '../store/core.actions';
import * as fromDataTypes from './store/data-types.actions';
import {WsEvent} from '../socket/ws-event';
import {WsService} from '../socket/ws.service';
import {WsEventUtil} from '../socket/ws-event-util';

@Injectable({
  providedIn: 'root'
})
export class DataTypesService {
  private wsSubscription: Subscription;

  constructor(private wsService: WsService,
              private store: Store<fromRoot.State>) {
  }

  connect() {
    const mpSocket = this.wsService.listen(fromDataTypes.ROOM);
    this.wsSubscription = mpSocket.subscribe(
      (wsEvent: WsEvent) => {
        if (WsEventUtil.storeAction(wsEvent) === fromDataTypes.SET_DATA_TYPES) {
          this.store.dispatch(new fromDataTypes.SetDataTypes(wsEvent.payload));
          this.store.dispatch(new fromCore.SetConnected());
          this.store.dispatch(new fromCore.SetConnectionStatusSuccess());
        }
      },
      error => {
        console.log(error);
        this.store.dispatch(new fromCore.SetConnectionStatusError());
      },
      () => console.log('Closed socket: DataTypesService')
    );
  }
}
