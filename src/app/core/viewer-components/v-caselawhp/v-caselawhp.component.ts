import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-caselawhp',
  templateUrl: './v-caselawhp.component.html',
  styleUrls: ['./v-caselawhp.component.scss']
})
export class VCaselawhpComponent {
  @Input() documento;
  constructor() {}
}
