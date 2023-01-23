import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IntranetService } from '@intranet/services/intranet.service';
import { filter } from 'rxjs/operators';
import { CommonService } from './core/services/common.service';
import { SeoService } from './core/services/seo.service';
import { StorageService } from './core/services/storage.service';
import { Preferences } from './preferences';

declare var gtag;
@Component({
  selector: 'app-root',
  template: `
    <section activeMicrophone
      [style.fontSize.px]="preferences.pixelsBase"
      [className]="getClasses()"
    >
      <article class="wrapper">
        <router-outlet></router-outlet>
      </article>

      <article class="toggle-scroll">
        <toggle-scroll></toggle-scroll>
      </article>
    </section>

    <loader></loader>
  `,
  styles: [
    `
      .toggle-scroll {
        position: fixed;
        bottom: 2rem;
        right: 0.5rem;
        z-index: 5;
      }
    `,
  ],
  // providers: [IntranetService],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
    public readonly preferences: Preferences,
    private readonly storageService: StorageService,
    private readonly intranetService: IntranetService,
    private readonly commonService: CommonService,
    @Inject(DOCUMENT) private document: Document,
    private readonly router: Router,
    private readonly seoService: SeoService
  ) {

    const navEndEvents$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag("config", "G-Y06W35388F", {
        page_path: event.urlAfterRedirects,
      });
      if (event) this.seoService.createURLCanonical();
    });


    /* if (Notification) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission()
      }
    } */

    this.intranetService.getSugSearch().subscribe((data) => {
      this.storageService.setBusquedasSugerencias(data);
    });
    this.commonService.getStopWords().subscribe(data => {
      this.commonService.stopWord = data
    })
  }


  ev: any

  public ngOnInit(): void {
    let main!: HTMLElement;

    isPlatformBrowser(this.platformId) &&
      ((main = document.getElementById('main')),
        main.classList.add(this.preferences.skin),
        (main.style.fontSize = `${this.preferences.pixelsBase}px`));

    if (isPlatformBrowser(this.platformId)) {
      const loading = this.document.getElementById('loading-page')
      loading.classList.remove('load')
      loading.children[0].attributes.removeNamedItem('src')

      this.document.body.addEventListener('click', this.ev = (e: any) => {

        if(e.target.matches('a[href]')){
          const fragment:string = e.target.href
          if(fragment.includes('#')){
            e.preventDefault()
            const id:string = fragment.split('#')[1]
            const node = this.document.getElementById(id)
            node.scrollIntoView({behavior: 'smooth', block:'center' });
            node.classList.add('found');
            const clear = setTimeout(()=>{
              node.classList.remove('found');
              clearTimeout(clear)
            },2000)
          }
        }

        if (e.target.matches('[data-question]')) {
          this.document.getElementById('sug-busqueda').classList.add('view');
          return;
        } else {
          if (!e.target.closest('.sug-busqueda[data-sug]')) {
            const cont = this.document.getElementById('sug-busqueda');
            if (!cont) return;
            this.document
              .getElementById('sug-busqueda')
              .classList.remove('view');
          }
        }
        if (e.target.matches('[data-entity-tabs]')) {
          this.document.getElementById('entitys-tab').classList.add('view');
        } else {
          if (!e.target.closest('.link-tabs[data-tab]')) {
            const cont = this.document.getElementById('entitys-tab');
            if (!cont) return;
            this.document
              .getElementById('entitys-tab')
              .classList.remove('view');
          }
        }
      });
    }
  }

  public getClasses(): string {
    return `scjn-app ${this.preferences.skin} ${this.preferences.fontBase}`;
  }
}
