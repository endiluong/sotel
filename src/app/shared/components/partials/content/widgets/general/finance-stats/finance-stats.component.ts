import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-finance-stats',
  templateUrl: './finance-stats.component.html',
  styleUrls: ['./finance-stats.component.scss']
})
export class FinanceStatsComponent implements OnInit, OnChanges {
  @Input()
  data: any;

  constructor() {
    this.data = {
      name: '',
      type: '',
      price: 0,
      status: 0
    };
  }
  ngOnChanges(changes: SimpleChanges): void {}
  statusResolver(id: any) {
    if (id === 0) {
      return 'Đang thuê';
    } else {
      return 'Còn trống';
    }
  }
  ngOnInit() {}
}
