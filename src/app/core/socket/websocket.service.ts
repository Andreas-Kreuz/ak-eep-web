import {Injectable} from '@angular/core';
import {WebsocketEvent} from './websocket-event';
import {environment} from '../../../environments/environment';
import {map, retry} from 'rxjs/operators';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public websocketSubject: WebSocketSubject<WebsocketEvent>;
  // public websocket: WebSocket;
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
    }
    return this;
  }

  public disconnect() {
    if (this.websocketSubject) {
      this.websocketSubject.complete();
    }
  }

  join(room: string) {
    // auto rejoin after reconnect mechanism
    // this.connected$.subscribe(connected => {
    //   if (connected) {
    //     this.emit(new WebsocketEvent('join', room));
    //   }
    // });
  }

  public listen() {
    return this.websocketSubject.pipe(
      map((action: WebsocketEvent) => {
        return action;
      })
    );


    // const observable: Observable<any> = Observable.create(
    //   (observer: Observer<WebsocketEvent>) => {
    //     this.websocketSubject.onmessage = (messageEvent: MessageEvent) => {
    //       const action: WebsocketEvent = JSON.parse(messageEvent.data);
    //       console.group();
    //       console.log('----- SOCKET INBOUND -----');
    //       console.log('Event: ', messageEvent);
    //       console.log('Action: ', action.type);
    //       console.log('Payload: ', action.payload);
    //       console.groupEnd();
    //
    //       for (const observer of this.observers) {
    //         if (action.type === type) {
    //           observer.next(action);
    //         }
    //       }
    //     };
    //     this.websocketSubject.onerror = observer.error.bind(observer);
    //     this.websocketSubject.onclose = observer.complete.bind(observer);
    //     return this.websocketSubject.close.bind(this.websocketSubject);
    //   });
    //
    // return observable;
  }

  public emit(event: WebsocketEvent) {
    console.group();
    console.log('----- SOCKET OUTGOING -----');
    console.log('Action: ', event.type);
    console.log('Payload: ', event.payload);
    console.groupEnd();

    // this.websocket.send(JSON.stringify(event));
    this.websocketSubject.next(event);
  }
}
