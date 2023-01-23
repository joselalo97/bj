import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntDocComponent } from './container/int-doc.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '@core/components';


const IntDocRoutes: Routes = [
  { path: ':entidadInformacion/:id', component: IntDocComponent },
  { path: ':entidadInformacion/:id/:q', component: IntDocComponent },
  { path: ':entidadInformacion/:id/:q/:defaultTab', component: IntDocComponent },
  { path: ':entidadInformacion/:id/:q/:defaultTab/:rubro', component: IntDocComponent }
];

@NgModule({
  declarations: [
    IntDocComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( IntDocRoutes ),
    ComponentsModule
  ]
})
export class IntDocModule { }
