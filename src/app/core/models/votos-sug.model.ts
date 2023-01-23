import { Epoca, Localizacion } from './document-tesis.model';

export interface VotosSugerencia {
  epoca: Epoca;
  fuente: string;
  localizacion: Localizacion;
  id: string;
  tipoAsunto: string;
  numeroExpediente: string;
  promovente: string;
  registroDigital: string;
}
