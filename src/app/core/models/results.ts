export class Entity {
    entidad: string;
    resultados: number;
}

export class Extract {
}

export class Id {
    id: string;
    type: string;
}

export class ResultadosModel {
    total: number
    entidades: any;
    resultados: any[] = [];
    ids: Id[] = [];
    didyoumean: any[] = [];
    pagina: number = 0;
    size: number = 10;
    from: number = 0;
    qTranslate: string = "";
    fromTo: number = 0;
}