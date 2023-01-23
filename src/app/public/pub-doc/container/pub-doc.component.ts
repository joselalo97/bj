import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DocKeyTab, Entities } from '@core/constants';
import { DocumentModel, ParamDocModel } from '@core/models';
import { CommonService } from '@core/services';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Options } from 'app/core/services/panel-text.service';
import { RedConocimientoService } from 'app/core/services/red-conocimiento.service';
import * as Mark from 'mark.js'

@Component({
  selector: 'pub-doc',
  templateUrl: './pub-doc.component.html',
  styleUrls: ['./pub-doc.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'docAnimation',
      duration: 700,
      translate: '2%',
    }),
  ],
})
export class PubDocComponent implements OnInit, OnDestroy {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly commonService: CommonService,
    @Inject(DOCUMENT) private doc: Document,
    private readonly meta: Meta,
    private readonly title: Title,
    private readonly redService: RedConocimientoService
  ) {
    this.subscribeToRoute();
  }

  public paramsDoc: ParamDocModel = {} as ParamDocModel;
  public document: DocumentModel = {} as DocumentModel;
  public DocKeyTab: typeof DocKeyTab = DocKeyTab;
  public fichaTaquigrafica: any;
  public options: Options = {} as Options;
  private textSelect: string = '';
  public x: string = '';
  public y: string = '';
  public visible: boolean;
  public contText: string;
  public stopWord: string[] = [];

  public ngOnInit(): void {
    this.doc.addEventListener('selectionchange', () => {
      this.textSelect = this.doc.getSelection().toString();
    });
  }

  private subscribeToRoute(): void {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.getParamsFromRoute();
    });
  }

  private getParamsFromRoute(): void {
    const paramMap: ParamMap = this.activatedRoute.snapshot.paramMap;

    this.paramsDoc.q = paramMap.get('q');
    this.paramsDoc.id = paramMap.get('id');
    this.paramsDoc.selectedTab = DocKeyTab.Documento;
    this.paramsDoc.entidadInformacion = paramMap.get('entidadInformacion');

    this.paramsDoc.q &&
      (this.paramsDoc.q = this.paramsDoc.q
        .replace(/['"]+/g, '')
        .toLocaleLowerCase());
    this.getDocuments();
  }

  private getDocuments(): void {
    this.commonService
      .getDocuments(this.paramsDoc.entidadInformacion, this.paramsDoc.id)
      .subscribe((response: DocumentModel) => {
        this.document = response;
        this.stopWord = this.commonService.stopWord;
        this.setMetadata();
        if (this.paramsDoc.entidadInformacion === Entities.Sentences || this.paramsDoc.entidadInformacion === Entities.Sentences_pub)
          this.redService.getRedConocimientoByEngrose(response.idEngrose).subscribe(red => {
            if (red) {
              this.document.relacion = red.relation
            } else {
              this.document['hasNoPresente'] = true
            }
          })        
        setTimeout(() => {
          this.marksAll();
        }, 1000)
      }, error => {
        this.document = { } as DocumentModel
        this.document.id = 'null'
        this.setMetadata();
      });
  }

  public selectionText(e) {
    if (this.textSelect) {
      this.contText = this.textSelect;
      this.visible = true;
      this.x = e.layerX + 'px';
      this.y = e.layerY + 'px';
    } else {
      this.visible = false;
    }
  }

  public openText() {
    this.options.open = true;
    this.options.query = this.contText;
    this.visible = false;
  }



  private removeStopWords(text: string, stop: string[]): string {
    if (text) {
      var pattern = "\\*",
        re = new RegExp(pattern, "g");
      text =
        text
          .replace(new RegExp('"', 'g'), "")
          .replace(re, "")
          .replace("~", " ")
          .replace(new RegExp("%2F", 'g'), "/");
      text = text.includes(":") ? text.split(":")[1] : text;
      text = text.replace(new RegExp(',', 'g'), ' ')
      text = text.split("(").join("").split(")").join("");


      const words = text.split(' ');
      var newWord: string[] = [];
      words.forEach(txt => {
        if (stop.filter(x => x === txt).length == 0) {
          newWord.push(txt);
        }
      })
      return newWord.join(' ');
    } else {
      return ''
    }
  }


  private marksAll() {
    var instance = new Mark("div#selection-text");
    instance.unmark(instance);
    instance.mark(this.removeStopWords(this.paramsDoc.q, this.stopWord), {
      separateWordSearch: true,
      element: "mark",
      accuracy: {
        value: "exactly",
        filter: ["#selection-text"],
        exclude: ["#selection-text *"],
        limiters: ":“;”.‘,’-–—‒_(){}[]!'\"+=".split(""),
      },
      caseSensitive: false,
      filter: (textNode, range, term, counter) => {
        if (this.stopWord.includes(range)) {
          return false;
        }
        return true;
      },
      noMatch: (e) => {
        instance.unmark(instance);
        this.commonService.marks = { active: false, marks: null }
      },
      done: (e) => {
        if (e > 0) {
          const marks = document.querySelectorAll('mark[data-markjs]');
          marks[0].classList.add('view');
          marks[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          this.commonService.marks = { active: true, marks: marks }
        }
      }
    })
  }



  searchNodeText(node: NodeList, text: string) {
    node.forEach(child => {
      if (child.parentElement.firstChild.nodeName == '#text' && child.parentElement.firstChild.textContent.includes(text)) {
        child.parentElement.innerHTML = child.parentElement.innerHTML.replace(text, `<span class="in-parag" id="paragraph">${text}</span>`);
        const current = document.getElementById('paragraph');
        current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      this.searchNodeText(child.childNodes, text)
    })
  }

  getTab(tab: string) {
    this.paramsDoc.selectedTab = tab
    if (tab === 'documento') {
      setTimeout(() => {
        this.marksAll();
      }, 1000)

    }
  }

  private setMetadata() {
    this.title.setTitle(this.nameDocumentText());
    this.meta.addTags([
      {
        name: 'title',
        content:
          'Documentos de la Suprema Corte de Justicia de la Nación',
      },
      {
        name: 'description',
        content:
          'El buscador jurídico es la plataforma de consulta y localización de información jurídica de la SCJN',
      },
      {
        name: 'keywords',
        content:
          'buscador jurídico,precedentes,sentencias,tesis,votos,acuerdos generales, suprema corte de justicia de la nación, jurisprudencia, línea jurisprudencial, semanario judicial',
      },
    ]);
  }

  private nameDocumentText(): string {
    if(this.document.id == 'null') return 'Documento';
    switch (this.paramsDoc.entidadInformacion) {
      case Entities.Ejecutoria:
        return (
          this.document.tipoAsunto + ' ' + this.document['numeroExpediente']
        );
      case Entities.Ccj:
        return this.document['modulo']
      case Entities.CIJ:
        return this.document['name']
      case Entities.Agreements:
        return this.document['rubro']
      case Entities.Votes:
        return this.document['tipoAsunto'] + ' ' + this.document['numeroExpediente']
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

  ngOnDestroy(): void {
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }

}
