import { ProductoService } from './../../../service/producto.service';
import { Producto } from './../../../model/producto.model';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  type: string;
  detail: Producto;
}

@Component({
  selector: 'app-modal-add-edit-product',
  templateUrl: './modal-add-edit-product.component.html',
  styleUrls: ['./modal-add-edit-product.component.css']
})
export class ModalAddEditProductComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl({
      value: null,
      disabled: false
    }, Validators.required),

    precio: new FormControl({
      value: null,
      disabled: false
    }, Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<ModalAddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ProductoService
  ) {

    if (this.data.type == 'edit') {
      this.form.patchValue({
        nombre: this.data.detail.nombre,
        precio: this.data.detail.precio
      })
    }
  }

  ngOnInit(): void { }


  updateProduct(){
    this.service.updateProducto(this.form.value, this.data.detail.codProducto).subscribe(
      (res: any) => {
        this.dialogRef.close(res);
      }, (err: any) => {
        alert("Ocurrio un error al actualizar el producto");
      }
    )
  }

  addProduct(){
    this.service.addProduct(this.form.value).subscribe(
      (res: any) => {
        this.dialogRef.close(res);
      },(erro: any) => {
        alert("Ocurrio un error al agregar un nuevo producto");
      }
    )
  }
}
