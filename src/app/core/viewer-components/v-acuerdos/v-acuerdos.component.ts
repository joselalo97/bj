import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'v-acuerdos',
  templateUrl: './v-acuerdos.component.html',
  styleUrls: ['./v-acuerdos.component.scss']
})
export class VAcuerdosComponent {
  document: any
  @Input()
  set documento(doc:any){
    if(doc){
      this.document = doc
    }
  }

  constructor(public sanitizer: DomSanitizer) {}

}
