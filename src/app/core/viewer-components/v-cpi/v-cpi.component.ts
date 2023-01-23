import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-cpi',
  template: ` <p>v-cpi works!</p> `,
  styles: [],
})
export class VCpiComponent {
  @Input() documento;
  constructor() {}
}
