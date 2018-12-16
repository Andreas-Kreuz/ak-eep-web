import {NgModule} from '@angular/core';
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {TooltipComponent} from './tooltip/tooltip.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule, MatSortModule, MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FilteredTableComponent} from './filtered-table/filtered-table.component';

@NgModule({
  declarations: [
    TooltipComponent,
    FilteredTableComponent,
  ],
  exports: [
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
    MatToolbarModule,
    MatTooltipModule,
    CommonModule,
    NgbModule,
    NgbTooltipModule,
    FilteredTableComponent,
    TooltipComponent,
  ],
  imports: [
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
    MatToolbarModule,
  ]

})
export class SharedModule {
}
