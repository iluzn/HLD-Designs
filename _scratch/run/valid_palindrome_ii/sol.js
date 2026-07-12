/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    const isPal = (i, j) => {
        while (i < j) { if (s[i] !== s[j]) return false; i++; j--; }
        return true;
    };
    let i = 0, j = s.length - 1;
    while (i < j) {
        if (s[i] !== s[j]) return isPal(i + 1, j) || isPal(i, j - 1);
        i++; j--;
    }
    return true;
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\r$/,'');_o.push(validPalindrome(_s)?'true':'false');}
console.log(_o.join('\n'));