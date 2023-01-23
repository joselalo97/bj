import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-fichatecnica',
  templateUrl: './v-fichatecnica.component.html',
  styleUrls: ['./v-fichatecnica.component.scss'],
})
export class VFichatecnicaComponent {
  @Input() sa:any;
  @Input() sd:any;
  @Input() magistrados:any;
  @Input() competencia:any;
  @Input() asunto:any;
  constructor() { }
}
