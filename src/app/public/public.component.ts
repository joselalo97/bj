import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'scjn-public',
  template: `
  <section class="scjn-pub">
    <nav class="scjn-pub__accessibility">
      <scjn-accessibility></scjn-accessibility>
    </nav>
    <div class="scjn-pub__header" *ngIf="fixed">
      <header-publ></header-publ>
    </div>
    <article class="scjn-pub__routes" [ngClass]="{'fix': fixed}">
        <router-outlet></router-outlet>
      </article>
    <div class="scjn-pub__footer" *ngIf="fixed">
      <footer></footer>
    </div>
</section>
  `,
  styles: [`
    .scjn-pub{
      position: relative;
      width: 100%;
      height: auto;
    }

    .scjn-pub__header{
      position: sticky;
      top: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      height: auto:
    }

    @supports ((position:-webkit-sticky) or (position:sticky)){
      position: sticky;
      top: 0;
      left: 0;
    }


    .scjn-pub__routes{
      min-height: 100vh;
    }

    .scjn-pub__routes.fix{
      min-height: calc(100vh - 5rem - 145px);
      
    }

    .scjn-pub__accessibility{
      position: fixed;
      top: 30%;
      left: 0;
      z-index: 99;
    }
  `]
})
export class PublicComponent implements OnInit {

  public fixed: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(nav => {
      if (nav instanceof NavigationEnd) {
        if (nav.url === '/' || nav.url.includes('/analisis-de-texto')) {
          this.fixed = false;
        } else {
          this.fixed = true;
        }
      }
    })
  }

  public ngOnInit(): void { }

}
