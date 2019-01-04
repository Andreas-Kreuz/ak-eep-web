import { NgModule } from '@angular/core';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip/tooltip.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';
import { FilteredTableComponent } from './filtered-table/filtered-table.component';
import { DetailsDirective } from './details/details.directive';
import { OldDetailsDirective } from './details/old-details.directive';
import { TitledCardComponent } from './ui/titled-card/titled-card.component';
import { CardSampleComponent } from './ui/card-sample/card-sample.component';
import { TextSampleComponent } from './ui/text-sample/text-sample.component';
import { SharedRoutingModule } from './shared-routing.module';
import { DashboardSampleComponent } from './ui/dashboard-sample/dashboard-sample.component';
import { DashboardCardComponent } from './ui/dashboard-card/dashboard-card.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    TooltipComponent,
    FilteredTableComponent,
    DetailsDirective,
    OldDetailsDirective,
    CardSampleComponent,
    TextSampleComponent,
    TitledCardComponent,
    DashboardCardComponent,
    DashboardSampleComponent,
  ],
  exports: [
    CommonModule,
    FilteredTableComponent,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgbModule,
    NgbTooltipModule,
    TooltipComponent,
  ],
  imports: [
    SharedRoutingModule,
    CommonModule,
    NgbTooltipModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule,
    LayoutModule,
  ]

})
export class SharedModule {
}
