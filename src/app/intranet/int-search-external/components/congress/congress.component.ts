import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsExternalService } from '@intranet/services/results-external.service';

@Component({
  selector: 'congress',
  templateUrl: './congress.component.html',
  styleUrls: ['./congress.component.scss'],
})
export class CongressComponent implements OnInit {
  public query: string = '';
  resultados: any;
  facetas: any[] = [];
  pagination;
  totalItems: any;
  resultadosPorPagina = 25;
  paginaActual: any;
  cargando: boolean;
  filters: any[] = [];
  isLoad: boolean;
  constructor(
    private param: ActivatedRoute,
    private router: Router,
    private externalService: ResultsExternalService
  ) {
    this.param.paramMap.subscribe((data) => {
      this.query = this.router.url.split('/')[3];
      this.getData(this.query);
    });
  }

  ngOnInit(): void {}

  public filtrar(filtro: any) {
    this.getResults(filtro.value.on);
  }

  private objectToQuerystring(obj) {
    return Object.keys(obj).reduce(function (str, key, i) {
      var delimiter, val;
      delimiter = i === 0 ? '&' : '&';
      key = encodeURIComponent(key);
      val = encodeURIComponent(obj[key]);
      return [str, delimiter, key, '=', val].join('');
    }, '');
  }

  public getResults(url) {
    this.isLoad = true;
    let paramsUrl = this.getParams(url);
    let page = paramsUrl['sp'];
    delete paramsUrl['q'];
    delete paramsUrl['fo'];
    let extraParams = this.objectToQuerystring(paramsUrl);
    this.externalService
      .getResultadosCongress(this.query, page, extraParams)
      .subscribe((data) => {
        this.isLoad = false;
        this.resultados = data.results;
        this.facetas = data.facets;
        this.pagination = data.pagination;
        this.totalItems = data.pagination.of;
        this.paginaActual = data.pagination.current;
        this.facetas.shift();
      });
  }

  private getParams(url) {
    let params = {};
    let parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  private getData(query: string) {
    this.isLoad = true;
    this.externalService.getResultadosCongress(query).subscribe((data) => {
      this.isLoad = false;
      this.facetas = data.facets;
      this.resultados = data.results;
      this.pagination = data.pagination;
      this.totalItems = data.pagination.of;
      this.paginaActual = data.pagination.current;
      this.facetas.shift();
    });
  }
}
