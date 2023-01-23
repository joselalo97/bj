import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Intranet } from '@intranet/constants/intranet.enum';
import { Observable } from 'rxjs';
import { ReformasModel } from '../models/reformas.model';

@Injectable({
  providedIn: 'root',
})
export class ReformasService {
  private apiUrl: string = `${environment.urlScjn}${environment.environmentType == 'Pub' ? Intranet.BuscadorApiPub : Intranet.BuscadorApi}`

  constructor(private http: HttpClient) {}
  public getReformas(idOrdenamiento: string): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + 'reformas/ordenamiento/' + idOrdenamiento
    );
  }

  public getReformasByPagina(
    idOrdenamiento: number,
    pagina: number
  ): Observable<ReformasModel> {
    return this.http.get<ReformasModel>(
      this.apiUrl + 'reformas/ordenamiento/' + idOrdenamiento + '/' + pagina
    );
  }

  public getArticulosByReformas(
    idOrdenamiento: number,
    idReforma: number
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + 'reformas/articulos/' + idOrdenamiento + '/' + idReforma
    );
  }

  public getProcesosByReformas(
    idOrdenamiento: number,
    idReforma: number
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + 'reformas/procesos/' + idOrdenamiento + '/' + idReforma
    );
  }

  public getProcesoLegislativo(
    idOrdenamiento: number,
    idReforma: number
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + 'procesoslegislativos/' + idOrdenamiento + '/' + idReforma
    );
  }
}
