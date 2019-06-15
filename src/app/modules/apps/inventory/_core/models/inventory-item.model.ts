import { BaseModel } from './_base.model';

export class InventoryItem extends BaseModel {

  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

    id: string;
    productId: string;
    productName: string;
    productCode: string;
    productImageUrl: string;
    productCategoryId: string;
    productCategoryName: string;
    productIsHomemade: boolean;
    unitId: string;
    unitName: string;
    basePrice: number;
    sellPrice: number;
    quantity: number;
    expiredDate: Date;
    position: string;
    description: string;
    note: string;

  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(
    id: string,
    productId: string,
    productName: string,
    productCode: string,
    productImageUrl: string,
    productCategoryId: string,
    productCategoryName: string,
    productIsHomemade: boolean,
    unitId: string,
    unitName: string,
    basePrice: number,
    sellPrice: number,
    quantity: number,
    expiredDate: Date,
    position: string,
    description: string,
    note: string
  ) {
    super();

    this.id = id;
    this.productId = productId;
    this.productName = productName;
    this.productCode = productCode;
    this.productImageUrl =  productImageUrl;
    this.productCategoryId = productCategoryId;
    this.productCategoryName = productCategoryName;
    this.productIsHomemade = productIsHomemade;
    this.unitId = unitId;
    this.unitName = unitName;
    this.basePrice = basePrice;
    this.sellPrice = sellPrice;
    this.quantity = quantity;
    this.expiredDate = expiredDate;
    this.position = position;
    this.description = description;
    this.note = note;
  }

  // ==========================================
  // =            Business Methods            =
  // ==========================================

  clear() {
    this.id = '';

    this.productId = '';
    this.productName = '';
    this.productCode = '';
    this.productImageUrl = '';
    this.productCategoryId = '';
    this.productCategoryName = '';
    this.productIsHomemade = false;
    this.unitId = '';
    this.unitName = '';

    this.basePrice = 0;
    this.sellPrice = 0;
    this.quantity = 0;
    this.expiredDate = new Date();
    this.position = '';
    this.description = '';
    this.note = '';
  }
}
