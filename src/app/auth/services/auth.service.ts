
import { Injectable } from '@angular/core';
import { LoaderStateModel } from '@core/models';
import { Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   private loaderSubject = new Subject<LoaderStateModel>();
   public loaderState = this.loaderSubject.asObservable();

   public showLoader(): void {

      this.loaderSubject.next( { show: true } as LoaderStateModel );
      
   }
   
   public hideLoader(): void {
      
      this.loaderSubject.next( { show: false } as LoaderStateModel );

   }

}