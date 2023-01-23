import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'v-hcaustralia',
  templateUrl: './v-hcaustralia.component.html',
  styleUrls: ['./v-hcaustralia.component.scss']
})
export class VHcaustraliaComponent {
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
      this.urlDocumento = "http://172.29.30.34:8888/codih/caustralia.php?anio="+String(documento["year"])+"&pdfName=" + String(documento["pdfName"]);
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

  ngOnInit() {
  }
}
