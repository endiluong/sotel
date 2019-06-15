import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Sub Modules
import { PartialsModule } from '@app/shared/components/partials/partials.module';
import { ListTimelineModule, WidgetChartsModule } from '@app/shared/components/partials';

// Components
import { DashboardComponent } from './dashboard.component';

// Routing
import { DashboardRoutingModule } from './dashboard.routing';
import { ProductsService } from '../apps/e-commerce/_core/services/products.service';
import { HttpUtilsService } from '../apps/e-commerce/_core/utils/http-utils.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListTimelineModule,

    WidgetChartsModule,
    PartialsModule,

    DashboardRoutingModule
  ],
  providers: [
    ProductsService,
    HttpUtilsService,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
