import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Intersection} from '../intersection.model';
import {Signal} from '../../signals/signal.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {SignalsService} from '../../store/signals.service';
import {IntersectionsService} from '../store/intersections.service';

@Component({
  selector: 'app-crossing',
  templateUrl: './intersection.component.html',
  styleUrls: ['./intersection.component.css']
})
export class IntersectionComponent implements OnInit, OnDestroy {
  intersectionId: number;
  intersection: Intersection;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private intersectionService: IntersectionsService) {
  }

  ngOnInit() {
    this.intersectionId = +this.route.snapshot.params['id'];
    console.log('signalId: ' + this.intersectionId);
    // this.intersection = this.intersectionService.find(this.intersectionId);
    // console.log('signal: ' + this.intersection);
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          // this.intersectionId = +params['id'];
          // this.intersection = this.intersectionService.find(this.intersectionId);
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  // unicodeFor(signal: Signal) {
  //   if (signal.model && signal.model.type === 'road') {
  //     return trafficLight + ' ';
  //   }
  //
  //   return unknown + ' ';
  // }
  //
  // modelTypeOf(signal: Signal) {
  //   if (signal.model && signal.model.type === 'road') {
  //     return 'Ampel';
  //   }
  //
  //   return 'Unbekanntes Modell';
  // }
}
