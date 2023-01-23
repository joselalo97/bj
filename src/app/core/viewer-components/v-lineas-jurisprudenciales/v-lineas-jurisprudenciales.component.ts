import { Component, Input, OnInit } from '@angular/core';
import { Entities } from '@core/constants';
import { DocTesisModel, DocumentModel, Entity } from '@core/models';
import { ViewerService } from '@core/services';
import { environment } from '@environment/environment';

@Component({
  selector: 'v-lineas-jurisprudenciales',
  templateUrl: './v-lineas-jurisprudenciales.component.html',
  styleUrls: ['./v-lineas-jurisprudenciales.component.scss'],
})
export class VLineasJurisprudencialesComponent {
  document: DocumentModel | DocTesisModel = {} as DocumentModel | DocTesisModel;
  public data: any;
  dataTesis: Array<any> = new Array<any>();
  isTesis = false;
  public tesisRelacionadas: any;
  public sentenciasRelacionadas: any[] = [];
  public entity = environment.environmentType == 'Pub' ? Entities.Sentences_pub : Entities.Sentences
  public lineas = [
    {
      name: 'Adopción',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/adopcion',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/CUADERNILLO%20DF_03_ADOPCIO%CC%81N_FINAL%20OCTUBRE.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/nuevas_portadas-05.png?itok=7R8gAere',
    },
    {
      name: 'Concubinato y uniones familiares',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/concubinato-y-uniones-familiares',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/CUADERNO%20DF_04_CONCUBINATO_FINAL%20OCTUBRE.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/Portada_concubinato.jpg?itok=fPuUeWhB',
    },
    {
      name: 'Compensación económica',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/compensacion-economica',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/Compensaci%C3%B3n%20econ%C3%B3mica-Versi%C3%B3n%20Final%208%20de%20julio.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/portada_compensacion.PNG?itok=SPYuQi6f',
    },
    {
      name: 'Contenido y alcance de derecho humano a un medio ambiente sano',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/contenido-y-alcance-del-derecho-humano-un-medio-ambiente-sano',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/CONTENIDO%20Y%20ALCANCE%20DEL%20DH%20A%20UN%20MEDIO%20AMBIENTE%20SANO_VERSION%20FINAL_10%20DE%20JULIO_0.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/portada_medioambiente_0.PNG?itok=Lctbo0h1',
    },
    {
      name: 'Contenido y alcance del derecho humano a un medio ambiente sano',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/contenido-y-alcance-del-derecho-humano-un-medio-ambiente-sano',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/CONTENIDO%20Y%20ALCANCE%20DEL%20DH%20A%20UN%20MEDIO%20AMBIENTE%20SANO_VERSION%20FINAL_10%20DE%20JULIO_0.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/portada_medioambiente_0.PNG?itok=Lctbo0h1',
    },
    {
      name: 'Derecho a la propiedad de la tierra el territorio y los recursos naturales de los pueblos y comunidades indígenas',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/derecho-la-propiedad-de-la-tierra-el-territorio-y-los-recursos-naturales-de-los',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/DERECHO%20A%20LA%20PROPIEDAD_VERSION%20FINAL%20OCTUBRE.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/nuevas_portadas-02.png?itok=YRyFzkpB',
    },
    {
      name: 'Derecho a la propiedad de la tierra; el territorio y los recursos naturales de los pueblos y comunidades indígenas',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/derecho-la-propiedad-de-la-tierra-el-territorio-y-los-recursos-naturales-de-los',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/DERECHO%20A%20LA%20PROPIEDAD_VERSION%20FINAL%20OCTUBRE.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/nuevas_portadas-02.png?itok=YRyFzkpB',
    },
    {
      name: 'Derecho de Daños. Responsabilidad extracontractual.',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/derecho-de-danos-responsabilidad-extracontractual',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/Cuadernillo%20Derecho%20de%20dan%CC%83os_Final%20octubre.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/nuevas_portadas-01.png?itok=R8t9Ly_L',
    },
    {
      name: 'Derecho de Daños. Responsabilidad extracontractual',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/derecho-de-danos-responsabilidad-extracontractual',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/Cuadernillo%20Derecho%20de%20dan%CC%83os_Final%20octubre.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/nuevas_portadas-01.png?itok=R8t9Ly_L',
    },
    {
      name: 'Derecho de las personas con discapacidad',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/derechos-de-las-personas-con-discapacidad',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/Cuadernillo%20Discapacidad_Final%20octubre.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/nuevas_portadas-03.png?itok=XXwBp4xu',
    },
    {
      name: 'Derechos de la diversidad sexual',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/los-derechos-de-la-diversidad-sexual',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/Diversidad%20sexual-Version%20Final%209%20de%20julio.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/diver_portada.PNG?itok=WyP6cUZi',
    },
    {
      name: 'Los derechos de la diversidad sexual',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/los-derechos-de-la-diversidad-sexual',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/Diversidad%20sexual-Version%20Final%209%20de%20julio.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/diver_portada.PNG?itok=WyP6cUZi',
    },
    {
      name: 'Libertad de expresión y periodismo',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/libertad-de-expresion-y-periodismo',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/Libertad%20de%20expresi%C3%B3n_Versi%C3%B3n%20Final%208%20de%20julio%20copia.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/Portada%20libertad%20de%20expresi%C3%B3n.PNG?itok=1bz9dW41',
    },
    {
      name: 'Restitución internacional de niñas; niños y adolescentes',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/restitucion-internacional-de-ninas-ninos-y-adolescentes',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/Restituci%C3%B3n_Versi%C3%B3n%20Final_8%20de%20julio_0.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/portada_restitucion_0.PNG?itok=orRXMt7H',
    },
    {
      name: 'Derecho y familia',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/concubinato-y-uniones-familiares',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/CUADERNO%20DF_04_CONCUBINATO_FINAL%20OCTUBRE.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/Portada_concubinato.jpg?itok=fPuUeWhB',
    },
    {
      name: 'Derechos Sociales',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/contenido-y-alcance-del-derecho-humano-un-medio-ambiente-sano',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/CONTENIDO%20Y%20ALCANCE%20DEL%20DH%20A%20UN%20MEDIO%20AMBIENTE%20SANO_VERSION%20FINAL_10%20DE%20JULIO_0.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/portada_medioambiente_0.PNG?itok=Lctbo0h1',
    },

    {
      name: 'Igualdad',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/derechos-de-las-personas-con-discapacidad',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/Cuadernillo%20Discapacidad_Final%20octubre.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/Portada_discapacidad.jpg?itok=5Ovdf7-a',
    },
    {
      name: 'Libertad religiosa',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/libertad-de-expresion-y-periodismo',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/Libertad%20de%20expresi%C3%B3n_Versi%C3%B3n%20Final%208%20de%20julio%20copia.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/Portada%20libertad%20de%20expresi%C3%B3n.PNG?itok=1bz9dW41',
    },
    {
      name: 'Libre desarrollo de la personalidad',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/contenido-y-alcance-del-derecho-humano-un-medio-ambiente-sano',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-07/CONTENIDO%20Y%20ALCANCE%20DEL%20DH%20A%20UN%20MEDIO%20AMBIENTE%20SANO_VERSION%20FINAL_10%20DE%20JULIO_0.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-07/portada_medioambiente_0.PNG?itok=Lctbo0h1',
    },
    {
      name: 'Medio Ambiente',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/evidencia-cientifica',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/EVIDENCIA%20CIENTIFICA_VERSION%20FINAL%20OCTUBRE.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/Portada_evidencia-01.jpg?itok=KLwVM9M2',
    },
    {
      name: 'Reparación del daño',
      urlDescripcion:
        'https://www.sitios.scjn.gob.mx/cec/biblioteca-virtual/derecho-de-danos-responsabilidad-extracontractual',
      urlDownload:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/publication/documents/2020-10/Cuadernillo%20Derecho%20de%20dan%CC%83os_Final%20octubre.pdf',
      urlImage:
        'https://www.sitios.scjn.gob.mx/cec/sites/default/files/styles/publication_detail/public/publication/cover/2020-10/portada_dan%CC%83os-01.jpg?itok=EDbwf8DH',
    },
    {
      name: 'Control de convencionalidad',
      urlDescripcion: '',
      urlDownload: '',
      urlImage: 'assets/imgGenerica.jpg',
    },
  ];
  public entitys = Entities;
  @Input() set sentencia(doc: DocumentModel | DocTesisModel) {
    if (doc.id) {
      this.document = doc;
      if (doc) {
        if (doc.tipo != undefined) {
          let tipo: string = doc.tipo;
          let lineasName: string = '';
          if (tipo.includes('Tesis')) {
            this.isTesis = true;
            this.dataTesis = [];
            if (doc['lineaJurisprudencial'].length != undefined) {
              doc['lineaJurisprudencial'].forEach((lineaTesis) => {
                if (
                  this.lineas.find(
                    (linea) =>
                      linea.name.toLocaleLowerCase() ==
                      String(lineaTesis.linea).toLocaleLowerCase()
                  )
                ) {
                  this.dataTesis.push(
                    this.lineas.find(
                      (linea) =>
                        linea.name.toLocaleLowerCase() ==
                        String(lineaTesis.linea).toLocaleLowerCase()
                    )
                  );
                  lineasName = lineaTesis.linea + ', ' + lineasName;
                }
              });
            } else {
              if (
                doc['lineaJurisprudencial'] != null &&
                doc['lineaJurisprudencial'] != undefined
              ) {
                if (
                  this.lineas.find(
                    (linea) =>
                      linea.name.toLocaleLowerCase() ==
                      String(
                        doc['lineaJurisprudencial'].linea
                      ).toLocaleLowerCase()
                  )
                ) {
                  this.dataTesis.push(
                    this.lineas.find(
                      (linea) =>
                        linea.name.toLocaleLowerCase() ==
                        String(
                          doc['lineaJurisprudencial'].linea
                        ).toLocaleLowerCase()
                    )
                  );
                  lineasName =
                    doc['lineaJurisprudencial'].linea + ', ' + lineasName;
                }
              }
            }
            if (lineasName != '') {
              this.viewerService
                .getDocsByLineaJurisprudencialTesis(lineasName)
                .subscribe((data) => {
                  this.tesisRelacionadas = data;
                });
            }
          }
        } else {
          this.lineas.forEach((linea) => {
            if (
              String(doc['lineaJurisprudencial'].nombre).toLocaleLowerCase() ===
              linea.name.toLocaleLowerCase()
            ) {
              this.data = linea;

              this.viewerService
                .getDocsByLineaJurisprudencial(
                  doc['lineaJurisprudencial'].nombre
                )
                .subscribe((data) => {
                  this.sentenciasRelacionadas = data;
                });
            }
          });
        }
      }
    }
  }

  get sentencia(): DocumentModel | DocTesisModel {
    return this.document;
  }

  constructor(private readonly viewerService: ViewerService) {}

  public getUrl(data: any, sentencia: any): string {
    let url: string = '';
    let pagina: number = 1;
    if (sentencia.refCuadernillo) {
      for (let i = 0; i < sentencia.refCuadernillo.length; i++) {
        if (
          data.name
            .replace(/del/g, '')
            .replace(/de/g, '')
            .replace(/\,/g, '')
            .replace(/\./g, '')
            .replace(/\;/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') ===
          sentencia.refCuadernillo[i].lineaJurisprudencia
            .replace(/del/g, '')
            .replace(/de/g, '')
            .replace(/\,/g, '')
            .replace(/\./g, '')
            .replace(/\;/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        ) {
          pagina = sentencia.refCuadernillo[i].pagina[0];
          break;
        }
      }
    } else {
      pagina = 1;
    }
    return (url = data.urlDownload.concat(`#page=${pagina}`));
  }
}
