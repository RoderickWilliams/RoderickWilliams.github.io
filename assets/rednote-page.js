(() => {
  const page = document.querySelector('.rn-page');
  const content = window.rednoteContent;
  if (!page || !content) return;
  const area = page.closest('.section-scroll-area');
  const gallery = document.querySelector('#rednote-notes');
  const galleryArea = gallery.closest('.section-scroll-area');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.querySelector('.rn-preview');
  let account = content.accounts[0];
  let tween;
  let opener;
  let overviewView = 'account';
  let selectedNote = 0;
  let accountDetail = 'audience';
  let noteDetail = 'topic';
  page.classList.add('rn-reader-page');
  // Preserve field identifiers before the locale adapter translates their labels.
  page.querySelectorAll('.rn-account-copy dt').forEach(dt=>{
    if(!dt.dataset.accountField)dt.dataset.accountField=dt.textContent.trim().toLowerCase();
  });
  const applyOverviewView = () => {
    const paged = page.classList.contains('rn-paged-overview');
    page.querySelector('.rn-account-panel').hidden = paged && overviewView !== 'account';
    page.querySelector('.rn-featured').hidden = paged && overviewView === 'account';
    if (paged && overviewView.startsWith('note')) selectedNote = Number(overviewView.slice(4)) - 1;
    page.querySelectorAll('.rn-case').forEach((item,index) => { item.hidden = index !== selectedNote; });
    page.classList.toggle('rn-narrow-reader',area.clientWidth < 600);
    page.querySelectorAll('.rn-case').forEach(item => { item.dataset.noteDetail = noteDetail; });
    page.querySelectorAll('[data-note-detail-choice]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.noteDetailChoice === noteDetail)));
    page.querySelectorAll('[data-select-note]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.selectNote) === selectedNote)));
    const compactDetails = area.clientWidth < 600 || area.clientHeight < 650;
    page.classList.toggle('rn-detail-views', compactDetails);
    page.querySelectorAll('.rn-account-copy dt').forEach(dt => { const key = dt.dataset.accountField || dt.textContent.toLowerCase(); dt.hidden = compactDetails && key !== accountDetail; dt.nextElementSibling.hidden = dt.hidden; });
    page.querySelectorAll('[data-account-detail]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.accountDetail === accountDetail)));
    page.querySelectorAll('[data-rn-view]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.rnView === overviewView)));
  };
  page.querySelectorAll('[data-rn-view]').forEach(button => button.addEventListener('click',() => { overviewView = button.dataset.rnView; applyOverviewView(); }));
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const cover = note => {
    const element = make('div', `rn-cover rn-${note.theme} rn-${note.ratio}`);
    if (note.coverText) element.append(make('strong', '', note.coverText));
    if (note.real) element.classList.add('rn-real-cover');
    if (note.sourcePanel) {
      element.classList.add('rn-source-panel');
      element.style.setProperty('--rn-panel-width', `${100 / note.panelWidth}%`);
      element.style.setProperty('--rn-panel-ratio', note.panelRatio);
    }
    if (note.image) {
      if (note.sourcePanel) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('viewBox', `0 0 ${note.panelRatio} 1`);
        svg.setAttribute('role','img');
        svg.setAttribute('aria-label',note.title);
        svg.setAttribute('preserveAspectRatio','xMidYMid meet');
        const picture = document.createElementNS(svg.namespaceURI,'image');
        picture.setAttribute('href',note.image);
        picture.setAttribute('width',note.panelRatio / note.panelWidth);
        picture.setAttribute('height','1');
        svg.append(picture);
        element.append(svg);
      } else {
        const image = make('img'); image.src = note.image; image.alt = note.title;
        image.loading = 'lazy'; image.decoding = 'async'; element.append(image);
      }
    }
    return element;
  };
  const preview = (title, visual, trigger) => {
    opener = trigger;
    dialog.querySelector('h2').textContent = title;
    dialog.querySelector('.rn-preview-body').replaceChildren(visual);
    dialog.showModal();
  };
  const action = (className, text, url, callback) => {
    const element = make(url ? 'a' : 'button', className, text);
    if (url) {
      element.href = url;
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    } else {
      element.type = 'button';
      element.addEventListener('click', () => callback(element));
    }
    return element;
  };
  const openNote = (note, trigger) => preview(note.title, cover(note), trigger);
  const group = (label, heading, body) => {
    const element = make('div', 'rn-analysis-group');
    element.append(make('h4', '', label), make('strong', '', heading), make('p', '', body));
    return element;
  };
  const icons = {
    likes: 'M12 20 3 11C-2 4 7 0 12 6c5-6 14-2 9 5Z',
    saves: 'M6 3h12v18l-6-4-6 4Z',
    comments: 'M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z'
  };
  const metric = (kind, number, real = false) => {
    const span = make('span');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', icons[kind]);
    svg.append(path);
    span.setAttribute('aria-label', `${number} ${kind}, ${real ? 'recorded engagement' : 'sample data'}`);
    span.append(svg, document.createTextNode(number.toLocaleString('en-US')));
    return span;
  };
  const featuredNotes = content.notes.filter(note => note.featured).sort((a,b) => a.account.localeCompare(b.account));
  const noteSelector = make('nav','rn-note-selector');
  noteSelector.setAttribute('aria-label','Select a post to read');
  featuredNotes.forEach((note,index) => {
    const button = make('button','rn-note-choice'); button.type = 'button';
    button.dataset.selectNote = index; button.setAttribute('aria-pressed',String(index === selectedNote));
    button.setAttribute('aria-controls',`rn-case-${note.account}`);
    button.append(make('span','',`Account ${note.account} · ${content.accounts.find(item => item.id === note.account).name}`),make('strong','',note.title));
    button.addEventListener('click',()=>{ selectedNote = index; overviewView = `note${index + 1}`; applyOverviewView(); });
    noteSelector.append(button);
  });
  page.querySelector('.rn-featured-heading').after(noteSelector);
  featuredNotes.forEach(note => {
    const article = make('article', 'rn-case');
    article.id = `rn-case-${note.account}`;
    const media = make('div', 'rn-case-media');
    const visualLink = action('rn-cover-button', undefined, note.url, trigger => openNote(note, trigger));
    if (note.real) visualLink.classList.add('rn-image-frame');
    if (note.sourcePanel) visualLink.style.aspectRatio = note.panelRatio;
    visualLink.setAttribute('aria-label', `${note.title}: ${note.url ? 'open original post' : 'preview placeholder post'}`);
    visualLink.append(cover(note));
    media.append(visualLink);
    if (note.real) {
      const metrics = make('div', 'rn-case-metrics');
      ['likes', 'saves', 'comments'].forEach(kind => metrics.append(metric(kind, note[kind], true)));
      media.append(metrics);
    }

    const heading = make('header', 'rn-note-heading');
    const titleBlock = make('div', 'rn-note-title-block');
    titleBlock.append(make('span', 'rn-label', note.displayMeta), make('h3', '', note.title));
    heading.append(titleBlock, action('rn-note-link', "VIEW ORIGINAL POST ↗", note.url, trigger => openNote(note, trigger)));
    const copy = make('div', 'rn-case-copy');
    copy.append(group("01 · TOPIC ANALYSIS", note.why, note.whyDetail), group('02 · POST DESIGN', note.design, note.designDetail));
    const decisions = make('footer', 'rn-decision-band');
    const tags = make('div', 'rn-decision-tags');
    note.decisions.forEach(decision => tags.append(make('span', '', decision)));
    const decisionCopy = make('div', 'rn-decision-copy');
    decisionCopy.append(make('h4', '', 'USER DECISION FACTORS'), tags, make('p', '', note.reason));
    decisions.append(decisionCopy);
    const main = make('div','rn-case-main'); main.append(media,copy);
    const detailControls = make('nav','rn-note-step-controls');
    detailControls.setAttribute('aria-label','Post analysis sections');
    [['topic',"Topic Analysis"],['design',"Post Design"],['decision',"Decision Factors"]].forEach(([key,label])=>{ const button=make('button','',label);button.type='button';button.dataset.noteDetailChoice=key;button.addEventListener('click',()=>{noteDetail=key;applyOverviewView();});detailControls.append(button); });
    article.append(heading, detailControls, main, decisions);
    page.querySelector('.rn-featured').append(article);
  });
  const galleryScroll = gallery.querySelector('.rn-wall-scroll');
  const tooltip = make('div', 'rn-gallery-tooltip');
  tooltip.id = 'rn-gallery-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.hidden = true;
  gallery.append(tooltip);
  let tooltipCard;
  let tooltipTimer;
  const hideTooltip = () => {
    clearTimeout(tooltipTimer);
    tooltip.hidden = true;
    tooltipCard?.removeAttribute('aria-describedby');
    tooltipCard = null;
  };
  const showTooltip = (note, card) => {
    hideTooltip();
    tooltipCard = card;
    const counts = make('div', 'rn-tooltip-metrics');
    ['likes', 'saves', 'comments'].forEach(kind => counts.append(metric(kind, note[kind], Boolean(note.real))));
    tooltip.replaceChildren(make('h3', '', note.title), counts);
    if (!note.real) tooltip.append(make('p', 'rn-tooltip-sample', 'Sample content · Original link pending'));
    tooltip.hidden = false;
    card.setAttribute('aria-describedby', tooltip.id);
    const pageBox = gallery.getBoundingClientRect();
    const cardBox = card.getBoundingClientRect();
    const popup = tooltip.getBoundingClientRect();
    let left = cardBox.right - pageBox.left + 12;
    if (left + popup.width > pageBox.width - 16) left = cardBox.left - pageBox.left - popup.width - 12;
    left = Math.max(16, Math.min(left, pageBox.width - popup.width - 16));
    const top = Math.max(16, Math.min(cardBox.top - pageBox.top + 24, pageBox.height - popup.height - 16));
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  };
  const scheduleTooltipHide = () => {
    clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(() => {
      if (!tooltip.matches(':hover') && !tooltipCard?.matches(':hover,:focus')) hideTooltip();
    }, 120);
  };
  tooltip.addEventListener('pointerenter', () => clearTimeout(tooltipTimer));
  tooltip.addEventListener('pointerleave', scheduleTooltipHide);
  galleryScroll.addEventListener('scroll', hideTooltip, {passive: true});
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !tooltip.hidden) hideTooltip(); });
  const galleryNotes = [...new Map(content.notes.map(note => [note.noteId || note.url || note.id, note])).values()]
    .sort((a,b) => b.likes - a.likes);
  galleryNotes.forEach(note => {
    const card = action('rn-wall-card', undefined, note.url, trigger => openNote(note, trigger));
    if (note.real) card.classList.add('rn-image-frame');
    card.dataset.account = note.account;
    card.dataset.noteId = note.noteId || note.id;
    card.setAttribute('aria-label', `${note.title}; ${note.likes} likes, ${note.saves} saves, ${note.comments} comments. ${note.real ? 'Recorded engagement.' : 'Sample data.'} ${note.url ? 'Open original post' : 'Preview placeholder post'}.`);
    const visual = make('div', 'rn-wall-cover');
    visual.append(cover(note));
    if (!note.real) visual.append(make('span', 'rn-wall-sample', 'SAMPLE'));
    card.append(visual);
    card.addEventListener('pointerenter', () => showTooltip(note, card));
    card.addEventListener('pointerleave', scheduleTooltipHide);
    card.addEventListener('focus', () => showTooltip(note, card));
    card.addEventListener('blur', scheduleTooltipHide);
    card.addEventListener('click', hideTooltip);
    gallery.querySelector('.rn-wall').append(card);
  });
  const layoutWall = () => {
    const wall = gallery.querySelector('.rn-wall');
    if (!wall.clientWidth) return;
    const style = getComputedStyle(wall);
    const row = parseFloat(style.gridAutoRows);
    const gap = parseFloat(style.rowGap);
    const spans = [...wall.children].map(card => [card, Math.ceil((card.getBoundingClientRect().height + gap) / (row + gap))]);
    spans.forEach(([card, span]) => { card.style.gridRowEnd = `span ${span}`; });
  };
  page.querySelector('.rn-featured-heading h2').textContent = "FEATURED POSTS";
  page.querySelector('.rn-featured-heading .rn-demo').textContent = '2 CASE STUDIES';
  const detailTabs = make('nav','rn-account-detail-tabs');
  detailTabs.setAttribute('aria-label','Account strategy detail');
  ['audience','approach','framework'].forEach(key=>{
    const button=make('button','',key[0].toUpperCase()+key.slice(1)); button.type='button';
    button.dataset.accountDetail=key;
    button.addEventListener('click',()=>{accountDetail=key;applyOverviewView();});
    detailTabs.append(button);
  });
  page.querySelector('.rn-account-copy dl').before(detailTabs);
  const profileShot = page.querySelector('.rn-profile-shot');
  const originalProfile = profileShot.innerHTML;
  const profileControls = [...page.querySelectorAll('[data-open-profile]')];
  const openProfile = trigger => {
    if (account.profileUrl) window.open(account.profileUrl, '_blank', 'noopener,noreferrer');
    else preview(`${account.name} · Demo profile`, profileShot.cloneNode(true), trigger);
  };
  profileControls.forEach(control => control.addEventListener('click', () => openProfile(control)));
  const selectAccount = id => {
    account = content.accounts.find(item => item.id === id) || account;
    page.querySelectorAll('.rn-account-button').forEach(button => {
      const selected = button.dataset.account === account.id;
      button.setAttribute('aria-pressed', String(selected));
      button.querySelector('strong').textContent = content.accounts.find(item => item.id === button.dataset.account)?.name || button.querySelector('strong').textContent;
      button.querySelector('small').textContent = selected ? "CURRENT ACCOUNT" : '⇄ SWITCH ACCOUNT';
    });
    for (const key of ['positioning', 'audience', 'approach', 'framework']) page.querySelector(`[data-${key}]`).textContent = account[key];
    page.querySelector('[data-account-status]').textContent = `${account.id} / 02 · ${account.name.toUpperCase()}${account.image ? '' : ' · DEMO'}`;
    page.querySelector('.rn-account-copy .rn-demo').textContent = account.descriptionLabel || 'ILLUSTRATIVE STRATEGY';
    profileControls[0].setAttribute('aria-label', `${account.profileUrl ? 'Open' : 'Preview'} ${account.name} profile`);
    profileShot.dataset.account = account.id;
    if (account.image) {
      const image = make('img');
      image.src = account.image;
      image.alt = `${account.name} profile screenshot`;
      image.decoding = 'async';
      profileShot.replaceChildren(image);
    } else {
      // This is fixed local placeholder markup, not imported account content.
      profileShot.innerHTML = originalProfile;
      profileShot.querySelector('[data-profile-name]').textContent = account.name;
      profileShot.querySelector('[data-profile-bio]').textContent = account.positioning;
      profileShot.querySelector('.rn-profile-banner').innerHTML = account.id === '01' ? 'EVERYDAY<br>GOOD IDEAS.' : 'CITY MOMENTS.<br>SHARED STORIES.';
      const samples = account.id === '01' ? ['SMALL CHANGES', 'SIMPLE IDEAS', 'A QUIET MORNING', 'GOOD HABITS', 'MAKE SPACE', 'EVERYDAY DETAILS'] : ['CITY WALKS', 'CAFE MOMENTS', 'WEEKEND STORIES', 'SUNSET SCENES', 'SHARED FEELINGS', 'LITTLE JOYS'];
      profileShot.querySelectorAll('.rn-mini-cover').forEach((element, index) => { element.textContent = samples[index]; });
      profileShot.querySelector('.rn-profile-stats').firstElementChild.textContent = account.id === '01' ? '120 Posts' : '96 Posts';
      profileShot.querySelector('.rn-profile-stats').children[1].textContent = account.id === '01' ? '8.6k Followers' : '5.2k Followers';
    }
    if (window.gsap && window.portfolioScreenMotion!==false) {
      tween?.kill();
      tween = window.gsap.fromTo(page.querySelector('.rn-account-body'), {opacity: reduced.matches ? 1 : .6}, {opacity: 1, duration: reduced.matches ? 0 : .25, overwrite: 'auto', clearProps: 'opacity'});
    }
  };
  page.querySelectorAll('.rn-account-button').forEach(button => button.addEventListener('click', () => selectAccount(button.dataset.account)));
  dialog.querySelector('.rn-preview-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus());
  const sizeIntro = () => {
    hideTooltip();
    if (area.clientHeight) {
      page.style.setProperty('--rn-screen-height', `${area.clientHeight}px`);
      page.classList.toggle('rn-paged-overview',area.clientWidth <= 1000 || area.clientHeight < 740);
      applyOverviewView();
      // If complete text still exceeds the available desktop height, keep it in switchable views.
      if (!page.classList.contains('rn-paged-overview') && page.querySelector('.rn-intro').scrollHeight > area.clientHeight + 2) {
        page.classList.add('rn-paged-overview');
        applyOverviewView();
      }
    }
    if (galleryArea.clientHeight) {
      gallery.style.setProperty('--rn-screen-height', `${galleryArea.clientHeight}px`);
      layoutWall();
    }
  };
  const observer = new ResizeObserver(sizeIntro);
  observer.observe(area);
  observer.observe(galleryArea);
  document.addEventListener('portfolio:sectionchange', event => {
    hideTooltip();
    if (['rednote', 'rednote-notes'].includes(event.detail.slide)) requestAnimationFrame(sizeIntro);
    if (dialog.open) dialog.close();
  });
  addEventListener('pagehide', () => tween?.kill());
  window.RednoteReader={
    state:()=>({accountIndex:content.accounts.indexOf(account),accountCount:content.accounts.length,
      selectedNote,noteCount:featuredNotes.length,accountDetail,noteDetail,
      details:page.classList.contains('rn-detail-views'),narrow:page.classList.contains('rn-narrow-reader')}),
    setAccount:(index,detail='audience')=>{
      accountDetail=detail;overviewView='account';
      selectAccount(content.accounts[Math.max(0,Math.min(content.accounts.length-1,index))].id);
      applyOverviewView();
    },
    setNote:(index,detail='topic')=>{
      selectedNote=Math.max(0,Math.min(featuredNotes.length-1,index));
      overviewView='note'+(selectedNote+1);noteDetail=detail;applyOverviewView();
    },
    setAccountDetail:key=>{accountDetail=key;applyOverviewView();},
    setNoteDetail:key=>{noteDetail=key;applyOverviewView();}
  };
  selectAccount(account.id);
  sizeIntro();
})();
