import { Pipe, PipeTransform } from '@angular/core';
import { Entities } from '../constants/entities.enum';

@Pipe({
  name: 'titulosViewer',
})
export class TitulosViewerPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let entidades = new Map();
    entidades.set(Entities.Thesis, 'Tesis');
    entidades.set(Entities.Legislation, 'Ordenamiento');
    entidades.set(Entities.Coidh, 'Caso');
    entidades.set('engroseparrafos', 'Engrose');
    entidades.set(Entities.CIDH, 'CIDH');
    entidades.set(Entities.CaseLawHp, 'Case.law');
    entidades.set(Entities.TSpanish, 'Tribunal Constitucional Español');
    entidades.set('onu', 'UN Human Rights');
    entidades.set(Entities.Hudoc, 'Corte Europea');
    entidades.set(Entities.Votes, 'Votos');
    entidades.set(Entities.Agreements, 'Acuerdos');
    entidades.set(Entities.TColombia, 'Corte Constitucional de Colombia');
    entidades.set(Entities.CourtUS, 'Supreme Court US');
    entidades.set(Entities.Ohchr, 'OHCHR Jurisprudence');
    entidades.set(Entities.Library, 'Acervo bibliotecario');
    entidades.set(Entities.Telectoral, 'TEPJF');
    entidades.set(Entities.Cadh, 'Corte Africana de Derechos Humanos');
    entidades.set(Entities.CourtRS, 'Suprema Corte UK');
    entidades.set(Entities.CIJ, 'Corte Internacional');
    entidades.set(Entities.CourtAustralia, 'Corte Australiana');
    entidades.set(Entities.CSJNArgentina, 'CSJN de Argentina');
    entidades.set(Entities.TChile, 'TC de Chile');
    entidades.set(Entities.Cpi, 'Corte Penal');
    entidades.set(Entities.CCItaly, 'CC de Italia');
    entidades.set(Entities.Versions, 'V. taquigráficas');
    entidades.set(Entities.CoIDH, 'CoIDH');
    entidades.set(Entities.Onu, 'ONU');
    if (entidades.has(value)) return entidades.get(value);
    else return value;
  }
}
