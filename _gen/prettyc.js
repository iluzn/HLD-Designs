// Pretty-print C-style code (Java / C++ / JavaScript) that may have been
// authored on a single line. Reindents by brace depth and breaks statements
// on top-level ';'. String/char literals and // and /* */ comments are
// preserved verbatim so code is never corrupted. Initializer braces
// (new int[]{...}, = {...}) are kept inline; only control/method blocks break.
function prettyC(code) {
  var out = [], line = '', indent = 0, paren = 0, i = 0, n = code.length;
  var lastReal = '', stack = [];
  function flush() { var t = line.replace(/\s+$/, '').replace(/^\s+/, ''); out.push(t ? ('    '.repeat(Math.max(indent, 0)) + t) : ''); line = ''; }
  function space() { if (line && !/\s$/.test(line)) line += ' '; }
  function add(ch) { line += ch; if (!/\s/.test(ch)) lastReal = ch; }
  while (i < n) {
    var c = code[i], d = code[i + 1];
    if (c === '"' || c === "'") {                 // string / char literal
      var q = c; line += c; i++;
      while (i < n) { line += code[i]; if (code[i] === '\\') { line += (code[i + 1] || ''); i += 2; continue; } if (code[i] === q) { i++; break; } i++; }
      lastReal = q; continue;
    }
    if (c === '/' && d === '/') {                 // line comment
      space(); while (i < n && code[i] !== '\n') { line += code[i]; i++; } flush(); continue;
    }
    if (c === '/' && d === '*') {                 // block comment
      space(); while (i < n && !(code[i] === '*' && code[i + 1] === '/')) { line += code[i]; i++; } line += '*/'; i += 2; continue;
    }
    if (c === '\n' || c === '\r' || c === '\t' || c === ' ') { space(); i++; continue; }
    if (c === '{') {
      var isInit = (lastReal === ']' || lastReal === '=' || lastReal === ',' || lastReal === '(');
      if (isInit) { add('{'); stack.push('init'); i++; continue; }
      space(); add('{'); flush(); indent++; stack.push('block'); i++; continue;
    }
    if (c === '}') {
      var kind = stack.pop() || 'block';
      if (kind === 'init') { add('}'); i++; continue; }
      if (line.trim()) flush();
      indent--; line = '}'; lastReal = '}'; i++;
      while (i < n && code[i] === ' ') i++;
      if (code[i] === ';') { line += ';'; i++; }
      else if (code[i] === ',') { line += ','; i++; }
      else if (code[i] === ')') { line += ')'; paren = Math.max(0, paren - 1); i++; }
      var m = code.slice(i).match(/^\s*(else|catch|finally)\b/);
      if (m) { line += ' '; } else { flush(); }
      continue;
    }
    if (c === '(') { paren++; add('('); i++; continue; }
    if (c === ')') { paren = Math.max(0, paren - 1); add(')'); i++; continue; }
    if (c === ';') {
      add(';'); i++;
      if (paren === 0 && (stack[stack.length - 1] || 'block') === 'block') { while (i < n && code[i] === ' ') i++; if (code[i] !== '}') flush(); }
      continue;
    }
    add(c); i++;
  }
  if (line.trim()) flush();
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}
module.exports = { prettyC };
