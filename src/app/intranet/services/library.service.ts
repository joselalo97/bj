import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import {
  CommitsModel,
  Content,
  Folder,
  LibraryResults,
  Subs,
} from '@intranet/models/library';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private urlLibrary: string = `${environment.urlScjn}`;
  carpetasUsuario: any;
  public username: string = 'name user her inter';

  constructor(private http: HttpClient) {
    if(environment.environmentType == 'Qa'){
      this.cargarCarpetasUsuario()
    }
  }

  public getAllLibrary(
    page?: number,
    size?: number,
    username?: string,
    order?: string
  ): Observable<LibraryResults> {
    return this.http.get<LibraryResults>(
      `${this.urlLibrary}portafolio/portafolio/carpetas?page=${page}&size=${size}&filtros=username:${username},habilitado:true&orden=fechaCreacion,desc`
    );
  }

  public getLibraryByFolderByID(id: number): Observable<Folder> {
    return this.http.get<Folder>(
      `${this.urlLibrary}portafolio/portafolio/carpeta/${id}`
    );
  }

  public updateFolder(
    idCarpeta: number,
    nombre: string,
    descripcion: string,
    publico: boolean
  ): Observable<Content> {
    return this.http.put<Content>(
      `${this.urlLibrary}portafolio/portafolio/carpetas/${idCarpeta}/${nombre}/${descripcion}/${publico}`,
      {}
    );
  }

  public deleteFolder(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.urlLibrary}portafolio/portafolio/carpetas/${id}`
    );
  }

  public getDocumentosByFolder(
    folderID: number,
    page: number = 0,
    size: number = 5
  ): Observable<LibraryResults> {
    return this.http.get<LibraryResults>(
      `${this.urlLibrary}portafolio/portafolio/documentos2/${folderID}?&page=${page}&size=${size}`
    );
  }

  public getCommits(id: number): Observable<CommitsModel[]> {
    return this.http.get<CommitsModel[]>(
      `${this.urlLibrary}portafolio/portafolio/comentarios/${id}`
    );
  }

  public sendCommitFolder(
    text: string,
    idFolder: number,
    username: string
  ): Observable<CommitsModel> {
    return this.http.post<CommitsModel>(
      this.urlLibrary +
        'portafolio/portafolio/comentarios/' +
        text +
        '/' +
        idFolder +
        '/' +
        username +
        '/' +
        0,
      {}
    );
  }

  public getAllPublicFolders(
    page: number = 0,
    size: number = 10,
    filters: string,
    order: string
  ): Observable<LibraryResults> {
    return this.http.get<LibraryResults>(
      `${this.urlLibrary}portafolio/portafolio/carpetas?&page=${page}&size=${size}&filtros=${filters},habilitado:true&orden=${order}`
    );
  }

  public getAllSubscriptons(idFolder: number): Observable<Subs[]> {
    return this.http.get<Subs[]>(
      `${this.urlLibrary}portafolio/portafolio/suscripcion/carpeta/${idFolder}`
    );
  }

  public getByFolderSubscriptions(username: string): Observable<Content[]> {
    return this.http.get<Content[]>(
      `${this.urlLibrary}portafolio/portafolio/carpetas/suscripcion/${username}`
    );
  }

  public createFolder(
    name: string,
    description: string,
    username: string,
    publico: boolean
  ): Observable<Content> {
    return this.http.post<Content>(
      `${this.urlLibrary}portafolio/portafolio/carpetas/${name}/${description}/${username}/${publico}`,
      {}
    );
  }

  verificarCarpetaByUsernameAndNombre(username:string, nombre:string){
    return this.http
      .get<any>(
        this.urlLibrary + 
        'portafolio/portafolio/carpetas/verificar/'+username+"/"+nombre
      )
  }

  async cargarCarpetasUsuario(){
    await this.buscarCarpetasFiltros("username:"+this.username+",habilitado:"+true, "nombre,asc", null, 10)
    .toPromise().then(data =>{
      this.carpetasUsuario = data.content;
    });
  }

  buscarCarpetasFiltros(filtros:string,orden:string,pagina:number,size:number){
    let url = this.urlLibrary + 'portafolio/portafolio/carpetas?';
    if(pagina != null){
      pagina = pagina-1;
      url += '&page='+pagina+'&size='+size;
    }
    if(filtros != null && filtros != ""){
      url += '&filtros='+filtros;
    }
    if(orden != null && orden != ""){
      url += '&orden='+orden;
    }

    return this.http
      .get<any>(url);
  }

}
