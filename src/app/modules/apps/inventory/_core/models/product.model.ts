import { BaseModel } from './_base.model';

export class Product extends BaseModel {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================
  id: string;
  code: string;
  name: string;
  imageUrl: string;
  categoryId: string;
  categoryName: string;
  unitId: string;
  unitName: string;
  description: string;
  price: number;
  isHomeMade: boolean;

  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(
    id: string,
    code: string,
    name: string,
    imageUrl: string,
    categoryId: string,
    categoryName: string,
    unitId: string,
    unitName: string,
    description: string,
    price: number,
    isHomeMade: boolean
  ) {
    super();

    this.id = id;
    this.code = code;
    this.name = name;
    this.imageUrl = imageUrl;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.unitId = unitId;
    this.unitName = unitName;
    this.description = description;
    this.price = price;
    this.isHomeMade = isHomeMade;
  }

  // ==========================================
  // =            Business Methods            =
  // ==========================================

  clear() {
    this.id = '';
    this.code = '';
    this.name = '';
    this.imageUrl = '';
    this.categoryId = '';
    this.categoryName = null;
    this.unitId = '';
    this.unitName = null;
    this.description = '';
    this.price = 0;
    this.isHomeMade = false;
  }
}
