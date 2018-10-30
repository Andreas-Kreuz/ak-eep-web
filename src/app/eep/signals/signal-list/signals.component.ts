import {Component, OnInit} from '@angular/core';
import {Signal} from '../signal.model';
import {Observable} from 'rxjs';
import {RoadSignalModel} from '../road-signal-model.model';
import {select, Store} from '@ngrx/store';
import * as fromSignals from '../../../store/app.reducers';
import {car, trafficLight} from '../../../shared/unicode-symbol.model';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
  signals$: Observable<Signal[]>;

  constructor(private store: Store<fromSignals.AppState>) {
  }

  ngOnInit() {
    this.signals$ = this.store.pipe(select(fromSignals.getSignals));
  }

  positionTextOf(signal: Signal): string {
    let text: string = '' + signal.position;
    if (signal.model) {
      if (signal.model.type === 'road') {
        text = trafficLight + ' ' + RoadSignalModel.signalPositionName(<RoadSignalModel> signal.model, signal.position);
      }
    }
    return text;
  }

  modelTextOf(signal: Signal) {
    if (signal.model) {
      let text = '';
      if (signal.model.type === 'road') {
        text = text + trafficLight + ' ';
      }
      text = text + signal.model.name;
      return text;
    } else {
      return '-';
    }
  }

  waitingCarsOf(signal: Signal) {
    return new Array(signal.waitingVehiclesCount).join( car );
  }
}
