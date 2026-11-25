<div align="center">

# 🔎 Auditoría del ciclo de vida del dato

### Matriz de ayuda al auditor de campo

<p><em>Una herramienta para seguir el recorrido del dato desde su obtención hasta su uso en la toma de decisiones públicas.</em></p>

![Estado](https://img.shields.io/badge/Estado-Prototipo-1f6feb?style=for-the-badge)
![Enfoque](https://img.shields.io/badge/Enfoque-Control%204.0-0b7285?style=for-the-badge)
![Etapas](https://img.shields.io/badge/Ciclo-7%20etapas-2f9e44?style=for-the-badge)
![Uso](https://img.shields.io/badge/Uso-Auditor%C3%ADa%20de%20campo-6741d9?style=for-the-badge)

**Autora:** Dra. Giselle San German<br>
**Versión metodológica:** 3.0 · **Documentación:** noviembre de 2026

</div>

---

> ### 💡 Idea central
> **La calidad de una política pública basada en evidencia depende de la calidad de los datos que la sustentan.**
>
> El dato no llega terminado a la decisión pública: se releva, se carga, se valida, se procesa, se transforma en indicadores y finalmente se utiliza para decidir. En cada transformación puede aparecer un riesgo.

## ✦ ¿Qué propone este proyecto?

La propuesta consiste en **auditar no solo el dato final, sino todo su recorrido**.

El proyecto combina dos productos:

| Producto | Función |
|---|---|
| 🧭 **Matriz de ayuda al auditor de campo** | Organiza riesgos, preguntas de verificación, evidencia a solicitar y técnicas sugeridas para cada etapa. |
| 💻 **Prototipo digital** | Analiza archivos CSV o Excel y genera alertas preliminares según la etapa seleccionada por el auditor. |

> **Principio rector:** la tecnología asiste al auditor, pero **no sustituye su juicio profesional**.

---

## 🧩 ¿Cómo funciona el prototipo?

La aplicación fue diseñada como una herramienta de apoyo para una primera lectura de la base entregada por el organismo auditado.

1. **Carga local del archivo** CSV, XLSX o XLS y selección de hoja.
2. **Evaluación general**: cantidad de registros y columnas, vacíos por campo, valores distintos y grupos de filas idénticas. Vista previa de 10 registros.
3. **Preguntas frecuentes**: campos vacíos, filas duplicadas, valores repetidos en una columna y nombres repetidos. Respuestas calculadas sobre toda la hoja, sin IA.
4. **Selección de etapa** para profundizar en pruebas y evidencia adicional.
5. **Descarga** de consultas o análisis por etapa, sin calificar riesgos.

### Preguntas frecuentes y criterios reproducibles

- **Campos vacíos:** valores ausentes o solo espacios. Cero y textos como “N/A” no se consideran vacíos. Se informa cada celda y su registro; no se presupone obligatoriedad.
- **Filas duplicadas:** igualdad de todas las columnas tras recortar espacios exteriores. Se cuentan grupos, registros involucrados y repeticiones adicionales a la primera. No se elimina ningún registro.
- **Valores repetidos:** se elige una columna y se comparan valores no vacíos exactamente. Las categorías repetidas pueden ser legítimas; verificar si existe un criterio de unicidad.
- **Nombres repetidos:** se elige nombre o nombre completo y, opcionalmente, apellido en otra columna. Por defecto la comparación es exacta; la opción de variantes ignora mayúsculas, tildes y espacios repetidos, manteniendo puntuación y orden. Si falta un componente seleccionado, el registro se excluye de esta comparación y se informa el conteo. Coincidencia de nombres no acredita identidad de personas.

Las consultas de repetidos se organizan por el **valor real** de cualquier campo (disposición, ley aplicable, nombre, etc.). Cada grupo muestra su cantidad de registros y los valores del campo de referencia elegido (por ejemplo, expedientes), con su frecuencia y referencias vacías. Se sugiere la columna de expediente por su encabezado, pero se puede elegir otra o ninguna. Cada grupo permite desplegar **todos sus registros y columnas**. Hay navegación de 20 grupos por página; la descarga incluye todos los grupos y el valor repetido en cada registro. Los campos vacíos conservan una vista de hasta 50 resultados. Todas las consultas tienen descarga completa y contexto de archivo, hoja, consulta y fecha. “Registro” es la posición desde 1 en la base cargada, **no la fila física del CSV o Excel**. La descarga protege valores que podrían ejecutarse como fórmulas, agregando un apóstrofo. Cambiar de archivo, hoja o pregunta invalida la respuesta anterior.

Los encabezados vacíos o repetidos reciben nombres únicos y se informa el ajuste, sin sobrescribir columnas. Se omiten filas totalmente vacías. El resumen no constituye un examen exhaustivo de exactitud, cobertura ni cumplimiento; las siete etapas siguen aportando pruebas y preguntas de evidencia.

> 🔐 **Privacidad del análisis:** el archivo se procesa localmente en el navegador. Se ofrece una muestra y vistas de los registros involucrados, únicamente en el navegador. No se utiliza IA ni se envían los archivos a servicios externos.

### Controles automáticos actualmente considerados

- duplicados completos;
- valores faltantes;
- formatos de fecha;
- categorías inconsistentes;
- valores atípicos;
- incompletitud de variables (sin inferir su causa).

Los aspectos que **no pueden inferirse únicamente desde la base** se muestran como **“Requiere evidencia”**. Subregistro, diseño del instrumento, actualización y uso de información en decisiones requieren contraste documental, externo o de campo.

**Observable en el archivo** significa que puede ejecutarse una prueba analítica; no significa riesgo comprobado. **Alerta analítica** indica una señal que debe interpretarse. **Sin señal detectada** solo describe el alcance de la prueba, no acredita ausencia de problemas. **Requiere evidencia** también se utiliza cuando una prueba no cuenta con datos aptos.

---

## 🔄 Las siete etapas del ciclo de vida del dato

~~~mermaid
flowchart LR
    A["1. Obtención"] --> B["2. Registro y carga"]
    B --> C["3. Validación"]
    C --> D["4. Procesamiento"]
    D --> E["5. Indicadores"]
    E --> F["6. Toma de decisiones"]
    F --> G["7. Evaluación y retroalimentación"]
    G -. aprendizaje .-> A
~~~

| Etapa | Pregunta que guía al auditor | Riesgos centrales |
|---|---|---|
| **1. Obtención** | ¿Cómo se genera el dato? | Subregistro, sesgo de cobertura, diseño deficiente |
| **2. Registro y carga** | ¿Cómo ingresa al sistema? | Duplicados, omisiones, errores, formatos inconsistentes |
| **3. Validación** | ¿Qué controles atraviesa? | Falta de controles, duplicados no detectados, criterios no documentados |
| **4. Procesamiento** | ¿Cómo se transforma? | Pérdida de información, categorías arbitrarias, falta de trazabilidad |
| **5. Indicadores** | ¿Qué se construye con esos datos? | Indicadores proxy, metas sin línea de base, falta de ficha técnica |
| **6. Decisión** | ¿Cómo se usa la evidencia? | Uso selectivo, información incompleta, desvinculación con recursos |
| **7. Evaluación** | ¿Lo aprendido modifica el ciclo siguiente? | Falta de retroalimentación, desactualización, errores recurrentes |

---

# 📚 Marco conceptual

### **Dato**
<sub>El registro primario.</sub>

Registro numérico, textual o categórico de un hecho que todavía no ha sido necesariamente procesado, contextualizado o interpretado.

### **Información**
<sub>El dato organizado y dotado de sentido.</sub>

Resultado de clasificar, ordenar o agregar datos para responder preguntas específicas y permitir comparaciones.

### **Indicador**
<sub>Una medida construida para observar una dimensión del problema.</sub>

Supone una definición operacional y, según el caso, numerador, denominador, periodicidad, fuente y umbral de referencia.

### **Evidencia**
<sub>Información validada y suficientemente robusta para fundamentar una decisión.</sub>

Requiere **confiabilidad, pertinencia, trazabilidad y correcta interpretación**.

### **Trazabilidad**
<sub>La posibilidad de reconstruir el camino del dato.</sub>

Permite conocer su origen, las transformaciones que sufrió, los criterios aplicados y los responsables que intervinieron.

---

# 🧭 Matriz de ayuda al auditor de campo

La matriz combina información **predefinida** —que funciona como guía— con campos que el auditor completa durante la fiscalización.

### Columnas predefinidas

- etapa del ciclo de vida del dato;
- riesgo auditable;
- pregunta de verificación;
- documentos o evidencias a solicitar;
- técnica de auditoría sugerida.

### Columnas para completar

- hallazgo detectado;
- evidencia que sustenta el hallazgo;
- calificación del riesgo;
- recomendación;
- seguimiento en próxima auditoría.

> ⚙️ **La matriz no es una lista cerrada.** Puede adaptarse a diferentes políticas públicas, organismos y contextos institucionales.

---

# 🔬 Etapas, riesgos y criterios

<details>
<summary><strong>1️⃣ Etapa 1 — Obtención del dato</strong></summary>

### Concepto
Comprende los procedimientos mediante los cuales el Estado recoge información de la realidad: formularios, relevamientos, registros administrativos, padrones, encuestas, sistemas de trámites o bases abiertas.

### Riesgos potenciales que orientan la revisión
- subregistro;
- sesgo territorial o de cobertura;
- diseño deficiente del instrumento de recolección;
- datos incompletos;
- población objetivo no alcanzada.

### Preguntas posibles
- ¿El instrumento alcanza a toda la población definida?
- ¿Existen zonas o grupos subrepresentados?
- ¿Los campos necesarios están previstos?
- ¿Hay campos obligatorios?
- ¿Existe protocolo de relevamiento?

### Evidencia sugerida
Formularios, protocolos, diseño muestral o censal, informes de cobertura, padrones, instructivos y registros territoriales.

### Técnicas sugeridas
Revisión documental, muestreo, georreferenciación, análisis de cobertura, entrevistas y contraste con fuentes externas.

> **Criterios a definir y justificar en el encargo (no configurables en la interfaz actual):** universo esperado, período, fuentes de contraste y cobertura exigible. Los faltantes de campos no miden subregistro.

</details>

<details>
<summary><strong>2️⃣ Etapa 2 — Registro y carga</strong></summary>

### Concepto
Comprende el ingreso del dato en planillas, sistemas informáticos, bases o expedientes.

### Riesgos potenciales que orientan la revisión
- errores manuales;
- omisión de campos;
- registros duplicados;
- formatos inconsistentes;
- errores de tipeo;
- falta de validaciones automáticas.

### Preguntas posibles
- ¿Existen controles automáticos de carga?
- ¿Hay campos obligatorios?
- ¿El sistema evita duplicados?
- ¿Los operadores tienen instructivos?
- ¿Se controlan formatos de fecha, DNI, CUIT, domicilio u otros campos críticos?

### Evidencia sugerida
Manuales de carga, reglas del sistema, base original, logs, instructivos, perfiles de usuario y protocolos de control.

### Técnicas sugeridas
Pruebas de consistencia, detección de duplicados, análisis de nulos, revisión de formatos y cruces de campos.

> **Criterios a definir y justificar en el encargo (no configurables en la interfaz actual):** umbrales de duplicados, porcentaje de faltantes tolerable, campos críticos y reglas de formato.

</details>

<details>
<summary><strong>3️⃣ Etapa 3 — Validación</strong></summary>

### Concepto
Comprende los controles de consistencia, detección de duplicados, cruces con otras bases y revisión de documentación respaldatoria.

### Riesgos potenciales que orientan la revisión
- ausencia de controles sistemáticos;
- duplicados no detectados;
- criterios de validación no documentados;
- falta de validación cruzada;
- registros inconsistentes.

### Preguntas posibles
- ¿La base se cruza con otras fuentes?
- ¿Se documentan las excepciones?
- ¿Existen reglas de validación?
- ¿Los identificadores deberían ser únicos?
- ¿Se registran los errores detectados?

### Evidencia sugerida
Protocolos de validación, reportes de excepciones, registros de duplicados, bases externas y scripts o reglas.

### Técnicas sugeridas
Cruce de bases, análisis de frecuencias, controles de unicidad, detección de outliers y pruebas de rango y lógica.

> **Criterios a definir y justificar en el encargo (no configurables en la interfaz actual):** identificadores únicos, pertinencia de la prueba de valores atípicos y fuentes externas consideradas válidas.

</details>

<details>
<summary><strong>4️⃣ Etapa 4 — Procesamiento</strong></summary>

### Concepto
Incluye limpieza, clasificación, segmentación, transformación, agregación y construcción de variables.

### Riesgos potenciales que orientan la revisión
- criterios opacos;
- pérdida de información;
- categorías arbitrarias;
- transformaciones no documentadas;
- pérdida de trazabilidad;
- falta de replicabilidad.

### Preguntas posibles
- ¿Los criterios de transformación están documentados?
- ¿Se puede reproducir el procesamiento?
- ¿Se conserva la base original?
- ¿Las categorías son consistentes?
- ¿Existen versiones o bitácoras?

### Evidencia sugerida
Scripts, diccionarios de datos, bitácoras, versiones de bases, manuales de procesamiento y reglas de clasificación.

### Técnicas sugeridas
Comparación entre versiones, revisión de código, reproducción de transformaciones, análisis de categorías y control de trazabilidad.

> **Criterios a definir y justificar en el encargo (no configurables en la interfaz actual):** transformaciones críticas, documentación suficiente, inconsistencias categóricas y requisitos de reversibilidad.

</details>

<details>
<summary><strong>5️⃣ Etapa 5 — Construcción de indicadores</strong></summary>

### Concepto
Comprende la transformación de información en métricas utilizadas para evaluar una política pública.

### Riesgos potenciales que orientan la revisión
- indicadores proxy;
- metas sin línea de base;
- falta de ficha técnica;
- indicadores de actividad presentados como resultados o impacto;
- omisión de indicadores de equidad o impacto;
- metodología de cálculo no documentada.

### Preguntas posibles
- ¿El indicador mide realmente el problema?
- ¿Existe ficha técnica?
- ¿Está definida la fórmula?
- ¿Se conoce numerador y denominador?
- ¿Existe línea de base?
- ¿Permite comparar períodos y territorios?

### Evidencia sugerida
Fichas técnicas, fórmulas, series históricas, metas, líneas de base, informes de gestión y bases fuente.

### Técnicas sugeridas
Recalculación, comparación temporal y territorial, validación metodológica y contraste entre objetivo e indicador.

> **Criterios a definir y justificar en el encargo (no configurables en la interfaz actual):** contenido mínimo de la ficha técnica, diferencia aceptable entre resultado informado y recalculado y definición de indicador proxy.

</details>

<details>
<summary><strong>6️⃣ Etapa 6 — Uso para la toma de decisiones</strong></summary>

### Concepto
Es el momento en que la información se utiliza para asignar recursos, priorizar beneficiarios, rediseñar programas, planificar o comunicar resultados.

### Riesgos potenciales que orientan la revisión
- uso selectivo de evidencia;
- información incompleta;
- presentación exclusiva de resultados favorables;
- desvinculación entre indicadores y decisiones;
- decisiones basadas en información desactualizada.

### Preguntas posibles
- ¿La decisión se apoya en la información disponible?
- ¿Se presentaron todos los indicadores relevantes?
- ¿Se omitieron desvíos?
- ¿Existe relación entre resultados y presupuesto?
- ¿La evidencia utilizada estaba actualizada?

### Evidencia sugerida
Informes de gestión, actas, expedientes, notas presupuestarias, informes técnicos, tableros y decisiones administrativas.

### Técnicas sugeridas
Trazabilidad decisión-evidencia, comparación entre informes y bases, revisión documental, entrevistas y contraste presupuestario.

> **Criterios a definir y justificar en el encargo (no configurables en la interfaz actual):** evidencia suficiente, documentación mínima para justificar una decisión y correspondencia entre resultados y asignación de recursos.

</details>

<details>
<summary><strong>7️⃣ Etapa 7 — Evaluación y retroalimentación</strong></summary>

### Concepto
Incluye el análisis de resultados, la corrección de desvíos y la utilización de lo aprendido para modificar períodos o diseños posteriores.

### Riesgos potenciales que orientan la revisión
- falta de retroalimentación;
- desactualización;
- errores recurrentes no corregidos;
- desconexión entre evaluación y planificación;
- falta de sistematización de lecciones aprendidas.

### Preguntas posibles
- ¿Los resultados modifican la planificación siguiente?
- ¿Se corrigen errores detectados?
- ¿Existe seguimiento de recomendaciones?
- ¿La base se actualiza con periodicidad definida?
- ¿Se documentan las acciones correctivas?

### Evidencia sugerida
Informes de evaluación, planes de mejora, seguimientos, versiones históricas, presupuesto del período siguiente y actas de revisión.

### Técnicas sugeridas
Comparación interanual, seguimiento de recomendaciones, análisis de recurrencia, revisión documental y cruce con planificación posterior.

> **Criterios a definir y justificar en el encargo (no configurables en la interfaz actual):** antigüedad admisible de la información, implementación suficiente de recomendaciones y evidencia de retroalimentación efectiva.

</details>

---

# 🤖 Prototipo digital y componente experimental

El proyecto distingue entre dos niveles de automatización.

## 1. Motor transparente de reglas

El motor implementado en `app.js` ejecuta pruebas descriptivas de filas idénticas, celdas vacías, interpretación de fechas, posibles variantes de categorías y valores atípicos. La tabla conserva las siete etapas y las acciones sugeridas. Los demás aspectos requieren evidencia adicional.

No recibe protocolos, entrevistas, documentación de controles ni objetivos del programa; por eso no evalúa automáticamente su cumplimiento. No asigna Bajo / Medio / Alto, ponderaciones ni una calificación global por etapa. La descarga CSV conserva los estados descriptivos y la advertencia de alcance.

## 2. Machine Learning experimental

Como antecedente experimental del proyecto se describe una prueba de concepto con **Random Forest entrenado sobre datos sintéticos** construidos a partir de reglas de la matriz.

> [!IMPORTANT]
> El modelo experimental **no fue entrenado con auditorías reales**.<br>
> Su desempeño no debe interpretarse como validación empírica ni como estándar para calificar riesgos. El modelo no forma parte del motor de esta app y sus archivos no se incluyen en este repositorio. Los cambios de criterios requerirían revisar las etiquetas sintéticas antes de reutilizarlo.

---

# ⚙️ Criterios y límites de las pruebas

Las reglas exploratorias son decisiones de implementación, **no umbrales AGCBA/INTOSAI**. Se eliminaron los cortes que graduaban faltantes, duplicados, fechas, categorías y outliers, y los plazos universales de 180/365 días. No hay un panel de configuración de criterios en esta versión.

| Prueba | Alcance y límite |
|---|---|
| Filas idénticas | Cuenta todas las filas que pertenecen a grupos repetidos, sobre el total de filas. No prueba duplicación indebida ni unicidad de una clave. |
| Faltantes | Informa el porcentaje máximo por columna, sobre el total de filas. No distingue campos obligatorios, opcionales o no aplicables. |
| Fechas | Infiere columnas por nombre y cuenta valores no vacíos que el lector no interpreta. Puede aceptar fechas ambiguas o normalizadas; no valida el calendario del programa ni actualización. |
| Categorías | Agrupa posibles variantes tras normalizar escritura, solo en columnas de 2 a 100 valores distintos. No confirma equivalencia semántica. |
| Outliers | Regla exploratoria de 1,5 × IQR; mínimo 20 valores numéricos no vacíos, 5 distintos e IQR positivo. Excluye vacíos; no reconoce por sí sola identificadores ni unidades. Si no hay columnas aptas, informa “Requiere evidencia”. |
| Subregistro | Contrastar universo esperado, padrones, cobertura y período. No inferirlo de celdas vacías. |
| Diseño del instrumento | Revisar formularios, objetivos, instructivos y diccionario; nulos o constantes no bastan. |
| Actualización | Confirmar significado de la fecha, corte, período auditado y periodicidad exigible. No usar la fecha máxima como prueba de vigencia. |

El lector CSV admite campos entrecomillados con saltos de línea y comillas escapadas; rechaza comillas sin cerrar y registros con distinta cantidad de campos para evitar análisis sobre una carga truncada. En Excel se analiza únicamente la hoja seleccionada. Verificar la carga y el alcance antes de interpretar los resultados.

## Fundamento metodológico y trazabilidad

- **AGCBA — [Normas Básicas de Auditoría Externa](https://www.agcba.gob.ar/docs/norm_2024-10-07_normas-basicas-de-auditoria-externa.pdf)**, apartados 18 y 32 (criterios), 20–24 (documentación), 36–43 (evidencia y hallazgos): los criterios deben corresponder al objeto y las conclusiones deben sustentarse en evidencia evaluada y documentada.
- **INTOSAI — [ISSAI 100](https://www.issai.org/wp-content/uploads/2019/08/ISSAI-100-Fundamental-Principles-of-Public-Sector-Auditing.pdf)**, párrafos 27 (criterios), 37 (juicio y escepticismo profesional), 43 (documentación), 49–50 (evidencia y evaluación): las pruebas deben interpretarse según el objetivo del encargo y la suficiencia y adecuación de la evidencia.

Esta revisión toma esos principios como orientación metodológica; no declara certificación, aval institucional ni cumplimiento integral de las normas. Ninguna de estas referencias se utiliza como fundamento de porcentajes universales para calificar riesgos.

Antes de formular una observación, registrar en los papeles de trabajo: objetivo y alcance; criterio aplicable y su fuente; archivo, versión, hoja y período; procedimiento y limitaciones; resultado; evidencia de contraste; explicación del organismo; valoración profesional y responsable. Cualquier tolerancia debe justificarse para el encargo, no deducirse de un valor predeterminado de la app.

---

# 🧠 ¿Qué proviene de fuentes y qué es una propuesta propia?

| Tipo | Contenido |
|---|---|
| 📚 **Marco conceptual / fuentes** | Calidad de datos, trazabilidad, evidencia, políticas basadas en evidencia, auditoría de sistemas y rol del control externo |
| 🧭 **Propuesta metodológica** | Organización en siete etapas, riesgos, preguntas, documentos y técnicas sugeridas |
| ⚙️ **Criterio configurable** | Reglas exploratorias de la app y criterios del encargo documentados por el auditor; sin scoring automático |
| 🧪 **Prototipo experimental** | Random Forest, datos sintéticos, recomendaciones automáticas e interfaz digital |

Esta distinción permite modificar los criterios operativos **sin confundirlos con conceptos teóricos o estándares externos**.

---

# 🚦 Regla de uso del prototipo

### La aplicación **no**:

- declara automáticamente un hallazgo definitivo;
- sustituye al auditor;
- reemplaza evidencia suficiente y pertinente;
- convierte una alerta en observación de auditoría por sí sola.

### La aplicación **sí**:

- orienta;
- ayuda a organizar la revisión, sin jerarquizar por gravedad;
- detecta anomalías;
- organiza riesgos;
- sugiere preguntas y controles;
- facilita la trazabilidad y documentación del análisis.

---

# 🗂️ Estructura del repositorio

| Archivo | Función |
|---|---|
| **index.html** | Interfaz principal de la herramienta |
| **app.js** | Lógica de carga, análisis y evaluación |
| **explorer.js** | Resumen general, preguntas frecuentes y descarga de respuestas |
| **styles.css** | Diseño visual |
| **xlsx.full.min.js** | Lectura local de archivos Excel |
| **README.md** | Documentación metodológica y técnica |
| **SheetJS-LICENSE.txt** | Licencia de la biblioteca utilizada |
| **tests/criteria.test.cjs** | Pruebas de regresión de estados, evidencia y exportación; ejecutar con `node --test tests/criteria.test.cjs` |

---

# 📖 Bibliografía y documentación utilizada

<details>
<summary><strong>Ver bibliografía completa</strong></summary>

- AGCBA. *Normas Básicas de Auditoría Externa*. Documento oficial enlazado en el fundamento metodológico.
- INTOSAI. *ISSAI 100 — Fundamental Principles of Public-Sector Auditing*. Documento oficial enlazado en el fundamento metodológico.

- Batini, C., & Scannapieco, M. (2016). *Data and information quality: Dimensions, principles and techniques* (2nd ed.). Springer. https://doi.org/10.1007/978-3-319-24106-7
- Davies, P. (1999). What is evidence-based education? *British Journal of Educational Studies, 47*(2), 108–121. https://doi.org/10.1111/1467-8527.00106
- Davenport, T. H., & Harris, J. G. (2007). *Competing on analytics: The new science of winning*. Harvard Business School Press.
- Filgueiras, F. (2021). Inteligencia artificial y políticas públicas en América Latina y el Caribe. En SELA, *Inteligencia artificial y políticas públicas en ALC*.
- Innerarity, D. (2024). Gobernanza democrática de la inteligencia artificial. En SELA, *Inteligencia artificial y políticas públicas en ALC*.
- Kitchin, R. (2014). *The data revolution: Big data, open data, data infrastructures and their consequences*. SAGE.
- Nutley, S., Walter, I., & Davies, H. T. O. (2007). *Using evidence: How research can inform public services*. Policy Press.
- OCDE. (2024). *Panorama de las administraciones públicas de América Latina y el Caribe 2024*. https://doi.org/10.1787/9789269264986-es
- Pipino, L. L., Lee, Y. W., & Wang, R. Y. (2002). Data quality assessment. *Communications of the ACM, 45*(4), 211–218. https://doi.org/10.1145/505248.506010
- Redman, T. C. (2013). *Data driven: Profiting from your most important business asset*. Harvard Business Review Press.
- Sanderson, I. (2002). Evaluation, policy learning and evidence-based policy making. *Public Administration, 80*(1), 1–22. https://doi.org/10.1111/1467-9299.00283
- Torres, L., Pina, V., & Yetano, A. (2011). *Auditoría de desempeño en el sector público: Una perspectiva comparada*. INAP.
- Wang, R. Y., & Strong, D. M. (1996). Beyond accuracy: What data quality means to data consumers. *Journal of Management Information Systems, 12*(4), 5–33. https://doi.org/10.1080/07421222.1996.11518100
- Yetano, A., & Castillejos, B. I. (2018). Auditorías de desempeño en América Latina: ¿mejorando la confianza en los gobiernos? *Gestión y Política Pública, 27*(2), 407–438. https://doi.org/10.29256/gpp.v27i2.407

</details>

---

# 📝 Control de cambios metodológicos

Cada modificación de criterios debería documentar:

~~~text
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
~~~

### Cambio aplicado — versión 3.0 · 25 de noviembre de 2026

Se agrega evaluación general antes de las etapas y exploración local sin IA de vacíos, filas duplicadas, valores repetidos y nombres. Se documentan reglas, exclusiones y registros involucrados; no hay conclusiones automáticas ni modificación de la base.

### Cambio aplicado — versión 2.0 · 25 de noviembre de 2026

Se sustituyen las calificaciones automáticas por estados descriptivos; se eliminan los cortes de gravedad y la calificación global por etapa; subregistro, diseño, actualización y uso de información en decisiones pasan a revisión con evidencia. Se actualizan interfaz y exportación y se reemplazan las referencias INTOSAI anteriores por ISSAI 100 verificada. Se preservan las siete etapas, carga local y descarga.

### Ejemplo

> **Etapa:** Evaluación y retroalimentación<br>
> **Criterio anterior:** base desactualizada > 365 días<br>
> **Criterio nuevo:** revisión con evidencia sobre fecha de corte y periodicidad exigible<br>
> **Motivo:** no todas las políticas actualizan información con la misma frecuencia<br>
> **Tipo de cambio:** verificación contextual; sin umbral automático

---

<div align="center">

## ✦ Principio final

*Sin trazabilidad, el dato pierde fuerza como evidencia.*<br>
*Sin evidencia confiable, la decisión pública se vuelve más difícil de evaluar.*

**La matriz busca hacer visible ese recorrido y convertirlo en un objeto auditable.**

---

<sub>Proyecto desarrollado por Dra. Giselle San German · Auditoría del ciclo de vida del dato · 2026</sub>

</div>
