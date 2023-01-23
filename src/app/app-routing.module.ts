import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "@environment/environment";
import { Environments } from "@core/constants";


const IntranetRoute: Routes = [   
   {
      path: '',
      loadChildren: () => import( './intranet/intranet.module' )
         .then( m => m.IntranetModule )
   }
];


const PublicRoute: Routes = [
   {
      path: '',
      loadChildren: () => import( './public/public.module' )
         .then( m => m.PublicModule )
   },
   {
      path: '**',
      redirectTo: 'error',
      pathMatch: 'full'
   },
   {
      path: 'error',
      loadChildren: () => import( './error/error.module' )
         .then( m => m.ErrorModule )
   }
];

const ErrorRoute: Routes = [
   {
      path: '',
      redirectTo: 'error',
      pathMatch: 'full'
   },
   {
      path: 'error',
      loadChildren: () => import( './error/error.module' )
         .then( m => m.ErrorModule )
   }
];


@NgModule({
   imports: [
      RouterModule.forRoot(
         environment.environmentType === Environments.Qa ? IntranetRoute
         : environment.environmentType === Environments.Pub ? PublicRoute
         : ErrorRoute,
         {
            useHash: false,
            scrollPositionRestoration: 'enabled',
            initialNavigation: 'enabled',
            anchorScrolling: 'enabled',
         }
      )
   ],
   exports: [ RouterModule ]
})
export class AppRoutingModule { }