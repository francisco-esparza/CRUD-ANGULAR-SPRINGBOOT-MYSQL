import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ModalAddEditProductComponent } from './component/modal-add-edit-product/modal-add-edit-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ModalDeleteComponent } from './component/modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    ProductosComponent,
    ModalAddEditProductComponent,
    ModalDeleteComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ProductosModule { }
