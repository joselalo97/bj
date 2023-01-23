import {
  Epoca,
  Localizacion,
  NotaPrecedente,
  Texto,
} from './document-tesis.model';

export interface Content {
  id: string;
  circuito: string;
  clave: string;
  epoca: Epoca;
  fechaPublicacionObligatoriedad: string;
  fechaPublicacionSemanario: string;
  formasIntegracion: string;
  fuente: string;
  genealogia?: any;
  instancia: string;
  localizacion: Localizacion;
  materia: string[];
  normativa?: any;
  notaPrecedente: NotaPrecedente[];
  notas: string;
  organoJurisdiccional: string;
  precedentes?: any;
  registroDigital: number;
  rubro: string;
  subtitulo: string;
  texto: Texto;
  tipo: string;
  titulo: string;
  extractos: any[];
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface TesisRelacion {
  content: Content[];
  pageable: Pageable;
  facets: any[];
  aggregations?: any;
  scrollId?: any;
  maxScore: number;
  totalElements: number;
  totalPages: number;
  sort: Sort2;
  first: boolean;
  numberOfElements: number;
  last: boolean;
  size: number;
  number: number;
  empty: boolean;
}
