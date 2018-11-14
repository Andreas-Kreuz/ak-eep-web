import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../app.reducers';
import {select, Store} from '@ngrx/store';
import * as fromEepData from '../../data/store/eep-data.reducers';
import {EepData} from '../models/eep-data.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-eep-data-list',
  templateUrl: './eep-data-list.component.html',
  styleUrls: ['./eep-data-list.component.css']
})
export class EepDataListComponent implements OnInit {
  private eepData$: Observable<EepData[]>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.eepData$ = this.store.pipe(select(fromEepData.eepData$));
  }

  trackByData(index: number, data: EepData) {
    if (!data) { return null; }
    return data.id;
  }
}
