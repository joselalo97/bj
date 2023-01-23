import { Component, OnInit } from '@angular/core';
import { HelpModel, TabsSentenciaModel } from '@intranet/models/help';

@Component({
  selector: 'int-ayuda',
  templateUrl: './int-ayuda.component.html',
  styleUrls: ['./int-ayuda.component.scss'],
})
export class IntAyudaComponent implements OnInit {
  entitys: string[] = [
    'Sentencias',
    'Votos',
    'Tesis',
    'Acuerdos',
    'Ordenamientos',
    'Precedentes',
  ];
  entity: string = 'Tesis';
  dtEntidad: HelpModel[] = [];
  descripcionEntidad: string = '';
  dtSentencias: TabsSentenciaModel[] = [];
  panelOpenState: boolean;
  constructor() {}

  ngOnInit(): void {
    this.switchInfoEntity(this.entity);
  }

  switchInfoEntity(entity: string) {
    this.dtEntidad = [];
    this.descripcionEntidad = '';
    switch (entity) {
      case 'Tesis':
        this.descripcionEntidad =
          'La tesis hace referencia al criterio jurídico para un caso concreto. La tesis debe ser redactada con estructura de una regla, compuesta por un supuesto de hecho que describa las circunstancias fácticas que constituyen el campo de aplicación de la regla y una consecuencia jurídica donde se establezca la solución normativa. Las cuestiones de hecho y de derecho que no son necesarias para justificar la decisión, en ningún caso deberán incluirse en la tesis.';
        this.dtEntidad.push({
          campo: 'Registro digital',
          descripcion:
            'Conjunto de números que identifican en particular a cada una de las tesis en el SJF, Apéndices e Informes. En único y permanente. <ul><li>5ª - 9ª época 6 dígitos</li><li>10ª época 7 dígitos 191000</li></ul>',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Época',
          descripcion:
            'Periodo en que fue publicada la tesis en el Semanario Judicial de la Federación y su Gaceta, que reflejan cambios en la manera de integrar jurisprudencia. Quinta Época a Décima Época',
          ejemplo:
            'Periodo en que fue publicada la tesis en el Semanario Judicial de la Federación y su Gaceta, que reflejan cambios en la manera de integrar jurisprudencia. Quinta Época a Décima Época',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Instancia',
          descripcion:
            'Órgano jurisdiccional que en razón de su jerarquía resuelve asuntos de su competencia. (Suprema Corte de Justicia de la Nación, Plenos de Circuito y Tribunales Colegiados de Circuito)',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Órgano Jurisdiccional',
          descripcion:
            'Denominación del Tribunal que emitió el criterio. <br/> Suprema Corte de Justicia de la Nación <br/> Décima y Novena Épocas <ul><li>Pleno</li><li>Primera Sala</li><li>Segunda Sala</li><li>Suprema Corte de Justicia de la Nación</li></ul> Octava y Séptima Épocas <ul><li>Pleno</li><li>Primera Sala</li><li>Segunda Sala</li><li>Tercera Sala</li><li>Cuarta Sala</li><li>Sala Auxiliar</li><li>Suprema Corte de Justicia de la Nación</li></ul> Sexta Época <ul><li>Pleno</li><li>Primera Sala</li><li>Segunda Sala</li><li>Tercera Sala</li><li>Cuarta Sala</li><li>Suprema Corte de Justicia de la Nación</li></ul> Quinta Época <ul><li>Pleno</li><li>Primera Sala</li><li>Segunda Sala</li><li>Tercera Sala</li><li>Cuarta Sala</li><li>Sala Auxiliar</li><li>Plenos de Circuito</li></ul> Decima Época <br/> Deberá filtrarse primero por Circuito y despúes por el nombre y especialización que, en su caso, tenga cada Pleno. Por ejemplo <ul><li>Primer Circuito</li><li>Pleno de Circuito en Materia Administrativa del Primer Circuito, deben considerarse aquellos especializados en Competencia Económica, Radiofusión y Telecomunicaiones, asi como los Plenos "sin especialización"</li><li>Tribunales Colegiados de Circuito Décima, Novena, Octava y Séptima Épocas. Debéra filtrarse primero por Circuito y después por el nombre y especialización que, en su caso, tenga cada Tribunales Colegiado. Por Ejemplo</li><li>Primer Circuito</li> Primer Tribunal Colegiado en Materia Administrativa del Primer Circuito, deben considerarse aquellos Tribunales Colegiados especializados en Competencia Económica, Radiofusión y Telecomunicaciones, así como los Tribunales Colegiados de los Centros Auxiliares</ul>',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Circuito',
          descripcion:
            'Área geográfica que define el Acuerdo General 3/2013, del Pleno del Consejo de la Judicatura Federal, relativo a la determinación del número y límites territoriales de los Distritos y Circuitos Judiciales en que se divide la República Mexicana; y al número, a la jurisdicción territorial y especialización por materia de los Tribunales de Circuito y de los Juzgados de Distrito.',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Fuente',
          descripcion:
            'Medio oficial de difusión Semanario Judicial de la Federación. A partir de 1917 hasta 8a. Época SJF; 8a. Época Semanario Judical de la Federación y Gaceta del SJF; 9a. Época SJF y su Gacceta hasta diciembre de 2013 (abarca parte de la 10 Época); 10a. Época SJF y Gaceta del SJF. Apéndices del SJF (únicamente modifica el año de publicación) informes.',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Materia',
          descripcion:
            'Clasificación que atiende a la naturaleza del asunto o figura jurídica (tema contemplado en la ley) analizada en la tesis. <ol><li>Constitucional</li><li>Penal</li><li>Administrativa</li><li>Civil</li><li>Laboral</li><li>Común</li></ol> Para las tesis cuya fuente de publicación sea alguno de los Apéndices al SJF, deberá considerarse que existe, excepcionalmente como dato de localización, además de las 6 materias aludidas, las materias Electoral, Agraria, Fiscal y Suspensión. Cabe señalar que estas materias tienen entre paréntesis además la abreviatura de la materia Administrativa. Ejemplo: Fiscal (ADM). Es conveniente precisar que no deben confundirse las materias correspondientes al nombre de los Tomos que integran los Apéndices con la materia tesis. Dichos Tomos fueron identificados con el nombre de una materia especifica (por ejemplo, Procesal Constitucional); de ahí que esta identificación de Tomos deberá tomarse en cuenta para cuando se defina el nombre de la fuente de publicación de la tesis donde se desea buscar. Por ejemplo: Buscar en el Apéndice 1917-2011, en el Tomo Procesal Constitucional. Se puede entregar el esqueleto de las distintas clasificaciones.',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Tipo de tesis',
          descripcion:
            'Aislada (criterio orientador) y jurisprudencia (criterio obligatorio).',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Número de identificación',
          descripcion: `Número de identificación de la tesis, ejemplo: Tesis: 1a./J. 8/2020 (10a.) Pleno o Salas:

        El número de identificación de las tesis de jurisprudencia del Pleno o de las Salas se integrará con la letra de la instancia, seguida de la letra J y después de un punto, dividiéndolas una diagonal, los números arábigos que corresponden al asignado a la tesis, las cifras relativas del año en que fueron aprobadas, divididas éstas por una diagonal y, en su caso, la mención de que pertenecen a la Novena o Décima Épocas de publicación del Semanario.
            Ejemplos:
          P./ J. 1/2013 (9a.), 1a./J. 1/2019 (10a.), 2a./J. 1/2019 (10a.)
        
        Las tesis aisladas se identificarán con la letra de la instancia, los números romanos que corresponden al asignado a la tesis, el año en que fueron aprobadas y, en su caso, la mención de que pertenecen a la Novena o Décima Épocas de publicación del Semanario.
            Ejemplos:
          P.I / 2013(9a.), 1a.I / 2019(10a.), 2a.I / 2019(10a.) 
        Plenos de Circuito:

            El número de identificación de las tesis jurisprudenciales de los Plenos de Circuito iniciará con las letras PC, luego un punto, se continúa con un número romano que indica el Circuito, se sigue con un punto y, en su caso, con la letra inicial de la materia de especialización del Pleno, con un punto, luego se señala la letra J, que significa jurisprudencia, una diagonal y el número arábigo de la tesis correspondiente, la materia a la que corresponde la tesis según sea constitucional(CS), común(K), penal(P), administrativa(A), civil(C) o laboral(L) y, finalmente, la identificación de que se trata de una tesis de la Décima Época.
              Ejemplos:
          PC.III.P.J / 1 K(10a.)

        El número de identificación en las tesis aisladas de los Plenos de Circuito se integrará por:
        I.Las letras PC, que significan Pleno de Circuito;
        II.El Circuito expresado con número romano, seguido de un punto.En el caso del Pleno en Materia Administrativa Especializado en Competencia Económica, Radiodifusión y Telecomunicaciones, se identificará con el número romano XXXIII;
        III.La sigla o siglas que expresen la materia del Pleno de Circuito, en caso de que éste sea especializado, seguidas de un punto cada una de ellas;
        IV.El número secuencial que corresponda a la tesis en cuestión, señalado en cardinal, utilizando uno, dos o tres dígitos, según sea el caso, sin colocar ceros a la izquierda;
        V.La sigla o siglas que expresen la materia a la que corresponde la tesis, según sea constitucional(CS), común(K), penal(P), administrativa(A), civil(C) o laboral(L), y
        VI.La referencia de que se trata de una tesis de la Décima Época.
          Ejemplo:
        PC.I.C.1 K(10a.)

        Pleno de Circuito en Materia Civil del Primer Circuito(tesis común).
          PC.XXXIII.CRT. 8 A(10ª)

        Tribunales Colegiados:

        El número de identificación de las tesis de jurisprudencia de los Tribunales Colegiados de Circuito, se inicia con un número romano que indica el Circuito, seguido de un punto, continúa con un número ordinal que identifica al Tribunal de dicho Circuito - cuando sea Tribunal Colegiado único, no se hará señalamiento alguno -; después, la letra inicial de la materia del Tribunal Colegiado de Circuito con un punto - sólo se aplica a Tribunales Colegiados especializados por materia -; luego se señala la letra J, que significa jurisprudencia, una diagonal y el número arábigo de la tesis correspondiente, la materia a la que corresponde la tesis según sea constitucional(CS), común(K), penal(P), administrativa(A), civil(C) o laboral(L), para finalizar con la referencia a la Décima Época.
          Ejemplo:
        III.2o.P.J / 1 P(10a.)
        Segundo Tribunal Colegiado en Materia Penal del Tercer Circuito.

        Cuando el órgano emisor sea un Tribunal Colegiado de un Centro Auxiliar de alguna Región, en lugar del número romano que identifique el Circuito respectivo, se agregará un paréntesis en el cual se indique el número romano de la Región a la que pertenece y la palabra Región.
          Ejemplo:
        (II Región) 4o.J / 1 P(10a.)

        El número de identificación de las tesis aisladas de los Tribunales Colegiados de Circuito, se integrará por:

        I.El Circuito se expresa con número romano seguido de un punto;
        II.El número del Tribunal Colegiado de Circuito se expresa en ordinal, seguido también de un punto;
        III.En caso de que el Tribunal Colegiado de Circuito sea especializado en una o en dos materias, la sigla o siglas que expresen la materia, respectivamente, seguidas de un punto cada una de ellas;
        IV.El número secuencial que corresponda a la tesis en cuestión, señalado en cardinal, utilizando uno, dos o tres dígitos, según sea el caso, sin colocar ceros a la izquierda;
        V.La sigla o las siglas que expresen la materia a la que corresponde la tesis, según sea constitucional(CS), común(K), penal(P), administrativa(A), civil(C) o laboral(L), y
        VI.La referencia de que se trata de una tesis de la Décima Época.
          Ejemplo:
        I.1o.C.1 K(10a.)
        Primer Tribunal Colegiado en Materia Civil del Primer Circuito(tesis común).

        Cuando el órgano emisor sea un Tribunal Colegiado de Circuito de un Centro Auxiliar de alguna Región, en lugar del número romano que identifique el Circuito respectivo, se agregará un paréntesis en el cual se indique el número romano de la Región a la que pertenece y la palabra Región.
          Ejemplo:
        (VIII Región) 1o.1 A(10a.)
        Primer Tribunal Colegiado de Circuito del Centro Auxiliar de la Octava Región(tesis administrativa).
        Cuando un Tribunal Colegiado de Circuito de un Centro Auxiliar se adscriba a un determinado Circuito, los Tribunales Colegiados sin especialización se especialicen, o cambien de competencia o denominación, actualizarán su número de identificación y reiniciarán su numeración por materia.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Formas de Integración',
          descripcion: `Las formas de integración de la jurisprudencia son: 
        <ul>
        <li>Reiteración</li>
        <li>Contradicción</li>
        <li>Sustitución y/o modificación</li>
        <li>Acción de Inconstitucionalidad (hasta octubre de 2016 se emitían tesis de jurisprudencia)</li>
        <li>Controversia constitucional (hasta enero de 2016 se emitían tesis de jurisprudencia)</li>
        </ul>
        `,
          ejemplo: '',
          link: 1,
        });

        this.dtEntidad.push({
          campo: 'Localización Ejemplar del SJF',
          descripcion: `Indica datos de publicación en el medio oficial de difusión que se integra por: el número del libro, tomo, volumen o número de publicación en la Gaceta o Semanario Judicial de la Federación, atendiendo a la Época de publicación.  
        <br/>5ª Época: Tomo + número romano; por ejemplo: Tomo CXXXII
        <br/>6ª Época: Volumen + número romano; por ejemplo: Volumen CXXXVIII
        <br/>7ª Época: Volumen + número arábigo; por ejemplo: Volúmenes 217-228
        <br/>8ª Época: Tomo + número romano o Número + número arábigo; por ejemplo, 
        <ul>
        <li>Semanario, Tomo XV-2, febrero de 1995;</li>
        <li>Gaceta del Semanario Judicial de la Federación: Número 84, diciembre de 1994.</li>
        </ul>
        <br/>9ª Época: Tomo + número romano + mes y año; por ejemplo, Tomo XXXIV, agosto de 2011
        <br/>10ª Época: Libro + número romano y Tomo con número arábigo + mes y año. 
        Tratándose del Semanario Judicial de la Federación y su Gaceta, por ejemplo, Libro X, Tomo 1, julio de 2012.
        Tratándose de la Gaceta del Semanario Judicial de la Federación, Libro con número arábigo +Tomo con número romano + mes y año, por ejemplo: Libro 74, Tomo I, enero de 2020.
        `,
          ejemplo: '',
          link: 1,
        });

        this.dtEntidad.push({
          campo: 'Localización Tomo',
          descripcion: `En 10a. Época, además de “Libro” éste se divide en Tomo que corresponde al número de tomo en que se publica la tesis en el SJF y en la Gaceta del SJF.`,
          ejemplo: '',
          link: 1,
        });

        this.dtEntidad.push({
          campo: 'Localización Fecha',
          descripcion: `Dato que indica el mes y año en que se publicó la tesis (Ejemplo: noviembre de 2019), en el SJF, Gaceta del SJF, Apéndice e Informe. `,
          ejemplo: '',
          link: 1,
        });

        this.dtEntidad.push({
          campo: 'Localización Página',
          descripcion: `Dato que indica la página en la cual se publicó la tesis en el Semanario Judicial de la Federación, en la Gaceta del SJF, en los Apéndices y en los Informes.`,
          ejemplo: '',
          link: 1,
        });

        this.dtEntidad.push({
          campo: 'Fecha de Publicación en el Semanario Semanal',
          descripcion:
            'Información que indica el día, mes, año y hora de publicación de la tesis en el SJF (para tesis aisladas a partir del 6 de diciembre de 2013). Ejemplo: Esta tesis se publicó el viernes 30 de agosto de 2019 a las 10:38 horas en el Semanario Judicial de la Federación.',
          ejemplo: '',
          link: 1,
        });

        this.dtEntidad.push({
          campo: 'Fecha a partir de la cual es obligatoria la jurisprudencia',
          descripcion: `
        Información que indica el día, mes y año a partir del cual se considera de aplicación obligatoria una jurisprudencia publicada en el SJF.
        (para tesis de jurisprudencia a partir del 6 de diciembre de 2013). 
        
        <br/>Ejemplo: Esta tesis se publicó el viernes 6 de diciembre de 2019 a las 10:18 horas en el Semanario Judicial de la Federación y, por ende, se considera de aplicación obligatoria a partir del lunes 09 de diciembre de 2019, para los efectos previstos en el punto séptimo del Acuerdo General Plenario 19/2013.`,
        });

        this.dtEntidad.push({
          campo: 'Título',
          descripcion: `
        El título es la mención del concepto, figura o institución jurídica que constituye la materia principal de las tesis. A través del título deberá identificarse el tema principal de que trata la tesis y servirá para la integración de tesauros e índices conceptuales, que permitan la fácil localización de los criterios interpretativos en los sistemas de cómputo o sistemas de consulta a cargo de la Dirección General. A partir de diciembre de 2013. 
        Se coloca antes del subtítulo y se separa por un punto y seguido.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Subtítulo',
          descripcion: `El subtítulo es el enunciado gramatical que identifica sintéticamente al criterio interpretativo plasmado en la tesis.
        Tiene por objeto reflejar con toda concisión, congruencia y claridad la esencia de dicho criterio y facilitar su localización, proporcionando una idea cierta de éste. 
        El subtítulo es el enunciado gramatical que identifica sintéticamente al criterio interpretativo plasmado en la tesis. En el subtítulo o en el texto respectivo se identificarán la o las normas generales cuya regularidad constitucional se analice, las que sean materia de interpretación o integración y, de ser el caso, los artículos constitucionales y convencionales que hayan fundado la resolución.
        Tiene por objeto reflejar con toda concisión, congruencia y claridad la esencia de dicho criterio y facilitar su localización, proporcionando una idea cierta de éste.  
        Se coloca después del título, separado por un punto y seguido y antes del texto.
        Conforme al artículo 218 de la Ley Amparo vigente (Acuerdo 20/2013) se hace referencia a “Título y Subtítulo”, en la Ley de Amparo abrogada el mismo dato es el “Rubro”.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Rubro',
          descripcion: `Enunciado gramatical que identifica al criterio interpretativo plasmado en la tesis. Tiene por objeto reflejar con toda concisión, congruencia y claridad la esencia de dicho criterio y facilitar su localización, proporcionando una idea cierta del mismo. Se coloca antes del texto. Es lo que ahora se conoce como “Título” y “Subtítulo”.`,
          ejemplo:
            'Enunciado gramatical que identifica al criterio interpretativo plasmado en la tesis. ',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Texto',
          descripcion: `Consideraciones interpretativas mediante las cuales el órgano jurisdiccional haya establecido el criterio, derivan en su integridad de la parte considerativa fundamental de la resolución correspondiente. Tratándose de jurisprudencia por reiteración, el criterio de interpretación debe contenerse en las consideraciones que se realicen en las cinco ejecutorias que la constituyan, sólo un criterio interpretativo relevante y novedoso.
        Se coloca después del título y subtítulo o rubro, según sea el caso, y antes del precedente.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Normativa',
          descripcion: `En algunas tesis se indica el artículo o artículos, leyes, acuerdos u otras disposiciones normativas tanto nacionales como internacionales que se interpretan o que sirven para fundar el sentido de la resolución.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo:
            'Criterios/Tesis, expedientes  (ejecutorias), votos y acuerdos citados',
          descripcion: `En algunas tesis, dentro del texto de la tesis se hace referencia a otras tesis, ejecutorias, votos o acuerdos publicados previamente`,
          ejemplo: '',
          link: 1,
        });

        this.dtEntidad.push({
          campo: 'Precedente Tipo de asunto',
          descripcion: `Datos de identificación de la ejecutoria, tipo de asunto. 
        El precedente hace referencia a una parte de la estructura de la tesis (localización, título, subtitulo, texto y precedentes), en la que se señalan los expedientes que contienen las ejecutorias que, a consideración del órgano que aprobó la tesis y ordenó su publicación, contienen el mismo criterio al que da publicidad la tesis de referencia. `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Número de Expediente',
          descripcion: `Es el número único asignado al asunto en la oficialía de partes común u órgano jurisdiccional (En caso de que resuelva un órgano auxiliar, aparece el número de expediente de origen y el del cuaderno auxiliar). Se compone por el número de asunto como tal y el año de promoción, por ejemplo: “amparo directo en revisión 3616/86”, donde “3616” es el número de amparo radicado y “86” el año de promoción`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Promovente',
          descripcion: `Nombre de la persona física, moral u oficial que inicia la actividad jurisdiccional (puede omitirse por cuestiones de transparencia); nombre de los órganos contendientes o solicitantes tratándose de Contradicción de Criterios (antes Contradicción de Tesis) y conflictos competenciales, o sustitución de jurisprudencia.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente TCC Auxiliar',
          descripcion: `Órgano jurisdiccional auxiliar que resuelve el asunto. Se considera un órgano jurisdiccional auxiliar el creado por el Consejo de la Judicatura Federal para que apoye a los Tribunales Colegiados de Circuito ordinarios cuando existe una excesiva carga de trabajo. `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Fecha de Resolución	',
          descripcion: `Fecha de la sesión en la que se resuelve el asunto.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Votación',
          descripcion: `Forma en la que se votó el asunto (unanimidad o mayoría).`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Votantes',
          descripcion: `Ministros/Magistrados que intervienen en la votación (Suprema Corte de Justicia de la Nación y Plenos de Circuito).

        <br/>No en todas las Épocas se consigna el nombre de los Ministros/Magistrados que participaron en la votación del asunto. En Octava Época aparecen los apellidos de los Ministros tratándose de Corte. A partir de la Décima Época aparecen los nombres y apellidos respecto de los asuntos resueltos por el Pleno y las Salas de la Suprema Corte y los Plenos de Circuito.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Postura en la votación	',
          descripcion: `
        Constituye el sentido de la votación del Ministro/Magistrado (A favor, en contra, con reservas, disidente, entre otras posturas). 
        Va precedido de la palabra “Disidente” o “Disidentes” o de la expresión: “Votó en contra” o “Votaron en contra”`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Ausente en la votación',
          descripcion: `Inasistencia del Ministro/Magistrado al momento de emitir la votación (Ausentes). Va precedido por la palabra “Ausente” o “Ausentes”.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Ponente',
          descripcion: `
        Ministro/Magistrado que tiene a su cargo presentar el proyecto del asunto para su discusión. Se encuentra precedido por la palabra: “Ponente”.
        En ocasiones, tratándose de Tribunales Colegiados de Circuito, el Consejo de la Judicatura Federal autoriza a Secretarios de Tribunal para desempeñar las funciones de Magistrado y, por ende, presentan los proyectos de asunto a discusión.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Encargado del engrose	',
          descripcion: `Ministro/Magistrado responsable de engrosar la resolución conforme a lo aprobado en la discusión del asunto. Siempre se encuentra precedido de la frase: “Encargado del engrose”
        En ocasiones, tratándose de Tribunales Colegiados de Circuito, el Consejo de la Judicatura Federal autoriza a Secretarios de Tribunal para desempeñar las funciones de Magistrado y, por ende, pueden ser los encargados de engrosar el asunto.
        Cuando la mayoría de los integrantes del órgano votan en contra del proyecto presentado por el Ponente, otro de los integrantes del órgano puede ofrecerse a realizar el engrose. 
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Secretario',
          descripcion: `Nombre del o de los encargados de realizar y presentar al Ministro/Magistrado con quien colaboran el proyecto de sentencia (Secretario Proyectista). Se encuentra precedido por la palabra “Secretaria”, “Secretario” o en su caso “Secretarias”, “Secretarios”.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Criterios contendientes',
          descripcion: `Sólo en el supuesto de contradicciones de tesis. Son los datos de identificación de las tesis o criterios que contienden en la contradicción (Esta información se publica  a partir de la entrada en vigor del Acuerdo 20/2013).`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Precedente Tesis sustituida',
          descripcion: `Sólo en el supuesto de solicitud de sustitución de jurisprudencia. Son los datos de identificación de la tesis que se sustituye (Esta información se publica  a partir de la entrada en vigor del Acuerdo 20/2013).`,
          ejemplo: '',
          link: 1,
        });

        this.dtEntidad.push({
          campo: 'Notas',
          descripcion:
            'Anotaciones que orientan al usuario sobre la información contenida en el texto de la tesis, a través de referencias que determinan su estado o su relación con otras tesis, ejecutorias, acuerdos, normativa u otros documentos publicados en el Semanario Judicial de la Federación.',
          ejemplo: '',
          link: 1,
        });

        this.dtEntidad.push({
          campo: 'Certificación',
          descripcion: `
        Razón que da el Secretario de Acuerdos del órgano emisor de la fecha de aprobación y del número de la tesis aprobada; ocasionalmente es la fecha en que se emite la propia certificación (8a., 9a. y 10a. Épocas); cuando se incluya la fecha de certificación puede coincidir con la de la sesión de aprobación.
        
        <br/>La certificación sólo aparece en el caso de tesis de jurisprudencia y aisladas emitidas por el Pleno de la SCJN y de tesis de jurisprudencia de las Salas. 
        
        <br/>Da certeza de que la tesis remitida para publicación es la misma que aprobó la instancia emisora.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Genealogía',
          descripcion: `Referencia de otras publicaciones en las que fue publicada la misma tesis. 
        Esto es, una tesis puede aparecer publicada en el Semanario y además en los Apéndices e Informes. 
        Dentro de los sistemas de consulta se captura la información que muestra dónde más a sido publicada la tesis. 
        Puede consultarse a través de un icono ubicado antes de los datos de localización con la palabra “Genealogía” (Ver tesis con número de registro digital 913354).
        `,
          ejemplo: ``,
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Ejecutorias Relacionadas',
          descripcion: `Dentro de los sistemas de consulta es una liga (Semanario Semanal) o un ícono (Sistematizado) que presenta un enlace que remite a la ejecutoria relacionada.
        Estas asociaciones se hacen manualmente y pueden venir de origen, cuando la ejecutoria se publica con la tesis, o después de la sistematización, cuando la ejecutoria se publicó en otro mes.
        Cada tesis puede tener más de una ejecutoria relacionada.`,
          ejemplo: ``,
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Votos Relacionados',
          descripcion: `Dentro de los sistemas de consulta es una liga (Semanario Semanal) o un ícono (Sistematizado) que presenta un enlace que remite al voto relacionado.
          Estas asociaciones se hacen manualmente y pueden venir de origen, cuando el voto se publica con la tesis, o después de la sistematización, cuando el voto se publicó en otro mes.
          Cada tesis puede tener más de un voto relacionado.`,
          ejemplo: '',
          link: 1,
        });

        break;

      case 'Acuerdos':
        this.descripcionEntidad =
          'Acuerdos Generales y demás Instrumentos Normativos e Informativos emitidos por la Presidencia de la Suprema Corte de Justicia de la Nación, Pleno o Salas, Comisiones o Comités de la Suprema Corte de Justicia de la Nación, de manera conjunta con el Consejo de la Judicatura Federal y/o el Tribunal Electoral del Poder Judicial de la Federación a través de los cuales establecen regulaciones o información de importancia para el PJF en diversos segmentos.';
        this.dtEntidad.push({
          campo: 'Registro digital',
          descripcion: `Conjunto de números que identifican en particular a cada uno de los acuerdos en el SJF.
        <br/>Número único, permanente e incremental: 
        8ª a 10ª época de 3 a 5 dígitos
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Órgano emisor (instancia)',
          descripcion: `Órgano en función administrativa que emite el acuerdo o documento que establecen, entre otros, regulaciones o información del PJF en diversos segmentos`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Tipo de documento',
          descripcion: `En atención a su naturaleza los documentos pueden catalogarse en: acuerdos (generales, conjuntos, de administración, de suspensión de actividades, etcétera); instrumentos normativos, modificaciones a acuerdos, etcétera.
        <br/>Cabe hacer notar que en este apartado se incluyen documentos que por su naturaleza corresponden a la sección "Otros" del sistema de consulta como: avisos, lista de vencedores o vencedoras, condiciones generales de trabajo, fe de erratas, lista de peritos, etcétera.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Época',
          descripcion: `Periodo en que fue publicado el Acuerdo en el Semanario Judicial de la Federación y su Gaceta.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Ejemplar del SJF',
          descripcion: `Indica datos de publicación en el medio oficial de difusión que se integra por: el número del libro, tomo, volumen o número de publicación en la Gaceta o Semanario Judicial de la Federación, atendiendo a la Época de publicación.  
        <br/>8ª Época: Tomo + número romano o Número + número arábigo.
        <br/>9ª Época: Tomo + número romano
        <br/>10ª Época: Libro + número romano y Tomo con número arábigo o Libro con número arábigo +Tomo con número romano
        `,
        });
        this.dtEntidad.push({
          campo: 'Localización Tomo',
          descripcion: `Para 10ª Época corresponde al número de tomo en que se publica en el SJF y en la Gaceta del SJF.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Fecha',
          descripcion: `Dato que indica el mes y año en que se publicó (Ejemplo: noviembre de 2019), en el SJF y en la Gaceta del SJF. `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Página',
          descripcion: `Dato que indica la página en la cual se publicó el Acuerdo en el SJF y en la Gaceta del SJF.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Fecha de Publicación en el Semanario Semanal',
          descripcion: `
        <br/>Dato que indica el día, mes, año y hora de publicación del Acuerdo en el SJF. (Desde diciembre de 2019)
        <br/>Este dato aparece únicamente en los Acuerdos pendientes de incluirse en la Gaceta electrónica del SJF.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Fecha de aprobación del acuerdo',
          descripcion: `Día, mes y año en que fue aprobado el documento por el órgano emisor. `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Fecha Publicación en el Diario Oficial de la Federación ',
          descripcion: `Día, mes y año de publicación del documento en el Diario Oficial de la Federación, en su caso.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Emisores o participantes',
          descripcion: `Nombre del funcionario (a) (entre otros, Ministro (a), Consejero (a), Secretario de Acuerdos, Secretario Ejecutivo) u órgano del Poder Judicial de la Federación que emitió y/o participó en la elaboración del documento`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Considerandos',
          descripcion: `Antecedentes que dan origen y justifican la emisión del documento.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Acuerdo o contenido',
          descripcion: `Texto del documento aprobado por el funcionario u órgano emisor.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Nota de publicación semanal',
          descripcion: `Día, mes y año de publicación en el SJF. 
        Este campo puede ser omitido cuando el acuerdo no haya sido publicado, pero sí se localiza en el SJF.
        Desde diciembre de 2019`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Nota de referencia',
          descripcion: `Información relativa a los acuerdos, normativa o tesis citadas en el propio acuerdo y publicadas en el SJF y en su Gaceta.Información relativa a los acuerdos, normativa o tesis citadas en el propio acuerdo y publicadas en el SJF y en su Gaceta.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Vigencia',
          descripcion:
            'Fecha en que el documento entrará en vigor, en su caso.',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Certificación',
          descripcion:
            'Leyenda que valida la aprobación y existencia del documento.',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Tipo de Votación',
          descripcion:
            'Forma en la que se votó el Acuerdo (unanimidad o mayoría).',
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Votación',
          descripcion:
            'Nombre de los funcionarios que intervinieron en la aprobación del documento de carácter jurídico-administrativo.',
          ejemplo: '',
          link: 1,
        });

        break;

      case 'Precedentes':
        this.descripcionEntidad =
          'Resolución emitida por los órganos jurisdiccionales federales contra la cual no procede recurso ordinario alguno por el que pueda ser modificada o revocada.';

        this.dtEntidad.push({
          campo: 'Registro digital',
          descripcion: `Conjunto de números que identifican en particular a cada una de las ejecutorias en el SJF.

        <br/>Número único, permanente e incremental: 
        8ª a 10ª época de 3 a 5 dígitos
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Instancia',
          descripcion: `Órgano jurisdiccional que en razón de su jerarquía resuelve asuntos de su competencia. (Suprema Corte de Justicia de la Nación, Plenos de Circuito y Tribunales Colegiados de Circuito)`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Órgano Jurisdiccional',
          descripcion: `Denominación del Tribunal que emitió la ejecutoria.
        <ul>
        <li>Suprema Corte de Justicia de la Nación
        Décima y Novena Épocas</li>
        <li>Pleno</li>
        <li>Primera Sala</li>
        <li>Segunda Sala</li>
        <li>Suprema Corte de Justicia de la Nación
        Octava Época</li>
        <li>Pleno</li>
        <li>Primera Sala</li>
        <li>Segunda Sala</li>
        <li>Tercera Sala</li>
        <li>Cuarta Sala</li>
        <li>Sala Auxiliar</li>
        <li>Plenos de Circuito
        Décima Época
        Deberá filtrarse primero por Circuito y después por el nombre y especialización que, en su caso, tenga cada Pleno. Por ejemplo:</li>
        <li>Primer Circuito</li>
        <li>Pleno de Circuito en Materia Administrativa del Primer Circuito….), deben considerarse aquellos especializados en Competencia Económica, Radiodifusión y Telecomunicaciones, así como los Plenos “sin especialización”</li>
        <li>Tribunales Colegiados de Circuito Décima, Novena y Octava Épocas.
        Deberá filtrarse primero por Circuito y después por el nombre y especialización que, en su caso, tenga cada Tribunal Colegiado. Por ejemplo:</li>
        <li>Primer Circuito
        Primer Tribunal Colegiado en Materia Administrativa del Primer Circuito..., deben considerarse aquellos Tribunales Colegiados especializados en Competencia Económica, Radiodifusión y Telecomunicaciones, así como los Tribunales Colegiados de los Centros Auxiliares.</li>
        </ul>
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Tipo de asunto',
          descripcion: `
        Identificación del juicio o medio de control objeto de resolución en la ejecutoria; tipo de asunto. 
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Época',
          descripcion: `Periodo en que fue publicada la ejecutoria en el Semanario Judicial de la Federación, su Gaceta y en el apartado de precedentes en Controversias Constitucionales y Acciones de Inconstitucionalidad, que reflejan cambios en la manera de integrar jurisprudencia.
        Octava a Décima Épocas.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Tipo de criterio',
          descripcion: `Vinculantes o no vinculantes dependiendo de la votación.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Ejemplar del SJF',
          descripcion: `
        Indica datos de publicación en el medio oficial de difusión que se integra por: el número del libro, tomo, volumen o número de publicación en la Gaceta o Semanario Judicial de la Federación, atendiendo a la Época de publicación.  
        
        <br/>8ª Época: Tomo + número romano o Número + número arábigo.
        <br/>9ª Época: Tomo + número romano
        <br/>10ª Época: Libro + número romano y Tomo con número arábigo o Libro con número arábigo +Tomo con número romano
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Tomo',
          descripcion: `Para 10ª Época corresponde al número de tomo en que se publica en el SJF y en la Gaceta del SJF.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Fecha',
          descripcion: `Dato que indica el mes y año en que se publicó (Ejemplo: noviembre de 2019), en el SJF.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Página',
          descripcion: `Dato que indica la página en la cual se publicó la ejecutoria en el SJF y en la Gaceta del SJF.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Fecha de Publicación en el Semanario Semanal',
          descripcion: `
        Dato que indica el día, mes, año y hora de publicación de la ejecutoria en el SJF.
        
        <br/>Este dato aparece únicamente en las ejecutorias pendientes de incluirse en la Gaceta electrónica del SJF.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Rubro temático o tema síntesis',
          descripcion: `Rubro Temático o tema síntesis para ejecutorias dictadas en controversias constitucionales y acciones de inconstitucionalidad (publicadas a partir de noviembre de 2014).
        Hace referencia al criterio jurídico que identifica las razones contenidas en los considerandos que fundan los resolutivos de las sentencias dictadas en controversias constitucionales y en acciones de inconstitucionalidad, y sirve para facilitar su localización y lograr una adecuada vinculación informática de los precedentes (A TRAVÉS DE LA REMISIÓN AUTOMÁTICA AL PÁRRAFO DE LA EJECUTORIA) que contengan la misma figura jurídica resueltos con consideraciones iguales o análogas; precedentes respecto de la misma figura jurídica resueltos con consideraciones diferentes; precedentes respecto de la misma figura jurídica resueltos en relación con un diverso principio o derecho fundamental; precedentes respecto de la misma figura jurídica resueltos en sentido opuesto y precedentes respecto de una figura jurídica similar relacionada.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Tema',
          descripcion: `Hace referencia al criterio jurídico que identifica las razones contenidas en los considerandos y sirve para facilitar su localización, cuando el órgano jurisdiccional ordena la publicación de la ejecutoria, contenga una declaración jurídica trascendente (por ejemplo: cancelación de tesis, inexistencia de tesis, interrupción de jurisprudencia, etc.) o no exista tesis.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Título y subtítulo de las tesis derivadas de la ejecutoria.',
          descripcion: `El título es la mención del concepto, figura o institución jurídica que constituye la materia principal de las tesis que derivan de la ejecutoria.

        <br/>El subtítulo es el enunciado gramatical que identifica sintéticamente el criterio interpretativo plasmado en la tesis que derivan de la ejecutoria.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Datos de identificación del Precedente.',
          descripcion: `Tipo de asunto, número de expediente (en caso de que resuelva un órgano auxiliar), aparece el número de expediente de origen y el del cuaderno auxiliar), promovente (en algunos casos se omite), órganos jurisdiccionales contendientes, fecha de resolución, votación (en algunos casos dependiendo de su complejidad se omite), participantes, ausente (s), disidente (s), nombre del ponente, encargado del engrose en su caso y secretario (s). 

        <br/>Integrados por las mismas entidades que conforman el precedente de Tesis.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Promovente',
          descripcion: `Nombre de la persona física, moral u oficial que inicia la actividad jurisdiccional (puede omitirse por cuestiones de transparencia); nombre de los órganos contendientes que plantean un conflicto competencial o solicitantes tratándose de sustitución.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Ponente',
          descripcion: `Ministro (a) /Magistrado (a) que tiene a su cargo presentar el proyecto del asunto para su discusión.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Encargado del engrose',
          descripcion: `Ministro (a)/Magistrado (a) responsable de engrosar la resolución conforme a lo aprobado en la discusión del asunto.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Secretario',
          descripcion: `Nombre del o de los encargados de realizar el proyecto de la sentencia.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Fecha de resolución',
          descripcion: `Fecha de la sesión en que se resolvió el asunto`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Vistos',
          descripcion: `Parte de la sentencia en la que generalmente se indica el número de expediente y tipo de asunto a resolver o documentos que se tienen a la vista para analizar (expediente). Puede llegar a utilizarse indistintamente “Visto o Vistos”. En algunos casos los resultandos contienen los vistos en el mismo apartado.Parte de la sentencia en la que generalmente se indica el número de expediente y tipo de asunto a resolver o documentos que se tienen a la vista para analizar (expediente). Puede llegar a utilizarse indistintamente “Visto o Vistos”. En algunos casos los resultandos contienen los vistos en el mismo apartado.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Resultando',
          descripcion: `Es la parte de la sentencia en la cual se describen los antecedentes del asunto, por ejemplo:
        <ul>
        <li>Presentación de la demanda</li>
        <li>Autoridades emisoras o responsables </li>
        <li>Normas impugnadas o acto reclamado</li>
        <li>Preceptos constitucionales y convencionales que se estiman violados</li>
        <li>Conceptos de invalidez violación o agravios </li>
        <li>Admisión y Trámite</li>
        <li>Informe de los órganos responsables</li>
        </ul>
        Cierre de Instrucción`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Considerando',
          descripcion: `Es la parte de la sentencia que contiene los razonamientos que justifican el sentido del fallo. Se analizan: la competencia, oportunidad, legitimación, procedencia o improcedencia, marco normativo, análisis del caso en concreto y efectos de la sentencia, en su caso.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Considerando Competencia',
          descripcion: `Párrafo en el que se fundamenta la competencia del órgano jurisdiccional para conocer del asunto.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Considerando Oportunidad',
          descripcion: `Párrafo en el que se realiza el cómputo de los días en los que se promueve el asunto y determina la oportunidad de su presentación (excepto Contradicción de Criterios (antes Contradicción de Tesis), conflictos competenciales, sustitución de jurisprudencia, etc.).`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Considerando Legitimación',
          descripcion: `Párrafo en el que se analiza si el promovente tiene el derecho para instar la pretensión deducida `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Considerando procedencia o improcedencia ',
          descripcion: `Párrafo en el que se establece si procede o no el análisis del tipo de asunto de que se trate.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Considerando Disputa (Litis)',
          descripcion: `Párrafo en el que se determina el problema jurídico a resolver, en razón de los argumentos expuestos por las partes. 
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Considerando Estudio de fondo',
          descripcion: `Razonamientos lógico-jurídicos que fundan los puntos resolutivos que deciden el fondo del problema jurídico planteado o la materia de análisis del expediente de que se trate.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Anexo',
          descripcion: `Documento inserto en la ejecutoria que contiene una imagen no compatible en su formato original con el ambiente web, por lo que es generado en formato PDF y asociado al texto de la propia ejecutoria a través de una etiqueta de texto. Ejemplos: Ver Tabla o Ver imagen.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Considerando Conclusiones o Decisión',
          descripcion: `Párrafos en los que se fija la decisión final del asunto sometido a la consideración del órgano jurisdiccional y, en su caso, los efectos procedentes. `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Resolutivos',
          descripcion: `Párrafos en los que el órgano jurisdiccional establece el sentido de la decisión, por ejemplo, si la acción es procedente, improcedente, fundada, infundada; si el precepto impugnado es válido o inválido; si el acto de autoridad invade o no esferas competenciales; si la Contradicción de Criterios (antes Contradicción de Tesis) es existente, inexistente, sin materia o improcedente, así como el criterio que debe prevalecer.Párrafos en los que el órgano jurisdiccional establece el sentido de la decisión, por ejemplo, si la acción es procedente, improcedente, fundada, infundada; si el precepto impugnado es válido o inválido; si el acto de autoridad invade o no esferas competenciales; si la Contradicción de Criterios (antes Contradicción de Tesis) es existente, inexistente, sin materia o improcedente, así como el criterio que debe prevalecer.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Votación',
          descripcion: `Forma en la que se votó el asunto (unanimidad o mayoría).

        <br/>Votantes: Ministros (as) /Magistrados (as) que intervienen en la votación (Suprema Corte de Justicia de la Nación, Plenos de Circuito, Tribunales Colegiados de Circuito).
        
        <br/>En Acciones de Inconstitucionalidad y Controversias Constitucionales, la votación de los Ministros (as) se emite en función de las consideraciones que fundan los resolutivos, por lo que existen diversas votaciones (A favor, en contra, con reservas, entre otras posturas). 
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Fecha (s) de discusión',
          descripcion: `Fecha (s) de la sesión (es) en que se discutió y en su caso, se resolvió el asunto.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Tesis derivada (s) de la resolución',
          descripcion: `Tesis aisladas o de jurisprudencia que provienen del asunto resuelto.

        <br/>En el Semanario Semanal es posible su consulta a través de un hipervínculo desde la ejecutoria; en la Gaceta Electrónica y en el Módulo Sistematizado 1917 a la fecha es posible su consulta a través de un botón.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Voto (s) asociado (s)',
          descripcion: `Postura singular o conjunta de los Ministros (as) o Magistrados (as) respecto a las consideraciones o sentido en que se resuelve el asunto (particular, minoría, aclaratorio, concurrente, razonado, de reserva, con salvedad, paralelo, entre otros). 
        En el Semanario Semanal es posible su consulta a través de un hipervínculo desde la ejecutoria; en la Gaceta Electrónica y en el Módulo Sistematizado 1917 a la fecha es posible su consulta a través de un botón.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo:
            'Fecha de obligatoriedad de las consideraciones de Acciones de Inconstitucionalidad y Controversias Constitucionales',
          descripcion: `Es la fecha a partir de la cual se consideran de aplicación obligatoria las consideraciones aprobadas por 8 votos o más de los Ministros (as) participantes tratándose de Acciones de Inconstitucionalidad o Controversias Constitucionales.

        <br/>(Para ejecutorias de jurisprudencia a partir del 6 de diciembre de 2013). 
        
        <br/>Esta ejecutoria se publicó el viernes 21 de febrero de 2020 a las 10:23 horas en el Semanario Judicial de la Federación y, por ende, las consideraciones que contiene, aprobadas por 8 votos o más, en términos de lo dispuesto en el artículo 43 de la respectiva Ley Reglamentaria, se consideran de aplicación obligatoria a partir del lunes 24 de febrero de 2020, para los efectos previstos en el punto séptimo del Acuerdo General Plenario 16/2019.
        
        <br/>Esta ejecutoria se publicó el viernes 06 de marzo de 2020 a las 10:09 horas en el Semanario Judicial de la Federación.
        `,
          ejemplo: '',
          link: 1,
        });
        break;

      case 'Votos':
        this.descripcionEntidad =
          'Postura particular de uno o varios Ministros o Magistrados en relación de un asunto en concreto.';
        this.dtEntidad.push({
          campo: 'Registro digital',
          descripcion: `
        Conjunto de números que identifican en particular a cada uno de los votos en el SJF y su Gaceta.
        <br/>Número único, permanente e incremental: 
        8ª a 10ª época de 1 a 5 dígitos.
        <br/>Este número puede ser coincidente con los asignados a los Acuerdos o Normativa publicados en el SJF y en su Gaceta`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Época',
          descripcion: `
        Periodo en que fue publicado en el Semanario Judicial de la Federación, en su Gaceta y en el apartado de precedentes en Controversias Constitucionales y Acciones de Inconstitucionalidad.
        Octava a Décima Épocas.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Fuente',
          descripcion: `Medio de publicación oficial.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Órgano Jurisdiccional',
          descripcion: `Denominación del Tribunal al que esta adscrito el Ministro (s)/ Ministra (s) o Magistrado (s)/ Magistrada (s) que emitió el voto.
        <ul>
        <li>Suprema Corte de Justicia de la Nación
        Décima y Novena Épocas</li>
        <li>Pleno</li>
        <li>Primera Sala</li>
        <li>Segunda Sala</li>
        <li>Suprema Corte de Justicia de la Nación
        Octava Época</li>
        <li>Pleno</li>
        <li>Primera Sala</li>
        <li>Segunda Sala</li>
        <li>Tercera Sala</li>
        <li>Cuarta Sala</li>
        <li>Sala Auxiliar</li>
        <li>Plenos de Circuito
        Décima Época
        Deberá filtrarse primero por Circuito y después por el nombre y especialización que, en su caso, tenga cada Pleno. Por ejemplo:</li>
        <li>Primer Circuito</li>
        <li>Pleno de Circuito en Materia Administrativa del Primer Circuito….), deben considerarse aquellos especializados en Competencia Económica, Radiodifusión y Telecomunicaciones, así como los Plenos “sin especialización”</li>
        <li>Tribunales Colegiados de Circuito Décima, Novena y Octava Épocas.
        Deberá filtrarse primero por Circuito y después por el nombre y especialización que, en su caso, tenga cada Tribunal Colegiado. Por ejemplo:</li>
        <li>Primer Circuito
        Primer Tribunal Colegiado en Materia Administrativa del Primer Circuito..., deben considerarse aquellos Tribunales Colegiados especializados en Competencia Económica, Radiodifusión y Telecomunicaciones, así como los Tribunales Colegiados de los Centros Auxiliares.</li>
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Libro',
          descripcion: `Indica datos de publicación en el medio oficial de difusión que se integra por: el número del libro, tomo, volumen o número de publicación en la Gaceta o Semanario Judicial de la Federación, atendiendo a la Época de publicación.  

        <br/>8ª Época: Tomo + número romano o Número + número arábigo.
        <br/>9ª Época: Tomo + número romano
        <br/>10ª Época: Libro + número romano y Tomo con número arábigo o Libro con número arábigo +Tomo con número romano
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Tomo',
          descripcion: `Para 10ª Época corresponde al número de tomo en que se publica en el SJF y en la Gaceta del SJF.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Fecha',
          descripcion: `Dato que indica el mes y año en que se publicó (Ejemplo: noviembre de 2019), en el SJF y en su Gaceta. `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Localización Página',
          descripcion: `Dato que indica la página en la cual se publicó en el SJF y en su Gaceta.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Ejecutoria asociada con el voto',
          descripcion: `Ejecutoria relacionada con el voto.

        <br/>En el Semanario Semanal es posible su consulta a través de un hipervínculo desde el voto; en la Gaceta Electrónica y en el Módulo Sistematizado 1917 a la fecha es posible su consulta a través de un botón.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Tesis asociada (s) con el voto ',
          descripcion: `Tesis aisladas o de jurisprudencia relacionada (s) con el voto.

        <br/>En el Semanario Semanal es posible su consulta a través de un hipervínculo desde el voto; en la Gaceta Electrónica y en el Módulo Sistematizado 1917 a la fecha es posible su consulta a través de un botón.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Tipo de voto',
          descripcion: `Postura disidente o aclaratoria del Ministro (s)/Ministra (s) o Magistrado (s)/ Magistrada (s) en relación con el asunto resuelto. Existen diferentes tipos: particulares, minoría, aclaratorio, concurrentes, razonados, de reserva, con salvedad, paralelos, entre otros.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Emisor',
          descripcion: `Ministro (s)/Ministra (s) o Magistrado (s)/ Magistrada (s) que formula su postura en relación con un asunto.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Número de Expediente',
          descripcion: `Atendiendo al turno que se le asigna al llegar a la oficialía de partes común u órgano jurisdiccional de donde deriva el voto.
        `,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Contenido',
          descripcion: `Argumentación en la que basa su postura frente al asunto resuelto.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Fecha de publicación en el Semanario Semanal',
          descripcion: `Dato que indica el día, mes, año y hora de publicación del voto en el SJF.

        <br/>Fecha y hora de publicación del voto, a partir de la 10ª época, 6 de diciembre de 2013.
        
        <br/>Ejemplo: Este voto se publicó el viernes 30 de agosto de 2019 a las 10:38 horas en el Semanario Judicial de la Federación.
        `,
          ejemplo: '',
          link: 1,
        });
        break;

      case 'Sentencias':
        this.dtSentencias = [
          {
            table: [
              {
                campo: 'Tipo de asunto',
                descripcion:
                  'Clasificación del expediente que resuelve la SCJN de acuerdo a sus atribuciones constitucionales, en este caso, Acciones de Inconstitucionalidad',
              },
              {
                campo: 'Número completo del expediente',
                descripcion:
                  'Número de identificación que se asigna a los expedientes que ingresan a la SCJN. Se integra por un número consecutivo y por el año de ingreso. Cada año se reinicia el número consecutivo',
              },
              {
                campo: 'Número del expediente',
                descripcion:
                  'Número consecutivo que se asigna al asunto en el año de ingreso para su identificación',
              },
              {
                campo: 'Año',
                descripcion:
                  'Año en que ingresa el asunto a la SCJN. Cabe aclarar que los asuntos que ingresan después del 15 de diciembre se registran como ingresados en el año siguiente',
              },
              {
                campo: 'Acumulación de asuntos',
                descripcion:
                  'Referencia a los números de expediente de los asuntos acumulados. La acumulación procede cuando en dos o más Acciones de Inconstitucionalidad se impugna la misma norma y se resuelven con la misma sentencia',
              },
              {
                campo: 'Actor promovente',
                descripcion:
                  'Nombre completo del actor que promueve la Acción de Inconstitucionalidad ante la SCJN, es decir, quien presenta la demanda',
              },
              {
                campo: 'Actor legitimado de acuerdo a la CPEUM',
                descripcion:
                  'Clasificación del actor promovente que presenta la Acción de Inconstitucionalidad, conforme lo establece el artículo 105, fracción II de la CPEUM.',
              },
              {
                campo: 'Categoría del actor legitimado',
                descripcion:
                  'Clasificación del promovente que presenta una Acción de Inconstitucionalidad de acuerdo al tipo, poder y nivel de gobierno',
              },
              {
                campo:
                  'Nombre del partido político cuando éste sea actor legitimado',
                descripcion:
                  'Nombre completo y registrado del partido político cuando éste sea el actor legitimado',
              },
              {
                campo:
                  'Nombre(s) del (los) partido(s) político(s) que forman la minoría legislativa legitimada',
                descripcion:
                  'Nombre(s) del (los) partido(s) político(s) que conforman el 33% de la legislatura local o federal, cuando ésta sea el actor legitimado',
              },
              {
                campo:
                  'Órgano legislativo emisor de la(s) norma(s) impugnada(s)',
                descripcion:
                  'Nombre de la legislatura que emitió la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo:
                  'Nivel de gobierno del órgano legislativo emisor de la(s) norma(s) impugnada(s)',
                descripcion:
                  'Nivel de gobierno de la legislatura que emitió la(s) norma(s) que se impugnaron ante la SCJN: federal, estatal o Distrito Federal',
              },
              {
                campo:
                  'Número de la legislatura del órgano emisor de la(s) norma(s) impugnada(s)',
                descripcion:
                  'Número de la legislatura que emitió la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo: 'Órgano que promulgó la(s) norma(s) impugnada(s)',
                descripcion:
                  'Nombre del órgano que promulgó la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo:
                  'Nivel de gobierno del órgano que promulgó la(s) norma(s) impugnada(s)',
                descripcion:
                  'Nivel de gobierno del órgano que promulgó la(s) norma(s) que se impugnaron ante la SCJN: federal, estatal o Distrito Federal',
              },
              {
                campo:
                  'Entidad federativa en la que reside el órgano emisor y promulgador de la(s) norma(s) impugnada(s)',
                descripcion:
                  'Nombre de la entidad federativa en la que reside el órgano emisor y el órgano promulgador de la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo: 'Norma(s) impugnada(s)',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) impugnado(s). En el caso de que solamente aparezca el nombre de la norma, se refiere a que se impugnó en su totalidad',
              },
              {
                campo: 'Validez territorial de la(s) norma(s) impugnada(s)',
                descripcion:
                  'Ámbito territorial de validez de la norma impugnada: federal, estatal, municipal o Distrito Federal',
              },
              {
                campo: 'Tipo de la(s) norma(s) impugnada(s)',
                descripcion:
                  'Clasificación de la norma impugnada: Constitución, Tratado Internacional, Ley, Código, otro. Esta clasificación también incluye a Reglamentos y Decretos, aun cuando éstos no han sido considerados por la SCJN como normas generales para el trámite de Acciones de Inconstitucionalidad',
              },
              {
                campo: 'Fecha(s) de publicación de la(s) norma(s) impugnada(s)',
                descripcion:
                  'Fecha de publicación de la(s) norma(s) impugnada(s) en la publicación oficial correspondiente (Diario Oficial de la Federación, Semanario Judicial de la Federación y/o gaceta o periódico estatal/DF)',
              },
              {
                campo: 'Tema de la Acción de Inconstitucionalidad',
                descripcion:
                  'Se refiere al tema del asunto. El tema se define a partir del nombre de la(s) norma(s) impugnada(s). En el caso de que el nombre de la norma no especifique el tema, se analizan los preceptos impugnados',
              },
              {
                campo: 'Fecha de ingreso a la SCJN',
                descripcion:
                  'Fecha en que la SCJN recibió la demanda. En caso de que ésta se presente en días o en horas inhábiles, se registra la fecha en que el actuario la recibió',
              },
              {
                campo: 'Fecha del acuerdo de radicación y turno',
                descripcion:
                  'Fecha en la que el Ministro Presidente emite el acuerdo por el que ordena la integración y registro del asunto. En el mismo se designa, según el turno que corresponda, al Ministro Instructor que dará trámite y seguimiento al asunto',
              },
              {
                campo:
                  'Ministro Instructor designado en el auto de radicación y turno',
                descripcion:
                  'Nombre completo del Ministro que conocerá y resolverá la Acción de Inconstitucionalidad designado en el acuerdo de radicación y turno',
              },
              {
                campo: 'Fecha del acuerdo inicial',
                descripcion:
                  'Fecha del acuerdo que dicta el Ministro Instructor, en el cual determina la admisión o el desechamiento de la demanda, o en su caso, la prevención al actor',
              },
              {
                campo: 'Sentido del acuerdo inicial',
                descripcion:
                  'Indica si el ministro instructor determinó: 1) que la demanda cumple con los requisitos legales para su estudio y, por lo tanto, se admite; 2) que el escrito de demanda es oscuro o irregular y, por lo tanto, previene al actor, es decir, le solicita que aclare su escrito inicial para determinar su admisión o desechamiento; o 3) que existe un motivo manifiesto e indudable de improcedencia y, por lo tanto, se desecha',
              },
              {
                campo: 'Recurso de Reclamación',
                descripcion:
                  'Indica si alguna de las partes que interviene en el proceso interpuso un escrito en el que manifiesta su desacuerdo con las decisiones de trámite del asunto dictado por el Ministro Instructor: admisión, desechamiento, improcedencia, sobreseimiento, entre otros',
              },
              {
                campo: 'Fecha del acuerdo por el que se concluyó el asunto',
                descripcion:
                  'Fecha del acuerdo por el que se da por concluido el asunto',
              },
              {
                campo: 'Órgano resolutor de la sentencia ejecutoria',
                descripcion:
                  'Nombre del órgano de la SCJN que dictó la sentencia ejecutoria: Pleno, Primera o Segunda Sala',
              },
              {
                campo: 'Fecha de sentencia ejecutoria',
                descripcion:
                  'Fecha de la sentencia definitiva, emitida por uno de los órganos de la SCJN, que pone fin al asunto',
              },
              {
                campo: 'Nombre del Ministro Ponente',
                descripcion:
                  'Nombre completo del Ministro que elabora el proyecto de sentencia para discutir en sesión y, posteriormente, integra las modificaciones acordadas en las sesiones a la sentencia definitiva. Generalmente el Ministro Ponente es el mismo que el Ministro Instructor; sin embargo, éste puede cambiar por diversas causas propias del proceso, u otras, como vacaciones o enfermedad',
              },
              {
                campo: 'Fecha de notificación de la sentencia ejecutoria',
                descripcion:
                  'Fecha en la que se da a conocer la sentencia a los interesados por lista',
              },
              {
                campo: 'Artículos constitucionales que se estiman violados',
                descripcion:
                  'Número de los artículos de la CPEUM que se señalan en la demanda como violados',
              },
              {
                campo:
                  '¿Se hace referencia a disposiciones de carácter internacional?',
                descripcion:
                  'Indica si en el asunto se hizo mención a una disposición de carácter internacional. Sólo se consideran aquellos asuntos concluidos por sentencia',
              },
              {
                campo:
                  'Disposición(es) de carácter internacional(es) en escrito inicial',
                descripcion:
                  'Nombre y preceptos de la(s) disposición (es) de carácter internacional (es) que se mencionan en el escrito inicial, es decir, en la demanda',
              },
              {
                campo:
                  'Disposición(es) de carácter internacional(es) en pedimento de la PGR',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es) que se mencionan en el pedimento de la PGR',
              },
              {
                campo:
                  'Disposición(es) de carácter internacional(es) en informes',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es) que se mencionan en informes de la parte demandada y/o del TEPJF',
              },
              {
                campo:
                  'Disposición(es) de carácter internacional(es) en sentencia',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es) que se mencionan en la sentencia',
              },
              {
                campo:
                  'Disposición(es) de carácter internacional(es) en los alegatos',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es) que se mencionan en los alegatos de la parte actora, demandada y/o PGR',
              },
              {
                campo:
                  'Disposición(es) de carácter internacional(es) en voto separado',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es) que se mencionan en votos separados (opinión particular de uno o más ministros)',
              },
              {
                campo:
                  'En caso de informes, quién hace mención a la(s) disposición(es) de carácter internacional(es)',
                descripcion:
                  'Nombre de las partes involucradas que emiten los informes donde se hace referencia a disposición(es) de carácter internacional(es',
              },
              {
                campo: 'Asunto concluido por acuerdo',
                descripcion:
                  'Indica si la Acción de Inconstitucionalidad finalizó por una resolución diferente a la sentencia ejecutoria. Esta resolución puede dictarse desde el acuerdo inicial (cuando se desecha la demanda), o sobrevenir durante el transcurso del procedimiento (cuando exista un acuerdo que decrete la improcedencia o el sobreseimiento del asunto)',
              },
              {
                campo: 'Norma válida',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) declarado(s) válidos, es decir constitucionales, en la sentencia ejecutoria',
              },
              {
                campo: 'Inconstitucionalidad',
                descripcion:
                  'Indica si en la sentencia ejecutoria se declaró la invalidez, es decir la inconstitucionalidad, de la(s) norma(s) impugnada(s)',
              },
              {
                campo: 'Norma inválida',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) declarado(s) inválidos/inconstitucionales en la sentencia ejecutoria',
              },
              {
                campo: 'Norma sobreseída',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) sobreseídos en la sentencia ejecutoria. Sobreseimiento es cuando el órgano de la SCJN no estudia la constitucionalidad de la norma impugnada por presentarse alguna causal de improcedencia',
              },
              {
                campo: 'Sentencia desestimada',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) respecto de los cuales no se pudo declarar la invalidez en la sentencia ejecutoria, por no haberse alcanzado la votación calificada de al menos 8 votos de los 11 ministros como lo establece la CPEUM',
              },
              {
                campo: 'Sentencia otra',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) respecto de los cuales el juicio se declaró sin materia (no existe la norma impugnado), o se dictó una resolución diferente a validez (constitucional), invalidez (inconstitucional), sobreseimiento o desestimación',
              },
              {
                campo: 'Puntos resolutivos',
                descripcion:
                  'Texto íntegro en formato PDF de los puntos resolutivos tal como aparece en la sentencia ejecutoria',
              },
              {
                campo: 'Celda vacía',
                descripcion:
                  'Una celda vacía indica que en el expediente no existe información sobre esa característica o variable. No se trata de una omisión',
              },
            ],
            name: 'Acción de Inconstitucionalidad',
            active: true,
          },
          {
            table: [
              {
                campo: 'Tipo de asunto',
                descripcion:
                  'Clasificación del asunto que resuelve la SCJN de acuerdo a sus atribuciones constitucionales, en este caso, Controversias Constitucionales',
              },
              {
                campo: 'Número completo del expediente',
                descripcion:
                  'Número de identificación que se asigna a los asuntos que ingresan a la SCJN. Se integra por un número consecutivo y por el año de ingreso. Cada año se reinicia el número consecutivo',
              },
              {
                campo: 'Número de expediente',
                descripcion:
                  'Número consecutivo que se asigna al asunto para su identificación',
              },
              {
                campo: 'Año',
                descripcion:
                  'Año en que ingresa el asunto a la SCJN. Cabe aclarar que los asuntos que ingresan después del 15 de diciembre se registran como ingresados en el año siguiente',
              },
              {
                campo: 'Expedientes conexos',
                descripcion:
                  'Referencia a los números de expediente de los asuntos conexos. La conexidad procede cuando en dos o más Controversias Constitucionales se impugna la misma norma y/o acto. Los asuntos conexos se discuten en la misma sesión',
              },
              {
                campo: 'Actores no legitimados',
                descripcion:
                  'Nombre de quien presenta una Controversia Constitucional y no se encuentra legitimado de acuerdo a lo establecido en el artículo 105, fracción I de la CPEUM y también, de aquellos que pertenecen a alguno de los poderes o niveles de gobierno que legitima la CPEUM, pero no tienen la representación legal para presentar una Controversia Constitucional.',
              },
              {
                campo: 'Entidad federativa del actor',
                descripcion:
                  'Nombre de la entidad federativa del actor legitimado',
              },
              {
                campo: 'Tipo de conflicto',
                descripcion:
                  'Clasificación general de las partes entre las que se presenta la controversia',
              },
              {
                campo: 'Tipo de conflicto promovente',
                descripcion:
                  'Clasificación general de (los) promovente(s) que presenta(n) una Controversia Constitucional',
              },
              {
                campo: 'Actor promovente',
                descripcion:
                  'Nombre completo del actor que promueve la Controversia Constitucional ante la SCJN, es decir, quien presenta la demanda',
              },
              {
                campo: 'Categoría del actor legitimado',
                descripcion:
                  'Clasificación del promovente que presenta una Controversia Constitucional de acuerdo al tipo, poder y nivel de gobierno',
              },
              {
                campo: 'Partido(s) político(s) del(os) actor(es)',
                descripcion:
                  'Nombre completo del partido político al que pertenece el actor promovente. Esta característica no aplica en caso de que el actor sea poder legislativo o judicial, una coalición o un actor no legitimado',
              },
              {
                campo: 'Demandado no legitimado',
                descripcion:
                  'Nombre de quien se señala como demandado en una Controversia Constitucional y no se encuentra dentro de lo establecido en el artículo 105, fracción I de la CPEUM',
              },
              {
                campo: 'Tipo de conflicto demandado',
                descripcion:
                  'Clasificación general de (los) demandado(s) que señalan los promoventes de una Controversia Constitucional',
              },
              {
                campo: 'Demandado',
                descripcion:
                  'Nombre completo del demandado como lo señala el actor promovente',
              },
              {
                campo: 'Categoría del demandado',
                descripcion:
                  'Clasificación del demandado que señala el actor promovente de una Controversia Constitucional de acuerdo al tipo, poder y nivel de gobierno',
              },
              {
                campo: 'Partido político del demandado',
                descripcion:
                  'Nombre completo del partido político al cual pertenece el demandado que señala el actor promovente. Esta característica no aplica en caso de que el demandado sea poder legislativo o judicial, una coalición o un demandado no legitimado',
              },
              {
                campo: 'Entidad federativa del demandado',
                descripcion:
                  'Nombre de la entidad federativa del demandado que señala el actor promovente',
              },
              {
                campo: '¿Hubo Tercero interesado?',
                descripcion:
                  'Indica si algún sujeto, sin tener el carácter de actor o demandado, es considerado por una de las partes como posible afectado con la sentencia que llegara a dictarse',
              },
              {
                campo: 'Nombre del(los) Tercero(s) Interesado(s)',
                descripcion:
                  'Nombre completo del (los) tercero(s) interesado(s)',
              },
              {
                campo: 'Se reclama invalidez de un acto o una norma general',
                descripcion:
                  'Especifica si en la demanda se impugna la invalidez de un acto, una norma o ambos',
              },
              {
                campo: 'Nombre de la norma impugnada 1',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) impugnado(s). En el caso de que solamente aparezca el nombre de la norma, se entenderá que se impugnó en su totalidad',
              },
              {
                campo:
                  'Órgano legislativo emisor de la(s) norma(s) impugnada(s)',
                descripcion:
                  'Nombre de la legislatura que emitió la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo:
                  'Categoría del órgano legislativo emisor de la norma impugnada',
                descripcion:
                  'Nivel de gobierno de la legislatura que emitió la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo:
                  'Número de legislatura del órgano emisor de la norma impugnada',
                descripcion:
                  'Número de la legislatura que emitió la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo: 'Órgano que promulgó la(s) norma(s) impugnada(s)',
                descripcion:
                  'Nombre del órgano que promulgó la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo: 'Categoría del órgano que promulgó la norma impugnada',
                descripcion:
                  'Nivel de gobierno del órgano que promulgó la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo:
                  'Entidad federativa en la que reside el órgano emisor y promulgador de la(s) norma(s) impugnada(s)',
                descripcion:
                  'Nombre de la entidad federativa en la que reside el órgano emisor y el órgano promulgador de la(s) norma(s) que se impugnaron ante la SCJN',
              },
              {
                campo: 'Ámbito de validez territorial de la norma impugnada',
                descripcion:
                  'Ámbito territorial de validez de la(s) norma(s) impugnada(s): federal, estatal, municipal o Distrito Federal',
              },
              {
                campo: 'Tipo de la norma impugnada',
                descripcion:
                  'Clasificación de la norma impugnada: Constitución, Tratado Internacional, Ley, Código, otro. Esta clasificación también incluye a Reglamentos y Decretos, aun cuando éstos no han sido considerados por la SCJN como normas generales para el trámite de Controversias Constitucionales. En el caso de los Decretos, esto aplicará cuando hayan sido impugnados sus artículos transitorios o cuando cumplan con las características de una norma general',
              },
              {
                campo: 'Fecha de publicación de la norma impugnada',
                descripcion:
                  'Fecha de publicación de la(s) norma(s) impugnada(s) en la publicación oficial correspondiente (Diario Oficial de la Federación, Semanario Judicial de la Federación y/o gaceta o periódico estatal/DF)',
              },
              {
                campo: 'Tema de la norma impugnada',
                descripcion:
                  'Se define a partir del nombre de la(s) norma(s) impugnada(s). En el caso de que el nombre de la norma no especifique el tema, se analizan los preceptos impugnados',
              },
              {
                campo: 'Descripción del acto',
                descripcion: 'Descripción de (los) acto(s) impugnado(s)',
              },
              {
                campo: 'Nombre de la autoridad que emite el acto',
                descripcion:
                  'Nombre de las autoridades que emitieron los actos que se impugnaron ante la SCJN',
              },
              {
                campo: 'Validez territorial del acto impugnado',
                descripcion:
                  'Ámbito territorial de validez del (los) acto(s) impugnado(s): federal, estatal, municipal o Distrito Federal',
              },
              {
                campo: 'Fecha del acto reclamado',
                descripcion:
                  'Fecha de emisión del acto impugnado. Cuando ésta no se conoce, se considera la de su notificación por cualquier medio oficial',
              },
              {
                campo: 'Tema del acto impugnado',
                descripcion:
                  'Se define a partir de la descripción de (los) acto(s) impugnado(s)',
              },
              {
                campo: 'Artículos constitucionales que se estiman violados',
                descripcion:
                  'Número de los artículos de la CPEUM que se señalan en la demanda como violados',
              },
              {
                campo: '¿Solicitó la suspensión la parte actora?',
                descripcion:
                  'Indica si, de oficio o a petición de parte, se solicitó la interrupción de los efectos del acto impugnado',
              },
              {
                campo: '¿Se otorgó la suspensión?',
                descripcion:
                  'Indica si el ministro instructor concedió o no al actor la suspensión',
              },
              {
                campo: 'Fecha de ingreso a la SCJN',
                descripcion:
                  'Fecha en que la SCJN recibió la demanda. En caso de ésta se presente en días o en horas inhábiles, se registra la fecha en que el actuario la recibió',
              },
              {
                campo: 'Fecha del acuerdo de radicación y turno',
                descripcion:
                  'Fecha en la que el Ministro Presidente emite el acuerdo por el que ordena la integración y registro del asunto. En el mismo designa, según el turno que corresponda, al Ministro Instructor que dará trámite y seguimiento al asunto',
              },
              {
                campo:
                  'Ministro Instructor designado en el auto de radicación y turno',
                descripcion:
                  'Nombre completo del Ministro que conocerá y resolverá la Controversia Constitucional designado en el acuerdo de radicación y turno',
              },
              {
                campo: 'Fecha del acuerdo inicial',
                descripcion:
                  'Fecha del acuerdo que dicta el Ministro Instructor en el cual determina la admisión o el desechamiento de la demanda, o en su caso, la prevención al actor',
              },
              {
                campo: 'Sentido del acuerdo inicial',
                descripcion:
                  'Indica si el Ministro Instructor determinó: 1) que la demanda cumple con los requisitos legales para su estudio y, por lo tanto, se admite; 2) que el escrito de demanda es oscuro o irregular y, por lo tanto, previene al actor; o 3) que existe un motivo manifiesto e indudable de improcedencia y, por lo tanto, se desecha',
              },
              {
                campo: '¿Hubo contestación de la demanda?',
                descripcion:
                  'Indica si los demandados o terceros interesados contestaron la demanda',
              },
              {
                campo: 'Quién contestó la demanda',
                descripcion:
                  'Nombre de las autoridades que contestaron la demanda',
              },
              {
                campo: '¿Hubo ampliación de la demanda?',
                descripcion:
                  'Indica si el actor complementó su demanda inicial por un hecho que apareció en la contestación de la demanda (hecho nuevo), o por un hecho que surgió entre la presentación de la demanda y el cierre de la instrucción (hecho superveniente)',
              },
              {
                campo: '¿Cuántas ampliaciones de la demanda hubo?',
                descripcion:
                  'Número de ampliaciones a la demanda que se presentan en la Controversia Constitucional',
              },
              {
                campo: '¿Presentó pruebas la parte actora?',
                descripcion:
                  'Indica si el actor presentó pruebas para demostrar los hechos que señala',
              },
              {
                campo: '¿Presentó pruebas la parte demandada?',
                descripcion:
                  'Indica si el demandado presentó pruebas para demostrar los hechos que señala',
              },
              {
                campo: '¿Presentó pruebas el tercero interesado?',
                descripcion:
                  'Indica si el tercero interesado presentó pruebas para demostrar los hechos que señala',
              },
              {
                campo: '¿Presentó alegatos la parte actora?',
                descripcion:
                  'Indica si el actor presentó un escrito con argumentos tendientes a provocar convicción a su favor',
              },
              {
                campo: '¿Presentó alegatos la parte demandada?',
                descripcion:
                  'Indica si el demandado presentó un escrito con argumentos tendientes a provocar convicción a su favor',
              },
              {
                campo: '¿Presentó alegatos el tercero interesado?',
                descripcion:
                  'Indica si el tercero interesado presentó un escrito con argumentos tendientes a provocar convicción a su favor',
              },
              {
                campo: 'Fecha de celebración de la audiencia',
                descripcion:
                  'Fecha de celebración de la audiencia de ofrecimiento y desahogo de pruebas y alegatos',
              },
              {
                campo: 'Asunto concluido por acuerdo',
                descripcion:
                  'Indica si la Controversia Constitucional finalizó por una resolución diferente a la sentencia ejecutoria. Esta resolución puede dictarse desde el acuerdo inicial (cuando se desecha la demanda), o sobrevenir durante el transcurso del procedimiento (cuando exista un acuerdo que decrete la improcedencia o el sobreseimiento del asunto)',
              },
              {
                campo: 'Fecha del acuerdo por el que se concluyó el asunto',
                descripcion:
                  'Fecha del acuerdo por el que se da por concluido el asunto',
              },
              {
                campo: 'Órgano resolutor de la sentencia ejecutoria',
                descripcion:
                  'Nombre del órgano de la SCJN que dictó la sentencia ejecutoria: Pleno, Primera o Segunda Sala',
              },
              {
                campo: 'Fecha de la sentencia ejecutoria',
                descripcion:
                  'Fecha de la sentencia definitiva, emitida por uno de los órganos de la SCJN, que pone fin al asunto',
              },
              {
                campo: 'Nombre del Ministro ponente',
                descripcion:
                  'Nombre completo del Ministro que elabora el proyecto de sentencia para discutir en sesión y, posteriormente, integra las modificaciones acordadas en las sesiones a la sentencia definitiva. Generalmente el Ministro Ponente es el mismo que el Ministro Instructor; sin embargo, éste puede cambiar por diversas causas propias del proceso, u otras, como vacaciones o enfermedad',
              },
              {
                campo: 'Inconstitucionalidad',
                descripcion:
                  'Indica si en la sentencia ejecutoria se declaró la invalidez de alguna de las normas o actos impugnados',
              },
              {
                campo: 'Fecha de notificación de la sentencia ejecutoria',
                descripcion:
                  'Fecha en la que se da a conocer la sentencia a los interesados por lista',
              },
              {
                campo: '¿La sentencia requiere ejecución?',
                descripcion:
                  'Indica si se ordena a una autoridad la realización de actos tendientes a la ejecución de la sentencia. Lo anterior no aplica en el caso de la orden de publicación de la sentencia en el medio oficial correspondiente',
              },
              {
                campo: 'Fecha del acuerdo que determina el cumplimiento',
                descripcion:
                  'Fecha del acuerdo en el que el Ministro Presidente resuelve si la sentencia ha quedado debidamente cumplida',
              },
              {
                campo: 'Norma válida',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) declarado(s) válidos, es decir constitucionales, en la sentencia ejecutoria',
              },
              {
                campo: 'Norma inválida',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) declarado(s) inválidos/inconstitucionales en la sentencia ejecutoria',
              },
              {
                campo: 'Norma sobreseida',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) sobreseídos en la sentencia ejecutoria. Sobreseimiento es cuando el órgano de la SCJN no estudia la constitucionalidad de la norma impugnada por presentarse alguna causal de improcedencia',
              },
              {
                campo: 'Norma desestimada',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) respecto de los cuales no se pudo declarar la invalidez en la sentencia ejecutoria por no haberse alcanzado la votación calificada de al menos 8 votos de los 11 ministros',
              },
              {
                campo: 'Norma otra resolución',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) respecto de los cuales el juicio se declaró sin materia (no existe la norma impugnado), o se dictó una resolución diferente a validez (constitucional), invalidez (inconstitucional), sobreseimiento o desestimación',
              },
              {
                campo: 'Acto de autoridad constitucional',
                descripcion:
                  'Descripción del (los) acto(s) respecto del cual se declaró la validez en la sentencia ejecutoria',
              },
              {
                campo: 'Acto de autoridad inconstitucional',
                descripcion:
                  'Descripción del (los) acto(s) respecto del cual se declaró la invalidez en la sentencia ejecutoria',
              },
              {
                campo: 'Acto de autoridad sobreseído',
                descripcion:
                  'Descripción del (los) acto(s) sobreseído(s) en la sentencia ejecutoria. Sobreseimiento es cuando el órgano de la SCJN no estudia la constitucionalidad de la norma impugnada por presentarse alguna causal de improcedencia',
              },
              {
                campo: 'Acto desestimado',
                descripcion:
                  'Descripción del (los) acto(s) respecto de los cuales no se pudo declarar la invalidez en la sentencia ejecutoria por no haberse alcanzado la votación calificada de al menos 8 votos de los 11 ministros',
              },
              {
                campo: 'Acto otra resolución',
                descripcion:
                  'Descripción del (los) acto(s) respecto de los cuales el juicio se declaró sin materia o se dictó una resolución diferente a validez (constitucional), invalidez (inconstitucional), sobreseimiento o desestimación',
              },
              {
                campo: '¿Se hace referencia a disposiciones internacionales?',
                descripcion:
                  'Indica si en el asunto se hizo mención a una disposición de carácter internacional',
              },
              {
                campo: 'Disposición(es) internacional(es) en escrito inicial',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es) que se mencionan en el escrito inicial, es decir, en la demanda',
              },
              {
                campo: 'Disposición(es) internacional(es) en sentencia',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es) que se mencionan en la sentencia ejecutoria',
              },
              {
                campo:
                  'Disposición(es) internacional(es) en contestación a la demanda',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es)que se menciona en la contestación a la demanda',
              },
              {
                campo: 'Disposición(es) internacional(es) en voto separado',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es) que se mencionan en votos separados (opinión particular de uno o más ministros)',
              },
              {
                campo:
                  'En caso de voto separado o contestación a la demanda quien presenta el escrito',
                descripcion:
                  'Nombre de las partes involucradas que presentan contestación a la demanda donde se hace referencia a disposición(es) de carácter internacional(es) y /o tipo de voto en donde se hace referencia a disposición(es) internacional(es) y nombre del Ministro que lo emite',
              },
              {
                campo: 'Disposición(es) internacional(es) en otros escritos',
                descripcion:
                  'Nombre y preceptos de la(s) disposición(es) de carácter internacional(es) que se mencionan en otros documentos como escrito de Amicus Curiae, escritos de terceros interesados, alegatos, opinión de PGR, entre otros',
              },
              {
                campo: '¿Se promovieron incidentes en el procedimiento?',
                descripcion:
                  'Indica si el actor, demandado o tercero interesado interpuso algún incidente previsto en la ley',
              },
              {
                campo: '¿Se interpusieron recursos en el procedimiento?',
                descripcion:
                  'Indica si el actor, demandado o tercero interesado interpuso algún recurso previsto en la ley',
              },
              {
                campo: 'Puntos resolutivos',
                descripcion:
                  'Texto íntegro en formato PDF de los puntos resolutivos tal como aparece en la sentencia ejecutoria',
              },
              {
                campo: 'Celda vacía',
                descripcion:
                  'Una celda vacía indica que en el expediente no existe información sobre esa característica o variable. No se trata de una omisión',
              },
            ],
            name: 'Controversia Constitucional',
            active: false,
          },
          {
            table: [
              {
                campo: 'Tipo de asunto',
                descripcion:
                  'Clasificación del asunto que resuelve la SCJN de acuerdo a sus atribuciones constitucionales, en este caso, Amparo en Revisión.',
              },
              {
                campo: 'Número completo del expediente',
                descripcion:
                  'Número de identificación que se asigna a los asuntos que ingresan a la SCJN. Se integra por un número consecutivo y por el año de ingreso. Cada año se reinicia el número consecutivo',
              },
              {
                campo: 'Número de expediente',
                descripcion:
                  'Número consecutivo que se asigna al asunto para su identificación',
              },
              {
                campo: 'Año',
                descripcion:
                  'Año en que ingresa el asunto a la SCJN. Cabe aclarar que los asuntos que ingresan después del 15 de diciembre se registran como ingresados en el año siguiente',
              },
              {
                campo: 'Materia',
                descripcion:
                  'Clasificación conforme a la rama jurídica sobre la que versa el asunto de estudio: administrativa, civil, laboral o penal.',
              },
              {
                campo: 'Submateria',
                descripcion:
                  'Rama específica de la materia del derecho a la que pertenece el conflicto de amparo.',
              },
              {
                campo: 'Carácter del promovente',
                descripcion:
                  'Clasificación del quejoso que presenta el escrito de solicitud de amparo ante el órgano judicial competente: persona física o persona moral (derecho privado, público o social).',
              },
              {
                campo: 'Tipo de autoridad responsable',
                descripcion:
                  'Clasificación de la autoridad responsable en el juicio de amparo: Federal, Estatal/D.F./CDMX, Municipal, Particular o Internacional.',
              },
              {
                campo: '¿Hay terceros interesados?',
                descripcion:
                  'Indica si en el juicio de amparo se hace referencia a terceros perjudicados/interesados conforme a lo que establece el artículo 5 fracción III de la Ley de Amparo vigente.',
              },
              {
                campo: 'Recurrente en la SCJN',
                descripcion:
                  'Parte del juicio de amparo indirecto que solicita la revisión de la sentencia dictada por el juzgado de distrito o tribunal unitario de circuito ante la SCJN (quejoso, autoridad responsable, tercero interesado / perjudicado, ministerio público federal / fiscal general de la república).',
              },
              {
                campo:
                  '¿Se reclama la inconstitucionalidad de normas, actos u omisiones?',
                descripcion:
                  'Especifica si en la demanda se impugna la constitucionalidad de una norma, un acto o una omisión.',
              },
              {
                campo: 'Norma impugnada',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) impugnado(s). En el caso de que solamente aparezca el nombre de la norma, se entenderá que se impugnó en su totalidad.',
              },
              {
                campo: 'Validez territorial de la norma impugnada',
                descripcion:
                  'Ámbito territorial de validez de la(s) norma(s) impugnada(s): federal, estatal, municipal o Distrito Federal / Ciudad de México.',
              },
              {
                campo: 'Tipo de la norma impugnada',
                descripcion:
                  'Clasificación de la norma impugnada: Constitución, Tratado Internacional, Estatuto de Gobierno del Distrito Federal/CDMX, Ley, Reglamento, Acuerdo, Decreto, Resolución de observación general, otro.',
              },
              {
                campo: 'Fecha de publicación de la norma impugnada',
                descripcion:
                  'Fecha de publicación de la(s) norma(s) impugnada(s) en alguna publicación oficial (Diario Oficial de la Federación, Semanario Judicial de la Federación y/o gaceta o periódico estatal/Ciudad de México).',
              },
              {
                campo: 'Descripción del acto impugnado',
                descripcion: 'Descripción del(os) acto(s) reclamado(s).',
              },
              {
                campo: 'Fecha del acto impugnado',
                descripcion: 'Fecha en que se realizó el acto(s) reclamado(s).',
              },
              {
                campo: 'Nombre de la autoridad ordenadora del acto impugnado',
                descripcion:
                  'Nombre de la autoridad responsable que ordena el acto reclamado.',
              },
              {
                campo: 'Nombre de la autoridad ejecutora del acto impugnado',
                descripcion:
                  'Nombre de la autoridad responsable que ejecuta el acto reclamado',
              },
              {
                campo: 'Descripción de la omisión impugnada',
                descripcion: 'Descripción de la omisión(es) reclamada(s).',
              },
              {
                campo: 'Nombre de la autoridad que omite',
                descripcion:
                  'Nombre de la autoridad(es) responsable(s) que realizan la omisión reclamada.',
              },
              {
                campo: 'Artículos constitucionales que se estiman violados',
                descripcion:
                  'Número y fracciones de los artículos de la CPEUM que se señalan en la demanda como violados.',
              },
              {
                campo:
                  'Nombre del Juzgado de Distrito o Tribunal Unitario de Circuito',
                descripcion:
                  'Nombre completo del juzgado de distrito o tribunal unitario de circuito que conoció sobre el amparo indirecto.',
              },
              {
                campo: 'Entidad federativa del JD o TUC',
                descripcion:
                  'Entidad federativa a la que pertenece el tribunal judicial que conoce el amparo indirecto.',
              },
              {
                campo: 'Sentido de la sentencia del JD o TUC',
                descripcion:
                  'Clasificación de la determinación de la sentencia del juicio de amparo indirecto dictada por el juzgado de distrito o tribunal unitario de circuito.',
              },
              {
                campo: 'Fecha de engrose en JD o TUC',
                descripcion:
                  'Fecha en que se publica el engrose de la sentencia del juzgado de distrito o tribunal unitario de circuito.',
              },
              {
                campo: 'Nombre del Tribunal Colegiado de Circuito',
                descripcion:
                  'Nombre completo del tribunal colegiado de circuito que conoció el amparo en revisión.',
              },
              {
                campo: 'Circuito Judicial del TCC',
                descripcion:
                  'Circuito judicial al que pertenece el tribunal colegiado de circuito que conoció el amparo en revisión.',
              },
              {
                campo: 'Sentido de la sentencia del TCC',
                descripcion:
                  'Clasificación de la determinación del juicio de amparo en revisión dictada por el tribunal colegiado de circuito en sentencia o acuerdo.',
              },
              {
                campo: 'Fecha de resolución del TCC',
                descripcion:
                  'Fecha del acuerdo o sentencia que dicta el tribunal colegiado de circuito.',
              },
              {
                campo: 'Fecha de remisión a la SCJN',
                descripcion:
                  'Fecha del oficio con el que el tribunal colegiado de circuito remite a la SCJN el amparo en revisión.',
              },
              {
                campo: 'Fecha de ingreso a la SCJN',
                descripcion:
                  'Fecha en que la SCJN recibió la demanda. En caso de que ésta se presente en días o en horas inhábiles, se registra la fecha en que el actuario la recibió.',
              },
              {
                campo: 'Fecha del acuerdo inicial',
                descripcion:
                  'Fecha del acuerdo que dicta la SCJN (Pleno, Primera Sala o Segunda Sala), en el cual se determina la admisión o el desechamiento de la demanda, o en su caso, la remisión a un tribunal colegiado de circuito.',
              },
              {
                campo: 'Sentido del acuerdo inicial',
                descripcion:
                  'Indica si en el acuerdo inicial se determinó que la demanda: se admite, se desecha o se remite a un tribunal colegiado de circuito.',
              },
              {
                campo: 'Recurso de reclamación',
                descripcion:
                  'Indica si alguna de las partes que interviene en el proceso interpuso un escrito en el que manifiesta su desacuerdo con la decisión de admisión, desechamiento o remisión a un tribunal colegiado de circuito.',
              },
              {
                campo: 'Resolución del recurso de reclamación',
                descripcion:
                  'Pronunciamiento por el que se determina confirmar o revocar el acuerdo de admisión, desechamiento o remisión a un tribunal colegiado de circuito.',
              },
              {
                campo: '¿Hubo revisión adhesiva en la SCJN?',
                descripcion:
                  'Indica si hubo promoción de cualquiera de las partes ante la SCJN, adhiriéndose a la revisión principal.',
              },
              {
                campo: 'Ministro instructor',
                descripcion:
                  'Nombre completo del Ministro que conocerá y resolverá el Amparo en Revisión.',
              },
              {
                campo: 'Tipo de resolución en la SCJN',
                descripcion:
                  'Indica si el asunto concluye en la SCJN por acuerdo o por sentencia.',
              },
              {
                campo: 'Fecha de conclusión',
                descripcion:
                  'Fecha del acuerdo o sentencia que pone fin al amparo en revisión en la SCJN.',
              },
              {
                campo: 'Pronunciamiento del amparo en revisión en la SCJN',
                descripcion:
                  'Clasificación de la determinación del juicio de amparo en revisión dictada por la SCJN en sentencia o acuerdo.',
              },
              {
                campo: 'Sobreseimiento del amparo indirecto en la SCJN',
                descripcion:
                  'Indica, en caso de conclusión por sentencia, si se sobresee el amparo indirecto.',
              },
              {
                campo: 'Órgano resolutor de la sentencia ejecutoria',
                descripcion:
                  'Nombre del órgano de la SCJN que dictó la sentencia: Pleno, Primera Sala o Segunda Sala.',
              },
              {
                campo: 'Fecha de notificación de la resolución',
                descripcion:
                  'Fecha en que se da a conocer la resolución de la SCJN por acuerdo o sentencia a los interesados',
              },
              {
                campo: 'Nombre del ministro ponente',
                descripcion:
                  'Nombre completo del ministro encargado de presentar el proyecto de sentencia para discutir en sesión y, posteriormente, integra las modificaciones acordadas en las sesiones a la sentencia definitiva. Generalmente coincide con el ministro instructor; sin embargo, éste puede cambiar por diversas causas propias del proceso u otras.',
              },
              {
                campo: 'Ampara',
                descripcion:
                  'Indica si en el asunto se determina amparar en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: 'Norma ampara',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) que otorga la protección constitucional mediante el amparo en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: 'Norma niega amparo',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) que no otorga la protección constitucional mediante la negativa de amparo en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: 'Norma sobreseída',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) sobreseídos en la sentencia ejecutoria. Sobreseimiento es cuando el órgano de la SCJN no estudia la constitucionalidad de la norma impugnada por presentarse alguna causal de improcedencia.',
              },
              {
                campo: 'Norma otra resolución',
                descripcion:
                  'Nombre de la(s) norma(s), artículo(s) y fracción(es) de las que se determina devolver los autos o reservar jurisdicción a un Tribunal Colegiado de Circuito en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: 'Acto ampara',
                descripcion:
                  'Descripción del acto(s) que otorga la protección constitucional mediante el amparo en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: 'Acto niega amparo',
                descripcion:
                  'Descripción del acto(s) que no otorga la protección constitucional mediante la negativa de amparo en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: 'Acto sobreseído',
                descripcion:
                  'Descripción del acto(s) sobreseídos en la sentencia ejecutoria. Sobreseimiento es cuando el órgano de la SCJN no estudia la constitucionalidad del acto impugnado por presentarse alguna causal de improcedencia.',
              },
              {
                campo: 'Acto otra resolución',
                descripcion:
                  'Descripción de los actos de los que se define devolver los autos o reservar jurisdicción a un Tribunal Colegiado de Circuito en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: 'Omisión ampara',
                descripcion:
                  'Descripción de la(s) omisión(es) que otorga la protección constitucional mediante el amparo en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: 'Omisión niega amparo',
                descripcion:
                  'Descripción de la(s) omisión(es) que no otorga la protección constitucional mediante la negativa de amparo en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: 'Omisión sobreseída',
                descripcion:
                  'Descripción de la(s) omisión(es) sobreseídos en la sentencia ejecutoria. Sobreseimiento es cuando el órgano de la SCJN no estudia la constitucionalidad dela omisión impugnado por presentarse alguna causal de improcedencia.',
              },
              {
                campo: 'Omisión otra resolución',
                descripcion:
                  'Descripción de la(s) omisión(es) de las que se define devolver los autos o reservar jurisdicción a un Tribunal Colegiado de Circuito en alguno de los puntos resolutivos de la sentencia ejecutoria.',
              },
              {
                campo: '¿Hubo estudio de agravios?',
                descripcion:
                  'Indica si se realizó estudio de la lesión de un derecho en una resolución judicial, por haberse aplicado inexactamente la ley o por haberse dejado de aplicar la que rige el caso.',
              },
              {
                campo: 'Celda vacía',
                descripcion:
                  'Una celda vacía indica que en el expediente no existe información sobre esa característica o variable. No se trata de una omisión.',
              },
            ],
            name: 'Amparo en Revisión',
            active: false,
          },
          {
            table: [
              {
                campo: 'Tipo de asunto',
                descripcion:
                  'Clasificación del asunto que resuelve la SCJN de acuerdo a sus atribuciones constitucionales',
              },
              {
                campo: 'Número completo del expediente',
                descripcion:
                  'Número de identificación que se asigna a los asuntos que ingresan a la SCJN. Se integra por un número consecutivo y el año de ingreso. En 2007 y 2008 se indica el órgano donde se radicó originalmente el expediente (PL-Pleno, PS- Primera Sala, SS- Segunda Sala)',
              },
              {
                campo: 'Número del expediente',
                descripcion:
                  'Número consecutivo que se asigna al asunto para su identificación',
              },
              {
                campo: 'Año',
                descripcion: 'Año en que ingresa el asunto a la SCJN',
              },
              {
                campo: 'Materia',
                descripcion:
                  'Clasificación conforme a la rama jurídica sobre la que versa el asunto de estudio. Administrativa: Tiene por objeto regular las actividades de la administración pública, su organización y funcionamiento; sus relaciones con los particulares, los servicios públicos y demás actividades estatales. ',
              },
              {
                campo: 'Tema',
                descripcion:
                  'Clasificación conforme al conflicto jurídico del asunto que se desea atraer',
              },
              {
                campo: 'TCC donde se encuentra el asunto',
                descripcion:
                  'Órgano integrante del Poder Judicial de la Federación que conoce de los asunto(s) de los cuales se solicita el ejercicio de facultad de atracción',
              },
              {
                campo: 'Circuito del TCC',
                descripcion:
                  'Número del Circuito de la competencia territorial en materia federal al que pertenece el TCC que conoce de los asuntos que se solicitan atraer.',
              },
              {
                campo: 'Entidad del TCC',
                descripcion:
                  'Demarcación geográfica-política de residencia del Tribunal Colegiado de Circuito de conocimiento',
              },
              {
                campo: 'Nombre del solicitante',
                descripcion:
                  'Nombre completo de quién solicita ante la Suprema Corte de Justicia de la Nación el ejercicio de facultad de atracción. En caso de ser personas físicas se indicará sin incluir el nombre de éstas.',
              },
              {
                campo: 'Carácter del solicitante',
                descripcion:
                  'Clasificación del solicitante que presenta el escrito de solicitud.',
              },
              {
                campo: 'Se celebró sesión privada',
                descripcion:
                  'Reunión del Pleno o Salas de la SCJN, donde se determina si un Ministro o el órgano de la SCJN hace suya la solicitud de ejercicio de facultad de atracción presentada por un solicitante no legitimado',
              },
              {
                campo: 'Órgano de sesión privada',
                descripcion:
                  'Nombre del órgano de la SCJN que celebra la sesión privada: Pleno, Primera Sala o Segunda Sala',
              },
              {
                campo: '¿Un Ministro hace suya la solicitud?',
                descripcion:
                  'Ministro u órgano jurisdiccional (Pleno o Salas) que determinó hacer suya la solicitud de ejercicio de facultad de atracción presentada por un solicitante no legitimado y por lo tanto la presentará de oficio',
              },
              {
                campo: 'Ministro que hace suya la solicitud',
                descripcion:
                  'Ministro u órgano jurisdiccional (Pleno o Salas) que determinó hacer suya la solicitud de ejercicio de facultad de atracción presentada por un solicitante no legitimado',
              },
              {
                campo: 'Fecha de ingreso a la SCJN',
                descripcion: 'Fecha en que la SCJN recibió la solicitud.',
              },
              {
                campo: 'Fecha del acuerdo de radicación',
                descripcion:
                  'Fecha en que el Presidente del Pleno o de una de las Salas emite el acuerdo por el cual se ordena la integración y registro del asunto.',
              },
              {
                campo: 'Fecha del acuerdo inicial',
                descripcion:
                  'Fecha del acuerdo que dicta el Presidente del Pleno o de una de las Salas, en el cual determina la admisión, el desechamiento de la demanda o un requerimiento',
              },
              {
                campo: 'Sentido del acuerdo inicial',
                descripcion:
                  'Indica si el Presidente del Pleno o de una de las Salas determinó: 1) que la solicitud cumple con los requisitos legales para su estudio y, por lo tanto, se admite; 2) que el escrito de solicitud es incompleto, por lo tanto, se requieren datos adicionales del solicitante o del TCC que conoce del asunto que se solicita atraer para determinar la admisión o desechamiento de la solicitud; o 3) que existe un motivo manifiesto e indudable de improcedencia y, por lo tanto, se desecha',
              },
              {
                campo: 'Se cumplió con el requerimiento',
                descripcion:
                  'En caso de que el acuerdo inicial sea un requerimiento, se indica si se dio cumplimiento a este',
              },
              {
                campo: 'Sentido de acuerdo que resuelve el requerimiento',
                descripcion:
                  'Pronunciamiento por el que se determina la admisión o desechamiento de la solicitud una vez que se dio cumplimiento al requerimiento',
              },
              {
                campo: 'Recurso de reclamación',
                descripcion:
                  'Indica si alguna de las partes que interviene en el proceso interpuso un escrito en el que manifiesta su desacuerdo con la decisión de desechamiento o admisión del asunto',
              },
              {
                campo: 'Resolución de la reclamación',
                descripcion:
                  'Pronunciamiento por el que se determina confirmar o revocar el acuerdo de admisión o desechamiento',
              },
              {
                campo: 'Ministro relator',
                descripcion:
                  'Nombre completo del ministro encargado de elaborar el proyecto de resolución para discutir en sesión.',
              },
              {
                campo: 'Etapa de conclusión',
                descripcion:
                  'Etapa del procedimiento en la que concluye el asunto',
              },
              {
                campo: 'Fecha de conclusión',
                descripcion:
                  'Fecha del acuerdo o sentencia que pone fin al asunto',
              },
              {
                campo: 'Sentido resolución',
                descripcion:
                  'Indica, en caso de conclusión por acuerdo, el sentido de éste; en caso de conclusión por sentencia, los puntos resolutivos dictados',
              },
              {
                campo: 'Órgano resolutor de la sentencia ejecutoria',
                descripcion:
                  'Nombre del órgano de la SCJN que dictó la sentencia: Pleno, Primera Sala o Segunda Sala',
              },
              {
                campo: 'Fecha de notificación',
                descripcion:
                  'Fecha en que se da a conocer el acuerdo de conclusión o la sentencia a los interesados',
              },
              {
                campo: 'Ministro ponente',
                descripcion:
                  'Nombre completo del ministro encargado de presentar el proyecto de sentencia para discutir en sesión y, posteriormente, integra las modificaciones acordadas en las sesiones a la sentencia definitiva. Generalmente coincide con el ministro relator.',
              },
              {
                campo: '¿Se resuelve ejercer la facultad de atracción?',
                descripcion:
                  'Indica si se atrae al menos uno de los asuntos solicitados',
              },
              {
                campo: 'Ponderación de dos derechos humanos',
                descripcion:
                  'En caso de que se justifique la atracción con la contraposición de dos derechos humanos, indica cuales son estos',
              },
              {
                campo: 'Interpretación de un derecho humano',
                descripcion:
                  'En caso de que se justifique la atracción con la interpretación de derechos humanos, indica cuales son',
              },
              {
                campo:
                  'Análisis constitucional o convencional de preceptos legales',
                descripcion:
                  'En caso de que se justifique la atracción con el estudio de constitucionalidad y/o convencionalidad de una norma, indica el nombre de la ley, reglamento, acuerdo o norma consideradas y los preceptos',
              },
              {
                campo:
                  'Facultades de atracción relacionadas atraídas previamente',
                descripcion:
                  'En caso de que se justifique la atracción con la existencia de expedientes previamente atraídos de temas relacionados, indica el número de estas SEFA',
              },
              {
                campo: 'Integración o análisis de jurisprudencia',
                descripcion:
                  'En caso de que se justifique la atracción con la emisión y/o modificación de un criterio de interpretación, indica el tema o rubro de esta',
              },
              {
                campo: 'Definición de un criterio procesal',
                descripcion:
                  'En caso de que se justifique la atracción con la aclaración de un trámite procesal, indica el trámite o proceso correspondiente',
              },
              {
                campo: 'Protección a grupos en situación de vulnerabilidad',
                descripcion:
                  'En caso de que se justifique la atracción con la defensa de derechos de grupos en situación de vulnerabilidad, indica a que grupo se refiere',
              },
              {
                campo: '¿Se hace referencia a normas internacionales?',
                descripcion:
                  'Indica si en el asunto se hizo mención a una norma de carácter internacional',
              },
              {
                campo: 'Norma(s) internacional(es) en escrito de solicitud',
                descripcion:
                  'Nombre y preceptos de la(s) norma(s) de carácter internacional(es) que se mencionan en el escrito de solicitud',
              },
              {
                campo: 'Norma(s) internacional(es) en sentencia',
                descripcion:
                  'Nombre y preceptos de la(s) norma(s) de carácter internacional(es) que se mencionan en la sentencia',
              },
              {
                campo: 'Norma(s) internacional(es) en voto separado',
                descripcion:
                  'Nombre y preceptos de la(s) norma(s) de carácter internacional(es) que se mencionan en votos separados (opinión particular de uno o más ministros)',
              },
              {
                campo: 'En caso de voto separado, quien(es) lo emite(n)',
                descripcion:
                  'Nombre completo del ministro(s) que presenta el voto donde se hizo referencia a la(s) norma(s) de carácter internacional',
              },
              {
                campo: '¿Se hace referencia a resoluciones internacionales?',
                descripcion:
                  'Indica si en el asunto se hizo mención a una resolución de carácter internacional o de otros tribunales constitucionales o cortes supremas',
              },
              {
                campo:
                  'Resolución(es) internacional(es) en escrito de solicitud',
                descripcion:
                  'Nombre de la(s) resolución(es) de carácter internacional(es) que se mencionan en el escrito de solicitud',
              },
              {
                campo: 'Resolución(es) internacional(es) en sentencia',
                descripcion:
                  'Nombre de la(s) resolución(es) de carácter internacional(es) que se mencionan en la sentencia',
              },
              {
                campo: 'Resolución(es) internacional(es) en voto separado',
                descripcion:
                  'Nombre de la(s) resolución(es) de carácter internacional(es) que se mencionan en votos separados (opinión particular de uno o más ministros)',
              },
              {
                campo: 'En caso de voto separado, quien(es) lo emite(n)',
                descripcion:
                  'Nombre completo del ministro(s) que presenta el voto donde se hizo referencia a la(s) resolución(es) de carácter internacional',
              },
              {
                campo: '¿Se hace referencia a derechos?',
                descripcion:
                  'Indica si en el asunto se hizo mención a derechos humanos',
              },
              {
                campo: 'Derechos en escrito de solicitud',
                descripcion:
                  'Derecho(s) humanos que se mencionan en el escrito de solicitud',
              },
              {
                campo: 'Derechos en sentencia',
                descripcion:
                  'Derecho(s) humanos que se mencionan en la sentencia',
              },
              {
                campo: 'Derechos en voto separado',
                descripcion:
                  'Derecho(s) humanos que se mencionan en votos separados (opinión particular de uno o más ministros)',
              },
              {
                campo: 'En caso de voto separado, quien(es) lo emite(n)',
                descripcion:
                  'Nombre completo del ministro(s) que presenta el voto donde se hizo referencia a derechos humanos',
              },
              {
                campo: 'Puntos resolutivos',
                descripcion:
                  'Texto íntegro en formato PDF de los puntos resolutivos tal como aparece en la sentencia ejecutoria',
              },
              {
                campo: 'Celda vacía',
                descripcion:
                  'Una celda vacía indica que en el expediente no existe información sobre esa característica o variable. No se trata de una omisión',
              },
            ],
            name: 'Facultad de Atracción',
            active: false,
          },
        ];
        break;

      case 'Ordenamientos':
        this.descripcionEntidad =
          'Es el conjunto de normas que rigen la organización legal de un determinado lugar y época.';
        this.dtEntidad.push({
          campo: 'Identificador',
          descripcion: `Identificador único del ordenamiento.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'País',
          descripcion: `País de origen del ordenamiento.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Titulo ',
          descripcion: `Nombre del ordenamiento.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Resumen',
          descripcion: `Descripción breve del contenido del ordenamiento.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Ámbito',
          descripcion: `Ámbito en el cual el ordenamiento es aplicado.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Vigencia',
          descripcion: `Indica la situación en la que se encuentra el ordenamiento.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Categoría',
          descripcion: `Clasificación que atiende al tipo de ordenamiento.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Materia',
          descripcion: `Clasificación que atiende a la naturaleza del ordenamiento.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Entidad que promulga',
          descripcion: `Entidad que promulga el ordenamiento.`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Entidad federativa',
          descripcion: `En caso de tratarse de un ordenamiento del ámbito ‘Estatal’, estado del país donde aplica el ordenamiento. (Solo aplica para ordenamientos de México)`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Municipio',
          descripcion: `En caso de tratarse de un ordenamiento del ámbito ‘Estatal’ que aplique a un municipio en específico, municipio de la República donde aplica el ordenamiento. (Solo aplica para ordenamientos de México)`,
          ejemplo: '',
          link: 1,
        });
        this.dtEntidad.push({
          campo: 'Reforma ',
          descripcion: `Cambios o modificaciones que sufre el ordenamiento a través de la historia. Se identifican a través de un título, un extracto, una categoría, fecha de publicación y fecha de expedición. Cada reforma conlleva el articulado del ordenamiento en el momento histórico de dicha reforma, así como, los procesos legislativos implicados en la publicación de la reforma y artículos transitorios.`,
          ejemplo: '',
          link: 1,
        });
        break;
    }
  }
}
