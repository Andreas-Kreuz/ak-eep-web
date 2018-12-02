import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from '../../shared/shared.module';
import {IntersectionComponent} from './intersection-detail/intersection.component';
import {IntersectionSwitchingComponent} from './intersection-switching/intersection-switching.component';
import {IntersectionsComponent} from './intersection-list/intersections.component';
import {IntersectionRoutingModule} from './intersection-routing.module';
import * as fromIntersection from './store/intersection.reducers';
import {IntersectionEffects} from './store/intersection.effects';

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
    // StoreModule.forFeature('intersection', fromIntersection.reducer),
    EffectsModule.forFeature([IntersectionEffects]),
  ],
})
export class IntersectionModule {
}
