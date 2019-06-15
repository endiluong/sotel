import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-aside-right',
  templateUrl: './aside-right.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideRightComponent implements OnInit {
  @HostBinding('class') classes = 'm-grid__item m-aside-right';

  constructor() {}

  ngOnInit(): void {}
}
