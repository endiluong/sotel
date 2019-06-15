import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-recent-activities',
  templateUrl: './recent-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentActivitiesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
