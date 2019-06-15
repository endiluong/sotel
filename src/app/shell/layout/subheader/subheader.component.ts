import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

// Services
import { SubheaderService } from '@app/shared';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-subheader',
  templateUrl: './subheader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubheaderComponent implements OnInit {
  constructor(public subheaderService: SubheaderService) {}

  ngOnInit(): void {}
}
