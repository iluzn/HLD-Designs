const puppeteer = require('puppeteer');
const AC = ['import java.util.*;', 'class Solution {', '  public int[] twoSum(int[] nums, int target){', '    Map<Integer,Integer> m=new HashMap<>();', '    for(int i=0;i<nums.length;i++){', '      if(m.containsKey(target-nums[i])) return new int[]{m.get(target-nums[i]), i};', '      m.put(nums[i], i);', '    }', '    return new int[]{};', '  }', '}'].join('\n');

async function waitVerdict(p, ms) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const v = await p.evaluate(() => (document.querySelector('.lc-verdict') || {}).textContent || '');
    if (v && !/Judging|Running/.test(v)) return { v: v.trim(), t: ((Date.now() - t0) / 1000).toFixed(1) };
    await new Promise(r => setTimeout(r, 700));
  }
  return { v: 'TIMEOUT', t: (ms / 1000) };
}

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.goto('https://systemcraft.in/dsa/problem/two-sum', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3500));
  await p.evaluate(c => { document.querySelector('.CodeMirror').CodeMirror.setValue(c); }, AC);
  await p.click('#lc-submit');
  const r1 = await waitVerdict(p, 60000);
  console.log('SUBMIT(AC): "' + r1.v + '" in ' + r1.t + 's');
  const solved = await p.evaluate(() => !!document.querySelector('.lc-solved-badge'));
  console.log('solved badge:', solved);
  await p.evaluate(() => document.querySelector('.lc-ltab[data-ltab=submissions]').click());
  await new Promise(r => setTimeout(r, 500));
  console.log('submissions rows:', await p.evaluate(() => document.querySelectorAll('.lc-sub-row').length));

  const pr = await b.newPage();
  await pr.goto('https://systemcraft.in/profile', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1500));
  console.log('PROFILE:', JSON.stringify(await pr.evaluate(() => ({ hasHeat: !!document.querySelector('.pf-heat'), solved: (document.querySelector('.pf-stat b') || {}).textContent }))));
  await b.close();
})();
