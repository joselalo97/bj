import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  VAcuerdosComponent,
  VAfricaComponent,
  VArgentinaComponent,
  VBibliotecaComponent,
  VCaselawhpComponent,
  VCccolombiaComponent,
  VCijComponent,
  VCoidhComponent,
  VCorteukComponent,
  VCourtlistenerComponent,
  VCpiComponent,
  VEjecutoriaComponent,
  VEngrosesComponent,
  VHcaustraliaComponent,
  VHudocComponent,
  VLegislacionComponent,
  VOhchrComponent,
  VPjcrComponent,
  VProtocolosActuacionComponent,
  VScotusComponent,
  VTaquigraficasComponent,
  VTcalemanComponent,
  VTcchileComponent,
  VTelectoralComponent,
  VTesisComponent,
  VTribunalespanolComponent,
  VVotosComponent,
  VLineasJurisprudencialesComponent,
  VDocumentoPactuacionComponent,
  VFichaTecnicaSComponent,
  VFichaTecnicaTComponent,
  VEdocssugeridosComponent,
  VSugeridosComponent,
  VNodengrosesComponent,
  VTprecedentesComponent,
  VConceptosjuridicosComponent,
  VRsimilaresComponent,
  VCitassugeridasComponent,
  VFichatecnicaComponent,
  VTarticulosComponent,
  VCitasComponent,
  VDocscoidhComponent,
  VHudocrelComponent,
  VCjtesisComponent,
  VCjvotoComponent,
} from '@core/viewer-components';
import { NgbModulesViewerDoc } from './ngb-modules-viewer-doc';
import { MatModulesViewer } from './mat-modules-viewer';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VFichaTecnicaPubComponent } from './v-ficha-tecnica-pub/v-ficha-tecnica-pub.component';
import { VCcjCursosComponent } from './v-ccj-cursos/v-ccj-cursos.component';
import { VRedConocimientoComponent } from './v-red-conocimiento/v-red-conocimiento.component';
import { DirectivesModule } from '../directives/directives.module';


const Components: any[] = [
  VAcuerdosComponent,
  VAfricaComponent,
  VArgentinaComponent,
  VBibliotecaComponent,
  VCaselawhpComponent,
  VCccolombiaComponent,
  VCijComponent,
  VCoidhComponent,
  VCorteukComponent,
  VCourtlistenerComponent,
  VCpiComponent,
  VEjecutoriaComponent,
  VEngrosesComponent,
  VHcaustraliaComponent,
  VHudocComponent,
  VLegislacionComponent,
  VOhchrComponent,
  VPjcrComponent,
  VProtocolosActuacionComponent,
  VScotusComponent,
  VTaquigraficasComponent,
  VTcalemanComponent,
  VTcchileComponent,
  VTelectoralComponent,
  VTesisComponent,
  VTribunalespanolComponent,
  VVotosComponent,
  VLineasJurisprudencialesComponent,
  VDocumentoPactuacionComponent,
  VFichaTecnicaSComponent,
  VFichaTecnicaTComponent,
  VEdocssugeridosComponent,
  VSugeridosComponent,
  VNodengrosesComponent,
  VTprecedentesComponent,
  VConceptosjuridicosComponent,
  VRsimilaresComponent,
  VCitassugeridasComponent,
  VFichatecnicaComponent,
  VTarticulosComponent,
  VCitasComponent,
  VDocscoidhComponent,
  VHudocrelComponent,
  VCjtesisComponent,
  VCjvotoComponent,
  VFichaTecnicaPubComponent,
  VCcjCursosComponent,
  VRedConocimientoComponent
];

@NgModule({
  declarations: Components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModulesViewerDoc,
    MatModulesViewer,
    RouterModule,
    PipesModule,
    HttpClientModule,
    PdfViewerModule,
    DirectivesModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Components,
    NgbModulesViewerDoc,
    MatModulesViewer,
    RouterModule,
    PipesModule,
    HttpClientModule,
    PdfViewerModule,
    DirectivesModule
  ],
})
export class ViewerComponentsModule {}
