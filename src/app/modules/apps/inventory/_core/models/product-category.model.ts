import { BaseModel } from './_base.model';

export class ProductCategory extends BaseModel {

  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  id: string;
  name: string;

  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(id: string, name: string) {
    super();

    this.id = id;
    this.name = name;
  }

  // ==========================================
  // =            Business Methods            =
  // ==========================================

  clear() {
    this.id = '';
    this.name = '';
  }
}
