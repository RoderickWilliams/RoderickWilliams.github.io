(() => {
  const panel = document.querySelector('#about.about-panel');
  if (!panel) return;
  const data = JSON.parse(document.querySelector('#about-resume-data').textContent);
  const viewport = panel.closest('.section-viewport');
  const area = panel.closest('.section-scroll-area');
  const map = panel.querySelector('.experience-map');
  const path = panel.querySelector('.timeline-progress');
  const track = panel.querySelector('.timeline-track');
  const nodes = [...panel.querySelectorAll('.experience-node')];
  const buttons = [...panel.querySelectorAll('.experience-logo')];
  const cards = [...panel.querySelectorAll('.education-motion')];
  const hint = panel.querySelector('.experience-hint');
  const popover = panel.querySelector('.experience-popover');
  const closeButton = popover.querySelector('.popover-close');
  const detailContent = popover.querySelector('.popover-content');
  const cardSways = new Map();
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const touch = matchMedia('(hover:none)');
  let intro = null, pulse = null, selected = null, hasInteracted = false, hinted = false;
  let resizeFrame = 0, popoverAnimation = null, geometryKey = '';
  const isActive = () => viewport.dataset.activeSection === 'about';
  const byYear = year => nodes.find(node => Number(node.dataset.year) === year);
  const cancelHint = () => {
    hasInteracted = true;
    pulse?.kill(); pulse = null;
    const button = byYear(2022).querySelector('.experience-logo');
    if (window.gsap) gsap.set(button,{clearProps:'scale'});
  };
  function drawGeometry() {
    if (!isActive()) return;
    const width = map.clientWidth, height = map.clientHeight;
    const points = [2022,2024,2025,2026].map(year => {
      const style = getComputedStyle(byYear(year));
      return {x:parseFloat(style.left),y:parseFloat(style.top)};
    });
    const [a,b,c,d] = points;
    const curve = `M${a.x},${a.y} C${a.x},${a.y-65} ${b.x},${b.y+68} ${b.x},${b.y} C${b.x},${b.y-68} ${c.x},${c.y+68} ${c.x},${c.y} C${c.x},${c.y-80} ${d.x},${d.y+100} ${d.x},${d.y} L${d.x},${Math.max(8,d.y-42)}`;
    panel.querySelector('.experience-path').setAttribute('viewBox',`0 0 ${width} ${height}`);
    [track,path].forEach(p => p.setAttribute('d',curve));
    if (!intro?.isActive()) path.style.strokeDashoffset = '0';
    const bound = panel.querySelector('.education-bound');
    const base = bound.getBoundingClientRect();
    geometryKey = `${width},${height},${bound.clientWidth},${bound.clientHeight}`;
    const eyes = [...bound.querySelectorAll('.education-eyelet')].map(el => {
      const r = el.getBoundingClientRect();
      return {x:r.left+r.width/2-base.left,y:r.top+r.height/2-base.top};
    });
    const [e1,e2,e3] = eyes;
    const cord = `M${e1.x-5},${e1.y} C${e1.x-18},${e1.y-68} ${e1.x+12},${e1.y-65} ${e1.x+5},${e1.y} M${e2.x},${e2.y} C${e2.x+5},${e2.y+26} ${e3.x-9},${e3.y-26} ${e3.x},${e3.y}`;
    const svg = bound.querySelector('.education-binding svg');
    svg.setAttribute('viewBox',`0 0 ${base.width} ${base.height}`);
    svg.querySelectorAll('path').forEach(p => p.setAttribute('d',cord));
  }
  function firstVisitHint() {
    if (hinted || hasInteracted || reduced.matches || !window.gsap || !isActive()) return;
    hinted = true;
    pulse = gsap.timeline({delay:.25})
      .to(byYear(2022).querySelector('.experience-logo'),{scale:1.045,duration:.38,ease:'sine.inOut'})
      .to(byYear(2022).querySelector('.experience-logo'),{scale:1,duration:.38,ease:'sine.inOut'})
      .to(hint,{color:'#6e6252',duration:.25},0)
      .to(hint,{clearProps:'color',duration:.4},.7);
  }
  function enter() {
    if(window.portfolioScreenMotion===false){
      intro?.progress(1).kill();
      drawGeometry();
      if(!window.gsap||reduced.matches){path.style.strokeDashoffset='0';return;}
      // The career path is content motion, independent of page/title entrances.
      const length=path.getTotalLength();
      intro=gsap.timeline({defaults:{ease:'power3.out'},onComplete:firstVisitHint});
      intro.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},
        {strokeDashoffset:0,duration:1.5,ease:'power1.inOut'},.12);
      [2022,2024,2025,2026].forEach((year,index)=>{
        intro.fromTo(byYear(year),{opacity:0,scale:.82,y:8},
          {opacity:1,scale:1,y:0,duration:.42,clearProps:'transform,opacity'},.12+index*.35);
      });
      return;
    }
    intro?.progress(1).kill();
    drawGeometry();
    if (!window.gsap || reduced.matches) {
      path.style.strokeDashoffset = '0';
      return;
    }
    const length = path.getTotalLength();
    const titles = panel.querySelectorAll('.about-title>span');
    const labels = panel.querySelectorAll('.about-label,.experience-hint');
    const binding = panel.querySelector('.education-binding');
    const glow = panel.querySelector('.about-glow');
    const cardFaces = cards.map(card=>card.querySelector('.education-card'));
    const angles = cardFaces.map(card=>{
      const matrix=new DOMMatrix(getComputedStyle(card).transform);
      return Math.atan2(matrix.b,matrix.a)*180/Math.PI;
    });
    intro = gsap.timeline({defaults:{ease:'power3.out'},onComplete:firstVisitHint});
    if(document.documentElement.lang!=='zh')intro.fromTo(titles,{opacity:0,y:26,clipPath:'inset(100% 0 0 0)'},{opacity:1,y:0,clipPath:'inset(0%)',duration:.6,stagger:.1},.08);
    intro.fromTo(labels,{opacity:0,y:10},{opacity:1,y:0,duration:.45,stagger:.05},.24)
      .fromTo(binding,{opacity:0,scaleY:.85,transformOrigin:'top'},{opacity:1,scaleY:1,duration:.55},.34)
      .fromTo(cards,{opacity:0,y:22},{opacity:1,y:0,duration:.65,stagger:.1},.4)
      .fromTo(glow,{opacity:0,scale:.96},{opacity:1,scale:1,duration:1.1},.35)
      .fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:1.5,ease:'power1.inOut'},.3);
    cardFaces.forEach((card,index)=>intro.fromTo(card,{rotation:index===0?-6:4},{rotation:angles[index],duration:.65,clearProps:'transform'},.4+index*.1));
    [2022,2024,2025,2026].forEach((year,index) => {
      intro.fromTo(byYear(year),{opacity:0,scale:.82,y:8},{opacity:1,scale:1,y:0,duration:.42,clearProps:'transform,opacity'},.3+index*.35);
    });
  }
  function positionPopover() {
    if (!selected) return;
    const r = selected.getBoundingClientRect();
    const frame = viewport.getBoundingClientRect();
    const padding = 16;
    popover.style.width = `${Math.min(400,frame.width-padding*2)}px`;
    popover.style.maxHeight = `${Math.min(360,frame.height-padding*2)}px`;
    const w = popover.offsetWidth, h = popover.offsetHeight;
    const minX = frame.left+padding, maxX = frame.right-padding-w;
    const minY = frame.top+padding, maxY = frame.bottom-padding-h;
    let x = r.right+18;
    if (x+w > frame.right-padding) x = r.left-18-w;
    let y = r.top-20;
    if (y+h > frame.bottom-padding) y = r.bottom-h;
    if (frame.width < 560) { x = frame.left+(frame.width-w)/2; y = frame.bottom-h-padding; }
    popover.style.left = `${Math.max(minX,Math.min(x,maxX))}px`;
    popover.style.top = `${Math.max(minY,Math.min(y,maxY))}px`;
  }
  function closeDetails(restore=true, immediate=false) {
    if (!selected) return;
    const trigger = selected;
    selected = null;
    buttons.forEach(button => button.setAttribute('aria-expanded','false'));
    nodes.forEach(node => node.classList.remove('is-selected'));
    map.classList.remove('has-selection');
    popoverAnimation?.cancel();
    const finish = () => {
      if (selected) return;
      if (popover.matches(':popover-open')) popover.hidePopover();
      popover.hidden = true;
      if (restore && isActive()) trigger.focus({preventScroll:true});
    };
    if (immediate || reduced.matches || window.portfolioScreenMotion===false) finish();
    else {
      popoverAnimation = popover.animate([{opacity:1},{opacity:0}],{duration:160,easing:'ease-in',fill:'forwards'});
      popoverAnimation.finished.then(finish).catch(()=>{});
    }
  }
  function openDetails(button) {
    cancelHint();
    intro?.progress(1).kill();
    if (selected === button) { closeDetails(); return; }
    const item = data.experience.find(item => item.id === button.dataset.logo);
    popoverAnimation?.cancel();
    selected = button;
    nodes.forEach(node => node.classList.toggle('is-selected',node.contains(button)));
    buttons.forEach(other => other.setAttribute('aria-expanded',String(other===button)));
    map.classList.add('has-selection');
    popover.querySelector('.popover-brand img').src = `assets/about/logos/${item.logo}.svg`;
    popover.querySelector('.popover-brand img').alt = item.company;
    popover.querySelector('.popover-brand span').textContent = item.year;
    popover.querySelector('.popover-company').textContent = item.company;
    popover.querySelector('.popover-role').textContent = item.role;
    popover.querySelector('.popover-date').textContent = item.period;
    popover.querySelector('.popover-location').textContent = item.location;
    const list = popover.querySelector('.popover-bullets');
    list.replaceChildren(...item.bullets.map(text => {
      const li=document.createElement('li'); li.textContent=text; return li;
    }));
    popover.hidden=false;
    detailContent.scrollTop=0;
    if (!popover.matches(':popover-open')) popover.showPopover();
    positionPopover();
    if(window.portfolioScreenMotion!==false)popoverAnimation = popover.animate([{opacity:0},{opacity:1}],{duration:reduced.matches?120:240,easing:'ease-out'});
    closeButton.focus({preventScroll:true});
  }
  buttons.forEach(button => {
    button.addEventListener('pointerenter',cancelHint);
    button.addEventListener('focus',cancelHint);
    button.addEventListener('click',()=>openDetails(button));
  });
  closeButton.addEventListener('click',()=>closeDetails());
  document.addEventListener('pointerdown',event => {
    if (selected && !popover.contains(event.target) && !event.target.closest('.experience-logo')) closeDetails(false);
  });
  document.addEventListener('keydown',event => {
    if (event.key==='Escape' && selected) { event.preventDefault(); closeDetails(); }
  });
  // A wheel gesture inside the open detail reads its text, never switches sections.
  popover.addEventListener('wheel',event=>event.stopPropagation(),{passive:true});
  cards.forEach(card => {
    const face = card.querySelector('.education-card');
    let hovered = false;
    const play = () => {
      if (reduced.matches || !window.gsap || intro?.isActive() || cardSways.get(card)?.isActive()) return;
      const angle = Number(gsap.getProperty(face,'rotation'));
      cardSways.set(card,gsap.timeline({onComplete:()=>cardSways.delete(card)})
        .to(face,{rotation:angle+1.2,duration:.18,ease:'sine.out'})
        .to(face,{rotation:angle-.7,duration:.24,ease:'sine.inOut'})
        .to(face,{rotation:angle,duration:.2,ease:'sine.out',clearProps:'transform'}));
    };
    // Keep the hit area stationary and only sway once for each pointer entry.
    card.addEventListener('pointerenter',()=>{if (!hovered) {hovered=true;play();}});
    card.addEventListener('pointerleave',()=>{hovered=false;});
    card.addEventListener('focus',()=>{if (!hovered) play();});
  });
  const stopCardSways = () => {
    cardSways.forEach(sway=>sway.progress(1).kill());
    cardSways.clear();
  };
  document.addEventListener('portfolio:sectionchange',event => {
    if (event.detail.id==='about') requestAnimationFrame(enter);
    else { intro?.progress(1).kill(); pulse?.kill(); stopCardSways(); closeDetails(false,true); }
  });
  const updateHint = () => { hint.querySelector('span').textContent=touch.matches?'Tap a logo to explore my experience':'Click a logo to explore my experience'; };
  updateHint(); touch.addEventListener('change',updateHint);
  const resize = new ResizeObserver(()=>{
    cancelAnimationFrame(resizeFrame);
    resizeFrame=requestAnimationFrame(()=>{
      const bound=panel.querySelector('.education-bound');
      const key=`${map.clientWidth},${map.clientHeight},${bound.clientWidth},${bound.clientHeight}`;
      if (isActive() && key!==geometryKey) {
        if (intro?.isActive()) intro.progress(1).kill();
        drawGeometry();
      }
      positionPopover();
    });
  });
  resize.observe(map); resize.observe(panel.querySelector('.education-bound'));
  document.addEventListener('portfolio:localechange',()=>requestAnimationFrame(()=>{drawGeometry();positionPopover();}));
  area.addEventListener('scroll',positionPopover,{passive:true});
  reduced.addEventListener('change',()=>{
    intro?.progress(1).kill(); pulse?.kill();
    stopCardSways();
    cards.forEach(card=>window.gsap?.set(card,{y:0}));
    path.style.strokeDashoffset='0';
  });
  if (isActive()) requestAnimationFrame(enter);
  addEventListener('pagehide',event=>{
    if (event.persisted) return;
    intro?.kill(); pulse?.kill(); resize.disconnect(); cancelAnimationFrame(resizeFrame); popoverAnimation?.cancel();
    stopCardSways();
  });
})();
