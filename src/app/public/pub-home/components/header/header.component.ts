import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { EntityModel } from '@core/models';

import { ContText, SugerenciaModel } from '@intranet/models/sugerenciaModel';
import { IntranetService } from '@intranet/services/intranet.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'header-publ',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private readonly entityService: IntranetService,
    private readonly router: Router,
    private readonly params: ActivatedRoute,
    @Inject(DOCUMENT) public document: Document) {
    this.createControls();
    this.getEntitys();
    this.getDataIncludes();
  }

  @ViewChild('seeker', { static: true }) public tagSeeker: ElementRef;
  public formSeeker!: FormGroup
  public config: IDropdownSettings = {
    idField: 'entidad',
    textField: 'etiqueta',
    enableCheckAll: false,
    singleSelection: true,
    closeDropDownOnSelection: true,
    noDataAvailablePlaceholderText: 'No resultados'
  }
  public entitys: EntityModel[] = [];
  public sugerencia: SugerenciaModel = new SugerenciaModel();
  public textSug: ContText[] = [];
  public viewSug: boolean = false;

  ngOnInit(): void {
    this.params.queryParamMap.subscribe(data => {
      if (data.has('q')) this.formSeeker.controls.query.patchValue(data.get('q') != '*' ? data.get('q') : '');
    })

    this.router.events.subscribe(route => {
      (route instanceof NavigationStart) ? 
      (!route.url.includes('busqueda?')) ? 
      (this.formSeeker.reset(),this.formSeeker.controls.entity.patchValue(""))
      : null 
      : null
    })

  }

  public includeSearch(word: string): void {
    if (
      word.charAt(word.length - 1).includes('@') &&
      this.formSeeker.controls['entity'].value
    ) {
      const entity = this.formSeeker.controls['entity'].value[0].entidad;
      this.textSug = this.sugerencia[entity];
      this.viewSug = true;
      if (word.charAt(1) && word.charAt(1) == ' ') {
        this.viewSug = false;
      }
    } else {
      this.viewSug = false;
    }
  }

  public selectSug(ev: Event | any): void {
    if (ev.target.matches('[data-sug]')) {
      const data: string = ev.target.innerText;

      this.tagSeeker.nativeElement.focus();

      this.formSeeker.controls['query'].patchValue(
        this.formSeeker.controls['query'].value + data.concat(': ')
      );

      this.viewSug = false;
    }
  }

  public searchText() {
    if (
      !this.formSeeker.controls['entity'].value.length &&
      !this.formSeeker.controls['query'].value
    ) {
      this.router.navigate(['/busqueda'], {
        queryParams: {
          q: '*',
        },
      });
      return;
    }

    if (
      this.formSeeker.controls['entity'].value.length &&
      this.formSeeker.controls['query'].value
    ) {
      this.router.navigate(['/busqueda'], {
        queryParams: {
          q: this.formSeeker.controls['query'].value,
          indice: this.formSeeker.controls['entity'].value[0].entidad,
        },
      });
      return;
    }

    if (this.formSeeker.controls['entity'].value.length) {
      this.router.navigate(['/busqueda'], {
        queryParams: {
          q: '*',
          indice: this.formSeeker.controls['entity'].value[0].entidad,
        },
      });
      return;
    }

    if (this.formSeeker.controls['query'].value) {
      this.router.navigate(['/busqueda'], {
        queryParams: {
          q: this.formSeeker.controls['query'].value,
        },
      });
      return;
    }
  }

  private createControls() {
    this.formSeeker = new FormBuilder().group({
      entity: [[]],
      query: ['']
    })
  }

  private getEntitys() {
    this.entityService.getEntityData().subscribe(data => {
      this.entitys = data
      this.params.queryParamMap.subscribe(param => {
        if (param.has('indice')) {
          const isSelect = data.filter(m => m.entidad == param.get('indice'))
          this.formSeeker.controls.entity.patchValue(isSelect);
        } else {
          this.formSeeker.controls.entity.patchValue("");
        }
      })

    })
  }

  private getDataIncludes(): void {
    this.entityService
      .getSugSearch()
      .subscribe((data: SugerenciaModel) => (this.sugerencia = data));
  }

  public expandBar() {
    const menu = this.document.getElementById('form-header')
    menu.classList.toggle('expand')
  }

}
