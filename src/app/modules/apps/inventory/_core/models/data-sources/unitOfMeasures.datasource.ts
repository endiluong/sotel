import { BaseDataSource } from './_base.datasource';
import { tap, catchError, finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { of } from 'rxjs';
import { UnitOfMeasureService } from '../../services/unitOfMeasures.service';
import { UnitOfMeasure } from '../unit-of-measure.model';
import { QueryResultsModel } from '../query-models/query-results.model';
import { QueryParamsModel } from '../query-models/query-params.model';

export class UnitOfMeasureDataSource extends BaseDataSource<UnitOfMeasure> {
  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(private unitOfMeasureService: UnitOfMeasureService) {
    super();
  }

  // ==========================================
  // =            Business Methods            =
  // ==========================================

  loadUnitOfMeasure(queryPrams: QueryParamsModel) {
    this.loadingSubject.next(true);
    this.unitOfMeasureService
      .findUnitOfMeasures(queryPrams)
      .pipe(
        tap(res => {
          if (environment.isMockEnabled) {
            this.loadFakeUnitOfMeasures(res, queryPrams);
          } else {
            this.loadRealUnitOfMeasures(res);
          }
        }),
        catchError(err => of(new QueryResultsModel([], err))),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  // Fake REST API (Mock)
  loadFakeUnitOfMeasures(resultFromServer: any, queryPrams: QueryParamsModel) {
    const result = this.baseFilter(resultFromServer.items, queryPrams, []);
    this.entitySubject.next(result.items);
    this.paginatorTotalSubject.next(result.totalCount);
  }

  // Real REST API
  loadRealUnitOfMeasures(resultFromServer: any) {
    this.entitySubject.next(resultFromServer.items);
    this.paginatorTotalSubject.next(resultFromServer.totalCount);
  }
}
