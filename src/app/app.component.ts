import {Component, OnInit} from '@angular/core';
import {DataStorageService} from './core/data-storage.service';
import {Store} from '@ngrx/store';
import * as fromSignals from './eep/signals/store/signals.reducers';
import * as SignalActions from './eep/signals/store/signals.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EEP-Web';
  hostLocation = window.location.protocol + '//' + window.location.hostname;


  constructor(private dataStorageService: DataStorageService) {
    dataStorageService.hostLocation = this.hostLocation;
  }

  ngOnInit() {
    this.dataStorageService.fetchData();
  }
}
