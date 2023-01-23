import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environment/environment';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'v-cij',
  templateUrl: './v-cij.component.html',
  styleUrls: ['./v-cij.component.scss']
})
export class VCijComponent {
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
      `${environment.urlFilesPdf}cij?fileparams=filename:${String(documento["pdfName"]).split('.')[0]}`
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

  onError(error: any) {}

  callBackFn(ev: PDFDocumentProxy) {
    if (ev.numPages) {
      this.cargando = false;
    }
  }

  ngOnInit() {}
}
