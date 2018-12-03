import {NgModule} from '@angular/core';
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {TooltipComponent} from './tooltip/tooltip.component';

@NgModule({
  declarations: [
    TooltipComponent,
  ],
  exports: [
    CommonModule,
    NgbModule,
    NgbTooltipModule,
    TooltipComponent,
  ],
  imports: [
    NgbTooltipModule,
  ]

})
export class SharedModule {
}
