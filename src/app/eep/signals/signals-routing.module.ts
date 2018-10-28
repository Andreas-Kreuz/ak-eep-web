import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';

import {SignalsComponent} from './signal-list/signals.component';
import {SignalDetailComponent} from './signal-detail/signal-detail.component';

const signalRoutes: Routes = [
  {path: 'signals', component: SignalsComponent},
  {path: 'signals/:id', component: SignalDetailComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(signalRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SignalsRoutingModule {}
