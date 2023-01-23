import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-courtlistener',
  template: ` <p>v-courtlistener works!</p> `,
  styles: [],
})
export class VCourtlistenerComponent {
  @Input() documento;
  constructor() {}
}
