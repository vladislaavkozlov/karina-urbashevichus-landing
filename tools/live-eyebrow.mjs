import { withBrowser } from './cdp.mjs';
await withBrowser(async (s) => {
  await s.navigate('https://vladislaavkozlov.github.io/karina-urbashevichus-landing/');
  await s.setViewport(390, 844, true);
  await new Promise(r => setTimeout(r, 3000));
  console.log('линия по первой строке:', await s.eval(`getComputedStyle(document.querySelector('.eyebrow')).alignItems`));
  await s.screenshot(`${process.cwd()}/.shots/live-eyebrow.png`);
});
