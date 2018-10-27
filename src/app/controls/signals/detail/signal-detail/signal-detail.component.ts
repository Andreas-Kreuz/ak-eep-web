import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {SignalsService} from '../../../../signals.service';
import {Signal} from '../../../../signal.model';

@Component({
  selector: 'app-signal-detail-component',
  templateUrl: './signal-detail.component.html',
  styleUrls: ['./signal-detail.component.css']
})
export class SignalDetailComponent implements OnInit, OnDestroy {
  signalId: number;
  signal: Signal;
  paramsSubscription: Subscription

  constructor(private route: ActivatedRoute,
              private signalsService: SignalsService) {
  }

  ngOnInit() {
    this.signalId = +this.route.snapshot.params['id'];
    this.signal = this.signalsService.getSignal(this.signalId);
    console.log('signalId: ' + this.signalId);
    console.log('signal: ' + this.signal);
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.signalId = +params['id'];
          this.signal = this.signalsService.getSignal(this.signalId);
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
