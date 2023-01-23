export interface BucketModel {
   filtro: string;
   filtroId: string;
}

export interface FilterModel {
   buckets: BucketModel[];
   bucketsFormat?: any[];
   bucketsSeleccionados: BucketModel;
   filtro: string;
   includeAggs: any[];
   masFiltros: boolean;
   masFiltrosVisble: boolean;
   nombreFiltro: string;
   orden: string;
   tipo: string;
}

export interface EntityFilterModel {
   filtros: FilterModel[];
}