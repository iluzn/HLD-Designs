// Merge all verified per-language solutions into one map.
//   SOLUTIONS[slug] = { python, java, cpp, javascript }
// FULLCLASS[slug] = true  when the solution is a complete class (design
// problems) and should be shown verbatim rather than filled into a stub.
var SOLUTIONS = {}, FULLCLASS = {};
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'].forEach(function (b) {
  var mod;
  try { mod = require('./sol-batch' + b + '.js'); } catch (e) { return; }
  Object.keys(mod.SOL).forEach(function (slug) {
    SOLUTIONS[slug] = mod.SOL[slug];
    if (mod.FULL) FULLCLASS[slug] = true;
  });
});

// Reconstruct a full, readable solution by filling the body into the stub.
function fillStub(stub, body, lang) {
  if (lang === 'python') {
    if (/        # Write your code here\n        pass/.test(stub)) return stub.replace(/        # Write your code here\n        pass/, body);
    return stub.replace(/        # Write your code here/, body);
  }
  if (lang === 'javascript') return stub.replace(/    \/\/ Write your code here/, body);
  if (lang === 'cpp') return stub.replace(/        \/\/ Write your code here/, body);
  if (/        \/\/ Write your code here\n        return [^\n]*\n/.test(stub)) return stub.replace(/        \/\/ Write your code here\n        return [^\n]*\n/, body + '\n');
  return stub.replace(/        \/\/ Write your code here\n/, body + '\n');
}

module.exports = { SOLUTIONS, FULLCLASS, fillStub };
