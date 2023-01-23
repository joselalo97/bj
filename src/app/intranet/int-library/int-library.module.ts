import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntLibraryComponent } from './container/int-library.component';
import { RouterModule, Routes } from '@angular/router';
import { MatModulesIntLibrary } from './mat-modules-int-library';
import { NgbModulesIntLibrary } from './ngb-modules-int-library';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@core/components';

const LibraryRoute: Routes = [{ path: '', component: IntLibraryComponent }];

@NgModule({
  declarations: [IntLibraryComponent],
  imports: [
    CommonModule,
    MatModulesIntLibrary,
    NgbModulesIntLibrary,
    RouterModule.forChild(LibraryRoute),
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class IntLibraryModule {}
