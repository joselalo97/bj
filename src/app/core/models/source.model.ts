export interface SourceItemModel {
   value: string;
   text: string;
}

export interface SourceModel {
   acuerdos: SourceItemModel[];
   biblioteca: SourceItemModel[];
   cidh: SourceItemModel[];
   cidh2: SourceItemModel[];
   cij: SourceItemModel[];
   coidh: SourceItemModel[];
   hudoc: SourceItemModel[];
   legislacion: SourceItemModel[];
   protocolos_actuacion_dh: SourceItemModel[];
   sentencias: SourceItemModel[];
   sentencias_pub: SourceItemModel[];
   supremecourtusa: SourceItemModel[];
   tcespanol: SourceItemModel[];
   tesis: SourceItemModel[];
   votos: SourceItemModel[];
}