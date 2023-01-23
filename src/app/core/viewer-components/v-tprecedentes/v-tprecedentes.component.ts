import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-tprecedentes',
  template: ` <p>v-tprecedentes works!</p> `,
  styles: [],
})
export class VTprecedentesComponent {
  @Input() sentencia;
  constructor() {}
}
