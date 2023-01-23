import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textName'
})
export class TextNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let titulos = new Map<String, String>();
    titulos.set("considerando.parrafo", "Considerando");
    titulos.set("texto.contenido", "Texto");
    titulos.set("rubro", "Rubro");
    titulos.set("subtitulo", "Subtitulo");
    titulos.set("resuelve.parrafo", "Resuelve");
    titulos.set("sinDefinir.parrafo", "");
    titulos.set("vistos.parrafo", "Vistos");
    titulos.set("reviso.parrafo", "Revisó");
    titulos.set("firman.parrafo", "Firman");
    titulos.set("tipoAsunto", "Tipo de asunto")
    titulos.set("resultando.parrafo", "Resultando");
    titulos.set("notaPrecedente", "Precedentes");
    titulos.set("content", "Contenido");
    titulos.set("LineaJurisprudencial.nombre", "Línea jurisprudencial");
    titulos.set("antecedentes.texto", "Antecedentes");
    titulos.set("asuntos.tiposRecurso.nombre", "Tipoderecurso");
    titulos.set("fundamentos.texto", "Fundamentos");
    titulos.set("cabecera.texto", "Cabecera");
    titulos.set("dictamen.texto", "Dictamen");
    titulos.set("tipoNumerado", "numerado");
    titulos.set("descriptores.descriptor", "Descriptor");
    titulos.set("articulos.normasCitadas.texto", "Normascitadas");
    titulos.set("articulos.texto", "Artículos")
    titulos.set("articulos.contenido", "Artículos");
    titulos.set("NombreCaso", "Caso");
    titulos.set("Suprema Corte de Justicia de la Nación", "SCJN");
    titulos.set("Tribunales Colegiados de Circuito", "TCC");
    titulos.set("contenido_bjdh", "");

    return titulos.has(value) ? titulos.get(value) : capitalize(value)
  }

}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}