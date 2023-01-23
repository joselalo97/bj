import { Component, Input } from '@angular/core';
import { environment } from '@environment/environment';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'v-tcchile',
  templateUrl: './v-tcchile.component.html',
  styleUrls: ['./v-tcchile.component.scss']
})
export class VTcchileComponent {
  cargando: boolean;
  document: any;
  urlVisible: boolean;
  titulo: string = '';
  urlDocumento: any;

  constructor() {
    this.urlVisible = false;
    this.urlDocumento = '';
    this.cargando = true;
  }

  @Input()
  set documento(documento: any) {
    this.document = documento;
    if (documento !== undefined) {
      this.urlVisible = true;
      this.urlDocumento =
      `${environment.urlFilesPdf}tribunal-constitucional-chile?fileparams=anio:${String(documento["anio"])},subfolders:PDF,filename:${String(documento["nombrePDF"])}`
      this.titulo = documento.nombreCaso;
    }
  }

  get documento() {
    return this.document;
  }

  onError(error: any) {}

  callBackFn(ev: PDFDocumentProxy) {
    if (ev.numPages) {
      this.cargando = false;
    }
  }

  ngOnInit() {}
}
