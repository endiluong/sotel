import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../utils/http-utils.service';
import { Observable, of } from 'rxjs';
import { UnitOfMeasure } from '../models/unit-of-measure.model';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { environment } from '@env/environment';
import { mergeMap } from 'rxjs/operators';

const API_UNITOFMEASURE_URL = 'api/unitOfMeasures';

@Injectable()
export class UnitOfMeasureService {
  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {}

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  getAllUnitOfMeasure(): Observable<UnitOfMeasure[]> {
    return this.http.get<UnitOfMeasure[]>(API_UNITOFMEASURE_URL);
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findUnitOfMeasures(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    return environment.isMockEnabled
      ? this.findFakeUnitOfMeasures(queryParams)
      : this.findRealUnitOfMeasure(queryParams);
  }

  // Fake REST API (Mock)
  findFakeUnitOfMeasures(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // This code imitates server calls
    const url = API_UNITOFMEASURE_URL;
    return this.http
      .get<UnitOfMeasure[]>(API_UNITOFMEASURE_URL)
      .pipe(mergeMap(res => of(new QueryResultsModel(res))));
  }

  // Real REST API
  // Server should return filtered/sorted result
  findRealUnitOfMeasure(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url = API_UNITOFMEASURE_URL + '/find';
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      params: httpParams
    });
  }
}
