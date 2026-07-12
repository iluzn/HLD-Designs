/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function(s) {
    const st = [0];
    for (const c of s) {
        if (c === '(') st.push(0);
        else {
            const v = st.pop();
            st[st.length - 1] += Math.max(2 * v, 1);
        }
    }
    return st[0];
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\r$/,'');_o.push(String(scoreOfParentheses(_s)));}
console.log(_o.join('\n'));