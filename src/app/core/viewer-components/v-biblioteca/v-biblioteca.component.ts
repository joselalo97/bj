import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-biblioteca',
  template: ` <p>v-biblioteca works!</p> `,
  styles: [],
})
export class VBibliotecaComponent {
  @Input() documento;

  constructor() {}
}
