import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services';
import { Content, LibraryResults } from '@intranet/models/library';
import { LibraryService } from '@intranet/services/library.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'int-library',
  templateUrl: './int-library.component.html',
  styleUrls: ['./int-library.component.scss'],
})
export class IntLibraryComponent implements OnInit, OnDestroy {
  username: string = '';
  library: LibraryResults = new LibraryResults();
  subscription: Content[] = [];
  isLoad: boolean;
  indexOfLibrary: number = -1;
  formFolder!: FormGroup;
  folderName: string = '';
  idFolder: number = 0;
  size: number = 10;
  order: string = 'fechaCreacion,desc';

  constructor(
    private readonly params: ActivatedRoute,
    private readonly libraryService: LibraryService,
    private readonly modalService: NgbModal,
    private readonly formBuilder: FormBuilder,
    private notifyService: NotifyService,
    public readonly location: Location,
    private readonly meta: Meta,
    private readonly title: Title
  ) {
    this.params.paramMap.subscribe((param) => {
      if (param.get('user')) this.username = param.get('user');
      this.getAllLibrarys(this.size, this.order, this.username, 0);
      this.getSubscriptionFolder(this.username);
      this.title.setTitle('Biblioteca: ' + this.username);

      this.meta.addTags([
        {
          name: 'title',
          content: 'Bibliotecas públicas con documentos',
        },
        {
          name: 'description',
          content: 'Portafolios públicos con documentos de búsquedas',
        },
        {
          name: 'keywords',
          content: 'portafolio, biblioteca',
        },
      ]);
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }

  private async getAllLibrarys(
    size: number,
    order: string,
    user: string,
    page: number
  ) {
    this.isLoad = true;
    const resp = await this.libraryService
      .getAllLibrary(page, size, user, order)
      .toPromise();
    this.library = resp;
    this.isLoad = false;
  }

  private async getSubscriptionFolder(username: string) {
    const data = await this.libraryService
      .getByFolderSubscriptions(username)
      .toPromise();
    this.subscription = data;
  }

  public modalEdit(folder: Content, content: any, pos: number): void {
    this.indexOfLibrary = pos;
    this.formFolder.controls['name'].setValue(folder.nombre);
    this.formFolder.controls['description'].setValue(folder.descripcion);
    this.formFolder.controls['public'].setValue(folder.publico);
    this.formFolder.controls['id'].setValue(folder.id);
    this.modalService.open(content);
  }

  private createForm() {
    this.formFolder = this.formBuilder.group({
      name: '',
      description: '',
      public: '',
      id: 0,
    });
  }

  public updateFolder(container: any) {
    this.modalService.dismissAll(container);
    this.libraryService
      .updateFolder(
        this.formFolder.controls['id'].value,
        this.formFolder.controls['name'].value,
        this.formFolder.controls['description'].value,
        this.formFolder.controls['public'].value
      )
      .subscribe(
        (res: Content) => {
          if (res.id) {
            this.library.content[this.indexOfLibrary] = res;

            this.notifyService.toastr(
              'success',
              `Carpeta ${res.nombre}`,
              'Ha sido actualizo exitosamente',
              600,
              'top-right'
            );
          }
        },
        (error) => {
          this.notifyService.toastr(
            'error',
            `Error`,
            'Ha ocurrido algo inesperado al actualizar la carpeta',
            600,
            'top-right'
          );
        }
      );
  }

  public openDeleteFolder(folder: Content, cont: any, pos: number) {
    this.folderName = folder.nombre;
    this.idFolder = folder.id;
    this.indexOfLibrary = pos;
    this.modalService.open(cont);
  }

  public deleteFolder() {
    this.libraryService.deleteFolder(this.idFolder).subscribe((res) => {
      this.library.content.splice(this.indexOfLibrary, 1);
      this.modalService.dismissAll();
      this.notifyService.toastr(
        'success',
        `Carpeta`,
        'Ha sido eliminado con éxito',
        1000,
        'top-right'
      );
    });
  }

  public onChangeSize(size: number) {
    this.size = size;
    this.getAllLibrarys(size, this.order, this.username, this.library.number);
  }

  public onChangeOrder(order: string) {
    this.order = order;
    this.getAllLibrarys(
      this.size,
      this.order,
      this.username,
      this.library.number
    );
  }

  public onChangePage(page: number) {
    this.getAllLibrarys(this.size, this.order, this.username, page);
  }
}
