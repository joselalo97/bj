import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyService, ScriptService, StorageService } from '@core/services';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RequestInterceptor } from '@core/interceptors';
import {
  ResultService,
  FiltersService,
  CommonService,
  AnalitycTextService,
  SeoService
} from '@core/services';
import { ViewerService } from './viewer.service';
import { ReformasService } from './reformas.service';
import { LectorVoiceService } from './lector-voice.service';
import { RedConocimientoService } from './red-conocimiento.service';

@NgModule({
  imports: [CommonModule, ToastrModule.forRoot({ maxOpened: 0 })],
  exports: [HttpClientModule, ToastrModule],
  providers: [
    NotifyService,
    ScriptService,
    StorageService,
    ResultService,
    ViewerService,
    LectorVoiceService,
    ReformasService,
    AnalitycTextService,
    FiltersService,
    CommonService,
    RequestInterceptor,
    SeoService,
    RedConocimientoService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ss: ScriptService) => () => ss.load(),
      deps: [ScriptService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
})
export class ServicesModule {}
