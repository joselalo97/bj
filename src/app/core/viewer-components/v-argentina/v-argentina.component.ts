import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environment/environment';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'v-argentina',
  templateUrl: './v-argentina.component.html',
  styleUrls: ['./v-argentina.component.scss']
})
export class VArgentinaComponent {
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

  @Input()
  set documento(documento: any) {
    this.document = documento;
    if (documento !== undefined) {
      this.urlVisible = true;
      this.urlDocumento =
        `${environment.urlFilesPdf}corte-argentina?fileparams=anio:${String(documento["anio"])},subfolders:PDF,filename:${String(documento["nombrePDF"])}`
      this.titulo = documento.nombreCaso;
      this.title.setTitle(this.titulo);
      this.metaTagService.updateTag({
        name: 'description',
        content: documento.nombreCaso + ' - ' + documento.fechaCaso,
      });
    }
  }

  get documento() {
    return this.document;
  }

  onError(error: any) { }

  callBackFn(ev: PDFDocumentProxy) {
    if (ev.numPages) {
      this.cargando = false;
    }
  }

  ngOnInit() { }

}
