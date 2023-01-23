import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Entities } from '@core/constants';
import { QueryParams, ResultadosModel } from '@core/models';
import { NotifyService, ResultService } from '@core/services';
import { ConvertQuery } from '@intranet/models/convertQuery';
import {
  CommitsModel,
  Folder,
  LibraryResults,
  Subs,
} from '@intranet/models/library';
import { LibraryService } from '@intranet/services/library.service';
import { EntityResultData, ResultData } from 'app/core/models/entityResultData';

@Component({
  selector: 'int-view-library',
  templateUrl: './int-view-library.component.html',
  styleUrls: ['./int-view-library.component.scss'],
})
export class IntViewLibraryComponent implements OnInit {
  folder: Folder = new Folder();
  idFolder: number;
  docs: LibraryResults = new LibraryResults();
  resultsEntity: ResultData[] = [];
  isLoad: boolean = false;
  paginate: ResultadosModel = new ResultadosModel();
  commits: CommitsModel[] = [];
  formCommit!: FormGroup;
  subs: Subs[] = [];

  constructor(
    private params: ActivatedRoute,
    private libraryService: LibraryService,
    public readonly location: Location,
    private resultService: ResultService,
    private conver: ConvertQuery,
    private entity: EntityResultData,
    public sanitizer: DomSanitizer,
    public notify: NotifyService
  ) {
    this.params.paramMap.subscribe((param) => {
      if (param.get('idCarpeta')) {
        this.idFolder = Number(param.get('idCarpeta'));
        this.getFolder(this.idFolder);
        this.getDocsFolder(this.idFolder, 0, 5);
        this.getCommits(this.idFolder);
        this.getSubcriptors();
      }
    });

    this.createForm();
  }

  ngOnInit(): void {}

  private async getFolder(id: number): Promise<void> {
    const result = await this.libraryService
      .getLibraryByFolderByID(id)
      .toPromise();
    this.folder = result;
  }

  private async getDocsFolder(
    id: number,
    page: number,
    size: number
  ): Promise<void> {
    const result = await this.libraryService
      .getDocumentosByFolder(id, page, size)
      .toPromise();
    this.docs = result;
    this.dataQuerySearch();
  }

  private async getSubcriptors() {
    const data = await this.libraryService
      .getAllSubscriptons(this.idFolder)
      .toPromise();
    this.subs = data;
  }

  private dataQuerySearch() {
    if (this.docs.content.length > 0) {
      this.isLoad = true;
      let cadena = '';
      this.docs.content.forEach((doc) => {
        cadena = cadena + ' OR ' + this.defineFiltros(doc.idDocumento);
      });
      cadena = cadena.replace(' OR ', '');
      this.findDocuments(cadena);
    } else {
      this.isLoad = false;
      // this.documentos = undefined;
      // this.sugeridas = undefined;
    }
  }

  private defineFiltros(idDocumento: string) {
    let cadenas: string[] = idDocumento.split(/_(.+)/);
    let filtro: string;
    if (cadenas[0] == Entities.Sentences) {
      filtro = '(asuntoID:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.Sentences_pub) {
      filtro = '(asuntoID:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == 'coidh') {
      filtro =
        '(numSeccion:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.Legislation) {
      filtro = '(id:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.TSpanish) {
      filtro =
        '(idSentencia:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.Library) {
      filtro =
        '(publicacionId:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == 'ohchr') {
      filtro = '(idOHCHR:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.Hudoc) {
      filtro = '(itemid:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.CourtRS) {
      filtro = '(caseId:"' + cadenas[1] + '" AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.CourtUS) {
      filtro = '(docket:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.TColombia) {
      filtro =
        '(sentencia:"' + cadenas[1] + '" AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.Versions) {
      filtro = '(idVT:"' + cadenas[1] + '" AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.CoIDH_BJ) {
      filtro =
        '(promulgacion_bjdh:"' +
        cadenas[1] +
        '" AND _index:"' +
        cadenas[0] +
        '")';
    } else if (cadenas[0] == Entities.Onu) {
      filtro =
        '(promulgacion_onu:"' +
        cadenas[1] +
        '" AND _index:"' +
        cadenas[0] +
        '")';
    } else if (cadenas[0] == Entities.CIDH) {
      //cadenas = idDocumento.split("_");
      filtro = '(id:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.TCgermany) {
      filtro = '(name:"' + cadenas[1] + '" AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.CourtAustralia) {
      filtro =
        '(caseNumber:"' + cadenas[1] + '" AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.CSJNArgentina) {
      filtro = '(id:"' + cadenas[1] + '" AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.TChile) {
      filtro =
        '(nombrePDF:"' + cadenas[1] + '" AND _index:"' + cadenas[0] + '")';
    } else if (cadenas[0] == Entities.CCItaly) {
      filtro =
        '(sentenciaId:"' + cadenas[1] + '" AND _index:"' + cadenas[0] + '")';
    } else {
      filtro =
        '(registroDigital:' + cadenas[1] + ' AND _index:"' + cadenas[0] + '")';
    }
    return filtro;
  }

  private async findDocuments(query: string): Promise<void> {
    let params: QueryParams = new QueryParams();
    params.q = query;
    params.page = 1;
    params.size = 5;
    const search = this.conver.convertQueryParamsResults(params);
    const data = await this.resultService.getSearch(search).toPromise();
    this.paginate = data;
    this.isLoad = false;
    data.resultados.forEach((data) => {
      this.resultsEntity.push(this.entity.ConverDataHTML(data));
    });
  }

  private async getCommits(id: number): Promise<void> {
    const data = await this.libraryService.getCommits(id).toPromise();
    this.commits = data;
  }

  private createForm() {
    this.formCommit = new FormBuilder().group({
      commit: '',
    });
  }

  public async sendCommit() {
    if (this.formCommit.controls['commit'].value.trim()) {
      const text = this.formCommit.value.commit;
      const result = await this.libraryService
        .sendCommitFolder(text, this.idFolder, 'name user her inter')
        .toPromise();
      if (result.username) this.getCommits(result.idCarpeta);
      this.notify.toastr(
        'error',
        'Comentario',
        'Se ha agregado el comentario existosamente.',
        1000,
        'top-right',
        true
      );
      this.formCommit.reset();
    } else {
      this.notify.toastr(
        'error',
        'Error',
        'Favor de agregar un comentario válido.',
        1000,
        'top-right',
        false
      );
    }
  }
}
