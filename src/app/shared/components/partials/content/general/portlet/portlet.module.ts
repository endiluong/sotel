import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Vendors
import { MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';

// Sub Modules
import { SharedModule } from '@app/shared';

// Components
import { PortletComponent } from './portlet.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,

    SharedModule
  ],
  declarations: [PortletComponent],
  exports: [PortletComponent]
})
export class PortletModule {}
