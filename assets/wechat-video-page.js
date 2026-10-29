(() => {
  const page = document.querySelector('#wechat');
  if (!page) return;
  const panel = page.querySelector('#wechat-videos');
  const selection = page.querySelector('.wechat-selection');
  const logic = page.querySelector('.wechat-logic');
  const player = panel.querySelector('video');
  const play = panel.querySelector('.wv-play');
  const switcher = panel.querySelector('.wv-switch');
  const status = panel.querySelector('.wv-playback-status');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const cases = [
    {
      id: 'lanzhou', title: 'AI & Computing Seminar at Lanzhou University',
      date: 'Event: 18 Apr 2026', source: 'https://weixin.qq.com/sph/AsM0rSxx9u',
      explanations: [
        { label: 'VIDEO FORMAT', title: 'Document the seminar with on-site footage',
          description: 'Document presentations and audience participation to show potential partners how the center works with universities.',
          decision: 'INDUSTRY RECOGNITION', icon: 'video' },
        { label: 'TEMPLATE DESIGN', title: 'Keep the center and event clearly identified',
          description: 'Keep the logo, event title, date, and venue in fixed positions so viewers can identify the organizer and follow the event.',
          decision: 'BRAND CREDIBILITY', icon: 'layout' }
      ]
    },
    {
      id: 'northwest-normal', title: 'Computing Service Workshop at Northwest Normal University',
      date: 'Event: 8 May 2026', source: 'https://weixin.qq.com/sph/AgOdBinTvo',
      explanations: [
        { label: 'VIDEO FORMAT', title: 'Record the event with a fast-paced edit',
          description: "Use quick cuts between speaker and audience footage to record the event and show potential partners the center's on-site participation.",
          decision: 'INDUSTRY RECOGNITION', icon: 'video' },
        { label: 'TEMPLATE DESIGN', title: 'Maintain a consistent identity across event videos',
          description: "Use the same blue layout and placement of event details so viewers can recognize the center across different university events.",
          decision: 'BRAND CREDIBILITY', icon: 'layout' }
      ]
    }
  ];
  let current = 0, generation = 0, motion = null;
  const asset = (item, extension) => `assets/work/wechat-videos/${item.id}.${extension}`;
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const icons = {
    video: '<rect x="3" y="6" width="24" height="22" rx="3"/><path d="m27 12 5-3v16l-5-3M12 12l9 5-9 5Z"/>',
    layout: '<rect x="4" y="3" width="26" height="28" rx="3"/><path d="M4 11h26M13 11v20M18 17h7m-7 6h7"/>'
  };

  function release() {
    generation++;
    player.pause();
    player.removeAttribute('src');
    player.preload = 'none';
    player.controls = false;
    player.load();
    play.hidden = false;
    play.disabled = false;
    play.querySelector('span').textContent = 'PLAY VIDEO';
    status.textContent = '';
    panel.querySelector('.wv-player-frame').setAttribute('aria-busy', 'false');
  }

  function renderAnalysis(item) {
    window.WeChatArticleAnalysis.reset(selection);
    logic.classList.add('wc-analysis-active');
    logic.querySelector('.wechat-logic-label').textContent = 'MY VIDEO STRATEGY';
    logic.querySelector('.wechat-logic-title').innerHTML = 'WHY THIS <em>VIDEO</em>';
    logic.querySelector('.wechat-logic-caption').textContent = 'How event videos support B2B communication and build brand trust.';
    const body = element('div', 'wv-analysis');
    item.explanations.forEach(explanation => {
      const card = element('section', 'wv-analysis-card');
      const heading = element('div', 'wv-card-heading');
      const icon = element('span', 'wv-card-icon');
      icon.innerHTML = `<svg viewBox="0 0 34 34" aria-hidden="true">${icons[explanation.icon]}</svg>`;
      heading.append(icon, element('p', 'wv-card-label', explanation.label));
      card.append(heading, element('h4', '', explanation.title), element('p', 'wv-card-description', explanation.description));
      const decision = element('p', 'wv-decision');
      decision.append(element('span', '', 'BUSINESS DECISION'), element('strong', '', explanation.decision));
      card.append(decision);
      body.append(card);
    });
    const footer = element('div', 'wv-trust');
    footer.innerHTML = '<svg class="wv-trust-arrow" fill="none" aria-hidden="true"><line x1="2" y1="14" x2="100%" y2="14"/><svg x="100%" y="0" width="1" height="28" overflow="visible"><path d="m-9 5 9 9-9 9"/></svg></svg><img src="assets/icons/trust-handshake-unified.svg" width="44" height="44" alt=""/><strong>BUILD TRUST</strong>';
    body.append(footer);
    selection.replaceChildren(body);
  }

  function render() {
    const item = cases[current], next = cases[(current + 1) % cases.length];
    window.PortfolioMedia.set(player,asset(item, 'webp'),'wechat','poster');
    player.setAttribute('aria-label', item.title);
    panel.querySelector('.wv-title').textContent = item.title;
    panel.querySelector('.wv-date').textContent = item.date;
    panel.querySelector('.wv-counter').textContent = `${String(current + 1).padStart(2, '0')} / 02`;
    panel.querySelector('.wv-original').href = item.source;
    window.PortfolioMedia.set(panel.querySelector('.wv-next img'),asset(next, 'webp'),'wechat');
    panel.querySelector('.wv-next strong').textContent = next.title;
    switcher.setAttribute('aria-label', `Switch video to ${next.title}`);
    play.setAttribute('aria-label', `Play ${item.title}`);
    renderAnalysis(item);
  }

  function show() {
    page.classList.add('wechat-video-mode');
    render();
  }

  function hide() {
    motion?.cancel();
    release();
    page.classList.remove('wechat-video-mode');
    logic.querySelector('.wechat-logic-label').textContent = 'MY CONTENT LOGIC';
    logic.querySelector('.wechat-logic-title').innerHTML = 'WHY THIS <em>CONTENT</em>';
  }

  async function start() {
    const token = ++generation;
    if (!player.getAttribute('src')) {
      player.src = asset(cases[current], 'mp4');
      player.preload = 'auto';
      player.load();
    }
    player.controls = true;
    play.hidden = true;
    status.textContent = 'Loading video…';
    panel.querySelector('.wv-player-frame').setAttribute('aria-busy', 'true');
    try {
      await player.play();
    } catch (error) {
      if (token !== generation || error.name === 'AbortError') return;
      play.hidden = false;
      play.querySelector('span').textContent = 'TRY AGAIN';
      status.textContent = 'Playback could not start. Try again or open the video on WeChat.';
      panel.querySelector('.wv-player-frame').setAttribute('aria-busy', 'false');
    }
  }

  play.addEventListener('click', start);
  switcher.addEventListener('click', () => {
    motion?.cancel();
    release();
    current = (current + 1) % cases.length;
    render();
    const body = selection.firstElementChild;
    if(window.portfolioScreenMotion!==false)motion = body.animate([{opacity: 0, transform: reduced.matches ? 'none' : 'translateY(5px)'}, {opacity: 1, transform: 'none'}], {duration: reduced.matches ? 120 : 220, easing: 'ease-out'});
  });
  player.addEventListener('playing', () => {
    status.textContent = '';
    play.hidden = true;
    panel.querySelector('.wv-player-frame').setAttribute('aria-busy', 'false');
  });
  player.addEventListener('waiting', () => {
    if (player.getAttribute('src') && !player.paused) status.textContent = 'Loading video…';
  });
  player.addEventListener('pause', () => {
    if (!player.error) status.textContent = '';
  });
  player.addEventListener('error', () => {
    if (!player.getAttribute('src')) return;
    status.textContent = 'The video could not load. Try again or open it on WeChat.';
    player.removeAttribute('src');
    play.hidden = false;
    play.querySelector('span').textContent = 'TRY AGAIN';
    panel.querySelector('.wv-player-frame').setAttribute('aria-busy', 'false');
  });
  // Native player shortcuts must not trigger the site's page navigation.
  player.addEventListener('keydown', event => event.stopPropagation());
  player.addEventListener('touchstart', event => event.stopPropagation(), {passive: true});
  player.addEventListener('touchend', event => event.stopPropagation(), {passive: true});
  document.addEventListener('portfolio:sectionchange', event => {
    if (event.detail.slide !== 'wechat') release();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) player.pause();
  });
  reduced.addEventListener('change', () => motion?.cancel());
  addEventListener('pagehide', () => { motion?.cancel(); release(); });
  window.WeChatVideoPage = {
    show,hide,count:cases.length,get current(){return current;},
    select:index=>{
      motion?.cancel();release();
      current=Math.max(0,Math.min(cases.length-1,index));render();
    }
  };
})();
