import { Component, Input, OnInit } from '@angular/core';
import { DocumentModel } from '@core/models';

@Component({
  selector: 'v-tribunalespanol',
  templateUrl: './v-tribunalespanol.component.html',
  styleUrls: ['./v-tribunalespanol.component.scss'],
})
export class VTribunalespanolComponent {
  public doc: any = {} as DocumentModel
  public isLoad: boolean = true

  @Input() set documento(document: DocumentModel){
    this.isLoad = true
    if(document['tipoNumerado']){
      this.doc = document;  
      this.isLoad = false
    }
  };

  get documento():DocumentModel {
    return this.doc;
  }

  constructor() { }
}
