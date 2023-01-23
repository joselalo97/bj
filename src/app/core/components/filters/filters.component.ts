import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from '@environment/environment';
import { Filters } from 'app/core/models/filters';
import { QueryParams } from 'app/core/models/queryParams';
import { EntityModel } from './model/entites';
import { Library } from './model/library';
import { SettingsMultiSelect } from './model/settingsMulti';
import { FormGroup, FormControl } from '@angular/forms'
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Entities } from '@core/constants';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    {
      provide: MAT_DATE_LOCALE, useValue: 'es-ES'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ]
})
export class FiltersComponent implements OnInit {
  range: FormGroup
  pubVersion = environment.environmentType
  dataFilters: EntityModel[] = [];
  dataSCJN: string[] = [
    'sentencias',
    'sentencias_pub',
    'votos',
    'tesis',
    'acuerdos',
    'protocolos_actuacion_dh',
    'legislacion',
    'vtaquigraficas',
    'biblioteca',
    'ccj_cursos'
  ];
  dataInternational: string[] = [
    'bjdh',
    'bjdh_coidh',
    'suniversal',
    'cidh',
    'hudoc',
    'cij',
  ];
  dataCourts: string[] = [
    'tcespanol',
    'tcaleman',
    'corteuk',
    'supremecourtusa',
    'cccolombia',
    'hcaustralia',
    'tcchile',
    'csjnargentina',
    'ccitaliana',
  ];
  sourceInformationSCJN: EntityModel[] = [];
  sourceInformationInternational: EntityModel[] = [];
  sourceInformationCourts: EntityModel[] = [];
  sourceLibrary: Library[] = [
    { name: 'VLEx', path: '/busquedaexterna/*/-/vlex/0' },
    { name: 'eLibro', path: '/busquedaexterna/*/-/elibro/0' },
    {
      name: 'Library of Congress',
      path: '/busquedaexterna/*/-/lcongress/0',
    },
    { name: 'Corte Europa', path: '/busquedaexterna/*/-/hudoc/0' },
  ];
  isLoad: boolean;
  isLoadEntity: boolean;
  settings: SettingsMultiSelect = new SettingsMultiSelect();
  filtersBuckets: Filters[] = [];
  entidad!: string;
  source: EntityModel = new EntityModel();
  selectedItems: any = {};
  queryParams: QueryParams = new QueryParams();
  subFilter: string[] = [];
  innerText: string = "No se encontraron resultados";
  placeholder: string = "";
  label: string = ":"

  @Input() set entities(data: EntityModel[]) {
    this.isLoad = true;
    this.isLoadEntity = true
    if (typeof data != 'undefined') {
      this.entidad = null;
      this.sourceInformationSCJN = [];
      this.sourceInformationInternational = [];
      this.sourceInformationCourts = [];
      this.queryParams = new QueryParams();
      this.subFilter = [];
      this.route.queryParamMap.subscribe((param: ParamMap) => {
        this.entidad = param.get('indice');

        switch (this.entidad) {
          case Entities.Votes:
            this.label = "Período de fecha de publicación";
            break;
          case Entities.Sentences:
            this.label = "Período de fecha de resolución";
            break;
          case Entities.Sentences_pub:
            this.label = "Período de fecha de resolución";
            break;
          case Entities.Thesis:
            this.label = "Período de fecha de publicación";
            break;
          case Entities.Agreements:
            this.label = "Período de fecha de publicación";
            break;
          case Entities.Versions:
            this.label = "Período de fecha de sesión";
            break;
          case Entities.CoIDH:
            this.label = "Período de fecha";
            break;
          case Entities.CoIDH_BJ:
            this.label = "Período de fecha";
            break;
          case Entities.Legislation:
            this.label = "Período de fecha actualización";
            break;
          case Entities.Ccj:
            this.label = "Período de fecha de sesión";
            break;
        }
        this.subFilter = param.get('subFiltros')
        ? this.bucketFilters(param.get('subFiltros'))
        : [];
        if (data.length > 0) {
          this.dataFilters = data;
          const keys = param.keys;
          keys.forEach((k) => {
            this.queryParams[k] = param.get(k);
          });
          if (param.has('indice')) {
            this.isSelectIndice(data);
            this.isLoad = false;
            this.isLoadEntity = false
          } else {
            this.entidad = ''
            environment.environmentType != 'Pub' ? this.dataSCJN.pop() : null
            this.separatorSource(data, 'dataSCJN', 'sourceInformationSCJN');
            this.separatorSource(
              data,
              'dataInternational',
              'sourceInformationInternational'
            );
            this.separatorSource(data, 'dataCourts', 'sourceInformationCourts');
            this.isLoad = false;
            this.isLoadEntity = false
          }
        } else {
          if (data.length == 0) {
            this.isLoad = false;
            this.isLoadEntity = false;
            this.queryParams.indice = this.entidad
            this.queryParams.q = param.get('q');
            this.subFilter = param.get('subFiltros')
              ? this.bucketFilters(param.get('subFiltros'))
              : [];
          }
        }
      });

    }

  }

  get entities() {
    return this.dataFilters;
  }

  @Input() set subFilters(fill: Filters[]) {
    this.isLoadEntity = true
    this.isLoad = true
    this.filtersBuckets = [];
    this.selectedItems = {};
    this.route.queryParamMap.subscribe((param: ParamMap) => {
      if (param.has('indice')) {
        if (fill.length > 0) {
          this.filtersBuckets = fill;
          fill.forEach((f) => {
            this.selectedItems[f['filtro']] = f['bucketsSeleccionados'];
          });
          this.isLoadEntity = false
          this.isLoad = false
        }
      } else {
        this.isLoadEntity = false        
      }
    })
    if(fill == null) (this.isLoad = false, 
        this.sourceInformationSCJN = [],
        this.sourceInformationInternational = [],
        this.sourceInformationCourts = []
      )
  }

  get subFilters(): Filters[] {
    return this.filtersBuckets;
  }
  isOpen: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<any>) {
    this.range = new FormGroup({
      start: new FormControl(''),
      end: new FormControl('')
    })

    this.dateAdapter.setLocale('es-ES')

  }

  ngOnInit(): void {
  }

  public filterRange() {
    this.queryParams.indice = this.entidad
    let init = this.range.controls['start'].value
    let end = this.range.controls['end'].value
    if (init && end) {
      init = this.datePipe.transform(init, 'yyyy/MM/dd');
      end = this.datePipe.transform(end, 'yyyy/MM/dd');
      const bucket = `${this.nameFilterRange(this.entidad)}:${init}-${end}`;
      if (this.subFilter.length > 0) {
        const actually = this.subFilter.filter(fil => fil.includes(this.nameFilterRange(this.entidad)))        
        if(actually.length > 0){
          const index = this.subFilter.indexOf(actually[0])
          this.subFilter.splice(index, 1)
        }        
        this.subFilter.push(bucket)
      } else {
        this.subFilter.push(bucket)
      }
      
      
      this.queryParams.subFiltros =
        this.subFilter.length > 0 ? this.subFilter.join(',') : null;
      this.router.navigate(['busqueda'], {
        queryParams: this.queryParams
      });
    }
  }

  nameFilterRange(indice: string): string {
    switch (indice) {
      case Entities.Votes:
        return "fechaPublicacionSemanarioRange";
      case Entities.Sentences:
        return "fechaResolucionRange";
      case Entities.Sentences_pub:
        return "fechaResolucionRange";
      case Entities.Thesis:
        return "fechaPublicacionSemanarioRange";
      case Entities.Agreements:
        return "fechaPublicacionSemanarioRange";
      case Entities.Versions:
        return "fechaSesionRange";
      case Entities.CoIDH:
        return "fhsesionRange";
      case Entities.CoIDH_BJ:
        return "fhsesionRange";
      case Entities.Legislation:
        return "fechaPublicadoRange";
      case Entities.Ccj:
        return "fhsesionRange";
    }
  }

  private separatorSource(
    data: EntityModel[],
    typeSource: string,
    arraySource: string
  ): void {
    this[arraySource] = []
    data.forEach((source) => {
      if (this[typeSource].includes(source.entidad)) {
        this[arraySource].push(source);
      }
    });
  }

  private isSelectIndice(data: EntityModel[]): void {
    if (this.entidad) {
      this.source = data.filter((entity) => entity.entidad == this.entidad)[0]
    }
  }

  public clearEntity(select: MatCheckboxChange): void {
    if (!select.checked) {
      this.range.reset()
      this.router.navigate(['busqueda'], {
        queryParams: { q: this.queryParams.q },
      });
    }
  }

  public onSelectEntity(select: MatCheckboxChange): void {
    this.queryParams.indice = select.source.value
    this.queryParams.page = 1
    this.router.navigate(['busqueda'], {
      queryParams: this.queryParams,
    });
  }

  public selectFilterBucket(filtro: string, filtroId: string): void {
    const bucket = `${filtro}:${filtroId}`;
    this.subFilter.push(bucket);
    this.queryParams.subFiltros =
      this.subFilter.length > 0 ? this.subFilter.join(',') : null;
    this.router.navigate(['busqueda'], {
      queryParams: this.queryParams
    });
  }

  private bucketFilters(subfilter: string): string[] {
    let bucket: string[] = [];
    if (subfilter.includes(',')) {
      bucket = subfilter.split(',');
    } else {
      bucket.push(subfilter);
    }
    const data = bucket.filter(fil => fil.includes(this.nameFilterRange(this.entidad)));
    const ranges = data.length > 0 ? data[0].split(':')[1].split('-') : null

    if (ranges) {
      let [year, month, day]: any = ranges[0].split('/')
      let [year2, month2, day2]: any = ranges[1].split('/')

      this.range.controls['start'].patchValue(new Date(this.datePipe.transform(`${year}/${month}/${day}`, 'EEE MMM dd y h:mm:ss').concat(' GMT-0500 (hora de verano central)')))
      this.range.controls['end'].patchValue(new Date(this.datePipe.transform(`${year2}/${month2}/${day2}`, 'EEE MMM dd y h:mm:ss').concat(' GMT-0500 (hora de verano central)')))
    }

    return bucket;
  }

  public clearFilterBucket(filtro: string, filtroId: string): void {
    const bucket = `${filtro}:${filtroId}`;
    const index = this.subFilter.indexOf(bucket);
    this.subFilter.splice(index, 1);
    this.queryParams.subFiltros =
      this.subFilter.length > 0 ? this.subFilter.join(',') : null;
    this.router.navigate(['busqueda'], {
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  public isVisible(): boolean {
    switch (this.entidad) {
      case Entities.Votes:
        return true
      case Entities.Sentences:
        return true
      case Entities.Sentences_pub:
        return true
      case Entities.Thesis:
        return true
      case Entities.Agreements:
        return true
      case Entities.Versions:
        return true
      case Entities.CoIDH:
        return true
      case Entities.CoIDH_BJ:
        return true
      case Entities.Legislation:
        return true
      case Entities.Ccj:
        return true
    }
  }

  public removeRangeFilter() {
    this.queryParams.indice = this.entidad;
    const actually = this.subFilter.filter(fil => fil.includes(this.nameFilterRange(this.entidad)))
    if(actually.length == 0) return
    const index = this.subFilter.indexOf(actually[0]);
    this.subFilter.splice(index, 1);
    this.range.reset();
    this.queryParams.subFiltros =
      this.subFilter.length > 0 ? this.subFilter.join(',') : null;
    this.router.navigate(['busqueda'], {
      queryParams: this.queryParams
    });
  }

}
