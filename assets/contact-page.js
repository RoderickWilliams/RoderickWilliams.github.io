(() => {
  const page = document.querySelector('.contact-page');
  if (!page) return;
  const views = page.querySelector('.contact-view-toggle');
  const buttons = [...views.querySelectorAll('[data-contact-view]')];
  const panels = [...page.querySelectorAll('[data-contact-panel]')];
  let selected = 'intro';
  function layout() {
    const paged = page.clientWidth <= 720 || page.clientHeight < 530;
    page.classList.toggle('contact-paged', paged);
    views.hidden = !paged;
    panels.forEach(panel => { panel.hidden = paged && panel.dataset.contactPanel !== selected; });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.contactView === selected)));
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.contactView;
    layout();
  }));
  const observer = new ResizeObserver(() => { if (!page.closest('.section-layer').hidden) layout(); });
  observer.observe(page);
  document.addEventListener('portfolio:sectionchange', event => { if (event.detail.id === 'contact') layout(); });
  addEventListener('pagehide', event => { if (!event.persisted) observer.disconnect(); });
})();
