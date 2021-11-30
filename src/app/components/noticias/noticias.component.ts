import { Article } from './../../interfaces/interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @Input() listaNoticias: Article[]; //la variable listaNoticias es un Array de artículos

  constructor() { }

  ngOnInit() {}

}
