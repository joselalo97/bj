import { DOCUMENT } from '@angular/common';
import { Directive, HostListener,Inject } from '@angular/core';

@Directive({
  selector: '[activeMicrophone]'
})
export class ActiveMicrophoneDirective {

  private codeCtrl: boolean = false

  @HostListener('document:keydown', ['$event']) keydown(e: KeyboardEvent) {

    const agent = this.document.getElementById('agent');
    
    if (e.key == 'Control') {      
      this.codeCtrl = true;
    } else
      if (e.key == ' ' && this.codeCtrl && agent.classList.contains('active')) {
        let globalStream = null;
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: false })
          .then((stream) => {
            globalStream = stream;
          });

        const fileJs = document.createElement('script');
        fileJs.id = 'file-voice-js';
        fileJs.src = './assets/js/lector_voice.js';
        document.body.append(fileJs);
        speechSynthesis.cancel();
      } else {
        this.codeCtrl = false;
      }
  }

  constructor(@Inject(DOCUMENT) private document: Document) { }

}
