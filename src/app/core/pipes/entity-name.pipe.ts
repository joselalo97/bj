import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entityName',
})
export class EntityNamePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    let entidades = new Map();

    entidades.set('tesis', 'Tesis');
    entidades.set('cij', 'Corte Internacional de Justicia');
    entidades.set('legislacion', 'Ordenamientos');
    entidades.set('coidh', 'CoIDH');
    entidades.set('sentencias', 'Sentencias');
    entidades.set('sentencias_parrafos', 'Sentencias');
    entidades.set('sentencias_pub', 'Sentencias');
    entidades.set('cidh', 'CIDH');
    entidades.set('caselawhp', 'Case.law');
    entidades.set('courtlistener', 'Court Listener');
    entidades.set('tcespanol', 'TC Español');
    entidades.set('pjcr', 'Poder Judicial CR');
    entidades.set('onu', 'Consejo de las Naciones Unidas');
    entidades.set('hudoc', 'Corte Europea DH');
    entidades.set('cccolombia', 'CC Colombia');
    entidades.set('supremecourtusa', 'SC EUA');
    entidades.set('ohchr', 'Naciones Unidas');
    entidades.set('biblioteca', 'Acervo bibliotecario');
    entidades.set('telectoral', 'TEPJF');
    entidades.set('cadh', 'Corte Africana DH');
    entidades.set('corteuk', 'SC Reino Unido');
    entidades.set('tcaleman', 'TC Alemania');
    entidades.set('cij', 'Corte Internacional');
    entidades.set('hcaustralia', 'Corte Australiana');
    entidades.set('votos', 'Votos');
    entidades.set('acuerdos', 'Acuerdos');
    entidades.set('csjnargentina', 'CSJN de Argentina');
    entidades.set('tcchile', 'TC de Chile');
    entidades.set('ccj_cursos', 'Casas de Cultura Jurídica');
    entidades.set('cpi', 'Corte Penal');
    entidades.set('ccitaliana', 'CC de Italia');
    entidades.set('vtaquigraficas', 'V. taquigráficas');
    entidades.set('bjdh_coidh', 'CoIDH');
    entidades.set('bjdh', 'CoIDH');
    entidades.set('suniversal', 'ONU');
    entidades.set('protocolos_actuacion_dh', 'Protocolos de actuación');

    if (entidades.has(value)) return entidades.get(value);
    else return value;
  }
}
