import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {WebsocketService} from '../../../core/socket/websocket.service';
import {WebsocketEvent} from '../../../core/socket/websocket-event';
import * as fromLogFile from './log-file.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';

@Injectable({
  providedIn: 'root'
})
export class LogFileService {
  logAdded$: Observable<WebsocketEvent>;
  logCleared$: Observable<WebsocketEvent>;

  constructor(private socket: WebsocketService,
              private store: Store<fromRoot.State>) {
    this.socket.join('log');
    // Every socket "Log" type has it's own observable, will be used by ngrx effects
    this.logAdded$ = this.socket.listen();
    this.logCleared$ = this.socket.listen();

    this.logAdded$.subscribe(
      (event: WebsocketEvent) => {
        if (event.type === fromLogFile.LINES_ADDED) {
          store.dispatch(new fromLogFile.LinesAdded(event.payload));
        }
      });

    this.logCleared$.subscribe(
      (event: WebsocketEvent) => {
        if (event.type === fromLogFile.CLEARED) {
          store.dispatch(new fromLogFile.Cleared());
        }
      });
  }

  sendCommand(command: string) {
    this.socket.emit({ type: 'eepCommand', payload: command });
  }
}
