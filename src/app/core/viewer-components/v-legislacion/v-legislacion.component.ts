import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ReformasService } from '@core/services';
import { environment } from '@environment/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LegislacionModel } from 'app/core/models/docLegislacion.model';
import { Resultado } from 'app/core/models/reformas.model';

@Component({
  selector: 'v-legislacion',
  templateUrl: './v-legislacion.component.html',
  styleUrls: ['./v-legislacion.component.scss'],
})
export class VLegislacionComponent {
  public doc: LegislacionModel = {} as LegislacionModel;
  pagina: number = 1;
  size: number = 5;
  total: number;
  inicio: number;
  fin: number;
  reformas: Resultado[] = [];
  isLoad: boolean = true;
  reformaSeleccionada: any;
  opcionSeleccionada: any;
  articulosReforma: any;
  procesosReforma: any;
  urlLegislacion: string = environment.urlLegislacion;
  @Input() set documento(doc: LegislacionModel) {
    if (doc) {
      if (doc.id) {
        this.isLoad = true;
        this.doc = doc;
        this.loadReforma();
      }
    }
  }

  get documento(): LegislacionModel {
    return this.doc;
  }

  constructor(
    private reformaService: ReformasService,
    private modalService: NgbModal,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public loadReforma() {
    if (this.doc.idOriginal != null) {
      this.reformaService
        .getReformasByPagina(this.doc.idOriginal, this.pagina)
        .subscribe((data) => {
          this.isLoad = false;
          this.reformas = data.resultados;
          this.total = data.total;
          this.pagina = data.pagina;
          this.inicio = data.from;
          this.fin = data.fromTo;
        },error =>{
          this.isLoad = false;
        });
    } else {
      this.isLoad = false;
    }
  }

  public onSelectPage(pagina) {
    this.pagina = pagina;
    this.loadReforma();
  }

  public seleccionaOpcion(reforma: Resultado, opcion: string, component: any) {
    this.reformaSeleccionada = reforma;
    this.opcionSeleccionada = opcion;
    if (this.opcionSeleccionada == 'articulos') {
      this.reformaService
        .getArticulosByReformas(this.doc.idOriginal, reforma.reformaId)
        .subscribe((data) => {
          this.articulosReforma = data;
        });
    } else if (this.opcionSeleccionada == 'procesos') {
      this.reformaService
        .getProcesosByReformas(this.doc.idOriginal, reforma.reformaId)
        .subscribe((data) => {
          this.procesosReforma = data;
        });
    }
    this.modalService.open(component);
  }

  public openUrlRef(ordenamientoId: number, reformaId: number, urlRef: string) {
    if (urlRef != null) {
      let url =
        this.urlLegislacion +
        'buscador/Paginas/AbrirDocReforma.aspx?IdLey=' +
        ordenamientoId +
        '&IdRef=' +
        reformaId +
        '&IdPDF=' +
        urlRef;
      window.open(url);
    }
  }

  public openUrlProc(
    ordenamientoId: number,
    reformaId: number,
    procesoId: number,
    urlProc: string
  ): string {
    if (urlProc != null) {
      let url =
        this.urlLegislacion +
        'buscador/Paginas/AbrirDocProcLeg.aspx?IdLey=' +
        ordenamientoId +
        '&IdRef=' +
        reformaId +
        '&IdProcLeg=' +
        procesoId +
        '&IdPdf=' +
        urlProc;
      return url;
    }
  }

  public openUrlArt(ordenamientoId: number, reformaId: number, urlRef: string) {
    if (urlRef != null) {
      let url =
        this.urlLegislacion +
        'buscador/Paginas/AbrirDocArticulo.aspx?IdLey=' +
        ordenamientoId +
        '&IdRef=' +
        reformaId +
        '&IdPrev=0';
      window.open(url);
    }
  }

  public irArticulo(articulo: string) {
    let articuloLocation = this.document.getElementById(
      'art-' + articulo
    ) as HTMLElement;
    articuloLocation.scrollIntoView({ block: 'end', behavior: 'smooth' });
    articuloLocation.classList.add('articulo-active');
  }
}
