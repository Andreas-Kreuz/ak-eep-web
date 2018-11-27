import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import {LogViewerComponent} from './log-viewer/log-viewer.component';
import {LogViewerRoutingModule} from './log-viewer-routing.module';
// import {StoreModule} from '@ngrx/store';
// import {reducer} from './store/log-file.reducers';
// import {EffectsModule} from '@ngrx/effects';
// import {LogFileEffects} from './store/log-file.effects';

@NgModule({
  declarations: [
    LogViewerComponent,
  ],
  imports: [
    LogViewerRoutingModule,
    CommonModule,
    NgxAutoScrollModule,
    // StoreModule.forFeature('logfile', reducer),
    // EffectsModule.forFeature([LogFileEffects]),
  ]
})
export class LogViewerModule {
}
