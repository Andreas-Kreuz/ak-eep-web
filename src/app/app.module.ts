import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IntersectionComponent} from './eep/intersection/intersection-detail/intersection.component';
import {IntersectionSwitchingComponent} from './eep/intersection/intersection-switching/intersection-switching.component';
import {IntersectionsComponent} from './eep/intersection/intersection-list/intersections.component';
import {SignalsComponent} from './eep/signals/signal-list/signals.component';
import {SwitchesComponent} from './eep/switches/switch-list/switches.component';
import {HeaderComponent} from './core/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './core/home/home.component';
import {SignalDetailComponent} from './eep/signals/signal-detail/signal-detail.component';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './core/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    IntersectionComponent,
    IntersectionSwitchingComponent,
    IntersectionsComponent,
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
