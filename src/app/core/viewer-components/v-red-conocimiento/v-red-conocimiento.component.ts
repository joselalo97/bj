import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { QueryParams } from '@core/models';
import { ConvertQuery } from '@intranet/models/convertQuery';
import { ResultService } from 'app/core/services/result.service';

declare var Highcharts: any;

@Component({
  selector: 'v-red-conocimiento',
  templateUrl: './v-red-conocimiento.component.html',
  styleUrls: ['./v-red-conocimiento.component.scss']
})
export class VRedConocimientoComponent implements OnInit {

  public isLoad: boolean = true
  relacionRedEngroses = [];
  relacionRedExport = [];
  convert: ConvertQuery = new ConvertQuery();

  @Input() set doc(relacionRed: any) {
    this.isLoad = true
    if (relacionRed.relacion != undefined && relacionRed.relacion.length > 0) {
      let linea = []
      this.relacionRedEngroses, linea = relacionRed.relacion;
      this.createData(linea);
    }
  }

  get doc(): any {
    return this.relacionRedEngroses;
  }

  constructor(private http: HttpClient, private readonly resultService: ResultService) {
    this.loadScripts()
  }

  ngOnInit() {
  }

  createData(linea: any[]) {
    setTimeout(() => {

      let nodeColor = '';
      var nodoSentencia = "#ffff00", //24135f
        nodoAcuerdo = "#6BBBAE ",
        nodoOrdenamiento = "#992f87",
        nodoTesis_Jurisprudencia = "#97c2fc",
        nodoTratados_Int = "#2F70FC",
        nodoTesis_Ais = "#504286",
        nodoCaso_Coidh = "#ad85e4",
        nodoCaso_Expediente = "#fb7e81";

      let dataNodes = [];
      let nodeStyle;
      let listNodeStyle = [];
      let node;
      let nodeExport;
      let sizeTitulo = 70;
      //console.log(linea);
      for (let i = 0; i < linea.length; i++) {
        let nodeTo = "";
        let nodeValue = "";

        switch (linea[i]['entidad']) {

          case "Sentencia":
            nodeTo = linea[i]['entidad'] + ' ' + linea[i]['num_exp'];
            nodeColor = nodoSentencia;
            nodeValue = "<strong>Sentencia</strong>" + "<br>" + "<strong>Pertenencia:</strong> " + linea[i]['pertenencia'] + "<br>" + "<strong>Tipo de Asunto:</strong> " + linea[i]['tipo_asunto'] + "<br>" + "<strong>Fecha de resolución:</strong> " + linea[i]['fecha_resolucion'] + "<br>" + "<strong>No. Expediente:</strong> " + linea[i]['num_exp'] + "<br>" + "<strong>Año:</strong> " + linea[i]['anio'];
            nodeExport = "<strong>Pertenencia:</strong> " + linea[i]['pertenencia'] + "<br>" + "<strong>Tipo de Asunto:</strong> " + linea[i]['tipo_asunto'] + "<br>" + "<strong>Fecha de resolución:</strong> " + linea[i]['fecha_resolucion'] + "<br>" + "<strong>No. Expediente:</strong> " + linea[i]['num_exp'] + "<br>" + "<strong>Año:</strong> " + linea[i]['anio'];

            break;
          case "Tesis_Jurisprudencia":
            //nodeTo = linea[i]['titulo'] + ' ' + linea[i]['registro_digital']
            nodeTo = linea[i]['titulo'].toString().length >= sizeTitulo ? linea[i]['titulo'].toString().substring(0, sizeTitulo) + '... ' + linea[i]['registro_digital'] : linea[i]['titulo'].toString() + ' ' + linea[i]['registro_digital'];
            nodeValue = '<strong>Tesis de Jurisprudencia</strong>' + '<br>' + "<strong>Titulo:</strong> " + linea[i]['titulo'] + '<br>' + "<strong>Epoca:</strong> " + linea[i]['epoca'] + "<br>" + "<strong>Instancia:</strong> " + linea[i]['instancia'] + "<br>" + "<strong>Registro digital:</strong> " + linea[i]['registro_digital'] + "<br>" + "<strong>Materias:</strong> " + linea[i]['materias'] + "<br>" + "<strong>Año:</strong> " + linea[i]['anio'];
            nodeColor = nodoTesis_Jurisprudencia;
            nodeExport = "<strong>Titulo:</strong> " + linea[i]['titulo'] + '<br>' + "<strong>Epoca:</strong> " + linea[i]['epoca'] + "<br>" + "<strong>Instancia:</strong> " + linea[i]['instancia'] + "<br>" + "<strong>Registro digital:</strong> " + linea[i]['registro_digital'] + "<br>" + "<strong>Materias:</strong> " + linea[i]['materias'] + "<br>" + "<strong>Año:</strong> " + linea[i]['anio'];

            break;
          case "Acuerdo":
            nodeTo = linea[i]['acuerdo']
            nodeValue = "<strong>Acuerdo</strong>" + "<br>" + "<strong>Acuerdo:</strong> " + linea[i]['acuerdo'] + "<br>" + "<strong>Instancia:</strong> " + linea[i]['instancia'];
            nodeExport = "<strong>Acuerdo:</strong> " + linea[i]['acuerdo'] + "<br>" + "<strong>Instancia:</strong> " + linea[i]['instancia'];
            nodeColor = nodoAcuerdo;
            break;
          case "Ordenamiento":
            nodeTo = linea[i]['ley'];
            nodeValue = "<strong>Ordenamiento</strong>" + '<br>' + linea[i]['ley'];
            nodeExport = linea[i]['ley'];
            nodeColor = nodoOrdenamiento;
            break;
          case "Caso_coidh":
            //console.log(linea[i]);
            nodeTo = linea[i]['num_seccion'];
            nodeValue = "<strong>Caso Coidh</strong>" + '<br>' + linea[i]['num_seccion'];
            let dataNodeCoidh = "<strong>Número de Caso:</strong> " + linea[i]['num_seccion'] + "<br>";
            linea[i]['juez_presidente'] != "null" ? dataNodeCoidh += "<strong>Juez Presidente:</strong> " + linea[i]['juez_presidente'] + "<br>" : "";
            linea[i]['caso'] != "null" ? dataNodeCoidh += "<strong>Nombre del Caso:</strong> " + linea[i]['caso'] + "<br>" : "";
            linea[i]['pais'] != "null" ? dataNodeCoidh += "<strong>País:</strong> " + linea[i]['pais'] + "<br>" : "";
            //dataNodeCoidh += linea[i]['url'] != null ? "<strong>Link:</strong> " + linea[i]['url'] + "<br>" : "";
            /*nodeExport = "<strong>Número de Caso:</strong> " + linea[i]['num_seccion'] + "<br>" + "<strong>Juez Presidente:</strong> " + linea[i]['juez_presidente'] + "<br>" +
              "<strong>Nombre del Caso:</strong> " + linea[i]['caso'] + "<br>" + "<strong>País:</strong> " + linea[i]['pais'] + "<br>"; */
            nodeExport = dataNodeCoidh;
            nodeColor = nodoCaso_Coidh;
            break;
          case "Tesis_Aislada":
            //nodeTo = linea[i]['titulo'] + ' ' + linea[i]['registro_digital'];
            nodeTo = linea[i]['titulo'].toString().length >= sizeTitulo ? linea[i]['titulo'].toString().substring(0, sizeTitulo) + '... ' + linea[i]['registro_digital'] : linea[i]['titulo'].toString() + ' ' + linea[i]['registro_digital'];
            nodeValue = "<strong>Tesis Aislada</strong>" + '<br>' + "<strong>Titulo:</strong> " + linea[i]['titulo'] + '<br>' + "<strong>Epoca:</strong> " + linea[i]['epoca'] + '<br>' + "<strong>Instancia:</strong> " + linea[i]['instancia'] + '<br>' + "<strong>Materias:</strong> " + linea[i]['materias'] + '<br>' + "<strong>Registro digital:</strong> " + linea[i]['registro_digital'];
            nodeExport = "<strong>Titulo:</strong> " + linea[i]['titulo'] + '<br>' + "<strong>Epoca:</strong> " + linea[i]['epoca'] + '<br>' + "<strong>Instancia:</strong> " + linea[i]['instancia'] + '<br>' + "<strong>Materias:</strong> " + linea[i]['materias'] + '<br>' + "<strong>Registro digital:</strong> " + linea[i]['registro_digital'];;
            /*  console.log(linea);
             console.log(nodeExport); */
            nodeColor = nodoTesis_Ais;
            break;
          case "Expediente":
            nodeTo = linea[i]['entidad'] + ' ' + linea[i]['num_exp'];
            nodeValue = "<strong>Expediente</strong>" + "<br>" + "<strong>Pertenencia:</strong> " + linea[i]['pertenencia'] + "<br>" + "<strong>Tipo de Asunto:</strong> " + linea[i]['tipo_asunto'] + "<br>" + "<strong>Fecha de resolución:</strong> " + linea[i]['fecha_resolucion'] + "<br>" + "<strong>No. Expediente:</strong> " + linea[i]['num_exp'] + "<br>" + "<strong>Año:</strong> " + linea[i]['anio'];
            nodeExport = "<strong>Pertenencia:</strong> " + linea[i]['pertenencia'] + "<br>" + "<strong>Tipo de Asunto:</strong> " + linea[i]['tipo_asunto'] + "<br>" + "<strong>Fecha de resolución:</strong> " + linea[i]['fecha_resolucion'] + "<br>" + "<strong>No. Expediente:</strong> " + linea[i]['num_exp'] + "<br>" + "<strong>Año:</strong> " + linea[i]['anio'];
            nodeColor = nodoCaso_Expediente;
            break;
          case "Tratados_Internacionales":
            nodeTo = linea[i]['tratado'];
            nodeValue = "<strong>Tratados Internacionales</strong>" + '<br>' + linea[i]['tratado'];
            nodeExport = linea[i]['tratado'];
            nodeColor = nodoTratados_Int;
            break;
        }

        node = {
          from: linea[0]['entidad'] + ' ' + linea[0]['num_exp'],
          to: nodeTo,
          value: nodeValue,
          width: 3,
        }

        this.relacionRedExport.push(
          {
            entidad: linea[i]['entidad'],
            text: nodeExport
          }

        );
        dataNodes.push(node);

        let radioNoide = 0;
        radioNoide = 20;
        nodeStyle = {
          id: nodeTo,
          marker: {
            radius: radioNoide
          },
          color: nodeColor
        }
        listNodeStyle.push(nodeStyle);
      }


      Highcharts.chart('container', {
        chart: {
          type: 'networkgraph',
          /* borderWidth: 1,
          plotBorderWidth: 1, */
          //height: '60%'
        },
        title: {
          text: ''
        },
        /*  subtitle: {
           text: 'A Force-Directed Network Graph in Highcharts'
         }, */
        tooltip: {
          formatter: function () {
            /*  console.log(this.point);
             console.log(this.point.linksTo[0].value); */
            //console.log(this.point.linksFrom[0].value);

            var text =
              this.point.name + '<br>';
            this.point.linksTo[0].value.split('\n').forEach(function (value) {
              text += value + '<br>';
            });
            //console.log(this.point.linksFrom);
            //text += this.point.linksFrom[0].value;
            /*  if (this.point.linksFrom[0]) {
               text += 'Description: ' + this.point.linksFrom[0].value;
             } */
            return this.point.linksTo[0].value;
          }
        },
        plotOptions: {
          networkgraph: {
            keys: ["from", "to"],
            layoutAlgorithm: {
              enableSimulation: true,
              friction: -0.9
            }
          }
        },
        series: [{
          accessibility: {
            enabled: true
          },
          marker: {
            radius: 10
          },
          dataLabels: {
            enabled: true,
            linkFormat: "",
            allowOverlap: true,
            style: {
              textOutline: false
            },
          },
          //id: 'lang-tree',
          data: dataNodes,
          nodes: listNodeStyle
        }],
        navigation: {
          buttonOptions: {
            align: 'left',
            symbolStroke: '#24135f'
          }
        },
        exporting: {
          filename: 'red_de_conocimiento',
          buttons: {
            contextButton: {
              text: 'Exportar',
              menuItems: [
                {
                  textKey: 'fullscreen',
                  text: 'Pantalla Completa',
                  onclick: function () {
                    this.fullscreen.toggle();
                  }
                },
                {
                  textKey: 'printChart',
                  text: 'Imprimir',
                  onclick: function () {
                    this.print();
                  }
                }, {
                  separator: true
                }, {
                  textKey: 'downloadPNG',
                  text: 'Descargar a PNG',
                  onclick: function () {
                    this.exportChart();
                  }
                }, {
                  textKey: 'downloadJPEG',
                  text: 'Descargar a JPEG',
                  onclick: function () {
                    this.exportChart({
                      type: 'image/jpeg'
                    });
                  }
                }, {
                  separator: true
                }, {
                  textKey: 'downloadPDF',
                  text: 'Descargar a PDF',
                  onclick: function () {
                    this.exportChart({
                      type: 'application/pdf'
                    });
                  }
                }, {
                  textKey: 'downloadSVG',
                  text: 'Descarga a SVG',
                  onclick: function () {
                    this.exportChart({
                      type: 'image/svg+xml'
                    });
                  }
                }
              ]
            }
          }
        },
        credits: {
          enabled: false
        }
      });

      this.isLoad = false

    }, 1000)
  }

  private loadScripts() {
    let highcharts = document.createElement('script');
    let networkgraph = document.createElement('script');
    let accessibility = document.createElement('script');
    let exporth = document.createElement('script');

    highcharts.src = "https://code.highcharts.com/highcharts.js";
    highcharts.id = "high"
    if (document.getElementById('high') == null) document.body.append(highcharts);
    networkgraph.src = "https://code.highcharts.com/modules/networkgraph.js";
    networkgraph.id = "net"
    accessibility.src = "https://code.highcharts.com/modules/accessibility.js";
    accessibility.id = "access"
    exporth.src = "https://code.highcharts.com/modules/exporting.js";
    exporth.id = "export"

    const scripts = setTimeout(() => {
      if (document.getElementById('net') == null) document.body.append(networkgraph);
      if (document.getElementById('access') == null) document.body.append(accessibility);
      if (document.getElementById('export') == null) document.body.append(exporth);
      clearTimeout(scripts)
    }, 500)
  }

  public redictDoc(nodo: string, data: string) {
    //console.log(nodo);
    switch (nodo) {
      case 'Tesis_Jurisprudencia':
      case 'Tesis_Aislada':
        this.urlTesis(data)
        break;
      case 'Expediente':
        let numExp = data['text'].split(" ");
        numExp.forEach((num, i) => {
          if (num.match("[0-9]")) {
            this.urlExpediente(data['text'], num)
          }
        })
        break;
      case 'Ordenamiento':
        this.urlOrdenamiento(data)
        break;
      case 'Caso_coidh':
        this.urlCasoCoidh(data)
        break;
    }
  }

  private urlTesis(nodos: any) {
    //console.log(nodos.text);
    if (nodos.text.includes("Registro digital")) {
      let id: string = ""
      let campos: string[] = nodos.text.split('<br>');
      let registroDigital: any = "";
      campos.forEach(campo => {
        if (campo.includes("Registro")) {
          registroDigital = campo.split('</strong>');
          registroDigital = registroDigital[1].trim();
        }
      });
      //console.log(registroDigital);
      let param: QueryParams = {};
      param.q = registroDigital;
      param.page = 1;
      param.extractos = 120;
      param.indice = "tesis";
      param.size = 10;
      this.resultService.getSearch(this.convert.convertQueryParamsResults(param)).subscribe(res => {
        //console.log(res);
        let result = res.resultados.find(re => re.registroDigital == registroDigital);
        //console.log(result);
        if (result != null) {
          id = result.id;
          //window.open(`http://bj.scjn.pjf.gob.mx/doc/tesis/${id}/*`, '_blank');
          window.open(`http://bj.scjn.gob.mx/doc/tesis/${id}/*`, '_blank');
        }
      })
    }
  }

  private urlExpediente(nodos: any, num: any) {

    let part = num.includes('<br>')
      ?
      num.split('<br>')[0].trim()
      :
      num.trim();

    let expediente = nodos.split('</strong>')[1].trim().split('<br>')[0];
    let param: QueryParams = {};
    param.q = expediente;
    param.page = 1;
    param.extractos = 120;
    param.indice = "sentencias";
    param.size = 10;
    param.busquedaResultados = `AND numExpediente:${part}`;
    this.resultService.getSearch(this.convert.convertQueryParamsResults(param)).subscribe(res => {
      if (res.resultados.length >= 1) {
        window.open(`http://bj.scjn.pjf.gob.mx/doc/sentencias/${res.resultados[0].id}/*`, '_blank')
      }
    });

  }

  private urlOrdenamiento(nodos: any) {
    console.log(nodos.text);
    if (nodos.text != undefined) {
      let ordenamiento = nodos.text;
      if (ordenamiento == 'LEY DE AMPARO') {
        window.open(`https://bj.scjn.gob.mx/doc/legislacion/SNNn9nMB1tiV43eLQ48X`, '_blank')
      }
      else {
        let param: QueryParams = {};
        param.q = ordenamiento;
        param.page = 1;
        param.extractos = 120;
        param.indice = "legislacion";
        param.size = 20;
        param.busquedaResultados = `AND ordenamiento:${ordenamiento},AND"${ordenamiento}"`;
        console.log(param);
        this.resultService.getSearch(this.convert.convertQueryParamsResults(param)).subscribe(res => {
          console.log(res);
          let objExpediente = res.resultados.filter(m => (m.vigencia === 'VIGENTE' && m.ordenamiento.normalize('NFD').replace(/[\u0300-\u036f]/g, "") === ordenamiento.normalize('NFD').replace(/[\u0300-\u036f]/g, "")))
          console.log(objExpediente);

          if (objExpediente[0]) {
            //window.open(`http://bj.scjn.pjf.gob.mx/doc/legislacion/${objExpediente[0].id}/*`, '_blank')
            window.open(`http://bj.scjn.gob.mx/doc/legislacion/${objExpediente[0].id}/*`, '_blank')
          }
        });
      }
    }
  }

  private urlCasoCoidh(nodo: any) {
    let numCase = nodo.text.split('</strong>')[1].split('<br>')[0];
    let url = this.relacionRedEngroses.find(xx => xx["num_seccion"] == numCase.trim())['url'];
    if (url != '') {
      window.open(url, '_blank')
    }
  }

  public checkUrlCasoCoidh(nodo: any) {
    let numCase = nodo.text.split('</strong>')[1].split('<br>')[0];
    let url = this.relacionRedEngroses.find(xx => xx["num_seccion"] == numCase.trim())['url'];
    return (url != "null") ? true : false;
  }

}
