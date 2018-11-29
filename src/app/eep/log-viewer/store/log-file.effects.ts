import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import * as fromLogFile from './log-file.actions';
import {LogFileService} from './log-file.service';
import {map} from 'rxjs/operators';

@Injectable()
export class LogFileEffects {

  @Effect({dispatch: false}) // effect will not dispatch any actions
  clearLogCommand$ = this.actions$.pipe(
    ofType(fromLogFile.CLEAR),
    map((action: fromLogFile.SendCommand) =>
      this.logFileService.sendCommand(action.payload)
    )
  );

  @Effect({dispatch: false}) // effect will not dispatch any actions
  testMessage$ = this.actions$.pipe(
    ofType(fromLogFile.SEND_MESSAGE),
    map((action: fromLogFile.SendCommand) =>
      this.logFileService.sendCommand(action.payload)
    )
  );

  constructor(private actions$: Actions,
              private logFileService: LogFileService,
              private store: Store<fromRoot.State>) {
  }
}

