import { QueryParams } from '@core/models';

export class ConvertQuery {
  constructor() { }

  public convertQueryParamsResults(query: QueryParams): string {
    let params: string = '';
    if (query.q) params += `?q=${query.q.replace(
      '/',
      '\\/'
    )}`;
    if (query.page) params += `&pagina=${query.page}`;
    if (query.indice) params += `&indice=${query.indice}`;
    if (query.filtros) params += `&filtros=${query.filtros}`;
    if (query.subFiltros) params += `&subfiltros=${query.subFiltros}`;
    if (query.size) params += `&size=${query.size}`;
    if (query.sinonimos) params += `&sinonimos=${query.sinonimos}`;
    if (query.extractos) params += `&extractos=${query.extractos}`;
    if (query.h) params += `&h=${query.h}`;
    if (query.busquedaResultados)
      params += `&busquedaResultados=${query.busquedaResultados.replace(
        '/',
        '\\/'
      )}`;
    if (query.sug) params += `&sug=${query.sug}`;
    return encodeURI(params);
  }

  public convertQueryParamsFilters(query: QueryParams): string {
    let params: string = '';
    if (query.q)
      params += `?q=${query.q.replace(
        '/',
        '\\/'
      )}`;
    if (query.indice) params += `&entidad=${query.indice}`;
    if (query.busquedaResultados)
      params += `&busquedaResultados=${query.busquedaResultados.replace(
        '/',
        '\\/'
      )
        }`;
    params += query.subFiltros
      ? `&subfiltros=${query.subFiltros}`
      : '&subfiltros=';
    return encodeURI(params);
  }
}
