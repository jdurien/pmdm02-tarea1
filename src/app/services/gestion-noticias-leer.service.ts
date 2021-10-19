import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private noticiasLeer: Article [] = [];

  constructor() {

  }

  addNoticia(item) {
    this.noticiasLeer.push(item);
    // console.log(this.noticiasLeer);
  }

  borrarNoticia(item) {
    let indice = this.noticiasLeer.indexOf(item);
    if (indice != -1) {
      this.noticiasLeer.splice(indice, 1);
      // console.log(this.noticiasLeer); 
    }
  }

  getNoticias() {
    return this.noticiasLeer;
  }
}
