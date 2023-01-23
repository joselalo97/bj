import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'v-ficha-tecnica-t',
  templateUrl: './v-ficha-tecnica-t.component.html',
  styleUrls: ['./v-ficha-tecnica-t.component.scss']
})
export class VFichaTecnicaTComponent {
  cargando: boolean;
  document: any;
  urlVisible: boolean;
  titulo: string = '';
  urlDocumento: any;

  constructor(private title: Title, private metaTagService: Meta) {
    this.urlVisible = false;
    this.urlDocumento = '';
    this.cargando = true;
  }

  @Input() set ficha(ficha: any) {
    if (ficha) {
      this.document = ficha.fichaTecnica
    }
  }

}
