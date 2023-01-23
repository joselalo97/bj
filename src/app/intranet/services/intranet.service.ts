import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Intranet } from '@intranet/constants/intranet.enum';

import { DataSourceModel } from '@intranet/models/data-source.model';
import { Guide } from '@intranet/models/guide';
import {
  EntityModel,
  InformationSourceModel,
} from '@intranet/models/information-source.model';
import { Observable } from 'rxjs';

const api: string = environment.urlScjn;

@Injectable({
  providedIn: 'root',
})
export class IntranetService {
  constructor(private readonly http: HttpClient) {}

  private readonly UrlJson: string = './assets/data/';
  private readonly UrlEntity: string = `${api}${environment.environmentType == 'Pub'? Intranet.BuscadorApiPub :Intranet.BuscadorApi}entidades`;

  /**
   * @description
   *  Método para obtener las fuentes de información de un json
   *
   * @returns: Observable<InformationSourceModel[]>
   */
  public getInformationSource(): Observable<InformationSourceModel[]> {
    return this.http.get<InformationSourceModel[]>(
      `${this.UrlJson}${Intranet.InformationSource}`
    );
  }

  /**
   * @description
   *  Método para obtener las fuentes de datos de un json
   *
   * @returns Observable<DataSourceModel[]>
   */
  public getDataSources(): Observable<DataSourceModel[]> {
    return this.http.get<DataSourceModel[]>(
      `${this.UrlJson}${Intranet.DataSources}`
    );
  }

  /**
   * @description
   *  Método para obtener las fuentes de datos de un json
   *
   * @returns Observable<EntityModel[]>
   */
  public getEntityData(): Observable<EntityModel[]> {
    return this.http.get<EntityModel[]>(this.UrlEntity);
  }

  /**
   * @description
   *  Método para obtener las sugerencias con @ de un json
   *
   * @returns: Observable<any[]>
   */
  public getSugSearch(): Observable<any> {
    return this.http.get<any>(`${this.UrlJson}${Intranet.SugSearch}`);
  }

  /**
   * @description
   *  Método para obtener las sugerencias con @ de un json
   *
   * @returns: Observable<any[]>
   */
  public getGuide(): Observable<Guide[]> {
    return this.http.get<Guide[]>(`${this.UrlJson}${Intranet.Guide}`);
  }
}
