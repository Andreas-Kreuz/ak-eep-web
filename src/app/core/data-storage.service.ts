import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {SignalsService} from '../eep/signals/store/signals.service';
import {SwitchesService} from '../eep/switches/switch-list/switches.service';
import {Signal} from '../eep/signals/signal.model';
import {Observable, Subject, throwError} from 'rxjs';
import {Alert} from './error/alert.model';
import {RoadSignalModel} from '../eep/signals/road-signal-model.model';
import {RoadSignalModelsService} from '../eep/signals/store/road-signal-models.service';
import {RoadTrafficLight} from '../eep/signals/road-traffic-light.model';
import {Intersection} from '../eep/intersection/intersection.model';
import {IntersectionsService} from '../eep/intersection/store/intersections.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  errorSubscription: Subject<Alert> = new Subject<Alert>();
  @Input() hostLocation: string;

  constructor(private httpClient: HttpClient,
              private signalsService: SignalsService,
              private switchesService: SwitchesService,
              private roadSignalModelsService: RoadSignalModelsService,
              private intersectionsService: IntersectionsService) {
  }

  loadData() {
    this.updateTrafficLightModels();
  }

  private updateTrafficLightModels() {
    const url = this.hostLocation + ':3000/traffic_light_models';
    this.httpClient.get<RoadSignalModel[]>(url)
      .subscribe(
        (trafficLightModels: RoadSignalModel[]) => {
          for (const t of trafficLightModels) {
            t.type = 'road';
          }
          this.errorSubscription.next(null);
          this.roadSignalModelsService.setSignalModels(trafficLightModels);
          this.updateSignals();
          this.updateIntersections();
        },
        (error: HttpErrorResponse) => {
          this.errorSubscription.next(new Alert('danger', error.message));
        }
      );
  }

  private updateSignals() {
    this.httpClient.get<Signal[]>(this.hostLocation + ':3000/signals')
      .subscribe(
        (signals: Signal[]) => {
          this.signalsService.setSignals(signals);
          this.updateIntersectionTrafficLights();
        },
        (error: HttpErrorResponse) => {
          this.errorSubscription.next(new Alert('danger', error.message));
        }
      );
  }

  private updateIntersections() {
    this.httpClient.get<Intersection[]>(this.hostLocation + ':3000/intersections')
      .subscribe(
        (intersections: Intersection[]) => {
          this.intersectionsService.setIntersections(intersections);
        },
        (error: HttpErrorResponse) => {
          this.errorSubscription.next(new Alert('danger', error.message));
        }
      );
  }

  private updateIntersectionTrafficLights() {
    this.httpClient.get<RoadTrafficLight[]>(this.hostLocation + ':3000/intersection_traffic_lights')
      .subscribe(
        (trafficLights: RoadTrafficLight[]) => {
          this.signalsService.updateSignals(trafficLights);
        },
        (error: HttpErrorResponse) => {
          this.errorSubscription.next(new Alert('danger', error.message));
        }
      );
  }

  switchSignal() {
    return this.httpClient.post('localhost:3000/', 5);
  }

  storeDataPut(list: any[]) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put('http://localhost:3199/data.json',
      list,
      {headers: headers})
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  storeDataPost(list: any[]) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post('http://localhost:3199/data.json',
      list,
      {headers: headers})
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}
