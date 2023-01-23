import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResultService } from '@core/services';
import { QueryParams } from 'app/core/models/queryParams';
import { Selected } from './model/searchResult';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  selectedField: string = 'todos';
  optionsSearch: Selected[] = [];
  queryParams: QueryParams = new QueryParams();
  labels: string[] = [];
  text: string = '';
  isLoad: boolean = undefined;
  isTesauro: boolean = false;
  word: string = "";

  constructor(private param: ActivatedRoute, private router: Router,
    private resultService: ResultService) {
    this.param.queryParamMap.subscribe((map: ParamMap) => {
      this.isTesauro = false;
      this.isLoad = true;
      this.text = '';
      this.optionsSearch = [];
      this.selectedField = 'todos';
      this.queryParams = new QueryParams();
      const keys = map.keys;
      keys.forEach((k) => {
        this.queryParams[k] = map.get(k);
      });
      this.word = map.get('q')
      if (this.queryParams.indice) this.getSourceSearch(map.get('indice'));
      this.labels = keys.includes('busquedaResultados')
        ? this.labelSearchExact(map.get('busquedaResultados'))
        : [];
      
      if(this.word){
        this.getWordTeasuro(this.word)
      }

      this.isLoad = false;
    });
  }

  ngOnInit(): void {}

  private getWordTeasuro(query:string){
    this.resultService.getTesauro(query).subscribe(
      success=>{
        this.isTesauro = success;
      }
    )
  }

  public searchExact(): void {
    let query: string = 'AND ';
    if (this.text) {
      query +=
        this.selectedField == 'todos'
          ? this.text
          : `${this.selectedField}:${this.text}`;
    }
    this.labels.push(query);
    this.queryParams.busquedaResultados = this.labels.join(',');
    this.router.navigate(['busqueda'], {
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  private async getSourceSearch(indice: string) {
    await fetch('./assets/data/fuentes-busquedas.json')
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          this.optionsSearch = data[indice] ? data[indice] : [];
        }
      });
  }

  private labelSearchExact(textSearch: string): string[] {
    let words: string[] = [];
    if (textSearch?.includes(',')) {
      const parts = textSearch.split(',');
      words = parts;
    } else {
      words.push(textSearch);
    }
    return words;
  }

  public editLabel(label: string): void {
    if (label?.includes(':')) {
      this.text = label.split('AND')[1].trim().split(':')[1].trim();
      this.selectedField = label.split('AND')[1].trim().split(':')[0];
    } else {
      this.text = label.split('AND')[1].trim();
      this.selectedField = 'todos';
    }
  }

  public clearLabel(index: number): void {
    this.labels.splice(index, 1);
    this.queryParams.busquedaResultados =
      this.labels.length > 0 ? this.labels.join(',') : null;
    this.router.navigate(['busqueda'], {
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
