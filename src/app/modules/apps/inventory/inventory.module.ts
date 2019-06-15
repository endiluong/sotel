import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// Material
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatMenuModule,
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatTabsModule,
  MatNativeDateModule,
  MatCardModule,
  MatRadioModule,
  MatIconModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';



// Core
// Core => Services
import { InventoryFakeApiService } from './_core/_server/inventory-fake-api.service';
import { CustomersService } from './_core/services/customers.service';
import { InventoriesService } from './_core/services/inventories.service';
import { ProductCategoryService } from './_core/services/productCategories.service';
import { UnitOfMeasureService } from './_core/services/unitOfMeasures.service';
// Core => Utils
import { HttpUtilsService } from './_core/utils/http-utils.service';
import { TypesUtilsService } from './_core/utils/types-utils.service';
import { LayoutUtilsService } from './_core/utils/layout-utils.service';


// Components
import { InventoryComponent } from './inventory.component';
import { InventoryStatComponent } from './inventory-item-list/inventory-stat/inventory-stat.component';
import { InventoryItemListComponent } from './inventory-item-list/inventory-item-list.component';
import { CustomerEditDialogComponent } from './customers/customer-edit/customer-edit.dialog.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
// tslint:disable-next-line:max-line-length
import { InventoryItemEditDialogComponent } from './inventory-item-list/inventory-item-edit/inventory-item-edit.dialog.component';
import { InventoryImportComponent } from './inventory-import/inventory-import.component';
// tslint:disable-next-line:max-line-length
import { InventoryDoughnutChartComponent } from './inventory-item-list/inventory-doughnut-chart/inventory-doughnut-chart.component';


// Shared Components
import { ActionNotificationComponent } from './_shared/action-natification/action-notification.component';
import { DeleteEntityDialogComponent } from './_shared/delete-entity-dialog/delete-entity-dialog.component';
import { FetchEntityDialogComponent } from './_shared/fetch-entity-dialog/fetch-entity-dialog.component';
import { UpdateStatusDialogComponent } from './_shared/update-status-dialog/update-status-dialog.component';
import { AlertComponent } from './_shared/alert/alert.component';

// Routing
import { InventoryRoutingModule } from './inventory.routing';


// Sub Modules
import { PartialsModule } from '@app/shared/components/partials/partials.module';


@NgModule({
  imports: [
    MatDialogModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    ChartsModule,

    PartialsModule,

    RouterModule,
    InventoryRoutingModule,
    environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forFeature(InventoryFakeApiService) : []
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'm-mat-dialog-container__wrapper',
        height: 'auto',
        width: '900px'
      }
    },

    CustomersService,
    InventoriesService,
    ProductCategoryService,
    UnitOfMeasureService,

    HttpUtilsService,
    TypesUtilsService,
    LayoutUtilsService
  ],
  entryComponents: [
    ActionNotificationComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent,
    InventoryItemEditDialogComponent,
  ],
  declarations: [
    InventoryComponent,
    InventoryStatComponent,
    InventoryDoughnutChartComponent,
    InventoryItemListComponent,
    InventoryItemEditDialogComponent,
    CustomerEditDialogComponent,
    CustomersListComponent,
    InventoryImportComponent,


    // Shared
    ActionNotificationComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent,
    AlertComponent,
  ]
})
export class InventoryModule {}
