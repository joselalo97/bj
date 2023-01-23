import { Component, Input, OnInit } from '@angular/core';
import { ModelVotos } from '@core/models';


@Component({
  selector: 'v-votos',
  templateUrl: './v-votos.component.html',
  styleUrls: ['./v-votos.component.scss'],
})
export class VVotosComponent {

  votos: ModelVotos = {} as ModelVotos;
  isLoad: boolean = true

  @Input() set documento(doc:ModelVotos){
    this.isLoad = true
    if(doc.texto){
      this.votos = doc
      this.isLoad = false;
    }
  }

  get documento():ModelVotos{
    return this.votos
  }

  constructor() {}
}
