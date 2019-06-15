import { Component, OnInit, Inject } from '@angular/core';
import { InventoryItem } from '../../_core/models/inventory-item.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InventoriesService } from '../../_core/services/inventories.service';
import { TypesUtilsService } from '../../_core/utils/types-utils.service';

@Component({
  selector: 'app-inventory-item-edit-dialog',
  templateUrl: './inventory-item-edit.dialog.component.html',
  styleUrls: ['./inventory-item-edit.dialog.component.scss']
})
export class InventoryItemEditDialogComponent implements OnInit {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  inventoryItem: InventoryItem;
  inventoryItemForm: FormGroup;
  hasFormErrors = false;
  viewLoading = false;
  loadingAfterSubmit = false;

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(
    public dialogRef: MatDialogRef<InventoryItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private inventoryService: InventoriesService
  ) {}

  ngOnInit() {
    this.inventoryItem = this.data.inventoryItem;
    this.createForm();

    /* Server loading imitation. Remove this on real code */
    this.viewLoading = true;
    setTimeout(() => {
      this.viewLoading = false;
    }, 1000);
  }

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  createForm() {
    this.inventoryItemForm = new FormGroup({
      productCode: new FormControl({ value: this.inventoryItem.productCode, disabled: true }, [Validators.required]),
      productName: new FormControl({ value: this.inventoryItem.productName, disabled: true }, [Validators.required]),
      productCategory: new FormControl({ value: this.inventoryItem.productCategoryId, disabled: true }, [
        Validators.required
      ]),
      unit: new FormControl({ value: this.inventoryItem.unitId, disabled: true }, [Validators.required]),

      description: new FormControl({ value: this.inventoryItem.description, disabled: false }, []),
      expiredDate: new FormControl({ value: this.inventoryItem.expiredDate, disabled: false }, [
        Validators.nullValidator
      ]),
      basePrice: new FormControl({ value: this.inventoryItem.basePrice.toString(), disabled: false }, [
        Validators.min(0)
      ]),
      sellPrice: new FormControl({ value: this.inventoryItem.sellPrice.toString(), disabled: false }, [
        Validators.min(0)
      ]),
      quantity: new FormControl({ value: this.inventoryItem.quantity.toString(), disabled: false }, [
        Validators.min(0)
      ]),
    });
  }

  prepareInventoryItem(): InventoryItem {
    const controls = this.inventoryItemForm.controls;
    const _inventoryItem = new InventoryItem(
      this.inventoryItem.id,
      this.inventoryItem.productId,
      this.inventoryItem.productName,
      this.inventoryItem.productCode,
      this.inventoryItem.productImageUrl,
      this.inventoryItem.productCategoryId,
      this.inventoryItem.productCategoryName,
      this.inventoryItem.productIsHomemade,
      this.inventoryItem.unitId,
      this.inventoryItem.unitName,
      controls['basePrice'].value,
      controls['sellPrice'].value,
      controls['quantity'].value,
      controls['expiredDate'].value,
      this.inventoryItem.position,
      controls['description'].value,
      this.inventoryItem.note
    );

    return _inventoryItem;
  }

  onSubmit() {
    console.log('Run submit');

    this.hasFormErrors = false;
    this.loadingAfterSubmit = false;
    const controls = this.inventoryItemForm.controls;
    /** check form */
    if (this.inventoryItemForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());

      this.hasFormErrors = true;
      return;
    }

    const editedInventoryItem = this.prepareInventoryItem();
    this.updateInventoryItem(editedInventoryItem);
  }

  updateInventoryItem(_inventoryItem: InventoryItem) {
    this.loadingAfterSubmit = true;
    this.viewLoading = true;
    this.inventoryService.updateInventory(_inventoryItem).subscribe(res => {
      /* Server loading imitation. Remove this on real code */
      this.viewLoading = false;
      this.viewLoading = false;
      this.dialogRef.close({
        _inventoryItem,
        isEdit: true
      });
    });
  }

  onAlertClose($event: any) {
    this.hasFormErrors = false;
  }

  // ================================================
  // =                 UI Section                   =
  // ================================================

  getTitle(): string {
    return `Edit Inventory Item: ${this.inventoryItem.productName}`;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.inventoryItemForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
}
