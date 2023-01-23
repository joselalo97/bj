import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PubSearchComponent } from './container/pub-search.component';
import { ComponentsModule, MatModulesComponents } from '@core/components';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '@core/pipes';
import { PubResultsComponent } from './components/pub-results/pub-results.component';
import { PubFilterComponent } from './components/pub-filter/pub-filter.component';



const SearchRoute: Routes = [
  { path: '', component: PubSearchComponent }
];

@NgModule({
  declarations: [
    PubSearchComponent,
    PubResultsComponent,
    PubFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( SearchRoute ),
    ComponentsModule,
    NgbTooltipModule,
    MatModulesComponents,
    PipesModule
  ]
})
export class PubSearchModule { }
