import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import {Injectable} from '@angular/core';
import * as fromDataTypes from '../datatypes/store/data-types.reducers';
import * as fromEepData from '../../eep/data/store/eep-data.reducers';
import * as fromIntersection from '../../eep/intersection/store/intersection.reducers';
import * as fromSignal from '../../eep/signals/store/signal.reducers';
import * as fromTrain from '../../eep/trains/store/train.reducer';

@Injectable({
  providedIn: 'root'
})
export class MainNavigationService {
  private intersectionsCount$: Observable<number>;
  private signalCount$: Observable<number>;
  private slotCount$: Observable<number>;
  private intersectionsAvailable$: Observable<boolean>;
  private railTrainCount$: Observable<number>;
  private roadTrainCount$: Observable<number>;
  private tramTrainCount$: Observable<number>;
  navigation: ({
    name: string, values: {
      badge: null | Observable<number>;
      available: Observable<boolean>;
      icon: string;
      name: string;
      link: string
    }[];
  })[];

  constructor(private store: Store<fromRoot.State>) {
    this.intersectionsAvailable$ = this.store.pipe(select(fromDataTypes.selectIntersectionsAvailable));
    this.intersectionsCount$ = this.store.pipe(select(fromIntersection.intersectionsCount$));
    this.slotCount$ = this.store.pipe(select(fromEepData.eepDataCount$));
    this.signalCount$ = this.store.pipe(select(fromSignal.signalCount$));
    this.railTrainCount$ = this.store.pipe(select(fromTrain.selectRailTrainCount));
    this.roadTrainCount$ = this.store.pipe(select(fromTrain.selectRoadTrainCount));
    this.tramTrainCount$ = this.store.pipe(select(fromTrain.selectTramTrainCount));
    this.navigation = [
      {
        name: 'Home', values: [
          {
            available: of(true),
            icon: 'home',
            name: 'Home',
            link: '/',
            badge: null,
          },
        ]
      },
      {
        name: 'Kreuzungen', values: [
          {
            available: this.intersectionsAvailable$,
            icon: 'gamepad',
            name: 'Kreuzungen',
            link: '/intersections',
            badge: this.intersectionsCount$
          },
        ]
      },
      {
        name: 'Fahrzeuge', values: [
          {
            available: of(true),
            icon: 'directions_car',
            name: 'Autos',
            link: '/trains/road',
            badge: this.roadTrainCount$
          },
          {
            available: of(true),
            icon: 'tram',
            name: 'Trams',
            link: '/trains/tram',
            badge: this.tramTrainCount$
          },
          {
            available: of(true),
            icon: 'train',
            name: 'Züge',
            link: '/trains/rail',
            badge: this.railTrainCount$
          },
        ]
      },
      {
        name: 'Andere', values: [
          {
            available: of(true),
            icon: 'traffic',
            name: 'Signale',
            link: '/signals',
            badge: this.signalCount$
          },
          // {icon: 'directions', name: 'Weichen', link: '/switches'},
          {
            available: of(true),
            icon: 'memory',
            name: 'Speicher',
            link: '/data',
            badge: this.slotCount$
          },
          {
            available: of(true),
            icon: 'message',
            name: 'Log',
            link: '/log',
            badge: null,
          },
        ]
      },
      {
        name: 'Roh-Daten', values: [
          {
            available: of(true),
            icon: 'more',
            name: 'Roh-Daten',
            link: '/generic-data',
            badge: null,
          },
        ]
      },
    ];
  }
}
