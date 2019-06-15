import { CustomersTable } from './customers.table';
import { InventoriesTable } from './inventories.table';

// Wrapper class
export class InventoryDataContext {
  public static customers: any = CustomersTable.customers;
  public static productCategories: any = InventoriesTable.db.productCategoryDb;
  public static unitOfMeasures: any = InventoriesTable.db.unitOfMeasureDb;
  public static products: any = InventoriesTable.db.productDb;
  public static inventories: any = InventoriesTable.db.inventoryDb;
}
