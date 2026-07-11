const puppeteer = require('puppeteer');
const AC = ['import java.util.*;', 'class Solution {', '  public int[] twoSum(int[] nums, int target){', '    Map<Integer,Integer> m=new HashMap<>();', '    for(int i=0;i<nums.length;i++){', '      if(m.containsKey(target-nums[i])) return new int[]{m.get(target-nums[i]), i};', '      m.put(nums[i], i);', '    }', '    return new int[]{};', '  }', '}'].join('\n');
const LOOP = ['import java.util.*;', 'class Solution {', '  public int[] twoSum(int[] nums, int target){ while(true){} }', '}'].join('\n');

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.goto('https://systemcraft.in/dsa/problem/two-sum', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3500));

  const init = await p.evaluate(() => ({
    defaultLang: document.getElementById('lc-lang').value,
    langCount: document.getElementById('lc-lang').options.length,
    tabs: Array.from(document.querySelectorAll('.lc-ltab')).map(t => t.textContent).join(','),
    topicsCollapsed: !document.querySelector('.lc-topics').open,
    sampleTabs: document.querySelectorAll('.lc-case-tab').length,
    editor: !!document.querySelector('.CodeMirror'),
  }));
  console.log('INIT:', JSON.stringify(init));

  // Submit accepted solution (default Java)
  await p.evaluate(c => { document.querySelector('.CodeMirror').CodeMirror.setValue(c); }, AC);
  await p.click('#lc-submit');
  await new Promise(r => setTimeout(r, 16000));
  const v1 = await p.evaluate(() => (document.querySelector('.lc-verdict') || {}).textContent.trim());
  console.log('SUBMIT(AC):', v1);
  const solvedBadge = await p.evaluate(() => !!document.querySelector('.lc-solved-badge'));
  console.log('solved badge:', solvedBadge);

  // Submissions tab
  await p.evaluate(() => { document.querySelector('.lc-ltab[data-ltab=submissions]').click(); });
  await new Promise(r => setTimeout(r, 400));
  const subCount = await p.evaluate(() => document.querySelectorAll('.lc-sub-row').length);
  console.log('submissions rows:', subCount);

  // TLE
  await p.evaluate(() => { document.querySelector('.lc-ltab[data-ltab=description]').click(); });
  await p.evaluate(c => { document.querySelector('.CodeMirror').CodeMirror.setValue(c); }, LOOP);
  await p.click('#lc-run');
  await new Promise(r => setTimeout(r, 16000));
  const v2 = await p.evaluate(() => (document.querySelector('.lc-verdict') || {}).textContent.trim());
  console.log('RUN(loop):', v2);

  // Profile heatmap
  const pr = await b.newPage();
  await pr.goto('https://systemcraft.in/profile', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1500));
  const prof = await pr.evaluate(() => ({ hasHeat: !!document.querySelector('.pf-heat'), stats: document.querySelectorAll('.pf-stat').length, solved: (document.querySelector('.pf-stat b') || {}).textContent }));
  console.log('PROFILE:', JSON.stringify(prof));
  await b.close();
})();
