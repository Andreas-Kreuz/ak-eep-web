import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Menu} from './menu.enum';
import {AppComponent} from '../../app.component';
import {select, Store} from '@ngrx/store';
import * as fromErrors from '../store/core.reducers';
import * as fromRoot from '../../app.reducers';
import {Observable} from 'rxjs';
import {Status} from '../server-status/status.enum';
import * as fromDataTypes from '../datatypes/store/data-types.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private connectionStatus$: Observable<Status>;
  isNavbarCollapsed = true;

  @Output() featureSelected = new EventEmitter<string>();
  title: string;
  private intersectionsAvailable$: Observable<boolean>;

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  constructor(appComponent: AppComponent,
              private store: Store<fromRoot.State>) {
    this.title = appComponent.title;
    this.intersectionsAvailable$ = this.store.pipe(select(fromDataTypes.selectIntersectionsAvailable));
  }

  ngOnInit() {
    this.connectionStatus$ = this.store.pipe(select(fromErrors.selectConnectionStatus));
  }

  menu() {
    return Object.keys(Menu).map(key => Menu[key]);
  }
}
