import { GestionFicherosService } from './gestion-ficheros.service';
import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private noticiasLeer: Article [] = [];

 // constructor (){}
  constructor(private gestionFicheros: GestionFicherosService) {
  
  //  20211130
  let datosPromesa: Promise <Article[]> = gestionFicheros.getObject("Noticia");
  datosPromesa.then(datos => {
    this.noticiasLeer.push(...datos);
  })

   
  }

  addNoticia(item) {
    // copiar item
    let itemString = JSON.stringify(item);
    let itemParse = JSON.parse(itemString);

    // Añadirlo
    this.noticiasLeer.push(itemParse); // añade el item (enviado desde )
    // console.log(this.noticiasLeer);
    this.gestionFicheros.setObject("Noticia",this.noticiasLeer); //20211130
  }

  buscar(item: Article): number  {
    let articuloEncontrado: Article = this.noticiasLeer.find(
      function(cadaArticulo) { 
        return JSON.stringify(cadaArticulo) == JSON.stringify(item);
      }
    );
    let indice = this.noticiasLeer.indexOf(articuloEncontrado);
    return indice;
  }

  borrarNoticia(item) {
    let indice = this.buscar(item);
    if (indice != -1) {
      this.noticiasLeer.splice(indice, 1);
      
      // console.log(this.noticiasLeer); 
      this.gestionFicheros.setObject("Noticia",this.noticiasLeer); //20211130
    }
  }

  getNoticias() {
    return this.noticiasLeer;
  }
}
