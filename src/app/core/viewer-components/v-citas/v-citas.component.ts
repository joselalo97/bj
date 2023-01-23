import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-citas',
  template: ` <p>v-citas works!</p> `,
  styles: [],
})
export class VCitasComponent {
  @Input() citas;
  constructor() {}
}
