import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SignalsService} from '../eep/signals.service';
import {SwitchesService} from '../eep/switches.service';
import {Signal} from '../eep/signal.model';
import {Subject} from 'rxjs';
import {Alert} from './alert.model';
import {RoadSignalModel} from '../shared/road-signal-model.model';
import {RoadSignalModelsService} from '../shared/road-signal-models.service';
import {CrossroadTrafficLight} from '../road/crossroad-traffic-light.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  errorSubscription: Subject<Alert> = new Subject<Alert>();
  @Input() hostLocation: string;

  constructor(private httpClient: HttpClient,
              private signalsService: SignalsService,
              private switchesService: SwitchesService,
              private roadSignalModelsService: RoadSignalModelsService) {
  }

  loadData() {
    this.updateTrafficLightModels();
  }

  private updateTrafficLightModels() {
    this.httpClient.get<RoadSignalModel[]>(this.hostLocation + ':3000/traffic_light_models')
      .subscribe(
        (trafficLightModels: RoadSignalModel[]) => {
          for (const t of trafficLightModels) {
            t.type = 'road';
          }
          this.errorSubscription.next(null);
          this.roadSignalModelsService.setSignalModels(trafficLightModels);
          this.updateSignals();
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
          this.errorSubscription.next(null);
          this.signalsService.setSignals(signals);
          this.updateCrossroadTrafficLights();
        },
        (error: HttpErrorResponse) => {
          this.errorSubscription.next(new Alert('danger', error.message));
        }
      );
  }

  private updateCrossroadTrafficLights() {
    this.httpClient.get<CrossroadTrafficLight[]>(this.hostLocation + ':3000/crossroad_traffic_lights')
      .subscribe(
        (trafficLights: CrossroadTrafficLight[]) => {
          this.errorSubscription.next(null);
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
}
