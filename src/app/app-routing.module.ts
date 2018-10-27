import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home/home.component';
import {SignalsComponent} from './controls/signals/signals.component';
import {SignalDetailComponent} from './controls/signals/detail/signal-detail/signal-detail.component';
import {SwitchesComponent} from './controls/switches/switches.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
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
