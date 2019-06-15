import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-mail',
  templateUrl: './mail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
