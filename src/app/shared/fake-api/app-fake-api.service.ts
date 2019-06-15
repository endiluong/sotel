import { QuickSearchDb } from './fake-db/quick-search';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AuthFakeDb } from './fake-db/auth';
import { MessengerDb } from './fake-db/messenger';
import { LogsDb } from './fake-db/logs';
import { CarsTable } from '../../modules/apps/e-commerce/_core/_server/fake-db/cars.table';

// import { ECommerceDataContext } from './fake-db/e-commerce-db/_e-commerce.data-context';

@Injectable()
export class AppFakeApiService implements InMemoryDbService {
  constructor() {}

  createDb(): {} | Observable<{}> {
    return {
      // login and account
      users: AuthFakeDb.users,

      // messenger
      messenger: MessengerDb.messages,

      // logs
      logs: LogsDb.logs,
      quick_search: QuickSearchDb.quickSearchHtml,
      // data-table
      products: CarsTable.cars
    };
  }
}
