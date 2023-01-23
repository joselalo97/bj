import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Guide, TitleGuide } from '@intranet/models/guide';
import { IntranetService } from '@intranet/services/intranet.service';

@Component({
  selector: 'int-guide',
  templateUrl: './int-guide.component.html',
  styleUrls: ['./int-guide.component.scss'],
})
export class IntGuideComponent implements OnInit, OnDestroy {
  public open: boolean = false;
  public section: Guide = new Guide();
  private guides: Guide[] = [];
  public description: TitleGuide = new TitleGuide();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly meta: Meta,
    private readonly title: Title,
    private readonly intranetService: IntranetService
  ) {
    this.intranetService.getGuide().subscribe((data) => (this.guides = data));
    this.title.setTitle('Guía de usuario');

    this.meta.addTags([
      {
        name: 'title',
        content: 'Guia de usuario buscador jurídico',
      },
      {
        name: 'description',
        content: 'Funcionamiento del buscador jurídico',
      },
      {
        name: 'keywords',
        content: 'manual, guía',
      },
    ]);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }

  public openPanelGuide(index: number) {
    this.open = true;
    this.section = this.guides[index];
    this.document.body.style.overflow = 'hidden';
    this.document.addEventListener('keyup', (e) => {
      if (e.code == 'Escape') this.closePanel();
    });
  }

  public onSelectPoint(data: TitleGuide) {
    this.description = data;
  }

  public closePanel() {
    this.open = false;
    this.section = new Guide();
    this.description = new TitleGuide();
    this.document.body.style.overflow = '';
  }
}
