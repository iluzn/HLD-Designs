/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var strStr = function(s, t) {
    return s.indexOf(t);
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+2*_i]||'').replace(/\r$/,'');const _t=(_l[2+2*_i]||'').replace(/\r$/,'');_o.push(String(strStr(_s,_t)));}
console.log(_o.join('\n'));