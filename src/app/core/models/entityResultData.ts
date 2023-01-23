import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Entities } from '../constants/entities.enum';
import { Intranet } from '../../intranet/constants/intranet.enum';
import { AnalitycTextService } from '../services/analityc-text.service';
import { Public } from '@public/constants/public.enum';
import { DatePipe } from '@angular/common';
import { FechaSemanarioSemanalPipe } from '../pipes/fecha-semanario-semanal.pipe';
import { TextNamePipe } from '../pipes/text-name.pipe';
import { MesLetraPipe } from '../pipes/mes-letra.pipe';


@Injectable({
  providedIn: 'root',
})
export class EntityResultData {
  constructor(private analitycService: AnalitycTextService,
    private date: DatePipe, 
    private semanario: FechaSemanarioSemanalPipe,
    private textName: TextNamePipe,
    private mesLetra: MesLetraPipe) {
  }

  public ConverDataHTML(
    documentEntity: any,
    query?: string,
    busquedaResultado?: string
  ): ResultData {
    let data: ResultData = new ResultData();
    switch (documentEntity.type) {
      case Entities.Cpi:
        data.href = documentEntity.urlPDF;
        data.linkTitle = documentEntity.nameCase;
        data.parrafos.push(`Fecha desición: ${documentEntity.date}`);
        data.parrafos.push(`Año: ${documentEntity.year}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Sentences_pub:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = `${documentEntity.tipoAsunto} ${documentEntity.numExpediente}`;
        data.parrafos.push(documentEntity.organoRadicacion);
        data.parrafos.push(`Ministro/a ponente: ${documentEntity.ponente}`);
        data.parrafos.push(
          `Fecha de resolución: ${this.date.transform(documentEntity.fechaResolucion, 'dd-MM-yyyy')}`
        );
        if (documentEntity.tema) data.parrafos.push(`Tema: ${documentEntity.tema}`);
        data.fileSentence = `${environment.urlFiles}${Public.SentencePubFile}${documentEntity.archivoURL}`;
        data.imgFilter.ic = documentEntity.protocolosActuacionDH ? 'icons-vdos icon-dhumanos-logo-rectangulo' : '';
        data.imgFilter.img = documentEntity.lineaJurisprudencial ? './assets/pub/img/lineaJ.png' : ''
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Sentences:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = `${documentEntity.tipoAsunto} ${documentEntity.numExpediente}`;
        data.parrafos.push(documentEntity.organoRadicacion);
        data.parrafos.push(`Ministro/a ponente: ${documentEntity.ponente}`);
        data.parrafos.push(
          `Fecha de resolución: ${this.date.transform(documentEntity.fechaResolucion, 'dd-MM-yyyy')}`
        );
        if (documentEntity.tema) data.parrafos.push(`Tema: ${documentEntity.tema}`);
        data.fileSentence = `${environment.urlFiles}${Intranet.DescargaArchivoSentencia}${documentEntity.idEngrose}`;
        data.imgFilter.ic = documentEntity.protocolosActuacionDH ? 'icons-vdos icon-dhumanos-logo-rectangulo' : '';
        data.imgFilter.img = documentEntity.lineaJurisprudencial ? './assets/pub/img/lineaJ.png' : ''
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Votes:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = `Registro digital: ${documentEntity.registroDigital}`;
        data.parrafos.push(documentEntity.rubro)
        data.parrafos.push(
          `${documentEntity.tipoAsunto} ${documentEntity.numeroExpediente} ${documentEntity.promovente}`
        );
        data.parrafos.push(
          `${documentEntity.epoca.nombre}. ${documentEntity.organoJurisdiccional}. ${documentEntity.instancia} ${documentEntity.fuente} ${documentEntity.localizacion.libro}, ${documentEntity.localizacion.anio>0 ? this.mesLetra.transform(documentEntity?.localizacion?.mes) + ' de '+ documentEntity.localizacion?.anio
            : ''} 
          ${documentEntity.localizacion.tomo ? documentEntity.localizacion.tomo : ''}`
        );
        data.parrafos.push(`${!documentEntity.emisor ? 'Voto publicado el '+ this.semanario.transform(documentEntity.fechaPublicacionSemanario)+' - Pendiente de integrar al módulo de sistematización ': ''} `)
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Thesis:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = `Registro digital: ${documentEntity.registroDigital}`;
        data.parrafos.push(documentEntity.rubro);
        data.parrafos.push(
          `${this.textName.transform(documentEntity.instancia) +'; '} ${documentEntity.epoca.numero > 0 ? documentEntity.epoca.numero + 'a. Epoca;' : documentEntity.epoca.nombre} ${documentEntity.fuente
          }; ${documentEntity.clave ? documentEntity.clave : ''}; ${documentEntity.tipo == 'Tesis Aislada' ? '[TA]' : '[J]'};`
        );
        data.parrafos.push(`Publicación: ${this.semanario.transform(documentEntity?.fechaPublicacionSemanario, 'h')}`)
        if (documentEntity?.semanarioSemanal == 1) data.parrafos.push(`Pendiente de integrar al módulo de sistematización`);
        data.extractos = documentEntity.extractos;
        data.imgFilter.img = documentEntity.lineaJurisprudencial ? './assets/pub/img/lineaJ.png' : ''
        return data;
      case Entities.Agreements:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = `Registro digital: ${documentEntity.registroDigital}`;
        data.parrafos.push(documentEntity.rubro);
        data.parrafos.push(
          `${documentEntity.epoca.nombre}. Otros. ${documentEntity.fuente}. ${documentEntity.localizacion.libro}, ${documentEntity.localizacion.anio}. ${documentEntity?.localizacion?.pagina > 0 ? 'Pág ' + documentEntity?.localizacion?.pagina + '.' : ''}`
        );
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Protocols:
        data.type = documentEntity.type;
        data.href = documentEntity.url_protocolos_dh;
        data.linkTitle = documentEntity.protocolo;
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Orderings:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.ordenamiento;
        data.parrafos.push(documentEntity.resumen);
        data.parrafos.push(`Ambito: ${documentEntity.ambito}.`);
        data.parrafos.push(
          `Ultima actualización: ${documentEntity.fechaPublicado.slice(0, 10)}.`
        );
        data.label = documentEntity.materia
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Versions:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = `Fecha de la sesión: ${documentEntity.fechaSesion}`;
        data.parrafos.push(`Instancia: ${documentEntity.organoJurisdiccional}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Library:
        data.type = documentEntity.type;
        data.acervo.title = documentEntity.titulo;
        data.acervo.autor = documentEntity.autor
          ? `Autor: ${documentEntity.autor}`
          : '';
        data.acervo.collection = `Colección: ${documentEntity.coleccion}`;
        data.acervo.pie = `Pie de imprenta: ${documentEntity.pieImprenta}`;
        data.acervo.clasificacion = documentEntity.clasificacion
          ? `Clasificación: ${documentEntity.clasificacion}`
          : '';
        data.acervo.temas = documentEntity.tema;
        data.img = documentEntity.portadaPublicacion
          ? `https://bj.scjn.gob.mx/portada/${documentEntity.portadaPublicacion}`
          : './assets/img/libro-scjn.png';
        data.acervo.url = documentEntity.url;
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Onu:
        data.type = documentEntity.type;
        data.href = `${environment.urlSistemaDenu}buscadornu/service?promulgacion=${documentEntity.promulgacion_onu}&frase= `;
        data.linkTitle = documentEntity.titulo_onu;
        data.parrafos.push(documentEntity.contenido_onu);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CoIDH_BJ:
        data.type = documentEntity.type;
        data.href = `${environment.urlCorteIdh}buscador/service?promulgacion=${documentEntity.promulgacion_bjdh}&frase= `;
        data.linkTitle = documentEntity.titulo_bjdh;
        data.parrafos.push(
          `${documentEntity.pais_bjdh} | ${documentEntity.anio_bjdh}`
        );
        data.parrafos.push(documentEntity.contenido_bjdh);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CoIDH:
        data.type = documentEntity.type;
        data.href = `${environment.urlCorteIdh}buscador/service?promulgacion=${documentEntity.promulgacion_bjdh}&frase= `;
        data.linkTitle = documentEntity.titulo_bjdh;
        data.parrafos.push(
          `${documentEntity.pais_bjdh} | ${documentEntity.anio_bjdh}`
        );
        data.parrafos.push(documentEntity.contenido_bjdh);
        data.filePdf = documentEntity.numSerie_bjdh
        data.fileWord = documentEntity.numSerie_bjdh
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CIDH:
        data.type = documentEntity.type;
        data.href = documentEntity.url;
        data.linkTitle = documentEntity.informe;
        data.parrafos.push(`País: ${documentEntity.pais}`);
        data.parrafos.push(documentEntity.tipo);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Hudoc:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.docname;
        data.parrafos.push(documentEntity.kpdateAsText.slice(0, 10));
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CIJ:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.name;
        data.parrafos.push(`Fecha decisión: ${documentEntity.date}`);
        data.parrafos.push(`Paises: ${documentEntity.countryCases.join(', ')}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.TSpanish:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.tipoNumerado;
        data.parrafos.push(documentEntity.competencia);
        data.parrafos.push(`Fecha de firma: ${documentEntity.fechaRegistro.split("T")[0]}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.TColombia:
        data.type = documentEntity.type;
        data.href = documentEntity.url;
        data.linkTitle = `${documentEntity.expediente} - ${documentEntity.sentencia}`;
        data.parrafos.push(
          `Demandado/demandante: ${documentEntity.demandadoDemandante}`
        );
        data.parrafos.push(`Proceso: ${documentEntity.proceso}`);
        data.parrafos.push(
          `Fecha de sentencia: ${documentEntity.fechaSentencia}`
        );
        data.parrafos.push(
          `Magistrado Ponente: ${documentEntity.magistradoPonente}`
        );
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.TChile:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.caratulado;
        data.parrafos.push(`Fecha deseción: ${documentEntity.fecha}`);
        data.parrafos.push(`Año: ${documentEntity.anio}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CSJNArgentina:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.nombreCaso;
        data.parrafos.push(`Fecha desición: ${documentEntity.fecha}`);
        data.parrafos.push(`Año: ${documentEntity.anio}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.TCgermany:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.name;
        data.parrafos.push(`Date decision: ${documentEntity.decision}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CourtRS:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.nameCase;
        data.parrafos.push(`Date decision: ${documentEntity.decision}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CourtUS:
        data.type = documentEntity.type;
        data.href = documentEntity.url;
        data.linkTitle = documentEntity.name;
        data.parrafos.push(`Decision date: ${documentEntity.decision}`);
        data.parrafos.push(`${documentEntity.origin} of the United States`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CourtAustralia:
        data.type = documentEntity.type;
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.nameCase;
        data.parrafos.push(`Fecha desición: ${documentEntity.date}`);
        data.parrafos.push(`Año ${documentEntity.year}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CCItaly:
        data.type = documentEntity.type;
        data.href = documentEntity.pdfUrl;
        data.linkTitle = documentEntity.nombreCaso;
        data.parrafos.push(`Presidente: ${documentEntity.presidente}`);
        data.parrafos.push(`Editor ${documentEntity.editor}`);
        data.parrafos.push(
          `Fecha desición: ${documentEntity.fhPublicacionGaceta}`
        );
        data.parrafos.push(`Año: ${documentEntity.anio}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Cadh:
        data.link = `/doc/${documentEntity.type}/${documentEntity.id}/${query ? query : '*'
          }${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.nombreCaso;
        data.parrafos.push(documentEntity.fechaCaso);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Ccj:
        data.link = `/doc/${Entities.Ccj}/${documentEntity.id}/${query ? query : '*'}${busquedaResultado ? ' ' + busquedaResultado : ''}`;
        data.linkTitle = documentEntity.temaSesion;
        data.parrafos.push(documentEntity.nbCurso);
        data.parrafos.push(`Módulo: ${documentEntity.modulo}`);
        data.parrafos.push(
          `Disertante: ${documentEntity.disertante[0].nombre}`
        );
        data.parrafos.push(`Fecha transmisión: ${documentEntity.fhsesion}`);
        data.parrafos.push(
          `Materias: ${documentEntity.materias.join(' - ')}`
        );
        data.extractos = documentEntity.extractos;
        return data;
    }
  }

  public ConverDataHTMLAnalitycText(documentEntity: any): ResultData {
    let data: ResultData = new ResultData();
    switch (documentEntity.indice) {
      case Entities.SentencesParagraph_pub:
        this.analitycService
          .getIndiceSentencia(Entities.Sentences_pub, documentEntity.idEngrose)
          .subscribe((res) => {
            data.link = `/doc/${Entities.Sentences_pub}/${res.id}/*`;
          });
        data.type = documentEntity.indice;
        data.linkTitle = `${documentEntity.tipoAsunto} ${documentEntity.numExpediente} - ${documentEntity.organoJurisdiccional}`;
        data.parrafos.push(`Ministro/a ponente: ${documentEntity.ponente}`);
        data.parrafos.push(`Fecha resolución: ${documentEntity.anio}`);
        data.parrafos.push(documentEntity.parrafo);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.SentencesParagraph:
        this.analitycService
          .getIndiceSentencia(Entities.Sentences, documentEntity.idEngrose)
          .subscribe((res) => {
            data.link = `/doc/${Entities.Sentences}/${res.id}/*`;
          });
        data.type = documentEntity.indice;
        data.linkTitle = `${documentEntity.tipoAsunto} ${documentEntity.numExpediente} - ${documentEntity.organoJurisdiccional}`;
        data.parrafos.push(`Ministro/a ponente: ${documentEntity.ponente}`);
        data.parrafos.push(`Fecha resolución: ${documentEntity.anio}`);
        data.parrafos.push(documentEntity.parrafo);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Votes:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = `Registro digital: ${documentEntity.registroDigital}`;
        data.parrafos.push(documentEntity.rubro)
        data.parrafos.push(
          `${documentEntity.epoca.nombre}. ${documentEntity.fuente}. ${documentEntity.localizacion.libro}, ${documentEntity.localizacion.mes} de ${documentEntity.localizacion.anio}`
        );
        data.parrafos.push(documentEntity.rubro);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Thesis:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = `Registro digital: ${documentEntity.registroDigital}`;
        data.parrafos.push(documentEntity.rubro);
        data.parrafos.push(
          `${this.textName.transform(documentEntity.instancia)+'; '} ${documentEntity.epoca.numero > 0 ? documentEntity.epoca.numero + 'a. Epoca;' : documentEntity.epoca.nombre} ${documentEntity.fuente
          }; ${documentEntity.clave ? documentEntity.clave : ''}; ${documentEntity.tipo == 'Tesis Aislada' ? '[TA]' : '[J]'};`
        );
        data.parrafos.push(`Publicación: ${this.semanario.transform(documentEntity?.fechaPublicacionSemanario, 'h')}`)
        if (documentEntity?.semanarioSemanal == 1) data.parrafos.push(`Pendiente de integrar al módulo de sistematización`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Agreements:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = `Registro digital: ${documentEntity.registroDigital}`;
        data.parrafos.push(documentEntity.rubro);
        data.parrafos.push(
          `${documentEntity.epoca.nombre}. Otros. ${documentEntity.fuente}. ${documentEntity.localizacion.libro}, ${documentEntity.localizacion.anio}.`
        );
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Protocols:
        data.type = documentEntity.indice;
        data.href = documentEntity.url_protocolos_dh;
        data.linkTitle = documentEntity.protocolo;
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Orderings:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.ordenamiento;
        data.parrafos.push(documentEntity.resumen);
        data.parrafos.push(`Ambito: ${documentEntity.ambito}.`);
        data.parrafos.push(
          `Ultima actualización: ${documentEntity.fechaPublicado}.`
        );
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Versions:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = `Fecha de la sesión: ${documentEntity.fechaSesion}`;
        data.parrafos.push(
          `${documentEntity.instancia}, ${documentEntity.organoJurisdiccional}`
        );
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Library:
        data.type = documentEntity.indice;
        data.acervo.title = documentEntity.titulo;
        data.acervo.autor = documentEntity.autor
          ? `Autor: ${documentEntity.autor}`
          : '';
        data.acervo.collection = `Colección: ${documentEntity.coleccion}`;
        data.acervo.pie = `Pie de imprenta: ${documentEntity.pieImprenta}`;
        data.acervo.clasificacion = documentEntity.clasificacion
          ? `Clasificación: ${documentEntity.clasificacion}`
          : '';
        data.acervo.temas = documentEntity.tema;
        data.img = documentEntity.portadaPublicacion
          ? `https://bj.scjn.gob.mx/portada/${documentEntity.portadaPublicacion}`
          : './assets/img/libro-scjn.png';
        data.acervo.url = documentEntity.url;
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Onu:
        data.type = documentEntity.indice;
        data.href = `${environment.urlSistemaDenu}buscadornu/service?promulgacion=${documentEntity.promulgacion_onu}&frase= `;
        data.linkTitle = documentEntity.titulo_onu;
        data.parrafos.push(documentEntity.contenido_onu);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CoIDH_BJ:
        data.type = documentEntity.indice;
        data.href = `${environment.urlCorteIdh}buscador/service?promulgacion=${documentEntity.promulgacion_bjdh}&frase= `;
        data.linkTitle = documentEntity.titulo_bjdh;
        data.parrafos.push(documentEntity.contenido_bjdh);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CoIDH:
        data.type = documentEntity.indice;
        data.href = `${environment.urlCorteIdh}buscador/service?promulgacion=${documentEntity.promulgacion_bjdh}&frase= `;
        data.linkTitle = documentEntity.titulo_bjdh;
        data.parrafos.push(documentEntity.contenido_bjdh);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CIDH:
        data.type = documentEntity.indice;
        data.href = documentEntity.url;
        data.linkTitle = documentEntity.informe;
        data.parrafos.push(`País: ${documentEntity.pais}`);
        data.parrafos.push(documentEntity.tipo);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Hudoc:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.docname;
        data.parrafos.push(documentEntity.conclusion);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CIJ:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.name;
        data.parrafos.push(`Fecha decisión: ${documentEntity.date}`);
        data.parrafos.push(`Paises: ${documentEntity.countryCases.join(', ')}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.TSpanish:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.tipoNumerado;
        data.parrafos.push(
          documentEntity.sintesisAnalitica
            ? documentEntity.sintesisAnalitica
            : ''
        );
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.TColombia:
        data.type = documentEntity.indice;
        data.href = documentEntity.url;
        data.linkTitle = `${documentEntity.expediente}`;
        data.parrafos.push(documentEntity.tema);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.TChile:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.caratulado;
        data.parrafos.push(`Fecha deseción: ${documentEntity.fecha}`);
        data.parrafos.push(`Año: ${documentEntity.anio}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CSJNArgentina:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.nombreCaso;
        data.parrafos.push(`Fecha desición: ${documentEntity.fecha}`);
        data.parrafos.push(`Año: ${documentEntity.anio}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.TCgermany:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.name;
        data.parrafos.push(`Date decision: ${documentEntity.decision}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CourtRS:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.nameCase;
        data.parrafos.push(`Date decision: ${documentEntity.decision}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CourtUS:
        data.type = documentEntity.indice;
        data.href = documentEntity.url;
        data.linkTitle = documentEntity.name;
        data.parrafos.push(`Decision date: ${documentEntity.decision}`);
        data.parrafos.push(`${documentEntity.origin} of the United States`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CourtAustralia:
        data.type = documentEntity.indice;
        data.link = `/doc/${documentEntity.indice}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.nameCase;
        data.parrafos.push(`Fecha desición: ${documentEntity.date}`);
        data.parrafos.push(`Año ${documentEntity.year}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.CCItaly:
        data.type = documentEntity.indice;
        data.href = documentEntity.pdfUrl;
        data.linkTitle = documentEntity.nombreCaso;
        data.parrafos.push(`Presidente: ${documentEntity.presidente}`);
        data.parrafos.push(`Editor ${documentEntity.editor}`);
        data.parrafos.push(
          `Fecha desición: ${documentEntity.fhPublicacionGaceta}`
        );
        data.parrafos.push(`Año: ${documentEntity.anio}`);
        data.extractos = documentEntity.extractos;
        return data;
      case Entities.Ccj:
        data.link = `/doc/${Entities.Ccj}/${documentEntity.id}/*`;
        data.linkTitle = documentEntity.temaSesion;
        data.parrafos.push(documentEntity.nbCurso);
        data.parrafos.push(`Módulo: ${documentEntity.modulo}`);
        data.parrafos.push(
          `Disertante: ${documentEntity.disertante[0].nombre}`
        );
        data.parrafos.push(`Fecha transmisión: ${documentEntity.fhsesion}`);
        data.parrafos.push(
          `Materias: ${documentEntity.materias.join(' - ')}`
        );
        data.extractos = documentEntity.extractos;
        return data;
    }
  }
}

export class ResultData {
  link: string = '';
  href: string = '';
  linkTitle: string = '';
  parrafos: string[] = [];
  label: string[] = [];
  img: string = '';
  acervo: Acervo = new Acervo();
  extractos: any[] = [];
  type: string;
  fileSentence: string;
  filePdf: string
  fileWord: string
  imgFilter: Figures = new Figures()
}

export class Figures {
  ic: string
  img: string
}

export class Acervo {
  title: string;
  autor: string;
  collection: string;
  pie: string;
  clasificacion: string;
  temas: string[];
  url: string[];
}
