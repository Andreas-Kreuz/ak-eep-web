import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromSignals from '../../store/app.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private signalCount$: Observable<number>;

  constructor(private signalStore: Store<fromSignals.AppState>) {
  }

  ngOnInit() {
    this.signalCount$ = this.signalStore.pipe(select(fromSignals.signalCount));
  }
}
