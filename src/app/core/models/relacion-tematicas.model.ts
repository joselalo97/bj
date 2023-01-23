export interface Tesi {
  rubro: string;
  id: string;
}

export interface RelacionesTematicas {
  temaPadre: string;
  id: string;
  temaHijo: string;
  type: string;
  tesis: Tesi[];
  temaSinonimos: string;
  temaRelacionProxima: string;
}
