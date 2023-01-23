import { Component, Input, OnInit } from '@angular/core';
import { Environments } from '@core/constants';
import { DocumentModel } from '@core/models';
import { ViewerService } from '@core/services';
import { environment } from '@environment/environment';
import { Intranet } from '@intranet/constants/intranet.enum';

@Component({
  selector: 'v-ficha-tecnica-s',
  templateUrl: './v-ficha-tecnica-s.component.html',
  styleUrls: ['./v-ficha-tecnica-s.component.scss'],
})
export class VFichaTecnicaSComponent {
  data: DocumentModel = {} as DocumentModel;
  html: any;
  isLoad: boolean = true;
  url: string;
  nameType: string = environment.environmentType;
  entities = Environments;
  @Input() set asuntoID(doc: DocumentModel) {
    if (doc) {
      if (doc.asuntoID) {
        this.getFichaHTML(doc.asuntoID);
        this.url =
          environment.urlFiles + Intranet.SiteExpedientes + doc.asuntoID;
      }
    }
  }

  get asuntoID(): DocumentModel {
    return;
  }
  @Input() public documento: DocumentModel;

  constructor(private viewerService: ViewerService) {}

  private getFichaHTML(id: number) {
    this.isLoad = true;
    this.viewerService.getFichaSentenciaHTML(id).subscribe((data) => {
      this.html = data;
      this.isLoad = false;
    });
  }
}
