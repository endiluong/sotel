import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../utils/http-utils.service';
import { Observable, of } from 'rxjs';
import { ProductCategory } from '../models/product-category.model';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { environment } from '@env/environment';
import { mergeMap } from 'rxjs/operators';

const API_PRODUCTCATEGORY_URL = 'api/productCategories';

@Injectable()
export class ProductCategoryService {
  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {}

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  getAllProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(API_PRODUCTCATEGORY_URL);
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findProductCaterogies(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    return environment.isMockEnabled
      ? this.findFakeProductCategories(queryParams)
      : this.findRealProductCategories(queryParams);
  }

  // Fake REST API (Mock)
  findFakeProductCategories(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // This code imitates server calls
    const url = API_PRODUCTCATEGORY_URL;
    return this.http
      .get<ProductCategory[]>(API_PRODUCTCATEGORY_URL)
      .pipe(mergeMap(res => of(new QueryResultsModel(res))));
  }

  // Real REST API
  // Server should return filtered/sorted result
  findRealProductCategories(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url = API_PRODUCTCATEGORY_URL + '/find';
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      params: httpParams
    });
  }
}
