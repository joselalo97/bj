import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItnHomeComponent } from './container/int-home.component';
import { IntSeekerComponent } from './components/int-seeker/int-seeker.component';
import { IntInformationSourceComponent } from './components/int-information-source/int-information-source.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '@core/components';
import { IntInternationalBodiesComponent } from './components/int-international-bodies/int-international-bodies.component';
import { IntTribunalsCourtsConsComponent } from './components/int-tribunals-courts-cons/int-tribunals-courts-cons.component';
import { MatModulesIntHome } from './mat-modules-int-home';
import { NgbModulesIntHome } from './ngb-modules-int-home';

const HomeRoute: Routes = [{ path: '', component: ItnHomeComponent }];

@NgModule({
  declarations: [
    ItnHomeComponent,
    IntSeekerComponent,
    IntInformationSourceComponent,
    IntInternationalBodiesComponent,
    IntTribunalsCourtsConsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoute),
    ComponentsModule,
    MatModulesIntHome,
    NgbModulesIntHome,
  ],
})
export class IntHomeModule {}
