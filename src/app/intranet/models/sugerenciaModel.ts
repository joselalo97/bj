export class SugerenciaModel {
  acuerdos: ContText[] = [];
  biblioteca: ContText[] = [];
  cidh: ContText[] = [];
  cidh2: ContText[] = [];
  cij: ContText[] = [];
  coidh: ContText[] = [];
  hudoc: ContText[] = [];
  legislacion: ContText[] = [];
  protocolos_actuacion_dh: ContText[] = [];
  sentencias: ContText[] = [];
  sentencias_pub: ContText[] = [];
  supremecourtusa: ContText[] = [];
  tcespanol: ContText[] = [];
  tesis: ContText[] = [];
  votos: ContText[] = [];
}

export class ContText {
  value: string;
  text: string;
}
