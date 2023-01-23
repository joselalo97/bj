import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.qa';
import { HistorialModel } from '@intranet/models/history';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private urlHistory: string = `${environment.urlScjn}`;

  constructor(private http: HttpClient) {}

  public getAllHistory(username: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.urlHistory}historial/historialfechas?user=${username}`
    );
  }

  public getHistoryUserDate(
    fecha: string,
    user: string
  ): Observable<HistorialModel[]> {
    return this.http.get<HistorialModel[]>(
      `${this.urlHistory}historial/historialbusquedas?fecha=${fecha}&user=${user}`
    );
  }
}
