import { Producto } from './../../../model/producto.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from 'src/app/service/producto.service';

export interface DialogData {
  detail: Producto;
}

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ProductoService
  ) { }

  ngOnInit(): void {
  }

  deleteProduct(){
    this.service.deleteProduct(this.data.detail.codProducto).subscribe(
      (res: any) => {
        this.dialogRef.close(true);
      }, (err: any ) => {
        alert("Ocurrio un error al tratar de eliminar el registro. Intentelo nuevamente.")
      }
    )
  }
}
