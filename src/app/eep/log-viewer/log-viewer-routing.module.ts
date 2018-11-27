import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LogViewerComponent} from './log-viewer/log-viewer.component';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import {LogFileService} from './store/log-file.service';

const logViewerRoutes: Routes = [
  {path: '', component: LogViewerComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forChild(logViewerRoutes),
  ],
  providers: [
    LogFileService,
  ],
  exports: [
    RouterModule,
    NgxAutoScrollModule,
  ]
})
export class LogViewerRoutingModule {
}
