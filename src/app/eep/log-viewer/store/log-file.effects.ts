import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import * as fromLogFile from './log-file.actions';
import {LogFileService} from './log-file.service';
import {Observable, of} from 'rxjs';
import {Action} from 'rxjs/internal/scheduler/Action';
import {switchMap} from 'rxjs/operators';
import {LinesAdded} from './log-file.actions';
import {WebsocketAction} from '../../../core/socket/websocket-action';

@Injectable()
export class LogFileEffects {

  @Effect({dispatch: false}) // effect will not dispatch any actions
  listNotes$ = this.actions$.pipe(
    ofType(fromLogFile.LINES_ADDED),
  );


  @Effect()
  notesListed$: Observable<LinesAdded> =
    this.logFileService.logAdded$.pipe( // listen to the socket for NOTES LIST event
      switchMap((action: WebsocketAction) =>
        of(new fromLogFile.LinesAdded(action.payload)) // ask the the store to populate the notes
      )
    );


  // @Effect()
  // notesListed$: Observable<Action> =
  //   this.notesService.notesListed$ // listen to the socket for NOTES LIST event
  //     .switchMap(notes =>
  //       Observable.of(new notesActions.NotesListed(notes)) // ask the the store to populate the notes
  //     );


  constructor(private actions$: Actions,
              private logFileService: LogFileService,
              private store: Store<fromRoot.State>) {
  }
}

