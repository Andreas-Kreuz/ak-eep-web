import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {SwitchesComponent} from './eep/switches/switch-list/switches.component';
import {ErrorComponent} from './core/error/error.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {
    path: 'signals',
    loadChildren: './eep/signals/signals.module#SignalsModule'
  },
  {
    path: 'intersections',
    loadChildren: './eep/intersection/intersection.module#IntersectionModule'
  },
  {
    path: 'data',
    loadChildren: './eep/data/eep-data.module#EepDataModule'
  },
  {path: 'switches', component: SwitchesComponent},
  {path: 'errors', component: ErrorComponent},
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  // {path: '**', redirectTo: '/'} // Must be the last route!
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
