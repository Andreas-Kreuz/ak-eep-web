import {Observable, of} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import {Injectable} from '@angular/core';
import * as fromDataTypes from '../datatypes/store/data-types.reducers';
import * as fromEepData from '../../eep/data/store/eep-data.reducers';
import * as fromIntersection from '../../eep/intersection/store/intersection.reducers';
import * as fromSignal from '../../eep/signals/store/signal.reducers';
import * as fromTrain from '../../eep/trains/store/train.reducer';

class AppAction {
  constructor(public iconName: string,
              public action: Action,
              public tooltip: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class MainNavigationService {
  navAction$: Observable<AppAction>;
  actions$: Observable<AppAction[]>;

  intersectionsCount$: Observable<number>;
  signalCount$: Observable<number>;
  slotCount$: Observable<number>;
  intersectionsAvailable$: Observable<boolean>;
  railTrainCount$: Observable<number>;
  roadTrainCount$: Observable<number>;
  tramTrainCount$: Observable<number>;
  navigation: ({
    name: string, values: {
      badge: null | Observable<number>;
      available: Observable<boolean>;
      icon: string;
      image: string;
      name: string | null;
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
            image: null,
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
            image: 'card-img-intersection.jpg',
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
            image: 'card-img-trains-road.jpg',
            badge: this.roadTrainCount$
          },
          {
            available: of(true),
            icon: 'tram',
            name: 'Trams',
            link: '/trains/tram',
            image: 'card-img-trains-tram.jpg',
            badge: this.tramTrainCount$
          },
          {
            available: of(true),
            icon: 'train',
            name: 'Züge',
            link: '/trains/rail',
            image: 'card-img-trains-rail.jpg',
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
            image: null,
            badge: this.signalCount$
          },
          // {icon: 'directions', name: 'Weichen', link: '/switches'},
          {
            available: of(true),
            icon: 'memory',
            name: 'Speicher',
            link: '/data',
            image: null,
            badge: this.slotCount$
          },
          {
            available: of(true),
            icon: 'message',
            name: 'Log',
            link: '/log',
            image: null,
            badge: null,
          },
        ]
      },
      {
        name: 'Roh-Daten', values: [
          {
            available: of(true),
            icon: 'list_alt',
            name: 'Roh-Daten',
            link: '/generic-data',
            image: null,
            badge: null,
          },
        ]
      },
    ];
  }
}
