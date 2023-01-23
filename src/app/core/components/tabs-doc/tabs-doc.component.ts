import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entities } from '@core/constants';
import { DocumentModel, ParamDocModel, TabDocModel } from '@core/models';
import { CommonService } from '@core/services';
import { LectorVoiceService } from 'app/core/services/lector-voice.service';

@Component({
  selector: 'tabs-doc',
  template: `
    <nav class="tabs-doc">
      <ul class="tabs-doc__content border-sm">
        <ng-container *ngFor="let tab of tabList">
          <li
            class="tabs-doc__item components-bg hover"
            *ngIf="tab.show"
            [ngClass]="{
              'shadow-bottom-bj tabs-doc__item--active':
                tab.navKey === selectedTab
            }"
            (click)="changeTab(tab)"
          >
            {{ tab.label | titulosViewer }}
          </li>
        </ng-container>
      </ul>
    </nav>
  `,
  styleUrls: ['./tabs-doc.component.scss'],
})
export class TabsDocComponent implements OnInit {
  constructor(private readonly commonService: CommonService,
    private lector: LectorVoiceService) { }
  doc: DocumentModel = {} as DocumentModel;
  @Input()
  public paramsDoc: ParamDocModel;

  @Input()
  set document(doc: DocumentModel) {
    if(!doc) return
    if (doc.id) {
      this.doc = doc;
      this.selectedTab = this.paramsDoc.selectedTab || 'documento';
      this.getTabsDoc();
    }
  }
  get document(): DocumentModel {
    return this.doc;
  }

  @Output()
  private tabSelection: EventEmitter<string> = new EventEmitter();

  public tabList: TabDocModel[] = [];
  public selectedTab: string = '';

  public ngOnInit(): void { }

  private getTabsDoc(): void {
    this.commonService
      .getTabsDoc()
      .subscribe(
        (response: TabDocModel[]) => (
          (this.tabList = response),
          (this.tabList = this.tabList.filter(
            (item: TabDocModel) =>
              item.entityKey === 'all' ||
              item.entityKey === this.paramsDoc.entidadInformacion
          )),
          (this.tabList[0].label = this.nameDocumentText(
            this.paramsDoc.entidadInformacion
          )),
          this.onTabHiddenTabs(this.paramsDoc.entidadInformacion)
        )
      );
  }

  public changeTab(tab: TabDocModel): void {
    this.selectedTab = tab.navKey;
    this.tabSelection.emit(this.selectedTab);
  }

  private onTabHiddenTabs(entity: string) {
    switch (entity) {
      case Entities.Thesis:
        if (!this.document['temasRelacionados'])
          this.findIdTabs('conceptosjuridicos');
        if (!this.document['lineaJurisprudencial'])
          this.findIdTabs('linjurisprudenciales');
        break;
      case Entities.Sentences:
        if (!this.document['lineaJurisprudencial'])
          this.findIdTabs('linjurisprudenciales');
        if (!this.document['protocolosActuacionDH'])
          this.findIdTabs('protactuacion');
        if (this.document['hasNoPresente']) {
          this.findIdTabs('redconocimiento');
        }
        break;
      case Entities.Sentences_pub:      
        if (!this.document['lineaJurisprudencial'])
          this.findIdTabs('linjurisprudencialesSent');
        setTimeout(()=>{
          if (this.document['hasNoPresente']) {          
            this.findIdTabs('redconocimiento');
          }else {
            const index = this.tabList.findIndex((m) => m.navKey == 'redconocimiento');
            this.tabList[index].show = true
          }
        },1000)
        // if (!this.document['protocolosActuacionDH'])
        //   this.findIdTabs('protactuacion');
        break;
      case Entities.Legislation:
        this.findIdTabs('citassugeridas');
        break;
      case Entities.Versions:
        this.findIdTabs('fichatecnica-t');
        break;
      case Entities.Ccj:
        this.findIdTabs('documento');
        break;
    }
  }

  private findIdTabs(key: string) {
    const index = this.tabList.findIndex((m) => m.navKey == key);
    this.tabList[index].show = false;
  }

  private nameDocumentText(entity: string): string {
    if(this.document.id == 'null') return 'Documento';
    switch (entity) {
      case Entities.Ejecutoria:
        return (
          this.document.tipoAsunto + ' ' + this.document['numeroExpediente']
        );
      case Entities.Thesis:
        return this.document['clave'] === null
          ? 'Tesis: ' + this.document.registroDigital
          : 'Tesis: ' + this.document['clave'];
      case Entities.Coidh:
        return this.document['nombreCaso'];
      case Entities.Telectoral:
        return this.document['expediente'];
      case Entities.Sentences:
        return (
          this.document.tipoAsunto +
          ' ' +
          this.document.numExpediente +
          ' - ' +
          this.document.organoRadicacion
        );
      case Entities.Sentences_pub:
        return (
          this.document.tipoAsunto +
          ' ' +
          this.document.numExpediente +
          ' - ' +
          this.document.organoRadicacion
        );
      case Entities.Pjcr:
        return this.document['expediente'];
      case Entities.CourtRS:
        return this.document['caseId'];
      case Entities.TCgermany:
        return this.document['name'];
      case Entities.Hudoc:
        return this.document['docname'];
      case Entities.TSpanish:
        return this.document['tipoNumerado'];
      case Entities.Cadh:
        return this.document['nombreCaso'];
      case Entities.Legcardmx:
        return this.document['ordJuridico'];
      case Entities.Legislation:
        return this.document['ordenamiento'];
      case Entities.Versions:
        return (
          this.document['organoJurisdiccional'] +
          ', ' +
          this.document['fechaSesion']
        );
      case Entities.TChile:
        return this.document['caratulado'];
      case Entities.CSJNArgentina:
        return this.document['nombreCaso'];
      case Entities.CIJ:
        return this.document['name'];
      case Entities.Protocols:
        return this.document['protocolo'];
      default:
        return this.paramsDoc.entidadInformacion;
    }
  }
}
