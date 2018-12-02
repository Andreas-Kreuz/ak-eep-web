import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import {LogViewerComponent} from './log-viewer/log-viewer.component';
import {LogViewerRoutingModule} from './log-viewer-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LogFileEffects} from './store/log-file.effects';
import * as fromLogViewer from './store/log-file.reducers';

@NgModule({
  declarations: [
    LogViewerComponent,
  ],
  imports: [
    LogViewerRoutingModule,
    CommonModule,
    NgxAutoScrollModule,
    StoreModule.forFeature('logViewer', fromLogViewer.reducer),
    EffectsModule.forFeature([LogFileEffects]),
  ]
})

export class LogViewerModule {
}
