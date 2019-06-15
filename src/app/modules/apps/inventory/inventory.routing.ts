import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { InventoryComponent } from './inventory.component';
import { InventoryItemListComponent } from './inventory-item-list/inventory-item-list.component';
import { InventoryImportComponent } from './inventory-import/inventory-import.component';


const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: InventoryComponent,
    data: { title: 'Inventory' },
    children: [
      {
        path: 'list',
        component: InventoryItemListComponent
      },
      {
        path: 'import',
        component: InventoryImportComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InventoryRoutingModule {}
