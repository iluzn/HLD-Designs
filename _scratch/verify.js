// Verifier for new problem batches. Usage: node _scratch/verify.js <moduleFile> <MOREvar> <solBatchLetter>
// Example: node _scratch/verify.js ../_gen/problems18.js MORE18 O
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { stdinOf, fmtExpected } = require('../_gen/problems.js');
const { fillStub } = require('../_gen/solutions.js');

const [, , modFile, moreVar, solLetter] = process.argv;
const mod = require(path.resolve(__dirname, modFile));
const problems = mod[moreVar];
const SOL = require(path.resolve(__dirname, '../_gen/sol-batch' + solLetter + '.js')).SOL;

const TMP = path.join(__dirname, 'run');
fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
const SHIM = path.join(__dirname, 'shim');

function norm(s) { return s.replace(/\r/g, '').replace(/[ \t]+$/gm, '').replace(/\n+$/,'').trim(); }

function buildInput(p) {
  const seen = {}; const cases = [];
  p.gen().forEach(function (args) {
    const stdin = stdinOf(p.type, args);
    if (seen[stdin] !== undefined) return; seen[stdin] = 1;
    cases.push({ stdin: stdin, expected: fmtExpected(p.ref(args)) });
  });
  return cases;
}

let totalPass = 0, totalFail = 0;
const failures = [];

for (const p of problems) {
  const sol = SOL[p.slug];
  if (!sol) { console.log('NO SOL for ' + p.slug); failures.push(p.slug + ' [missing sol]'); totalFail++; continue; }
  const src = p.custom || p.langsrc;
  const cases = buildInput(p);
  const input = cases.length + '\n' + cases.map(c => c.stdin).join('\n') + '\n';
  const expected = cases.map(c => c.expected).join('\n');
  const dir = path.join(TMP, p.slug.replace(/[^a-z0-9]/gi, '_'));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'input.txt'), input);

  const results = {};
  // Python
  try {
    const code = fillStub(src.python.stub, sol.python, 'python') + '\n' + src.python.harness;
    const f = path.join(dir, 'sol.py'); fs.writeFileSync(f, code);
    const out = cp.execSync('python3 ' + f, { input, timeout: 30000, maxBuffer: 1<<26 }).toString();
    results.python = norm(out) === norm(expected) ? 'PASS' : 'FAIL';
    if (results.python === 'FAIL') results.pythonOut = out;
  } catch (e) { results.python = 'ERR'; results.pythonErr = (e.stderr||e.stdout||e.message||'').toString().slice(0,800); }
  // JS
  try {
    const code = fillStub(src.javascript.stub, sol.javascript, 'javascript') + '\n' + src.javascript.harness;
    const f = path.join(dir, 'sol.js'); fs.writeFileSync(f, code);
    const out = cp.execSync('node ' + f, { input, timeout: 30000, maxBuffer: 1<<26 }).toString();
    results.javascript = norm(out) === norm(expected) ? 'PASS' : 'FAIL';
    if (results.javascript === 'FAIL') results.jsOut = out;
  } catch (e) { results.javascript = 'ERR'; results.jsErr = (e.stderr||e.stdout||e.message||'').toString().slice(0,800); }
  // C++
  try {
    const code = fillStub(src.cpp.stub, sol.cpp, 'cpp') + '\n' + src.cpp.harness;
    const f = path.join(dir, 'sol.cpp'); fs.writeFileSync(f, code);
    const bin = path.join(dir, 'sol_cpp');
    cp.execSync('g++ -std=c++17 -I ' + SHIM + ' ' + f + ' -o ' + bin, { timeout: 60000 });
    const out = cp.execSync(bin, { input, timeout: 30000, maxBuffer: 1<<26 }).toString();
    results.cpp = norm(out) === norm(expected) ? 'PASS' : 'FAIL';
    if (results.cpp === 'FAIL') results.cppOut = out;
  } catch (e) { results.cpp = 'ERR'; results.cppErr = (e.stderr||e.stdout||e.message||'').toString().slice(0,800); }
  // Java
  try {
    const code = fillStub(src.java.stub, sol.java, 'java') + '\n' + src.java.harness;
    const f = path.join(dir, 'Main.java'); fs.writeFileSync(f, code);
    cp.execSync('javac -d ' + dir + ' ' + f, { timeout: 60000 });
    const out = cp.execSync('java -cp ' + dir + ' Main', { input, timeout: 30000, maxBuffer: 1<<26 }).toString();
    results.java = norm(out) === norm(expected) ? 'PASS' : 'FAIL';
    if (results.java === 'FAIL') results.javaOut = out;
  } catch (e) { results.java = 'ERR'; results.javaErr = (e.stderr||e.stdout||e.message||'').toString().slice(0,800); }

  const langs = ['python','javascript','cpp','java'];
  const ok = langs.every(l => results[l] === 'PASS');
  if (ok) { totalPass++; console.log('PASS  ' + p.slug); }
  else {
    totalFail++;
    console.log('FAIL  ' + p.slug + '  ' + langs.map(l=>l+':'+results[l]).join(' '));
    failures.push(p.slug);
    // dump first failing detail
    for (const l of langs) {
      if (results[l] !== 'PASS') {
        const errKey = {python:'pythonErr',javascript:'jsErr',cpp:'cppErr',java:'javaErr'}[l];
        const outKey = {python:'pythonOut',javascript:'jsOut',cpp:'cppOut',java:'javaOut'}[l];
        if (results[errKey]) console.log('   ['+l+' ERR] ' + results[errKey].split('\n').slice(0,6).join(' | '));
        else if (results[outKey]) {
          // find first differing line
          const eo = norm(expected).split('\n'), ao = norm(results[outKey]).split('\n');
          for (let i=0;i<Math.max(eo.length,ao.length);i++){ if(eo[i]!==ao[i]){ console.log('   ['+l+' DIFF] case#'+i+' expected='+eo[i]+' got='+ao[i]); break; } }
        }
      }
    }
  }
}
console.log('\n==== ' + moreVar + ': ' + totalPass + ' passed, ' + totalFail + ' failed ====');
if (failures.length) { console.log('Failures: ' + failures.join(', ')); process.exit(1); }
