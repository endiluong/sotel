import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-support-tickets',
  templateUrl: './support-tickets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportTicketsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
