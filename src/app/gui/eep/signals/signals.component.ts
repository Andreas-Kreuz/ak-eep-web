import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalsService} from '../../../model/eep/signals.service';
import {Signal} from '../../../model/eep/signal.model';
import {Subscription} from 'rxjs';
import {RoadSignalModel} from '../../../model/shared/road-signal-model.model';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit, OnDestroy {
  signals: Signal[];
  sortedSignals: Signal[];
  private subscription: Subscription;

  constructor(private signalService: SignalsService) {
  }

  private updateSignals(signals: Signal[]) {
    this.signals = signals;
    this.sortedSignals = signals.sort(
      (s1: Signal, s2: Signal) => {
        if (s1.waitingVehiclesCount != s2.waitingVehiclesCount) {
          return s2.waitingVehiclesCount - s1.waitingVehiclesCount;
        }
        return s1.id - s2.id;
      });
  }

  ngOnInit() {
    this.updateSignals(this.signalService.getSignals());
    this.subscription = this.signalService.signalsUpdated
      .subscribe(
        (signals: Signal[]) => {
          this.updateSignals(this.signalService.getSignals());
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
