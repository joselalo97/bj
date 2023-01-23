import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsExternalService } from '@intranet/services/results-external.service';

@Component({
  selector: 'e-libro',
  templateUrl: './e-libro.component.html',
  styleUrls: ['./e-libro.component.scss'],
})
export class ELibroComponent {
  public query: string = '';
  public page: number;
  public cargando: boolean;
  public resultados: any;
  public totalResultados: any = 0;
  public paginaActual: number;
  public resultadosPorPagina: number;
  public isLoad: boolean;
  constructor(
    private param: ActivatedRoute,
    private router: Router,
    private externalService: ResultsExternalService
  ) {
    this.param.paramMap.subscribe((data) => {
      this.query = this.router.url.split('/')[3];
      this.query = this.query.includes('*') ? 'all' : this.query;
      this.getResultados(this.query, 10, 1);
    });
  }

  private getResultados(q: string, page_size: number, page: number) {
    this.isLoad = true;
    this.externalService
      .getResultadosElibro(q, page_size, page)
      .subscribe((data) => {
        this.resultados = data.results;
        this.isLoad = false;
        if (data.total_count >= 1) {
          this.totalResultados = data.total_count;
          this.paginaActual = data.current_page;
          this.resultadosPorPagina = 10;
        } else {
          this.totalResultados = 0;
        }
      });
  }

  public onSelectPage(pagina) {
    if (pagina) {
      this.getResultados(this.query, 10, pagina);
    }
  }
}
