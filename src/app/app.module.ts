import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SwitchesComponent} from './eep/switches/switch-list/switches.component';
import {HttpClientModule} from '@angular/common/http';
import {SignalsModule} from './eep/signals/signals.module';
import {SharedModule} from './shared/shared.module';
import {IntersectionModule} from './eep/intersection/intersection.module';
import {CoreModule} from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    SwitchesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    SignalsModule,
    IntersectionModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
