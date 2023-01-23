import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-tarticulos',
  template: ` <p>v-tarticulos works!</p> `,
  styles: [],
})
export class VTarticulosComponent {
  @Input() articulos;
  constructor() {}
}
