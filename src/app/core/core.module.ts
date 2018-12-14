import {NgModule} from '@angular/core';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {ErrorComponent} from './error/error.component';
import {ServerStatusComponent} from './server-status/server-status.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDividerModule,
  MatIconModule, MatListModule,
  MatMenuModule, MatProgressSpinnerModule, MatRippleModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    ErrorComponent,
    MainComponent,
    HomeComponent,
    ServerStatusComponent,
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    ErrorComponent,
    HomeComponent,
    MainComponent,
  ]
})
export class CoreModule {}
