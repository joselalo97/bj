
import { Environments } from '@core/constants';

// WEB-COMPONENTS
const scriptsHost: string = 'http://127.0.0.1:8080';
const scriptsFolder: string = 'scjn';
const scriptUrls: string = `${scriptsHost}/${scriptsFolder}`;

export const environment = {
  environmentType: Environments.Pub,
  production: false,
  autocompleteActivated: true,
  hardCode: true,
  notificationActivated: false,
  scriptUrls,
  urlScjn: 'https://bj.scjn.gob.mx/',
  urlScjnOpen: 'http://bj.scjn.gob.mx/',
  urlFiles: 'https://www2.scjn.gob.mx/',
  urlLegislacion: 'https://legislacion.scjn.gob.mx/',
  urlWebSocket: 'http://172.16.161.10:8080/',
  urlCorteIdh: 'https://corteidh.scjn.gob.mx/',
  urlSistemaDenu: 'https://sistemadenu.scjn.gob.mx/',
  urlSugerenciasSentencias: 'https://bj.scjn.gob.mx/api/sug-docs/',
  urlProcesamiento: 'http://172.16.214.22:8080/asistentev/',
  urlFilesPdf: "https://bj.scjn.gob.mx/api/archivos/storage/"
};
