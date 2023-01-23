import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { Entities } from '@core/constants';
import { DocumentModel } from '@core/models';
import { ViewerService } from '@core/services';
import { environment } from '@environment/environment';
import { Intranet } from '@intranet/constants/intranet.enum';
import { Public } from '@public/constants/public.enum';
import { EntityResultData } from 'app/core/models/entityResultData';
import { Options } from 'app/core/services/panel-text.service';

@Component({
  selector: 'v-engroses',
  templateUrl: './v-engroses.component.html',
  styleUrls: ['./v-engroses.component.scss'],
})
export class VEngrosesComponent {
  doc: DocumentModel = {} as DocumentModel;
  isPub: boolean = environment.environmentType == 'Pub'
  urlDocumentoDescarga: string =
  environment.urlFiles + (this.isPub ?  Public.SentencePubFile : Intranet.DescargaArchivoSentencia);
  parrafos: any[] = [];
  hasHTML: boolean;
  html: any;
  isLoad: boolean;
  isLoading: boolean[] = [];
  texto: string;
  

  //Rubros tematicos
  accionControversia: any;
  temasPrecedentes = new Array();
  temasTabs = new Array();
  temas: any[] = [];
  subTemasTabs: Map<String, any> = new Map<String, any>();
  precedentesTabs = new Array();
  precedentesPorId = new Array();
  msgPrecedentes: string[] = [];
  topicSelect: string = '';
  textTopic: string = '';
  verRubrosSimilares: boolean = false;
  rubrosSimilares: any;

  isOpen: boolean = false
  isExpand: boolean = false

  resultsEntity: any[] = []

  @Input() set documento(doc: DocumentModel) {
    this.isLoad = true;
    if (doc) {
      this.isLoad = true;
      if (doc.id) {
        this.doc = doc;
        const docNombre: string =
          doc.registroDigital == undefined ? doc.archivo : doc.registroDigital;
        this.getDocSentenciaHTML(docNombre, doc);
      }
    } else {
      this.isLoad = false
    }
  }

  get documento(): DocumentModel {
    return this.doc;
  }

  @Output() settings = new EventEmitter<Options>();

  constructor(
    private readonly viewerService: ViewerService,
    @Inject(DOCUMENT) private document: Document,
    private entity: EntityResultData
  ) { }

  private getDocSentenciaHTML(registro: string, doc: DocumentModel) {
    if (!doc.registroDigital) {
      this.viewerService.getDocumentoSentencia(registro).subscribe((data) => {
        if (!data) {
          this.hasHTML = false;
          this.parrafos = [];
          this.parrafos = this.parrafos.concat(
            this.verificarPartEngrose(doc.considerando)
          );
          this.parrafos = this.parrafos.concat(
            this.verificarPartEngrose(doc.firman)
          );
          this.parrafos = this.parrafos.concat(
            this.verificarPartEngrose(doc.resuelve)
          );
          this.parrafos = this.parrafos.concat(
            this.verificarPartEngrose(doc.resultando)
          );
          this.parrafos = this.parrafos.concat(
            this.verificarPartEngrose(doc['reviso'])
          );
          this.parrafos = this.parrafos.concat(
            this.verificarPartEngrose(doc['sinDefinir'])
          );
          this.parrafos = this.parrafos.concat(
            this.verificarPartEngrose(doc['vistos'])
          );
          this.parrafos = this.parrafos.concat(
            this.verificarPartEngrose(doc['votos'])
          );
          this.parrafos = this.parrafos.concat(
            this.verificarPartEngrose(doc['preambulo'])
          );
          this.parrafos.sort((a, b) => {
            return a.noParrafo - b.noParrafo;
          });
          this.isLoad = false;
        } else {
          this.hasHTML = true;
          this.html = data;
          this.isLoad = false;
        }
      }, error =>{
        this.isLoad = false
      });
    } else {
      this.viewerService
        .getControversiaAccionSJF(doc.registroDigital, doc.semanarioSemanal)
        .subscribe((data) => {
          this.isLoad = false;
          this.accionControversia = data;
          this.temas = data['themes'];
          this.temasTabs = new Array();
          for (let t of data['themes']) {
            this.temasTabs[t['idTopic']] = false;
          }
          this.temas = this.temas.sort((a, b) => {
            return a.order - b.order;
          });
        },error =>{
          this.isLoad = false;
        });
    }
  }

  private verificarPartEngrose(parte: any[]) {
    let parrafoTemp = [];
    if (parte === undefined) {
      return parrafoTemp;
    } else {
      if (Array.isArray(parte)) {
        return parte;
      } else {
        return parrafoTemp;
      }
    }
  }

  public collapseTema(topic: number) {
    this.temasTabs[topic] = !this.temasTabs[topic];
  }

  public verPrecedentes(idTopic: string) {
    this.viewerService.getPrecedentesTopicCA(idTopic).subscribe((data) => {
      this.temasPrecedentes[idTopic] = data;
      let arraySub = new Array<Object>();
      this.temasPrecedentes[idTopic].forEach((element) => {
        let id = element['idPrecedente'];
        let subTem = { idPrecedente: id, value: false };
        arraySub.push(subTem);
      });
      this.subTemasTabs.set(idTopic, arraySub);
    });
  }

  public irParrafoTema(idTopic: string, rubro: string) {
    this.topicSelect = rubro;
    var list = this.document.getElementsByClassName('tema-selected');
    if (
      this.document.getElementsByClassName('sugerir-mediante-rubro')[0] !=
      undefined
    ) {
      this.document
        .getElementsByClassName('sugerir-mediante-rubro')[0]
        .remove();
      this.document.getElementsByClassName('volver-rubros')[0].remove();
    }

    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove(
        'tema-selected',
        'skin-color-bg',
        'text-in-dark'
      );
    }
    let locDocumento = this.document.getElementById(idTopic);
    this.textTopic = locDocumento.innerText;
    let tabDocSugTop = this.document.createElement('div');
    let tabDocSugBottom = this.document.createElement('div');
    tabDocSugTop.classList.add(
      'sugerir-mediante-rubro',
      'd-flex',
      'justify-content-end',
      'mb-5'
    );
    tabDocSugTop.innerHTML =
      "<span class='text-in-dark' style='cursor: pointer'><i class='fas fa-cogs mr-2'></i> Ver documentos sugeridos</span>";
    tabDocSugBottom.classList.add(
      'volver-rubros',
      'd-flex',
      'justify-content-end',
      'mt-5'
    );
    tabDocSugBottom.innerHTML =
      "<span class='text-in-dark' style='cursor: pointer'><i class='fas fa-th-list mr-2'></i> Volver a Rubros temáticos</span>";
    ("<i class='fas fa-cogs'></i> Ver documentos sugeridos</span>");
    locDocumento.classList.add(
      'tema-selected',
      'skin-color-bg',
      'text-in-dark'
    );
    tabDocSugTop.onclick = () =>
      this.settings.emit({
        open: true,
        query: this.topicSelect + '  ' + this.textTopic,
      });
    tabDocSugBottom.onclick = () => {
      window.scrollTo(0, 0);
      locDocumento.classList.remove(
        'tema-selected',
        'skin-color-bg',
        'text-in-dark'
      );
      this.document
        .getElementsByClassName('sugerir-mediante-rubro')[0]
        .remove();
      this.document.getElementsByClassName('volver-rubros')[0].remove();
    };
    locDocumento.prepend(tabDocSugTop);
    locDocumento.append(tabDocSugBottom);
    locDocumento.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  public precedentesTemas(precedente: string, topic: string) {
    this.viewerService
      .getPrecedentesPorTopic(precedente, topic)
      .subscribe((data) => {
        this.precedentesPorId[topic + '' + precedente] = data;
      });
  }

  public collapsePrecedentes(topic: string, precedente: string) {
    this.precedentesTabs[topic + '' + precedente] =
      !this.precedentesTabs[topic + '' + precedente];
  }

  public colapseSubTema(idPrecedente: string, idTopic: string) {
    this.subTemasTabs.forEach((valPrecedentes, keys) => {
      if (keys == idTopic) {
        valPrecedentes.forEach((precedentes) => {
          if (precedentes.idPrecedente == idPrecedente) {
            precedentes.value = !precedentes.value;
          }
        });
      }
    });
  }

  public colapseSubTemaGral(idPrecedente: string, idTopic: string) {
    let bolColapse = false;
    this.subTemasTabs.forEach((valPrecedentes, keys) => {
      if (keys == idTopic) {
        valPrecedentes.forEach((precedentes) => {
          if (precedentes.idPrecedente == idPrecedente) {
            bolColapse = precedentes.value;
          }
        });
      }
    });
    return bolColapse;
  }

  public irPrecedente(precedente: string, topic: string, index: number) {
    let type: string = '';
    if (precedente.includes('=')) {
      let t = precedente
        .replace('&Clase=DetalleTesisEjecutorias', '')
        .split('=');

      if (t[0].includes('AsuntoID')) {
        type = 'asuntoID-' + t[1];
      } else if (t[0].includes('DetalleGeneralScroll')) {
        type = 'registroDigital-' + t[1];
      } else {
        type = 'registroDigital-' + t[1];
      }

      const entity = environment.environmentType == 'Pub' ? Entities.Sentences_pub : Entities.Sentences

      this.viewerService
        .getDocumento(entity, type)
        .subscribe((data) => {
          if (data.id) {
            this.msgPrecedentes[index] = 'Visualizar precedente';
          } else {
            this.msgPrecedentes[index] = 'Precedente no disponible';
          }
        });
    }
  }

  public redirect(precedente: string, topic: string): string {
    let uri = '';
    const entity = environment.environmentType == 'Pub' ? Entities.Sentences_pub : Entities.Sentences
    if (precedente.includes('=')) {
      let t = precedente
        .replace('&Clase=DetalleTesisEjecutorias', '')
        .split('=');
      if (t[0].includes('AsuntoID')) {
        uri = '/doc/' + entity + '/asuntoID-' + t[1];
      } else if (t[0].includes('DetalleGeneralScroll')) {
        uri = '/doc/' + entity + '/registroDigital-' + t[1];
      } else {
        uri = '/doc/' + entity + '/registroDigital-' + t[1];
      }
      return uri;
    }
  }

  public rubrosTematicosSimilares(e, index?: number) {
    this.texto = e;
    if (index >= 0) this.isLoading[index] = true;
    let dataDoc = {
      from: 0,
      size: 0,
      pagina: 0,
      texto: e.replace('<p>', '').replace('</p>', ''),
    };
    this.viewerService
      .getSugerenciaAnalisisTexto('rubros_tematicos', dataDoc)
      .subscribe(
        (data) => {
          this.rubrosSimilares = data;
          data.docs.forEach((doc: any) => {
            this.resultsEntity.push(
              this.entity.ConverDataHTMLAnalitycText(
                doc
              )
            );
          });

          this.isOpen = true;
          if (index >= 0) this.isLoading[index] = false;
        },
        (error) => {
          this.isOpen = false;
          if (index >= 0) this.isLoading[index] = false;
        }
      );
  }
}
