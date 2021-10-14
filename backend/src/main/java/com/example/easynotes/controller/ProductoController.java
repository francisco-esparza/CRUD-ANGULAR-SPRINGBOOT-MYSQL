package com.example.easynotes.controller;

import com.example.easynotes.exception.ResourceNotFoundException;
import com.example.easynotes.model.Producto;
import com.example.easynotes.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by rajeevkumarsingh on 27/06/17.
 */
@RestController
@RequestMapping("/api")
public class ProductoController {

    @Autowired
    ProductoRepository productoRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/productos")
    public List<Producto> getAllNotes() {
        return productoRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/productos")
    public Producto createNote(@Valid @RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @GetMapping("/productos/{id}")
    public Producto getNoteById(@PathVariable(value = "id") Long codProducto) {
        return productoRepository.findById(codProducto)
                .orElseThrow(() -> new ResourceNotFoundException("producto", "id", codProducto));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/productos/{id}")
    public Producto updateNote(@PathVariable(value = "id") Long codProducto,
            @Valid @RequestBody Producto productoDetail) {

        Producto producto = productoRepository.findById(codProducto)
                .orElseThrow(() -> new ResourceNotFoundException("producto", "id", codProducto));

        producto.setNombre(productoDetail.getNombre());
        producto.setPrecio(productoDetail.getPrecio());

        Producto updateProducto = productoRepository.save(producto);
        return updateProducto;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/productos/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Long codProduct) {
        Producto producto = productoRepository.findById(codProduct)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "cod_producto", codProduct));

        productoRepository.delete(producto);

        return ResponseEntity.ok().build();
    }
}
