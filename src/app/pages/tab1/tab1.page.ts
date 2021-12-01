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
  opcion: string;
  opcionElegida: number;
  
  categorias = ['GENERAL','BUSINESS','TECHNOLOGY','SCIENCIE'];
  

  constructor(private leerFichero: HttpClient, private gestionNoticiasLeer: GestionNoticiasLeerService, private gestionFicheros: GestionFicherosService) {
    this.cargarFichero(); 
  }
  //constructor (private servidorRest:HttpClient){};
  onClick(opcionElegida){
   
    if (opcionElegida == 1){
      this.opcion = "https://newsapi.org/v2/everything?q=tesla&from=2021-10-30&sortBy=publishedAt&apiKey=9af171292a72467c8c35d0d94d121d3b";
      this.cargarFichero();    
      console.log("1");
      
    } else if (opcionElegida == 2 ) {
      this.opcion = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9af171292a72467c8c35d0d94d121d3b";
       console.log("2");
    } else if (opcionElegida == 3 ) {
      //this.opcion = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9af171292a72467c8c35d0d94d121d3b";
      //this.cargarFichero(this.opcion);
      console.log("Technology");
    } else  {
      //this.opcion = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9af171292a72467c8c35d0d94d121d3b";
      //this.cargarFichero(this.opcion);
      console.log("Ciencia");
    }
    /*if (opcionElegida == 2) {
      this.opcion = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9af171292a72467c8c35d0d94d121d3";
      this.cargarFichero(this.opcion);*/
     
  }



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
    respuesta.subscribe(
      resp => {
       console.log("Noticias", resp);
        this.listaNoticias.push(... resp.articles);
      } );
   
  }

  ngOnInit() { 
    this.opcion = "https://newsapi.org/v2/everything?q=tesla&from=2021-10-30&sortBy=publishedAt&apiKey=9af171292a72467c8c35d0d94d121d3b";
  }
}
