import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {WebsocketService} from '../../../core/socket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class LogFileService {

  logAdded$: Observable<any>;
  logCleared$: Observable<any>;

  constructor(private socket: WebsocketService) {
    this.socket.join('log');
    // Every socket "Log" event has it's own observable, will be used by ngrx effects
    this.logAdded$ = this.socket.listen('[Log] Lines Added');
    this.logCleared$ = this.socket.listen('[Log] Cleared');
  }

  // // These methods will be called by ngrx effects (do not use directly in the components)
  // sendTestMessage() {
  //   this.socket.emit('[Log] Send Test Message', 'testMessage');
  // }
  //
  // clearLog(note) {
  //   this.socket.emit('[Log] Clear');
  // }
}
