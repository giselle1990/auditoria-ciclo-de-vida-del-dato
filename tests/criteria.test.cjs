const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const elements = new Map();
let exported;
function element(id) {
 if (!elements.has(id)) elements.set(id, {value:'',innerHTML:'',textContent:'',classList:{add(){},remove(){}},addEventListener(event,fn){this[event]=fn},querySelector(){return element(id+'-body')},offsetTop:0});
 return elements.get(id);
}
const context = vm.createContext({document:{getElementById:element,createElement:()=>({click(){}})},window:{scrollTo(){}},alert(message){throw Error(message)},Blob,URL:{createObjectURL(blob){exported=blob;return 'blob:test'},revokeObjectURL(){}}});
vm.runInContext(fs.readFileSync('app.js','utf8'),context);
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
