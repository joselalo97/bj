import { Environments } from '@core/constants';

// WEB-COMPONENTS
const scriptsHost: string = 'http://127.0.0.1:8080';
const scriptsFolder: string = 'scjn';
const scriptUrls: string = `${scriptsHost}/${scriptsFolder}`;

export const environment = {
  environmentType: Environments.Qa,
  production: false,
  autocompleteActivated: true,
  hardCode: true,
  notificationActivated: false,
  scriptUrls,
  urlScjn: 'https://bj.scjn.pjf.gob.mx:8443/',
  urlScjnOpen: 'https://bj.scjn.pjf.gob.mx:8443/',
  urlFiles: 'http://mxscjnbiblio.scjn.pjf.gob.mx/',
  urlLegislacion: 'https://legislacion.scjn.gob.mx/',
  urlWebSocket: 'https://bj.scjn.pjf.gob.mx:8443/',
  urlCorteIdh: 'https://corteidh.scjn.gob.mx/',
  urlSistemaDenu: 'https://sistemadenu.scjn.gob.mx/',
  urlPortada: 'http://172.29.30.39/',
  urlSugerenciasSentencias: 'https://bj.scjn.pjf.gob.mx:8443/sug-docs/',
  urlProcesamiento: 'http://172.16.214.22:8080/asistentev/',
  urlFilesPdf: "https://bj.scjn.pjf.gob.mx:8443/archivos2/storage/"
};
