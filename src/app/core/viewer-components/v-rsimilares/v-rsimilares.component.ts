import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Entities } from '@core/constants';
import {
  DocTesisModel,
  TematicaNode,
  TesisRelacion,
  VotosSugerencia,
} from '@core/models';
import { ViewerService } from '@core/services';
import { EjecutoriaVinculada } from 'app/core/models/ejecutoria-vinculada.model';

@Component({
  selector: 'v-rsimilares',
  templateUrl: './v-rsimilares.component.html',
  styleUrls: ['./v-rsimilares.component.scss'],
})
export class VRsimilaresComponent {
  doc: DocTesisModel = {} as DocTesisModel;
  text: string = '*';
  tRelacion: TesisRelacion = {} as TesisRelacion;
  entity = Entities;
  ejecutorias: EjecutoriaVinculada[] = [];
  votos: VotosSugerencia[] = [];
  isLoadT: boolean;
  isLoadE: boolean;
  isLoadV: boolean = true;
  isLoadR: boolean = true;
  tematicas: any[] = [];
  tematicasMapa = new Map();
  cargandoTematica: boolean;
  dataTematica: TematicaNode[] = [];
  treeControl = new NestedTreeControl<TematicaNode>((node) => node.children);
  treeControlTematica = new NestedTreeControl<TematicaNode>(
    (node) => node.children
  );

  dataSource = new MatTreeNestedDataSource<TematicaNode>();
  dataSourceTematica = new MatTreeNestedDataSource<TematicaNode>();

  @Input() set documento(tesis: DocTesisModel) {
    if (tesis.registroDigital) {
      this.doc = tesis;
      this.getTesis(tesis.id, tesis.instancia);
      this.getEjecutorias(tesis.rdEjecutoria);
      this.getVotos(tesis.rdVotos);
      this.getRelacionesTematicas(tesis.registroDigital);
    }
  }

  get documento(): DocTesisModel {
    return this.doc;
  }

  @Input() set q(query: string) {
    if (query) {
      this.text = query;
    }
  }

  get q(): string {
    return this.text;
  }

  constructor(private viewerService: ViewerService) {}

  private getTesis(id: string, instancia: string) {
    this.isLoadT = true;
    this.viewerService.getTesisRelacionadas(id, instancia).subscribe((data) => {
      this.tRelacion = data;
      this.isLoadT = false;
    });
  }

  private getEjecutorias(ejecutoria: number[]) {
    this.isLoadE = true;
    if (ejecutoria) {
      this.viewerService
        .getEjecutoriasVinculadas(ejecutoria)
        .subscribe((data) => {
          this.ejecutorias = data ? data : [];
          this.isLoadE = false;
        });
    } else {
      this.isLoadE = false;
    }
  }

  private getVotos(votos: number[]) {
    this.isLoadV = true;
    if (votos) {
      this.viewerService.getVotosVinculados(votos).subscribe((data) => {
        this.votos = data ? data : [];
        this.isLoadV = false;
      });
    } else {
      this.votos = [];
      this.isLoadV = false;
    }
  }

  private getRelacionesTematicas(registro: number) {
    this.isLoadR = true;
    this.viewerService
      .getTematicasByRegistroDigital(registro)
      .subscribe((data) => {
        this.isLoadR = false;
        let objTree = [];
        this.tematicas = data;
        this.dataTematica = new Array<TematicaNode>();
        data.forEach((tematica) => {
          let padre = tematica.temaPadre;
          if (this.tematicasMapa.has(padre)) {
            let objTemp: { children: any } = { children: null };
            objTemp = {
              children: tematica.temaHijo,
            };
            let objTempChild = [];
            tematica.tesis.forEach((tema) => {
              let c = {
                name: tema.rubro,
              };
              objTempChild.push(c);
            });
            objTemp['children'] = objTempChild;
            this.tematicasMapa.get(padre).push(objTemp);
          } else {
            let objTemp: { children: any } = { children: null };
            objTemp = {
              children: tematica.temaHijo,
            };
            let objTempChild = [];
            tematica.tesis.forEach((tema) => {
              let c = {
                name: tema.rubro,
                id: tema.id,
              };
              objTempChild.push(c);
            });

            objTemp['children'] = objTempChild;
            this.tematicasMapa.set(padre, [objTempChild]);
          }
        });

        this.tematicasMapa.forEach((data, l) => {
          let o = {
            name: l,
            children: data[0],
          };
          objTree.push(o);
        });
        this.dataSourceTematica.data = objTree;
      })
      .add(() => {
        this.cargandoTematica = false;
      });
  }

  public hasChild = (_: number, node: TematicaNode) =>
    !!node.children && node.children.length > 0;
  public hasChildTematica = (_: number, node: TematicaNode) =>
    !!node.children && node.children.length > 0;
}
