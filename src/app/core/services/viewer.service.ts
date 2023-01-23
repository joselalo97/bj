import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { Enpoints } from '../constants/enpoints.enum';
import { EngroseModel } from '../models/docEngroses.model';
import { EjecutoriaVinculada } from '../models/ejecutoria-vinculada.model';
import { RelacionesTematicas } from '../models/relacion-tematicas.model';
import { TesisRelacion } from '../models/tesis-relacionadas.model';
import { VotosSugerencia } from '../models/votos-sug.model';

@Injectable({
  providedIn: 'root',
})
export class ViewerService {
  private urlAPI = `${environment.urlScjn}${environment.environmentType == 'Pub' ? 'api/buscador/': 'buscadorp/'}`;
  private urlArchivos = `${environment.urlScjn}${environment.environmentType == 'Pub' ? Enpoints.Files_pub : Enpoints.Files}`;
  private urlAnalisis = `${environment.urlScjn}${environment.environmentType == 'Pub' ?'api/':''}sug-docs/sugerencias-sentencias/`;
  constructor(private http: HttpClient) {}

  public getTesisRelacionadas(
    id: string,
    instancia: string
  ): Observable<TesisRelacion> {
    let urlRelacionados = encodeURI(
      `${this.urlAPI}docrelacionados?id=${id}&instancia=${instancia}  &size=10`
    );
    return this.http.get<TesisRelacion>(urlRelacionados);
  }

  public getEjecutoriasVinculadas(
    ids: number[]
  ): Observable<EjecutoriaVinculada[]> {
    let urlEjecutorias = encodeURI(
      `${this.urlAPI}ejecutorias-vinculadas?id=${ids}`
    );
    return this.http.get<EjecutoriaVinculada[]>(urlEjecutorias);
  }

  public getVotosVinculados(ids: number[]): Observable<VotosSugerencia[]> {
    let urlEjecutorias = encodeURI(`${this.urlAPI}votos-vinculados?id=${ids}`);
    return this.http.get<VotosSugerencia[]>(urlEjecutorias);
  }

  public getTematicasByRegistroDigital(
    registro: number
  ): Observable<RelacionesTematicas[]> {
    return this.http.get<RelacionesTematicas[]>(
      `${this.urlAPI}tematicas/${registro}`
    );
  }

  public getDocsByLineaJurisprudencial(linea: string): Observable<any> {
    return this.http.get<any>(`${this.urlAPI}docs-by-linea?linea=${linea}`);
  }

  public getDocsByLineaJurisprudencialTesis(linea: string): Observable<any> {
    return this.http.get<any>(
      `${this.urlAPI}docs-by-linea-tesis?linea=${linea}`
    );
  }

  public getDocumentoSentencia(archivo: string): Observable<string> {
    const options = {
      responseType: 'text' as const,
    };
    return this.http.get(
      this.urlArchivos + '/sentencia?fileparams=filename:' + archivo,
      options
    );
  }

  public getControversiaAccionSJF(
    registroDigital: number,
    semanal: number
  ): Observable<any> {
    if (semanal) {
      return this.http.get<any>(
        'https://sjf2.scjn.gob.mx/services/sjfejecutoriamicroservice/api/public/ejecutorias/' +
          registroDigital +
          '?isSemanal=true&hostName=http://sjf2.scjn.gob.mx'
      );
    } else {
      return this.http.get<any>(
        'https://sjf2.scjn.gob.mx/services/sjfejecutoriamicroservice/api/public/ejecutorias/' +
          registroDigital
      );
    }
  }

  public getPrecedentesTopicCA(idTopic: string): Observable<any> {
    return this.http.get<any>(
      'https://sjf2.scjn.gob.mx/services/sjfejecutoriamicroservice/api/public/topic/%7BidTopic%7D?idTopic=' +
        idTopic
    );
  }

  public getPrecedentesPorTopic(
    precedente: string,
    topic: string
  ): Observable<any> {
    return this.http.get<any>(
      'https://sjf2.scjn.gob.mx/services/sjfejecutoriamicroservice/api/public/topic/{idTopic}/{IdPreceding}?IdPreceding=' +
        precedente +
        '&idTopic=' +
        topic
    );
  }

  public getDocumento(entidadInformacion: string, id: string): Observable<any> {
    let urlDocumento = encodeURI(
      this.urlAPI + 'documento/' + entidadInformacion + '/' + id
    );
    return this.http.get<any>(urlDocumento);
  }

  public getSugerenciaAnalisisTexto(tipo: string, data: any): Observable<any> {
    return this.http.post<any>(this.urlAnalisis + tipo, data);
  }

  public getFichaSentenciaHTML(asuntoID: number): Observable<string> {
    const options = {
      responseType: 'text' as const,
    };
    return this.http.get(this.urlAPI + 'ficha-sentencia/' + asuntoID, options);
  }

  public getDocumentosSugeridosEngroses(id: string): Observable<EngroseModel> {
    return this.http.get<EngroseModel>(
      this.urlAPI + 'similaresengroses?id=' + id
    );
  }

  getDocumentoVTaquigrafica(archivo:string) {
    return this.http.get(
      this.urlArchivos +"/version-taquigrafica?fileparams=filename:" +archivo,
      { responseType: 'text' }); 
  }
}
