/*Genérame un cuestionario de selección múltiple con 20 preguntas cada una con cinco opciones, con relación a poner aquí el tema dentro del documento, separando las preguntas de las respuestas, en formato de diccionario de javascript , así diccionario = { "pregunta": "texto del la pregunta", "respuesta": A, "opciones": {"A. texto opción A", "B. texto opción B", "C. texto opción C", "D. texto opción D", "E. texto opción E" } }
instrucciones para gemini
créame un formulario html/javascript que me permita interactuar sobre las siguientes preguntas seleccionando aleatoriamente de una en una*/

const preguntas = [
  {
    "pregunta": "Según el Programa de Mitigación de Riesgos en la Contratación (PMRC), ¿cuál es el objetivo principal de este programa?",
    "respuesta": "C",
    "opciones": {
      "A": "Establecer la normativa fiscal para la expedición de pólizas.",
      "B": "Asegurar que EMCALI solo contrate con compañías aseguradoras internacionales.",
      "C": "Establecer los lineamientos de EMCALI para que los interesados, participantes, proponentes y contratistas hagan parte del PMRC, y definir un modelo de administración de riesgos [1].",
      "D": "Limitar las cuantías de contratación a valores inferiores a 500 SMMLV.",
      "E": "Delegar la totalidad de la gestión contractual al Corredor de Seguros."
    }
  },
  {
    "pregunta": "¿Cuántas etapas de gestión contractual define EMCALI?",
    "respuesta": "D",
    "opciones": {
      "A": "Dos: Planeación y Ejecución Contractual.",
      "B": "Tres: Precontractual, Contractual y Liquidación.",
      "C": "Cinco: Planeación, Evaluación, Adjudicación, Ejecución y Postcontractual.",
      "D": "Cuatro: Pre-Contractual de Planeación, Pre-Contractual de Selección del Contratista, Contractual y Post-Contractual [2].",
      "E": "Seis: Planeación, Oferta, Adjudicación, Suscripción, Ejecución y Liquidación."
    }
  },
  {
    "pregunta": "En la etapa Pre-Contractual de Planeación, ¿cuál es la fase central que define la necesidad de adquisición de bienes, obras o servicios?",
    "respuesta": "B",
    "opciones": {
      "A": "La Adjudicación del Contratista.",
      "B": "El establecimiento de todas las condiciones para el abastecimiento [2].",
      "C": "La suscripción del contrato.",
      "D": "El cierre del contrato.",
      "E": "La activación de las garantías Postcontractuales."
    }
  },
  {
    "pregunta": "La Garantía de Seriedad de la Oferta debe estar vigente desde la presentación de la oferta hasta la aprobación de la garantía de Cumplimiento del contrato o aceptación de la oferta. ¿Cuál es la vigencia mínima requerida en días para este tipo de garantía, si no se establece presupuesto oficial en el proceso?",
    "respuesta": "C",
    "opciones": {
      "A": "30 días hábiles.",
      "B": "60 días calendario.",
      "C": "90 días calendario, contados a partir de la fecha de presentación y recepción de las propuestas o su equivalente [3].",
      "D": "120 días calendario.",
      "E": "6 meses más del plazo del contrato."
    }
  },
  {
    "pregunta": "¿Cuál es el valor mínimo de la Garantía de Cumplimiento del contrato para procesos con valores entre 1 y 1000 SMMLV?",
    "respuesta": "A",
    "opciones": {
      "A": "No será inferior al 10% del valor del contrato [4].",
      "B": "No será inferior al 15% del valor del contrato.",
      "C": "Debe ser el 20% del valor total del contrato.",
      "D": "Será el 5% del valor asegurado.",
      "E": "Será igual al 100% del valor del contrato."
    }
  },
  {
    "pregunta": "¿Cuál debe ser la vigencia mínima de la Garantía de Cumplimiento del contrato, adicional al plazo contractual?",
    "respuesta": "D",
    "opciones": {
      "A": "Dos (2) meses más.",
      "B": "Un (1) año más.",
      "C": "Doce (12) meses más.",
      "D": "Seis (6) meses más [4].",
      "E": "Tres (3) años más."
    }
  },
  {
    "pregunta": "Si un contrato es superior a 1000 SMMLV, ¿cuál es el valor mínimo de la Garantía de Cumplimiento?",
    "respuesta": "E",
    "opciones": {
      "A": "No será inferior al 10% del valor del contrato.",
      "B": "100% del valor asegurado.",
      "C": "Será el valor determinado por el Corredor de Seguros.",
      "D": "No será inferior al 5% del valor del contrato.",
      "E": "No será inferior al 15% del valor del contrato [4]."
    }
  },
  {
    "pregunta": "La Garantía de Buen Manejo y Correcta Inversión del Anticipo debe garantizar el 100% del monto pagado o entregado como anticipo. ¿Cuál es su vigencia mínima requerida?",
    "respuesta": "C",
    "opciones": {
      "A": "Igual al plazo contractual más tres (3) años.",
      "B": "Un (1) año contado a partir de la fecha de acta de terminación.",
      "C": "Igual a la del plazo contractual y seis (6) meses más [4].",
      "D": "No superior a dos (2) años.",
      "E": "Hasta la liquidación del contrato sin término adicional."
    }
  },
  {
    "pregunta": "¿Cuál es la vigencia de la Garantía de Pago Anticipado?",
    "respuesta": "A",
    "opciones": {
      "A": "Debe tener una vigencia mínima igual a la del plazo contractual y seis (6) meses más [4].",
      "B": "Hasta la fecha de terminación del contrato.",
      "C": "Hasta que el supervisor verifique el cumplimiento total del objeto.",
      "D": "Un (1) año más del plazo contractual.",
      "E": "Tres (3) años más de la liquidación."
    }
  },
  {
    "pregunta": "¿Cuál es el valor mínimo de la Garantía de Pago de Salarios, Prestaciones Sociales Legales e Indemnizaciones Laborales?",
    "respuesta": "D",
    "opciones": {
      "A": "15% del valor del contrato.",
      "B": "100% del valor del contrato.",
      "C": "5% del valor del contrato.",
      "D": "No será inferior al 10% del valor del contrato [5].",
      "E": "El valor del contrato sin excepción."
    }
  },
  {
    "pregunta": "¿Cuál es la vigencia mínima de la Garantía de Estabilidad y Calidad de la Obra?",
    "respuesta": "A",
    "opciones": {
      "A": "Un término no inferior a cinco (5) años contados a partir de la fecha en la cual EMCALI reciba a satisfacción la obra [5].",
      "B": "Tres (3) años contados a partir de la firma del contrato.",
      "C": "Igual al plazo contractual más dos (2) años.",
      "D": "Un (1) año contado a partir del pago final.",
      "E": "Seis (6) meses después de la liquidación."
    }
  },
  {
    "pregunta": "¿Cuál es el valor mínimo de la Garantía de Calidad del Servicio o de Provisión de Repuestos?",
    "respuesta": "E",
    "opciones": {
      "A": "No inferior al 10% del valor del contrato.",
      "B": "20% del valor del contrato.",
      "C": "El 100% del valor asegurado.",
      "D": "El valor del contrato si se aplica.",
      "E": "No será inferior al 15% del valor del contrato [5]."
    }
  },
  {
    "pregunta": "Para contratos entre 200 SMMLV y 1.500 SMMLV, ¿cuál es el valor asegurado que cubre la Responsabilidad Civil Extracontractual?",
    "respuesta": "B",
    "opciones": {
      "A": "Doscientos (200) SMMLV [6].",
      "B": "Superior a 200 SMMLV e inferior o igual a 1.500 SMMLV [6].",
      "C": "Superior a 1.500 SMMLV e inferior o igual a 2.500 SMMLV.",
      "D": "Quimientos (500) SMMLV.",
      "E": "Diez mil (10.000) SMMLV."
    }
  },
  {
    "pregunta": "Para la verificación de las pólizas expedidas, ¿quién debe verificar el nombre claro de la persona natural que toma la póliza, si no se señala que la sociedad se denomina de esa manera?",
    "respuesta": "D",
    "opciones": {
      "A": "El Gerente de Área de Abastecimiento Empresarial.",
      "B": "El Proponente o Contratista.",
      "C": "La Compañía Aseguradora.",
      "D": "El tomador de la Póliza si es una persona Natural [7].",
      "E": "El Corredor de Seguros."
    }
  },
  {
    "pregunta": "Según el PMRC, ¿cuál es la entidad responsable de manejar el proceso de ejecución, seguimiento y control del programa de corredores de seguros?",
    "respuesta": "C",
    "opciones": {
      "A": "La Gerencia General.",
      "B": "La Superintendencia Financiera.",
      "C": "El manejo de todo el proceso de ejecución, seguimiento y control del PMRC estará a cargo del corredor de seguros de EMCALI EICE E.S.P. [8].",
      "D": "El Área de Gestión de la Calidad.",
      "E": "El contratista o proponente."
    }
  },
  {
    "pregunta": "¿Cuál de los siguientes no es un factor a mitigar asociado a riesgos en la gestión contractual según el PMRC?",
    "respuesta": "C",
    "opciones": {
      "A": "Factores asociados al cumplimiento de pólizas por las compañías aseguradoras [9].",
      "B": "Factores asociados a la originalidad, legalidad y completitud de las garantías [9].",
      "C": "Factores asociados a la revisión de la documentación precontractual por el Área Jurídica [9].",
      "D": "Factores asociados a manejo y control de siniestros [9].",
      "E": "Factores asociados a la solicitud e indicación de garantías a solicitar en la etapa precontractual de planeación [2]."
    }
  },
  {
    "pregunta": "Para la expedición y modificación de pólizas, ¿en qué etapa debe el contratista solicitar la póliza o modificaciones a la compañía aseguradora?",
    "respuesta": "B",
    "opciones": {
      "A": "Etapa Precontractual de Planeación.",
      "B": "Etapa Contractual y Postcontractual [10].",
      "C": "Etapa de Liquidación.",
      "D": "Etapa de Oferta.",
      "E": "Etapa de Supervisión."
    }
  },
  {
    "pregunta": "Si un contrato es por prestación de servicios profesionales y/o apoyo a la entidad con personas naturales, y el valor excede los 100 SMMLV, ¿se exigirá garantía de cumplimiento?",
    "respuesta": "A",
    "opciones": {
      "A": "Sí, se exigirá garantía de cumplimiento y deberá incorporarse en la Ficha de Requerimiento y en el contrato [4].",
      "B": "No, por ser de servicios profesionales no es necesario.",
      "C": "Solo si la persona es jurídica.",
      "D": "Solo se requiere póliza de seriedad de la oferta.",
      "E": "Depende de lo que determine el Gerente General."
    }
  },
  {
    "pregunta": "¿Qué tipo de garantía es obligatoria para todos los procesos de adquisición de bienes, obras y servicios a través del programa de mitigación de riesgos?",
    "respuesta": "D",
    "opciones": {
      "A": "Póliza de Calidad del Servicio.",
      "B": "Póliza de Buen uso de los materiales.",
      "C": "Póliza de Responsabilidad Civil Extracontractual.",
      "D": "Póliza de Seriedad de la oferta y/o propuesta [11].",
      "E": "Póliza de Estabilidad de la Obra."
    }
  },
  {
    "pregunta": "Los requerimientos derivados de un Acuerdo Comercial o Contrato Marco, ¿deberán ser liquidados?",
    "respuesta": "C",
    "opciones": {
      "A": "No, porque no son contratos formales.",
      "B": "Sí, pero únicamente si el valor supera los 50 SMMLV.",
      "C": "Sí, dicha liquidación surtirá en el documento de liquidación del Acuerdo Comercial o Contrato Marco [12, 13].",
      "D": "Solo si se solicitan garantías para su ejecución.",
      "E": "Solo si hay incumplimiento."
    }
  },
  {
    "pregunta": "Según el Anexo No 1 del PMRC, ¿cuál es el plazo de respuesta (Horas/días hábiles) para la emisión de pólizas por la Compañía Aseguradora?",
    "respuesta": "B",
    "opciones": {
      "A": "2 a 4 horas.",
      "B": "De 4 a 12 horas [14].",
      "C": "12 a 24 horas.",
      "D": "24 a 48 horas.",
      "E": "No se especifica un plazo."
    }
  },
  {
    "pregunta": "Según la Norma Complementaria, ¿quién tiene delegada la función de ordenar el gasto y adelantar los procesos de Invitación Pública cuya cuantía sea inferior a 500 SMMLV?",
    "respuesta": "E",
    "opciones": {
      "A": "El Gerente General.",
      "B": "El Secretario General.",
      "C": "El Director Jurídico.",
      "D": "El Supervisor o Interventor.",
      "E": "El Gerente de Área de Abastecimiento Empresarial [15]."
    }
  },
  {
    "pregunta": "En el caso de Invitaciones Públicas cuya cuantía sea igual o superior a 500 SMMLV, ¿quién tiene delegada la función de adjudicar, seleccionar y suscribir el contrato o aceptación de la oferta?",
    "respuesta": "A",
    "opciones": {
      "A": "El Gerente General [16].",
      "B": "El Gerente de Área de Abastecimiento Empresarial.",
      "C": "El Director Financiero.",
      "D": "El Secretario General.",
      "E": "La Junta Directiva."
    }
  },
  {
    "pregunta": "¿Qué es la 'Invitación Pública que derive en una Lista de Precalificados'?",
    "respuesta": "C",
    "opciones": {
      "A": "Es un proceso que obliga a EMCALI a adjudicar un contrato.",
      "B": "Es un proceso que requiere siempre de presupuesto disponible.",
      "C": "No es una solicitud de propuestas u ofertas, sino una invitación a formar parte del listado de preseleccionados [12, 13].",
      "D": "Es una modalidad de selección directa sin competencia.",
      "E": "Se utiliza solo para la adquisición de bienes de uso común."
    }
  },
  {
    "pregunta": "¿Cuál es la vigencia máxima de los Acuerdos Comerciales o Contratos Marco?",
    "respuesta": "D",
    "opciones": {
      "A": "Diez (10) años.",
      "B": "Un (1) año, sin posibilidad de prórroga.",
      "C": "Vigencia indeterminada.",
      "D": "Máxima de dos (2) años, prorrogables hasta por dos (2) años, siempre y cuando en cada prórroga se justifique su conveniencia [17, 18].",
      "E": "Cinco (5) años fijos."
    }
  },
  {
    "pregunta": "¿En qué etapa contractual se lleva a cabo la activación de las garantías Postcontractuales?",
    "respuesta": "B",
    "opciones": {
      "A": "Etapa Pre-Contractual de Planeación.",
      "B": "Etapa Post-Contractual [2].",
      "C": "Etapa Contractual.",
      "D": "Etapa de Adjudicación.",
      "E": "Etapa de Supervisión."
    }
  },
  {
    "pregunta": "En caso de que el valor del contrato o aceptación de la oferta se pacte en moneda extranjera, ¿qué tasa se utilizará para convertir el valor a pesos colombianos a efectos de determinar la cuantía a pagar?",
    "respuesta": "A",
    "opciones": {
      "A": "La Tasa Representativa del Mercado (TRM) certificada por la Superintendencia Financiera [19, 20].",
      "B": "El promedio del dólar americano durante el último año.",
      "C": "La tasa interna de EMCALI.",
      "D": "La Tasa de Cambio que emita la Gerencia de Área Financiera.",
      "E": "El precio pactado libremente entre las partes."
    }
  },
  {
    "pregunta": "¿Cuál de los siguientes NO es un tipo de póliza de garantía que se emitirá obligatoriamente a través del PMRC para la adquisición de bienes, obras y servicios?",
    "respuesta": "E",
    "opciones": {
      "A": "Póliza de Seriedad de la oferta y/o propuesta [11].",
      "B": "Póliza de cumplimiento del contrato [11].",
      "C": "Póliza de estabilidad y calidad de la obra [11].",
      "D": "Póliza de devolución del pago anticipado [11].",
      "E": "Póliza de Fiel Cumplimiento de las Obligaciones Fiscales."
    }
  },
  {
    "pregunta": "Según el Reglamento de Contratación, ¿qué se entiende por 'Acuerdo Comercial'?",
    "respuesta": "B",
    "opciones": {
      "A": "Un contrato de ejecución sucesiva con cuantía definida.",
      "B": "Un negocio jurídico de cuantía indeterminada, derivado de una Invitación Pública, cuya eventual ejecución se realiza a través de Aceptación de Oferta [21, 22].",
      "C": "Un contrato que se celebra solo para obras públicas.",
      "D": "Un tipo de garantía bancaria.",
      "E": "La reforma de una o varias condiciones contractuales."
    }
  },
  {
    "pregunta": "¿Cuál es la función del Formulario de Planeación de Abastecimiento?",
    "respuesta": "A",
    "opciones": {
      "A": "Constituirá un formulario de Planeación de Abastecimiento como soporte para la realización de las Invitaciones o Condiciones de Contratación [23].",
      "B": "Define exclusivamente la modalidad de Invitación Privada.",
      "C": "Es el documento que formaliza el contrato Marco.",
      "D": "Contiene los informes de supervisión y control.",
      "E": "Se utiliza únicamente para justificar la necesidad del contrato de adhesión."
    }
  },
  {
    "pregunta": "En el Formulario de Planeación de Abastecimiento, ¿cuál de los siguientes elementos es obligatorio incluir si aplica?",
    "respuesta": "D",
    "opciones": {
      "A": "Actas de pago.",
      "B": "Actas de liquidación.",
      "C": "Lecciones aprendidas de contratos anteriores.",
      "D": "Garantías [23].",
      "E": "Evaluación del Desempeño del Supervisor."
    }
  },
  {
    "pregunta": "La Invitación Privada es la modalidad de selección que permite contratar con una persona natural o jurídica, o un consorcio. ¿En qué caso se puede contratar profesionales cuando se demanden conocimientos especializados?",
    "respuesta": "A",
    "opciones": {
      "A": "Cuando demanden conocimientos especializados se podrá contratar con personas naturales y/o jurídicas [24].",
      "B": "Solo si la cuantía es inferior a 200 SMMLV.",
      "C": "Solo para el literal g) del artículo 26.",
      "D": "Únicamente si se presenta una única oferta en la Invitación Pública.",
      "E": "Cuando exista Registro de Proveedores para el servicio."
    }
  },
  {
    "pregunta": "Si EMCALI realiza una Invitación Privada, y la cuantía es inferior a 2.000 SMMLV (literal g del Art 26), ¿cuántas cotizaciones como mínimo debe invitar a garantizar?",
    "respuesta": "B",
    "opciones": {
      "A": "Una (1) cotización.",
      "B": "Tres (3) cotizaciones y en ningún caso podrá invitarse al mismo proveedor en más de dos (2) ocasiones por anualidad [25].",
      "C": "Cinco (5) cotizaciones.",
      "D": "Diez (10) cotizaciones.",
      "E": "No requiere cotizaciones."
    }
  },
  {
    "pregunta": "¿Qué es la 'Interventoría' según el Manual de Contratación?",
    "respuesta": "C",
    "opciones": {
      "A": "Actividad de la etapa Precontractual de Planeación.",
      "B": "El seguimiento técnico, administrativo, financiero, contable y jurídico por servidores públicos.",
      "C": "Seguimiento técnico que cubre el cumplimiento del contrato, realizado por una persona natural o jurídica contratada para tal fin [26].",
      "D": "La función delegada al Gerente de Área de Abastecimiento.",
      "E": "La liquidación del contrato."
    }
  },
  {
    "pregunta": "¿Qué se requiere para el Perfeccionamiento y Ejecución del Contrato, en general, según el Manual de Contratación?",
    "respuesta": "D",
    "opciones": {
      "A": "Solo se requiere la firma del contratista.",
      "B": "La suscripción de un Acta de Inicio y el desembolso del anticipo.",
      "C": "La aprobación de la liquidación del contrato.",
      "D": "Se requiere que se eleve a escrito y la aprobación de la(s) garantía(s) que deberá(n) estar debidamente pagada(s) por el contratista [27].",
      "E": "La inscripción en el Registro de Proveedores."
    }
  },
  {
    "pregunta": "En la liquidación de los contratos, ¿cuál es el plazo máximo que tienen las partes para intentar liquidar de común acuerdo después de la terminación del contrato?",
    "respuesta": "E",
    "opciones": {
      "A": "Dos (2) meses.",
      "B": "Noventa (90) días.",
      "C": "Un (1) año.",
      "D": "Tres (3) meses.",
      "E": "Seis (6) meses siguientes a la terminación del contrato [28]."
    }
  },
  {
    "pregunta": "En los procesos de Invitación Pública, ¿qué órgano se encargará de evaluar y calificar las ofertas presentadas dentro de las modalidades de selección cuya cuantía sea igual o superior a 500 SMMLV?",
    "respuesta": "A",
    "opciones": {
      "A": "El Comité Único Asesor y de Evaluación y Calificación de Ofertas [29].",
      "B": "La Gerencia de Área de Abastecimiento Empresarial.",
      "C": "El Gerente General.",
      "D": "El Supervisor o Interventor.",
      "E": "La Dirección Jurídica."
    }
  },
  {
    "pregunta": "Según la normativa de EMCALI, ¿qué régimen jurídico es aplicable a los contratos que celebre la E.I.C.E. E.S.P.?",
    "respuesta": "C",
    "opciones": {
      "A": "Régimen de Contratación Estatal (Ley 80 de 1993) en todos los casos.",
      "B": "Exclusivamente el derecho privado.",
      "C": "El régimen jurídico aplicable es el de derecho privado [30, 31].",
      "D": "Una mezcla de derecho público y privado según el objeto.",
      "E": "Régimen de Contratación Especial Exceptuada, sin excepciones."
    }
  },
  {
    "pregunta": "Una de las funciones de la Vigilancia Contractual del Supervisor/Interventor es cooperar con EMCALI y el contratista. ¿Cuál es un objetivo clave en esta cooperación?",
    "respuesta": "D",
    "opciones": {
      "A": "Ejercer funciones sancionatorias directas.",
      "B": "Tomar decisiones operativas en lugar del contratista.",
      "C": "Asumir la responsabilidad fiscal por daños.",
      "D": "Propender porque no se generen conflictos entre las partes, y adoptar medidas tendientes a solucionar eventuales controversias [32].",
      "E": "Autorizar cambios en la duración del contrato sin consulta previa."
    }
  },
  {
    "pregunta": "¿Cuál de los siguientes no es un requisito de idoneidad que se verificará en el Registro de Proveedores de EMCALI?",
    "respuesta": "E",
    "opciones": {
      "A": "Información jurídica [33].",
      "B": "Información financiera [33].",
      "C": "Información técnica [33].",
      "D": "Información comercial [33].",
      "E": "Historial de cumplimiento en otras entidades públicas."
    }
  },
  {
    "pregunta": "Si un contrato se celebró por un valor superior a 5.000 SMMLV, ¿qué documento se utilizará para su protocolización en la Etapa Contractual?",
    "respuesta": "A",
    "opciones": {
      "A": "Minuta Contractual (para procesos de Invitación Pública e Invitación Privada cuya cuantía sea igual o superior a 5000 SMLMV) [27].",
      "B": "Minuta Contrato Marco.",
      "C": "Minuta Acuerdo Comercial.",
      "D": "Minuta General.",
      "E": "Orden de Compra."
    }
  },
  {
    "pregunta": "¿Qué ocurre si un proponente seleccionado no suscribe el Contrato Tradicional, Acuerdo Comercial o Contrato Marco dentro del plazo establecido en una Invitación Pública?",
    "respuesta": "B",
    "opciones": {
      "A": "EMCALI procederá a la liquidación del proceso.",
      "B": "EMCALI realizará todas las gestiones necesarias para hacer efectiva la garantía de seriedad de la oferta [34, 35].",
      "C": "El proponente será sancionado penalmente.",
      "D": "Se le asignará automáticamente el contrato.",
      "E": "Se invitará a un nuevo proponente sin aplicar sanciones."
    }
  },
  {
    "pregunta": "¿Cuál es la responsabilidad principal del Gerente de Área de Abastecimiento Empresarial en los procesos de Invitación Pública en cuantías iguales o superiores a 500 SMMLV?",
    "respuesta": "A",
    "opciones": {
      "A": "Preparar y revisar todos los documentos necesarios, incluyendo el Formulario de Planeación de Abastecimiento [16].",
      "B": "Suscribir el contrato y el acta de liquidación.",
      "C": "Determinar la pertinencia de la Invitación Privada.",
      "D": "Ejercer las funciones delegadas al Secretario General.",
      "E": "Realizar la evaluación de la gestión del contratista."
    }
  },
  {
    "pregunta": "Según la Ley 1474 de 2011, ¿cuál es el término de inhabilidad para el supervisor o interventor que omita el deber de informar a la entidad sobre circunstancias que puedan constituir actos de corrupción o que pongan en riesgo el cumplimiento del contrato?",
    "respuesta": "C",
    "opciones": {
      "A": "Diez (10) años.",
      "B": "Dos (2) años.",
      "C": "Cinco (5) años [36].",
      "D": "Un (1) año.",
      "E": "Tres (3) años."
    }
  },
  {
    "pregunta": "¿Qué se debe anexar obligatoriamente al Formulario de Planeación de Abastecimiento, en los casos que aplique?",
    "respuesta": "D",
    "opciones": {
      "A": "Actas de Inspección y Recibo Final.",
      "B": "Definición de Interventoría.",
      "C": "Registro de Proveedores.",
      "D": "Matriz de riesgos, Impacto tributario y Concepto de garantías [37].",
      "E": "Declaraciones Juramentadas."
    }
  },
  {
    "pregunta": "¿Cuál es el propósito de la Consulta de Mercado en la etapa precontractual de planeación?",
    "respuesta": "B",
    "opciones": {
      "A": "Exclusivamente para fijar el presupuesto.",
      "B": "Analizar el proceso de contratación con el objetivo de conocer las características, especificaciones técnicas y tendencias del mercado [38].",
      "C": "Determinar si el contratista se encuentra inscrito en el Registro de Proveedores.",
      "D": "Realizar la liquidación anticipada de las ofertas.",
      "E": "Definir la capacidad residual del contratista."
    }
  },
  {
    "pregunta": "¿Cuál es la sanción, en términos de evaluación de gestión, si el contratista suministra información que no es veraz en la evaluación de gestión por parte del supervisor?",
    "respuesta": "A",
    "opciones": {
      "A": "Será considerada como falta grave, y se le aplicará la legislación correspondiente [39].",
      "B": "Una disminución del 5% en la calificación.",
      "C": "No tendrá ninguna consecuencia, solo se debe verificar la información.",
      "D": "La repetición del proceso contractual.",
      "E": "La suspensión temporal del contrato."
    }
  },
  {
    "pregunta": "En la evaluación de gestión del contratista para Bienes y Servicios/Obras, ¿cuál es el factor que tiene el mayor puntaje asignado (45 o 40 puntos, respectivamente)?",
    "respuesta": "C",
    "opciones": {
      "A": "Aspectos Administrativos.",
      "B": "Cumplimiento en el plazo de entrega.",
      "C": "Calidad del bien, servicio u obra [40-42].",
      "D": "Responsabilidad Social Empresarial.",
      "E": "Sistema de Gestión de Seguridad y Salud en el Trabajo."
    }
  },
  {
    "pregunta": "Según la reglamentación, si se requiere realizar una adición, modificación y/o prórroga a un contrato, ¿quién debe elaborar y proyectar la solicitud a la Gerencia de Área de Abastecimiento Empresarial?",
    "respuesta": "B",
    "opciones": {
      "A": "El Gerente General.",
      "B": "El Supervisor y/o Interventor del contrato [43].",
      "C": "El contratista directamente.",
      "D": "La Dirección Jurídica.",
      "E": "El Corredor de Seguros."
    }
  },
  {
    "pregunta": "En la función de Vigilancia Legal, ¿cuál de los siguientes es un deber del Supervisor/Interventor ante un posible siniestro?",
    "respuesta": "D",
    "opciones": {
      "A": "Iniciar el proceso de liquidación unilateral.",
      "B": "Exigir nuevas garantías sin consultar a la aseguradora.",
      "C": "Realizar el pago directo del siniestro.",
      "D": "En caso de configurarse la existencia de un siniestro el supervisor deberá dar aviso oportuno a la aseguradora [44].",
      "E": "Suspender inmediatamente el contrato sin justificación."
    }
  },
  {
    "pregunta": "Para la Contratación por Emergencia, la declaración la hace el representante legal de la Entidad u ordenador del gasto, de manera conjunta con ¿quién?",
    "respuesta": "C",
    "opciones": {
      "A": "El Director Jurídico.",
      "B": "El Secretario General.",
      "C": "El Gerente de Unidad de Negocio o Área [45].",
      "D": "El Supervisor o Interventor designado.",
      "E": "El Tesorero General."
    }
  },
  {
    "pregunta": "¿Qué es la 'Capacidad Residual'?",
    "respuesta": "A",
    "opciones": {
      "A": "Aptitud de un oferente para cumplir oportuna y cabalmente con el objeto de un contrato de obra, sin que sus otros compromisos contractuales afecten la capacidad de cumplir con el contrato que está en proceso de selección [46].",
      "B": "Capacidad máxima de contratación que tiene un contratista.",
      "C": "Capacidad para pagar las pólizas de garantía.",
      "D": "El valor del contrato menos el anticipo.",
      "E": "La diferencia entre el presupuesto oficial y el valor de la oferta."
    }
  },
  {
    "pregunta": "Según la Vigilancia Financiera y Contable, ¿qué documento debe verificar el supervisor/interventor para iniciar la ejecución del contrato?",
    "respuesta": "E",
    "opciones": {
      "A": "Póliza de Seriedad de la Oferta.",
      "B": "Acta de Inicio.",
      "C": "Informe de Gestión.",
      "D": "Registro de Proveedores.",
      "E": "Documentos recibidos para iniciar la ejecución del contrato (CDP, Contrato, Registro Presupuestal, aprobación de garantías, etc.) [47]."
    }
  }
];
