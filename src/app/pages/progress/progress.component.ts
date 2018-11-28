import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  public percent1: number = 10;
  public percent2: number = 40;

  constructor() { }

  ngOnInit() {
  }

  // actualizar( event: number ) {
  //   console.log('Evento: ', event);
  //   this.percent1 = event;
  // }

}
