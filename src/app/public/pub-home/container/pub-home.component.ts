import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'pub-home',
  templateUrl: './pub-home.component.html',
  styleUrls: ['./pub-home.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'homeAnimation',
      duration: 700,
      translate: '10%',
    }),
  ],
})
export class PubHomeComponent implements OnInit, OnDestroy {

  constructor(private readonly meta: Meta,
    private readonly title: Title) { }

  public ngOnInit(): void {
    this.title.setTitle('Suprema Corte de Justicia de la Nación | Buscador jurídico');

    this.meta.addTags([
      {
        name: 'title',
        content:
          'Buscador Jurídico de la Suprema Corte de Justicia de la Nación',
      },
      {
        name: 'description',
        content:
          'El buscador jurídico es la plataforma de consulta y localización de información jurídica de la SCJN',
      },
      {
        name: 'keywords',
        content:
          'buscador jurídico,precedentes,sentencias,tesis,votos,acuerdos generales, suprema corte de justicia de la nación, jurisprudencia, línea jurisprudencial, semanario judicial',
      },
    ]);
  }

  public ngOnDestroy(): void {
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }

}
