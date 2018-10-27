import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CrossroadComponent} from './gui/road/crossroad/crossroad-detail/crossroad.component';
import {CrossroadSwitchingComponent} from './gui/road/crossroad/crossroad-switching/crossroad-switching.component';
import {CrossroadsComponent} from './gui/road/crossroad/crossroads.component';
import {SignalsComponent} from './gui/eep/signals/signals.component';
import {SwitchesComponent} from './gui/eep/switches/switches.component';
import {HeaderComponent} from './gui/app/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './gui/app/home/home.component';
import {SignalDetailComponent} from './gui/eep/signals/signal-detail/signal-detail.component';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './gui/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    CrossroadComponent,
    CrossroadSwitchingComponent,
    CrossroadsComponent,
    HeaderComponent,
    SignalsComponent,
    SwitchesComponent,
    HomeComponent,
    SignalDetailComponent,
    ErrorComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
