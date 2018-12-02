import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // Con ViewChild obtendremos elemento input del dom incrementador.component.ts para utilizarlo como un objeto
  @ViewChild('txtPercent') txtPercent: ElementRef;

  // Valores obtenidos desde comoponente padre progress.component
  @Input('leyenda') public legend: string = 'Leyenda';
  @Input() public percent: number = 50;

  // Valor enviado al componente padre progress.component
  @Output() cambioValor: EventEmitter<number> = new EventEmitter;

  constructor() { }

  ngOnInit() { }

  // Escucha el evento "Cambio de valor"/ (ngModelChange) para validar el valor ingresado y parametrizarlo entre 0 y 100
  onChange( newValue: number) {

    if ( newValue >= 100) {
      this.percent = 100;
    } else if ( newValue <= 0) {
      this.percent = 0;
    } else {
      this.percent = newValue;
    }

    // Le asignamos el valor "percent" al elemento obtenido por referencia ViewChild
    this.txtPercent.nativeElement.value = this.percent;
    // Enviamos el nuevo valor a la variable cambioValor que es dirigida al componente padre
    this.cambioValor.emit( this.percent );
  }

  // la funcion cambiarValor incrementa o decrementa el valor de percent desde 2 botones
  cambiarValor( val: number ) {
    if ( this.percent >= 100 && val > 0) {
      this.percent = 100;
      return;
    } else if ( this.percent <= 0 && val < 0 ) {
      this.percent = 0;
      return;
    } else {
      this.percent = this.percent + val;

      // Enviamos el nuevo valor a la variable cambioValor que es dirigida al componente padre
      this.cambioValor.emit( this.percent );

      // Aplicamos la funcion "focus" al elemento obtenido por referenia viewChild
      this.txtPercent.nativeElement.focus();
    }
  }

}
