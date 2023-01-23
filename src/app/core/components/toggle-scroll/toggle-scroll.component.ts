import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { ScrollType } from './constants/scroll-type.enum';

@Component({
  selector: 'toggle-scroll',
  template: `
    <div class="toggle-scroll"
      *ngIf="isScroll"
      [@scrollAnimation]>

      <button mat-mini-fab color="primary" role="button" aria-label="inicio de la pagina" class="mb-1"
        (click)="toggleScroll( scrollType.Up )">
        <mat-icon class="text-in-dark">
          keyboard_arrow_up
        </mat-icon>
      </button>

      <button mat-mini-fab color="primary" role="button" aria-label="final de la pagina"
        (click)="toggleScroll( scrollType.Down )">
        <mat-icon class="text-in-dark">
          keyboard_arrow_down
        </mat-icon>
      </button>

    </div>
  `,
  styles: [`
    .toggle-scroll {
      display: flex;
      flex-direction: column;
    }
  `],
  animations:[
    fadeInUpOnEnterAnimation({
      anchor: 'scrollAnimation',
      duration: 500,
      translate: '5%'
    })
  ]
})
export class ToggleScrollComponent {

  constructor(
    @Inject( DOCUMENT )
    private readonly document: Document,
    private readonly scroller: ViewportScroller
  ) { }

  public scrollType: typeof ScrollType = ScrollType;
  public isScroll: boolean = false;
  private heigthDocument: number = this.document.body.clientHeight;


  @HostListener( 'window:scroll', [] )
  public windowScroll(): void {

    ( window.pageYOffset
      || this.document.documentElement.scrollTop
      || this.document.body.scrollTop > 100 )
    ? (
      this.isScroll = true,
      this.heigthDocument = this.document.documentElement.scrollTop
    )
    : (
      this.isScroll = false
    );

  }

  public toggleScroll( type: string ): void {

    switch ( type ) {

      case ScrollType.Up:

        this.scroller.scrollToPosition( [ 0, 0 ] );

        break;

      case ScrollType.Down:

        const clientHeight: number = this.document.body.clientHeight;
        const goToNumber: number = this.heigthDocument + clientHeight;

        this.scroller.scrollToPosition( [ 0, goToNumber ] );

        break;

    }

  }

}
