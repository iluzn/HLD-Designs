/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function(s) {
    let open = 0, add = 0;
    for (const c of s) {
        if (c === '(') open++;
        else if (open > 0) open--;
        else add++;
    }
    return add + open;
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\r$/,'');_o.push(String(minAddToMakeValid(_s)));}
console.log(_o.join('\n'));