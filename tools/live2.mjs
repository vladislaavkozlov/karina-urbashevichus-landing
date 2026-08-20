import { withBrowser } from './cdp.mjs';
await withBrowser(async (s) => {
  await s.navigate('https://vladislaavkozlov.github.io/karina-urbashevichus-landing/');
  await s.setViewport(1440, 900, false);
  await new Promise(r => setTimeout(r, 2000));
  const h = await s.eval(`document.body.scrollHeight`);
  for (let y = 0; y < h; y += 700) { await s.eval(`window.scrollTo(0,${y})`); await new Promise(r => setTimeout(r, 120)); }
  await new Promise(r => setTimeout(r, 2500));
  console.log('images total:', await s.eval(`document.images.length`));
  console.log('broken after scroll:', await s.eval(`[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.currentSrc.split('/').pop()).join(',')||'нет'`));
  console.log('reviews on page:', await s.eval(`document.querySelectorAll('.rev').length`));
});
