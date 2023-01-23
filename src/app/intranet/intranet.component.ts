import { Component, OnDestroy } from '@angular/core';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Preferences } from 'app/preferences';

@Component({
  selector: 'scjn-intranet',
  template: `
    <section class="scjn-intranet main_bg">
      <nav class="scjn-intranet__accessibility" [@intranetAnimation]>
        <scjn-accessibility></scjn-accessibility>
      </nav>

      <div
        class="scjn-intranet__header border-bj components-bg shadow-sm"
        [class.scjn-intranet__header--p-home]="preferences.isHome"
        [class.px-3]="!preferences.isHome"
      >
        <int-header></int-header>
      </div>

      <article class="scjn-intranet__routes">
        <router-outlet></router-outlet>
      </article>

      <footer [@intranetAnimation]>
        <int-footer></int-footer>
      </footer>
    </section>
  `,
  styles: [
    `
      .scjn-intranet {
        position: relative;
        width: 100%;
        height: auto;
      }
      .scjn-intranet__accessibility {
        position: fixed;
        left: 0.5rem;
        top: 4rem;
        z-index: 10;
      }
      .scjn-intranet__header {
        width: 100%;
        position: fixed;
        min-height: 6rem;
        top: 0;
        left: 0;
        z-index: 3;
        border-top: 0.6rem solid;
      }
      .scjn-intranet__header--p-home {
        padding: 0 4rem;
      }
      .scjn-intranet__routes {
        padding: 0 4rem;
        padding-top: 6rem;
        min-height: calc(100vh - 6rem - 62px);
      }
    `,
  ],
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'intranetAnimation',
      duration: 700,
      translate: '5%',
    }),
  ],
})
export class IntranetComponent {
  constructor(public readonly preferences: Preferences) {}
}
