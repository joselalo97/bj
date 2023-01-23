import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiletextDirective } from './filetext.directive';
import { ActiveMicrophoneDirective } from './active-microphone.directive';
import { ClosePanelThesisDirective } from './close-panel-thesis.directive';

const Directives: any[] = [
  FiletextDirective,
  ActiveMicrophoneDirective,
  ClosePanelThesisDirective
];

@NgModule({
  declarations: [Directives],
  imports: [CommonModule],
  exports: [Directives],
})
export class DirectivesModule {}
