import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetComponent } from './intranet.component';
import { IntranetRoutingModule } from './intranet-routing.module';
import { ComponentsModule } from '@core/components';
import { IntFooterComponent } from './int-home/components/int-footer/int-footer.component';
import { IntranetService } from './services/intranet.service';
import { LibraryService } from './services/library.service';
import { IntHeaderComponent } from './int-home/components/int-header/int-header.component';
import { MatModulesIntHome } from './int-home/mat-modules-int-home';


@NgModule({
  declarations: [
    IntranetComponent,
    IntHeaderComponent,
    IntFooterComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    ComponentsModule,
    MatModulesIntHome
  ],
  providers: [
    IntranetService,
    LibraryService
  ],
})
export class IntranetModule {}
