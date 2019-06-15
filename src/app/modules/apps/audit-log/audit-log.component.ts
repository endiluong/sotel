import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-audit-log',
  templateUrl: './audit-log.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuditLogComponent {
  constructor() {}
}
