import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Preferences } from 'app/preferences';
import { NodeModel } from '@core/components';
import { AnalitycTextService, StorageService } from '@core/services';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { LectorVoiceService } from 'app/core/services/lector-voice.service';
import { Attendee } from './models/agent.model';
import { Router } from '@angular/router';
import { ResponseAgent } from 'app/core/models/asistente.model';
import { VerificAgent } from 'app/core/helper/verify-agent';

@Component({
  selector: 'scjn-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss'],
})
export class AccessibilityComponent implements OnInit {

  @ViewChild('attendee') someInput: ElementRef;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
    public readonly preferences: Preferences,
    private readonly formBuilder: FormBuilder,
    private readonly storageService: StorageService,
    private readonly lectorService: LectorVoiceService,
    private readonly router: Router,
    private readonly process: AnalitycTextService,
    @Inject(DOCUMENT) private readonly document: Document,
    public readonly userAgent: VerificAgent
  ) { }

  public accessibilityForm!: FormGroup;
  public isLoad: boolean = false;
  public valueSkin: string = '1';
  public valueFont: string = '1';
  public isActive: boolean = false;
  public imgAgent: string = '';
  public msj: string = '';
  public isText: boolean = false
  public fontList: NodeModel[] = [
    { id: 1, value: 'default-font', label: 'Predeterminado' },
    { id: 2, value: 'lucida', label: 'Lucida Bright' },
    { id: 3, value: 'myriad', label: 'Myriad Pro' },
    { id: 4, value: 'arial', label: 'Arial' },
    { id: 5, value: 'geneva', label: 'Geneva' },
  ];
  public skinList: NodeModel[] = [
    { id: 1, value: 'default', label: 'Predeterminado' },
    {
      id: 2,
      value: 'whiteblack',
      label: 'Fondo blanco letra e íconos color negro',
    },
    {
      id: 3,
      value: 'yellowblack',
      label: 'Fondo amarillo letra e íconos color negro',
    },
  ];
  public agent: Attendee[] = [
    { img: './assets/pub/AsistenteVirtual.gif', nameAnimate: 'success' },
    { img: './assets/pub/AsistenteVirtual.gif', nameAnimate: 'home' }
  ];
  public mjsAsistente: string[] = [
    '!Hola soy Julia tu asistente virtual en el uso de este buscador!.',
    'Estoy para ayudarte.'];
  public isPanel: boolean = false;
  public msjPanel: string = "";
  public isNewPage: { act: boolean, url: string } = {} as { act: boolean, url: string }
  public isRead: boolean = false;
  public isResume: boolean = false;
  public isMicrofone: boolean = false;
  public isMoved: boolean = false;
  public position: Object = { x: 0, y: 0 };
  public isReadVoice: boolean = false;
  public context: any = null;
  public isAsistente: boolean = false;


  public ngOnInit(): void {
    // this.imgAgent = this.agent.filter(x => x.nameAnimate == 'home')[0].img
    isPlatformBrowser(this.platformId) && this.validateStorage();
    this.readParagrhap();
  }

  private validateStorage(): void {
    const storage: Preferences = this.storageService.getPreferences();
    const preferences: Preferences = {} as Preferences;

    preferences.screenReader = storage ? storage.screenReader : false;
    this.lectorService.lector = preferences.screenReader;
    preferences.pixelsBase = storage
      ? storage.pixelsBase
      : this.preferences.pixelsBase;
    preferences.fontBase = storage ? storage.fontBase : this.fontList[0].value;
    preferences.skin = storage ? storage.skin : this.skinList[0].value;
    preferences.isAgent = false

    this.createForm(preferences);
    this.changeLetterSize({ value: preferences.pixelsBase });
    this.changeFont(preferences.fontBase);
    this.changeSkin(preferences.skin);
  }

  private createForm(preferences: Preferences): void {
    this.accessibilityForm = this.formBuilder.group({
      agent: [preferences.isAgent],
      screenReader: [preferences.screenReader],
      letterSize: [preferences.pixelsBase],
      font: [preferences.fontBase],
      colorAndContrast: [preferences.skin],
    });
  }

  public changeScreenReader({ checked }): void {
    if (isPlatformBrowser(this.platformId)) {
      this.preferences.screenReader = checked;

      this.storageService.setPreferences(this.preferences);

      checked ? this.createVoice() : this.cancelVoice();
    }
  }

  public changeLetterSize({ value: pixel }): void {
    if (isPlatformBrowser(this.platformId)) {
      this.preferences.pixelsBase = pixel;

      document.getElementById(
        'main'
      ).style.fontSize = `${this.preferences.pixelsBase}px`;

      this.storageService.setPreferences(this.preferences);
    }
  }

  public changeFont(font: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document
        .getElementById('main')
        .classList.remove(this.preferences.fontBase);

      this.preferences.fontBase = font;

      document.getElementById('main').classList.add(this.preferences.fontBase);

      this.storageService.setPreferences(this.preferences);
    }
  }

  public changeSkin(skin: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('main').classList.remove(this.preferences.skin);

      this.preferences.skin = skin;

      document.getElementById('main').classList.add(this.preferences.skin);

      this.storageService.setPreferences(this.preferences);
    }
  }

  private createVoice(): void {
    this.lectorService.lector = true;
    // ...
  }

  private cancelVoice(): void {
    // ...
    this.lectorService.lector = false;
  }

  public viewAgent({ checked }) {
    this.preferences.isAgent = checked;
    this.isActive = checked;
    this.position = { x: 0, y: 0 }
    this.isMoved = false
    if (!checked) {
      this.isActive = false;
      this.isText = false;
      this.msj = '';
      this.mjsAsistente = []
      this.mjsAsistente = [
        '!Hola soy Julia tu asistente virtual en el uso de este buscador!.',
        'Estoy para ayudarte.',];
      this.imgAgent = this.agent.filter(x => x.nameAnimate == 'home')[0].img;
      this.isPanel = false;
      this.isAsistente = false;
      this.someInput.nativeElement.value = '';
    } else {
      this.mjsAsistente = [
        '!Hola soy Julia tu asistente virtual en el uso de este buscador!.',
        'Estoy para ayudarte.'];
      this.imgAgent = this.agent.filter(x => x.nameAnimate == 'home')[0].img;
      this.runMsj(2000);
    }


  }

  private runMsj(runTime: number, url?: string) {
    let i = 0;
    let byUrl = "";
    const time = setTimeout(() => {
      this.isPanel = true;
      byUrl = url
      if (this.isReadVoice) {
        showMsjInVoice();
      } else {
        showMsjNotVoice(0);
      }
      clearTimeout(time);
    }, runTime)

    const showMsjInVoice = () => {
      if (!this.isMicrofone) {
        this.msjPanel = "";
        let voice = speechSynthesis;
        let synt = new SpeechSynthesisUtterance();
        synt.voice = this.getVoiceMX()
        synt.volume = 1;
        synt.rate = .9;
        synt.text = this.mjsAsistente[i];
        this.msjPanel = this.mjsAsistente[i]
        if (byUrl && i == this.mjsAsistente.length - 1) {
          this.isNewPage = { act: true, url: url };
        }

        synt.onend = () => {
          if (!this.isMicrofone) {
            if (i < this.mjsAsistente.length - 1) {
              i++;
              showMsjInVoice();
            }
          }
        }
        voice.speak(synt);
      }
    }

    const showMsjNotVoice = (time: number) => {
      if (!this.isMicrofone) {
        const times = setTimeout(() => {
          this.msjPanel = "";
          if (!this.isMicrofone) {
            this.msjPanel = this.mjsAsistente[i];
            if (url && i == this.mjsAsistente.length - 1) {
              this.isNewPage = { act: true, url: url };
            }
            if (i < this.mjsAsistente.length - 1) {
              i++;
              showMsjNotVoice(3000);
            } else {
              clearTimeout(times);
            }
          } else {
            clearTimeout(times);
          }
        }, time)
      }
    }

  }

  public searchHelp(textInSearch: string) {
    this.isText = false;
    this.isLoad = true;
    this.process.attendeen({ text: textInSearch, context: this.context }).subscribe((response: ResponseAgent) => {
      this.isMicrofone = false
      this.someInput.nativeElement.value = '';
      this.isLoad = false;
      this.isNewPage = { act: false, url: '' };
      this.mjsAsistente = [];
      this.mjsAsistente = response.response.message;
      this.context = response.context
      switch (response.response.statusCode) {
        case 'OK_REDIRECT':
          this.router.navigateByUrl(response.response.url).then(res => {
            if (res) {
              this.isPanel = false;
              this.imgAgent = this.agent.filter(x => x.nameAnimate == 'success')[0].img;
              this.runMsj(1000);
            }
          });
          break;
        case 'NOTFOUND_REDIRECT':
          this.isPanel = false;
          this.runMsj(500);
          break;
        case 'NOTFOUND':
          this.isPanel = false;
          this.runMsj(500);
          break;
        case 'OK_REDIRECT_CONFIRM':
          this.isPanel = false;
          this.imgAgent = this.agent.filter(x => x.nameAnimate == 'success')[0].img;
          this.runMsj(500, response.response.url);
          break;
      }
    });
  }

  public closeAgent() {
    this.isActive = false;
    this.isText = false;
    this.msj = '';
    this.mjsAsistente = []
    this.mjsAsistente = [
      '!Hola soy Julia Bot tu asistente virtual en el uso de este buscador!.',
      'Estoy para ayudarte en lo que gustes consultar o buscar',
      'Lo que necesites con gusto te apoyare :D'];
    this.imgAgent = this.agent.filter(x => x.nameAnimate == 'home')[0].img;
    this.isPanel = false;
    this.accessibilityForm.controls.agent.setValue(false)
  }

  public activeMicrophono() {

    let globalStream = null;
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        globalStream = stream;
      });

    const fileJs = document.createElement('script')
    fileJs.id = 'file-voice-js'
    fileJs.src = './assets/js/lector_voice.js'
    document.body.append(fileJs);
  }

  public acceptRedirect() {
    window.open(this.isNewPage.url, '_blank');
    this.isNewPage = { act: false, url: '' };
    this.isPanel = false;
  }

  private readParagrhap() {
    this.document.addEventListener('mouseover', (ev: MouseEvent) => {
      if (this.accessibilityForm.controls['screenReader'].value) {
        let currentText = ev.target as HTMLElement;
        if (currentText.firstChild instanceof Text && currentText.firstChild.textContent != ''
          && !currentText.classList.contains('mat-icon') && !currentText.classList.contains('material-icons')) {
          if (currentText.childNodes.length == 1) {
            this.createRead(currentText);
          }
        }
      }
    })
  }

  public createRead(currentText: HTMLElement) {
    let ev: any = null;
    let ic_read_voice = this.document.createElement('i')
    ic_read_voice.classList.add('fas', 'fa-volume-off', 'mr-2')
    ic_read_voice.style.cursor = 'pointer';
    ic_read_voice.style.color = 'inherit';
    ic_read_voice.onclick = () => {

      speechSynthesis.cancel();
      this.isResume = false;
      let voice = window.speechSynthesis;
      let speech = new SpeechSynthesisUtterance
      speech.text = currentText.textContent;
      let voices = voice.getVoices().filter(voz => voz.lang == 'es-MX')
      speech.voice = voices[voices.length - 1]
      speech.onstart = () => {
        this.document.getElementById('controls').classList.add('act')
      }
      speech.onend = () => { this.document.getElementById('controls').classList.remove('act') }
      voice.speak(speech);
    }
    currentText.insertBefore(ic_read_voice, currentText.firstChild)
    currentText.style.position = 'relative';
    currentText.addEventListener('mouseleave', ev = () => {
      currentText.removeChild(ic_read_voice)
      currentText.removeEventListener('mouseleave', ev, { capture: false })
    })
  }

  public onClose() {
    speechSynthesis.cancel();
  }

  public onPause() {
    this.isResume = true
    speechSynthesis.pause();
  }

  public onResume() {
    this.isResume = false
    speechSynthesis.resume()
  }

  public getPixels({ event }) {
    this.isMoved = true
    const ev = event as MouseEvent
    const viweport = window.screen.width;
    const msj = this.document.getElementById('panel-msj') as HTMLElement
    if ((viweport / 2) >= ev.pageX) {
      msj.style.right = '';
      msj.style.left = '104%';
    } else {
      msj.style.left = '';
      msj.style.right = '104%';
    }
  }

  private getVoiceMX(): any {
    let voice = speechSynthesis.getVoices()
    let voiceRead: any
    voice.forEach(voz => {
      if (voz.lang == 'es-MX') {
        return voiceRead = voz
      }
    })
    return voiceRead
  }

}

