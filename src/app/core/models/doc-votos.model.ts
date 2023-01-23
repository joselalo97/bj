export interface EpocaV {
    numero: string;
    nombre: string;
}

export interface LocalizacionV{
    pagina: string;
    libro: string;
    mes: number;
    tomo?: any;
    anio: number;
}

export interface ModelVotos {
    organoJurisdiccional: string;
    epoca: EpocaV;
    rubro: string;
    fuente: string;
    notaPublica: string;
    semanarioSemanal: number;
    idOriginal?: any;
    fechaPublicacionObligatoriedad: string;
    numeroExpediente: string;
    texto: string;
    fechaPublicacionSemanario: string;
    tipoVoto: string;
    instancia: string;
    localizacion: LocalizacionV;
    clasificacion: string;
    id: string;
    tipoAsunto: string;
    promovente: string;
    registroDigital: number;
    tesis: string;
    emisor: string;
}