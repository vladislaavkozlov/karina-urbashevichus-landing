import { withBrowser } from './cdp.mjs';
const url = `file://${process.cwd()}/index.html`;
await withBrowser(async (s) => {
  await s.navigate(url);
  await s.setViewport(390, 844, true);
  await new Promise(r => setTimeout(r, 900));
  // 1. бургер открывает меню
  await s.click('#burger');
  await new Promise(r => setTimeout(r, 700));
  console.log('drawer open:', await s.eval(`document.getElementById('drawer').classList.contains('is-open')`));
  await s.click('#burger');
  await new Promise(r => setTimeout(r, 600));
  console.log('drawer closed:', await s.eval(`!document.getElementById('drawer').classList.contains('is-open')`));
  // 2. слайдер: программно двигаем и проверяем clip
  console.log('slider set 20%:', await s.eval(`(()=>{const b=document.querySelector('[data-ba]');b.style.setProperty('--p','20%');return getComputedStyle(b.querySelector('.ba__after')).clipPath})()`));
  // 3. reveal-блоки становятся видимыми
  await s.eval(`window.scrollTo(0, 3000)`);
  await new Promise(r => setTimeout(r, 900));
  console.log('revealed:', await s.eval(`document.querySelectorAll('.rv.is-in').length + '/' + document.querySelectorAll('.rv').length`));
  // 4. якорь работает
  await s.eval(`document.querySelector('a[href="#zapis"]').click()`);
  await new Promise(r => setTimeout(r, 1400));
  console.log('scrolled to CTA:', await s.eval(`Math.round(document.getElementById('zapis').getBoundingClientRect().top)`));
  // 5. ошибки в консоли / битые картинки
  console.log('broken images:', await s.eval(`[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')).join(',')||'нет'`));
  console.log('fonts:', await s.eval(`document.fonts.check('300 40px "Cormorant Garamond"')`));
});
