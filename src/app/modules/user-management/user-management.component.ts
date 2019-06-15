import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-user-management',
  templateUrl: './user-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent {
  constructor() {}
}
