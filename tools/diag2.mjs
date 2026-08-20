import { withBrowser } from './cdp.mjs';
await withBrowser(async (s) => {
  await s.navigate(`file://${process.cwd()}/index.html`);
  await s.setViewport(390, 844, true);
  await new Promise(r => setTimeout(r, 800));
  console.log(await s.eval(`JSON.stringify({
    icb: document.documentElement.clientWidth,
    bodyW: Math.round(document.body.getBoundingClientRect().width),
    navPos: getComputedStyle(document.getElementById('nav')).position,
    navW: Math.round(document.getElementById('nav').getBoundingClientRect().width),
    drawerW: Math.round(document.getElementById('drawer').getBoundingClientRect().width),
    links: [...document.querySelectorAll('#drawer a')].map(a=>a.textContent.trim()+':'+Math.round(a.getBoundingClientRect().width)),
    footW: Math.round(document.querySelector('.drawer__foot').getBoundingClientRect().width)
  })`));
});
