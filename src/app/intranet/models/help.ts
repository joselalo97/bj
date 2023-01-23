export class HelpModel {
  campo: string;
  descripcion: string;
  ejemplo?: string;
  link?: number;
}

export class TabsSentenciaModel {
  table: TablaSentenciaModel[] = [];
  name: string;
  active: boolean;
}

export class TablaSentenciaModel {
  campo: string;
  descripcion: string;
}
