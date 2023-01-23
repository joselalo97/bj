import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View404Component } from './components/view404.component';
import { ErrorComponent } from './container/error.component';


const ErrorRoutes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    children: [
      {
        path: '',
        redirectTo: '404',
        pathMatch: 'all'
      },
      {
        path: '404',
        component: View404Component
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild( ErrorRoutes ) ],
  exports: [ RouterModule ]
})
export class ErrorRoutingModule { }
