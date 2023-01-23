
    export class Descripcion {
        objetivo: string;
        resumen: string;
    }

    export class Caso {
        nbMaterial: string = "";
        url: string  ="";
    }

    export class Referencia {
        nbMaterial: string = "";
        url: string = "";
    }

    export class MaterialesApoyo {
        casos: Caso[] = [];
        referencias: Referencia[] = [];
        obras: any[] = [];
    }

    export class Tema {
        parent: number;
        nbTema: string;
        minVideo: number;
        orden: number;
    }

    export class Disertante {
        cargo: string = "";
        nombre: string = "";
    }

    export class Moderador {
        cargo: string = "";
        nombre: string = "";
    }

    export class Diplomado {
        descripcion: Descripcion = new Descripcion();
        periodicidad?: any;
        subtitulo: boolean;
        nbCurso: string;
        urlTransmision: string;
        fhsesion: string;
        materialesApoyo: MaterialesApoyo;
        numeroSesiones: number;
        type: string;
        unidadFacilitador: string;
        formaImparticion: string;
        id: string;
        temas: Tema[] = [];
        medio: string;
        publicado: boolean;
        tipoCurso: string;
        disertante: Disertante[] = [];
        clave: string;
        temaSesion: string;
        numeroHoras: number;
        idOriginal: string;
        participante: string;
        interpretacionEnLenguaDeSenias: boolean;
        lugarImparticion?: any;
        moderador: Moderador[] = [];
        modulo: string;
        materias: string[] = [];
        anio: number;
    }