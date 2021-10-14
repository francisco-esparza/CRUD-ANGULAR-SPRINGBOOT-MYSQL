import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor( private http: HttpClient) { }

  getPorductos(){
    return this.http.get(`${environment.baseUrl}/api/productos`)
  }

  updateProducto(form: Producto, id: Number){
    const body: Producto = {
      nombre: form.nombre,
      codProducto: form.codProducto,
      precio: form.precio
    }
    return this.http.put(`${environment.baseUrl}/api/productos/${id}`,body)
  }

  addProduct(form: Producto){
    const body = {
      nombre: form.nombre,
      precio: form.precio
    }

    return this.http.post(`${environment.baseUrl}/api/productos`,body)
  }

  deleteProduct(id: Number){
    return this.http.delete(`${environment.baseUrl}/api/productos/${id}`)
  }
}
