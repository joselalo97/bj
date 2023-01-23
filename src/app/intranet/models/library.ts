export class Documento {
  idCarpeta: number;
  idDocumento: string;
  fechaAgregacion: string;
  orden?: any;
}

export class Content {
  id: number;
  nombre: string;
  descripcion: string;
  publico: boolean;
  habilitado: boolean;
  username: string;
  fechaCreacion: string;
  fechaModificacion: string;
  documentos: Documento[] = [];
  suscripciones: any[] = [];
  carpetaOrigen?: any;
  idCarpeta: number;
  idDocumento: string;
  fechaAgregacion: string;
  orden?: any;
}

export class Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export class Pageable {
  sort: Sort = new Sort();
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export class Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export class LibraryResults {
  content: Content[] = [];
  pageable: Pageable = new Pageable();
  totalElements: number;
  last: boolean;
  totalPages: number;
  sort: Sort2 = new Sort2();
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export class Folder {
  id: number;
  nombre: string;
  descripcion: string;
  publico: boolean;
  habilitado: boolean;
  username: string;
  fechaCreacion: string;
  fechaModificacion: string;
  documentos: Documento[] = [];
  suscripciones: any[];
  carpetaOrigen?: any;
}

export class CommitsModel {
  id: number;
  username: string;
  idCarpeta: number;
  texto: string;
  orden?: any;
  fechaCreacion: string;
  comentarioOrigen?: any;
}

export class Subs {
  username: string;
  idCarpeta: number;
  fechaSuscripcion: string;
  ultimaVisualizacion: string;
}
