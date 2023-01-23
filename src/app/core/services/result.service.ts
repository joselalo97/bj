import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Intranet } from '@intranet/constants/intranet.enum';
import { Observable } from 'rxjs';
import { Entities } from '../constants/entities.enum';
import { Environments } from '../constants/environments.enum';
import { ResultadosModel } from '../models/results';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private urlResult = `${environment.urlScjn}${environment.environmentType == 'Pub' ? Intranet.BuscadorApiPub : Intranet.BuscadorApi}busqueda`;

  private urlTesis = `${environment.urlScjn}${environment.environmentType == 'Pub' ? Intranet.BuscadorApiPub : Intranet.BuscadorApi}`;

  constructor(private http: HttpClient) { }

  getSearch(params: string): Observable<ResultadosModel> {
    // params = params.replace(new RegExp("/", 'g'), "\\/")
    return this.http.get<ResultadosModel>(`${this.urlResult}${params}`);
  }

  getDocsID(params: string): Observable<ResultadosModel> {
    // params = params.replace(new RegExp("/", 'g'), "\\/")
    return this.http.get<ResultadosModel>(`${this.urlResult}${params}`);
  }

  getDocSentencia(query: string): Observable<any> {
    return this.http.get<any>(
      `${this.urlResult}?q=${query}&indice=${environment.environmentType == Environments.Qa
        ? Entities.Sentences
        : Entities.Sentences_pub
      }`
    );
  }

  getRelacionesTesis(registroDigital: number) {
    return this.http.get<any>(
      `${this.urlTesis}/relacionesTesis/?registroDigital=${registroDigital}`
    );
  }

  getTesis(rdLink: number) {
    return this.http.get<any>(
      `${this.urlTesis}/busqueda?q=registroDigital:"${rdLink}"`
    );
  }

  getTesauro(query: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlResult}Tesauro?q=${query}`)
  }
}
