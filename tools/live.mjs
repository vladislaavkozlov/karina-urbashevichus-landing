import { withBrowser } from './cdp.mjs';
await withBrowser(async (s) => {
  await s.navigate('https://vladislaavkozlov.github.io/karina-urbashevichus-landing/');
  await s.setViewport(1440, 900, false);
  await new Promise(r => setTimeout(r, 3500));
  console.log('title:', await s.eval(`document.title`));
  console.log('broken:', await s.eval(`[...document.images].filter(i=>!i.complete||i.naturalWidth===0).length`));
  await s.screenshot(`${process.cwd()}/.shots/live.png`);
});
