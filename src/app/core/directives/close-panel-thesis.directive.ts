import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Output, EventEmitter, Inject } from '@angular/core';


@Directive({
  selector: '[closePanelThesis]'
})
export class ClosePanelThesisDirective {

  @Output() hidden: EventEmitter<boolean> = new EventEmitter<boolean>()  

  constructor(@Inject(DOCUMENT) private dom: Document) { }

  @HostListener('document:keydown', ['$event']) close(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.dom.body.style.overflow = ''
      this.hidden.emit(false);
    }
  }


}
