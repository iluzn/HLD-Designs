/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function(s) {
    const st = [];
    for (const c of s) {
        if (c === '*') st.pop();
        else st.push(c);
    }
    return st.join('');
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\r$/,'');_o.push(String(removeStars(_s)));}
console.log(_o.join('\n'));