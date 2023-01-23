import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-scotus',
  template: ` <p>v-scotus works!</p> `,
  styles: [],
})
export class VScotusComponent {
  @Input() documento;
  constructor() {}
}
