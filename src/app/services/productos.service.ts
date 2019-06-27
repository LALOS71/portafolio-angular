import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
// import { ConsoleReporter } from 'jasmine';
// import { Promise } from 'q';
// import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosfiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {
      
      this.http.get("https://angular-html-1414e.firebaseio.com/productos_idx.json")
          .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
        
        // setTimeout(() => {
        //   this.cargando = false;
          
        // }, 2000);
       });
    });

  }

    getProducto ( id: string ) {

      return this.http.get(`https://angular-html-1414e.firebaseio.com/productos/${ id }.json`)
    }

    buscarProducto( termino: string ) {

      if ( this.productos.length === 0 ) {
        //cargar productos
        this.cargarProductos().then( ( ) => {
          //despues de tener los productos
          //Aplicar filtro
          this.filtrarProductos( termino );
        });
      } else {
        //aplicar el filtro
        this.filtrarProductos( termino );
      }       
    }
    
    private filtrarProductos( termino: string ) {
      
      //console.log(this.productos);
      this.productosfiltrado = [];

      termino = termino.toLowerCase();

      this.productos.forEach( prod => {

        const tituloLower = prod.titulo.toLowerCase();

        if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0) {
          this.productosfiltrado.push( prod );
        }

      });

    }
}
