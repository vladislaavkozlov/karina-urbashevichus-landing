import { withBrowser } from './cdp.mjs';
await withBrowser(async (s) => {
  await s.navigate(`file://${process.cwd()}/index.html`);
  await s.setViewport(1440, 900, false);
  await new Promise(r => setTimeout(r, 1200));
  await s.screenshot(`${process.cwd()}/.shots/desk-eyebrow.png`);
  await s.eval(`document.getElementById('rezultaty').scrollIntoView()`);
  await new Promise(r => setTimeout(r, 1200));
  await s.screenshot(`${process.cwd()}/.shots/desk-eyebrow2.png`);
});
