import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './gui/app/home/home.component';
import {IntersectionComponent} from './gui/road/crossroad/detail/intersection.component';
import {IntersectionsComponent} from './gui/road/crossroad/intersections.component';
import {SignalsComponent} from './gui/eep/signals/signals.component';
import {SignalDetailComponent} from './gui/eep/signals/detail/signal-detail.component';
import {SwitchesComponent} from './gui/eep/switches/switches.component';

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
