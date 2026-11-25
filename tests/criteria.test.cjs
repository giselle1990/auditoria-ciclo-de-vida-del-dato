const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const elements = new Map();
let exported;
function element(id) {
 if (!elements.has(id)) elements.set(id, {value:'',innerHTML:'',textContent:'',classList:{add(){},remove(){},toggle(){}},addEventListener(event,fn){this[event]=fn},querySelector(){return element(id+'-body')},offsetTop:0});
 return elements.get(id);
}
const context = vm.createContext({document:{getElementById:element,createElement:()=>({click(){}})},window:{scrollTo(){}},alert(message){throw Error(message)},Blob,URL:{createObjectURL(blob){exported=blob;return 'blob:test'},revokeObjectURL(){}}});
vm.runInContext(fs.readFileSync('app.js','utf8'),context);
vm.runInContext(fs.readFileSync('explorer.js','utf8'),context);
vm.runInContext(fs.readFileSync('checklist.js','utf8'),context);
const run=code=>vm.runInContext(code,context);
test('document-dependent checks remain pending on complete and incomplete data',()=>{
 for(const csv of ['id,fecha\n1,2026-11-25','id,fecha\n,1900-01-01']) {
  run(`parseCSV(${JSON.stringify(csv)})`);
  for(const stage of ['obtencion','decision','evaluacion']) {
   assert.equal(run(`stages.${stage}.risks.every(r=>r.type==='documental')`),true);
   assert.equal(run(`stages.${stage}.risks.every(r=>evaluate(r.type).level==='Requiere evidencia')`),true);
  }
 }
});
test('duplicates and missing values describe signals without severity thresholds',()=>{
 run("parseCSV('id,nombre\\n1,A\\n1,A\\n2,')");
 assert.equal(run("evaluate('duplicates').level"),'Alerta analítica');
 assert.match(run("evaluate('duplicates').result"),/2 filas.*66.67/);
 assert.equal(run("evaluate('missing').level"),'Alerta analítica');
 run("parseCSV('id,nombre\\n1,A\\n2,B')");
 assert.equal(run("evaluate('duplicates').level"),'Sin señal detectada');
 assert.equal(run("evaluate('missing').level"),'Sin señal detectada');
});
test('unavailable date and outlier tests do not imply a clean result',()=>{
 run("parseCSV('id,fecha\\n1,\\n2,')");
 assert.equal(run("evaluate('dates').level"),'Requiere evidencia');
 assert.equal(run("evaluate('outliers').level"),'Requiere evidencia');
 run("parseCSV('id,fecha\\n1,no-es-fecha')");
 assert.equal(run("evaluate('dates').level"),'Alerta analítica');
});
test('IQR excludes empty values and reports an extreme value as a signal',()=>{
 run("headers=['valor'];rows=Array.from({length:20},(_,i)=>({valor:String(i+1)}));rows.push({valor:'1000'},{valor:''})");
 assert.equal(run("outlierStats().total"),1);
 assert.equal(run("evaluate('outliers').level"),'Alerta analítica');
 run("rows=Array.from({length:19},(_,i)=>({valor:String(i+1)}));rows.push({valor:''})");
 assert.equal(run("outlierStats().eligible"),0);
});
test('category variants and all seven rendered stages use descriptive states',()=>{
 run("parseCSV('id,categoria\\n1,ÁREA\\n2,area')");
 assert.equal(run("evaluate('categories').level"),'Alerta analítica');
 for(const stage of run('Object.keys(stages)')) {
  element('stageSelect').value=stage;
  element('analyze').click();
  assert.equal(run("currentResults.every(r=>['Alerta analítica','Sin señal detectada','Requiere evidencia'].includes(r.level))"),true);
  assert.doesNotMatch(element('riskTable-body').innerHTML,/>Alto<|>Medio<|>Bajo</);
 }
 assert.equal(elements.has('stageRisk'),false);
});
test('export preserves methodology warning and descriptive states',async()=>{
 element('download').click();
 const csv=await exported.text();
 assert.match(csv,/ESTADO DE LA REVISION/);
 assert.match(csv,/no califican riesgos/);
 assert.match(csv,/Requiere evidencia/);
 assert.doesNotMatch(csv,/,NIVEL,|"Alto"|"Medio"|"Bajo"/);
});

test('CSV preserves duplicate and empty headers and handles quoted multiline values',()=>{
 run(`parseCSV('nombre,nombre,\\n"Ana\\nMaría",Pérez,0')`);
 assert.equal(run('headers.length'),3);
 assert.equal(run('headers[1]'),'nombre (2)');
 assert.equal(run('rows[0][headers[1]]'),'Pérez');
 assert.equal(run('headerNotes.length'),2);
 assert.throws(()=>run(`parseCSV('a,b\\n1,2,3')`),/distinta cantidad/);
 assert.throws(()=>run(`parseCSV('a\\n"sin cierre')`),/comillas/);
});
test('missing FAQ counts cells and affected records separately, preserves zero',()=>{
 run("parseCSV('id,nombre,edad\\n1,,0\\n2,,\\n3,Ana,20')");
 assert.equal(run('generalProfile().emptyCells'),3);
 assert.equal(run('generalProfile().affected'),2);
 assert.equal(run("answerQuestion('missing','','','',false).data.length"),3);
 assert.equal(run("answerQuestion('missing','2','','',false).data.length"),1);
});
test('duplicates distinguish rows, values and name variants',()=>{
 run("parseCSV('id,nombre,apellido\\n1,José,Pérez\\n1,José,Pérez\\n2,JOSE,PEREZ\\n3,,Pérez\\n4,Jose,Otro')");
 assert.equal(run("answerQuestion('rows','','','',false).data.length"),2);
 assert.equal(run("answerQuestion('values','2','','',false).data.length"),3);
 assert.equal(run("answerQuestion('names','','1','2',false).data.length"),2);
 assert.equal(run("answerQuestion('names','','1','2',true).data.length"),3);
 assert.throws(()=>run("answerQuestion('values','','','',false)"),/Elegí/);
 assert.throws(()=>run("answerQuestion('names','','1','1',false)"),/diferentes/);
});
test('overview and question handlers render escaped data, export all results and reset',()=>{
 run("parseCSV('nombre\\n<img src=x>\\n<img src=x>')");
 run('renderOverview()');
 assert.match(element('dataPreview').innerHTML,/&lt;img/);
 element('faqQuestion').value='rows';element('askFaq').click();
 assert.match(element('faqTable').innerHTML,/&lt;img/);
 run("headers=['valor'];rows=Array.from({length:60},()=>({valor:'=1+1'}))");
 element('askFaq').click();
 assert.match(element('faqLimit').textContent,/Grupos 1 a 1 de 1/);
 assert.equal(run('faqResult.data.length'),60);
 assert.match(run('faqCSV(faqResult)'),/For|Exportación/);
 assert.match(run('faqCSV(faqResult)'),/'=1\+1/);
 run('resetAnalysis()');assert.equal(run('faqResult'),null);
});

test('any repeated field groups actual values, links expedientes and preserves every record',()=>{
 run("parseCSV('disposicion,ley aplicable,expediente\\nDI-1,Ley 10,EX-1\\nDI-1,Ley 10,EX-2\\nDI-2,Ley 10,EX-3\\nDI-2,Ley 20,EX-3\\nDI-2,Ley 20,')");
 run("faqResult=answerQuestion('values','0','','',false);faqResult.context='expediente';faqPage=0;renderAnswer()");
 assert.equal(run('faqResult.groups.length'),2);
 assert.equal(run('faqResult.groups[0].label'),'DI-1');
 assert.equal(run("JSON.stringify(groupContext(faqResult.groups[1],'expediente'))"),JSON.stringify({values:[['EX-3',2]],missing:1}));
 assert.match(element('faqTable').innerHTML,/EX-1.*EX-2/s);
 assert.match(element('faqTable').innerHTML,/Ver los 3 registros completos/);
 assert.equal(run('faqResult.data.length'),5);
 run("faqResult=answerQuestion('values','1','','',false);faqResult.context=null;renderAnswer()");
 assert.equal(run('faqResult.groups[0].label'),'Ley 10');
 assert.match(element('faqTable').innerHTML,/Sin campo de referencia/);
 assert.match(run('faqCSV(faqResult)'),/Valor repetido/);
});
test('group pagination reaches all repeated values without truncating records or export',()=>{
 run("headers=['ley'];rows=Array.from({length:42},(_,i)=>({ley:'Ley '+Math.floor(i/2)}));faqResult=answerQuestion('values','0','','',false);faqPage=0;renderAnswer()");
 assert.match(element('faqLimit').textContent,/1 a 20 de 21/);
 element('faqNext').click();assert.match(element('faqLimit').textContent,/21 a 21 de 21/);
 assert.match(element('faqTable').innerHTML,/Ley 20/);
 assert.equal(run('faqResult.data.length'),42);
 element('faqPrevious').click();assert.match(element('faqLimit').textContent,/1 a 20 de 21/);
});

test('field summary preserves original identifiers, singletons, blanks and original responses',()=>{
 run("parseCSV('N,Expediente,DNI\\n7,EX-A,No consta\\n37,EX-B,Cumple\\na,EX-C,No consta\\n80,EX-D,')");
 run('renderOverview()');
 run("faqResult=answerQuestion('summary','2','','',false);renderAnswer()");
 assert.equal(run("faqResult.groups.find(g=>g.label==='No consta').indices.map(recordLabel).join(', ')"),'7, a');
 assert.equal(run('faqResult.groups.length'),3);
 assert.equal(run('faqResult.data.length'),4);
 assert.match(element('faqTable').innerHTML,/7, a/);
 assert.match(run('faqCSV(faqResult)'),/EX-A/);
 assert.equal(run("statusOf('No consta documento adicional')"),null);
 assert.equal(run("statusOf('No cosnta')"),null);
 assert.equal(run("statusOf('No cosnta',true)"),'No consta');
});
test('record counts reconcile, do not confuse absence with failure and keep typos optional',()=>{
 run("parseCSV('N,Expediente,DNI,Control,Numero disposicion\\n7,EX-A,No consta,Cumple,DI-1\\n37,EX-B,No cumple,No cosnta,DI-1\\na,EX-C,No aplica,No,No consta')");
 run('renderOverview()');
 assert.equal(run("checklistSelected.includes('Numero disposicion')"),false);
 assert.equal(run('checklistSelected.length'),2);
 assert.equal(run("statusCounts(rows[1],checklistSelected)['Otras respuestas']"),1);
 assert.equal(run("statusCounts(rows[1],checklistSelected)['No cumple']"),1);
 element('groupStatusTypos').checked=true;
 assert.equal(run("statusCounts(rows[1],checklistSelected)['No consta']"),1);
 assert.equal(run('Object.values(statusCounts(rows[1],checklistSelected)).reduce((a,b)=>a+b,0)'),2);
 const result=run("answerQuestion('values','4','','',false)");
 assert.equal(result.groups.length,1);assert.equal(result.groups[0].label,'DI-1');assert.equal(result.data.length,2);
 assert.equal(run('recordSummaryData().data.length'),3);
});
