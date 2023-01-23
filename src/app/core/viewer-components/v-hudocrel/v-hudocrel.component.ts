import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-hudocrel',
  template: ` <p>v-hudocrel works!</p> `,
  styles: [],
})
export class VHudocrelComponent {
  @Input() appno;
  constructor() {}
}
