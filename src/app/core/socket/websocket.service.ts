import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Observer, Subject} from 'rxjs';
import {WebsocketAction} from './websocket-action';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  connected$ = new BehaviorSubject<boolean>(false);
  public ws: WebSocket;
  private readonly url: string;

  constructor() {
    this.url = 'ws://' + location.hostname
      + ':'
      + environment.websocketPort
      + environment.websocketPath;
    this.connect();
  }

  public connect() {
    if (!this.ws) {
      console.log('Connecting websocket: ' + this.url);
      this.ws = new WebSocket(this.url);
      this.on('connect', () => this.connected$.next(true));
      this.on('disconnect', () => this.connected$.next(false));
    }
    return this;
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.connected$.next(false);
    }
  }

  join(room: string) {
    // auto rejoin after reconnect mechanism
    this.connected$.subscribe(connected => {
      if (connected) {
        this.emit(new WebsocketAction('join', room));
      }
    });
  }

  private on(event: string, fn: Function) {
    this.listen(event).subscribe(fn());
  }

  public listen(event: string) {
    const observable = Observable.create(
      (observer: Observer<WebsocketAction>) => {
        this.ws.onmessage = (messageEvent: MessageEvent) => {
          const action: WebsocketAction = JSON.parse(messageEvent.data);
            console.group();
            console.log('----- SOCKET INBOUND -----');
            console.log('Event: ', messageEvent);
            console.log('Action: ', action.event);
            console.log('Payload: ', action.payload);
            console.groupEnd();

          if (action.event === event) {
            observer.next(action);
          }
        };
        this.ws.onerror = observer.error.bind(observer);
        this.ws.onclose = observer.complete.bind(observer);
        return this.ws.close.bind(this.ws);
      });
    return observable;
  }

  public emit(action: WebsocketAction) {
    console.group();
    console.log('----- SOCKET OUTGOING -----');
    console.log('Action: ', action.event);
    console.log('Payload: ', action.payload);
    console.groupEnd();

    this.ws.send(JSON.stringify(action));
  }
}
