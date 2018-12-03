import {Component, Input, OnInit} from '@angular/core';
import {RollingStock} from '../../model/rolling-stock.model';
import {iconForRollingStockType, textForRollingStockType} from '../../model/rolling-stock-type.enum';
import {textForCoupling} from '../../model/coupling.enum';


@Component({
  selector: 'app-rolling-stock-tooltip',
  templateUrl: './rolling-stock-tooltip.component.html',
  styleUrls: ['./rolling-stock-tooltip.component.css']
})
export class RollingStockTooltipComponent implements OnInit {
  @Input() rollingStock: RollingStock;

  constructor() {
  }

  ngOnInit() {
  }

  iconFor() {
    return iconForRollingStockType(this.rollingStock.modelType);
  }

  typeOf() {
    return textForRollingStockType(this.rollingStock.modelType);
  }

  textForCoupling(coupling) {
    return textForCoupling(coupling);
  }
}
