import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {TableDataSource} from './table-datasource';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.css'],
})
export class FilteredTableComponent implements OnInit, OnDestroy {
  @Input() public columnsToDisplay: string[];
  @Input() public columnNames: string[];
  @Input() public columnTextFunctions?: (any) => string;

  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableDataSource<any>;
  private filter = new Subject<string>();
  private filteredRows$: Observable<any[]>;
  private hasData$: Observable<boolean>;

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  @Input()
  set tableData(data: Observable<any[]>) {
    this.dataSource = new TableDataSource(data, this.filter.asObservable(), this.sort);
    this.hasData$ = this.dataSource.hasData();
    this.filteredRows$ = this.dataSource.connect();
  }

  applyFilter(filterValue: string) {
    this.filter.next(filterValue.trim().toLowerCase());
  }

  textFor(element: any, column: string) {
    return this.columnTextFunctions[column]
      ? this.columnTextFunctions[column](element)
      : element[column];
  }
}
