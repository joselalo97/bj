import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'pub-advance',
  templateUrl: './pub-advance.component.html',
  animations:[
    fadeInUpOnEnterAnimation({
      anchor: 'advancedSearchAnimation',
      duration: 1000,
      translate: '10%'
    })
  ]
})
export class PubAdvanceComponent implements OnInit,OnDestroy {

  constructor(private readonly meta: Meta,
    private readonly title: Title) { }

  public ngOnInit(): void {
    this.title.setTitle('Búsqueda Avanzada Jurídico');

    this.meta.addTags([
      {
        name: 'title',
        content:
          'Búsqueda Avanzada de Buscador Jurídico de la Suprema Corte de Justicia de la Nación con búsqueda avanzada',
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
