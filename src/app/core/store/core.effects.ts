import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';

import * as fromCore from './core.actions';
import {Status} from '../server-status/status.enum';
import {EepWebUrl} from '../server-status/eep-web-url.model';
import {VersionInfo} from '../model/version-info.model';
import {HttpClient} from '@angular/common/http';

const VERSION_PATH = '/api/v1/eep-version';

@Injectable()
export class CoreEffects {
  @Effect()
  fetchVersions = this.actions$
    .pipe(
      ofType(fromCore.FETCH_VERSIONS),
      switchMap((action: fromCore.FetchVersion) => {
        const url = action.payload + VERSION_PATH;
        console.log(url);
        return this.httpClient.get<VersionInfo>(url)
          .pipe(
            map((versionInfo: VersionInfo) => {

              return versionInfo;
            }),
            catchError((error) => {
              return throwError(error);
            }));
      }),
      switchMap((versionInfo: VersionInfo) => {
          return of(
            new fromCore.SetConnected(),
            new fromCore.ShowUrlError(new EepWebUrl(VERSION_PATH, Status.SUCCESS, 'Daten geladen')),
            new fromCore.SetEepVersion(versionInfo.eepVersion),
            new fromCore.SetEepLuaVersion(versionInfo.luaVersion)
          );
        }
      ),
      catchError((err) => {
        return of(
          new fromCore.ShowUrlError(new EepWebUrl(VERSION_PATH, Status.ERROR, err.message)));
      })
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}



