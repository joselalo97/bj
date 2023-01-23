import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Entities } from '@core/constants';
import { NotifyService } from '@core/services';
import { EntityResultData, ResultData } from 'app/core/models/entityResultData';
import { QueryParams } from 'app/core/models/queryParams';
import { ResultadosModel } from 'app/core/models/results';

@Component({
  selector: 'int-results',
  templateUrl: './int-results.component.html',
  styleUrls: ['./int-results.component.scss'],
})
export class IntResultsComponent implements OnInit {
  _documents: ResultadosModel = new ResultadosModel();
  isLoad!: boolean;
  extract: number = 50;
  size: number = 10;
  queryParams: QueryParams = new QueryParams();
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
      } else {
        if (documents.total == 0) {
          this._documents.total = 0
          this.isLoad = false;
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
    private entity: EntityResultData
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

  ngOnInit(): void { }

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
      this.queryParams.indice == Entities.Sentences ||
      this.queryParams.indice == Entities.Sentences_pub
    ) {
      return this.engroses.indexOf(a.key) - this.engroses.indexOf(b.key);
    } else {
      return 0;
    }
  };
}
