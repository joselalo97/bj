    export class Bucket {
        filtro: string;
        filtroId: string;
    }

    export class Filtro {
        filtro: string;
        orden: string;
        tipo: string;
        buckets: Bucket[] = [];
        bucketsSeleccionados: any[];
        includeAggs: any[];
        masFiltros: boolean;
        masFiltrosVisble: boolean;
        nombreFiltro: string;
    }

    export class Filters {
        filtros: Filtro[] = [];
    }