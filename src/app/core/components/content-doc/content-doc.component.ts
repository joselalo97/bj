import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocKeyTab, Entities } from '@core/constants';
import { DocumentModel, ParamDocModel } from '@core/models';
import { Options } from 'app/core/services/panel-text.service';


@Component({
  selector: 'content-doc',
  templateUrl: './content-doc.component.html',
  styleUrls: ['./content-doc.component.scss'],
})
export class ContentDocComponent {
  constructor() {}

  @Input()
  public paramsDoc: ParamDocModel;

  @Input()
  public document: DocumentModel;

  @Input()
  public fichaTaquigrafica: any;

  @Output() public panel = new EventEmitter<Options>();

  public Entities: typeof Entities = Entities;
  public DocKeyTab: typeof DocKeyTab = DocKeyTab;

  public getOptions(data: Options) {
    this.panel.emit(data);
  }
}
