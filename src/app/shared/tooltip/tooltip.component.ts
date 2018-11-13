import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: '<span placement="top" triggers="hover" ngbTooltip=[tooltip]>{{ text }}</span>',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  @Input() text;
  @Input() tooltip;

  constructor() {
  }

  ngOnInit() {
  }
}
