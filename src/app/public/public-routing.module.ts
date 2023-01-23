import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';


const PublicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pub-home/pub-home.module')
          .then(m => m.PubHomeModule)
      },
      {
        path: 'busqueda',
        loadChildren: () => import('./pub-search/pub-search.module')
          .then(m => m.PubSearchModule)
      },
      {
        path: 'busqueda-avanzada',
        loadChildren: () => import('./pub-advance/pub-advance.module')
          .then(m => m.PubAdvanceModule)
      },
      {
        path: 'guia-de-usuario',
        loadChildren: () => import('./pub-guide-user/pub-guide-user.module')
          .then(m => m.PubGuideUserModule)
      },
      {
        path: 'doc',
        loadChildren: () => import('./pub-doc/pub-doc.module').then(m => m.PubDocModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(PublicRoutes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
