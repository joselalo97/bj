import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entities } from '@core/constants';
import { DocumentModel, QueryParams } from '@core/models';
import { ResultService } from '@core/services';
import { environment } from '@environment/environment';
import { ConvertQuery } from '@intranet/models/convertQuery';
import * as Neovis from 'neovis.js';

@Component({
  selector: 'v-nodengroses',
  templateUrl: './v-nodengroses.component.html',
  styleUrls: ['v-nodengroses.component.scss'],
})
export class VNodengrosesComponent {
  doc: DocumentModel = {} as DocumentModel;
  nodos: any;
  indices: any[] = [];
  urlRedirect: string[] = [];
  convert: ConvertQuery = new ConvertQuery();
  isLoad: boolean = true;
  @Input() set documento(doc: DocumentModel) {
    if (doc) {
      if (doc.idEngrose) {
        this.renderNeovis(doc.idEngrose);
      }
    }
  }

  get documento(): DocumentModel {
    return;
  }
  @Output()
  display = new EventEmitter<boolean>();
  viz: any;
  constructor(
    private http: HttpClient,
    private serviceResultado: ResultService
  ) {}

  private renderNeovis(id: number) {
    var config = {
      container_id: 'viz',
      server_url: 'bolt://172.16.214.19:7687',
      server_user: 'gbautista',
      server_password: '12345678',
      labels: {
        Character: {
          caption: 'name',
          size: 'pagerank',
          community: 'community',
        },
      },
      relationships: {
        INTERACTS: {
          thickness: 'weight',
          caption: true,
        },
      },
      initial_cypher: `MATCH (e:Sentencia { id_sentencia: ${id} })-[r:Referencia]-(s) RETURN e,r,s`,
    };

    this.viz = new Neovis.default(config);
    this.viz.render();

    this.nodos = this.viz._nodes;

    var idVar = setInterval(() => {
      if (
        this.viz._network != null &&
        this.viz._network.view.targetTranslation != null
      ) {
        let node: number[] = this.viz._network.body.nodeIndices;
        this.indices = this.orderEngrose(node);

        this.indices.forEach((indice, i) => {
          this.isLoad = true;
          const data = this.redictDoc(
            this.nodos[indice].label,
            this.nodos[indice].title
          );
          data.then((redict) => {
            this.urlRedirect[i] = redict;
          });
        });
        this.isLoad = false;

        if (this.indices.length >= 1) {
          this.display.emit(true);
          this.viz._network.view.body.view.scale = 0.6;
          this.viz._network.view.targetTranslation.x = 400;
          this.viz._network.view.targetTranslation.y = 250;
          let canvasNode = this.viz._network.canvas.body.nodes;
          let canvasNodeIndices = this.viz._network.canvas.body.nodeIndices;
          let edge = this.viz._network.canvas.body.edges;
          let edgeIndices = this.viz._network.canvas.body.edgeIndices;
          this.changeColorNode(canvasNode, canvasNodeIndices);
          this.changeLabelNameNode(canvasNode, canvasNodeIndices);
          this.changeLabelNameEdge(edge, edgeIndices);
        } else {
          this.display.emit(false);
        }
        clearInterval(idVar);
      }
    }, 1000);
  }

  private orderEngrose(data: number[]): number[] {
    let order: number[] = [];
    data.forEach((id) => {
      this.nodos[id].label === 'Sentencia' ? order.unshift(id) : order.push(id);
    });
    return order;
  }

  private changeColorNode(nodos: any, indicesNodes: number[]) {
    indicesNodes.forEach((idNode) => {
      let label = nodos[idNode].options.label;
      switch (label) {
        case 'Tesis_Jurisprudencia':
          this.viz._network.canvas.body.nodes[idNode].options.color.background =
            '#97c2fc';
          this.viz._network.canvas.body.nodes[idNode].options.color.border =
            '#86b7f9';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.background = '#97c2fc';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.border = '#86b7f9';
          break;
        case 'Tesis_Aislada':
          this.viz._network.canvas.body.nodes[idNode].options.color.background =
            '#504286';
          this.viz._network.canvas.body.nodes[idNode].options.color.border =
            '#504281';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.background = '#504286';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.border = '#504281';
          break;
        case 'Sentencia':
          this.viz._network.canvas.body.nodes[idNode].options.color.background =
            '#ffff00';
          this.viz._network.canvas.body.nodes[idNode].options.color.border =
            '#ffa500';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.background = '#ffff00';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.border = '#ffa500';
          break;
        case 'Ordenamiento':
          this.viz._network.canvas.body.nodes[idNode].options.color.background =
            '#992f87';
          this.viz._network.canvas.body.nodes[idNode].options.color.border =
            '#992f87';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.background = '#992f87';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.border = '#992f87';
          break;
        case 'Expediente':
          this.viz._network.canvas.body.nodes[idNode].options.color.background =
            '#fb7e81';
          this.viz._network.canvas.body.nodes[idNode].options.color.border =
            '#fa161c';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.background = '#fb7e81';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.border = '#fa161c';
          break;
        case 'Tratados_Internacionales':
          this.viz._network.canvas.body.nodes[idNode].options.color.background =
            '#eb7df4';
          this.viz._network.canvas.body.nodes[idNode].options.color.border =
            '#e12ef0';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.background = '#eb7df4';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.border = '#e12ef0';
          break;
        case 'Acuerdo':
          this.viz._network.canvas.body.nodes[idNode].options.color.background =
            '#6BBBAE';
          this.viz._network.canvas.body.nodes[idNode].options.color.border =
            '#6cafa4';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.background = '#6BBBAE';
          this.viz._network.canvas.body.nodes[
            idNode
          ].options.color.highlight.border = '#6cafa4';
          break;
      }
    });
  }

  private changeLabelNameNode(nodos: any, indicesNodes: number[]) {
    indicesNodes.forEach((idNode) => {
      let label = nodos[idNode].options.label;
      let nameNode = '';
      switch (label) {
        case 'Tesis_Aislada':
          nameNode = nodos[idNode].options.title
            .split('<br>')[3]
            .split('</strong>')[1]
            .trim();
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].text = nameNode;
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].font = '18px arial';
          this.viz._network.canvas.body.nodes[idNode].options.label = nameNode;
          break;
        case 'Tesis_Jurisprudencia':
          nameNode = nodos[idNode].options.title
            .split('<br>')[3]
            .split('</strong>')[1]
            .trim();
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].text = nameNode;
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].font = '18px arial';
          this.viz._network.canvas.body.nodes[idNode].options.label = nameNode;
          break;
        case 'Ordenamiento':
          nameNode = nodos[idNode].options.title
            .split('</strong>')[1]
            .split('<br>')[0]
            .trim();
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].text = nameNode;
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].font = '18px arial';
          this.viz._network.canvas.body.nodes[idNode].options.label = nameNode;
          break;
        case 'Expediente':
          nameNode = nodos[idNode].options.title
            .split('</strong>')[1]
            .split('<br>')[0]
            .trim();
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].text = nameNode;
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].font = '18px arial';
          this.viz._network.canvas.body.nodes[idNode].options.label = nameNode;
          break;
        case 'Tratados_Internacionales':
          nameNode = nodos[idNode].options.title
            .split('</strong>')[1]
            .split('<br>')[0]
            .trim();
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].text = nameNode;
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].font = '18px arial';
          this.viz._network.canvas.body.nodes[idNode].options.label = nameNode;
          break;
        case 'Caso_coidh':
          nameNode = nodos[idNode].options.title
            .split('</strong>')[1]
            .split('<br>')[0]
            .trim();
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].text = nameNode;
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].font = '18px arial';
          this.viz._network.canvas.body.nodes[idNode].options.label = nameNode;
          break;
        case 'Acuerdo':
          nameNode = nodos[idNode].options.title
            .split('</strong>')[2]
            .split('<br>')[0]
            .trim();
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].text = nameNode;
          this.viz._network.canvas.body.nodes[
            idNode
          ].shape.labelModule.lines[0].blocks[0].font = '18px arial';
          this.viz._network.canvas.body.nodes[idNode].options.label = nameNode;
          break;
      }
    });
  }

  private changeLabelNameEdge(edge: any, indicesEdge: number[]) {
    indicesEdge.forEach((id) => {
      let label = '';
      if (this.viz._network.canvas.body.edges[id].title != '') {
        label = this.viz._network.canvas.body.edges[id].title
          .split('</strong>')[1]
          .split('<br>')[0]
          .trim();
        this.viz._network.canvas.body.edges[id].options.label = label;
      } else {
        this.viz._network.canvas.body.edges[id].options.label = '';
      }
    });
  }

  public async redictDoc(nodo: string, data: string): Promise<string> {
    switch (nodo) {
      case 'Tesis_Jurisprudencia':
        return this.urlTesis(data);
      case 'Expediente':
        let promise;
        let numExp = data.split(' ');
        numExp.forEach((num, i) => {
          if (num.match('[0-9]')) {
            promise = this.urlExpediente(data, num);
          }
        });
        return promise;
      case 'Ordenamiento':
        return this.urlOrdenamiento(data);
      case 'Tesis_Aislada':
        return this.urlTesis(data);
      case 'Caso_coidh':
        return this.urlCasoCoidh(data);
    }
  }

  private async urlTesis(nodos: any): Promise<string> {
    if (nodos.includes('registro_digital')) {
      let id: string = '';
      let _getRegistro: string[] = nodos.split('<br>');
      let registroDigital: any = _getRegistro[3].split('</strong>');
      registroDigital = `"${registroDigital[1]}"`;

      let param: QueryParams = {} as QueryParams;
      param.q = registroDigital;
      param.page = 1;
      param.extractos = 120;
      param.filtros = '';
      param.indice = Entities.Thesis;
      param.sinonimos = false;
      param.subFiltros = '';
      param.size = 10;

      const data: string = await this.serviceResultado
        .getSearch(this.convert.convertQueryParamsResults(param))
        .toPromise()
        .then((res) => {
          if (res.resultados.length >= 1) {
            id = res.resultados[0].id;
            return `./doc/tesis/${id}/*`;
          }
        });
      return data;
    }
  }

  private async urlOrdenamiento(nodos: any): Promise<string> {
    if (nodos.includes('ley')) {
      let ordenamiento = nodos.split('</strong>')[1].trim().split('<br>')[0];
      const data: string = await this.http
        .get(
          `${environment.urlScjn}buscadorp/busqueda?q="${ordenamiento
            .normalize('NFD')
            .replace(
              /[\u0300-\u036f]/g,
              ''
            )}"&pagina=1&busquedaResultados=AND ordenamiento:"${ordenamiento
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')}",AND "${ordenamiento
            .normalize('NFD')
            .replace(
              /[\u0300-\u036f]/g,
              ''
            )}"&indice=legislacion&extractos=120&size=20`
        )
        .toPromise()
        .then((res: any) => {
          let objExpediente = res.resultados.filter(
            (m) =>
              m.ordenamiento
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') ===
              ordenamiento.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          );
          if (objExpediente[0]) {
            return `./doc/legislacion/${objExpediente[0].id}/*`;
          }
        });
      return data;
    }
  }

  private async urlExpediente(nodos: any, num: any): Promise<string> {
    let part = num.includes('<br>') ? num.split('<br>')[0].trim() : num.trim();

    if (nodos.includes('expediente')) {
      let expediente = nodos.split('</strong>')[1].trim().split('<br>')[0];
      let param: QueryParams = {} as QueryParams;
      param.q = expediente;
      param.page = 1;
      param.extractos = 120;
      param.filtros = '';
      param.indice = Entities.Sentences;
      param.sinonimos = false;
      param.subFiltros = `AND numExpediente:${part}`;
      param.size = 10;
      const data: string = await this.serviceResultado
        .getSearch(this.convert.convertQueryParamsResults(param))
        .toPromise()
        .then((res) => {
          if (res.resultados.length >= 1) {
            return `./doc/sentencias/${res.resultados[0].id}/*`;
          }
        });
      return data;
    }
  }

  private async urlCasoCoidh(nodo: any) {
    let numCase = nodo.split('</strong>')[2].split('<br>')[0].trim();
    let param: QueryParams = {} as QueryParams;
    param.q = '*';
    param.page = 1;
    param.extractos = 120;
    param.filtros = '';
    param.indice = Entities.Coidh;
    param.sinonimos = false;
    param.subFiltros = `AND "${numCase}"`;
    param.size = 10;
    const data: string = await this.serviceResultado
      .getSearch(this.convert.convertQueryParamsResults(param))
      .toPromise()
      .then((res) => {
        if (res.resultados) {
          let doc = res.resultados.filter((m) => m.numSeccion === numCase);
          return `./doc/coidh/${doc[0].id}/*`;
        }
      });
    return data;
  }
}
