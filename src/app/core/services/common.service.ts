import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { Enpoints } from '@core/constants';
import {
  DocumentModel,
  EntityFilterModel,
  EntityModel,
  Marks,
  SourceModel,
  TabDocModel,
} from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private readonly http: HttpClient) { }

  private readonly UrlWs: string = environment.urlScjn;
  private readonly UrlJson: string = './assets/data/';
  private words: string[] = []
  private marksAll: Marks = {} as Marks
  private url: string = ""

  set stopWord(words: string[]) {
    this.words = words
  }

  get stopWord() {
    return this.words
  }

  set marks(data: Marks) {
    this.marksAll = data
  }

  get marks(): Marks {
    return this.marksAll
  }

  set pathUrl(url: string) {
    this.url = url 
  }

  get pathUrl(): string {
    return this.url
  }


  /**
   * @description
   *  Petición para obtener las entidades de fuentes de información
   *
   * @returns Observable<EntityModel[]>
   */
  public getEntities(): Observable<EntityModel[]> {
    return this.http.get<EntityModel[]>(`${this.UrlWs}${Enpoints.Entities}`);
  }

  /**
   * @description
   *  Petición para obtener los filtros aplicables por entidad
   *
   * @param entity llave de la entidad a consultar
   * @returns Observable<EntityFilterModel>
   */
  public getFilterByEntity(entity: string): Observable<EntityFilterModel> {
    const params: string = `?entidad=${entity}`;

    return this.http.get<EntityFilterModel>(
      `${this.UrlWs}${Enpoints.GeneralFilter}${params}`
    );
  }

  /**
   * @description
   *  Petición para obtener las fuentes de información para filtrar
   *
   * @returns Observable<SourceModel>
   */
  public getSearchSources(): Observable<SourceModel> {
    return this.http.get<SourceModel>(`${this.UrlJson}${Enpoints.Sources}`);
  }

  /**
   * @description
   *  Petición para obtener las pestañas para la visualización de documentos
   *
   * @returns Observable<TabDocModel[]>
   */
  public getTabsDoc(): Observable<TabDocModel[]> {
    return this.http.get<TabDocModel[]>(`${this.UrlJson}${Enpoints.TabsDoc}`);
  }

  /**
   * @description
   *  Petición para obtener la información del documento por entidad y id de entidad
   *
   * @param entity clave de la entidad que se consulta
   * @param entityID id de la entidad que se consulta
   *
   * @returns Observable<DocumentModel>
   */
  public getDocuments(
    entity: string,
    entityID: string
  ): Observable<DocumentModel> {
    const params: string = `/${entity}/${entityID}`;

    return this.http.get<DocumentModel>(
      `${this.UrlWs}${environment.environmentType == 'Pub' ? Enpoints.Docto : Enpoints.DoctoInt}${params}`
    );
  }

  public getStopWords(): Observable<string[]> {
    return this.http.get<string[]>(`${this.UrlJson}${Enpoints.StopWord}`)
  }


}
