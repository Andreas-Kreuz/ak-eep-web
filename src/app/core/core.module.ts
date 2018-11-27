import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {ErrorComponent} from './error/error.component';
import {ServerStatusComponent} from './server-status/server-status.component';

@NgModule({
  declarations: [
    ErrorComponent,
    HeaderComponent,
    HomeComponent,
    ServerStatusComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
  ]
})
export class CoreModule {}
