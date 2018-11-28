import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import * as fromLogFile from '../store/log-file.reducers';
import {debounceTime} from 'rxjs/operators';
import * as logAction from '../store/log-file.actions';
import {WebsocketEvent} from '../../../core/socket/websocket-event';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit, OnDestroy {
  maxHeight: string;
  linesAsString$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.maxHeight = (window.innerHeight - 300) + 'px';
    fromEvent(window, 'resize').pipe(
      debounceTime(500)
    ).subscribe((event) => {
      this.maxHeight = (window.innerHeight - 300) + 'px';
    });

    this.linesAsString$ = this.store.pipe(select(fromLogFile.linesAsString$));
  }

  ngOnDestroy(): void {
  }

  clearLog() {
    this.store.dispatch(new logAction.SendCommand('clearlog'));
  }

  sendTestMessage() {
    this.store.dispatch(new logAction.SendCommand('print,Hallo von EEP-Web!'));
  }
}
