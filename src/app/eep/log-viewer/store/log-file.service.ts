import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {WebsocketService} from '../../../core/socket/websocket.service';
import {WebsocketEvent} from '../../../core/socket/websocket-event';
import * as fromLogFile from './log-file.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';

@Injectable({
  providedIn: 'root'
})
export class LogFileService {
  logSubscription: Subscription;

  constructor(private socket: WebsocketService,
              private store: Store<fromRoot.State>) {
  }

  connect() {
    // Every socket "Log" type has it's own observable, will be used by ngrx effects
    const mpSocket = this.socket.listen('[Log]', (event: WebsocketEvent) => event.type.startsWith('[Log]'));
    this.logSubscription = mpSocket.subscribe(
      (event: WebsocketEvent) => {
        if (event.type === fromLogFile.CLEARED) {
          this.store.dispatch(new fromLogFile.Cleared());
        }

        if (event.type === fromLogFile.LINES_ADDED) {
          this.store.dispatch(new fromLogFile.LinesAdded(event.payload));
        }
      });
  }

  disconnect() {
    this.logSubscription.unsubscribe();
  }

  sendCommand(command: string) {
    this.socket.emit({type: '[EEPCommand]', payload: command});
  }
}
