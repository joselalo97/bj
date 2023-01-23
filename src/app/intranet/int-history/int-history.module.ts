import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IntHistoryComponent } from './container/int-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModulesIntHistory } from './mat-modules-int-history';
import { NgbModulesIntHistory } from './ngb-modules-int-history';

const route: Routes = [{ path: '', component: IntHistoryComponent }];

@NgModule({
  declarations: [IntHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule,
    MatModulesIntHistory,
    NgbModulesIntHistory,
  ],
  providers: [DatePipe],
})
export class IntHistoryModule {}
