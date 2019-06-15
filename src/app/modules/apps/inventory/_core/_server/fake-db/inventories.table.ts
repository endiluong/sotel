import { InventoryItem } from '../../models/inventory-item.model';
import { ProductCategory } from '../../models/product-category.model';
import { UnitOfMeasure } from '../../models/unit-of-measure.model';
import { Product } from '../../models/product.model';

export class InventoriesTable {
  public static db: {
    unitOfMeasureDb: any;
    productCategoryDb: any;
    productDb: any;
    inventoryDb: any;
  } = InventoriesTable.generate();

  public static generate(): any {
    const categoryDb = InventoriesTable.generateProductCategory();

    const unitDb = InventoriesTable.generateUnitOfMeasure();

    const productDb = InventoriesTable.generateProduct(unitDb, categoryDb);

    const inventoryDb = InventoriesTable.generateInventory(productDb);

    return {
      unitOfMeasureDb: unitDb,
      productCategoryDb: categoryDb,
      productDb: productDb,
      inventoryDb: inventoryDb
    };
  }

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  public static generateProductCategory(): any {
    console.log('generete categories');
    const defaultCategory = [
      'chất tẩy rữa',
      'quần áo',
      'đồ ăn',
      'rau quả',
      'nước có ga',
      'rượu',
      ' thực phẩm tươi',
      'đồ ăn vặt'
    ];

    const resultData = new Array<ProductCategory>();
    let id = 1;
    defaultCategory.forEach(category => {
      resultData.push(new ProductCategory(id.toString(), category));

      id++;
    });

    return resultData;
  }

  public static generateUnitOfMeasure(): any {
    const defaultUnit = ['gói', 'kí lô', 'hộp', 'túi', 'thùng', 'tá', 'gram'];

    const resultData = new Array<UnitOfMeasure>();
    let id = 1;
    defaultUnit.forEach(unit => {
      resultData.push(new UnitOfMeasure(id.toString(), unit));

      id++;
    });

    return resultData;
  }

  public static generateProduct(unitDb: any, categoryDb: any): any {
    // Generator Config
    const productDbNum = 50;

    const resultData = new Array<Product>();

    const defaultImages = [
      'https://www.myamericanmarket.com/873-large_default/coca-cola-classic.jpg',
      'http://pizzaoncambridge.com/wp-content/uploads/2015/10/pepsi-e1445479694227.jpg',
      'https://i5.walmartimages.ca/images/Enlarge/212/537/999999-67238212537.jpg',
      'http://www.limone.vn/image/cache/catalog/DRINK%20AND%20DESSERT/tiger-700x700_0.jpg',
      'https://www.beautyheaven.com.au/sites/default/files/products/HS_APPLEFRESH_SHAMPOO_200ML_FRONT-bh.jpg',
      'https://images.depxinh.net/products/item.12_2016/3101/source/omo-ban-mai-4kg-nen-dep-xinh.jpg',
      'https://sc02.alicdn.com/kf/UT8_xjfXWxcXXagOFbXe/Neptune-Cooking-Oil-Made-in-Vietnam.jpg'
    ];

    for (let i = 1; i < productDbNum; i++) {
      const randImage = Math.floor(Math.random() * defaultImages.length) + 0;

      const randCode = Math.floor(Math.random() * 9999999999999) + 90000000000000;

      const randUnit = Math.floor(Math.random() * unitDb.length) + 0;

      const randCategory = Math.floor(Math.random() * categoryDb.length) + 0;

      const randBasePrice = (Math.floor(Math.random() * 200) + 1) * 1000;

      resultData.push(
        new Product(
          i.toString(),
          randCode.toString(),
          `Sản Phẩm ${i}`,
          defaultImages[randImage],
          categoryDb[randCategory].id,
          categoryDb[randCategory].name,
          unitDb[randUnit].id,
          unitDb[randUnit].name,
          `Sản phẩm này thuộc về nhà sản xuất ABC với các tính năng XYZ`,
          randBasePrice,
          false
        )
      );
    }

    return resultData;
  }

  public static generateInventory(productDb: any): any {
    const inventoryItems = new Array<InventoryItem>();
    // const randLength = Math.floor(Math.random() * 10) + 10;
    const randLength = 18;
    let resultData = new Array<InventoryItem>();

    for (let i = 0; i < randLength; i++) {
      // const randProduct = this.ProductDb[Math.floor(Math.random() * this.ProductDb.length) + 0];
      const randProduct = productDb[i];

      const randBasePrice = randProduct.price;

      const randSalePrice = randBasePrice + (Math.floor(Math.random() * 30) + 0) * 1000;

      const randQuantity = Math.floor(Math.random() * 100) + 0;

      const randStoringPeriod = Math.floor(Math.random() * 10) + 3;

      inventoryItems.push(
        new InventoryItem(
          i.toString(),
          randProduct.id,
          randProduct.name,
          randProduct.code,
          randProduct.imageUrl,
          randProduct.categoryId,
          randProduct.categoryName,
          randProduct.isHomeMade,
          randProduct.unitId,
          randProduct.unitName,
          randBasePrice,
          randSalePrice,
          randQuantity,
          new Date(),
          'Kho A',
          'blah blah blah blah blah blah blah',
          'blah blah blah blah blah blah blah'
        )
      );
    }

    resultData = resultData.concat(inventoryItems);

    return resultData;
  }
}
