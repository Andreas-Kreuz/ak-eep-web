import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import {TrainListComponent} from './train-list/train-list.component';
import {TrainsRoutingModule} from './trains-routing.module';
import { RollingStockTooltipComponent } from './train-list/icon-and-tooltip/rolling-stock-tooltip.component';

@NgModule({
  declarations: [
    TrainListComponent,
    RollingStockTooltipComponent,
  ],
  imports: [
    TrainsRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class TrainsModule {
}
