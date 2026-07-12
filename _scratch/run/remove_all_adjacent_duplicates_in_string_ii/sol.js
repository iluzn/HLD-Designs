/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var removeDuplicates = function(s, k) {
    const st = [];
    for (const c of s) {
        if (st.length && st[st.length - 1][0] === c) {
            st[st.length - 1][1]++;
            if (st[st.length - 1][1] === k) st.pop();
        } else st.push([c, 1]);
    }
    return st.map(p => p[0].repeat(p[1])).join('');
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+2*_i]||'').replace(/\r$/,'');const _k=+((_l[2+2*_i]||'0').trim());_o.push(String(removeDuplicates(_s,_k)));}
console.log(_o.join('\n'));