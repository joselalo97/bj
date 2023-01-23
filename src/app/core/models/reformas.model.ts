export interface Resultado {
  vigencia: string;
  estado?: any;
  subcategoriaReforma: string;
  reformaId: number;
  type: string;
  seccionPublicacion: string;
  tieneArticulos: boolean;
  fechaExpedicion: string;
  pdf: string;
  categoriaReforma: string;
  ambito: string;
  tieneProcesos: boolean;
  id: number;
  reforma: string;
  fechaPublicacion: string;
}

export interface ReformasModel {
  from: number;
  fromTo: number;
  total: number;
  pagina: number;
  size: number;
  resultados: Resultado[];
}
