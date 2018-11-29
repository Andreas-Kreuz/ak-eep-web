import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import * as fromLogFile from '../store/log-file.reducers';
import {debounceTime} from 'rxjs/operators';
import * as logAction from '../store/log-file.actions';
import {WebsocketEvent} from '../../../core/socket/websocket-event';
import {LogFileService} from '../store/log-file.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit, OnDestroy {
  lines$: Observable<string[]>;
  linesAsString$: Observable<string>;
  maxHeight: string;

  constructor(private store: Store<fromRoot.State>,
              private logFileService: LogFileService) {
  }

  ngOnInit() {
    this.logFileService.connect();
    this.lines$ = this.store.pipe(select(fromLogFile.lines$));
    this.linesAsString$ = this.store.pipe(select(fromLogFile.linesAsString$));
    this.maxHeight = (window.innerHeight - 300) + 'px';
    fromEvent(window, 'resize').pipe(
      debounceTime(500)
    ).subscribe((event) => {
      this.maxHeight = (window.innerHeight - 300) + 'px';
    });
  }

  ngOnDestroy(): void {
    this.logFileService.disconnect();
  }

  clearLog() {
    this.store.dispatch(new logAction.SendCommand('clearlog'));
  }

  sendTestMessage() {
    this.store.dispatch(new logAction.SendCommand('print,Hallo von EEP-Web!'));
  }

  logEntries(index, item) {
    return index;
  }
}
