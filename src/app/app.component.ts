import {Component, OnInit} from '@angular/core';
import {Menu} from './core/header/menu.enum';
import {DataStorageService} from './core/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EEP-Web';
  loadedFeature: string = Menu.Home.valueOf();
  hostLocation = window.location.protocol +  '//' + window.location.hostname;


  constructor(private dataStorageService: DataStorageService) {
    dataStorageService.hostLocation = this.hostLocation;
  }

  ngOnInit() {
    this.dataStorageService.loadData();
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
