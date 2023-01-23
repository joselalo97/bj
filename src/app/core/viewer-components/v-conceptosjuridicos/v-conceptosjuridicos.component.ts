import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-conceptosjuridicos',
  template: ` <p>v-conceptosjuridicos works!</p> `,
  styles: [],
})
export class VConceptosjuridicosComponent {
  @Input() conceptos;
  constructor() {}
}
