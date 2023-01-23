import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { HeaderComponent } from './pub-home/components/header/header.component';
import { ComponentsModule, MatModulesComponents } from '@core/components';
import { VerificAgent } from 'app/core/helper/verify-agent';
import { FooterComponent } from './pub-home/components/footer/footer.component';



@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ComponentsModule,
    MatModulesComponents
  ],
  providers: [VerificAgent]
})
export class PublicModule { }
