import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Menu} from './menu.enum';
import {AppComponent} from '../../app.component';
import {select, Store} from '@ngrx/store';
import * as fromErrors from '../error/store/error.reducers';
import * as app from '../../store/app.reducers';
import {Observable} from 'rxjs';
import {Alert} from '../error/alert.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private bgClass: string;
  private lastAlert$: Observable<Alert>;

  @Output() featureSelected = new EventEmitter<string>();
  title: string;

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  constructor(appComponent: AppComponent,
              private errorStore: Store<app.AppState>) {
    this.title = appComponent.title;
  }

  ngOnInit() {
    this.lastAlert$ = this.errorStore.pipe(select(fromErrors.getLastAlert));
    this.lastAlert$.subscribe((value: Alert) =>
      this.bgClass = 'bg-' + value.type);
  }

  menu() {
    return Object.keys(Menu).map(key => Menu[key]);
  }
}
