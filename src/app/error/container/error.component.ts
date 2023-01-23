import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { fadeInDownBigOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'error',
  template: `
    <div class="view-error components-bg">
      <div class="view-error__content" [@error]>
        <img src="./assets/pub/img/logo_pub.svg" alt="Buscador Jurídico" width="250px" height="100px">
        <p style="font-style: italic;"><strong>Plataforma de consulta y localización de información jurídica</strong></p>
        <p class="my-3 text-center">Página no encontrada</p>
        <a routerLink="/" class="btn skin-color-bg text-in-dark"><i class="fas fa-home"></i> Regresar al inicio</a>
      </div>
    </div>
  `,
  styles: [
    `
    .view-error{
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display:flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .view-error__content{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    `
  ],
  animations: [
    fadeInDownBigOnEnterAnimation(
      {
        anchor: 'error',
        translate: '70%',
        duration: 800
      }
    )
  ]
})
export class ErrorComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Página no encontrada | 404')
  }

}
