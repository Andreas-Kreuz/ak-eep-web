import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CrossingComponent} from './controls/road/crossings/crossing/crossing.component';
import {CrossingSwitchingComponent} from './controls/road/crossings/crossing-switching/crossing-switching.component';
import {CrossingsComponent} from './controls/road/crossings/crossings.component';
import {SignalsComponent} from './controls/signals/signals.component';
import {SwitchesComponent} from './controls/switches/switches.component';
import {HeaderComponent} from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './home/home/home.component';
import {SignalDetailComponent} from './controls/signals/detail/signal-detail/signal-detail.component';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './gui/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    CrossingComponent,
    CrossingSwitchingComponent,
    CrossingsComponent,
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
