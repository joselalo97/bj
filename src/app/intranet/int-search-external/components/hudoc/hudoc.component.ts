import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsExternalService } from '@intranet/services/results-external.service';

@Component({
  selector: 'hudoc',
  templateUrl: './hudoc.component.html',
  styleUrls: ['./hudoc.component.scss'],
})
export class HudocComponent {
  public query: string = '';
  public resultados: any;
  public totalResultados: any;
  public size_result: number = 20;
  public paginaActual: number = 0;
  public isLoad: boolean;
  constructor(
    private param: ActivatedRoute,
    private router: Router,
    private externalService: ResultsExternalService
  ) {
    this.param.paramMap.subscribe((data) => {
      this.query = this.router.url.split('/')[3];
      this.onSelectPage(1);
    });
  }

  public onSelectPage(pagina: number) {
    this.isLoad = true;
    this.externalService
      .gerResultsHUDOC(this.query, 20, pagina)
      .subscribe((data) => {
        this.isLoad = false;
        this.totalResultados = data.resultcount;
        this.resultados = data.results;
        this.paginaActual = pagina;
      });
  }
}
