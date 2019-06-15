import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CustomersService } from '../../services/customers.service';
import { QueryParamsModel } from '../query-models/query-params.model';
import { BaseDataSource } from './_base.datasource';
import { QueryResultsModel } from '../query-models/query-results.model';
import { environment } from '@env/environment';
import { CustomerModel } from '../customer.model';

export class CustomersDataSource extends BaseDataSource<CustomerModel> {
  constructor(private customersService: CustomersService) {
    super();
  }

  loadCustomers(queryParams: QueryParamsModel) {
    this.loadingSubject.next(true);
    this.customersService
      .findCustomers(queryParams)
      .pipe(
        tap(res => {
          if (environment.isMockEnabled) {
            this.loadFakeCustomers(res, queryParams);
          } else {
            this.loadRealCustomers(res);
          }
        }),
        catchError(err => of(new QueryResultsModel([], err))),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  // Fake REST API (Mock)
  loadFakeCustomers(resultFromServer: any, queryParams: any) {
    const result = this.baseFilter(resultFromServer.items, queryParams, ['status', 'type']);
    this.entitySubject.next(result.items);
    this.paginatorTotalSubject.next(result.totalCount);
  }

  // Real REST API
  loadRealCustomers(resultFromServer: any) {
    this.entitySubject.next(resultFromServer.items);
    this.paginatorTotalSubject.next(resultFromServer.totalCount);
  }
}
