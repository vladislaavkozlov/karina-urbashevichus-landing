import { withBrowser } from './cdp.mjs';
const url = `file://${process.cwd()}/index.html`;
await withBrowser(async (s) => {
  await s.navigate(url);
  await s.setViewport(390, 844, true);
  await new Promise(r => setTimeout(r, 1200));
  const info = await s.eval(`JSON.stringify({vw:document.documentElement.clientWidth, sw:document.documentElement.scrollWidth, over:[...document.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+1).slice(0,8).map(e=>e.tagName+'.'+e.className)})`);
  console.log('MOBILE:', info);
  const h = await s.eval(`document.body.scrollHeight`);
  await s.setViewport(390, Math.min(h, 16000), true);
  await new Promise(r => setTimeout(r, 1500));
  await s.screenshot(`${process.cwd()}/.shots/mob-real.png`);
  console.log('shot done, height', h);
});
