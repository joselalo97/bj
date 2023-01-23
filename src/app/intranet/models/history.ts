export class BusquedasLocal {
  palabra: string;
  fecha: string;
  nivel: number;
  principal: string;
  children?: BusquedasLocal[];
  link: string;
}

export class HistorialModel {
  id: string;
  username: string;
  busqueda: string;
  fecha: string;
  filtros: Filtros[] = [];
  queryBusqueda: string;
}

export class Filtros {
  valor: string;
  tipo: string;
  fecha: string;
}
