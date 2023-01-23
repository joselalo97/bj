import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DocKeyTab } from '@core/constants';
import { DocumentModel, ParamDocModel } from '@core/models';
import { CommonService } from '@core/services';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Options } from 'app/core/services/panel-text.service';
import * as Mark from 'mark.js'

@Component({
  selector: 'int-doc',
  templateUrl: './int-doc.component.html',
  styleUrls: ['./int-doc.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'docAnimation',
      duration: 700,
      translate: '2%',
    }),
  ],
})
export class IntDocComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly commonService: CommonService,
    @Inject(DOCUMENT) private doc: Document
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

    // this.router.events.subscribe((event: EventRoute) => {
    //   event instanceof NavigationEnd &&
    // });
  }

  private getParamsFromRoute(): void {
    const paramMap: ParamMap = this.activatedRoute.snapshot.paramMap;

    this.paramsDoc.q = paramMap.get('q');
    this.paramsDoc.id = paramMap.get('id');
    this.paramsDoc.selectedTab =
      paramMap.get('defaultTab') || DocKeyTab.Documento;
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
        this.stopWord.push('and')
        this.stopWord.push('AND')
        this.stopWord.push('or')
        this.stopWord.push('OR')
        setTimeout(() => {
          this.marksAll();
        }, 1000)

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

  private marksWithParaghrap() {
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

}
