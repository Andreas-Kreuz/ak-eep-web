import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SignalsService} from './signals.service';
import {SwitchesService} from './switches.service';
import {Signal} from './signal.model';
import {Subject} from 'rxjs';
import {Alert} from './alert.model';
import {TrafficLightModel} from './traffic-light-model.model';
import {TrafficLightModelsService} from './traffic-light-models.service';
import {CrossroadTrafficLight} from './crossroad-traffic-light.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  errorSubscription: Subject<Alert> = new Subject<Alert>();
  @Input() hostLocation: string;

  constructor(private httpClient: HttpClient,
              private signalsService: SignalsService,
              private switchesService: SwitchesService,
              private trafficLightModelsService: TrafficLightModelsService) {
  }

  loadData() {
    this.updateTrafficLightModels();
  }

  private updateTrafficLightModels() {
    this.httpClient.get<TrafficLightModel[]>(this.hostLocation + ':3000/traffic_light_models')
      .subscribe(
        (trafficLightModels: TrafficLightModel[]) => {
          this.errorSubscription.next(null);
          this.trafficLightModelsService.setTrafficLightModels(trafficLightModels);
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
