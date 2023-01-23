import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-sugeridos',
  template: ` <p>v-sugeridos works!</p> `,
  styles: [],
})
export class VSugeridosComponent {
  @Input() ficha;
  constructor() {}
}
