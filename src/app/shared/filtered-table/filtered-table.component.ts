import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {TableDataSource} from './table-datasource';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.css'],
})
export class FilteredTableComponent implements OnInit {
  @Input() public columnsToDisplay: string[];
  @Input() public columnNames: string[];

  @ViewChild(MatSort) sort: MatSort;
  private dataSource: TableDataSource<any>;
  private filter = new Subject<string>();

  ngOnInit() {
  }

  @Input()
  set tableData(data: Observable<any[]>) {
    this.dataSource = new TableDataSource(data, this.filter.asObservable(), this.sort);
  }

  applyFilter(filterValue: string) {
    this.filter.next(filterValue.trim().toLowerCase());
  }
}
