import { withBrowser } from './cdp.mjs';
await withBrowser(async (s) => {
  await s.navigate(`file://${process.cwd()}/index.html`);
  await s.setViewport(390, 844, true);
  await new Promise(r => setTimeout(r, 900));
  console.log(await s.eval(`JSON.stringify([...document.querySelectorAll('.eyebrow')].slice(0,4)
    .map(e=>({t:e.textContent.trim().slice(0,26), lines: Math.round(e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight))})))`));
  await s.screenshot(`${process.cwd()}/.shots/eyebrow.png`);
});
