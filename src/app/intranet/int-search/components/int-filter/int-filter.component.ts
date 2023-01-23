import { Component, Input, OnInit } from '@angular/core';
import { Filters } from 'app/core/models/filters';

@Component({
  selector: 'int-filter',
  templateUrl: './int-filter.component.html',
  styleUrls: ['./int-filter.component.scss']
})
export class IntFilterComponent implements OnInit {

  _entidades: any[] = [];
  filtersBuckets: Filters[] = [];

  @Input() set entities(arg:any[]){
    if(typeof arg != 'undefined'){
      this._entidades = arg
    }
  }

  get entities(){
    return this._entidades
  }

  @Input() set subFilters(fill: Filters[]){
    if(fill.length > 0){
      this.filtersBuckets = fill
    }
  }

  get subFilters():Filters[]{
    return this.filtersBuckets;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
