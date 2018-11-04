import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {Signal} from '../models/signal.model';
import * as fromRoot from '../../../store/app.reducers';
import * as fromEep from '../../store/eep.reducers';
import {car, trafficLight} from '../../../shared/unicode-symbol.model';
import {SignalTypeDefinition} from '../models/signal-type-definition.model';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit, OnDestroy {
  signals$: Observable<Signal[]>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.signals$ = this.store.pipe(select(fromEep.signalsWithModel$));
    // this.signals$ = fromEep.filledSignals$(this.store);
  }

  ngOnDestroy() {
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
