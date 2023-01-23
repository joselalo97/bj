import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConvertHTMLVoice {
  constructor(@Inject(DOCUMENT) public document: Document) { }


  countMark: number = 0

  searchNode(html: HTMLElement) {
    this.countMark = 0
    let parentNode: NodeListOf<ChildNode> = html.childNodes
    parentNode.forEach(
      node => {
        this.processChildNodes(node)
      })
  }

  processChildNodes(nodos: Node) {
    let children: NodeListOf<ChildNode> = nodos.childNodes;
    if (children.length > 0) {
      children.forEach(
        (node, i) => {
          this.processChildNodes(node);
        });
    } else {
      if (nodos instanceof Text) {
        let partentNode = nodos.parentElement
        let nodo = this.document.createElement('span')
        nodo.classList.add('markcont')
        const formatText = nodos.textContent.replace(new RegExp('\n', 'g'), ' ')
        nodo.innerHTML = this.setSpanTag(formatText.split(' '))
        partentNode.replaceChild(nodo, nodos)
      }
    }
  }

  setSpanTag(parts: string[]): string {
    const stopWords = ['**********','**********.','**********,','00.','$',']','[','', ',', ' ', '.', ';', '-', '“[…]', '[…]”.', '[…]', '[…].”', '".', '“…”', '&nbsp;', '-.', '[…]’', 'â†‘', '“','(',')']
    const stopChars = ['@', '”', '-', ',', '.,','**********,','**********','**********.']
    let textTemp: string = "";
    for (let i = 0; i < parts.length; i++) {
      const formatSpaceText = parts[i].trim()
      if (!stopWords.includes(parts[i])) {
        if (formatSpaceText.includes('/')) {
          let partExpediente = formatSpaceText.split('/')
          textTemp += " <span id=\"speech" + (this.countMark) + "\" class=\"markvoice\">" + partExpediente[0] + "</span>";
          textTemp += "<span id=\"speech" + (this.countMark + 1) + "\" class=\"markvoice\">" + '/' + "</span>";
          textTemp += "<span id=\"speech" + (this.countMark + 2) + "\" class=\"markvoice\">" + partExpediente[1] + "</span>";
          this.countMark = this.countMark + 3
        } else if (formatSpaceText.includes('*')) {
          let partAstr = formatSpaceText.split('*')
          textTemp += " <span id=\"speech" + (this.countMark) + "\" class=\"markvoice\">" + partAstr[0] + "</span>";
          textTemp += "<span id=\"speech" + (this.countMark + 1) + "\" class=\"markvoice\">" + '*' + "</span>";
          textTemp += "<span id=\"speech" + (this.countMark + 2) + "\" class=\"markvoice\">" + partAstr[1] + "</span>";
          this.countMark = this.countMark + 3
        }
        else if (formatSpaceText.includes('.') && !stopChars.includes(parts[i])
          && !formatSpaceText.includes('(') && !formatSpaceText.includes(')') && !formatSpaceText.includes('.;') && !formatSpaceText.includes('.-')
          && !formatSpaceText.includes('.,')) {
          let partDat = formatSpaceText.split('.')
          partDat.forEach(
            word => {
              if (word != '') {
                textTemp += " <span id=\"speech" + this.countMark + "\" class=\"markvoice\">" + word + '.' + "</span>";
                this.countMark++
              }
            }
          )
        }
        else {
          if (parts[i].includes(',')) {
            let partPoint = parts[i].split(',')
            partPoint.forEach(
              word => {
                if (word != '') {
                  textTemp += " <span id=\"speech" + this.countMark + "\" class=\"markvoice\">" + word + ',' + "</span>";
                  this.countMark++
                }
              }
            )
          } else if(parts[i] != ''){
            textTemp += " <span id=\"speech" + this.countMark + "\" class=\"markvoice\">" + parts[i] + "</span>";
            this.countMark++
          }
        }
      } else {
        if (parts[i] != '') {
          textTemp += "<span class=\"markvoice\">" + parts[i] + "</span ";
        }
      }
    }
    return textTemp;
  }
}
