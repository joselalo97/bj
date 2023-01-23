import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { Enpoints } from '../constants/enpoints.enum';
import { RedConocimiento } from '../models/red-conocimiento.model';

@Injectable({
  providedIn: 'root'
})
export class RedConocimientoService {

  private readonly apiUrl: string = `${environment.urlScjn}${environment.environmentType == 'Qa' ? Enpoints.External : Enpoints.Context}`

  constructor(private readonly http: HttpClient) { }


  getRedConocimientoByEngrose(idEngrose: number): Observable<RedConocimiento>{
    let urlDocumento = encodeURI(`${this.apiUrl}sentencias/redConocimiento/searchRedConocimientoByEngrose?engrose=${idEngrose}`);
    return this.http.get<RedConocimiento>(urlDocumento)
  }

}
