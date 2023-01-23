import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntranetComponent } from './intranet.component';

const IntranetRoutes: Routes = [
  {
    path: '',
    component: IntranetComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./int-home/int-home.module').then((m) => m.IntHomeModule),
      },
      {
        path: 'busqueda',
        loadChildren: () =>
          import('./int-search/int-search.module').then(
            (m) => m.IntSearchModule
          ),
      },
      {
        path: 'viewportafolio/:user',
        loadChildren: () =>
          import('./int-library/int-library.module').then(
            (m) => m.IntLibraryModule
          ),
      },
      {
        path: 'viewcarpeta/:idCarpeta',
        loadChildren: () =>
          import('./int-view-library/int-view-library.module').then(
            (m) => m.IntViewLibraryModule
          ),
      },
      {
        path: 'busqueda-portafolio',
        loadChildren: () =>
          import('./int-search-library/int-search-library.module').then(
            (m) => m.IntSearchLibraryModule
          ),
      },
      {
        path: 'busqueda-historial',
        loadChildren: () =>
          import('./int-history/int-history.module').then(
            (m) => m.IntHistoryModule
          ),
      },
      {
        path: 'guia-usuario',
        loadChildren: () =>
          import('./int-guide/int-guide.module').then((m) => m.IntGuideModule),
      },
      {
        path: 'busqueda-avanzada',
        loadChildren: () =>
          import('./int-advanced-search/int-advanced-search.module').then(
            (m) => m.IntAdvancedSearchModule
          ),
      },
      {
        path: 'ayuda',
        loadChildren: () =>
          import('./int-ayuda/int-ayuda.module').then((m) => m.IntAyudaModule),
      },
      {
        path: 'doc',
        loadChildren: () =>
          import('./int-doc/int-doc.module').then((m) => m.IntDocModule),
      },
      {
        path: 'busquedaexterna',
        loadChildren: () =>
          import('./int-search-external/int-search-external.module').then(
            (m) => m.IntSearchExternalModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(IntranetRoutes)],
  exports: [RouterModule],
})
export class IntranetRoutingModule {}
