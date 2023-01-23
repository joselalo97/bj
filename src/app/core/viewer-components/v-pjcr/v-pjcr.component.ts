import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-pjcr',
  templateUrl: './v-pjcr.component.html',
  styleUrls: ['./v-pjcr.component.scss']
})
export class VPjcrComponent {
  document:any;

  constructor() {}

  @Input()
  set documento(doc:any){
    if(doc){
      this.document = doc
    }
  }
}
