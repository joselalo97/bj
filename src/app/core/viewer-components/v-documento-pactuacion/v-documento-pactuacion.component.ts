import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-documento-pactuacion',
  template: ` <p>v-documento-pactuacion works!</p> `,
  styles: [],
})
export class VDocumentoPactuacionComponent {
  @Input() protocolos;
  constructor() {}
}
