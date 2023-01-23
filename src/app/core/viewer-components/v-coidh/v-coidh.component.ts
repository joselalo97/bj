import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-coidh',
  template: ` <p>v-coidh works!</p> `,
  styles: [],
})
export class VCoidhComponent {
  @Input() documento;
  constructor() {}
}
