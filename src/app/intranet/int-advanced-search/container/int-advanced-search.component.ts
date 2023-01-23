import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuSelectModel } from '@core/components';
import { BucketModel, EntityFilterModel, EntityModel, FilterModel, SourceItemModel, SourceModel } from '@core/models';
import { CommonService } from '@core/services';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { InputKey } from '../constant/input-key.enum';
import { InputFlagModel } from '../models/input-flag.model';
import { SyntaxCodeModel } from '../models/syntax-code.model';


@Component({
  selector: 'int-advanced-search',
  templateUrl: './int-advanced-search.component.html',
  styleUrls: ['./int-advanced-search.component.scss'],
  animations:[
    fadeInUpOnEnterAnimation({
      anchor: 'advancedSearchAnimation',
      duration: 500,
      translate: '5%'
    })
  ]
})
export class IntAdvancedSearchComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly commonService: CommonService,
    private readonly el: ElementRef
  ) { }

  /**
   * Bindings
   */
  public advancedForm: FormGroup;
  public isDataSource: boolean = false;
  public sources!: SourceModel;
  public dataSourceList: MenuSelectModel[] = [];
  public entityFilterList: FilterModel[] = [];
  public sourceList: SourceItemModel[] = [];
  public inputFlag: InputFlagModel = {
    keywords: false,
    exactPhrases: false,
    containerWords: false,
    nextWords: false,
    wordsNotContained: false
  };
  public inpuKey: typeof InputKey = InputKey;
  public syntaxCode: SyntaxCodeModel = {
    dataSource: '',
    keywords: '',
    exactPhrases: '',
    containerWords: '',
    nextWords: '',
    distance: '~5',
    wordsNotContained: '',
    sources: []
  };
  public selectedSource: SourceItemModel = {} as SourceItemModel;
  public multiSelecSettings: any = {
    singleSelection: false,
    idField: "value",
    textField: "label",
    enableCheckAll: false,
    allowSearchFilter: false,
    limitSelection: -1,
    clearSearchFilter: true,
    maxHeight: "100%",
    itemsShowLimit: 3,
    searchPlaceholderText: "Todos",
    noDataAvailablePlaceholderText: "",
    closeDropDownOnSelection: false,
    showSelectedItemsAtTop: false,
    defaultOpen: false
  }


  /**
   * Component start
   */
  public ngOnInit(): void {

    this.createAdvancedForm();
    this.subscribeAdvancedForm();
    this.getSources();
    this.getEntities();

  }

  /**
   * @description
   *  Create the form
   */
  private createAdvancedForm(): void {

    this.advancedForm = this.formBuilder.group({
      dataSource: '',
      keywords: '',
      exactPhrases: '',
      containerWords: '',
      nextWords: '',
      distance: '5',
      wordsNotContained: '',
      syntax: { value: '', disabled: true }
    });

  }

  /**
   * @description
   *  Subscribtion to form changes
   */
  private subscribeAdvancedForm(): void {

    for ( const controlKey in this.advancedForm.controls ) {

      ( controlKey !== InputKey.DataSource 
        && controlKey !== InputKey.Syntax )
        && (
          this.advancedForm.get( controlKey ).valueChanges.subscribe(
            ( value: string ) => (
              typeof value !== 'number'
                && this.changeInput( controlKey, value ),
              this.fillSyntax( controlKey )
            )
          )
        )

    }

  }

  /**
   * @description
   *  Get the sources of information
   */
  private getSources(): void {

    this.commonService.getSearchSources().subscribe(
      ( response: SourceModel ) =>
        this.sources = response
    );

  }

  /**
   * @description
   *  Get entities from information sources
   */
  private getEntities(): void {

    this.commonService.getEntities().subscribe(
      ( response: EntityModel[] ) => {

        this.dataSourceList = response.map(
          ( entity: EntityModel ) => ({
            value: entity.entidad,
            label: entity.etiqueta,
            selected: false,
            disabled: false
          })
        );

        this.isDataSource = true;

      }
    );

  }

  /**
   * @description
   *  Detect changes of the selected information source
   * 
   * @param item selected source object
   */
  public changeDataSource( item: MenuSelectModel ): void {

    this.fillSyntax( InputKey.DataSource );

    this.entityFilterList = [];

    if ( !item ) { return };

    this.commonService.getFilterByEntity( item.value as string ).subscribe(
      ( response: EntityFilterModel ) => {

        this.advancedForm.removeControl( 'restrictions' );

        const restrictionsGroup: { [key: string]: any; } = { };

        for ( const entity of response.filtros ) {

          entity.bucketsFormat = [];

          entity.bucketsFormat = entity.buckets.map( ( bucket: BucketModel ) => ({
            value: bucket.filtroId !== '' ? bucket.filtroId : bucket.filtro,
            label: bucket.filtro,
            selected: false,
            disabled: false
          }));

          restrictionsGroup[entity.filtro] = '';

        }

        this.advancedForm.addControl(
          'restrictions',
          this.formBuilder.group( restrictionsGroup )
        );

        this.entityFilterList = response.filtros;

      }
    );

  }

  /**
   * @description
   *  Detect changes of the selected input
   * 
   * @param key input key changed
   * @param value value of the selected input
   */
  public changeInput( key: string, value: string ): void {

    const dataSource: string = this.advancedForm.get( 'dataSource' ).value;
    const lastChar: string = value.slice( value.length - 1 );

    if ( !dataSource ) { return };

    for ( const prop in this.inputFlag ) {

      this.inputFlag[prop] = false;

    };

    if ( lastChar !== '@' ) { return };

    this.sourceList = this.sources[dataSource];

    this.inputFlag[key] = true;

  }

  /**
   * @description
   *  Detect changes of the selected source
   * 
   * @param source selected source
   * @param key key of the selected input
   */
  public changeSource( source: SourceItemModel, key: string ): void {

    const inputValue: string = this.advancedForm.get( key ).value;

    this.selectedSource = source;

    this.inputFlag[key] = false;

    this.advancedForm.get( key ).patchValue( `${inputValue}${source.text}: ` );

    this.el.nativeElement.querySelectorAll(`[formcontrolname=${key}]`)[0].focus();

  }

  /**
   * @description
   *  Fill in the syntax tag according to the selected input
   * 
   * @param inputKey key of the selected input 
   */
  public fillSyntax( inputKey: string ): void {

    // Template
    // Fuente: <fuente>
    // + Terminos: <palabraClave> 
    // AND "<frasesExactas>" 
    // AND (<palabra OR contener>) 
    // AND "<palabraProxima>"~<cantidad> 
    // NOT (<palabra OR no OR contenida>)

    /**
     * Valor actual del input seleccionado
     */
    const inputValue: string = this.advancedForm.get( inputKey ).value;
    const regExpInput: RegExp = /(?:@)([a-zA-ZÀ-ÿ]*\s?){4}(?=:)/g;
    const inputKeywords: string = this.advancedForm.get( InputKey.Keywords ).value;

    let syntax: string = '';

    switch ( inputKey ) {
      case InputKey.DataSource:
        this.syntaxCode.dataSource = inputValue
          ? `Fuente: ${inputValue} + `
          : '';
        break;
      case InputKey.Keywords:
        if ( this.advancedForm.get( InputKey.DataSource ).value
            && inputValue.includes( '@' ) ) {

          const matchList: string[] = inputValue.match( regExpInput );

          let inputReplace: string = '';

          if ( matchList ) {

            for ( let match of matchList ) {

              match !== ''
                && (
                  inputReplace = inputReplace !== ''
                    ? ( inputReplace.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                    : ( inputValue.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                );
            }

            this.syntaxCode.keywords = `Terminos: ${inputReplace}`;

          }

        } else {

          this.syntaxCode.keywords = inputValue === ''
            ? ''
            : `Terminos: ${inputValue} `;

        }

        break;
      case InputKey.ExactPhrases:

        !inputKeywords
          && ( this.syntaxCode.keywords = 'Terminos: ' );

        if ( inputValue.includes( '@' ) ) {

          const matchList: string[] = inputValue.match( regExpInput );

          let inputReplace: string = '';

          if ( matchList ) {

            for ( let match of matchList ) {

              match !== ''
                && (
                  inputReplace = inputReplace !== ''
                    ? ( inputReplace.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                    : ( inputValue.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                );
            }

            this.syntaxCode.exactPhrases = ` AND "${inputReplace.replace( '@', '' )}"`;

          }

        } else {

          this.syntaxCode.exactPhrases = inputValue === ''
            ? ''
            : ` AND "${inputValue}" `;

        }

        break;
      case InputKey.ContainerWords:

        !inputKeywords
          && ( this.syntaxCode.keywords = 'Terminos: ' );

          if ( inputValue.includes( '@' ) ) {

            const matchList: string[] = inputValue.match( regExpInput );
  
            let inputReplace: string = '';
  
            if ( matchList ) {
  
              for ( let match of matchList ) {
  
                match !== ''
                  && (
                    inputReplace = inputReplace !== ''
                      ? ( inputReplace.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                      : ( inputValue.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                  );
              }
  
              this.syntaxCode.containerWords = ` AND (${(inputReplace.replace( '@', '' )).replace( /\s/g, ' OR ')})`;
  
            }
  
          } else {
  
            this.syntaxCode.containerWords = inputValue === ''
              ? ''
              : ` AND (${inputValue.replace( /\s/g, ' OR ' )}) `;
  
          }

        break;
      case InputKey.NextWords:

        !inputKeywords
          && ( this.syntaxCode.keywords = 'Terminos: ' );

        if ( inputValue.includes( '@' ) ) {

          const matchList: string[] = inputValue.match( regExpInput );

          let inputReplace: string = '';

          if ( matchList ) {

            for ( let match of matchList ) {

              match !== ''
                && (
                  inputReplace = inputReplace !== ''
                    ? ( inputReplace.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                    : ( inputValue.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                );
            }

            this.syntaxCode.nextWords = ` AND "${inputReplace.replace( '@', '' )}"`;

          }

        } else {

          this.syntaxCode.nextWords = inputValue === ''
            ? ''
            : ` AND "${inputValue}"`;

        }

        break;
      case InputKey.Distance:

        this.syntaxCode.distance = inputValue === ''
          ? `~5`
          : `~${inputValue}`;

        break;
      case InputKey.WordsNotContained:

        !inputKeywords
          && ( this.syntaxCode.keywords = 'Terminos: ' );

        if ( inputValue.includes( '@' ) ) {

          const matchList: string[] = inputValue.match( regExpInput );

          let inputReplace: string = '';

          if ( matchList ) {

            for ( let match of matchList ) {

              match !== ''
                && (
                  inputReplace = inputReplace !== ''
                    ? ( inputReplace.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                    : ( inputValue.replace( match, this.filterSource( match.replace( '@', '' ) ) ) )
                );
            }

            this.syntaxCode.wordsNotContained = ` AND (${(inputReplace.replace( '@', '' )).replace( /\s/g, ' OR ')})`;

          }

        } else {

          this.syntaxCode.wordsNotContained = inputValue === ''
            ? ''
            : ` AND (${inputValue.replace( /\s/g, ' OR ' )}) `;

        }
        break;
    }

    for ( const prop in this.syntaxCode )
      ( syntax = `${syntax}${this.syntaxCode[prop]}`);

    this.advancedForm.get( InputKey.Syntax ).patchValue( syntax );

  }

  private filterSource( value: string ): string {

    return this.sourceList.filter(
      ( source: SourceItemModel ) => source.text === value
    )[0]?.value || '';

  }

  public selectFilterBucket( name: string, value: string ): void {

    const extra: string = this.syntaxCode.sources.length === 0
      ? ' + Filtros: '
      : '';

    const syntax: string = this.advancedForm.get( InputKey.Syntax ).value;

    const data: string = syntax.includes( name )
      ? ` ${name}: ${value}`
      : `${name}: ${value}`;

    this.syntaxCode.sources.push( data );

    this.advancedForm.get( InputKey.Syntax ).patchValue(
      `${extra}${syntax}${data}`
    );

  }

  public clearFilterBucket( name: string, value: string ): void {

    for ( const item of this.syntaxCode.sources ) {

      item.includes( value );

    }

  }

  public cleanForm(): void {

    this.advancedForm.reset();

    this.advancedForm.get( InputKey.Distance ).patchValue( 5 );

  }

  public goToSearch(): void {



  }

}
