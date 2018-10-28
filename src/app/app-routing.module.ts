import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {IntersectionComponent} from './eep/intersection/intersection-detail/intersection.component';
import {IntersectionsComponent} from './eep/intersection/intersection-list/intersections.component';
import {SignalsComponent} from './eep/signals/signal-list/signals.component';
import {SignalDetailComponent} from './eep/signals/signal-detail/signal-detail.component';
import {SwitchesComponent} from './eep/switches/switch-list/switches.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'intersections', component: IntersectionsComponent},
  {path: 'intersections/:id', component: IntersectionComponent},
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
