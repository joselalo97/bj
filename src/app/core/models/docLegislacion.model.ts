export interface Articulo {
  vigencia: string;
  contenido: string;
  fechaActualizacion: string;
  id: number;
  referencia: string;
  numero?: number;
}

export interface LegislacionModel {
  vigencia: string;
  estado?: any;
  articulos: Articulo[];
  municipio?: any;
  reformaExtracto: string;
  fechaPublicado: string;
  reformaId: number;
  resumen: string;
  idOriginal: number;
  poder: string;
  pais: string;
  ordenamiento: string;
  categoriaReforma: string;
  ambito: string;
  materia: string[];
  id: string;
  categoriaOrdenamiento: string;
  organo: string;
}
