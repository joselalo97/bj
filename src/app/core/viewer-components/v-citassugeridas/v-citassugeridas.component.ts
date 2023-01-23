import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-citassugeridas',
  template: ` <p>v-citassugeridas works!</p> `,
  styles: [],
})
export class VCitassugeridasComponent {
  @Input() ordenamiento;
  @Input() busqueda;
  constructor() {}
}
