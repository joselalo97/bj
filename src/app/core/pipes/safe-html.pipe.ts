import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHTML',
})
export class SafeHTMLPipe implements PipeTransform {
  constructor(public sanitized: DomSanitizer) {}

  transform(value: any, ...args: unknown[]): unknown {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
