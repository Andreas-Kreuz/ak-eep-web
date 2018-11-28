import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import * as fromLogFile from './log-file.actions';
import {LogFileService} from './log-file.service';
import {map} from 'rxjs/operators';

@Injectable()
export class LogFileEffects {
  //
  // @Effect()
  // linesAdded$: Observable<fromLogFile.LinesAdded> =
  //   this.logFileService.logAdded$.pipe(
  //     map((action: WebsocketEvent) => {
  //       if (action && action.type === fromLogFile.CLEARED) {
  //         console.log(fromLogFile.LINES_ADDED);
  //         return new fromLogFile.LinesAdded(action.payload); // ask the the store to add the log
  //       }
  //     })
  //   );
  //
  // @Effect()
  // logCleared$: Observable<fromLogFile.Cleared> =
  //   this.logFileService.logCleared$.pipe(
  //     map((action: WebsocketEvent) => {
  //       if (action && action.type === fromLogFile.CLEARED) {
  //         console.log(fromLogFile.CLEARED);
  //         return new fromLogFile.Cleared(); // ask the the store to clear the log
  //       }
  //     })
  //   );

  @Effect({dispatch: false}) // effect will not dispatch any actions
  clearLog$ = this.actions$.pipe(
    ofType(fromLogFile.CLEAR),
    map((action: fromLogFile.SendCommand) =>
      this.logFileService.sendCommand(action.payload)
    )
  );

  @Effect({dispatch: false}) // effect will not dispatch any actions
  testNachricht$ = this.actions$.pipe(
    ofType(fromLogFile.SEND_MESSAGE),
    map((action: fromLogFile.SendCommand) =>
      this.logFileService.sendCommand(action.payload)
    )
  );


  // @Effect()
  // linesAdded$: Observable<Action> =
  //   this.notesService.linesAdded$ // listen to the socket for NOTES LIST type
  //     .switchMap(notes =>
  //       Observable.of(new notesActions.NotesListed(notes)) // ask the the store to populate the notes
  //     );


  constructor(private actions$: Actions,
              private logFileService: LogFileService,
              private store: Store<fromRoot.State>) {
  }
}

