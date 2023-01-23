import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'pub-guide-user',
  templateUrl: './pub-guide-user.component.html',
  styleUrls: ['./pub-guide-user.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'guide',
      duration: 700,
      translate: '5%',
    }),
  ],
})
export class PubGuideUserComponent implements OnInit {

  constructor(private readonly meta: Meta,
    private readonly title: Title) { }

  public ngOnInit(): void {
    this.title.setTitle('Guía de usuario | Manual de usuario');

    this.meta.addTags([
      {
        name: 'title',
        content:
          'Guía de usuario del Buscador Jurídico de la Suprema Corte de Justicia de la Nación',
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
