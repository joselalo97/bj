import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htext',
})
export class HtextPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    let titulos = new Map<string, string>();
    titulos.set('texto.contenido', 'Texto');
    titulos.set('texto.hechos', 'Texto - Hechos');
    titulos.set('texto.criteriosJuridicos', 'Texto - Criterio jurídico');
    titulos.set('texto.justificacion', 'Texto - Justificacion');
    titulos.set('notaPrecedente.texto', 'Precedentes');
    titulos.set('articulos.epigrafes', 'Articulos');
    titulos.set('considerando.parrafo', 'Considerando');
    titulos.set('sintesis.parrafo', 'Síntesis');
    titulos.set('sintesisAnalitica', 'Síntesis Analítica');
    titulos.set('resuelve.parrafo', 'Resuelve');
    titulos.set('sinDefinir.parrafo', '');
    titulos.set('vistos.parrafo', 'Vistos');
    titulos.set('reviso.parrafo', 'Revisó');
    titulos.set('firman.parrafo', 'Firman');
    titulos.set('preambulo.parrafo', 'Proemio');
    titulos.set('tipoAsunto', 'Tipo de asunto');
    titulos.set('resultando.parrafo', 'Resultando');
    titulos.set('numExpediente', 'No de expediente');
    titulos.set('votos.parrafo', 'Votos');
    titulos.set('notaPrecedente', 'Precedentes');
    titulos.set('notaspie.parrafo', 'Notas al Pie');
    titulos.set('content', 'Contenido');
    titulos.set('lineaJurisprudencial.nombre', 'Línea jurisprudencial');
    titulos.set('antecedentes.texto', 'Antecedentes');
    titulos.set('asuntos.tiposRecurso.nombre', 'Tipo de recurso');
    titulos.set('fundamentos.texto', 'Fundamentos');
    titulos.set('cabecera.texto', 'Cabecera');
    titulos.set('dictamen.texto', 'Dictamen');
    titulos.set('tipoNumerado', 'numerado');
    titulos.set('descriptores.descriptor', 'Descriptor');
    titulos.set('articulos.normasCitadas.texto', 'Normas citadas');
    titulos.set('articulos.texto', 'Artículos');
    titulos.set('articulos.contenido', 'Artículos');
    titulos.set('citas.nombreCaso', 'Cita');
    titulos.set('NombreCaso', 'Caso');
    titulos.set('articulos.articulo', 'Artículo');
    titulos.set('articulos.tema', 'Tema');
    titulos.set('txtSentencia', '');
    titulos.set('contenido_bjdh', '');
    titulos.set('temas_bjdh', '');
    titulos.set('contenido_onu', '');
    titulos.set('temas_onu', '');
    titulos.set('titulo_onu', 'Titulo');
    titulos.set(
      'procedimientosEspeciales_onu.ubicacion',
      'Procedimientos Especiales'
    );
    titulos.set(
      'tratadosInternacionales_onu.ubicacion',
      'Tratados Internacionales de Derechos Humanos'
    );
    titulos.set('rubroTematicos', 'Rubro temático');
    titulos.set('contenido_protocolo', '');
    titulos.set('indice.seccion', 'Índice');
    titulos.set('protocolosActuacionDH.taxonomia', 'Taxonomía');
    titulos.set('tesisGeneradas.rubro', 'Tesis generadas');

    titulos.set('taxoConceptoDoctrinal_bjdh.ubicacion', 'Temas relevantes');
    titulos.set('taxoArticuloConvencion_bjdh.ubicacion', 'Artículo(s)');
   
    return titulos.has(value) ? titulos.get(value) : capitalize(value)

  }
}

const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
