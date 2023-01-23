import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PubHomeComponent } from './container/pub-home.component';
import { ComponentsModule, MatModulesComponents } from '@core/components';
import { HeaderPubComponent } from './components/header-pub/header-pub.component';
import { SeekerComponent } from './components/seeker/seeker.component';
import { SearchUdcComponent } from './components/search-udc/search-udc.component';
import { FooterPubComponent } from './components/footer-pub/footer-pub.component';
import { IntranetService } from '@intranet/services/intranet.service';
import { DirectivesModule } from 'app/core/directives/directives.module';
import { PubAnalisisComponent } from './components/pub-analisis/pub-analisis.component';


const HomeRoute: Routes = [
  {
    path: '', component: PubHomeComponent, children:
      [
        { path: 'analisis-de-texto', component: PubAnalisisComponent }
      ]
  },

];

@NgModule({
  declarations: [
    PubHomeComponent,
    HeaderPubComponent,
    SeekerComponent,
    SearchUdcComponent,
    FooterPubComponent,
    PubAnalisisComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoute),
    ComponentsModule,
    MatModulesComponents,
    DirectivesModule
  ],
  providers: [IntranetService]
})
export class PubHomeModule { }
