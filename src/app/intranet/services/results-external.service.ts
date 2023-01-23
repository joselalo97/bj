import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enpoints } from '@core/constants';
import { environment } from '@environment/environment.qa';

@Injectable({
  providedIn: 'root',
})
export class ResultsExternalService {
  private urlSCJN: string = `${environment.urlScjn}${Enpoints.External}`;

  constructor(private http: HttpClient) {}

  getResultadosCongress(q: string, page: number = 1, extra: string = '') {
    let urlApi = this.urlSCJN + 'lcongress?q=' + q + '&page=' + page + extra;
    return this.http.get<any>(urlApi);
  }

  getRestuladosVlex(q: string, page: number = 1, typeContent: any = '') {
    let urlApi = this.urlSCJN + 'vl?q=' + q + '&page=' + page;
    if (typeContent != '') {
      urlApi += '&type_content=' + typeContent;
    }
    return this.http.get<any>(urlApi);
  }

  gerResultsHUDOC(q: string, page_size: number, page: number) {
    let urlApi =
      this.urlSCJN + `hudoc?q=${q}&page_size=${page_size}&page=${page}`;
    return this.http.get<any>(urlApi);
  }

  getResultadosElibro(q: string, page_size: number = 10, page: number) {
    let urlApi =
      this.urlSCJN +
      'elibro?q=' +
      q +
      '&page_size=' +
      page_size +
      '&page=' +
      page;
    return this.http.get<any>(urlApi);
  }
}
