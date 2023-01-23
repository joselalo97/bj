import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Preferences } from 'app/preferences';

@Component({
  selector: 'int-home',
  templateUrl: './int-home.component.html',
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'homeAnimation',
      duration: 700,
      translate: '5%',
    }),
  ],
})
export class ItnHomeComponent implements OnInit, OnDestroy {
  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    private readonly preferences: Preferences
  ) {
    this.title.setTitle('Buscador jurídico');

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

  public ngOnInit(): void {

    this.preferences.isHome = true;

  }

  public ngOnDestroy(): void {

    this.preferences.isHome = false;

    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");

  }
}
