import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { LibraryResults } from '@intranet/models/library';
import { LibraryService } from '@intranet/services/library.service';

@Component({
  selector: 'int-search-library',
  templateUrl: './int-search-library.component.html',
  styleUrls: ['./int-search-library.component.scss'],
})
export class IntSearchLibraryComponent implements OnInit, OnDestroy {
  librarysPublic: LibraryResults = new LibraryResults();
  filterForm!: FormGroup;
  isLoad: boolean;
  isFilter: boolean;
  size: number = 10;
  order: string = 'fechaCreacion,desc';

  constructor(
    private libraryService: LibraryService,
    public location: Location,
    private title: Title,
    private meta: Meta
  ) {
    this.createForm();

    this.title.setTitle('Portafolio de búsquedas');

    this.meta.addTags([
      {
        name: 'title',
        content: 'Búsqueda global de portafolios públicos',
      },
      {
        name: 'description',
        content: 'Búsqueda portafolio por usuario o descripción',
      },
      {
        name: 'keywords',
        content: 'portafolio',
      },
    ]);
  }

  ngOnInit(): void {
    this.getAllPublicLibrary(0, 10, this.filters(), this.order);
  }

  public ngOnDestroy(): void {
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }

  private async getAllPublicLibrary(
    page: number,
    size: number,
    filters: string,
    order: string
  ) {
    this.isLoad = true;
    this.librarysPublic.content = [];
    const data = await this.libraryService
      .getAllPublicFolders(page, size, filters, order)
      .toPromise();
    this.librarysPublic = data;
    this.isLoad = false;
  }

  private filters(): string {
    let filter: string = '';

    filter += this.filterForm.value.nameFolder
      ? `nombre:${this.filterForm.value.nameFolder},`
      : '';
    filter += this.filterForm.value.description
      ? `descripcion:${this.filterForm.value.description},`
      : '';
    filter += this.filterForm.value.username
      ? `username:${this.filterForm.value.username},`
      : '';
    filter += 'publico:true';

    return filter;
  }

  private createForm() {
    this.filterForm = new FormBuilder().group({
      nameFolder: '',
      description: '',
      username: '',
    });
  }

  public clearFilters() {
    if (this.isFilter) {
      this.filterForm.reset();
      this.getAllPublicLibrary(0, 10, this.filters(), this.order);
      this.isFilter = false;
    }
  }

  public searchByFilters() {
    if (
      this.filterForm.value.username ||
      this.filterForm.value.nameFolder ||
      this.filterForm.value.description
    )
      this.isFilter = true;
    this.getAllPublicLibrary(0, 10, this.filters(), this.order);
  }

  public onChangePage(page: number) {
    this.getAllPublicLibrary(page - 1, this.size, this.filters(), this.order);
  }

  public onChangeSize(size: number) {
    this.size = size;
    this.getAllPublicLibrary(
      this.librarysPublic.number,
      this.size,
      this.filters(),
      this.order
    );
  }

  public onChangeOrder(order: string) {
    this.order = order;
    this.getAllPublicLibrary(
      this.librarysPublic.number,
      this.size,
      this.filters(),
      this.order
    );
  }
}
