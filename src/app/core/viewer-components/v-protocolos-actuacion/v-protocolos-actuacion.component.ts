import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-protocolos-actuacion',
  template: ` <p>v-protocolos-actuacion works!</p> `,
  styles: [],
})
export class VProtocolosActuacionComponent {
  @Input() documento;

  constructor() {}
}
