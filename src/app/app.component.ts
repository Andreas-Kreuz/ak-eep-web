import {Component, OnInit} from '@angular/core';
import {DataStorageService} from './core/data-storage.service';
import {interval} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromCore from './core/store/core.reducers';
import * as CoreActions from './core/store/core.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EEP-Web';
  hostLocation = 'http://localhost:3000';

  constructor(private store: Store<fromCore.State>,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.hostLocation = window.location.protocol + '//' + window.location.hostname + ':3000';
    this.store.dispatch(new CoreActions.SetPollingUrl(this.hostLocation));

    this.dataStorageService.fetchStaticData(this.hostLocation);
    this.dataStorageService.fetchRuntimeData(this.hostLocation);
    interval(1000).subscribe(() => {
      this.dataStorageService.fetchRuntimeData(this.hostLocation);
    });
  }
}
