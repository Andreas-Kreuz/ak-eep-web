import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromRoot from '../../../app.reducers';
import {WsEvent} from '../../../core/socket/ws-event';
import {WsService} from '../../../core/socket/ws.service';

@Injectable({
  providedIn: 'root'
})
export class EepDataService {
  private actions$: Observable<WsEvent>;

  constructor(private socket: WsService,
              private store: Store<fromRoot.State>) {
  }

  getActions() {
    if (!this.actions$) {
      this.actions$ = this.socket.listen('[Data-save-slots]');
    }
    return this.actions$;
  }
}
