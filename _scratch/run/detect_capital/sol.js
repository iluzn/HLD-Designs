/**
 * @param {string} s
 * @return {boolean}
 */
var detectCapitalUse = function(s) {
    const allUp = s === s.toUpperCase();
    const allLow = s === s.toLowerCase();
    const title = s[0] === s[0].toUpperCase() && s.slice(1) === s.slice(1).toLowerCase();
    return allUp || allLow || title;
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\r$/,'');_o.push(detectCapitalUse(_s)?'true':'false');}
console.log(_o.join('\n'));