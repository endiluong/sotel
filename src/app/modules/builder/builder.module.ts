import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Vendors
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material';
import { HighlightModule } from 'ngx-highlightjs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Sub Modules
import { LayoutModule } from '@app/shell/layout/layout.module';
import { PartialsModule } from '@app/shared/components/partials/partials.module';

// Components
import { BuilderComponent } from './builder.component';



@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    PartialsModule,
    FormsModule,
    NgbModule,
    MatTabsModule,
    PerfectScrollbarModule,
    HighlightModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuilderComponent
      }
    ])
  ],
  providers: [],
  declarations: [BuilderComponent]
})
export class BuilderModule {}
