const { P } = require('./_gen/problems.js');
require('./_gen/problems2.js').MORE.forEach(function (p) { P.push(p); });
for (let i = 3; i <= 15; i++) {
  const mod = require('./_gen/problems' + i + '.js');
  (mod['MORE' + i] || []).forEach(function (p) { P.push(p); });
}
const { SOLUTIONS, FULLCLASS, fillStub } = require('./_gen/solutions.js');

const order = ['python', 'java', 'cpp', 'javascript'];
let noSol = [], partial = [], badJava = [];

P.forEach(function (p) {
  const src = p.custom || p.langsrc || {};
  const langs = {};
  order.forEach(function (k) { if (src[k]) langs[k] = { stub: src[k].stub, harness: src[k].harness }; });
  const sol = SOLUTIONS[p.slug];
  if (!sol) { noSol.push(p.slug); return; }
  const missing = order.filter(function (l) { return langs[l] && !sol[l]; });
  if (missing.length) partial.push(p.slug + ' [missing: ' + missing.join(',') + ']');

  if (sol.java && langs.java) {
    const filled = FULLCLASS[p.slug] ? sol.java : fillStub(langs.java.stub, sol.java, 'java');
    const bodyNls = (sol.java.match(/\n/g) || []).length;
    const stmts = (sol.java.match(/;/g) || []).length;
    if (bodyNls === 0 && stmts >= 2) badJava.push(p.slug + ' (1-line body, ' + stmts + ' stmts)');
    if (/Write your code here/.test(filled)) badJava.push(p.slug + ' (STUB NOT FILLED)');
  }
});

console.log('TOTAL problems:', P.length);
console.log('\n=== NO multi-language solution (' + noSol.length + ') ===\n' + noSol.join(', '));
console.log('\n=== PARTIAL missing langs (' + partial.length + ') ===\n' + partial.join('\n'));
console.log('\n=== JAVA formatting suspects (' + badJava.length + ') ===\n' + badJava.join('\n'));
