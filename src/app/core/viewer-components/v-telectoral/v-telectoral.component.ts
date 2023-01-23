import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-telectoral',
  template: ` <p>v-telectoral works!</p> `,
  styles: [],
})
export class VTelectoralComponent {
  @Input() documento;
  constructor() {}
}
