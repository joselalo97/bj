import { Component, OnInit } from '@angular/core';
import { Preferences } from 'app/preferences';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotifyService } from '@core/services';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '@intranet/services/library.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'int-header',
  templateUrl: './int-header.component.html',
  styleUrls: ['./int-header.component.scss'],
})
export class IntHeaderComponent implements OnInit {

  public isOpen: boolean = false;
  public username: string = 'name user her inter';
  formFolder : FormGroup;
  size: number;
  requerid:{
    nombre:false,
    descripcion:false
  }

  constructor(
    private readonly params: ActivatedRoute,
    public readonly preferences: Preferences,
    private readonly modalService: NgbModal,
    private readonly formBuilder: FormBuilder,
    private readonly libraryService: LibraryService,
    private notifyService: NotifyService,
  ) { 
    this.params.paramMap.subscribe((param) => {
      if (param.get('user')) this.username = param.get('user');
    });
    this.getLibrarySize()
  }

  public ngOnInit(): void {
    this.createForm()
  }

  private createForm() {
    this.formFolder = this.formBuilder.group({
      name: '',
      description: '',
      public: false,
      username: this.username,
    });
  }

  public modalOpen(content:any): void {
    this.modalService.open(content);
  }

  guardarFolder(container: any){

    this.modalService.dismissAll(container);
    if(this.formFolder.value.name&& this.formFolder.value.description && this.username){
      if(this.size<20){
        this.libraryService.verificarCarpetaByUsernameAndNombre
          (this.username,this.formFolder.controls['name'].value).subscribe(
          data=>{
            if(!data){
              this.libraryService.createFolder(
                this.formFolder.controls['name'].value,
                this.formFolder.controls['description'].value,
                this.username,
                this.formFolder.controls['public'].value
                ).subscribe(
                  data =>{
                    this.notifyService.toastr(
                      'success',
                      `Carpeta creada`,
                      'El usuario ha excedido la cantidad máxima de carpetas',
                      600,
                      'top-right'
                    );   
                    this.createForm()
                  }
                )
            }else{
              this.notifyService.toastr(
                'warning',
                `Carpeta existente`,
                'La carpeta con este nombre, ya existe',
                600,
                'top-right'
              );
              this.createForm()
            }
          }
        )
      }else{
        this.notifyService.toastr(
          'warning',
          `Sin espacio`,
          'El usuario ha excedido la cantidad máxima de carpetas',
          600,
          'top-right'
        );    
        this.createForm()
  
      }
   }
  }

  
  private async getLibrarySize() {
    const resp = await this.libraryService
      .getAllLibrary(0,20,this.username)
      .toPromise().then(
        (data)=>{
          this.size = data.totalElements
        }
      )
    return resp;
  }
}
