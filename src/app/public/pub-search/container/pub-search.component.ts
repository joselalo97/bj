import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsID, Filters, Filtro, Id, QueryParams, ResultadosModel } from '@core/models';
import { CommonService, FiltersService, ResultService, StorageService } from '@core/services';
import { ConvertQuery } from '@intranet/models/convertQuery';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'pub-search',
  templateUrl: './pub-search.component.html',
  styleUrls: ['./pub-search.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'searchAnimation',
      duration: 700,
      translate: '5%',
    }),
  ],
})
export class PubSearchComponent implements OnInit {
  dataSearch: ResultadosModel = new ResultadosModel();
  filters: Filtro[]
  convert: ConvertQuery = new ConvertQuery();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly resultService: ResultService,
    private readonly filterService: FiltersService,
    private readonly storage: StorageService,
    private readonly meta: Meta,
    private readonly title: Title,
    private readonly router: Router,
    private readonly common: CommonService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.filters = [];
      this.dataSearch = new ResultadosModel()
      let param: QueryParams = { ...params['params'] };

      if (param.q.includes('@') && param.indice != '' && param.indice != undefined)
        param.q = this.getBusquedaconFuente(param.q, param.indice);
      this.resultService
        .getSearch(this.convert.convertQueryParamsResults(param))
        .subscribe(
          (resp: ResultadosModel) => {
            this.dataSearch = resp;
          },
          (error) => {
            this.dataSearch = {} as ResultadosModel;
            this.dataSearch.total = 0
            if(param.indice == null) this.filters = null;
            console.log('Error in response !!');
          }
        );

      if (param.indice) {
        this.filterService
          .getFilters(this.convert.convertQueryParamsFilters(param))
          .subscribe(
            (resp: Filters) => {
              if (resp.filtros) {
                this.filters = resp.filtros;
              } else {
                this.filters = [];
              }
            },
            (error) => {
              this.filters = null;
              console.log('Error in response !!');
            }
          );
      }
      // else {
      //   this.filters = []
      // }

      this.title.setTitle(
        param.q == '*'
          ? 'Buscador jurídico todos los documentos'
          : 'Búsqueda: ' + param.q
      );

      this.meta.addTags([
        {
          name: 'title',
          content:
            'Busquedas relacionas con entidades y parametros de texto: ' +
            param.q,
        },
        {
          name: 'description',
          content: param.q,
        },
        {
          name: 'keywords',
          content:
            'sentencia, ordemanientos,tesis, versiones taquigraficas, ordenamientos, etc',
        },
      ]);

      this.searchDocsId(
        this.convert.convertQueryParamsResults(param).concat('&ids=true')
      );

      this.common.pathUrl = this.router.url.split('/busqueda')[1]

    });
  }

  public ngOnInit(): void {
   }
  public ngOnDestroy(): void {
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }

  private getBusquedaconFuente(q: string, entidad: string): string {
    let queryFuentes = '';
    const data: any = this.storage.getBusquedasSugerencias();

    q.split('@').forEach((textFuente) => {
      if (textFuente !== '') {
        let valorFuente = '';
        if (textFuente.includes(':')) {
          valorFuente = textFuente
            .split(':')[0]
            .trim()
            .slice(0, textFuente.length - 1);
          if (valorFuente !== '') {
            let valor = '';
            if (
              data[entidad].find((xx) => xx.text === valorFuente.trim())
                .value !== undefined
            )
              valor = data[entidad].find(
                (xx) => xx.text === valorFuente.trim()
              ).value;
            else valor = valorFuente;

            queryFuentes =
              queryFuentes +
              valor +
              ':(' +
              textFuente.split(':')[1].trim() +
              ') ';
          }
        } else queryFuentes = textFuente + ' ';
      }
    });
    return queryFuentes.trim();
  }

  private searchDocsId(params: string) {
    this.resultService.getDocsID(params).subscribe((data: ResultadosModel) => {
      this.saveDocsId(data,params);
    });
  }

  private saveDocsId(data: ResultadosModel,query:string) {
    let idsDoc: DocsID[] = [];
    data.ids.forEach((doc: Id, index: number) => {
      let ids: DocsID = new DocsID();
      ids.id = doc.id;
      ids.index = index;
      idsDoc.push(ids);
    });
    const docs = {
      ids: idsDoc,
      param: query,
      size: data.size,
      total: data.total,
      page: data.pagina
    }

    this.storage.setDocumentosIds(idsDoc);
    this.storage.setParamsDocs(docs);
  }
}
