import { Component, Input, OnInit } from '@angular/core';
import { DocumentModel } from '@core/models';
import { environment } from '@environment/environment';
import { Public } from '@public/constants/public.enum';


@Component({
  selector: 'v-ficha-tecnica-pub',
  templateUrl: './v-ficha-tecnica-pub.component.html',
  styleUrls: ['./v-ficha-tecnica-pub.component.scss']
})
export class VFichaTecnicaPubComponent implements OnInit {

  doc: DocumentModel
  url: string = `${environment.urlFiles}${Public.SiteExpedientes}`
  isLoad: boolean = true

  @Input() set documento(doc: DocumentModel) {
    this.isLoad = true
    if (doc) {
      if (doc.asuntoID) {
        this.url += doc.asuntoID
        this.isLoad = false
        this.doc = doc
    }
  }
}

  get asuntoID(): DocumentModel {
    return this.doc;
  }

  
  constructor() { }

  ngOnInit(): void {
  }

}
