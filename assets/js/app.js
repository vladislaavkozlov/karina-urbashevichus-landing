/* Урбашевичус clinic - интерактив лендинга */

/* ------------------------------------------------------------------
   КОНТАКТЫ. Как только появятся номер и мессенджеры - впишите сюда,
   кнопки в финальном блоке соберутся сами в правильном приоритете:
   WhatsApp -> Instagram -> Telegram, телефон отдельной кнопкой.
   Пустая строка = канала нет, кнопка не показывается.
------------------------------------------------------------------- */
var CONTACTS = {
  whatsapp: '',                                   // '79991234567'
  phone: '',                                      // '+7 999 123-45-67'
  telegram: '',                                   // 'https://t.me/...'
  instagram: 'https://ig.me/m/dr.urbachevichus'
};

(function () {
  'use strict';

  /* --- шапка при скролле --- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    nav.classList.toggle('is-stuck', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- мобильное меню --- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var toggleMenu = function (open) {
    nav.classList.toggle('is-open', open);
    drawer.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', function () {
    toggleMenu(!drawer.classList.contains('is-open'));
  });
  drawer.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') toggleMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') toggleMenu(false);
  });

  /* --- появление блоков при скролле --- */
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }


  /* --- кнопки записи собираются из CONTACTS --- */
  var box = document.getElementById('ctaActions');
  if (box) {
    var acts = [];
    if (CONTACTS.whatsapp) {
      acts.push({ href: 'https://wa.me/' + CONTACTS.whatsapp.replace(/\D/g, '') + '?text=' +
        encodeURIComponent('Здравствуйте! Хочу записаться на консультацию к Карине'),
        label: 'Записаться в WhatsApp', main: true });
    }
    if (CONTACTS.instagram) {
      acts.push({ href: CONTACTS.instagram, label: acts.length ? 'Написать в Instagram' : 'Записаться на консультацию', main: !acts.length });
    }
    if (CONTACTS.telegram) acts.push({ href: CONTACTS.telegram, label: 'Написать в Telegram', main: false });
    if (CONTACTS.phone) acts.push({ href: 'tel:' + CONTACTS.phone.replace(/[^+\d]/g, ''), label: CONTACTS.phone, main: false });

    if (acts.length) {
      box.innerHTML = acts.map(function (a) {
        return '<a href="' + a.href + '"' + (a.href.indexOf('tel:') === 0 ? '' : ' target="_blank" rel="noopener"') +
          ' class="btn ' + (a.main ? 'btn--light' : 'btn--ghost') + '">' + a.label +
          (a.main ? ' <span class="arr">→</span>' : '') + '</a>';
      }).join('');
    }
  }

  /* --- слайдеры до/после --- */
  document.querySelectorAll('[data-ba]').forEach(function (ba) {
    var dragging = false;

    var set = function (pct) {
      pct = Math.max(0, Math.min(100, pct));
      ba.style.setProperty('--p', pct + '%');
      ba.setAttribute('aria-valuenow', Math.round(pct));
    };
    var fromEvent = function (e) {
      var r = ba.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      set((x / r.width) * 100);
    };

    ba.addEventListener('pointerdown', function (e) {
      dragging = true;
      ba.setPointerCapture(e.pointerId);
      fromEvent(e);
    });
    ba.addEventListener('pointermove', function (e) {
      if (dragging) { e.preventDefault(); fromEvent(e); }
    });
    ['pointerup', 'pointercancel'].forEach(function (ev) {
      ba.addEventListener(ev, function () { dragging = false; });
    });

    /* наведение мышью - подсказка о том, что элемент интерактивный */
    ba.addEventListener('mousemove', function (e) {
      if (!dragging && window.matchMedia('(hover:hover)').matches) fromEvent(e);
    });

    /* клавиатура */
    ba.addEventListener('keydown', function (e) {
      var cur = parseFloat(ba.style.getPropertyValue('--p')) || 50;
      if (e.key === 'ArrowLeft') { set(cur - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { set(cur + 4); e.preventDefault(); }
    });

    /* первое появление в экране - короткая демонстрация хода ползунка */
    if ('IntersectionObserver' in window) {
      var seen = false;
      var demo = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting || seen) return;
          seen = true;
          demo.unobserve(ba);
          var start = null, dur = 1400;
          var step = function (t) {
            if (!start) start = t;
            var k = Math.min((t - start) / dur, 1);
            var e2 = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
            set(50 + Math.sin(e2 * Math.PI * 2) * 22);
            if (k < 1) requestAnimationFrame(step);
          };
          setTimeout(function () { requestAnimationFrame(step); }, 260);
        });
      }, { threshold: 0.45 });
      demo.observe(ba);
    }
  });

  /* --- плавный переход по якорям с учётом высоты шапки --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var y = t.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 1024 ? 70 : 56);
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
