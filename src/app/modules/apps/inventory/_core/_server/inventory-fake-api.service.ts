import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { InventoryDataContext } from './fake-db/_inventory.data-context';

// Angular-In-Memory service |  Emulates CRUD operations over a RESTy API.
// See off.documentations: 'https://github.com/angular/in-memory-web-api'
@Injectable()
export class InventoryFakeApiService implements InMemoryDbService {
  constructor() {}

  createDb(): {} | Observable<{}> {
    return {
      customers: InventoryDataContext.customers,
      unitOfMeasures: InventoryDataContext.unitOfMeasures,
      productCategories: InventoryDataContext.productCategories,
      products: InventoryDataContext.products,
      inventories: InventoryDataContext.inventories
    };
  }
}
