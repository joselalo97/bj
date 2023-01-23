import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Intranet } from '@intranet/constants/intranet.enum';
import { Observable } from 'rxjs';
import { Filters } from '../models/filters';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private urlFilters = `${environment.urlScjn}${environment.environmentType == 'Pub' ? Intranet.BuscadorApiPub : Intranet.BuscadorApi}filtros`;

  constructor(private http: HttpClient) { }

  getFilters(params: string): Observable<Filters> {
    // params = params.replace(new RegExp("/", 'g'), "\\/")
    return this.http.get<Filters>(`${this.urlFilters}${params}`);
  }
}
