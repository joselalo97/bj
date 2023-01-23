import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'int-international-bodies',
  templateUrl: './int-international-bodies.component.html',
  styleUrls: ['./int-international-bodies.component.scss']
})
export class IntInternationalBodiesComponent implements OnInit {

  urlSistemaOnu = environment.urlSistemaDenu;
  urlCoidh = environment.urlCorteIdh
  constructor() { }

  public ngOnInit(): void { }

}
