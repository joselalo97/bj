import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubAdvanceComponent } from './container/pub-advance.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '@core/components';


const AdvanceRoute: Routes = [
  { path: '', component: PubAdvanceComponent }
]

@NgModule({
  declarations: [
    PubAdvanceComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(AdvanceRoute)
  ]
})
export class PubAdvanceModule { }
