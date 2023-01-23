import { Component, Input } from '@angular/core';

@Component({
  selector: 'v-tcaleman',
  templateUrl: './v-tcaleman.component.html',
  styleUrls: ['./v-tcaleman.component.scss'],
})
export class VTcalemanComponent {
  titulo: string = '';

  document: any;
  @Input()
  set documento(doc: any) {
    if (doc) {
      this.document = doc;
    }
  }

  constructor() {}
}
