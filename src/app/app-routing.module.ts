import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './gui/app/home/home.component';
import {SignalsComponent} from './gui/eep/signals/signals.component';
import {SignalDetailComponent} from './gui/eep/signals/signal-detail/signal-detail.component';
import {SwitchesComponent} from './gui/eep/switches/switches.component';
import {CrossroadComponent} from './gui/road/crossroad/crossroad-detail/crossroad.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'crossroads', component: CrossroadComponent},
  {path: 'signals', component: SignalsComponent},
  {path: 'signals/:id', component: SignalDetailComponent},
  {path: 'switches', component: SwitchesComponent},
  {path: '**', redirectTo: '/'} // Must be the last route!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
