import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy, Input} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DocsID, Id } from '@core/models';
import { CommonService, NotifyService, ResultService, StorageService } from '@core/services';
import { environment } from '@environment/environment';
import { LibraryResults } from '@intranet/models/library';
import { LibraryService } from '@intranet/services/library.service';
import { ConvertHTMLVoice } from 'app/core/helper/convertVoiceSpan';
import { VerificAgent } from 'app/core/helper/verify-agent';
import { LectorVoiceService } from 'app/core/services/lector-voice.service';
import * as Mark from 'mark.js'

@Component({
  selector: 'toolbar-doc',
  templateUrl: './toolbar-doc.component.html',
  styleUrls: ['./toolbar-doc.component.scss'],
})
export class ToolbarDocComponent implements OnInit, OnDestroy {
  public findMatches: string = '';
  public isMatches: boolean = false;
  public folders: LibraryResults = new LibraryResults();
  public nextDoc: string;
  public beforeDoc: string;
  public documentIDs: DocsID[] = [];
  public indexCurrent: number;
  private idCurrent: string;
  private entityCurrent: string;
  public hideNavegation: boolean = true;
  private word: string = "";
  private marksAll: NodeListOf<Element>;
  private count: number = 0;
  private stopWords: string[] = [];
  public isInter: boolean = environment.environmentType == 'Qa';
  public configDocs: any;
  public isActiveVocie: boolean = false;
  @Input() set cancel(data: string){
    if(data){
      if(this.userAgent.verify()) speechSynthesis.cancel();
      this.isActiveVocie = false;
      this.removeMark();
      const tab = this.doc.getElementsByClassName('tabs-doc__item--active');
      if(tab.length > 0 ) tab[0].classList.remove('voice')
    }
  }

  constructor(
    private readonly libraryService: LibraryService,
    public readonly location: Location,
    private readonly storage: StorageService,
    private readonly param: ActivatedRoute,
    private readonly route: Router,
    @Inject(DOCUMENT) private doc: Document,
    private notifyService: NotifyService,
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
    private readonly voiceLector: ConvertHTMLVoice,
    public readonly lectorService: LectorVoiceService,
    public readonly commonService: CommonService,
    private readonly resultService: ResultService,
    private readonly userAgent: VerificAgent
  ) {
    this.param.paramMap.subscribe((param: ParamMap) => {

      this.idCurrent = param.get('id');
      this.entityCurrent = param.get('entidadInformacion');
      this.word = param.get('q');
      this.configDocs = this.storage.getParamsDocs()
      this.documentIDs =
        this.storage.getDocumentosIds().length > 0
          ? this.storage.getDocumentosIds()
          : [];

      if (this.documentIDs.length > 0) {
        const isPresent = this.documentIDs.filter(
          (doc) => doc.id == this.idCurrent
        );
        if (isPresent.length > 0) {
          this.indexCurrent = isPresent[0].index;
          this.hideNavegation = false;
        } else {
          this.hideNavegation = true;
        }
      } else {
        this.hideNavegation = true;
      }

      const marks = setTimeout(() => {
        this.count = 0
        this.marksAll = this.commonService.marks.marks
        this.isMatches = this.commonService.marks.active
        this.findMatches = param.get('q') ? this.removeWord(param.get('q')) : '';
        this.stopWords = this.commonService.stopWord
        clearTimeout(marks)
      }, 2000)

    });
  }

  public ngOnInit(): void {  
    if (this.isInter) this.allFolders();
    speechSynthesis.cancel();


    let typingTimer: any;
    let doneTypingInterval: number = 1000;
    let myInput: HTMLElement = document.getElementById('searchInDoc')

    myInput.addEventListener('keyup', () => {
      clearTimeout(typingTimer);
      if (myInput['value']) {
        typingTimer = setTimeout(() => {
          var instance = new Mark("div#selection-text");
          instance.unmark(instance);
          this.findMatches = this.removeWord(this.findMatches)
          instance.mark(this.removeWord(myInput['value']), {
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
              if (this.stopWords.includes(range)) {
                return false;
              }
              return true;
            },
            noMatch: (e) => {
              instance.unmark(instance);
              this.isMatches = false
              this.notifyService.toastr('warning', 'Búsqueda', 'No se encontraron coincidencias', 1000, 'top-right');
            },
            done: (e) => {
              if (e > 0) {
                this.count = 0
                this.isMatches = true
                this.marksAll = document.querySelectorAll('mark[data-markjs]')
                this.marksAll[this.count].scrollIntoView({ behavior: 'smooth', block: 'center' })
                this.marksAll[this.count].classList.add('view')
              }
            }
          })
        }, doneTypingInterval);
      }
    });

  }

  ngOnDestroy(): void {
    if(this.userAgent.verify())speechSynthesis.cancel()
  }

  private allFolders() {  
      this.libraryService
      .getAllLibrary(0, 10, 'name user her inter')
      .subscribe((data) => (this.folders = data));
  }

  public nextDocId(): void {
    if (this.indexCurrent === this.documentIDs.length - 1) {
      const count = this.configDocs.page * this.configDocs.size;
      if (this.configDocs.param.includes('pagina')) {
        if (count <= this.configDocs.total) {
          this.configDocs.param = this.configDocs.param.replace(`pagina=${this.configDocs.page}`, `pagina=${this.configDocs.page + 1}`);
          this.getMoreDocs('after');
        }
      } else {
        if (count <= this.configDocs.total) {
          this.configDocs.param = this.configDocs.param.concat(`&pagina=${this.configDocs.page + 1}`);
          this.getMoreDocs('after');
        }
      }
      return;
    }

    if (this.indexCurrent < this.documentIDs.length - 1) {

      this.route.navigateByUrl('/',{ skipLocationChange: true}).then(suc =>{
        this.route.navigate([
          'doc',
          this.entityCurrent,
          this.documentIDs[this.indexCurrent + 1].id, this.word
        ]);
      })

      
      return;
    }
  }

  public beforeDocId() {
    if (this.indexCurrent == 0) {
      if (this.configDocs.page > 1) {
        this.configDocs.param = this.configDocs.param.replace(`pagina=${this.configDocs.page}`, `pagina=${this.configDocs.page - 1}`);
        this.getMoreDocs('before');
      }
      return;
    }

    if (this.indexCurrent === this.documentIDs.length - 1) {
      this.route.navigateByUrl('/',{ skipLocationChange: true}).then(suc =>{
        this.route.navigate([
          'doc',
          this.entityCurrent,
          this.documentIDs[this.indexCurrent - 1].id, this.word
        ]);
      })
      return;
    } else {
      this.route.navigateByUrl('/',{ skipLocationChange: true}).then(suc =>{
        this.route.navigate([
          'doc',
          this.entityCurrent,
          this.documentIDs[this.indexCurrent - 1].id, this.word
        ]);
      })
    }
  }

  private getMoreDocs(type: string) {
    this.resultService.getDocsID(this.configDocs.param).subscribe(
      data => {
        let idsDoc: DocsID[] = [];
        data.ids.forEach((doc: Id, index: number) => {
          let ids: DocsID = new DocsID();
          ids.id = doc.id;
          ids.index = index;
          idsDoc.push(ids);
        });
        const docs = {
          ids: idsDoc,
          param: this.configDocs.param,
          size: data.size,
          total: data.total,
          page: data.pagina
        }

        const index = (type == 'before') ? data.size - 1 : 0

        this.storage.setDocumentosIds(idsDoc);
        this.storage.setParamsDocs(docs);
        this.route.navigate([
          'doc',
          this.entityCurrent,
          idsDoc[index].id,
          this.word
        ]);
      }
    )
  }

  public copyAllDocument() {
    const text = this.doc.getElementById('cont-principal').innerText;
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(text);
    }

    this.notifyService.toastr(
      'success',
      'Texto',
      'Texto copia en portapapeles',
      1000,
      'top-right'
    );
  }

  public printDoc() {
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }

  public activeLector() {
    this.isActiveVocie = !this.isActiveVocie
    const tab = this.doc.getElementsByClassName('tabs-doc__item--active');
    const containertHTML = this.doc.getElementById('cont-principal');
    let position: number = 0;
    if (tab[0].classList.contains('voice')) {
      tab[0].classList.remove('voice');
      speechSynthesis.cancel();
      this.removeMark();
    } else {
      tab[0].classList.add('voice');
      let linesText: any | [] = containertHTML.innerText.replace(
        new RegExp('\t', 'g'),
        '\n'
      );
      linesText = linesText.replace(/\(/g, '');
      linesText = linesText.replace(/\)/g, '');
      linesText = linesText.replace(/\*/g,'')
      // linesText = linesText.replace(/\//g, ' ');
      linesText = linesText.split('\n');
      const marks = document.querySelectorAll('.markvoice')
      
      if (marks.length === 0) this.voiceLector.searchNode(containertHTML);
      linesText.forEach((parag: string, pos: number) => {
        if (parag != '') {
          let voice = window.speechSynthesis;
          let synt = new SpeechSynthesisUtterance();
          synt.voice = this.getVoiceMX();
          synt.volume = 1;
          synt.rate = 1;
          synt.text = parag;
          let replayWord: string = '';
          synt.onboundary = (e: any) => {
            let word: string = e.utterance.text.substring(
              e.charIndex,
              e.charIndex + e.charLength
            );
            if (word != '') {
              if(word.includes('*')) return
              if (!(word === replayWord)) {
                let mark = this.doc.getElementById(`speech${position}`);
                if (mark) {
                  mark.classList.add('active');
                  replayWord = word;
                }
                position++;
              }
            }
          }; 
        
          voice.speak(synt);

          if (pos === linesText.length - 1) {
            synt.onend = () => {
              this.isActiveVocie = false
              this.removeMark()
            }
          }
        }
      });
    }
  }

  private getVoiceMX(): any {
    let voice = speechSynthesis.getVoices();
    let voiceRead: any;
    if (!voice.length) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        voice = speechSynthesis.getVoices();
        for (let index = 0; index < voice.length; index++) {
          if (
            voice[index].lang == 'es-MX' &&
            voice[index].voiceURI == 'Microsoft Sabina - Spanish (Mexico)'
          ) {
            return (voiceRead = voice[index]);
          }
        }
        return voiceRead;
      });
    } else {
      for (let index = 0; index < voice.length; index++) {
        if (
          voice[index].lang == 'es-MX' &&
          voice[index].voiceURI == 'Microsoft Sabina - Spanish (Mexico)'
        ) {
          return (voiceRead = voice[index]);
        }
      }
      return voiceRead;
    }
  }

  private removeMark() {
    const data = this.doc.getElementsByClassName('markvoice');
    for (let index = 0; index < data.length; index++) {
      data[index].classList.remove('active');
    }
  }

  public nextCoincidencia() {
    if (this.count < this.marksAll.length - 1) {
      this.count++;
      this.marksAll[this.count - 1].classList.remove('view');
      this.marksAll[this.count].scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.marksAll[this.count].classList.add('view');
    } else {
      this.notifyService.toastr('warning', 'Documento', 'No se encontraron más coincidencias', 1000, 'top-right');
    }
  }

  public beforeCoincidencia() {
    if (this.count == 0) {
      this.notifyService.toastr('warning', 'Documento', 'No se encontraron más coincidencias', 1000, 'top-right');
    } else {
      this.count--;
      this.marksAll[this.count + 1].classList.remove('view');
      this.marksAll[this.count].scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.marksAll[this.count].classList.add('view');
    }
  }

  public removeWord(words: string): string {
    var pattern = "\\*",
      re = new RegExp(pattern, "g");
    words =
      words
        .replace(new RegExp('"', 'g'), "")
        .replace(re, "")
        .replace("~", " ")
        .replace(new RegExp("%2F", 'g'), "/")
      ;
    words = words.includes(":") ? words.split(":")[1] : words;
    words = words.replace(new RegExp(',', 'g'), ' ')
    words = words.split("(").join("").split(")").join("");

    const data: string[] = words.split(' ')
    let clean: string[] = [];
    data.forEach((word, i) => {
      if (this.stopWords.filter(x => x === word).length == 0) {
        clean.push(word);
      }
    })
    return clean.join(' ');
  }

  public backSearch() {
    if (this.commonService.pathUrl) {
      this.route.navigateByUrl(`busqueda${this.commonService.pathUrl}`)
    } else {
      this.route.navigateByUrl(`busqueda?q=*`)
    }

  }

}
