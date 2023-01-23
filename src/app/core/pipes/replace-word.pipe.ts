import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceWord',
})
export class ReplaceWordPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return (value = value === 'CONSTITUCION' ? 'CONSTITUCIÓN' : value);
  }
}
