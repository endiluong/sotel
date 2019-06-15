
import { BaseDataSource } from './_base.datasource';
import { tap, catchError, finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { of } from 'rxjs';
import { ProductCategoryService } from '../../services/productCategories.service';
import { QueryParamsModel } from '../query-models/query-params.model';
import { QueryResultsModel } from '../query-models/query-results.model';
import { ProductCategory } from '../product-category.model';

export class ProductCategoryDataSource extends BaseDataSource<ProductCategory> {
  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(private productCategoryService: ProductCategoryService) {
    super();
  }

  // ==========================================
  // =            Business Methods            =
  // ==========================================

  loadProductCategories(queryParams: QueryParamsModel) {
    this.loadingSubject.next(true);
    this.productCategoryService
      .findProductCaterogies(queryParams)
      .pipe(
        tap(res => {
          if (environment.isMockEnabled) {
            this.loadFakeProductCategories(res, queryParams);
          } else {
            this.loadRealProductCategories(res);
          }
        }),
        catchError(err => of(new QueryResultsModel([], err))),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  // Fake REST API (Mock)
  loadFakeProductCategories(resultFromServer: any, queryParams: QueryParamsModel) {
    const result = this.baseFilter(resultFromServer.items, queryParams, []);
    this.entitySubject.next(result.items);
    this.paginatorTotalSubject.next(result.totalCount);
  }

  // Real REST API
  loadRealProductCategories(resultFromServer: any) {
    this.entitySubject.next(resultFromServer.items);
    this.paginatorTotalSubject.next(resultFromServer.totalCount);
  }
}
