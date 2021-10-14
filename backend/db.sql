create database valtx;
use valtx;
create table producto
(
    cod_producto varchar(255) not null,
    nombre varchar(255) not null, 
    precio double not null,
    constraint pk_producto primary key(cod_producto), constraint
    chk_producto_precio check(precio>0)
);