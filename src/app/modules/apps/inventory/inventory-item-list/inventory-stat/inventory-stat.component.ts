import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoriesDataSource } from '../../_core/models/data-sources/inventories.datasource';

@Component({
  selector: 'app-inventory-stat',
  templateUrl: './inventory-stat.component.html',
  styleUrls: ['./inventory-stat.component.scss']
})
export class InventoryStatComponent implements OnInit {
  @Input()
  dataSource: InventoriesDataSource;

  models: {
    title: string;
    desc: string;
    value: Observable<any>;
    dataType: string;
    unit: string;
    color: string;
  }[] = [
    {
      title: 'Total Base Price',
      desc: 'current total base price',
      value: of(0),
      dataType: 'number',
      unit: '(VND)',
      color: 'brand'
    },
    {
      title: 'Total Sell Price',
      desc: 'current total sell price',
      value: of(0),
      dataType: 'number',
      unit: '(VND)',
      color: 'danger'
    },
    {
      title: 'Homemade Products',
      desc: 'number of homemade products',
      value: of(0),
      dataType: 'number',
      unit: '',
      color: 'success'
    },
    {
      title: 'Dbm Products',
      desc: 'number of data master products',
      value: of(0),
      dataType: 'number',
      unit: '',
      color: 'success'
    },
    {
      title: 'Last Import',
      desc: 'last import activity',
      value: of(Date.now()),
      dataType: 'date',
      unit: '',
      color: 'accent'
    }
  ];

  constructor() {
  }

  ngOnInit() {
    this.models[0].value = this.dataSource.basePriceTotalsSubject.asObservable();
    this.models[1].value = this.dataSource.sellPriceTotalsSubject.asObservable();
    this.models[2].value = this.dataSource.numberOfHomemade.asObservable();
    this.models[3].value = this.dataSource.numberOfNonHomemade.asObservable();
  }
}
