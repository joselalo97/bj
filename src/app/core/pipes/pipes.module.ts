import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityNamePipe } from './entity-name.pipe';
import { HtextPipe } from './htext.pipe';
import { FechaPublicacionTesisPipe } from './fecha-publicacion-tesis.pipe';
import { SafeHTMLPipe } from './safe-html.pipe';
import { ConverNodePipe } from './conver-node.pipe';
import { ConvertUrlCOIDHPipe } from './convert-url-coidh.pipe';
import { ReplaceWordPipe } from './replace-word.pipe';
import { TitulosViewerPipe } from './titulos-viewer.pipe';
import { SafeURLPipe } from './safe-url.pipe';
import { MesLetraPipe } from './mes-letra.pipe';
import { FechaSemanarioSemanalPipe } from './fecha-semanario-semanal.pipe';
import { ConvertUnitPipe } from './convert-unit.pipe';
import { TextNamePipe } from './text-name.pipe';

const Pipes: any[] = [
  EntityNamePipe,
  HtextPipe,
  FechaPublicacionTesisPipe,
  SafeHTMLPipe,
  ConverNodePipe,
  ConvertUrlCOIDHPipe,
  ReplaceWordPipe,
  TitulosViewerPipe,
  SafeURLPipe,
  MesLetraPipe,
  FechaSemanarioSemanalPipe,
  ConvertUnitPipe,
  TextNamePipe
];

@NgModule({
  declarations: [Pipes],
  imports: [CommonModule],
  exports: [CommonModule, Pipes],
})
export class PipesModule { }
