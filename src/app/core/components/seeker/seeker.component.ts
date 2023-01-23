import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityModel, QueryParams } from '@core/models';
import { ContText, SugerenciaModel } from '@intranet/models/sugerenciaModel';
import { IntranetService } from '@intranet/services/intranet.service';
import { Preferences } from 'app/preferences';

@Component({
  selector: 'seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss'],
})
export class SeekerComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly intranetService: IntranetService,
    private readonly router: Router,
    public readonly preferences: Preferences,
    public readonly param: ActivatedRoute
  ) {
    this.createForm();
    this.getDataSources();
    this.getDataIncludes();
  }

  @ViewChild('seeker', { static: true })
  public tagSeeker: ElementRef;

  public dataSourceList: EntityModel[] = [];
  public dataSourceSelected: EntityModel = {} as EntityModel;
  public seekerForm: FormGroup;
  private sugerencia: SugerenciaModel = new SugerenciaModel();
  public textSug: ContText[] = [];
  public viewSug: boolean = false;
  public isOpen: boolean = false;

  public ngOnInit(): void {}

  private getDataSources(): void {
    this.intranetService.getEntityData().subscribe(
      (response: EntityModel[]) => (
        (this.dataSourceList = response),
        this.param.queryParamMap.subscribe((data) => {
          let param: QueryParams = { ...data['params'] };
          this.seekerForm.controls['search'].setValue(
            param.q && param.q != '*' ? param.q : ''
          );
          const isPresent = this.dataSourceList.filter(
            (data) => data.entidad == param.indice
          )[0];

          if (isPresent) {
            this.dataSourceSelected = isPresent;
            this.seekerForm.controls['dataSource'].setValue(
              param.indice ? param.indice : ''
            );
          } else {
            this.dataSourceSelected = {
              entidad: '',
              etiqueta: 'Fuente de datos',
            };
          }
        })
      )
    );
  }

  private getDataIncludes(): void {
    this.intranetService
      .getSugSearch()
      .subscribe((data: SugerenciaModel) => (this.sugerencia = data));
  }

  private createForm(): void {
    this.seekerForm = this.formBuilder.group({
      dataSource: [''],
      search: [''],
    });
  }

  public searchText() {
    if (
      !this.seekerForm.controls['dataSource'].value &&
      !this.seekerForm.controls['search'].value
    ) {
      this.router.navigate(['busqueda'], {
        queryParams: {
          q: '*',
        },
      });
      return;
    }

    if (
      this.seekerForm.controls['dataSource'].value &&
      this.seekerForm.controls['search'].value
    ) {
      this.router.navigate(['busqueda'], {
        queryParams: {
          q: this.seekerForm.controls['search'].value,
          indice: this.seekerForm.controls['dataSource'].value,
        },
      });
      return;
    }

    if (this.seekerForm.controls['dataSource'].value) {
      this.router.navigate(['busqueda'], {
        queryParams: {
          q: '*',
          indice: this.seekerForm.controls['dataSource'].value,
        },
      });
      return;
    }

    if (this.seekerForm.controls['search'].value) {
      this.router.navigate(['busqueda'], {
        queryParams: {
          q: this.seekerForm.controls['search'].value,
        },
      });
      return;
    }
  }

  public changeDataSource(data: EntityModel): void {
    this.dataSourceSelected = data;

    this.seekerForm.controls['dataSource'].patchValue(
      this.dataSourceSelected.entidad
    );
  }

  public includeSearch(word: string): void {
    if (
      word.charAt(word.length - 1).includes('@') &&
      this.seekerForm.controls['dataSource'].value
    ) {
      const entity = this.seekerForm.controls['dataSource'].value;
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

      this.seekerForm.controls['search'].patchValue(
        this.seekerForm.controls['search'].value + data.concat(': ')
      );

      this.viewSug = false;
    }
  }
}
