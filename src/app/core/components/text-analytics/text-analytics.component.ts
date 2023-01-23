import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Entities } from '@core/constants';
import { AnalitycTextService } from '@core/services';
import { environment } from '@environment/environment';
import { EntityResultData, ResultData } from 'app/core/models/entityResultData';

@Component({
  selector: 'text-analytics',
  templateUrl: './text-analytics.component.html',
  styleUrls: ['./text-analytics.component.scss'],
})
export class TextAnalyticsComponent implements OnInit {
  tabActive = 2;
  query: string = '';
  entity: string = '';
  subFiltros: string = '';
  resultsEntity: ResultData[] = [];
  isLoad: boolean = false;
  entityName = Entities;
  isOpen: boolean = false;
  selectedItems: any = {};
  isExpand: boolean = false;
  filtrosEntidad: any;
  subFiltrosMap: Map<String, any> = new Map<String, any>();
  settings = {
    singleSelection: false,
    idField: 'filtroId',
    textField: 'filtro',
    enableCheckAll: false,
    allowSearchFilter: false,
    clearSearchFilter: true,
    maxHeight: '100%',
    itemsShowLimit: 3,
    searchPlaceholderText: 'Buscar',
    noDataAvailablePlaceholderText: '',
    closeDropDownOnSelection: true,
    showSelectedItemsAtTop: false,
    defaultOpen: false,
  };
  file: any[];
  isSearch: boolean = false;
  notfound: string = "No se encontraron resultados";
  isInter: boolean = environment.environmentType == 'Qa'

  @Input() set open(view: boolean) {
    if (view) {
      this.isOpen = view;
      this.tabActive = 2;
      this.resultsEntity = [];
      this.query = '';
      this.isExpand = false;
      this.isSearch = false;
      this.document.body.style.overflow = 'hidden';
    }
  }

  get open(): boolean {
    return this.isOpen;
  }

  @Input() set text(query: string) {
    if (query != '' && query != undefined) {
      this.query = query;
      this.analiticText();
    }
  }

  get text(): string {
    return this.query;
  }

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private analitycService: AnalitycTextService,
    private entityResult: EntityResultData,
    public sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void { }

  private searchTextAnalityc() {
    this.isLoad = true;
    this.resultsEntity = [];
    const data = {
      from: 0,
      size: 0,
      pagina: 0,
      texto: this.query,
      subfiltros: this.subFiltros,
    };
    this.subFiltros == '' ? delete data.subfiltros : data.subfiltros;
    this.analitycService
      .searchTextAnalityc(this.entity, data)
      .toPromise()
      .then((res) => {
        if (res.docs.length > 0) {
          this.isLoad = false;
          this.isSearch = true;
          res.docs.forEach((data) => {
            if (data.indice != Entities.Legislation) {
              this.resultsEntity.push(
                this.entityResult.ConverDataHTMLAnalitycText(data)
              );
            }
          });
        } else {

        }

      }, error => {
        this.isLoad = false;
        this.isSearch = true;
      })
      .finally(() => (this.isLoad = false));
  }

  public onChageEntity(name: string) {
    if (this.entity) {
      this.entity = '';
      this.subFiltros = '';
      this.subFiltrosMap = new Map();
      this.searchTextAnalityc();
      this.getFilters();
    } else {
      if (this.isInter) {
        this.entity = name == Entities.SentencesParagraph ? Entities.Sentences : name
      } else {
        this.entity = name == Entities.SentencesParagraph ? Entities.Sentences_pub : name
      }
      this.searchTextAnalityc();
      this.getFilters();
    }
  }

  private getFilters() {
    this.analitycService
      .getFiltrosSugerencias(this.query, this.entity, 0, 100, this.subFiltros)
      .subscribe((response) => {
        this.filtrosEntidad = response.filtros;
        if (response.filtros) {
          response.filtros.forEach((f) => {
            this.selectedItems[f['filtro']] = f['bucketsSeleccionados'];
          });
        }
      });
  }

  selectSubfiltro(e: any, subFiltro: string) {
    this.subFiltrosMap.set(subFiltro, e.filtroId);
    this.getMapFilter();
  }

  getMapFilter() {
    this.subFiltros = '';
    this.subFiltrosMap.forEach((data, key) => {
      this.subFiltros = this.subFiltros + key + ':' + data + ',';
    });
    this.subFiltros = this.subFiltros.substring(0, this.subFiltros.length - 1);
    this.searchTextAnalityc();
    this.getFilters();
  }

  quitarFiltro(e: any, subFiltro: string) {
    if (this.subFiltrosMap.has(subFiltro)) {
      this.subFiltrosMap.delete(subFiltro);
      if (this.subFiltrosMap.size == 0) {
        this.subFiltros = '';
        this.searchTextAnalityc();
        this.getFilters();
      } else {
        this.getMapFilter();
      }
    }
  }

  public emit() {
    this.isOpen = false;
    this.document.body.style.overflow = '';
    this.close.emit(false);
  }

  public analiticText() {
    if (this.query.trim()) {
      this.subFiltrosMap = new Map();
      this.subFiltros = '';
      this.entity = '';
      this.filtrosEntidad = [];
      this.searchTextAnalityc();
      this.tabActive = 1;
    }
  }

  public fileGet(event) {
    this.readTxt(event);
  }

  private readTxt(event) {
    if (event[0].type == 'text/plain') {
      var lector = new FileReader();
      lector.onload = (e: any) => {
        var contenido = e.target.result;
        this.entity = '';
        this.subFiltros = '';
        this.query = contenido;
        this.searchTextAnalityc();
      };
      lector.readAsText(event[0]);
      this.tabActive = 1;
      let _inputfile = this.document.getElementById('file-upload') as HTMLElement;
      _inputfile.attributes['type'].ownerElement.value = '';
    }
  }

  public upload(event) {
    this.readTxt(event);
  }
}
