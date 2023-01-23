import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertQuery } from '@intranet/models/convertQuery';
import { QueryParams } from 'app/core/models/queryParams';
import { ResultadosModel } from 'app/core/models/results';

@Component({
  selector: 'paginated',
  templateUrl: './paginated.component.html',
  styleUrls: ['./paginated.component.scss'],
  providers: [ConvertQuery]
})
export class PaginatedComponent implements OnInit {
  document: ResultadosModel = {} as ResultadosModel;
  isLoad: boolean;
  params: QueryParams = new QueryParams();
  @ViewChild('paginated', { static: false }) public pag: ElementRef<HTMLElement>

  @Input() set paginated(doc: ResultadosModel) {
    this.isLoad = true;
    if (doc.total > 0) {
      this.document = doc;
      this.isLoad = false;
      setTimeout(() => {
        let list = this.pag.nativeElement.children[0].children[0].children

        for (let index = 0; index < list.length; index++) {
          const nodes = list[index].children[0].childNodes
          const tagA = list[index].children[0] as HTMLLinkElement
          nodes.forEach(node => {
            if (node instanceof Text) {
              tagA.href = this.addUrlPaginated((node.textContent != '...') ? node.textContent : '')
              node.textContent = (node.textContent != '...') ? new Intl.NumberFormat('en-EN').format(Number(node.textContent)).toString()
                : node.textContent
            }
          })
        }

      }, 100)
    } else {
      if (doc.total == 0) {
        this.document = new ResultadosModel()
        this.isLoad = false;
      }

    }
  }

  get paginated() {
    return this.document;
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private convertParams: ConvertQuery) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query) => {
      this.params = new QueryParams();
      const keys = Object.keys(query['params']);
      keys.forEach((k) => {
        this.params[k] = query['params'][k];
      });
    });
  }


  public onChangePage(page: number): void {
    this.params.page = page;
    this.router.navigate(['/busqueda'], { queryParams: this.params });
  }


  private addUrlPaginated(pag: string): string {
    this.params.page = Number(pag)
    return `./busqueda${this.convertParams.convertQueryParamsResults(this.params)
      .replace('pagina', 'page').replace('subfiltros', 'subFiltros')}`;
  }

}
