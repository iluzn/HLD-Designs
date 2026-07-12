/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    const v = "aeiouAEIOU";
    const a = s.split('');
    let l = 0, r = a.length - 1;
    while (l < r) {
        if (v.indexOf(a[l]) < 0) l++;
        else if (v.indexOf(a[r]) < 0) r--;
        else { const t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; }
    }
    return a.join('');
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\r$/,'');_o.push(String(reverseVowels(_s)));}
console.log(_o.join('\n'));