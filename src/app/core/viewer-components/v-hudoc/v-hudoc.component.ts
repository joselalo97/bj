import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v-hudoc',
  templateUrl: './v-hudoc.component.html',
  styleUrls: ['./v-hudoc.component.scss']
})
export class VHudocComponent {
  document:any;

  constructor() {}

  @Input()
  set documento(doc:any){
    if(doc){
      this.document = doc
    }
  }
}
