import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from '@intranet/services/history.service';
import localeEs from '@angular/common/locales/es';
import { DatePipe, registerLocaleData } from '@angular/common';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BusquedasLocal } from '@intranet/models/history';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'int-history',
  templateUrl: './int-history.component.html',
  styleUrls: ['./int-history.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class IntHistoryComponent implements OnInit, OnDestroy {
  historyDates: string[] = [];
  openTabs: boolean[] = [true];
  busquedasSteep: Map<number, any> = new Map<number, any>();
  treeControl = new NestedTreeControl<BusquedasLocal>((node) => node.children);
  count: number = 10;
  allDates: string[] = [];
  destroyTime: any;
  formDates!: FormGroup;
  isFilter: boolean = false;

  constructor(
    private readonly historyService: HistoryService,
    private datePipe: DatePipe,
    private readonly meta: Meta,
    private readonly title: Title
  ) {
    this.title.setTitle('Historial de búsquedas');

    this.meta.addTags([
      {
        name: 'title',
        content: 'Búsquedas realizadas',
      },
      {
        name: 'description',
        content: 'Resultados de búsquedas con diferente tipo de sintaxis',
      },
      {
        name: 'keywords',
        content: 'historial',
      },
    ]);
  }

  ngOnInit(): void {
    this.getAllHistory();
    this.createControls();
  }

  ngOnDestroy(): void {
    clearTimeout(this.destroyTime);
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }

  public hasChild = (_: number, node: BusquedasLocal) =>
    !!node.children && node.children.length > 0;

  private getAllHistory = async (username: string = 'name user her inter') => {
    await this.historyService
      .getAllHistory(username)
      .toPromise()
      .then((res) => {
        this.allDates = res;
        this.addDatesHistory();
        this.destroyTime = setTimeout(() => {
          this.observer();
        }, 1000);
      });
  };

  private async structureNode(date: string, index: number) {
    const source = await this.historyService
      .getHistoryUserDate(date, 'name user her inter')
      .toPromise();
    let busqueda: BusquedasLocal[] = [];
    source.reverse().forEach((element) => {
      let itemHis: any;
      let lisFiltros = [];
      if (element.filtros !== null) {
        element.filtros.forEach((fil) => {
          lisFiltros.push({
            palabra: fil.valor,
            fecha: fil.fecha,
            nivel: 2,
            principal: element.busqueda,
            children: null,
            link: element.queryBusqueda,
          });
        });
      }
      itemHis = {
        palabra: element.busqueda,
        fecha: element.fecha,
        nivel: 1,
        principal: '',
        children: lisFiltros,
        link: element.queryBusqueda,
      };
      busqueda.push(itemHis);
    });
    this.busquedasSteep.set(index, busqueda);
  }

  public getSource(date: string, index: number) {
    this.structureNode(date, index);
  }

  private observer = () => {
    this.addDatesHistory();
    const observer = new IntersectionObserver(
      (element, observer) => {
        element.forEach((selector) => {
          if (selector.isIntersecting) {
            observer.unobserve(selector.target);
            if (!this.verificMoreData()) return;
            this.count += 10;
            this.addDatesHistory();
            const lastTag = document.querySelectorAll('.accordion-dates');
            observer.observe(lastTag[lastTag.length - 1]);
          }
        });
      },
      { root: null, rootMargin: '100px 0px 0px 0px', threshold: 0 }
    );

    const lastTag = document.querySelectorAll('.accordion-dates');
    observer.observe(lastTag[lastTag.length - 1]);
  };

  private verificMoreData(): boolean {
    return this.count < this.allDates.length;
  }

  private addDatesHistory() {
    let fechas: string[] = [];

    for (let i = 0; i < this.allDates.length; i++) {
      if (i <= this.count) {
        fechas.push(this.allDates[i]);
      } else {
        break;
      }
    }

    this.historyDates = fechas;
  }

  private createControls() {
    this.formDates = new FormBuilder().group({
      init: '',
      end: '',
    });
  }

  public filterDates() {
    if (
      this.formDates.controls.init.value &&
      this.formDates.controls.init.value
    ) {
      const fhInit = this.datePipe.transform(
        this.formDates.controls.init.value,
        'yyyy/MM/dd'
      );
      const fhEnd = this.datePipe.transform(
        this.formDates.controls.end.value,
        'yyyy/MM/dd'
      );
      this.isFilter = true;

      this.historyDates = this.allDates.filter(
        (m) =>
          new Date(
            m.split(' ')[0].split('/').reverse().join('/').toString()
          ).getTime() /
            1000 >=
            new Date(fhInit).getTime() / 1000 &&
          new Date(
            m.split(' ')[0].split('/').reverse().join('/').toString()
          ).getTime() /
            1000 <=
            new Date(fhEnd).getTime() / 1000
      );
    }
  }

  public paramsSearch(
    nivel: number,
    principal: string,
    nodo: BusquedasLocal
  ): any {
    switch (nivel) {
      case 1:
        if (principal.includes('+')) {
          let query = nodo.link.split('&');
          let data = {};
          query.forEach((text) => {
            data[text.split('=')[0]] = text.split('=')[1];
          });

          return data;
        }
        return {
          q: principal,
        };
      case 2:
        let busquedaResultadosList = [];
        busquedaResultadosList.push(nodo.palabra);
        if (nodo.principal.includes('+')) {
          let query = nodo.link.split('&');
          let data = {};
          query.forEach((text) => {
            data[text.split('=')[0]] = text.split('=')[1];
          });

          return data;
        }
        return {
          q: nodo.principal,
          busquedaResultados: busquedaResultadosList.join(','),
          page: 1,
        };
    }
  }

  public clear() {
    this.isFilter = false;
    this.count = 10;
    this.addDatesHistory();
    this.formDates.reset();
    this.destroyTime = setTimeout(() => {
      this.observer();
    });
  }
}
