import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // el sevicio setting es almacenado en la variable _ajustes para realizar todos los cambios desde el servicio
  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
    // Al iniciar debemos obtener informacion del check, el cual se mostrara en el objeto seteado en el localStorage
    this.colocarCheck();
  }

  // La funcion cambiarColor obtendra de la vista el nombre del tema y su identificador #
  cambiarColor( tema: string, link: any ) {
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  // aplicarCheck obtendra todos los elementos de la vista que contangan la clase selector
  aplicarCheck( link: any) {

    // selectores es un arreglo que contendra todos los elementos con clase selector
    let selectores: any = document.getElementsByClassName('selector');
    // Dicho arreglo lo recorreremos
    for ( let ref of selectores ) {
      // Y removeremos, en caso de existir la clase 'working'
      ref.classList.remove('working');
    }
    // Una vez removido la clase 'working' del arreglo de elementos se añadila al elemento contenido en link
    link.classList.add('working');
  }

  // colocarCheck es la primer funcion llamada por el componente, ya que interactua con los valores existentes en localStorage
  colocarCheck() {

    // selectores es un arreglo que contendra todos los elementos con clase selector
    let selectores: any = document.getElementsByClassName('selector');
    // tema es una variable que obtendra el nombre del tema almacenado en localStorage,
    // En caso de no estar seteado en localStorage se obtendra el declarado por defecto en la interfaz Ajuste.
    let tema = this._ajustes.ajustes.tema;

    // Recorreremos el arreglo selectores
    for ( let ref of selectores ) {
      // Y obtendremos el elemento con attibuto 'data-theme' que contenga el mismo valor que la variable tema (nombre del tema).
      if (ref.getAttribute('data-theme') === tema) {
        // Y por ultimo añadiremos la clase 'working'
        ref.classList.add('working');
        break;
      }
    }


  }
}
