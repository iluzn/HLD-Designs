/**
 * @param {string} s
 * @return {string}
 */
var simplifyPath = function(s) {
    const st = [];
    for (const part of s.split('/')) {
        if (part === '' || part === '.') continue;
        if (part === '..') { if (st.length) st.pop(); }
        else st.push(part);
    }
    return '/' + st.join('/');
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\r$/,'');_o.push(String(simplifyPath(_s)));}
console.log(_o.join('\n'));