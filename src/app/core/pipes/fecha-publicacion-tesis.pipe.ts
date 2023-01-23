import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaPublicacionTesis',
})
export class FechaPublicacionTesisPipe implements PipeTransform {
  transform(value: string, entidad: string = '', ...args: unknown[]): unknown {
    if (value != null && entidad != null) {
      let fechaPartes = value.split(' ');
      let tipo = entidad;
      let partesDias = fechaPartes[0].split('/');
      let hora: any = fechaPartes[1].split(':');
      hora = hora[0] + ':' + hora[1];
      let inicio = '';
      tipo == 'voto' ? (inicio = 'Este ') : (inicio = 'Esta ');
      let month = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
      };
      let fecha =
        partesDias[0] +
        ' ' +
        month[partesDias[1]] +
        ' ' +
        partesDias[2] +
        ' ' +
        hora;
      let dt = new Date(fecha);
      let dias = {
        0: 'domingo',
        1: 'lunes',
        2: 'martes',
        3: 'miércoles',
        4: 'jueves',
        5: 'viernes',
        6: 'sábado',
      };
      let mes = {
        '01': 'enero',
        '02': 'febrero',
        '03': 'marzo',
        '04': 'abril',
        '05': 'mayo',
        '06': 'junio',
        '07': 'julio',
        '08': 'agosto',
        '09': 'septiembre',
        '10': 'octubre',
        '11': 'noviembre',
        '12': 'diciembre',
      };
      return (
        inicio +
        tipo +
        ' se publicó el ' +
        dias[dt.getUTCDay()] +
        ' ' +
        partesDias[0] +
        ' de ' +
        mes[partesDias[1]] +
        ' de ' +
        partesDias[2] +
        ' a las ' +
        hora +
        ' horas en el Semanario Judicial de la Federación.'
      );
    }
  }
}
