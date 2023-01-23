import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntSearchLibraryComponent } from './core/int-search-library.component';
import { RouterModule, Routes } from '@angular/router';
import { LibraryService } from '@intranet/services/library.service';
import { MatModulesIntSearch } from './mat-modules-int-search';
import { NgbModulesIntSearch } from './ngb-modules-int-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const route: Routes = [{ path: '', component: IntSearchLibraryComponent }];

@NgModule({
  declarations: [IntSearchLibraryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatModulesIntSearch,
    NgbModulesIntSearch,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LibraryService],
})
export class IntSearchLibraryModule {}
