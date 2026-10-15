(function () {
  'use strict';
  const config = window.ENEM_BOX_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const progress = $('#scrollProgress');
  const mobileNav = $('#mobileNav');
  const mobileToggle = $('#mobileToggle');
  const mobileBuy = $('#mobileBuy');
  const previewDialog = $('#previewDialog');
  const setupDialog = $('#setupDialog');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  // Barra de rolagem e CTA fixo no celular
  let scrollScheduled = false;
  function onScroll() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0) + '%';
      const offer = $('#oferta');
      const footer = $('.footer');
      const offerVisible = offer?.getBoundingClientRect().top < window.innerHeight * .65 && offer?.getBoundingClientRect().bottom > 140;
      const footerVisible = footer?.getBoundingClientRect().top < window.innerHeight;
      mobileBuy.classList.toggle('visible', window.scrollY > 420 && !offerVisible && !footerVisible && mobileNav.hidden && !previewDialog.open && !setupDialog.open);
      scrollScheduled = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // Menu responsivo com estado acessível
  mobileToggle?.addEventListener('click', () => {
    const open = mobileToggle.getAttribute('aria-expanded') !== 'true';
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileNav.hidden = !open;
    document.body.classList.toggle('mobile-menu-open', open);
    mobileToggle.innerHTML = '<svg class="icon"><use href="#' + (open ? 'i-close' : 'i-menu') + '"/></svg>';
  });
  $$('#mobileNav a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true;
    document.body.classList.remove('mobile-menu-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Abrir menu');
    mobileToggle.innerHTML = '<svg class="icon"><use href="#i-menu"/></svg>';
  }));

  // Fechamento natural do menu no iPhone: toque fora, Escape e rotação.
  document.addEventListener('pointerdown', event => {
    if (!mobileNav.hidden && !mobileNav.contains(event.target) && !mobileToggle.contains(event.target)) {
      mobileNav.hidden = true;
      document.body.classList.remove('mobile-menu-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.setAttribute('aria-label', 'Abrir menu');
      mobileToggle.innerHTML = '<svg class="icon"><use href="#i-menu"/></svg>';
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) {
      mobileNav.hidden = true;
      document.body.classList.remove('mobile-menu-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.setAttribute('aria-label', 'Abrir menu');
      mobileToggle.innerHTML = '<svg class="icon"><use href="#i-menu"/></svg>';
      mobileToggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 950 && !mobileNav.hidden) {
      mobileNav.hidden = true;
      document.body.classList.remove('mobile-menu-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.innerHTML = '<svg class="icon"><use href="#i-menu"/></svg>';
    }
  }, {passive:true});

  // Revelação das seções ao entrar na tela
  if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
    }, { threshold: .07, rootMargin: '0px 0px -30px 0px' });
    $$('.reveal, .reveal-stagger').forEach(item => revealObserver.observe(item));
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $$('.desktop-nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-23% 0px -63% 0px' });
    $$('main section[id]').forEach(section => navObserver.observe(section));
  } else $$('.reveal, .reveal-stagger').forEach(item => item.classList.add('is-visible'));

  // Profundidade sutil no mockup (desativada para redução de movimento)
  if (!prefersReducedMotion.matches && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    $$('[data-tilt]').forEach(area => {
      const img = $('.box-preview-trigger', area);
      area.addEventListener('pointermove', e => {
        const r = area.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        img.style.transform = `rotateY(${x*4}deg) rotateX(${-y*3}deg)`;
      });
      area.addEventListener('pointerleave', () => { img.style.transform = ''; });
    });
  }

  // Prévia realista dos tipos de material — não é um aplicativo nem um PDF simulado.
  const modules = [
    { tag: 'MÓDULO 01 / MAPA', title: 'Meu Mapa', subtitle: 'Trilhas flexíveis para você escolher por onde começar.', color: '#6538ff', lines: ['30 minutos por dia', '60 minutos por dia', '90 minutos por dia'] },
    { tag: 'MÓDULO 02 / MISSÕES', title: '12 Envelopes', subtitle: '48 questões autorais para resolver antes de consultar as explicações.', color: '#00afd5', lines: ['Linguagens e Humanas', 'Matemática e Natureza', 'Gabarito comentado'] },
    { tag: 'MÓDULO 03 / REVISÃO', title: '12 Cartões', subtitle: 'Fichas para consultar conteúdos e dificuldades mais frequentes.', color: '#6d43fa', lines: ['Conceito essencial', 'Exemplo visual', 'Como praticar'] },
    { tag: 'MÓDULO 04 / REDAÇÃO', title: 'Redação Sem Travar', subtitle: '8 fichas com exercícios e exemplos de escrita.', color: '#ff811e', lines: ['Argumentação', 'Coesão textual', 'Proposta de intervenção'] },
    { tag: 'MÓDULO 05 / EXTRAS', title: 'Plano B + 2 Domingos', subtitle: 'Ajuste a rotina e organize seus preparativos para os dois dias de prova.', color: '#553afa', lines: ['Plano B', 'Checklist da prova', 'Caderno de evolução'] }
  ];
  let current = 0;
  function renderModule() {
    const m = modules[current];
    const card = document.createElement('div');
    card.className = 'demo-page';
    card.style.setProperty('--grad', `linear-gradient(110deg, ${m.color}, #00c3ea)`);
    const tag = document.createElement('span'); tag.className = 'demo-tag'; tag.textContent = m.tag;
    const title = document.createElement('h3'); title.textContent = m.title;
    const subtitle = document.createElement('p'); subtitle.textContent = m.subtitle;
    const checklist = document.createElement('div'); checklist.className = 'demo-items';
    m.lines.forEach(s => { const row = document.createElement('label'); row.textContent = s; checklist.append(row); });
    card.append(tag,title,subtitle,checklist);
    $('#previewSlide').replaceChildren(card);
    $('#previewCounter').textContent = `${current+1} de ${modules.length}`;
  }
  function openPreview() { current = 0; renderModule(); previewDialog.showModal(); document.body.classList.add('modal-open'); }
  $('#openPreview').addEventListener('click', openPreview);
  $('#previewMaterials').addEventListener('click', openPreview);
  $('#closePreview').addEventListener('click', () => previewDialog.close());
  $('#prevSlide').addEventListener('click', () => { current = (current + modules.length - 1) % modules.length; renderModule(); });
  $('#nextSlide').addEventListener('click', () => { current = (current + 1) % modules.length; renderModule(); });
  $('#previewToContent').addEventListener('click', () => previewDialog.close());
  [previewDialog, setupDialog].forEach(dialog => {
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); onScroll(); });
  });

  // Checkout só será aberto se o vendedor adicionar o endereço verdadeiro.
  function goToCheckout() {
    const url = String(config.CHECKOUT_URL || '').trim();
    if (url) {
      try {
        const parsed = new URL(url);
        if (['https:', 'http:'].includes(parsed.protocol)) {
          window.location.assign(parsed.href);
          return;
        }
      } catch (_) { /* permanece no modo demonstração */ }
    }
    setupDialog.showModal();
    document.body.classList.add('modal-open');
  }
  $$('.js-buy').forEach(el => el.addEventListener('click', goToCheckout));
  $('#closeSetup').addEventListener('click', () => setupDialog.close());
  $('#setupGotIt').addEventListener('click', () => setupDialog.close());

  // Dados comerciais publicados somente após preenchimento.
  const sellerInfo = $('#sellerInfo');
  if (config.SELLER_NAME && config.SUPPORT_EMAIL) {
    sellerInfo.textContent = `${config.SELLER_NAME}${config.SELLER_CNPJ ? ' • CNPJ: '+config.SELLER_CNPJ : ''} • Suporte: ${config.SUPPORT_EMAIL}`;
    if (config.TERMS_URL) { const link = document.createElement('a'); link.href = config.TERMS_URL; link.textContent = ' • Termos'; link.target = '_blank'; link.rel = 'noopener noreferrer'; sellerInfo.append(link); }
    if (config.PRIVACY_URL) { const link = document.createElement('a'); link.href = config.PRIVACY_URL; link.textContent = ' • Privacidade'; link.target = '_blank'; link.rel = 'noopener noreferrer'; sellerInfo.append(link); }
  }
})();
