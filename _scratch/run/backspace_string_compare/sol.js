/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
    const build = (x) => {
        const st = [];
        for (const c of x) {
            if (c === '#') { if (st.length) st.pop(); }
            else st.push(c);
        }
        return st.join('');
    };
    return build(s) === build(t);
};
const _l=require('fs').readFileSync(0,'utf8').split('\n');const _T=+_l[0];const _o=[];
for(let _i=0;_i<_T;_i++){const _s=(_l[1+2*_i]||'').replace(/\r$/,'');const _t=(_l[2+2*_i]||'').replace(/\r$/,'');_o.push(backspaceCompare(_s,_t)?'true':'false');}
console.log(_o.join('\n'));