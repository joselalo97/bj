import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PanelTextService {
  openPanel: boolean = false;

  private panel = new BehaviorSubject<Options>({ open: false, query: '' });

  public options = this.panel.asObservable();
  public changeMessage(opt: Options): void {
    this.panel.next(opt);
  }

  constructor() {}
}

export interface Options {
  open: boolean;
  query: string;
}
