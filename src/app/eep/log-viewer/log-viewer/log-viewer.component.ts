import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import * as fromLogFile from '../store/log-file.reducers';
import {debounceTime} from 'rxjs/operators';

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
    this.maxHeight = (window.innerHeight - 200) + 'px';
    fromEvent(window, 'resize').pipe(
      debounceTime(500)
    ).subscribe((event) => {
      this.maxHeight = (window.innerHeight - 200) + 'px';
    });

    this.linesAsString$ = this.store.pipe(select(fromLogFile.linesAsString$));
    // const wsLocation = 'ws://' + window.location.hostname + ':3000/ws/';
    // this.websocketService.connect(wsLocation);
    // this.websocketService.listen('Add Log Messages')
    //   .subscribe((message: WebsocketAction) => {
    //     this.allMessages = this.allMessages + message.payload + '\n';
    //   });
  }

  ngOnDestroy(): void {
  }
}
