import { Injectable } from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import {WebsocketEvent} from './websocket-event';
import * as fromLogFile from '../../eep/log-viewer/store/log-file.actions';

@Injectable({
  providedIn: 'root'
})
export class PongService {

  constructor(private socket: WebsocketService,
              private store: Store<fromRoot.State>) {
  }

  connect() {
    // Every socket "Log" type has it's own observable, will be used by ngrx effects
    const mpSocket = this.socket.listen('[Ping]', (event: WebsocketEvent) => event.type.startsWith('[Ping]'));
    mpSocket.subscribe(
      (event: WebsocketEvent) => {
        this.sendPong(event.payload);
      },
      error => {
        console.log(error);
        this.connect();
      });
  }

  private sendPong(message: string) {
    this.socket.emit({type: '[Ping]', payload: 'pong ' + message});
  }
}
