import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServicesModule } from '@core/services';
import { AppRoutingModule } from './app-routing.module';
import { ConfigModule } from './config.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToggleScrollComponent } from './core/components/toggle-scroll/toggle-scroll.component';
import { LoaderComponent } from '@core/components';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FechaSemanarioSemanalPipe } from './core/pipes/fecha-semanario-semanal.pipe';
import { DirectivesModule } from './core/directives/directives.module';
import { TextNamePipe } from './core/pipes/text-name.pipe';
import { MesLetraPipe } from './core/pipes/mes-letra.pipe';

const providersPipe: Provider = [
  FechaSemanarioSemanalPipe,
  DatePipe,
  TextNamePipe,
  MesLetraPipe
]

@NgModule({
  declarations: [
    AppComponent,
    ToggleScrollComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ConfigModule,
    ServicesModule,
    MatButtonModule,
    MatIconModule,
    DirectivesModule
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    AppRoutingModule
  ],
  providers: providersPipe
})
export class AppModule { }
