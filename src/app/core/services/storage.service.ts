import { Inject, Injectable } from '@angular/core';
import { Preferences } from 'app/preferences';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { StorageName } from '@core/constants';
import { DocsID } from '../models/document-id';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    @Inject(LOCAL_STORAGE)
    private localStorage: WebStorageService
  ) {}

  /**
   * @description
   *  Método para obtener el token del localstorage
   *
   * @returns: string
   */
  public getToken(): string {
    const token: string = this.localStorage.get(StorageName.Token);

    return token && JSON.parse(atob(token));
  }

  /**
   * @description
   *  Método para asignar el token al localstorage
   *
   * @param token: string
   */
  public setToken(token: string): void {
    this.localStorage.set(StorageName.Token, btoa(JSON.stringify(token)));
  }

  /**
   * @description
   *  Método para obtener las preferencias del sistema
   *
   * @returns: Preferences
   */
  public getPreferences(): Preferences {
    const preference: string = this.localStorage.get(StorageName.Preference);

    return preference && JSON.parse(atob(preference));
  }

  /**
   * @description
   *  Método para setear las preferencias del sistema
   *
   * @param preference: Preferences
   */
  public setPreferences(preference: Preferences): void {
    this.localStorage.set(
      StorageName.Preference,
      btoa(JSON.stringify(preference))
    );
  }

  /**
   * @description
   *  Método para setear las busquedas sugeridas
   *
   * @param data: any
   */
  public setBusquedasSugerencias(data: any): void {
    this.localStorage.set(StorageName.BusquedaSug, btoa(JSON.stringify(data)));
  }

  /**
   * @description
   *  Método para setear las busquedas sugeridas
   *
   * @param data: any
   */
  public getBusquedasSugerencias(): any {
    const sug: string = this.localStorage.get(StorageName.BusquedaSug);

    return sug && JSON.parse(atob(sug));
  }

  /**
   * @description
   *  Método para setear los id documentos
   *
   * @param data: DocumentosID
   */
  public setDocumentosIds(data: DocsID[]): void {
    this.localStorage.set(StorageName.DocsID, btoa(JSON.stringify(data)));
  }

  /**
   * @description
   *  Método para obtener ids documentos
   *
   * @param data: DocumentosID
   */
  public getDocumentosIds(): DocsID[] {
    const ids: string = this.localStorage.get(StorageName.DocsID);

    return ids && JSON.parse(atob(ids));
  }


  /**
   * @description
   *  Método para setear los params de documentos
   *
   * @param data: any
   */
   public setParamsDocs(data: any): void {
    this.localStorage.set(StorageName.optionsID, btoa(JSON.stringify(data)));
  }

  /**
   * @description
   *  Método para obtener los params de documentos
   *
   * @param data: any
   */
  public getParamsDocs(): any {
    const ids: string = this.localStorage.get(StorageName.optionsID);

    return ids && JSON.parse(atob(ids));
  }

}
