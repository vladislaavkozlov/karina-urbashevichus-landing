import { withBrowser } from './cdp.mjs';
const url = `file://${process.cwd()}/index.html`;
await withBrowser(async (s) => {
  await s.navigate(url);
  await s.setViewport(1440, 900, false);
  await new Promise(r => setTimeout(r, 1000));
  const h = await s.eval(`document.body.scrollHeight`);
  await s.setViewport(1440, Math.min(h, 18000), false);
  await new Promise(r => setTimeout(r, 2000));
  await s.screenshot(`${process.cwd()}/.shots/desk-v2.png`);
  console.log('desktop height', h);
  // якорь: проверяем после полного завершения скролла
  await s.setViewport(1440, 900, false);
  await s.eval(`window.scrollTo(0,0)`);
  await new Promise(r => setTimeout(r, 400));
  await s.eval(`document.querySelector('.nav__cta').click()`);
  await new Promise(r => setTimeout(r, 2500));
  console.log('CTA anchor top:', await s.eval(`Math.round(document.getElementById('zapis').getBoundingClientRect().top)`));
});
