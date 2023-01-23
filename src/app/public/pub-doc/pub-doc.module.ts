import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubDocComponent } from './container/pub-doc.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '@core/components';

const PubDocRoutes :Routes = [
  { path: ':entidadInformacion/:id', component: PubDocComponent },
  { path: ':entidadInformacion/:id/:q', component: PubDocComponent },
  { path: ':entidadInformacion/:id/:q/:defaultTab', component: PubDocComponent },
  { path: ':entidadInformacion/:id/:q/:defaultTab/:rubro', component: PubDocComponent }
]

@NgModule({
  declarations: [
    PubDocComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( PubDocRoutes ),
    ComponentsModule
  ]
})
export class PubDocModule { }
