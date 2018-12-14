import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {SwitchesComponent} from './eep/switches/switch-list/switches.component';
import {ServerStatusComponent} from './core/server-status/server-status.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {
    path: 'signals',
    loadChildren: './eep/signals/signals.module#SignalsModule'
  },
  {
    path: 'trains',
    loadChildren: './eep/trains/trains.module#TrainsModule'
  },
  {
    path: 'intersections',
    loadChildren: './eep/intersection/intersection.module#IntersectionModule'
  },
  {
    path: 'data',
    loadChildren: './eep/data/eep-data.module#EepDataModule'
  },
  {
    path: 'generic-data',
    loadChildren: './eep/generic-data/generic-data.module#GenericDataModule'
  },
  {
    path: 'log',
    loadChildren: './eep/log-viewer/log-viewer.module#LogViewerModule'
  },
  {path: 'switches', component: SwitchesComponent},
  {path: 'errors', component: ServerStatusComponent},
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  // {path: '**', redirectTo: '/'} // Must be the last route!
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
