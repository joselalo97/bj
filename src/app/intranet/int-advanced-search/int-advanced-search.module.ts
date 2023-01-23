import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IntAdvancedSearchComponent } from './container/int-advanced-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@core/components';


const AdvancedSearchRoute: Routes = [
  { path: '', component: IntAdvancedSearchComponent }
];

@NgModule({
  declarations: [
    IntAdvancedSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild( AdvancedSearchRoute ),
    ComponentsModule
  ]
})
export class IntAdvancedSearchModule { }
