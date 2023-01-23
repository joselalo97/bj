import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-cjvoto',
  template: ` <p>v-cjvoto works!</p> `,
  styles: [],
})
export class VCjvotoComponent {
  @Input() docavoto;
  constructor() {}
}
