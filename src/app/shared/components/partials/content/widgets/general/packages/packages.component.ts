import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-packages',
  templateUrl: './packages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
