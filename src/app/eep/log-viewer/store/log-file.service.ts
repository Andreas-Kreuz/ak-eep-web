import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromLogFile from './log-file.actions';
import * as fromRoot from '../../../app.reducers';
import {WsEvent} from '../../../core/socket/ws-event';
import {WsEventUtil} from '../../../core/socket/ws-event-util';
import {WsService} from '../../../core/socket/ws.service';

@Injectable({
  providedIn: 'root'
})
export class LogFileService {
  logSubscription: Subscription;

  constructor(private socket: WsService,
              private store: Store<fromRoot.State>) {
  }

  connect() {
    // Every socket "Log" type has it's own observable, will be used by ngrx effects
    const mpSocket = this.socket.listen('[Log]');
    this.logSubscription = mpSocket.subscribe(
      (wsEvent: WsEvent) => {
        if (WsEventUtil.storeAction(wsEvent) === fromLogFile.CLEARED) {
          this.store.dispatch(new fromLogFile.Cleared());
        }

        if (WsEventUtil.storeAction(wsEvent) === fromLogFile.LINES_ADDED) {
          this.store.dispatch(new fromLogFile.LinesAdded(wsEvent.payload));
        }
      });
  }

  disconnect() {
    this.logSubscription.unsubscribe();
  }

  sendCommand(command: string) {
    this.socket.emit(new WsEvent('[EEPCommand]', 'Send', command));
  }
}
