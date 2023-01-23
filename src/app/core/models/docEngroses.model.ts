import { Epoca, Localizacion } from './document-tesis.model';

export interface TesiBody {
  organoJurisdiccional: string;
  rubro: string;
  epoca: Epoca;
  fechaPublicacionSemanario?: any;
  tipo: string;
  instancia: string;
  localizacion: Localizacion;
  index: string;
  id: string;
  registroDigital: any;
}

export interface Sentencia {
  tema: string;
  organoRadicacion: string;
  ponente: string;
  index: string;
  id: string;
  fechaResolucion: Date;
  numExpediente: string;
  tipoAsunto: string;
}

export interface EngroseModel {
  tesis: TesiBody[];
  sentencias: Sentencia[];
}
