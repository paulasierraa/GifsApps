import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //creamos el viewchild e utilizamos el htmlinput para tener las propiedades de input
  constructor(private gifsService:GifsService) { }

  ngOnInit(): void {
  }
  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length===0)
    {
      return;
    }
    this.gifsService.buscarGifs(valor); //insertamos gifs
    console.log(this.gifsService.historial);
    this.txtBuscar.nativeElement.value='';
  }
}
