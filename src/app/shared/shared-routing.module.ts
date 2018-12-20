import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TextSampleComponent} from './ui/text-sample/text-sample.component';
import {CardSampleComponent} from './ui/card-sample/card-sample.component';
import {TitledCardComponent} from './ui/titled-card/titled-card.component';
import {DashboardSampleComponent} from './ui/dashboard-sample/dashboard-sample.component';

const routes: Routes = [
  {path: '', component: TextSampleComponent, pathMatch: 'full'},
  {path: 'text', component: TextSampleComponent},
  {path: 'cards', component: CardSampleComponent},
  {path: 'card-titled', component: TitledCardComponent},
  {path: 'card-dashboard', component: TitledCardComponent},
  {path: 'dashboard', component: DashboardSampleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {
}

