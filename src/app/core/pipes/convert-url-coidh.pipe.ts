import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUrlCOIDH',
})
export class ConvertUrlCOIDHPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    let url: string = '';
    if (value.includes('url:')) {
      url = value
        .split('url:')[1]
        .split('<br>')[0]
        .split('</strong>')[1]
        .trim();
    }
    return url;
  }
}
