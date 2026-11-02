DOCUMENTACION OFICIAL DE LA MATRIZ
Matriz de ayuda al auditor de campo para la auditoría del ciclo de vida del dato
Autora: Dra. Giselle San German
Versión: 1.0
Fecha: 02/11/2026


1. FINALIDAD DEL DOCUMENTO


Este archivo reúne, en un único lugar, el marco conceptual, las fuentes utilizadas,
las siete etapas del ciclo de vida del dato, los riesgos actualmente asociados a
cada etapa y los criterios propios de diseño de la matriz y del prototipo digital.

Su objetivo principal es distinguir claramente entre:

A) CONCEPTOS Y FUENTES DE RESPALDO
   Son definiciones, enfoques o referencias provenientes de bibliografía,
   estándares, literatura académica o documentos institucionales.

B) CRITERIOS PROPIOS / EDITABLES
   Son decisiones metodológicas de la autora para operacionalizar la matriz:
   selección de riesgos por etapa, preguntas de verificación, documentos a pedir,
   técnicas sugeridas, umbrales, ponderaciones, reglas de riesgo y criterios de la app.

C) CRITERIOS EXPERIMENTALES
   Son reglas incorporadas al prototipo digital o al modelo de Machine Learning
   con fines demostrativos. No deben presentarse como estándares normativos ni
   como resultados validados con auditorías reales.

Este documento debe actualizarse cada vez que se modifique:
- un riesgo,
- una pregunta de verificación,
- una ponderación,
- un umbral,
- una recomendación automática,
- una etapa,
- una variable del prototipo,
- o una fuente conceptual relevante.


2. IDEA CENTRAL DEL TRABAJO


La calidad de una política pública basada en evidencia depende de la calidad de los
datos que la sustentan.

El dato atraviesa distintas etapas antes de convertirse en información, indicador,
evidencia y fundamento para una decisión pública. Durante ese recorrido puede
degradarse, duplicarse, quedar incompleto, perder trazabilidad, ser procesado con
criterios opacos o ser utilizado de manera parcial.

La propuesta consiste en auditar no solo el dato final, sino todo su recorrido.

Producto central:
- Matriz de ayuda al auditor de campo.

Producto complementario:
- Prototipo digital para análisis preliminar por etapa.

Principio rector:
- La tecnología asiste al auditor, pero no sustituye su juicio profesional.


3. DEFINICIONES CONCEPTUALES UTILIZADAS


DATO
Registro primario de un hecho, numérico, textual o categórico, que todavía no ha
sido necesariamente procesado, contextualizado o interpretado.

INFORMACIÓN
Resultado de organizar, clasificar, ordenar o agregar datos para responder preguntas
específicas y permitir comparaciones.

INDICADOR
Medida construida intencionalmente para evaluar una dimensión específica de un
fenómeno. Supone una definición operacional y, según el caso, numerador,
denominador, periodicidad, fuente y umbral de referencia.

EVIDENCIA
Información validada, contextualizada y suficientemente robusta para fundamentar una
decisión. Requiere confiabilidad, pertinencia, trazabilidad y correcta interpretación.

POLÍTICA PÚBLICA BASADA EN EVIDENCIA
Decisión estatal apoyada de manera explícita en información confiable, relevante,
verificable y obtenida mediante procedimientos sistemáticos y transparentes.

TRAZABILIDAD
Capacidad de reconstruir el origen del dato, las transformaciones que sufrió, los
criterios aplicados y los responsables que intervinieron.

IMPORTANTE:
Estas definiciones integran el marco conceptual del trabajo. No deben confundirse con
los criterios operativos específicos de cada etapa de la matriz.


4. LAS SIETE ETAPAS DEL CICLO DE VIDA DEL DATO


La estructura de siete etapas es el eje metodológico de la propuesta:

1. Obtención del dato
2. Registro y carga
3. Validación
4. Procesamiento
5. Construcción de indicadores
6. Uso para la toma de decisiones
7. Evaluación y retroalimentación

La matriz recorre estas etapas de forma secuencial, aunque en la práctica pueden
existir retrocesos, iteraciones y superposiciones.


5. ETAPA 1 — OBTENCIÓN DEL DATO


CONCEPTO
Comprende los procedimientos mediante los cuales el Estado recoge información de la
realidad: formularios, relevamientos, registros administrativos, padrones, encuestas,
sistemas de trámites o bases abiertas.

RIESGOS ACTUALMENTE UTILIZADOS
- Subregistro.
- Sesgo territorial o de cobertura.
- Diseño deficiente del instrumento de recolección.
- Datos incompletos.
- Población objetivo no alcanzada.

POSIBLES PREGUNTAS DE VERIFICACIÓN
- ¿El instrumento alcanza a toda la población definida?
- ¿Existen zonas o grupos subrepresentados?
- ¿Los campos necesarios están previstos en el formulario?
- ¿Hay campos obligatorios?
- ¿Existe protocolo de relevamiento?

DOCUMENTACIÓN SUGERIDA
- Formularios.
- Protocolos de relevamiento.
- Diseño muestral o censal.
- Informes de cobertura.
- Padrones.
- Instructivos.
- Registros territoriales.

TÉCNICAS SUGERIDAS
- Revisión documental.
- Muestreo.
- Georreferenciación.
- Análisis de cobertura.
- Entrevistas.
- Contraste con fuentes externas.

CRITERIOS PROPIOS / EDITABLES
Los riesgos concretos, el porcentaje a partir del cual se considera "subregistro",
los umbrales de incompletitud y la definición de cobertura suficiente son criterios
que pueden variar según la política auditada.


6. ETAPA 2 — REGISTRO Y CARGA


CONCEPTO
Comprende el ingreso del dato en planillas, sistemas informáticos, bases o expedientes.

RIESGOS ACTUALMENTE UTILIZADOS
- Errores manuales.
- Omisión de campos.
- Registros duplicados.
- Formatos inconsistentes.
- Errores de tipeo.
- Falta de validaciones automáticas.

POSIBLES PREGUNTAS DE VERIFICACIÓN
- ¿Existen controles automáticos de carga?
- ¿Hay campos obligatorios?
- ¿El sistema evita duplicados?
- ¿Los operadores tienen instructivos?
- ¿Se controlan formatos de fecha, DNI, CUIT, domicilio u otros campos críticos?

DOCUMENTACIÓN SUGERIDA
- Manuales de carga.
- Capturas o reglas del sistema.
- Base original.
- Logs.
- Instructivos.
- Perfiles de usuario.
- Protocolos de control.

TÉCNICAS SUGERIDAS
- Pruebas de consistencia.
- Detección de duplicados.
- Análisis de nulos.
- Revisión de formatos.
- Cruces de campos.

CRITERIOS PROPIOS / EDITABLES
- Umbral de duplicados considerado bajo, medio o alto.
- Porcentaje de faltantes tolerable.
- Campos considerados "críticos".
- Reglas de formato.
- Peso asignado a la existencia o ausencia de controles automáticos.


7. ETAPA 3 — VALIDACIÓN


CONCEPTO
Comprende los controles de consistencia, detección de duplicados, cruces con otras
bases y revisión de documentación respaldatoria.

RIESGOS ACTUALMENTE UTILIZADOS
- Ausencia de controles sistemáticos.
- Duplicados no detectados.
- Criterios de validación no documentados.
- Falta de validación cruzada.
- Registros inconsistentes.

POSIBLES PREGUNTAS DE VERIFICACIÓN
- ¿La base se cruza con otras fuentes?
- ¿Se documentan las excepciones?
- ¿Existen reglas de validación?
- ¿Los identificadores deberían ser únicos?
- ¿Se registran los errores detectados?

DOCUMENTACIÓN SUGERIDA
- Protocolos de validación.
- Reportes de excepciones.
- Registros de duplicados.
- Bases externas utilizadas.
- Scripts o reglas de validación.

TÉCNICAS SUGERIDAS
- Cruce de bases.
- Frecuencias.
- Unicidad.
- Detección de outliers.
- Pruebas de rango y lógica.

CRITERIOS PROPIOS / EDITABLES
- Qué se considera un identificador único.
- Qué nivel de outliers genera alerta.
- Qué fuentes externas se consideran válidas.
- Qué controles son obligatorios según el tipo de política.


8. ETAPA 4 — PROCESAMIENTO


CONCEPTO
Incluye limpieza, clasificación, segmentación, transformación, agregación y
construcción de variables.

RIESGOS ACTUALMENTE UTILIZADOS
- Criterios opacos.
- Pérdida de información.
- Categorías arbitrarias.
- Transformaciones no documentadas.
- Pérdida de trazabilidad.
- Falta de replicabilidad.

POSIBLES PREGUNTAS DE VERIFICACIÓN
- ¿Los criterios de transformación están documentados?
- ¿Se puede reproducir el procesamiento?
- ¿Se conserva la base original?
- ¿Las categorías son consistentes?
- ¿Existen versiones o bitácoras?

DOCUMENTACIÓN SUGERIDA
- Scripts.
- Diccionarios de datos.
- Bitácoras.
- Versiones de bases.
- Manuales de procesamiento.
- Reglas de clasificación.

TÉCNICAS SUGERIDAS
- Comparación entre versiones.
- Revisión de código.
- Reproducción de transformaciones.
- Análisis de categorías.
- Control de trazabilidad.

CRITERIOS PROPIOS / EDITABLES
- Qué transformaciones se consideran críticas.
- Qué nivel de documentación es suficiente.
- Qué inconsistencias categóricas ameritan observación.
- Qué requisitos de reversibilidad se exigen.


9. ETAPA 5 — CONSTRUCCIÓN DE INDICADORES


CONCEPTO
Comprende la transformación de información en métricas utilizadas para evaluar una
política pública.

RIESGOS ACTUALMENTE UTILIZADOS
- Indicadores proxy.
- Metas sin línea de base.
- Falta de ficha técnica.
- Indicadores de actividad presentados como resultados o impacto.
- Omisión de indicadores de equidad o impacto.
- Metodología de cálculo no documentada.

POSIBLES PREGUNTAS DE VERIFICACIÓN
- ¿El indicador mide realmente el problema?
- ¿Existe ficha técnica?
- ¿Está definida la fórmula?
- ¿Se conoce numerador y denominador?
- ¿Existe línea de base?
- ¿Permite comparar períodos y territorios?

DOCUMENTACIÓN SUGERIDA
- Ficha técnica.
- Fórmulas.
- Series históricas.
- Metas.
- Línea de base.
- Informes de gestión.
- Bases fuente.

TÉCNICAS SUGERIDAS
- Recalculación.
- Comparación temporal.
- Comparación territorial.
- Validación metodológica.
- Contraste entre objetivo e indicador.

CRITERIOS PROPIOS / EDITABLES
- Qué elementos mínimos debe contener una ficha técnica.
- Qué diferencia se acepta entre resultado informado y recalculado.
- Qué se considera indicador proxy.
- Qué indicadores adicionales exige el auditor.


10. ETAPA 6 — USO PARA LA TOMA DE DECISIONES


CONCEPTO
Es el momento en que la información se utiliza para asignar recursos, priorizar
beneficiarios, rediseñar programas, planificar o comunicar resultados.

RIESGOS ACTUALMENTE UTILIZADOS
- Uso selectivo de evidencia.
- Información incompleta.
- Presentación exclusiva de resultados favorables.
- Desvinculación entre indicadores y decisiones.
- Decisiones basadas en información desactualizada.

POSIBLES PREGUNTAS DE VERIFICACIÓN
- ¿La decisión se apoya en la información disponible?
- ¿Se presentaron todos los indicadores relevantes?
- ¿Se omitieron desvíos?
- ¿Existe relación entre resultados y presupuesto?
- ¿La evidencia utilizada estaba actualizada?

DOCUMENTACIÓN SUGERIDA
- Informes de gestión.
- Actas.
- Expedientes.
- Notas presupuestarias.
- Informes técnicos.
- Tableros.
- Resoluciones o decisiones administrativas.

TÉCNICAS SUGERIDAS
- Trazabilidad decisión-evidencia.
- Comparación entre informes y base.
- Revisión documental.
- Entrevistas.
- Contraste presupuestario.

CRITERIOS PROPIOS / EDITABLES
- Qué se considera evidencia suficiente.
- Qué documentos deben existir para justificar una decisión.
- Qué grado de correspondencia debe existir entre indicadores y asignación de recursos.


11. ETAPA 7 — EVALUACIÓN Y RETROALIMENTACIÓN


CONCEPTO
Incluye el análisis de resultados, corrección de desvíos y utilización de lo aprendido
para modificar períodos o diseños posteriores.

RIESGOS ACTUALMENTE UTILIZADOS
- Falta de retroalimentación.
- Desactualización.
- Errores recurrentes no corregidos.
- Desconexión entre evaluación y planificación.
- Falta de sistematización de lecciones aprendidas.

POSIBLES PREGUNTAS DE VERIFICACIÓN
- ¿Los resultados modifican la planificación siguiente?
- ¿Se corrigen errores detectados?
- ¿Existe seguimiento de recomendaciones?
- ¿La base se actualiza con periodicidad definida?
- ¿Se documentan las acciones correctivas?

DOCUMENTACIÓN SUGERIDA
- Informes de evaluación.
- Planes de mejora.
- Seguimientos.
- Versiones históricas.
- Presupuesto del período siguiente.
- Actas de revisión.

TÉCNICAS SUGERIDAS
- Comparación interanual.
- Seguimiento de recomendaciones.
- Análisis de recurrencia.
- Revisión documental.
- Cruce con planificación posterior.

CRITERIOS PROPIOS / EDITABLES
- Plazo a partir del cual una base se considera desactualizada.
- Qué nivel de implementación de una recomendación se considera suficiente.
- Qué indicadores permiten demostrar retroalimentación efectiva.


12. ESTRUCTURA ACTUAL DE LA MATRIZ


COLUMNAS PREDEFINIDAS
- Etapa del ciclo de vida del dato.
- Riesgo auditable.
- Pregunta de verificación.
- Documentos o evidencias a solicitar.
- Técnica de auditoría sugerida.

COLUMNAS A COMPLETAR POR EL AUDITOR
- Hallazgo detectado.
- Evidencia que sustenta el hallazgo.
- Calificación de riesgo.
- Recomendación.
- Seguimiento en próxima auditoría.

NOTA METODOLÓGICA
La matriz no es una lista cerrada. Puede adaptarse a cada política, organismo o
contexto institucional.


13. PROTOTIPO DIGITAL — CRITERIOS ACTUALES


El prototipo incorpora dos líneas de trabajo:

A) MOTOR TRANSPARENTE DE REGLAS
Utiliza variables definidas por la autora para producir una evaluación preliminar.

Variables utilizadas:
- etapa,
- existencia de protocolo,
- controles automáticos,
- documentación,
- volumen de datos,
- cantidad de sistemas involucrados,
- actualización periódica,
- validación cruzada,
- capacitación de operadores,
- ficha técnica de indicadores,
- circuito de retroalimentación,
- tipo de política.

B) RANDOM FOREST EXPERIMENTAL
Modelo entrenado con datos sintéticos etiquetados según las reglas de la matriz.

IMPORTANTE:
El Random Forest no fue entrenado con auditorías reales.
Su desempeño no debe presentarse como evidencia de validez externa.
Es una prueba de concepto.


14. REGLAS Y PONDERACIONES EXPERIMENTALES


Las ponderaciones actuales son criterios de diseño y pueden modificarse.

Ejemplos:
- Existencia de protocolo: factor protector.
- Controles automáticos: factor protector.
- Validación cruzada: factor protector.
- Más sistemas involucrados: mayor complejidad / riesgo.
- Ausencia de ficha técnica: incremento de riesgo en indicadores.
- Ausencia de retroalimentación: incremento de riesgo en evaluación.

Los umbrales Bajo / Medio / Alto usados por el prototipo NO constituyen un estándar
normativo. Deben considerarse parámetros configurables.

RECOMENDACIÓN:
Mantener estas ponderaciones en un archivo separado (por ejemplo:
criterios_riesgo.json) para poder modificarlas sin cambiar la estructura de la app.


15. CRITERIOS DEL ANÁLISIS AUTOMÁTICO DE BASES


Controles actualmente considerados:
- Duplicados completos.
- Identificador duplicado.
- Valores faltantes.
- Campos críticos incompletos.
- Formatos de fecha.
- Posible desactualización.
- Categorías inconsistentes.
- Columnas sin variabilidad.
- Valores atípicos.
- Posibles problemas de trazabilidad.

TODOS ESTOS CONTROLES SON CONFIGURABLES.

Ejemplos de parámetros que deberían versionarse:
- porcentaje de nulos que activa alerta,
- porcentaje de duplicados,
- cantidad de días para considerar desactualización,
- criterio de outlier,
- campos críticos por tipo de política,
- identificador principal,
- reglas de normalización de categorías.


16. CLASIFICACIÓN DE ORIGEN DE CADA ELEMENTO


[MARCO CONCEPTUAL / FUENTE]
- Diferencia entre dato, información, indicador y evidencia.
- Calidad de datos.
- Trazabilidad.
- Políticas basadas en evidencia.
- Necesidad de control de calidad de datos.
- Auditoría de sistemas y calidad de información.
- Rol del control externo.

[PROPUESTA METODOLÓGICA DE LA AUTORA]
- Organización específica en siete etapas para esta matriz.
- Selección de riesgos por etapa.
- Preguntas de verificación.
- Documentos sugeridos.
- Técnicas sugeridas.
- Estructura operativa de la matriz.
- Aplicación al auditor de campo.

[CRITERIO TÉCNICO CONFIGURABLE]
- Umbrales.
- Scoring.
- Pesos.
- Reglas automáticas.
- Alertas.
- Campos críticos.
- Criterios de clasificación Bajo / Medio / Alto.

[PROTOTIPO EXPERIMENTAL]
- Random Forest.
- Datos sintéticos.
- Recomendaciones automáticas.
- Importancia de variables.
- Interfaz digital.
- Análisis automático de CSV/Excel.


17. BIBLIOGRAFÍA Y DOCUMENTACIÓN UTILIZADA


Batini, C., & Scannapieco, M. (2016).
Data and information quality: Dimensions, principles and techniques (2nd ed.).
Springer.
https://doi.org/10.1007/978-3-319-24106-7

Davies, P. (1999).
What is evidence-based education?
British Journal of Educational Studies, 47(2), 108–121.
https://doi.org/10.1111/1467-8527.00106

Davenport, T. H., & Harris, J. G. (2007).
Competing on analytics: The new science of winning.
Harvard Business School Press.

Filgueiras, F. (2021).
Inteligencia artificial y políticas públicas en América Latina y el Caribe.
En Sistema Económico Latinoamericano y del Caribe (SELA),
Inteligencia artificial y políticas públicas en ALC.

Innerarity, D. (2024).
Gobernanza democrática de la inteligencia artificial.
En Sistema Económico Latinoamericano y del Caribe (SELA),
Inteligencia artificial y políticas públicas en ALC.

INTOSAI. (2010).
ISSAI 5300: Guidelines for internal control standards for the public sector.

INTOSAI. (2013).
ISSAI 5510: Audit of information systems.

INTOSAI. (2019).
ISSAI 5420: Guidelines on auditing data quality.

Kitchin, R. (2014).
The data revolution: Big data, open data, data infrastructures and their consequences.
SAGE Publications.

Nutley, S., Walter, I., & Davies, H. T. O. (2007).
Using evidence: How research can inform public services.
Policy Press.

Organización para la Cooperación y el Desarrollo Económicos. (2024).
Panorama de las administraciones públicas de América Latina y el Caribe 2024.
OCDE.
https://doi.org/10.1787/9789269264986-es

Pipino, L. L., Lee, Y. W., & Wang, R. Y. (2002).
Data quality assessment.
Communications of the ACM, 45(4), 211–218.
https://doi.org/10.1145/505248.506010

Redman, T. C. (2013).
Data driven: Profiting from your most important business asset.
Harvard Business Review Press.

Sanderson, I. (2002).
Evaluation, policy learning and evidence-based policy making.
Public Administration, 80(1), 1–22.
https://doi.org/10.1111/1467-9299.00283

Torres, L., Pina, V., & Yetano, A. (2011).
Auditoría de desempeño en el sector público: Una perspectiva comparada.
Instituto Nacional de Administración Pública.

Wang, R. Y., & Strong, D. M. (1996).
Beyond accuracy: What data quality means to data consumers.
Journal of Management Information Systems, 12(4), 5–33.
https://doi.org/10.1080/07421222.1996.11518100

Yetano, A., & Castillejos, B. I. (2018).
Auditorías de desempeño en América Latina: ¿mejorando la confianza en los gobiernos?
Gestión y Política Pública, 27(2), 407–438.
https://doi.org/10.29256/gpp.v27i2.407


18. ARCHIVOS DE TRABAJO Y PROTOTIPOS UTILIZADOS


- Trabajo final:
  "Hacia una matriz de ayuda al auditor de campo para la auditoría del ciclo de vida
  del dato en políticas públicas basadas en evidencia."

- Matriz operativa / anexo Excel.

- Script experimental:
  modelo_auditoria_datos.py

- Metadatos:
  metadatos_modelo.json

- Modelo:
  árbol de decisión / Random Forest experimental.

- Prototipos:
  Gradio.
  Aplicación web HTML/CSS/JavaScript.

- Funcionalidad experimental:
  carga de CSV o Excel,
  selección de etapa,
  análisis preliminar,
  detección de alertas,
  clasificación orientativa de riesgo.


19. REGLA DE USO DEL PROTOTIPO


La aplicación:
- NO declara automáticamente un hallazgo definitivo.
- NO sustituye al auditor.
- NO reemplaza evidencia suficiente y pertinente.
- NO transforma una alerta en observación de auditoría por sí sola.

La aplicación:
- orienta,
- prioriza,
- detecta anomalías,
- organiza riesgos,
- sugiere preguntas y controles,
- facilita trazabilidad y documentación.


20. CONTROL DE CAMBIOS


Usar esta sección cada vez que se modifique un criterio.

VERSIÓN:
FECHA:
AUTORA / RESPONSABLE:

ETAPA MODIFICADA:
CRITERIO ANTERIOR:
CRITERIO NUEVO:
MOTIVO DEL CAMBIO:
FUENTE / FUNDAMENTO:
IMPACTO EN LA MATRIZ:
IMPACTO EN LA APP:
¿REQUIERE REENTRENAR MODELO?:
OBSERVACIONES:

------------------------------------------------------------

Ejemplo:

VERSIÓN: 1.1
FECHA: __/__/____
ETAPA MODIFICADA: Evaluación y retroalimentación
CRITERIO ANTERIOR: base desactualizada > 365 días
CRITERIO NUEVO: umbral configurable según periodicidad del programa
MOTIVO: no todas las políticas actualizan información con la misma frecuencia
TIPO DE CAMBIO: criterio propio / parametrización


21. PRINCIPIO FINAL


Los conceptos generales de calidad, trazabilidad, evidencia y control tienen respaldo
conceptual y bibliográfico.

La forma concreta de operacionalizarlos en:
- riesgos,
- preguntas,
- umbrales,
- ponderaciones,
- colores,
- alertas,
- reglas automáticas,

forma parte de la propuesta metodológica y técnica de la autora y debe mantenerse
como un sistema abierto, versionable y adaptable al objeto de auditoría.

