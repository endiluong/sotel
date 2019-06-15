/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InventoryItemEdit.dialogComponent } from './inventory-item-edit.dialog.component';

describe('InventoryItemEdit.dialogComponent', () => {
  let component: InventoryItemEdit.dialogComponent;
  let fixture: ComponentFixture<InventoryItemEdit.dialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryItemEdit.dialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemEdit.dialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
