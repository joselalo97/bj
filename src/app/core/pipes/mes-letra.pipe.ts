import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesLetra'
})
export class MesLetraPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    let mes = value;
    let meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    return meses[mes];
  }

}
