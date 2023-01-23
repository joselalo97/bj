import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUnit'
})
export class ConvertUnitPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return value ? new Intl.NumberFormat('en-EN').format(value) : ''
  }

}
