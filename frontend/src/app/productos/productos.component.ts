import { ProductoService } from './../service/producto.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../model/producto.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddEditProductComponent } from './component/modal-add-edit-product/modal-add-edit-product.component';
import { ModalDeleteComponent } from './component/modal-delete/modal-delete.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  displayedColumns = ['COD_PRODUCT', 'NAME', 'PRICE', 'ACTIONS'];
  data = new MatTableDataSource<Producto>();
  loading: boolean = true;

  constructor(
    private service: ProductoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDataPorducts();
  }

  getDataPorducts(){
    this.service.getPorductos().subscribe(
      (res: any) => {
        this.loading = false;
        this.data.data = res;
      }, (error: any) => {
        this.loading = false;
        alert("Ocurrio un error al obtener los datos")
      }
    )
  }

  addProduct(){
    const modal = this.dialog.open(ModalAddEditProductComponent,{
      width: '20rem',
      data: {
        type: 'add'
      }
    });

    modal.afterClosed().subscribe(result => {
      if (result) {
        this.data.data.push(result);
        this.data._updateChangeSubscription();
      }
    })
  }

  editProduct(index: number, data: Producto) {
    const modal = this.dialog.open(ModalAddEditProductComponent,{
      width: '20rem',
      data: {
        type: 'edit',
        detail: data
      }
    });

    modal.afterClosed().subscribe(result => {
        if (result) {
          this.data.data.splice(index, 1, result);
          this.data._updateChangeSubscription();
        }
    })
  }

  deleteProduct(index: Number, data: Producto ){
    const modal = this.dialog.open(ModalDeleteComponent,{
      width: '24rem',
      data: {
        detail: data,
      }
    })

    modal.afterClosed().subscribe(result => {
      if (result) {
        this.data.data = this.data.data.filter((item: Producto, i: Number) => i !== index)
      }
    })
  }

}
