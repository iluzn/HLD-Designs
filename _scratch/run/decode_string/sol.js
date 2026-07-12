/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    const st = [];
    let cur = "", num = 0;
    for (const c of s) {
        if (c >= '0' && c <= '9') num = num * 10 + (+c);
        else if (c === '[') { st.push([cur, num]); cur = ""; num = 0; }
        else if (c === ']') { const [prev, k] = st.pop(); cur = prev + cur.repeat(k); }
        else cur += c;
    }
    return cur;
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\r$/,'');_o.push(String(decodeString(_s)));}
console.log(_o.join('\n'));