import { Component, OnInit, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-menu-section',
  templateUrl: './menu-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuSectionComponent implements OnInit {
  @Input() item: any;

  @HostBinding('class') classes = 'm-menu__section';

  constructor() {}

  ngOnInit(): void {}
}
