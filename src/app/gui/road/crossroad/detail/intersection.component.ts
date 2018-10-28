import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Intersection} from '../../../../model/road/intersection.model';
import {Signal} from '../../../../model/eep/signal.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {SignalsService} from '../../../../model/eep/signals.service';
import {IntersectionsService} from '../../../../model/road/intersections.service';

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
    this.intersection = this.intersectionService.find(this.intersectionId);
    console.log('signal: ' + this.intersection);
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.intersectionId = +params['id'];
          this.intersection = this.intersectionService.find(this.intersectionId);
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  // unicodeFor(signal: Signal) {
  //   if (signal.model && signal.model.type === 'road') {
  //     return '🚦';
  //   }
  //
  //   return '❔';
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
