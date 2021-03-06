import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels: string[] = ['Download', 'In-Store', 'Mail-Order'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  constructor() {}

  ngOnInit() {}

  // events
  chartClicked(e: any): void {}

  chartHovered(e: any): void {}
}
