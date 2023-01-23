import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LectorVoiceService {
  private view: boolean = false;

  constructor() {}

  public set lector(active: boolean) {
    this.view = active;
  }

  public get lector(): boolean {
    return this.view;
  }
}
