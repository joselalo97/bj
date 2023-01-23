import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-cjtesis',
  template: ` <p>v-cjtesis works!</p> `,
  styles: [],
})
export class VCjtesisComponent {
  @Input() docatesis;
  constructor() {}
}
