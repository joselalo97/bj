import { Component, Input, OnInit } from '@angular/core';
import { Entities } from '@core/constants';
import { DocumentModel, Sentencia, TesiBody } from '@core/models';
import { ViewerService } from '@core/services';

@Component({
  selector: 'v-edocssugeridos',
  templateUrl: './v-edocssugeridos.component.html',
  styleUrls: ['./v-edocssugeridos.component.scss'],
})
export class VEdocssugeridosComponent {
  tesis: TesiBody[] = [];
  sentencias: Sentencia[] = [];
  doc: DocumentModel = {} as DocumentModel;
  isLoad: boolean = true;

  @Input() set id(doc: DocumentModel) {
    if (doc) {
      if (doc.id) {
        this.getDocumentosSugeridos(doc.id);
      }
    }
  }

  get id(): DocumentModel {
    return this.doc;
  }
  @Input() tesisGeneradas: DocumentModel;

  constructor(private readonly viewerService: ViewerService) {}

  private getDocumentosSugeridos(id: string) {
    this.isLoad = true;
    this.viewerService.getDocumentosSugeridosEngroses(id).subscribe((data) => {
      this.isLoad = false;
      this.tesis = data.tesis;
      if (data[Entities.Sentences]) {
        this.sentencias = data[Entities.Sentences];
      } else {
        this.sentencias = data[Entities.Sentences_pub];
      }
    });
  }
}
