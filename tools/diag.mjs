import { withBrowser } from './cdp.mjs';
await withBrowser(async (s) => {
  await s.navigate(`file://${process.cwd()}/index.html`);
  await s.setViewport(390, 844, true);
  await new Promise(r => setTimeout(r, 1000));
  const out = await s.eval(`JSON.stringify([...document.querySelectorAll('*')]
    .map(e=>({t:e.tagName+'.'+(typeof e.className==='string'?e.className:''),r:Math.round(e.getBoundingClientRect().right),w:Math.round(e.getBoundingClientRect().width)}))
    .filter(o=>o.r>391).slice(0,12))`);
  console.log(out);
});
