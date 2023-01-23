import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DocsID } from '@core/models';
import { FiltersService, ResultService, StorageService } from '@core/services';
import { ConvertQuery } from '@intranet/models/convertQuery';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Filters, Filtro } from 'app/core/models/filters';
import { QueryParams } from 'app/core/models/queryParams';
import { ResultadosModel, Id } from 'app/core/models/results';

@Component({
  selector: 'int-search',
  templateUrl: './int-search.component.html',
  styleUrls: ['./int-search.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'searchAnimation',
      duration: 700,
      translate: '5%',
    }),
  ],
})
export class IntSearchComponent implements OnInit, OnDestroy {
  dataSearch: ResultadosModel = new ResultadosModel();
  filters: Filtro[]
  convert: ConvertQuery = new ConvertQuery();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly resultService: ResultService,
    private readonly filterService: FiltersService,
    private readonly storage: StorageService,
    private readonly meta: Meta,
    private readonly title: Title
  ) {
    this.route.queryParamMap.subscribe((params) => {
      let param: QueryParams = { ...params['params'] };
      if (param.q.includes('@') && param.indice != '')
        param.q = this.getBusquedaconFuente(param.q, param.indice);
      this.dataSearch = new ResultadosModel();
      this.filters = [];
      this.resultService
        .getSearch(this.convert.convertQueryParamsResults(param))
        .subscribe(
          (resp: ResultadosModel) => {
            this.dataSearch = resp;
          },
          (error) => {
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
                this.filters = []
              }
            },
            (error) => {
              console.log('Error in response !!');
            }
          );
      }

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
    });
  }

  public ngOnInit(): void {}
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
      this.saveDocsId(data);
    });
  }

  private saveDocsId(data: ResultadosModel) {
    let idsDoc: DocsID[] = [];
    data.ids.forEach((doc: Id, index: number) => {
      let ids: DocsID = new DocsID();
      ids.id = doc.id;
      ids.index = index;
      idsDoc.push(ids);
    });
    this.storage.setDocumentosIds(idsDoc);
  }
}
