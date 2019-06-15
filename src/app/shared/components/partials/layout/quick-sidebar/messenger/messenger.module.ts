import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Vendors
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Sub Modules
import { SharedModule } from '@app/shared';

// Components
import { MessengerComponent } from './messenger.component';
import { MessengerInComponent } from './messenger-in/messenger-in.component';
import { MessengerOutComponent } from './messenger-out/messenger-out.component';



@NgModule({
  imports: [CommonModule, PerfectScrollbarModule, SharedModule],
  declarations: [MessengerComponent, MessengerInComponent, MessengerOutComponent],
  exports: [MessengerComponent, MessengerInComponent, MessengerOutComponent]
})
export class MessengerModule {}
