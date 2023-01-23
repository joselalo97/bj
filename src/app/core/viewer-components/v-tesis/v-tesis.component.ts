import { DOCUMENT } from '@angular/common';
import { Component, Input, ViewEncapsulation, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Entities } from '@core/constants';
import { DocTesisModel } from '@core/models';
import { ResultService } from '@core/services';

@Component({
  selector: 'v-tesis',
  templateUrl: './v-tesis.component.html',
  styleUrls: ['./v-tesis.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VTesisComponent implements OnInit {

  @ViewChild('articles', { static: false }) private articles: ElementRef<HTMLElement>

  doc: DocTesisModel = {} as DocTesisModel;
  isLoad: boolean;
  entitys = Entities;
  art: string = "";
  open: boolean = false;
  expand: boolean = false;

  @Input() set documento(doc: DocTesisModel) {
    this.isLoad = true;
    if (typeof doc == 'object') {
      if (doc.registroDigital) {
        this.isLoad = false;
        this.doc = doc;
        this.getDocumentos(doc);

        this.resultService
          .getRelacionesTesis(doc.registroDigital)
          .subscribe((res: any) => {
            if (res != null) {
              this.articles.nativeElement.onclick = (event: Event) => {
                let tag = "";
                tag =
                  event.target['tagName'] == "SPAN"
                    ? event.target['innerText'].trim()
                    : event.target['innerText'].trim();
                res.relacion.forEach((rel) => {
                  if (tag == rel.descriptor) {
                    if (rel.textoRel && !rel.rdLink) {
                      this.art = rel.textoRel;
                      this.open = true;
                      this.dom.body.style.overflow = 'hidden'
                    } else if (rel.textoRel && rel.rdLink) {
                      this.resultService.getTesis(rel.rdLink).subscribe((res) => {
                        if (res.resultados.length >= 1) {
                          this.router
                            .navigateByUrl("/", { skipLocationChange: true })
                            .then((success) => {
                              this.router.navigate([
                                `doc/${res.resultados[0].type}/${res.resultados[0].id}/*`,
                              ]);
                            });
                        } else {
                          this.art = rel.textoRel;
                          this.open = true;
                          this.dom.body.style.overflow = 'hidden'
                        }
                      });
                    } else if (!rel.textoRel && rel.rdLink) {
                      this.resultService.getTesis(rel.rdLink).subscribe((res) => {
                        if (res.resultados.length >= 1) {
                          this.router
                            .navigateByUrl("/", { skipLocationChange: true })
                            .then((success) => {
                              this.router.navigate([
                                `doc/${res.resultados[0].type}/${res.resultados[0].id}/*`,
                              ]);
                            });
                        }
                      });
                    }
                  }
                });
              }

              res.relacion.forEach((rel: any) => {
                this.searchNode(this.articles.nativeElement, rel.descriptor);
              });
            }
          });
      } else {
        if(doc.id === 'null')this.isLoad = false;
      }
    }
  }

  get documentoo(): DocTesisModel {
    return this.doc;
  }

  constructor(
    private readonly resultService: ResultService,
    private readonly router: Router,
    @Inject(DOCUMENT) public dom: Document
  ) { }

  public ngOnInit(): void {

  }

  private getDocumentos(doc: DocTesisModel) {
    if (doc.notaPrecedente.length > 0) {
      doc.notaPrecedente.forEach((data) => {
        if (data.texto.includes('<em')) {
          let part = data.texto.split('</em>')[1];
          data.texto = part;
          let q =
            'tipoAsunto:' +
            `"${data.tipoAsunto}"` +
            'numExpediente:' +
            `"${data.numExpediente}"`;
          let param = 'tipoAsunto:' + `"${data.tipoAsunto}"`;
          if (doc.instancia === 'Suprema Corte de Justicia de la Nación') {
            this.resultService.getDocSentencia(q).subscribe((res) => {
              if (res.total >= 1) {
                let nameCase =
                  data.tipoAsunto
                    .toLocaleLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '') +
                  ' ' +
                  data.numExpediente;
                let nameCompare =
                  res.resultados[0].tipoAsunto
                    .toLocaleLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '') +
                  ' ' +
                  res.resultados[0].numExpediente;
                if (nameCase === nameCompare) {
                  data['tooltip'] = 'Ir al documento';
                  data[
                    'link'
                  ] = `doc/${res.resultados[0].type}/${res.resultados[0].id}/${param}`;
                } else {
                  data['tooltip'] = '';
                }
              } else {
                data['tooltip'] = '';
              }
            });
          } else {
            data['tooltip'] = '';
          }
        }
      });
    }
  }

  public changeDoc(tooltip: string, url: string) {
    tooltip == 'Ir al documento' ? this.router.navigate([url]) : null;
  }

  private searchNode(html: HTMLElement, text: string) {
    let parentNode: NodeListOf<ChildNode> = html.childNodes
    parentNode.forEach(
      node => {
        this.processChildNodes(node, text)
      })
  }

  private processChildNodes(nodos: Node, texto: string) {
    let children: NodeListOf<ChildNode> = nodos.childNodes;
    let parentNode = nodos.parentElement
    if (children.length > 0) {
      children.forEach(
        (node, i) => {
          this.processChildNodes(node, texto);
        });
    } else {
      if ((nodos instanceof Text)) {
        parentNode.innerHTML = parentNode.innerHTML.replace(new RegExp(this.characterReplace(texto), 'g'), `<span class="skin-color-text article">${texto}</span>`)
        return;
      }
    }
  }

  private characterReplace(text: string): string {
    let charts: string[] = [",", ")", "("];
    let newText: string = text;
    charts.forEach(chart => {
      if (text.includes(chart)) {
        switch (chart) {
          case ',':
            newText = newText.replace(/,/g, `[${chart}]`)
            break
          case '(':
            newText = newText.replace(/\(/g, `[${chart}]`)
            break
          case ')':
            newText = newText.replace(/\)/g, `[${chart}]`)
            break
        }
      }
    })
    return newText;
  }

}