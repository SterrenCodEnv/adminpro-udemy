import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Declaramos un objeto con interfaz que almacenara 2 propiedades, el url del tema y su nombre
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(
    // El servicio interactua directamente con un elemento del DOM en index.html
    @Inject(DOCUMENT) private _document
    ) {
      // Apenas se inicie la aplicacion se cargara la funcion cargarAjustes
    this.cargarAjustes();
  }

  // guardarAjustes crea un item 'ajustes' en localstorage.
  guardarAjustes() {
    // 'ajustes' es un objeto por lo que, para almacenar su valor en localStorage
    // debemos convertirlo en string con el uso de la funcion JSON.stringify
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  // cargarAjustes obtendra el valor del item 'ajustes'.
  cargarAjustes() {
    // debemos validar que el item ajustes se encuentra seteado en el localStorage
    if (localStorage.getItem('ajustes')) {
      // en caso de existir debemos convertir en objeto el valor del string almacenado
      // para ello utilizamos la funcion JSON.parse
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

      // Obtenido el objeto ajustes llamamos a la funcion aplicar tema
      // y le pasamos el valor de 'tema'
      this.aplicarTema(this.ajustes.tema);
    } else {
      // En el caso de no exister el item tema aplicaremos el tema por defecto.
      this.aplicarTema(this.ajustes.tema);
    }
  }

  // aplicarTema modificara el DOM pasando valores al elemento link con id = themeIndex
  aplicarTema(tema: string) {

    // obtenemos la direccion del archivo .css y la modificamos con el nombre del tema seleccionado.
    let url = `assets/css/colors/${tema}.css`;
    // la variable url seria el nuevo valor del atributto href del elemento obtenido con el id 'themeIndex'.
    this._document.getElementById('themeIndex').setAttribute('href', url);

    // para finalizar la funcion aplicar tema debemos guardar los cambios en localStorage
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}

