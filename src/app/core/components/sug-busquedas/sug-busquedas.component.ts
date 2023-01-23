import { Component } from '@angular/core';
import { environment } from '@environment/environment';

@Component({
  selector: 'sug-busquedas',
  templateUrl: './sug-busquedas.component.html',
  styleUrls: ['./sug-busquedas.component.scss'],
})
export class SugBusquedasComponent{

  isPublic:boolean = environment.environmentType == 'Pub' ? true : false

}
