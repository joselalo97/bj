import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-docscoidh',
  template: ` <p>v-docscoidh works!</p> `,
  styles: [],
})
export class VDocscoidhComponent {
  @Input() votos;
  @Input() articulos;
  @Input() nombreCaso;
  constructor() {}
}
