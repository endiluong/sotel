import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-e-commerce',
  templateUrl: './e-commerce.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ECommerceComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
