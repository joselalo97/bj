import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AnyModulesComponents,
  MatModulesComponents,
  NgbModulesComponents,
} from '@core/components';
import {
  AccessibilityComponent,
  SwitchComponent,
  SearchResultsComponent,
  FiltersComponent,
  PaginatedComponent,
  MenuSelectComponent,
  TextAnalyticsComponent,
  ToolbarDocComponent,
  TabsDocComponent,
  ContentDocComponent,
  SeekerComponent
} from '@core/components';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';
import { SugBusquedasComponent } from './sug-busquedas/sug-busquedas.component';
import { ViewerComponentsModule } from '@core/viewer-components';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { DatePipe } from '@angular/common';



const Components: any[] = [
  AccessibilityComponent,
  SwitchComponent,
  FiltersComponent,
  SearchResultsComponent,
  PaginatedComponent,
  TextAnalyticsComponent,
  SugBusquedasComponent,
  MenuSelectComponent,
  ToolbarDocComponent,
  TabsDocComponent,
  ContentDocComponent,
  SeekerComponent,
  AdvanceSearchComponent
];

@NgModule({
  declarations: [Components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    MatModulesComponents,
    NgbModulesComponents,
    AnyModulesComponents,
    DirectivesModule,
    ViewerComponentsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Components,
    NgbModulesComponents,
    AnyModulesComponents,
  ],
  providers: [DatePipe]
})
export class ComponentsModule { }
