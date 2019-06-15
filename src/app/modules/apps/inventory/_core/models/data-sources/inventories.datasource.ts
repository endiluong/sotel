import { BaseDataSource } from './_base.datasource';
import { InventoriesService } from '../../services/inventories.service';
import { QueryParamsModel } from '@app/shared/models/query-params.model';
import { tap, catchError, finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { QueryResultsModel } from '../query-models/query-results.model';
import { InventoryItem } from '../inventory-item.model';
import { CollectionViewer } from '@angular/cdk/collections';

export class InventoriesDataSource extends BaseDataSource<InventoryItem> {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  expandableRows = new BehaviorSubject<any[]>([]);

  basePriceTotalsSubject = new BehaviorSubject<number>(0);
  sellPriceTotalsSubject = new BehaviorSubject<number>(0);
  numberOfHomemade = new BehaviorSubject<number>(0);
  numberOfNonHomemade = new BehaviorSubject<number>(0);

  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(private inventoriesService: InventoriesService) {
    super();
  }

  // ==========================================
  // =            Business Methods            =
  // ==========================================

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.expandableRows.asObservable();
  }

  loadInventories(queryParams: QueryParamsModel) {
    this.loadingSubject.next(true);
    this.inventoriesService
      .findInventories(queryParams)
      .pipe(
        tap(res => {
          if (environment.isMockEnabled) {
            this.loadFakeInventories(res, queryParams);
          } else {
            this.loadRealInventories(res);
          }
        }),
        catchError(err => of(new QueryResultsModel([], err))),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  // Fake REST API (Mock)
  loadFakeInventories(resultFromServer: any, queryParams: any) {
    const result = this.baseFilter(resultFromServer.items, queryParams, ['productCategoryId', 'unitId']);

    this.entitySubject.next(result.items);
    this.paginatorTotalSubject.next(result.totalCount);

    // Generate Expandabled Data Rows
    const rows: any[] = [];
    result.items.forEach(element => rows.push(element, { detailRow: true, element }));
    this.expandableRows.next(rows);

    // Statistic Summary
    let totalBasePrice = 0;
    let totalSellPrice = 0;
    let numberOfHomemade = 0;
    let numberOfNonHomemade = 0;
    resultFromServer.items.forEach((item: any) => {
      if (item.productIsHomemade) {
        numberOfHomemade++;
      } else {
        numberOfNonHomemade++;
      }
      totalBasePrice += item.basePrice * item.quantity;
      totalSellPrice += item.sellPrice * item.quantity;
    });
    this.basePriceTotalsSubject.next(totalBasePrice);
    this.sellPriceTotalsSubject.next(totalSellPrice);
    this.numberOfHomemade.next(numberOfHomemade);
    this.numberOfNonHomemade.next(numberOfNonHomemade);
  }

  // Real REST API
  loadRealInventories(resultFromServer: any) {
    this.entitySubject.next(resultFromServer.items);
    this.paginatorTotalSubject.next(resultFromServer.totalCount);
  }
}
