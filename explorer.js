// Local, deterministic questions. Record numbers refer to the loaded data, not worksheet rows.
let faqResult=null,faqPage=0;
const nameKey=v=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').trim().replace(/\s+/g,' ');
function groupedRecords(keyFor){
 const groups=new Map();
 rows.forEach((row,i)=>{const key=keyFor(row);if(key===null)return;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(i)});
 return [...groups.values()].filter(indices=>indices.length>1);
}
function generalProfile(){
 const columns=headers.map(h=>({name:h,missing:rows.filter(r=>empty(r[h])).length,distinct:new Set(rows.map(r=>r[h]).filter(v=>!empty(v))).size}));
 const groups=groupedRecords(r=>JSON.stringify(headers.map(h=>r[h])));
 return {columns,emptyCells:columns.reduce((n,c)=>n+c.missing,0),affected:rows.filter(r=>headers.some(h=>empty(r[h]))).length,groups,duplicateRows:groups.reduce((n,g)=>n+g.length,0),extraRows:groups.reduce((n,g)=>n+g.length-1,0)};
}
function htmlTable(columns,data){
 return '<table><thead><tr>'+columns.map(c=>'<th>'+escapeHTML(c)+'</th>').join('')+'</tr></thead><tbody>'+data.map(r=>'<tr>'+r.map(v=>'<td>'+escapeHTML(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
}
function resetExplorer(){
 faqResult=null;
 ['overviewSection','explorerSection','faqAnswer'].forEach(id=>$(id).classList.add('hidden'));
 ['overviewStats','columnSummary','dataPreview','faqTable'].forEach(id=>$(id).innerHTML='');
}
function options(allLabel){return (allLabel?'<option value="">'+allLabel+'</option>':'')+headers.map((h,i)=>`<option value="${i}">${escapeHTML(h)}</option>`).join('')}
function renderOverview(){
 const p=generalProfile();
 $('overviewStats').innerHTML=[['Registros',rows.length],['Columnas',headers.length],['Celdas vacías',p.emptyCells],['Registros con vacíos',p.affected],['Filas en grupos idénticos',p.duplicateRows]].map(([label,value])=>`<div class="metric"><strong>${value}</strong><span>${label}</span></div>`).join('');
 $('loadNotes').textContent=`${p.groups.length} grupos de filas idénticas; ${p.extraRows} repeticiones adicionales a la primera de cada grupo. `+(headerNotes.length?headerNotes.join(' '):'No se ajustaron encabezados.')+' Se omiten filas totalmente vacías y se recortan espacios al inicio y final de cada celda. Los números de registro empiezan en 1 y corresponden a la base cargada, no a las filas físicas del archivo.';
 $('columnSummary').innerHTML=htmlTable(['Campo','Vacíos','% de registros','Valores distintos no vacíos'],p.columns.map(c=>[c.name,c.missing,(c.missing/rows.length*100).toFixed(2)+'%',c.distinct]));
 $('dataPreview').innerHTML=htmlTable(['Registro',...headers],rows.slice(0,10).map((r,i)=>[i+1,...headers.map(h=>r[h])]));
 $('faqColumn').innerHTML=options('Todos los campos');$('faqName').innerHTML=options('Elegir campo de nombre');$('faqSurname').innerHTML=options('Sin otra columna');
 $('faqContext').innerHTML=options('Sin campo de referencia');
 const inferred=headers.findIndex(h=>/expediente|^expte|^exp$/.test(norm(h)));$('faqContext').value=inferred<0?'':String(inferred);
 $('faqColumn').value='';$('faqName').value='';$('faqSurname').value='';$('normalizeNames').checked=false;
 $('faqQuestion').value='missing';configureQuestion();
 $('overviewSection').classList.remove('hidden');$('explorerSection').classList.remove('hidden');
}
function configureQuestion(){
 const type=$('faqQuestion').value;
 $('faqColumnWrap').classList.toggle('hidden',type==='rows'||type==='names');
 $('faqNamesWrap').classList.toggle('hidden',type!=='names');
 $('faqContextWrap').classList.toggle('hidden',type==='missing');
 invalidateAnswer();
}
function invalidateAnswer(){faqResult=null;faqPage=0;$('faqAnswer').classList.add('hidden')}
function columnFrom(value){if(value===''||!/^\d+$/.test(value)||Number(value)>=headers.length)return null;return headers[Number(value)]}
function answerQuestion(type,columnValue,nameValue,surnameValue,normalize){
 const column=columnFrom(columnValue),name=columnFrom(nameValue),surname=columnFrom(surnameValue);
 if(type==='missing'){
  const fields=column?[column]:headers,data=[];
  rows.forEach((r,i)=>fields.forEach(h=>{if(empty(r[h]))data.push([i+1,h,...headers.map(k=>r[k])])}));
  return {title:column?`Campos vacíos: ${column}`:'Campos vacíos: todos los campos',columns:['Registro','Campo vacío',...headers],data,explanation:`${data.length} celdas vacías en ${new Set(data.map(r=>r[0])).size} de ${rows.length} registros. Se consideran vacíos los valores ausentes o solo espacios; 0, “N/A” y “null” escritos no se cuentan como vacíos. Confirmar obligatoriedad antes de concluir que hay una omisión.`};
 }
 let groups,explanation,title,groupFields=[];
 if(type==='rows'){
  groupFields=headers;groups=groupedRecords(r=>JSON.stringify(headers.map(h=>r[h])));title='Filas completas duplicadas';
  explanation='Se comparan todas las columnas después de recortar espacios exteriores. Se muestran todos los integrantes de cada grupo, incluida la primera fila. Confirmar la unidad de registro antes de considerar una repetición indebida.';
 }else if(type==='values'){
  if(!column)throw Error('Elegí el campo cuyos valores querés comparar.');
  groupFields=[column];groups=groupedRecords(r=>empty(r[column])?null:String(r[column]));title=`Valores repetidos: ${column}`;
  explanation='Coincidencia exacta del valor cargado, sin vacíos. Una categoría puede repetirse legítimamente; solo hay desvío de unicidad si existe un criterio que la exija.';
 }else if(type==='names'){
  if(!name)throw Error('Elegí la columna de nombre o nombre completo.');
  if(name===surname)throw Error('Elegí columnas diferentes para nombre y apellido.');
  const fields=surname?[name,surname]:[name];groupFields=fields;
  groups=groupedRecords(r=>fields.some(h=>empty(r[h]))?null:JSON.stringify(fields.map(h=>normalize?nameKey(r[h]):r[h])));
  title=`Nombres repetidos: ${fields.join(' + ')} (${normalize?'variantes agrupadas':'coincidencia exacta'})`;
  const incomplete=rows.filter(r=>fields.some(h=>empty(r[h]))).length;
  explanation=(normalize?'Se ignoran mayúsculas, tildes y espacios repetidos; se conservan puntuación y orden de palabras. ':'Se comparan nombres exactamente como fueron cargados. ')+`${incomplete} registros con nombre o apellido requerido vacío quedan fuera de la comparación. Nombres iguales pueden pertenecer a personas distintas: contrastar con un identificador y evidencia. No se fusionan ni eliminan registros.`;
 }else throw Error('Pregunta no disponible.');
 const count=groups.reduce((n,g)=>n+g.length,0),extra=count-groups.length;
 const grouped=groups.map(indices=>({indices,label:[...new Set(indices.map(i=>groupFields.map(h=>String(rows[i][h])).join(' · ')))].join(' / ')}));
 return {title,groups:grouped,columns:['Valor repetido','Registro',...headers],data:grouped.flatMap(group=>group.indices.map(i=>[group.label,i+1,...headers.map(h=>rows[i][h])])),explanation:`${groups.length} grupos; ${count} registros involucrados; ${extra} repeticiones adicionales a la primera de cada grupo. ${explanation}`};
}
$('faqQuestion').addEventListener('change',configureQuestion);
['faqColumn','faqName','faqSurname','normalizeNames','faqContext'].forEach(id=>$(id).addEventListener('change',invalidateAnswer));
$('askFaq').addEventListener('click',()=>{
 try{
  if(!rows.length)return;
  faqResult=answerQuestion($('faqQuestion').value,$('faqColumn').value,$('faqName').value,$('faqSurname').value,$('normalizeNames').checked);
  $('faqExplanation').textContent=faqResult.explanation;
  faqResult.context=columnFrom($('faqContext').value);faqPage=0;renderAnswer();$('faqAnswer').classList.remove('hidden');
 }catch(err){invalidateAnswer();alert(err.message)}
});
function groupContext(group,field){
 if(!field)return null;
 const values=new Map();let missing=0;
 group.indices.forEach(i=>{const v=rows[i][field];if(empty(v)){missing++;return}values.set(v,(values.get(v)||0)+1)});
 return {values:[...values],missing};
}
function renderAnswer(){
 if(!faqResult)return;
 const result=faqResult;
 if(!result.groups){
  $('faqLimit').textContent=`${result.title}. Se muestran ${Math.min(50,result.data.length)} de ${result.data.length} resultados. La descarga incluye la respuesta completa. Registro = posición en la base cargada, desde 1.`;
  $('faqTable').innerHTML=htmlTable(result.columns,result.data.slice(0,50));$('faqPagination').classList.add('hidden');return;
 }
 const total=result.groups.length,start=faqPage*20,shown=result.groups.slice(start,start+20);
 $('faqLimit').textContent=total?`${result.title}. Grupos ${start+1} a ${start+shown.length} de ${total}. Abrí cada valor para ver todos sus registros y columnas. La descarga incluye todos los grupos. Registro = posición en la base cargada, desde 1.`:'No se encontraron valores repetidos con esta comparación.';
 $('faqTable').innerHTML=shown.map(group=>{
  const context=groupContext(group,result.context);
  const references=context?`<p><strong>${escapeHTML(result.context)}:</strong> ${context.values.length?context.values.map(([v,n])=>`${escapeHTML(v)} (${n} ${n===1?'registro':'registros'})`).join('; '):'Sin valores informados'}${context.missing?` · ${context.missing} registros sin referencia`:''}.</p><p class="muted">${context.values.length} valores de referencia distintos. ${context.values.some(([,n])=>n>1)?'También hay repeticiones dentro de una misma referencia.':''} Esta relación no demuestra por sí sola un error.</p>`:'<p class="muted">Sin campo de referencia seleccionado. Los registros completos se muestran al desplegar.</p>';
  return `<article class="repeat-group"><h4>${escapeHTML(group.label)}</h4><p><strong>${group.indices.length} registros</strong> con este valor o combinación.</p>${references}<details><summary>Ver los ${group.indices.length} registros completos</summary><div class="table-wrap">${htmlTable(['Registro',...headers],group.indices.map(i=>[i+1,...headers.map(h=>rows[i][h])]))}</div></details></article>`;
 }).join('');
 $('faqPagination').classList.toggle('hidden',total<=20);$('faqPrevious').disabled=faqPage===0;$('faqNext').disabled=start+20>=total;
}
$('faqPrevious').addEventListener('click',()=>{if(faqPage>0){faqPage--;renderAnswer()}});
$('faqNext').addEventListener('click',()=>{if(faqResult?.groups&&(faqPage+1)*20<faqResult.groups.length){faqPage++;renderAnswer()}});
// Prefix spreadsheet formula starters to keep exported user data as text.
const csvValue=v=>'"'+String(v??'').replace(/^[\s]*[=+@-]/,m=>"'"+m).replace(/"/g,'""')+'"';
function faqCSV(result){
 return '\uFEFF'+[
 ['Archivo',fileName],['Hoja',workbook?$('sheetSelect').value:'CSV'],['Consulta',result.title],['Campo de referencia',result.context||'Sin campo de referencia'],['Fecha',new Date().toISOString()],['Alcance',result.explanation],['Referencia','Registro: posición en la base cargada desde 1, no fila física. Señales descriptivas, no hallazgos.'],['Exportación','Los valores que podrían interpretarse como fórmulas se prefijan con apóstrofo.'],[],result.columns,...result.data
 ].map(r=>r.map(csvValue).join(',')).join('\r\n');
}
$('downloadFaq').addEventListener('click',()=>{
 if(!faqResult)return;const url=URL.createObjectURL(new Blob([faqCSV(faqResult)],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='consulta_base.csv';a.click();URL.revokeObjectURL(url);
});
