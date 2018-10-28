import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignalsService} from '../../eep/signals/store/signals.service';
import {SwitchesService} from '../../eep/switches/switch-list/switches.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private signalCountSubscription: Subscription;
  private signalCount: number;
  private switchesCount: number;

  constructor(private router: Router,
              private signalsService: SignalsService,
              private switchesService: SwitchesService) {
  }

  ngOnInit() {
    this.signalCountSubscription = this.signalsService.signalsUpdated.subscribe(
      (signals) => {
        this.signalCount = signals.length;
      }
    );
    this.signalCount = this.signalsService.getSignals().length;
    this.switchesCount = this.switchesService.getSwitches().length;
  }

  ngOnDestroy() {
    this.signalCountSubscription.unsubscribe();
  }

  onLoadSignal(id: number) {
    this.router.navigate(
      ['/signal', id],
      {
        queryParams: {allowEdit: 'false'},
        fragment: 'loading'
      });
  }
}
