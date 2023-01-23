import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-ejecutoria',
  templateUrl: './v-ejecutoria.component.html',
  styleUrls: ['./v-ejecutoria.component.scss'],
})
export class VEjecutoriaComponent {
  @Input() documento;

  constructor() {}
}
