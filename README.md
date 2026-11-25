<div align="center">

# 🔎 Auditoría del ciclo de vida del dato

### Matriz de ayuda al auditor de campo

<p><em>Una herramienta para seguir el recorrido del dato desde su obtención hasta su uso en la toma de decisiones públicas.</em></p>

![Estado](https://img.shields.io/badge/Estado-Prototipo-1f6feb?style=for-the-badge)
![Enfoque](https://img.shields.io/badge/Enfoque-Control%204.0-0b7285?style=for-the-badge)
![Etapas](https://img.shields.io/badge/Ciclo-7%20etapas-2f9e44?style=for-the-badge)
![Uso](https://img.shields.io/badge/Uso-Auditor%C3%ADa%20de%20campo-6741d9?style=for-the-badge)

**Autora:** Dra. Giselle San German  
**Versión metodológica:** 1.0 · **Documentación:** noviembre de 2026

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

1. **Carga local del archivo** CSV, XLSX o XLS.
2. **Selección de una etapa** del ciclo de vida del dato.
3. **Análisis automático** de aspectos observables en la base.
4. **Identificación de riesgos** que requieren revisión documental o de campo.
5. **Clasificación preliminar** del riesgo.
6. **Sugerencia de una acción de auditoría**.
7. **Descarga del análisis** generado.

> 🔐 **Privacidad del análisis:** el archivo se procesa localmente en el navegador. La base no se muestra en pantalla.

### Controles automáticos actualmente considerados

- duplicados completos;
- valores faltantes;
- formatos de fecha;
- posibles problemas de actualización;
- categorías inconsistentes;
- valores atípicos;
- estructura e incompletitud de variables.

Los riesgos que **no pueden inferirse únicamente desde la base** se muestran como **“Verificar”** y requieren revisión documental o trabajo de campo.

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

### Riesgos actualmente utilizados
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

> **Criterios editables:** definición de subregistro, umbrales de incompletitud y cobertura suficiente.

</details>

<details>
<summary><strong>2️⃣ Etapa 2 — Registro y carga</strong></summary>

### Concepto
Comprende el ingreso del dato en planillas, sistemas informáticos, bases o expedientes.

### Riesgos actualmente utilizados
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

> **Criterios editables:** umbrales de duplicados, porcentaje de faltantes tolerable, campos críticos y reglas de formato.

</details>

<details>
<summary><strong>3️⃣ Etapa 3 — Validación</strong></summary>

### Concepto
Comprende los controles de consistencia, detección de duplicados, cruces con otras bases y revisión de documentación respaldatoria.

### Riesgos actualmente utilizados
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

> **Criterios editables:** identificadores únicos, nivel de outliers que genera alerta y fuentes externas consideradas válidas.

</details>

<details>
<summary><strong>4️⃣ Etapa 4 — Procesamiento</strong></summary>

### Concepto
Incluye limpieza, clasificación, segmentación, transformación, agregación y construcción de variables.

### Riesgos actualmente utilizados
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

> **Criterios editables:** transformaciones críticas, documentación suficiente, inconsistencias categóricas y requisitos de reversibilidad.

</details>

<details>
<summary><strong>5️⃣ Etapa 5 — Construcción de indicadores</strong></summary>

### Concepto
Comprende la transformación de información en métricas utilizadas para evaluar una política pública.

### Riesgos actualmente utilizados
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

> **Criterios editables:** contenido mínimo de la ficha técnica, diferencia aceptable entre resultado informado y recalculado y definición de indicador proxy.

</details>

<details>
<summary><strong>6️⃣ Etapa 6 — Uso para la toma de decisiones</strong></summary>

### Concepto
Es el momento en que la información se utiliza para asignar recursos, priorizar beneficiarios, rediseñar programas, planificar o comunicar resultados.

### Riesgos actualmente utilizados
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

> **Criterios editables:** evidencia suficiente, documentación mínima para justificar una decisión y correspondencia entre resultados y asignación de recursos.

</details>

<details>
<summary><strong>7️⃣ Etapa 7 — Evaluación y retroalimentación</strong></summary>

### Concepto
Incluye el análisis de resultados, la corrección de desvíos y la utilización de lo aprendido para modificar períodos o diseños posteriores.

### Riesgos actualmente utilizados
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

> **Criterios editables:** antigüedad admisible de la información, implementación suficiente de recomendaciones y evidencia de retroalimentación efectiva.

</details>

---

# 🤖 Prototipo digital y componente experimental

El proyecto distingue entre dos niveles de automatización.

## 1. Motor transparente de reglas

Utiliza variables definidas para producir una evaluación preliminar:

- etapa;
- existencia de protocolo;
- controles automáticos;
- documentación;
- volumen de datos;
- cantidad de sistemas involucrados;
- actualización periódica;
- validación cruzada;
- capacitación de operadores;
- ficha técnica de indicadores;
- circuito de retroalimentación;
- tipo de política.

## 2. Machine Learning experimental

Se desarrolló además una prueba de concepto con **Random Forest entrenado sobre datos sintéticos** construidos a partir de reglas de la matriz.

> [!IMPORTANT]
> El modelo experimental **no fue entrenado con auditorías reales**.  
> Su desempeño no debe interpretarse como validación empírica ni como estándar para calificar riesgos.

---

# ⚙️ Parámetros configurables

Los umbrales y ponderaciones son **criterios de diseño**, no estándares universales.

Ejemplos:

| Parámetro | Uso |
|---|---|
| % de valores faltantes | Activar alertas de incompletitud |
| % de duplicados | Graduar riesgo de registro |
| antigüedad de fechas | Analizar posible desactualización |
| criterio de outlier | Detectar valores atípicos |
| campos críticos | Adaptar controles al objeto auditado |
| reglas de categorías | Normalizar codificaciones |
| Bajo / Medio / Alto | Clasificación orientativa |

La recomendación metodológica es mantener estos criterios **versionados y modificables**, de modo que puedan adaptarse al tipo de política y al contexto de auditoría.

---

# 🧠 ¿Qué proviene de fuentes y qué es una propuesta propia?

| Tipo | Contenido |
|---|---|
| 📚 **Marco conceptual / fuentes** | Calidad de datos, trazabilidad, evidencia, políticas basadas en evidencia, auditoría de sistemas y rol del control externo |
| 🧭 **Propuesta metodológica** | Organización en siete etapas, riesgos, preguntas, documentos y técnicas sugeridas |
| ⚙️ **Criterio configurable** | Umbrales, scoring, pesos, alertas, campos críticos y clasificación de riesgo |
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
- prioriza;
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
| **styles.css** | Diseño visual |
| **xlsx.full.min.js** | Lectura local de archivos Excel |
| **README.md** | Documentación metodológica y técnica |
| **SheetJS-LICENSE.txt** | Licencia de la biblioteca utilizada |

---

# 📖 Bibliografía y documentación utilizada

<details>
<summary><strong>Ver bibliografía completa</strong></summary>

- Batini, C., & Scannapieco, M. (2016). *Data and information quality: Dimensions, principles and techniques* (2nd ed.). Springer. https://doi.org/10.1007/978-3-319-24106-7
- Davies, P. (1999). What is evidence-based education? *British Journal of Educational Studies, 47*(2), 108–121. https://doi.org/10.1111/1467-8527.00106
- Davenport, T. H., & Harris, J. G. (2007). *Competing on analytics: The new science of winning*. Harvard Business School Press.
- Filgueiras, F. (2021). Inteligencia artificial y políticas públicas en América Latina y el Caribe. En SELA, *Inteligencia artificial y políticas públicas en ALC*.
- Innerarity, D. (2024). Gobernanza democrática de la inteligencia artificial. En SELA, *Inteligencia artificial y políticas públicas en ALC*.
- INTOSAI. (2010). *ISSAI 5300: Guidelines for internal control standards for the public sector*.
- INTOSAI. (2013). *ISSAI 5510: Audit of information systems*.
- INTOSAI. (2019). *ISSAI 5420: Guidelines on auditing data quality*.
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

### Ejemplo

> **Etapa:** Evaluación y retroalimentación  
> **Criterio anterior:** base desactualizada > 365 días  
> **Criterio nuevo:** umbral configurable según periodicidad del programa  
> **Motivo:** no todas las políticas actualizan información con la misma frecuencia  
> **Tipo de cambio:** criterio propio / parametrización

---

<div align="center">

## ✦ Principio final

*Sin trazabilidad, el dato pierde fuerza como evidencia.*  
*Sin evidencia confiable, la decisión pública se vuelve más difícil de evaluar.*

**La matriz busca hacer visible ese recorrido y convertirlo en un objeto auditable.**

---

<sub>Proyecto desarrollado por Dra. Giselle San German · Auditoría del ciclo de vida del dato · 2026</sub>

</div>
