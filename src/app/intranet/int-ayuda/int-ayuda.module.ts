import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IntAyudaComponent } from './container/int-ayuda.component';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const Route: Routes = [{ path: '', component: IntAyudaComponent }];

@NgModule({
  declarations: [IntAyudaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(Route),
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
})
export class IntAyudaModule {}
