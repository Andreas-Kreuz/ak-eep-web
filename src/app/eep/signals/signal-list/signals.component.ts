import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {Signal} from '../signal.model';
import * as fromRoot from '../../../store/app.reducers';
import * as fromSignals from '../../store/signals.reducers';
import {car, trafficLight} from '../../../shared/unicode-symbol.model';
import {SignalTypeDefinition} from '../signal-type-definition.model';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
  signals$: Observable<Signal[]>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.signals$ = fromSignals.filledSignals$(this.store);
    this.signals$.subscribe(value => console.log(value));
  }

  positionTextOf(signal: Signal): string {
    let text: string = '' + signal.position;
    if (signal.model) {
      if (signal.model.type === 'road') {
        text = trafficLight + ' ' + SignalTypeDefinition.signalPositionName(signal.model, signal.position);
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
    return new Array(signal.waitingVehiclesCount + 1).join(car);
  }
}
