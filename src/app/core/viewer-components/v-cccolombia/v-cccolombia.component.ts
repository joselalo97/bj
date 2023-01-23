import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-cccolombia',
  template: ` <p>v-cccolombia works!</p> `,
  styles: [],
})
export class VCccolombiaComponent {
  @Input() documento;

  constructor() {}
}
