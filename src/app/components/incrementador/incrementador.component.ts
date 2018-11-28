import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtPercent') txtPercent: ElementRef;
  @Input('leyenda') public legend: string = 'Leyenda';
  @Input() public percent: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter;

  constructor() {
    // console.log('Leyenda', this.legend);
    // console.log('Progreso', this.percent);
   }

  ngOnInit() {
    // console.log('Leyenda', this.legend);
    // console.log('Progreso', this.percent);
  }

  onChange( newValue: number) {
    console.log(newValue);

    // const elemHTML: any = document.getElementsByName('percent')[0];
    // console.log(elemHTML.value);

    if ( newValue >= 100) {
      this.percent = 100;
    } else if ( newValue <= 0) {
      this.percent = 0;
    } else {
      this.percent = newValue;
    }

    // elemHTML.value = this.percent;
    this.txtPercent.nativeElement.value = this.percent;
    this.cambioValor.emit( this.percent );
  }

  cambiarValor( val: number ) {
    if ( this.percent >= 100 && val > 0) {
      this.percent = 100;
      return;
    } else if ( this.percent <= 0 && val < 0 ) {
      this.percent = 0;
      return;
    } else {
      this.percent = this.percent + val;

      this.cambioValor.emit( this.percent );

      this.txtPercent.nativeElement.focus();
    }
  }

}
