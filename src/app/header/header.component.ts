import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Menu} from '../menu.enum';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  title: string;

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  constructor(appComponent : AppComponent) {
    this.title = appComponent.title;
  }

  ngOnInit() {
  }

  menu() {
    return Object.keys(Menu).map(key => Menu[key]);
  }
}
