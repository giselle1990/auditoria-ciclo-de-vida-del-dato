let rows=[],headers=[],currentStage='',currentResults=[],fileName='';
const $=id=>document.getElementById(id);const empty=v=>v==null||String(v).trim()==='';const norm=v=>String(v??'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
const stages={
obtencion:{title:'1. Obtención del dato',desc:'Comprende la forma en que el organismo releva o recibe la información que luego utilizará en la gestión.',risks:[{name:'Subregistro',check:'Contrastar registros con universo esperado, padrones y cobertura del período. Los faltantes no prueban subregistro.',type:'documental',reco:'Revisar cobertura, obligatoriedad de campos y posibles poblaciones no registradas.'},{name:'Sesgo territorial o de cobertura',check:'Distribución desigual o ausencia de registros en determinadas zonas.',type:'documental',reco:'Contrastar la base con población objetivo, cobertura territorial y fuentes externas.'},{name:'Diseño deficiente del instrumento de recolección',check:'Revisar instrumento, objetivos, diccionario de datos e instructivos; los nulos o constantes no prueban un diseño deficiente.',type:'documental',reco:'Revisar formularios, campos obligatorios e instructivos de relevamiento.'}]},
registro:{title:'2. Registro y carga',desc:'Analiza cómo los datos obtenidos son ingresados en planillas, sistemas o bases de datos.',risks:[{name:'Registros duplicados',check:'Filas idénticas o repetición de registros.',type:'duplicates',reco:'Verificar origen de repeticiones y reglas de unicidad antes de proponer correcciones.'},{name:'Campos faltantes (posibles omisiones a verificar)',check:'Valores faltantes y campos con baja completitud.',type:'missing',reco:'Revisar validaciones de carga, obligatoriedad y capacitación de operadores.'},{name:'Formatos inconsistentes',check:'Fechas o valores con formatos no homogéneos.',type:'dates',reco:'Confirmar formatos esperados y revisar valores no interpretados antes de proponer validaciones.'}]},
validacion:{title:'3. Validación',desc:'Evalúa los controles destinados a detectar errores, duplicados e inconsistencias antes de utilizar la información.',risks:[{name:'Valores atípicos (controles a verificar)',check:'Valores atípicos o inconsistentes que requieren revisión.',type:'outliers',reco:'Solicitar controles existentes y contrastar valores con rangos, unidades y reglas aplicables.'},{name:'Filas repetidas (tratamiento a verificar)',check:'Filas completas idénticas; no se comprueba unicidad de identificadores.',type:'duplicates',reco:'Aplicar validaciones de unicidad y cruces con otras bases.'},{name:'Criterios de validación no documentados',check:'No puede determinarse únicamente desde el archivo.',type:'documental',reco:'Solicitar protocolo, reglas de validación y registros de excepciones.'}]},
procesamiento:{title:'4. Procesamiento',desc:'Examina las transformaciones, clasificaciones, limpiezas y agregaciones aplicadas sobre los datos.',risks:[{name:'Categorías inconsistentes',check:'Variantes de escritura o codificación para una misma categoría.',type:'categories',reco:'Contrastar con el catálogo y documentar equivalencias antes de normalizar categorías.'},{name:'Pérdida de información durante la limpieza',check:'No puede determinarse únicamente desde el archivo final.',type:'documental',reco:'Solicitar scripts, bitácoras y versiones anteriores de la base.'},{name:'Falta de trazabilidad del procesamiento',check:'No puede determinarse únicamente desde el archivo.',type:'documental',reco:'Solicitar documentación de origen, responsables y transformaciones.'}]},
indicadores:{title:'5. Construcción de indicadores',desc:'Evalúa si los indicadores construidos sobre la base representan adecuadamente el problema que la política pretende medir.',risks:[{name:'Indicadores que miden variables proxy',check:'Requiere conocer objetivos, fórmulas y definición del indicador.',type:'documental',reco:'Comparar el indicador con el objetivo de la política.'},{name:'Metas sin línea de base confiable',check:'Requiere documentación metodológica e histórica.',type:'documental',reco:'Solicitar línea de base, serie histórica y metodología de cálculo.'},{name:'Falta de ficha técnica del indicador',check:'No puede comprobarse con el archivo por sí solo.',type:'documental',reco:'Solicitar ficha técnica con definición, fórmula, fuente, periodicidad y responsable.'}]},
decision:{title:'6. Uso para la toma de decisiones',desc:'Examina la forma en que la información y los indicadores son utilizados para fundamentar decisiones de gestión.',risks:[{name:'Uso selectivo de la evidencia',check:'Requiere comparar la base con informes y decisiones de gestión.',type:'documental',reco:'Contrastar resultados completos con la información presentada a los decisores.'},{name:'Decisiones basadas en información incompleta',check:'Contrastar información utilizada, variables relevantes e informes que fundamentan la decisión.',type:'documental',reco:'Evaluar si los faltantes afectan variables relevantes para la decisión.'},{name:'Desvinculación entre resultados y asignación de recursos',check:'Requiere documentación presupuestaria y de planificación.',type:'documental',reco:'Relacionar indicadores de resultados con decisiones presupuestarias.'}]},
evaluacion:{title:'7. Evaluación y retroalimentación',desc:'Analiza si los resultados obtenidos permiten corregir desvíos y mejorar la política pública en períodos posteriores.',risks:[{name:'Información desactualizada',check:'Confirmar significado de las fechas, fecha de corte, período auditado y periodicidad exigible. Una fecha antigua no prueba desactualización.',type:'documental',reco:'Confirmar fecha de corte, periodicidad prevista y mecanismos de actualización.'},{name:'Ausencia de retroalimentación',check:'No puede determinarse únicamente desde el archivo.',type:'documental',reco:'Solicitar evidencia de que los resultados fueron utilizados para corregir o rediseñar la política.'},{name:'Fallas detectadas que no se corrigen',check:'Requiere comparar auditorías o bases de distintos períodos.',type:'documental',reco:'Comparar hallazgos históricos y verificar implementación de medidas correctivas.'}]}
};
function splitLine(line,d){let out=[],cur='',q=false;for(let i=0;i<line.length;i++){let c=line[i];if(c==='"'){if(q&&line[i+1]==='"'){cur+='"';i++}else q=!q}else if(c===d&&!q){out.push(cur);cur=''}else cur+=c}out.push(cur);return out}
let headerNotes=[];
function prepareHeaders(values,width){
 const used=new Set();headerNotes=[];
 return Array.from({length:width},(_,i)=>{
  const original=String(values[i]??'').trim(),base=original||'Columna '+(i+1);
  let name=base,n=2;while(used.has(name))name=base+' ('+(n++)+')';used.add(name);
  if(!original||name!==original)headerNotes.push(`Columna ${i+1}: encabezado ${original?'repetido':'vacío'}; se muestra como “${name}”.`);
  return name;
 });
}
function parseCSV(text){
 text=text.replace(/^\uFEFF/,'');
 const first=text.split(/\r?\n/)[0];
 let delimiter=',',max=0;[',',';','\t','|'].forEach(d=>{const n=splitLine(first,d).length;if(n>max){max=n;delimiter=d}});
 const data=[];let line=[],cell='',quoted=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++}else quoted=!quoted}
  else if(c===delimiter&&!quoted){line.push(cell);cell=''}
  else if((c==='\n'||c==='\r')&&!quoted){line.push(cell);if(line.some(v=>!empty(v)))data.push(line);line=[];cell='';if(c==='\r'&&text[i+1]==='\n')i++}
  else cell+=c;
 }
 if(quoted)throw Error('Hay comillas sin cerrar en el CSV. Revisá el archivo antes de analizarlo.');
 line.push(cell);if(line.some(v=>!empty(v)))data.push(line);
 if(!data.length)throw Error('Archivo vacío');
 const width=data[0].length;
 if(data.some(r=>r.length!==width))throw Error('Hay registros con distinta cantidad de campos. Revisá separadores y encabezados antes de analizar.');
 headers=prepareHeaders(data[0],width);
 rows=data.slice(1).map(values=>{const r=Object.create(null);headers.forEach((h,i)=>r[h]=values[i].trim());return r});
}
let workbook=null,loadVersion=0;
function resetAnalysis(){
 rows=[];headers=[];currentStage='';currentResults=[];headerNotes=[];
 resetExplorer();
 $('stageSelect').value='';
 $('results').classList.add('hidden');
 $('stageSection').classList.add('hidden');
 $('fileInfo').classList.add('hidden');
}
function showLoaded(){
 if(!rows.length)throw Error('La base no contiene registros. Incluí una fila de encabezados y al menos un registro.');
 $('fileInfo').textContent=fileName+(workbook?' · Hoja: '+$('sheetSelect').value:'')+' · '+rows.length+' registros · '+headers.length+' columnas · Base cargada correctamente';
 $('fileInfo').classList.remove('hidden');
 $('stageSection').classList.remove('hidden');
 renderOverview();
}
function loadSheet(name){
 resetAnalysis();
 const data=XLSX.utils.sheet_to_json(workbook.Sheets[name],{header:1,defval:'',raw:true,blankrows:false});
 if(data.length<2)throw Error('La hoja está vacía o no contiene registros. Elegí otra hoja.');
 const width=data.reduce((max,row)=>Math.max(max,row.length),0);
 headers=prepareHeaders(data[0],width);
 rows=data.slice(1).filter(row=>row.some(v=>!empty(v))).map(values=>{
  const row=Object.create(null);
  headers.forEach((h,i)=>{const v=values[i];row[h]=v instanceof Date?String(v.getFullYear())+'-'+String(v.getMonth()+1).padStart(2,'0')+'-'+String(v.getDate()).padStart(2,'0'):String(v??'').trim()});
  return row;
 });
 showLoaded();
}
$('sheetSelect').addEventListener('change',()=>{try{loadSheet($('sheetSelect').value)}catch(err){resetAnalysis();alert(err.message)}});
$('file').addEventListener('change',async e=>{
 const f=e.target.files[0];if(!f)return;
 const version=++loadVersion;
 resetAnalysis();workbook=null;fileName=f.name;
 $('sheetSection').classList.add('hidden');$('sheetSelect').replaceChildren();
 try{
  const extension=f.name.split('.').pop().toLowerCase();
  if(extension==='csv'){
   const text=await f.text();if(version!==loadVersion)return;parseCSV(text);showLoaded();
  }else if(extension==='xlsx'||extension==='xls'){
   if(typeof XLSX==='undefined')throw Error('No se pudo cargar el lector de Excel. Recargá la página.');
   const buffer=await f.arrayBuffer();if(version!==loadVersion)return;
   workbook=XLSX.read(buffer,{type:'array',cellDates:true});
   if(!workbook.SheetNames.length)throw Error('El archivo no contiene hojas.');
   workbook.SheetNames.forEach(name=>{const option=document.createElement('option');option.value=name;option.textContent=name;$('sheetSelect').appendChild(option)});
   $('sheetSection').classList.remove('hidden');
   // Prefer a table over a cover/instruction sheet; keep the selected sheet visible.
   const suggested=workbook.SheetNames.reduce((best,name)=>{
    const first=XLSX.utils.sheet_to_json(workbook.Sheets[name],{header:1,defval:'',blankrows:false})[0]||[];
    const score=first.filter(v=>!empty(v)).length;return score>best.score?{name,score}:best;
   },{name:workbook.SheetNames[0],score:-1}).name;
   $('sheetSelect').value=suggested;loadSheet(suggested);
  }else throw Error('Seleccioná un archivo CSV, XLSX o XLS.');
 }catch(err){if(version!==loadVersion)return;resetAnalysis();alert('No se pudo cargar la base. '+err.message)}
});
function duplicateStats(){const key=r=>JSON.stringify(headers.map(h=>r[h])),m={};rows.forEach(r=>m[key(r)]=(m[key(r)]||0)+1);const count=rows.filter(r=>m[key(r)]>1).length;return{count,pct:count/Math.max(rows.length,1)*100}}
function missingStats(){let maxCol=0,maxName='';headers.forEach(h=>{let n=rows.filter(r=>empty(r[h])).length,p=n/Math.max(rows.length,1)*100;if(p>maxCol){maxCol=p;maxName=h}});return{maxCol,maxName}}
function categoryStats(){let problems=0,examples=[];headers.forEach(h=>{let vals=[...new Set(rows.map(r=>r[h]).filter(v=>!empty(v)))];if(vals.length<2||vals.length>100)return;let g={};vals.forEach(v=>{let k=norm(v);g[k]=g[k]||[];g[k].push(v)});Object.values(g).filter(a=>a.length>1).forEach(a=>{problems++;if(examples.length<3)examples.push(a.join(' / '))})});return{problems,examples}}
function parseDate(v){let s=String(v).trim(),d=new Date(s);if(!isNaN(d))return d;let m=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);if(m){d=new Date(+m[3],+m[2]-1,+m[1]);if(!isNaN(d))return d}return null}
function dateStats(){let dateCols=headers.filter(h=>['fecha','date','alta','baja','actualiz','creacion','modific'].some(k=>norm(h).includes(k))),invalid=0,latest=null,total=0;dateCols.forEach(h=>rows.forEach(r=>{let v=r[h];if(empty(v))return;total++;let d=parseDate(v);if(!d)invalid++;else if(!latest||d>latest)latest=d}));return{dateCols,invalid,total,latest}}
function outlierStats(){let total=0,cols=0,eligible=0;headers.forEach(h=>{let nums=rows.filter(r=>!empty(r[h])).map(r=>Number(String(r[h]).replace(',','.'))).filter(Number.isFinite);if(nums.length<20||new Set(nums).size<5)return;nums.sort((a,b)=>a-b);let q1=q(nums,.25),q3=q(nums,.75),iqr=q3-q1;if(!iqr)return;eligible++;let lo=q1-1.5*iqr,hi=q3+1.5*iqr,c=nums.filter(v=>v<lo||v>hi).length;if(c){total+=c;cols++}});return{total,cols,eligible}}
function q(a,p){let pos=(a.length-1)*p,b=Math.floor(pos),r=pos-b;return a[b+1]!==undefined?a[b]+r*(a[b+1]-a[b]):a[b]}
// These states describe the analytical procedure, never audit severity.
function evaluate(type){
 const evidence=result=>({level:'Requiere evidencia',result});
 const signal=(found,result)=>({level:found?'Alerta analítica':'Sin señal detectada',result});
 if(type==='documental'||type==='structure'||type==='freshness')return evidence('Requiere criterio aplicable y evidencia documental, externa o de campo. El archivo por sí solo no permite concluir.');
 if(!rows.length)return evidence('No hay registros para ejecutar la prueba.');
 if(type==='duplicates'){
  const d=duplicateStats();
  return signal(d.count>0,`${d.count} filas pertenecen a grupos de filas completas idénticas (${d.pct.toFixed(2)}% de ${rows.length}). No implica duplicación indebida: verificar unidad de registro y clave esperada.`);
 }
 if(type==='missing'){
  const m=missingStats();
  return signal(m.maxCol>0,m.maxCol?`Máximo de faltantes: ${m.maxCol.toFixed(2)}% de ${rows.length} filas en “${m.maxName}”. Verificar obligatoriedad y valores no aplicables; no prueba error de carga ni subregistro.`:'No se detectaron celdas vacías. Esto no acredita cobertura, exactitud ni integridad del universo.');
 }
 if(type==='dates'){
  const d=dateStats();
  if(!d.dateCols.length||!d.total)return evidence('No se identificaron columnas de fecha con valores para la prueba. Revisar diccionario y formatos.');
  return signal(d.invalid>0,`${d.invalid} de ${d.total} valores no vacíos no fueron interpretados como fecha (${(d.invalid/d.total*100).toFixed(2)}%). Columnas inferidas por nombre: ${d.dateCols.join(', ')}. El lector puede interpretar fechas ambiguas o normalizarlas; verificar formato y validez con el diccionario.`);
 }
 if(type==='categories'){
  const c=categoryStats();
  return signal(c.problems>0,`${c.problems} grupos de posibles variantes de escritura.${c.examples.length?' Ej.: '+c.examples.join('; '):''} Se revisan columnas con 2 a 100 valores distintos. Confirmar equivalencia con el catálogo antes de unificar; las demás columnas quedan fuera de esta prueba.`);
 }
 if(type==='outliers'){
  const o=outlierStats();
  if(!o.eligible)return evidence('Sin variables aptas para IQR: se requieren al menos 20 valores numéricos no vacíos, 5 distintos e IQR positivo. No se evaluó atipicidad.');
  return signal(o.total>0,`${o.total} valores fuera de Q1 − 1,5 × IQR y Q3 + 1,5 × IQR, en ${o.cols} de ${o.eligible} variables evaluadas. Es una regla exploratoria, no un umbral normativo; un valor atípico no implica error ni ausencia de controles. Confirmar unidades, distribución y significado de cada variable.`);
 }
 return evidence('Prueba no definida. Requiere revisión profesional.');
}
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cls=x=>x==='Alerta analítica'?'level-alert':'level-verify';
$('analyze').addEventListener('click',()=>{currentStage=$('stageSelect').value;if(!currentStage){alert('Seleccioná una etapa.');return}let st=stages[currentStage];currentResults=st.risks.map(r=>({...r,...evaluate(r.type)}));$('results').classList.remove('hidden');$('stageTitle').textContent=st.title;$('stageDescription').textContent=st.desc;$('riskTable').querySelector('tbody').innerHTML=currentResults.map(x=>`<tr><td><strong>${x.name}</strong></td><td>${x.check}</td><td>${escapeHTML(x.result)}</td><td><span class='level ${cls(x.level)}'>${x.level}</span></td><td>${x.reco}</td></tr>`).join('');let ver=currentResults.filter(x=>x.level==='Requiere evidencia').length;$('interpretation').innerHTML=`Se revisaron <strong>${currentResults.length} aspectos</strong>; <strong>${ver}</strong> requieren evidencia adicional o no pudieron evaluarse automáticamente. Una alerta analítica no es un riesgo calificado ni un hallazgo. Sin señal detectada no significa ausencia de problemas. No se calcula una calificación global de etapa. Documentar criterio, fuente, alcance, evidencia y juicio profesional antes de concluir.`;window.scrollTo({top:$('results').offsetTop-15,behavior:'smooth'})});
$('download').addEventListener('click',()=>{let st=stages[currentStage],L=['ALERTAS ANALITICAS POR ETAPA DEL CICLO DE VIDA DEL DATO',`Archivo,"${fileName.replace(/"/g,'""')}"`,`Etapa,"${st.title}"`,`Fecha,"${new Date().toLocaleString('es-AR')}"`,'Alcance,"Alertas exploratorias; no califican riesgos ni constituyen hallazgos. Sin señal no acredita ausencia de problemas. Requiere criterio y evidencia suficiente y adecuada."','','ASPECTO A REVISAR,PRUEBA O EVIDENCIA REQUERIDA,RESULTADO DESCRIPTIVO,ESTADO DE LA REVISION,ACCION SUGERIDA'];currentResults.forEach(x=>L.push([x.name,x.check,x.result,x.level,x.reco].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')));let blob=new Blob(['\uFEFF'+L.join('\n')],{type:'text/csv;charset=utf-8'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=`analisis_${currentStage}.csv`;a.click();URL.revokeObjectURL(u)});
