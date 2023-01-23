export interface Epoca {
  numero: string;
  nombre: string;
}

export interface Localizacion {
  pagina: number;
  libro: string;
  mes: number;
  tomo?: any;
  anio: number;
}

export interface Texto {
  contenido: string;
  justificacion: string;
  hechos: string;
  criteriosJuridicos: string;
}

export interface NotaPrecedente {
  texto: string;
  tipoAsunto: string;
  numExpediente: string;
}

export interface DocTesisModel {
  rubro: string;
  epoca: Epoca;
  tipo: string;
  subtitulo: string;
  fuente: string;
  notas: string;
  titulo: string;
  fechaPublicacionObligatoriedad: string;
  fechaPublicacionSemanario: string;
  circuito?: any;
  instancia: string;
  localizacion: Localizacion;
  id: string;
  rdEjecutoria: number[];
  organoJurisdiccional: string;
  clave: string;
  semanarioSemanal: number;
  idOriginal?: any;
  texto: Texto;
  rdVotos: number[];
  materia: string[];
  formasIntegracion: string;
  registroDigital: number;
  notaPrecedente: NotaPrecedente[];
  genealogia?: any;
}
