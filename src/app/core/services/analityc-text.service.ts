import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { BodyAgent, ResponseAgent } from '../models/asistente.model';
import { DocumentModel } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class AnalitycTextService {
  private urlAnalityc: string = `${environment.urlSugerenciasSentencias}`;
  private urlAgent: string = `${environment.urlProcesamiento}api/v1/agent/classifier`
  constructor(private http: HttpClient) { }

  public searchTextAnalityc(tipo: string, data: any): Observable<any> {
    if (tipo != '') {
      tipo = '?indice=' + tipo;
    }
    return this.http.post<any>(
      `${this.urlAnalityc}sugerencias-sentencias${tipo}`,
      data
    );
  }

  public getFiltrosSugerencias(
    q: string,
    entidad: string,
    pagina: number = 0,
    size: number = 100,
    subfiltros: string
  ): Observable<any> {
    if (subfiltros != '') {
      subfiltros = '=' + subfiltros;
    }
    return this.http.get<any>(
      `${this.urlAnalityc}sugerencias-sentencias/filtros?q=${q}&entidad=${entidad}&pagina=${pagina}&size=${size}&subfiltros${subfiltros}`
    );
  }

  public getIndiceSentencia(
    indice: string,
    engrose: string
  ): Observable<DocumentModel> {
    return this.http.get<DocumentModel>(
      `${this.urlAnalityc}sugerencias-sentencias/document/?indice=${indice}&idEngrose=${engrose}`
    );
  }

  public attendeen(send: BodyAgent): Observable<ResponseAgent> {
    return this.http.post<ResponseAgent>(this.urlAgent, send)
  }

}
