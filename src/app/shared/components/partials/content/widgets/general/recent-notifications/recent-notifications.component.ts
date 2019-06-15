import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-recent-notifications',
  templateUrl: './recent-notifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentNotificationsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
