import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {IntersectionComponent} from './intersection-detail/intersection.component';
import {IntersectionSwitchingComponent} from './intersection-switching/intersection-switching.component';
import {IntersectionsComponent} from './intersection-list/intersections.component';
import {IntersectionRoutingModule} from './intersection-routing.module';

@NgModule({
  declarations: [
    IntersectionComponent,
    IntersectionSwitchingComponent,
    IntersectionsComponent,
  ],
  imports: [
    CommonModule,
    IntersectionRoutingModule,
    SharedModule,
  ],
})
export class IntersectionModule {
}
