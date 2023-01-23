import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertNode',
})
export class ConverNodePipe implements PipeTransform {
  type = new Map();

  transform(value: string, ...args: any[]): any {
    this.type.set('epoca', 'Época');
    this.type.set('registro_digital', 'Registro Digital');
    this.type.set('titulo', 'Titulo');
    this.type.set('materias', 'Materias');
    this.type.set('instancia', 'Instancia');
    this.type.set('tipo_asunto', 'Tipo de Asunto');
    this.type.set('pertenencia', 'Pertenencia');
    this.type.set('num_exp', 'Número de Expediente');
    this.type.set('tipo_sentencia', 'Tipo de Sentencia');
    this.type.set('id_sentencia', 'ID Engrose');
    this.type.set('acuerdo', 'Acuerdo');
    this.type.set('id_asunto', 'Asunto ID');
    this.type.set('anio', 'Año');
    this.type.set('ley', 'Ley');
    this.type.set('Sentencia', 'Sentencia');
    this.type.set('Tesis_Aislada', 'Tesis Aislada');
    this.type.set('Tesis_Jurisprudencia', 'Tesis de Jurisprudencia');
    this.type.set('Expediente', 'Expediente');
    this.type.set('expediente', 'Expediente');
    this.type.set('Tratados_Internacionales', 'Tratado Internacional');
    this.type.set('tratado', 'Tratado');
    this.type.set('Caso_coidh', 'Caso Coidh');
    this.type.set('nombre_caso', 'Nombre del Caso');
    this.type.set('num_seccion', 'Número Sección');
    this.type.set('Año', 'Año');
    this.type.set('juez_presidente', 'Juez Presidente');
    this.type.set('pais', 'País');

    let name: string = value;

    for (var [key] of this.type) {
      if (name.includes(key)) {
        name = name.replace(key, this.type.get(key));
        if (key == 'id_asunto' || key == 'id_sentencia') {
          let part = name.split('<br>');
          name = part[1] + '<br>' + part[2] + '<br>' + part[3] + '<br>';
        }
      }
    }

    if (name.includes('url:')) {
      let clearUrl: string[] = [];
      clearUrl = name.split('<strong>');
      if (clearUrl[3].includes('Año')) {
        clearUrl.splice(4, 1);
      } else {
        clearUrl.splice(3, 1);
      }
      name = clearUrl.join('<strong>');
    }

    return name;
  }
}
