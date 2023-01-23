import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IntViewLibraryComponent } from './container/int-view-library.component';
import { MatModulesIntLibraryView } from './mat-modules-int-library-view';
import { NgbModulesIntLibraryView } from './ngb-modules-int-library-view';
import { ConvertQuery } from '@intranet/models/convertQuery';
import { PipesModule } from '@core/pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ViewLibraryRoute: Routes = [
  { path: '', component: IntViewLibraryComponent },
];

@NgModule({
  declarations: [IntViewLibraryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ViewLibraryRoute),
    MatModulesIntLibraryView,
    NgbModulesIntLibraryView,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ConvertQuery],
})
export class IntViewLibraryModule {}
