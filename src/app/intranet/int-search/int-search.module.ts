import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IntSearchComponent } from './container/int-search.component';
import { ComponentsModule, MatModulesComponents } from '@core/components';
import { IntFilterComponent } from './components/int-filter/int-filter.component';
import { IntResultsComponent } from './components/int-results/int-results.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '@core/pipes';

const SearchRoute: Routes = [{ path: '', component: IntSearchComponent }];

@NgModule({
  declarations: [IntSearchComponent, IntFilterComponent, IntResultsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SearchRoute),
    ComponentsModule,
    NgbTooltipModule,
    MatModulesComponents,
    PipesModule,
  ],
})
export class IntSearchModule {}
