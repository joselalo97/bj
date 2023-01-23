
export interface Relation {
    id_asunto: number;
    pertenencia: string;
    tipo_asunto: string;
    num_exp: string;
    entidad: string;
    fecha_resolucion: string;
    id_sentencia: number;
    anio: number;
    instancia: string;
    acuerdo: string;
    ley: string;
    epoca: string;
    titulo: string;
    registro_digital?: number;
    materias: string;
}

export interface RedConocimiento {
    engrose: number;
    relation: Relation[];
}
