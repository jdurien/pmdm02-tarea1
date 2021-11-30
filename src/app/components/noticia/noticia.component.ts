import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Article } from './../../interfaces/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;    // en la varible noticia meto un artículo.

  constructor(private gestionNoticiasLeer: GestionNoticiasLeerService, private alertController: AlertController) { }

  ngOnInit() {}

  onClick() {
    this.confirmarBorrar(); // esta opción es la Asíncrona que se desarrolla a continuación
  
  }

  async confirmarBorrar() {
    const alerta = await this.alertController.create({   // crea la ventana de notificaciones y la devuelve a la variable alerta en forma de promesa
      header: 'Confirmar',
      message: '¿Borrar noticia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Borrar',
          handler: () => {
            console.log('Confirmar borrado');
            this.gestionNoticiasLeer.borrarNoticia(this.noticia); // esta opción en gestionNoticiasLeer.service
          }
        }
      ]
    });

    await alerta.present();   // muestra la ventana creada.
  }

}
