import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromGenericData from '../store/generic-data.reducers';
import * as fromCore from '../../../core/store/core.reducers';
import * as fromRoot from '../../../app.reducers';
import {Observable} from 'rxjs';
import {DataType} from '../model/data-type';

@Component({
  selector: 'app-generic-data-overview',
  templateUrl: './generic-data-overview.component.html',
  styleUrls: ['./generic-data-overview.component.css']
})
export class GenericDataOverviewComponent implements OnInit {
  private hostName$: Observable<string>;
  private dataTypes$: Observable<DataType[]>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.hostName$ = this.store.pipe(select(fromCore.getPollingUrl));
    this.dataTypes$ = this.store.pipe(select(fromGenericData.selectDataTypes$));
  }

  trackByDataName(index: number, dataType: DataType) {
    if (!dataType) { return null; }
    return dataType.name;
  }
}
