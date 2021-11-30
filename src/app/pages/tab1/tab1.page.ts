import { GestionFicherosService } from './../../services/gestion-ficheros.service';
import { HttpClient } from '@angular/common/http';
import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Creo e inicializo un array vacío
  listaNoticias: Article[] = [];
  respuesta: Observable<RespuestaNoticias>;  //declaración de variable y está observando los cambios que se producen en 'respuestaNoticias'

  constructor(private leerFichero: HttpClient, private gestionNoticiasLeer: GestionNoticiasLeerService, private gestionFicheros: GestionFicherosService) {
    this.cargarFichero(); 
  }
  //constructor (private servidorRest:HttpClient){};

  check(eventoRecibido, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeer.addNoticia(item);
      
    } else {
      this.gestionNoticiasLeer.borrarNoticia(item);
    }
    
  }

  // Lee el fichero con los artículos y los guarda en el array "listaNoticias"
  private cargarFichero() {

    let respuesta: Observable<RespuestaNoticias> = this.leerFichero.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9af171292a72467c8c35d0d94d121d3b");
    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      this.listaNoticias.push(... resp.articles);
    } );
  }

  ngOnInit() { 
  }
}
