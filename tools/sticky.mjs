import { withBrowser } from './cdp.mjs';
await withBrowser(async (s) => {
  await s.navigate(`file://${process.cwd()}/index.html`);
  await s.setViewport(390, 844, true);
  await new Promise(r => setTimeout(r, 900));
  const on = () => s.eval(`document.getElementById('stickyCta').classList.contains('is-on')`);
  console.log('на первом экране скрыта:', (await on()) === false);
  await s.eval(`window.scrollTo(0, 2500)`); await new Promise(r => setTimeout(r, 500));
  console.log('в середине показана:', await on());
  await s.screenshot(`${process.cwd()}/.shots/sticky-mid.png`);
  const zy = await s.eval(`Math.round(document.getElementById('zapis').offsetTop)`);
  await s.eval(`window.scrollTo({top:${zy - 300},behavior:'instant'})`); await new Promise(r => setTimeout(r, 900));
  console.log('у блока записи скрыта:', (await on()) === false, '| top =', await s.eval(`Math.round(document.getElementById('zapis').getBoundingClientRect().top)`));
  console.log('нет горизонтального скролла:', await s.eval(`document.body.scrollWidth === document.documentElement.clientWidth`));
  console.log('подсказка:', await s.eval(`document.getElementById('ctaHint').textContent.slice(0,42)`));
});
