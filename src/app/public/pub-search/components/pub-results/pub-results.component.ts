import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService, ViewerService } from '@core/services';
import { environment } from '@environment/environment';
import { VerificAgent } from 'app/core/helper/verify-agent';
import { EntityResultData, ResultData } from 'app/core/models/entityResultData';
import { QueryParams } from 'app/core/models/queryParams';
import { ResultadosModel } from 'app/core/models/results';

@Component({
  selector: 'pub-results',
  templateUrl: './pub-results.component.html',
  styleUrls: ['./pub-results.component.scss'],
})
export class PubResultsComponent implements OnInit {
  _documents: ResultadosModel = new ResultadosModel();
  isLoad!: boolean;
  extract: number = 50;
  size: number = 10;
  queryParams: QueryParams = new QueryParams();
  isView: boolean = true
  engroses: string[] = [
    'numExpediente',
    'preambulo.parrafo',
    'vistos.parrafo',
    'resultando.parrafo',
    'considerando.parrafo',
    'resuelve.parrafo',
    'firman.parrafo',
    'reviso.parrafo',
    'votos.parrafo',
    'notaspie.parrafo',
  ];
  msjHTML: string = ""

  resultsEntity: ResultData[] = [];

  @Input() set doc(documents: ResultadosModel) {
    this.msjHTML = "";
    this.isLoad = true;
    this._documents = new ResultadosModel();
    this.resultsEntity = [];
    if (typeof documents != 'undefined') {
      if (documents.total > 0) {
        this._documents = documents;
        documents.resultados.forEach((data) => {
          this.resultsEntity.push(
            this.entity.ConverDataHTML(
              data,
              this.queryParams.q,
              this.queryParams.busquedaResultados
            )
          );
        });
        this.isLoad = false;
        const find = setTimeout(function () {
          const cards = document.querySelectorAll('div.card')
          cards.forEach(c => {
            c.classList.add('find')
          })
          clearTimeout(find)
        }, 200)

      } else {
        if (documents.total == 0) {
          this._documents.total = 0
          this.isLoad = false;
          if (!this.agent.verify()) this.isView = false;
          this.msjHTML = "No se han encontrado resultados."
        }
      }

    }
  }

  get doc(): ResultadosModel {
    return this._documents;
  }

  constructor(
    private notifyService: NotifyService,
    private router: Router,
    private param: ActivatedRoute,
    private entity: EntityResultData,
    private viewerService: ViewerService,
    private agent: VerificAgent
  ) {
    this.param.queryParamMap.subscribe((param) => {
      this.queryParams = new QueryParams();
      const keys = param.keys;
      keys.forEach((k) => {
        this.queryParams[k] = param.get(k);
      });
      if (param.has('size')) this.size = Number(param.get('size'));
      if (param.has('extractos')) this.extract = Number(param.get('extractos'));
    });
  }

  ngOnInit(): void {

    if (!this.agent.verify()) this.isView = false;
  }

  saveDocument() {
    this.notifyService.toastr(
      'success',
      'Documento',
      'Se ha agregado con éxito en la biblioteca',
      1000,
      'top-right'
    );
  }

  showMoreSize(size: number) {
    this.queryParams.size = size;
    this.router.navigate(['busqueda'], {
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  showMoreExtract(extracto: number) {
    this.queryParams.extractos = extracto;
    this.router.navigate(['busqueda'], {
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  originalOrder = (a: any, b: any) => {
    if (
      this.queryParams.indice == 'sentencias' ||
      this.queryParams.indice == 'sentencias_pub'
    ) {
      return this.engroses.indexOf(a.key) - this.engroses.indexOf(b.key);
    } else {
      return 0;
    }
  };


  getDoc(file: string, name: string) {

    this.viewerService.getDocumento("coidh", `numSeccion-${file}`).subscribe(data => {
      if (data.urlDoc) {
        if (name == 'doc') {
          const url =
            environment.environmentType == "Pub"
              ? data.urlDoc.replace("http", "https")
              : data.urlDoc;
          window.open(url, "_blank");
        } else {
          const url =
            environment.environmentType == "Pub"
              ? data.urlPdf.replace("http", "https")
              : data.urlPdf;
          window.open(url, "_blank");
        }
      }
    })

  }

}
