import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../data-storage.service';
import {Subscription} from 'rxjs';
import {Alert} from './alert.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  private errorSubscription: Subscription;
  private alerts: Alert[] = [];
  private readonly initAlert: Alert;

  constructor(private dataStorageService: DataStorageService) {
    this.initAlert = new Alert('warning', 'Kontaktiere Server ' + dataStorageService.hostLocation + ':3000/');
    this.alerts.push(this.initAlert);
  }

  ngOnInit() {
    this.errorSubscription = this.dataStorageService.errorSubscription
      .subscribe(
        (alert: Alert) => {
          if (alert != null) {
            this.alerts.push(alert);
          } else {
            this.alerts.splice(this.alerts.indexOf(this.initAlert), 1);
          }
        }
      );
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
