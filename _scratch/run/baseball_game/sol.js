/**
 * @param {string} s
 * @return {number}
 */
var calPoints = function(s) {
    const st = [];
    for (const tok of s.split(/\s+/).filter(x => x.length)) {
        if (tok === 'C') st.pop();
        else if (tok === 'D') st.push(2 * st[st.length - 1]);
        else if (tok === '+') st.push(st[st.length - 1] + st[st.length - 2]);
        else st.push(parseInt(tok, 10));
    }
    return st.reduce((a, b) => a + b, 0);
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\r$/,'');_o.push(String(calPoints(_s)));}
console.log(_o.join('\n'));