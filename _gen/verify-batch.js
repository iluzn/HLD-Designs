// Generic end-to-end verifier: fill each problem's stub with a known-correct
// solution, feed the exact combined stdin the engine builds, compare stdout
// line-by-line to expected. Usage: node verify-batch.js <solutionsFile.js>
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const os = require('os');

const SOL = require(path.resolve(process.argv[2])).SOL;

function fillStub(stub, body, lang) {
  if (lang === 'python') return stub.replace(/        # Write your code here\n        pass/, body);
  if (lang === 'javascript') return stub.replace(/    \/\/ Write your code here/, body);
  if (lang === 'cpp') return stub.replace(/        \/\/ Write your code here/, body);
  if (/        \/\/ Write your code here\n        return [^\n]*\n/.test(stub)) {
    return stub.replace(/        \/\/ Write your code here\n        return [^\n]*\n/, body + '\n');
  }
  return stub.replace(/        \/\/ Write your code here\n/, body + '\n');
}
function loadProblem(slug) {
  const s = fs.readFileSync(path.join(__dirname, '..', 'content', 'dsa', 'problem', slug + '.md'), 'utf8');
  const m = s.match(/window\.SC_LC = (\{[\s\S]*?\});\n/);
  return JSON.parse(m[1]);
}
function combinedStdin(d) { return d.cases.length + '\n' + d.cases.map(c => c.stdin).join('\n') + '\n'; }
function expectedOut(d) { return d.cases.map(c => c.expected).join('\n'); }

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'scb-'));
const shim = process.env.CPP_SHIM ? ['-I', process.env.CPP_SHIM] : [];
let pass = 0, fail = 0;

function run(lang, slug, d) {
  const sol = SOL[slug][lang];
  const src = d.langs[lang];
  const code = fillStub(src.stub, sol, lang) + '\n' + src.harness + '\n';
  const stdin = combinedStdin(d), exp = expectedOut(d);
  let out;
  try {
    if (lang === 'python') { const f = path.join(tmp, 'sol.py'); fs.writeFileSync(f, code); out = execFileSync('python3', [f], { input: stdin, encoding: 'utf8' }); }
    else if (lang === 'javascript') { const f = path.join(tmp, 'sol.js'); fs.writeFileSync(f, code); out = execFileSync('node', [f], { input: stdin, encoding: 'utf8' }); }
    else if (lang === 'cpp') { const f = path.join(tmp, 'sol.cpp'); fs.writeFileSync(f, code); execFileSync('g++', ['-std=c++17', '-O2'].concat(shim, ['-o', path.join(tmp, 'a.out'), f])); out = execFileSync(path.join(tmp, 'a.out'), [], { input: stdin, encoding: 'utf8' }); }
    else if (lang === 'java') { const jd = path.join(tmp, 'java'); fs.rmSync(jd, { recursive: true, force: true }); fs.mkdirSync(jd); fs.writeFileSync(path.join(jd, 'Main.java'), code); execFileSync('javac', [path.join(jd, 'Main.java')]); out = execFileSync('java', ['-cp', jd, 'Main'], { input: stdin, encoding: 'utf8' }); }
  } catch (e) { console.log('  x ' + lang + ' ERROR: ' + (e.stderr || e.message || e).toString().split('\n').slice(0, 5).join(' | ')); fail++; return; }
  const norm = s => s.replace(/\s+$/, '').split('\n').map(l => l.replace(/\s+$/, '')).join('\n');
  if (norm(out) === norm(exp)) { console.log('  ok ' + lang + ' (' + d.cases.length + ' cases)'); pass++; }
  else {
    const gl = norm(out).split('\n'), el = norm(exp).split('\n'); let bad = -1;
    for (let i = 0; i < Math.max(gl.length, el.length); i++) if (gl[i] !== el[i]) { bad = i; break; }
    console.log('  x ' + lang + ' MISMATCH line ' + bad + ' got=' + JSON.stringify(gl[bad]) + ' exp=' + JSON.stringify(el[bad]) + ' stdin=' + JSON.stringify(d.cases[bad] && d.cases[bad].stdin));
    fail++;
  }
}

Object.keys(SOL).forEach(slug => {
  console.log(slug + ':');
  let d; try { d = loadProblem(slug); } catch (e) { console.log('  x could not load problem'); fail++; return; }
  ['python', 'javascript', 'cpp', 'java'].forEach(lang => { if (SOL[slug][lang]) run(lang, slug, d); });
});
fs.rmSync(tmp, { recursive: true, force: true });
console.log('\n=== ' + pass + ' passed, ' + fail + ' failed ===');
process.exit(fail ? 1 : 0);
