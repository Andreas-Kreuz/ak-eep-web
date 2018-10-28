import {Component, OnInit} from '@angular/core';
import {Signal} from '../signal.model';
import {Observable} from 'rxjs';
import {RoadSignalModel} from '../road-signal-model.model';
import {select, Store} from '@ngrx/store';
import * as fromSignals from '../../../store/app.reducers';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
  signalListState: Observable<Signal[]>;

  constructor(private store: Store<fromSignals.AppState>) {
  }

  ngOnInit() {
    this.signalListState = this.store.pipe(
      select((state: fromSignals.AppState) => state.signalList.signals)
    );
  }

  positionTextOf(signal: Signal): string {
    let text: string = '' + signal.position;
    if (signal.model) {
      if (signal.model.type === 'road') {
        text = '🚦 ' + RoadSignalModel.signalPositionName(<RoadSignalModel> signal.model, signal.position);
      }
    }
    return text;
  }

  modelTextOf(signal: Signal) {
    if (signal.model) {
      let text = '';
      if (signal.model.type === 'road') {
        text = text + '🚦 ';
      }
      text = text + signal.model.name;
      return text;
    } else {
      return '-';
    }
  }
}
