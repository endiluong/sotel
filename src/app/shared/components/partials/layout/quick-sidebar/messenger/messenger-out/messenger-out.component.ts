import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { MessageData } from '@app/shared/interfaces/message-data';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-messenger-out',
  templateUrl: './messenger-out.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerOutComponent implements OnInit {
  @HostBinding('class') classes = 'm-messenger__wrapper';
  @Input() message: MessageData;

  constructor() {}

  ngOnInit(): void {}
}
