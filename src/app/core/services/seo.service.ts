import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(@Inject(DOCUMENT) private dom: Document) { }

  createURLCanonical() {
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute("id", "canonical");
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', this.dom.URL);
    const isExist = this.dom.getElementById('canonical')
    if (isExist) isExist.remove()
    this.dom.head.appendChild(link);
  }

}
