import { BaseModel } from './_base.model';
import { ProductSpecificationModel } from './product-specification.model';
import { ProductRemarkModel } from './product-remark.model';

export class ProductModel extends BaseModel {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  condition: number;
  status: number;

  _specs: ProductSpecificationModel[];
  _remarks: ProductRemarkModel[];

  clear() {
    this.name = '';
    this.type = '';
    this.description = '';
    this.price = 150000;
    this.condition = 0;
    this.status = 0;
  }
}
