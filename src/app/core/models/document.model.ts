import { Relation } from "./red-conocimiento.model";

export interface Resuelve {
  parrafo: string;
  noParrafo: number;
}

export interface Firman {
  parrafo: string;
  noParrafo: number;
}

export interface Preambulo {
  parrafo: string;
  noParrafo: number;
}

export interface Resultando {
  parrafo: string;
  noParrafo: number;
}

export interface Considerando {
  parrafo: string;
  noParrafo: number;
}

export interface DocumentModel {
  secretario: string;
  ponente: string;
  asuntoID: number;
  resuelve: Resuelve[];
  hdEntidad: string;
  organoRadicacion: string;
  id: string;
  numExpediente: string;
  tipoDatoSensible: string;
  firman: Firman[];
  archivo: string;
  preambulo: Preambulo[];
  resultando: Resultando[];
  registroDigital: any;
  puntosResolutivos: string;
  idOriginal?: any;
  fechaResolucion: Date;
  considerando: Considerando[];
  semanarioSemanal: number;
  fechaEntidad: Date;
  tema: string;
  idEngrose: number;
  datosSensibles: string;
  tipoAsunto: string;
  votacion: string;
  idTipoEngrose: number;
  anio: number;
  tipo?: any;
  archivoURL?:string
  hasNoPresente: boolean
  relacion?: Relation[]
}

export interface Marks {
  active: boolean
  marks: NodeListOf<Element>
}
