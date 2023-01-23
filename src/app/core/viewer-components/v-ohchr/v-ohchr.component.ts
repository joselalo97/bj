import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-ohchr',
  template: ` <p>v-ohchr works!</p> `,
  styles: [],
})
export class VOhchrComponent {
  @Input() documento;

  constructor() {}
}
