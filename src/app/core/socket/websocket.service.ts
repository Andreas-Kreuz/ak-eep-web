import {Injectable} from '@angular/core';
import {WebsocketEvent} from './websocket-event';
import {environment} from '../../../environments/environment';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public websocketSubject: WebSocketSubject<WebsocketEvent>;
  private readonly url: string;

  constructor() {
    this.url = 'ws://' + location.hostname
      + ':'
      + environment.websocketPort
      + environment.websocketPath;
    this.connect();
  }

  public connect() {
    if (!this.websocketSubject) {
      console.log('Connecting websocket: ' + this.url);
      // this.websocket = new WebSocket(this.url);
      this.websocketSubject = webSocket(this.url);
      this.websocketSubject.subscribe((event: WebsocketEvent) => {
          console.group();
          console.log('----- SOCKET INBOUND -----');
          console.log('Event: ', event);
          console.log('Action: ', event.type);
          console.log('Payload: ', event.payload);
          console.groupEnd();
        },
        (err) => console.log(err),
        () => console.log('Websocket is complete'));
      // this.websocketSubject.retry()
    }
    return this;
  }

  public disconnect() {
    if (this.websocketSubject) {
      this.websocketSubject.complete();
    }
  }

  public listen(room: string, filterMethod: (WebsocketEvent) => boolean) {
    return this.websocketSubject.multiplex(
      () => {
        const event = new WebsocketEvent('[Room] Subscribe', room);
        this.log(event);
        return event;
      },
      () => {
        const event = new WebsocketEvent('[Room] Unsubscribe', room);
        this.log(event);
        return event;
      },
      filterMethod);
  }

  private log(event) {
    console.group();
    console.log('----- SOCKET OUTGOING -----');
    console.log('Action: ', event.type);
    console.log('Payload: ', event.payload);
    console.groupEnd();
  }


  public emit(event: WebsocketEvent) {
    this.log(event);
    this.websocketSubject.next(event);
  }
}
