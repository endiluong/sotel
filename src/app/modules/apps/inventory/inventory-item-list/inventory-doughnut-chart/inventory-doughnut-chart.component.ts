import { Component, OnInit, Input } from '@angular/core';
import { InventoriesDataSource } from '../../_core/models/data-sources/inventories.datasource';

@Component({
  selector: 'app-inventory-doughnut-chart',
  templateUrl: './inventory-doughnut-chart.component.html',
  styleUrls: ['./inventory-doughnut-chart.component.scss']
})
export class InventoryDoughnutChartComponent implements OnInit {

  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  @Input()
  dataSource: InventoriesDataSource;

  public doughnutChartLabels: string[] = ['Direct Order', 'In-Store', 'InCome-Store', 'Mail-Order'];
  public doughnutChartData: number[] = [350, 450, 100, 20];
  public doughnutChartType = 'pie';

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor() { }

  ngOnInit() {
  }

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  chartClicked(e: any): void {}

  chartHovered(e: any): void {}
}
