import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IntersectionsComponent} from './intersection-list/intersections.component';
import {IntersectionComponent} from './intersection-detail/intersection.component';

const intersectionRoutes: Routes = [
  {path: '', component: IntersectionsComponent},
  {path: ':id', component: IntersectionComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(intersectionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IntersectionRoutingModule {
}
