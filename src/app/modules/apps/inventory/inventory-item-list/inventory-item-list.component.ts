import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, merge, forkJoin, Observable, of } from 'rxjs';

// Vendors
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';

// Data Models
import { InventoryItem } from '../_core/models/inventory-item.model';

// Services
import { InventoriesDataSource } from '../_core/models/data-sources/inventories.datasource';
import { InventoriesService } from '../_core/services/inventories.service';
import { LayoutUtilsService, MessageType } from '../_core/utils/layout-utils.service';
import { TranslateService } from '@ngx-translate/core';
import { QueryParamsModel } from '../_core/models/query-models/query-params.model';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductCategory } from '../_core/models/product-category.model';
import { UnitOfMeasure } from '../_core/models/unit-of-measure.model';
import { ProductCategoryDataSource } from '../_core/models/data-sources/productCategories.datasource';
import { UnitOfMeasureDataSource } from '../_core/models/data-sources/unitOfMeasures.datasource';
import { ProductCategoryService } from '../_core/services/productCategories.service';
import { UnitOfMeasureService } from '../_core/services/unitOfMeasures.service';
import { InventoryItemEditDialogComponent } from './inventory-item-edit/inventory-item-edit.dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-inventory-item-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inventory-item-list.component.html',
  styleUrls: ['./inventory-item-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class InventoryItemListComponent implements OnInit {
  // ==========================================
  // =           Attributes Section           =
  // ==========================================

  inventoryDataSource: InventoriesDataSource;
  categoryDataSource: ProductCategoryDataSource;
  unitDataSource: UnitOfMeasureDataSource;

  displayedColumns = [
    'expandToggle',
    'select',
    'productCode',
    'productName',
    'basePrice',
    'sellPrice',
    'category',
    'unit',
    'isHomemade',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('searchInput') searchInput: ElementRef;

  filterProductCategory = '';
  filterProductUnit = '';

  selection = new SelectionModel<InventoryItem>(true, []);

  inventoriesResult: InventoryItem[] = [];
  categoryResult: ProductCategory[] = [];
  unitResult: UnitOfMeasure[] = [];

  expandedRow: any;

  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(
    private inventoriesService: InventoriesService,
    private categoryService: ProductCategoryService,
    private unitOfMeasureService: UnitOfMeasureService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private layoutUtilsService: LayoutUtilsService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ==========================================
  // =            Events Section            =
  // ==========================================

  isExpansionDetailRow = (i: number, row: Object) => {
    return row.hasOwnProperty('detailRow');
  }

  rowSelect(row: any, event: any) {
    if (event.srcElement.attributes[1].value === 'not-expand') {
      // when user click to table action controls, the row will note expand
      return;
    }

    if (this.expandedRow === row) {
      this.expandedRow = null;
    } else {
      this.expandedRow = row;
    }
  }

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    /* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadInventoriesList();
        })
      )
      .subscribe();

    // Filtration, bind to searchInput
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        /*
        The user can type quite quickly in the input box, and that could trigger a lot of server requests.
        With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
        */
        distinctUntilChanged(), // This operator will eliminate duplicate values
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadInventoriesList();
        })
      )
      .subscribe();

    // Init DataSource
    this.inventoryDataSource = new InventoriesDataSource(this.inventoriesService);
    this.categoryDataSource = new ProductCategoryDataSource(this.categoryService);
    this.unitDataSource = new UnitOfMeasureDataSource(this.unitOfMeasureService);

    // First Inventory Load Data
    this.inventoryDataSource.entitySubject.subscribe(res => {
      this.inventoriesResult = res;
    });
    this.inventoryDataSource.loadInventories(new QueryParamsModel(this.filterConfiguration(true), '', '', 0, 15));

    // First ProductCategory Load Data
    this.categoryDataSource.entitySubject.subscribe(res => {
      this.categoryResult = res;
    });
    this.categoryDataSource.loadProductCategories(new QueryParamsModel({}));

    // First UnitOFMeasure Load Data
    this.unitDataSource.entitySubject.subscribe(res => {
      this.unitResult = res;
    });
    this.unitDataSource.loadUnitOfMeasure(new QueryParamsModel({}));
  }

  // ==========================================
  // =            Business Methods            =
  // ==========================================

  loadInventoriesList() {
    console.log(this.paginator.pageSize);
    const queryParams = new QueryParamsModel(
      this.filterConfiguration(true),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );

    this.inventoryDataSource.loadInventories(queryParams);
    this.selection.clear();
  }

  loadProductCategory() {}

  loadUnitOfMeasure() {}

  filterConfiguration(isGeneralSearch: boolean = true): any {
    const filter: any = {};
    const searchText: string = this.searchInput.nativeElement.value;

    if (this.filterProductCategory && this.filterProductCategory.length > 0) {
      filter.productCategoryId = this.filterProductCategory + '';
    }

    if (this.filterProductUnit && this.filterProductUnit.length > 0) {
      filter.unitId = +this.filterProductUnit + '';
    }

    filter.productName = searchText;
    filter.productCode = searchText;

    return filter;
  }

  deleteInventory(_item: InventoryItem) {
    const _title: string = this.translate.instant('INVENTORY.INVENTORYITEMLIST.DELETE_INVENTORYITEM_SIMPLE.TITLE');
    const _description: string = this.translate.instant(
      'INVENTORY.INVENTORYITEMLIST.DELETE_INVENTORYITEM_SIMPLE.DESCRIPTION'
    );
    const _waitDesciption: string = this.translate.instant(
      'INVENTORY.INVENTORYITEMLIST.DELETE_INVENTORYITEM_SIMPLE.WAIT_DESCRIPTION'
    );
    const _deleteMessage = this.translate.instant('INVENTORY.INVENTORYITEMLIST.DELETE_INVENTORYITEM_SIMPLE.MESSAGE');

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.inventoriesService.deleteInventory(_item.id).subscribe(() => {
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
        this.loadInventoriesList();
      });
    });
  }

  deleteInventories() {
    const _title: string = this.translate.instant('INVENTORY.INVENTORYITEMLIST.DELETE_INVENTORYITEM_MULTY.TITLE');
    const _description: string = this.translate.instant(
      'INVENTORY.INVENTORYITEMLIST.DELETE_INVENTORYITEM_MULTY.DESCRIPTION'
    );
    const _waitDesciption: string = this.translate.instant(
      'INVENTORY.INVENTORYITEMLIST.DELETE_INVENTORYITEM_MULTY.WAIT_DESCRIPTION'
    );
    const _deleteMessage = this.translate.instant('INVENTORY.INVENTORYITEMLIST.DELETE_INVENTORYITEM_MULTY.MESSAGE');

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      const idsForDeletion: string[] = [];
      for (let i = 0; i < this.selection.selected.length; i++) {
        idsForDeletion.push(this.selection.selected[i].id);
      }
      this.inventoriesService.deleteFakeInventories(idsForDeletion).subscribe(() => {
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
        this.loadInventoriesList();
        this.selection.clear();
      });
    });
  }

  /** Fetch */
  fetchInventories() {
    const messages = new Array<any>();
    this.selection.selected.forEach(elem => {
      messages.push({
        text: `${elem.productCode}, ${elem.productName}`,
        id: elem.id.toString(),
        status: elem.productCategoryId
      });
    });
    this.layoutUtilsService.fetchElements(messages);
  }

  importInventory() {
    // TODO: implement
    this.router.navigate(['inventory/import']);
  }

  editInventory(inventoryItem: InventoryItem) {
    let saveMessageTranslateParam = 'INVENTORY.INVENTORYITEMLIST.EDIT.';

    saveMessageTranslateParam += inventoryItem.id != null ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';

    const _saveMessage = this.translate.instant(saveMessageTranslateParam);
    const _messageType = inventoryItem.id != null ? MessageType.Update : MessageType.Create;

    const dialogRef = this.dialog.open(InventoryItemEditDialogComponent, { data: { inventoryItem } });

    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, false);
      this.loadInventoriesList();
    });
  }

  // ==========================================
  // =           Selection Handling           =
  // ==========================================

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.inventoriesResult.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.selection.selected.length === this.inventoriesResult.length) {
      this.selection.clear();
    } else {
      this.inventoriesResult.forEach(row => this.selection.select(row));
    }
  }

  // ==========================================
  // =               UI Section               =
  // ==========================================

  getItemCssClassByIsHomeMade(isHomemade: boolean = false) {
    if (isHomemade) {
      return 'secondary';
    }
    return 'primary';
  }

  getItemStringByIsHomeMade(isHomemade: boolean = false) {
    if (isHomemade) {
      return 'Homemade';
    }
    return 'Dbm Product';
  }

  getItemCssClassByCategory(categeoryId: string = ''): string {
    switch (categeoryId) {
      case '0':
        return 'primary';
      case '1':
        return 'secondary';
      case '2':
        return 'success';
      case '3':
        return 'danger';
      case '4':
        return 'info';
      case '5':
        return 'warning';
      case '6':
        return 'primary';
      case '7':
        return 'secondary';
      case '8':
        return 'success';
      case '9':
        return 'danger';
      case '10':
        return 'info';
      case '11':
        return 'warning';
    }
    return '';
  }

  getItemCssClassByUnit(unitId: string = ''): string {
    switch (unitId) {
      case '0':
        return 'accent';
      case '1':
        return 'brand';
      case '2':
        return 'focus';
      case '3':
        return 'metal';
      case '4':
        return 'dark';
      case '5':
        return '';
      case '6':
        return 'accent';
      case '7':
        return 'brand';
      case '8':
        return 'focus';
      case '9':
        return 'metal';
      case '10':
        return 'dark';
      case '11':
        return '';
    }
    return '';
  }
}
