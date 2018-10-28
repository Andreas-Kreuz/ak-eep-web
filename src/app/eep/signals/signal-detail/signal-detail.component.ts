import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import {Signal} from '../signal.model';
import {select, Store} from '@ngrx/store';
import * as fromSignals from '../../../store/app.reducers';

@Component({
  selector: 'app-signal-detail-component',
  templateUrl: './signal-detail.component.html',
  styleUrls: ['./signal-detail.component.css']
})
export class SignalDetailComponent implements OnInit, OnDestroy {
  signalId: number;
  signalState: Observable<Signal>;
  private subscription: Subscription;

  constructor(private store: Store<fromSignals.AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.signalId = +this.route.snapshot.params['id'];
        this.signalState = this.store.pipe(
          select((state: fromSignals.AppState) => {
            if (state.signalList.signals) {
              return state.signalList.signals.find(signal => {
                return signal.id === this.signalId;
              });
            } else {
              return null;
            }
          })
        );
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.store.dispatch(new SignalAction.Deselect());
  }

  unicodeFor(signal: Signal) {
    if (signal.model && signal.model.type === 'road') {
      return '🚦';
    }

    return '❔';
  }

  modelTypeOf(signal: Signal) {
    if (signal.model && signal.model.type === 'road') {
      return 'Ampel';
    }

    return 'Unbekanntes Modell';
  }

  positionOf(signal: Signal) {
    return signal.position ? signal.position : '-';
  }

  waitingVehiclesCountOf(signal: Signal) {
    return signal.waitingVehiclesCount ? signal.waitingVehiclesCount: '-';
  }
}
