// Summarize recorded answers, not legal compliance or documentary truth.
const statusOrder=['Cumple','No consta','No cumple','No aplica','Falta','Observa','Sí','No','Vacío','Otras respuestas'];
let checklistSelected=[],recordPageIndex=0;
function statusOf(value,includeTypos=false){
 if(empty(value))return 'Vacío';
 const key=nameKey(value).replace(/[.!;:]$/,'').trim();
 const exact={'cumple':'Cumple','no cumple':'No cumple','no consta':'No consta','no consta en ee':'No consta','no aplica':'No aplica','falta':'Falta','observa':'Observa','si':'Sí','no':'No'};
 if(Object.hasOwn(exact,key))return exact[key];
 if(includeTypos&&['no cosnta','no consata','no cosnta en ee'].includes(key))return 'No consta';
 return null;
}
function useStatusTypos(){return Boolean($('groupStatusTypos').checked)}
function recordIdField(){return columnFrom($('recordId').value)}
function recordLabel(i){const id=recordIdField();return id&&!empty(rows[i][id])?String(rows[i][id]):`Posición ${i+1}`}
function referenceField(){return headers.find(h=>/expediente|^expte|^exp$/.test(norm(h)))||null}
function suggestedChecklistFields(){
 return headers.filter(h=>{const vals=rows.map(r=>r[h]).filter(v=>!empty(v));return vals.length>0&&vals.every(v=>statusOf(v,true)!==null)});
}
function resetChecklist(){checklistSelected=[];recordPageIndex=0;$('checklistSection').classList.add('hidden');['checklistSummary','recordSummary','checklistFields'].forEach(id=>$(id).innerHTML='')}
function initializeChecklist(){
 $('recordId').innerHTML=options('Usar posición en la base');
 const id=headers.findIndex(h=>/^(n|no|nro|numero|id|nregistro|numeroregistro)$/.test(norm(h)));
 $('recordId').value=id<0?'':String(id);$('groupStatusTypos').checked=false;
 checklistSelected=suggestedChecklistFields();recordPageIndex=0;
 $('checklistFields').innerHTML=headers.map((h,i)=>`<label><input type="checkbox" data-field="${i}" ${checklistSelected.includes(h)?'checked':''}> ${escapeHTML(h)}</label>`).join('');
 $('checklistSection').classList.remove('hidden');renderChecklist();
}
function statusCounts(row,fields){
 const counts=Object.fromEntries(statusOrder.map(s=>[s,0]));
 fields.forEach(h=>counts[statusOf(row[h],useStatusTypos())||'Otras respuestas']++);return counts;
}
function fieldGroups(field){
 const groups=new Map();
 rows.forEach((r,i)=>{
  const status=statusOf(r[field],useStatusTypos()),label=status||String(r[field]);
  const key=JSON.stringify([Boolean(status),label]);
  if(!groups.has(key))groups.set(key,{label,indices:[],variants:new Map(),status:Boolean(status)});
  const group=groups.get(key);group.indices.push(i);const raw=empty(r[field])?'(vacío)':String(r[field]);group.variants.set(raw,(group.variants.get(raw)||0)+1);
 });
 return [...groups.values()].sort((a,b)=>b.indices.length-a.indices.length);
}
function summarizeField(field){
 const groups=fieldGroups(field),id=recordIdField(),ref=referenceField();
 return {title:`Resumen de ${field}`,fieldSummary:true,field,groups,
  columns:['Respuesta agrupada',id||'Posición',...(ref&&ref!==id?[ref]:[]),'Valor original','Posición en la base'],
  data:groups.flatMap(g=>g.indices.map(i=>[g.label,recordLabel(i),...(ref&&ref!==id?[rows[i][ref]]:[]),rows[i][field],i+1])),
  explanation:`${rows.length} registros; ${groups.length} respuestas o valores distintos tras agrupar estados reconocidos. Se incluyen vacíos y respuestas que aparecen una sola vez. Los estados describen lo consignado en el archivo, no una verificación del documento. ${useStatusTypos()?'Se agrupan las variantes de escritura indicadas.':'Las posibles erratas se muestran separadas.'}`};
}
function renderFieldSummary(result){
 $('faqPagination').classList.add('hidden');
 $('faqLimit').textContent=`${result.title}. ${recordIdField()||'Posición'} identifica el registro original. Cada cantidad usa ${rows.length} registros como denominador.`;
 const summary=htmlTable(['Respuesta / valor','Cantidad','% de registros',recordIdField()||'Posiciones'],result.groups.map(g=>[g.label,g.indices.length,(g.indices.length/rows.length*100).toFixed(2)+'%',g.indices.map(recordLabel).join(', ')]));
 const ref=referenceField();
 const details=result.groups.map(g=>`<details class="response-detail"><summary>${escapeHTML(g.label)} · ${g.indices.length} registros</summary><p>Valores originales: ${g.variants?Array.from(g.variants,([v,n])=>`${escapeHTML(v)} (${n})`).join('; '):''}.</p><div class="table-wrap">${htmlTable([recordIdField()||'Posición',...(ref&&ref!==recordIdField()?[ref]:[]),result.field],g.indices.map(i=>[recordLabel(i),...(ref&&ref!==recordIdField()?[rows[i][ref]]:[]),rows[i][result.field]]))}</div></details>`).join('');
 $('faqTable').innerHTML=summary+details;
}
function renderChecklist(){
 const fields=checklistSelected;
 const id=recordIdField(),labels=rows.map((_,i)=>recordLabel(i));
 const duplicateLabels=labels.length-new Set(labels).size;
 $('checklistScope').textContent=`${rows.length} registros y ${fields.length} campos seleccionados. Cada fila del resumen de campos suma ${rows.length}. Los conteos por registro suman ${fields.length}; “No aplica” no se suma a “No cumple”. “No consta en EE” se agrupa con “No consta”. ${useStatusTypos()?'Las variantes de escritura indicadas se agrupan; el detalle conserva el texto original.':'Las erratas conocidas se cuentan en “Otras respuestas” hasta activar su agrupación.'} ${id?`Se conserva el identificador “${id}” tal como aparece, incluso si no es numérico.`:'Se usan posiciones de la base porque no se eligió identificador.'}${duplicateLabels?` Hay ${duplicateLabels} etiquetas adicionales repetidas; consultá la posición para distinguirlas.`:''}`;
 $('checklistSummary').innerHTML=fields.length?'<table><thead><tr><th>Campo</th>'+statusOrder.map(s=>`<th>${s}</th>`).join('')+'<th>Detalle</th></tr></thead><tbody>'+fields.map(h=>{
  const counts=Object.fromEntries(statusOrder.map(s=>[s,0]));rows.forEach(r=>counts[statusOf(r[h],useStatusTypos())||'Otras respuestas']++);
  return `<tr><th>${escapeHTML(h)}</th>${statusOrder.map(s=>`<td>${counts[s]}</td>`).join('')}<td><button class="secondary" data-summary-field="${headers.indexOf(h)}">Ver registros</button></td></tr>`;
 }).join('')+'</tbody></table>':'<p>No hay campos de checklist seleccionados. Podés elegirlos arriba o usar el resumen de cualquier campo en las preguntas frecuentes.</p>';
 renderRecordSummary();
}
function recordSummaryData(){
 const id=recordIdField(),ref=referenceField();
 return {columns:[id||'Posición',...(ref&&ref!==id?[ref]:[]),...statusOrder,'Detalle de respuestas','Posición en la base'],
 data:rows.map((r,i)=>{const counts=statusCounts(r,checklistSelected);return [recordLabel(i),...(ref&&ref!==id?[r[ref]]:[]),...statusOrder.map(s=>counts[s]),checklistSelected.map(h=>`${h}: ${empty(r[h])?'(vacío)':r[h]}`).join(' | '),i+1]})};
}
function renderRecordSummary(){
 const start=recordPageIndex*20,ref=referenceField();
 $('recordSummary').innerHTML=rows.slice(start,start+20).map((r,offset)=>{
  const i=start+offset,counts=statusCounts(r,checklistSelected);
  const brief=statusOrder.filter(s=>counts[s]).map(s=>`${s}: ${counts[s]}`).join(' · ');
  return `<details class="record-card"><summary><strong>${escapeHTML(recordIdField()||'Registro')} ${escapeHTML(recordLabel(i))}</strong>${ref?` · ${escapeHTML(r[ref])}`:''}<span>${escapeHTML(brief||'Sin campos seleccionados')}</span></summary><p class="muted">Posición ${i+1} en la base cargada.</p><div class="table-wrap">${htmlTable(['Campo','Respuesta original','Agrupación'],checklistSelected.map(h=>[h,empty(r[h])?'(vacío)':r[h],statusOf(r[h],useStatusTypos())||'Otras respuestas']))}</div></details>`;
 }).join('');
 $('recordPage').textContent=`${start+1}–${Math.min(start+20,rows.length)} de ${rows.length}`;$('recordPrevious').disabled=recordPageIndex===0;$('recordNext').disabled=start+20>=rows.length;
}
function refreshChecklist(){recordPageIndex=0;renderChecklist();invalidateAnswer()}
$('recordId').addEventListener('change',refreshChecklist);
$('groupStatusTypos').addEventListener('change',refreshChecklist);
$('checklistFields').addEventListener('change',event=>{
 const field=columnFrom(event.target.dataset.field);if(!field)return;
 checklistSelected=event.target.checked?[...new Set([...checklistSelected,field])]:checklistSelected.filter(h=>h!==field);refreshChecklist();
});
$('checklistSummary').addEventListener('click',event=>{
 const button=event.target.closest('button[data-summary-field]');if(!button)return;
 $('faqQuestion').value='summary';configureQuestion();$('faqColumn').value=button.dataset.summaryField;$('askFaq').click();$('faqAnswer').scrollIntoView({behavior:'smooth',block:'start'});
});
$('recordPrevious').addEventListener('click',()=>{if(recordPageIndex>0){recordPageIndex--;renderRecordSummary()}});
$('recordNext').addEventListener('click',()=>{if((recordPageIndex+1)*20<rows.length){recordPageIndex++;renderRecordSummary()}});
$('downloadRecords').addEventListener('click',()=>{
 const result={...recordSummaryData(),title:'Resumen por registro',context:recordIdField(),explanation:`Campos seleccionados: ${checklistSelected.join('; ')}. ${$('checklistScope').textContent}`};
 const url=URL.createObjectURL(new Blob([faqCSV(result)],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='resumen_por_registro.csv';a.click();URL.revokeObjectURL(url);
});
