import {Component, OnInit} from '@angular/core';
import * as fromRoot from '../../../app.reducers';
import {select, Store} from '@ngrx/store';
import * as fromEepData from '../../data/store/eep-data.reducers';
import {EepData} from '../models/eep-data.model';
import {EepDataService} from '../store/eep-data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-eep-data-list',
  templateUrl: './eep-data-list.component.html',
  styleUrls: ['./eep-data-list.component.css']
})
export class EepDataListComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'name', 'data'];
  columnNames = {id: '#', name: 'Name', data: 'Inhalt'};
  tableData$: Observable<EepData[]>;

  constructor(private eepDataService: EepDataService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.tableData$ = this.store.pipe(select(fromEepData.eepData$));
  }
}
