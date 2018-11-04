import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-crossing',
  templateUrl: './intersection.component.html',
  styleUrls: ['./intersection.component.css']
})
export class IntersectionComponent implements OnInit {
  // intersectionId: number;
  // intersection: Intersection;
  // paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.intersectionId = +this.route.snapshot.params['id'];
    // console.log('signalId: ' + this.intersectionId);
    // // this.intersection = this.intersectionService.find(this.intersectionId);
    // // console.log('signal: ' + this.intersection);
    // this.paramsSubscription = this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       // this.intersectionId = +params['id'];
    //       // this.intersection = this.intersectionService.find(this.intersectionId);
    //     }
    //   );
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
