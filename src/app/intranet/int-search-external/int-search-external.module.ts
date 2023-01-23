import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntSearchExternalComponent } from './container/int-search-external.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSearchModulesComponents } from './mat-search';
import { VlexComponent } from './components/vlex/vlex.component';
import { ELibroComponent } from './components/e-libro/e-libro.component';
import { CongressComponent } from './components/congress/congress.component';
import { HudocComponent } from './components/hudoc/hudoc.component';
import {
  NgbPaginationModule,
  NgbToastModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const Route: Routes = [
  {
    path: ':q',
    component: IntSearchExternalComponent,
    children: [
      { path: ':qTranslate/vlex/:t', component: VlexComponent },
      { path: ':qTranslate/hudoc/:t', component: HudocComponent },
      { path: ':qTranslate/elibro/:t', component: ELibroComponent },
      { path: ':qTranslate/lcongress/:t', component: CongressComponent },
    ],
  },
];
@NgModule({
  declarations: [
    IntSearchExternalComponent,
    VlexComponent,
    ELibroComponent,
    CongressComponent,
    HudocComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(Route),
    MatSearchModulesComponents,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ],
})
export class IntSearchExternalModule {}
