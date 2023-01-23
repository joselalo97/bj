import { Component, Input, OnInit } from '@angular/core';
import { Filters } from 'app/core/models/filters';

@Component({
  selector: 'pub-filter',
  templateUrl: './pub-filter.component.html',
  styleUrls: ['./pub-filter.component.scss']
})
export class PubFilterComponent implements OnInit {

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
    if(fill == null) {
      this.filtersBuckets = null;
    } else
    if(fill.length > 0){
      this.filtersBuckets = fill
    } else {
      this.filtersBuckets = []
    }
  }

  get subFilters():Filters[]{
    return this.filtersBuckets;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
