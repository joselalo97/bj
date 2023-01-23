import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "@core/services";
import { LOADER_SKIP, TOKEN_REQUESTS_EXCLUDED } from "@core/constants";
import { AuthService } from "@auth/services";
import { finalize } from "rxjs/operators";


@Injectable({
   providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

   constructor(
      private readonly storageService: StorageService,
      private readonly authService: AuthService
   ) { }


   private countRequest: number = 0;


   public intercept(
      request: HttpRequest<any>,
      next: HttpHandler
   ): Observable<HttpEvent<any>> {

      const token: string = this.storageService.getToken();

      let headers: { [name: string]: string | string[] } = {
         'accept': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'cache-control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
         'pragma': 'no-cache',
         'expires': '0'
      };

      ( token && !this.isTokenExcluded( request ) )
         && (
            headers = {
               'Authorization': `Bearer ${token}`, ...headers
            }
         )

      request = request.clone({
         headers: new HttpHeaders( headers )
      });

      const showLoader: boolean = this.isLoaderSkip( request.url );

      return showLoader
         ? this.checkRequest( next, request )
         : next.handle( request ).pipe(
            finalize( () => (
               this.countRequest--,
               this.countRequest === 0 && this.onEnd()
            )))
   }

   /**
    * @description
    *  Comprobar si alguna solicitud es excluída del token
    * 
    * @param params: HttpRequest<any> 
    * @returns: boolean
    */
   private isTokenExcluded(
      { method: reqMethod, url }: HttpRequest<any>
   ): boolean {

      return TOKEN_REQUESTS_EXCLUDED.some(
         ( { method, endpoint } ) => {
            return (
               method === reqMethod &&
               url.includes( endpoint )
            )
         }
      );

   }

   /**
    * @description
    *  Comprobar si se mostrará el loader al lanzarse una petición
    * 
    * @param url: string
    * @returns: boolean
    */
   private isLoaderSkip( url: string ): boolean {

      let flag: boolean = true;

      for ( const skip of LOADER_SKIP ) {

         if ( new RegExp( skip ).test( url ) )
            { flag = false; break; }

      }

      return flag;

   }

   /**
    * @description
    *  Gestionar el loader de acuerdo a las peticiones realizadas
    *  para contabilizar/mostrar/ocultar
    * 
    * @param next: HttpHandler
    * @param request: HttpRequest<any>
    * @returns: Observable<HttpEvent<any>>
    */
   private checkRequest(
      next: HttpHandler,
      request: HttpRequest<any>
   ): Observable<HttpEvent<any>> {

      this.countRequest === 0 && this.onStart();

      this.countRequest++;

      return next.handle( request ).pipe(
         finalize( () => (
            this.countRequest--,
            this.countRequest === 0 && this.onEnd()
         ))
      );

   }

   private onStart(): void { this.authService.showLoader(); }

   private onEnd(): void { this.authService.hideLoader(); }

}