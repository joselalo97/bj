import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubGuideUserComponent } from './container/pub-guide-user.component';
import { RouterModule, Routes } from '@angular/router';
import { MatModulesComponents } from '@core/components';
import { GuideTabComponent } from './components/guide-tab/guide-tab.component';
import { ManualTabComponent } from './components/manual-tab/manual-tab.component';
import { AccesibilityTabComponent } from './components/accesibility-tab/accesibility-tab.component';

const PubGuideRoute: Routes = [
  { path: '',component: PubGuideUserComponent }
]


@NgModule({
  declarations: [
    PubGuideUserComponent,
    GuideTabComponent,
    ManualTabComponent,
    AccesibilityTabComponent
  ],
  imports: [
    CommonModule,
    MatModulesComponents,
    RouterModule.forChild(PubGuideRoute)
  ]
})
export class PubGuideUserModule { }
