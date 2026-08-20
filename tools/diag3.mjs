import { withBrowser } from './cdp.mjs';
await withBrowser(async (s) => {
  await s.navigate(`file://${process.cwd()}/index.html`);
  await s.setViewport(390, 844, true);
  await new Promise(r => setTimeout(r, 800));
  console.log(await s.eval(`JSON.stringify({
    bodyScroll: document.body.scrollWidth,
    kids: [...document.body.children].map(e=>e.tagName+'.'+(typeof e.className==='string'?e.className.slice(0,18):'')+':'+e.scrollWidth),
    inMain: [...document.querySelectorAll('main *')].filter(e=>e.scrollWidth>391).slice(0,10).map(e=>e.tagName+'.'+(typeof e.className==='string'?e.className.slice(0,22):'')+':'+e.scrollWidth)
  })`));
});
