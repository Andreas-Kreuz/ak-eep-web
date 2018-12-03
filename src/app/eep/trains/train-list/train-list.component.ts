import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Train} from '../model/train.model';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import * as TrainAction from '../store/train.actions';
import * as fromTrain from '../store/train.reducer';
import {ActivatedRoute, Params} from '@angular/router';
import {textForTrainType, TrainType} from '../model/train-type.enum';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit, OnDestroy {
  private trainType$: Observable<TrainType>;
  private trains$: Observable<Train[]>;
  private routeParams$: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeParams$ = this.route.params
      .subscribe((params: Params) => {
        console.log(this.route.snapshot.params['trainType']);
        this.store.dispatch(new TrainAction.SelectType(this.route.snapshot.params['trainType']));
        this.trains$ = this.store.pipe(select(fromTrain.selectTrains));
        this.trainType$ = this.store.pipe(select(fromTrain.selectTrainType));
      });
  }

  typeString(t: TrainType) {
    return textForTrainType(t);
  }

  ngOnDestroy(): void {
    this.routeParams$.unsubscribe();
  }
}
