import { ChangeDetectionStrategy, Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as objectPath from 'object-path';

// Services
import { LayoutConfigService, SubheaderService } from '@app/shared';
import { ProductsService } from '../apps/e-commerce/_core/services/products.service';
import { ProductsDataSource } from '../apps/e-commerce/_core/models/data-sources/products.datasource';
import { QueryParamsModel } from '@app/shared/models/query-params.model';
import { map, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../apps/inventory/_core/models/product.model';
import { ProductModel } from '../apps/e-commerce/_core/models/product.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public config: any;
  productsResult: any[] = [
    {
      id: 1,
      name: 'Phòng 001',
      type: 'Máy lạnh',
      // tslint:disable-next-line:max-line-length
      description: `Phòng vẫn còn đang sử dụng bình thường`,
      price: 15000,
      condition: 1,
      status: 0,
      _userId: 1,
      _createdDate: '03/31/2015',
      _updatedDate: '05/08/2015'
    },
    {
      id: 2,
      type: 'Máy lạnh',
      name: 'Phòng 002',
      // tslint:disable-next-line:max-line-length
      description: `Phòng vẫn còn đang sử dụng bình thường`,
      price: 150000,
      condition: 1,
      status: 0,
      _userId: 1,
      _createdDate: '03/31/2015',
      _updatedDate: '05/08/2015'
    },
    {
      id: 3,
      type: 'Máy lạnh',
      name: 'Phòng 003',
      // tslint:disable-next-line:max-line-length
      description: `Phòng vẫn còn đang sử dụng bình thường`,
      price: 150000,
      condition: 1,
      status: 0,
      _userId: 1,
      _createdDate: '03/31/2015',
      _updatedDate: '05/08/2015'
    },
    {
      id: 4,
      type: 'Máy quạt',
      name: 'Phòng 004',
      // tslint:disable-next-line:max-line-length
      description: `Phòng vẫn còn đang sử dụng bình thường`,
      price: 100000,
      condition: 0,
      status: 1,
      _userId: 1,
      _createdDate: '03/31/2015',
      _updatedDate: '05/08/2015'
    },
    {
      id: 5,
      type: 'Máy quạt',
      name: 'Phòng 005',
      // tslint:disable-next-line:max-line-length
      description: `Phòng vẫn còn đang sử dụng bình thường`,
      price: 100000,
      condition: 1,
      status: 0,
      _userId: 1,
      _createdDate: '03/31/2015',
      _updatedDate: '05/08/2015'
    }
  ];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {}
}
