(() => {
  const viewport = document.querySelector('.section-viewport');
  const order = ['home','work','wechat','rednote','rednote-notes','design','skills','contact'];
  const workSlides = ['work','wechat','rednote','rednote-notes','design'];
  const layers = order.map(id => viewport.querySelector(`[data-section="${id}"]`));
  const areas = layers.map(layer => layer.querySelector('.section-scroll-area'));
  const links = [...document.querySelectorAll('.sidebar-link')];
  const positions = order.map(() => 0);
  const mobile = matchMedia('(max-width:899px)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const hero = document.querySelector('#home');
  let active = 0, locked = false, pendingUrl = null, timeline = null;
  let accumulator = 0, lastWheel = 0, lastContentWheel = -Infinity, cooldown = 0, gestureGuard = false;
  const resolve = hash => {
    const id = hash.replace(/^#/, '');
    if (!id || id === 'about') return {index:0,target:hero};
    const target = document.getElementById(id);
    const owner = target?.closest('.section-layer');
    return owner ? {index:order.indexOf(owner.dataset.section),target} : null;
  };
  const publish = () => {
    const section = workSlides.includes(order[active]) ? 'work' : order[active];
    // Resume actions switch immediately, outside the reading-area crossfade.
    layers.forEach((layer,index)=>{
      const resumes=layer.querySelector('.hero-resume-actions');
      if(resumes)resumes.hidden=index!==active;
    });
    viewport.dataset.activeSection = section;
    viewport.dataset.activeWorkSlide = workSlides.includes(order[active]) ? order[active] : '';
    links.forEach(link => {
      const selected = link.hash === '#' + section;
      link.classList.toggle('active',selected);
      if (selected) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
    document.dispatchEvent(new CustomEvent('portfolio:sectionchange',{detail:{id:section,slide:order[active]}}));
  };
  const setVisible = (index, visible) => {
    layers[index].hidden = !visible;
    layers[index].inert = !visible;
    layers[index].setAttribute('aria-hidden',String(!visible));
  };
  const moveToAnchor = (index,target) => {
    if (target && target.id !== order[index]) {
      const area = areas[index];
      area.scrollTo({top:area.scrollTop + target.getBoundingClientRect().top - area.getBoundingClientRect().top,behavior:reduced.matches?'instant':'smooth'});
    }
  };
  const updateUrl = (target,source) => {
    const hash = '#' + target.id;
    if (source !== 'url' && location.hash !== hash) history.pushState(null,'',hash);
  };
  function navigateToSection(targetId,source='sidebar') {
    const destination = resolve(targetId);
    if (!destination || destination.index < 0) return false;
    if (locked) { if (source === 'url') pendingUrl = targetId; return false; }
    const {index,target} = destination;
    if (index === active) { updateUrl(target,source); moveToAnchor(index,target); return false; }
    const previous = active, direction = index > active ? 1 : -1;
    positions[previous] = areas[previous].scrollTop;
    locked = true; accumulator = 0;
    layers[previous].inert = true;
    setVisible(index,true);
    layers[index].inert = true;
    areas[index].scrollTop = positions[index];
    active = index; publish(); updateUrl(target,source);
    const finish = () => {
      setVisible(previous,false); setVisible(index,true);
      [layers[previous],layers[index]].forEach(layer => { layer.style.opacity=''; layer.style.transform=''; });
      locked = false; cooldown = performance.now() + 180; gestureGuard = true;
      moveToAnchor(index,target);
      if (source === 'sidebar' || source === 'keyboard') {
        const heading = layers[index].querySelector('h1,h2');
        if (heading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
      }
      if (pendingUrl !== null) { const next = pendingUrl; pendingUrl = null; navigateToSection(next,'url'); }
    };
    // Page fades are separate from the disabled component entrance effects.
    // Animate only the reading areas; the shared headers stay stationary.
    if(reduced.matches){finish();return true;}
    const outgoing=areas[previous],incoming=areas[index];
    const settle=()=>{
      outgoing.style.opacity='';incoming.style.opacity='';finish();
    };
    if(window.gsap){
      timeline=gsap.timeline({defaults:{ease:'power1.inOut'},onComplete:settle});
      timeline.to(outgoing,{opacity:0,duration:.24},0)
        .fromTo(incoming,{opacity:0},{opacity:1,duration:.24},0);
    }else if(incoming.animate){
      const fades=[
        outgoing.animate([{opacity:1},{opacity:0}],{duration:240,easing:'ease-in-out',fill:'both'}),
        incoming.animate([{opacity:0},{opacity:1}],{duration:240,easing:'ease-in-out',fill:'both'})
      ];
      let complete=false;
      const done=()=>{
        if(complete)return;complete=true;
        fades.forEach(fade=>fade.cancel());settle();
      };
      timeline={progress:()=>{done();return timeline;},kill:()=>{done();}};
      Promise.all(fades.map(fade=>fade.finished)).then(done,done);
    }else settle();
    return true;
  }
  const initial = resolve(location.hash) || {index:0,target:hero};
  active = initial.index;
  layers.forEach((_,index) => setVisible(index,index === active));
  publish();
  if (initial.target.id !== order[active]) requestAnimationFrame(() => moveToAnchor(active,initial.target));

  document.addEventListener('click',event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.hasAttribute('download') || link.target === '_blank') return;
    if (!resolve(link.hash)) return;
    event.preventDefault();
    navigateToSection(link.hash,'sidebar');
  });
  const handleUrl = () => navigateToSection(location.hash,'url');
  addEventListener('popstate',handleUrl);
  addEventListener('hashchange',handleUrl);

  viewport.addEventListener('wheel',event => {
    if ((mobile.matches && !workSlides.includes(order[active])) || event.ctrlKey || event.shiftKey || Math.abs(event.deltaX)>Math.abs(event.deltaY) || document.body.classList.contains('drawer-open') || document.querySelector('dialog[open],[aria-modal="true"]:not(dialog):not([hidden]),[popover]:popover-open')) return;
    const now = performance.now(), gap = now-lastWheel;
    lastWheel = now;
    if (locked || now < cooldown || (gestureGuard && gap < 180)) { event.preventDefault(); accumulator=0; return; }
    gestureGuard = false;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1);
    if (!delta) return;
    const reader=window.PortfolioReadingFlow;
    if(reader?.handles(order[active])){
      event.preventDefault();
      if(reader.scroll(order[active],delta)){accumulator=0;lastContentWheel=now;return;}
      // Read to the boundary, release the wheel, then start the next content step.
      if(now-lastContentWheel<180){accumulator=0;lastContentWheel=now;return;}
      if(gap>180||Math.sign(accumulator)!==Math.sign(delta))accumulator=0;
      accumulator+=delta;
      if(Math.abs(accumulator)<60)return;
      accumulator=0;
      if(reader.advance(order[active],delta>0?1:-1)){
        cooldown=now+180;gestureGuard=true;
      }else{
        const next=active+(delta>0?1:-1);
        if(next>=0&&next<order.length)navigateToSection(order[next],'wheel');
      }
      return;
    }
    if (order[active] === 'design'  && window.portfolioDesignAlbum) {
      const album=layers[active].querySelector('.dp-album'), down=delta>0;
      const readingAreas=[event.target.closest('.dp-project-media'),...layers[active].querySelectorAll('.dp-project-media'),album].filter(Boolean);
      const readingArea=readingAreas.find(area=>area.scrollHeight>area.clientHeight+4&&(down?area.scrollTop+area.clientHeight<area.scrollHeight-4:area.scrollTop>4));
      if(readingArea){event.preventDefault();readingArea.scrollTop+=delta;accumulator=0;lastContentWheel=now;return;}
      event.preventDefault();
      if(now-lastContentWheel<180){accumulator=0;lastContentWheel=now;return;}
      if (gap > 180 || Math.sign(accumulator) !== Math.sign(delta)) accumulator=0;
      accumulator += delta;
      if (Math.abs(accumulator) >= 60) {
        accumulator=0;
        if (window.portfolioDesignAlbum.advance(delta>0?1:-1)) { cooldown=now+180; gestureGuard=true; }
        else navigateToSection(delta>0?'skills':'rednote-notes','wheel');
      }
      return;
    }
    if (order[active] === 'rednote-notes') {
      const selector = '.rn-wall-scroll';
      const wall = layers[active].querySelector(selector);
      const atTop = delta < 0 && wall.scrollTop <= 4;
      const atBottom = delta > 0 && wall.scrollTop + wall.clientHeight >= wall.scrollHeight - 4;
      if (atTop || atBottom) {
        event.preventDefault();
        // A fresh gesture at either reading edge moves to the adjacent Work page.
        if (now-lastContentWheel < 180) { accumulator=0; lastContentWheel=now; return; }
        if (gap > 180 || Math.sign(accumulator) !== Math.sign(delta)) accumulator=0;
        accumulator += delta;
        if (Math.abs(accumulator) >= 60) { accumulator=0; navigateToSection(atTop ? 'rednote' : 'design','wheel'); }
        return;
      }
      accumulator = 0; lastContentWheel = now;
      if (!event.target.closest(selector)) { event.preventDefault(); wall.scrollTop += delta; }
      return;
    }
    const area = areas[active], down = delta > 0;
    const canRead = area.scrollHeight > area.clientHeight+4 && (down ? area.scrollTop+area.clientHeight < area.scrollHeight-4 : area.scrollTop>4);
    if (canRead) { accumulator=0; lastContentWheel=now; return; }
    event.preventDefault();
    // Reaching an edge within the same gesture never navigates away.
    if (now-lastContentWheel < 180) { accumulator=0; lastContentWheel=now; return; }
    if (gap > 180 || Math.sign(accumulator) !== Math.sign(delta)) accumulator=0;
    accumulator += delta;
    if (Math.abs(accumulator) < 60) return;
    const next = active + (down?1:-1);
    accumulator=0;
    if (next >= 0 && next < order.length) navigateToSection(order[next],'wheel');
  },{passive:false});
  addEventListener('keydown',event => {
    if (document.body.classList.contains('thinking-modal-open') || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input,textarea,select,[contenteditable],[role="dialog"]') || document.body.classList.contains('drawer-open')) return;
    const reader=window.PortfolioReadingFlow;
    if(reader?.handles(order[active])&&['ArrowDown','ArrowUp','PageDown','PageUp'].includes(event.key)){
      event.preventDefault();
      if(locked||performance.now()<cooldown)return;
      const direction=['ArrowDown','PageDown'].includes(event.key)?1:-1;
      const delta=direction*(event.key.startsWith('Page')?areas[active].clientHeight*.85:48);
      if(reader.scroll(order[active],delta))return;
      if(reader.advance(order[active],direction)){cooldown=performance.now()+180;return;}
      const next=active+direction;
      if(next>=0&&next<order.length)navigateToSection(order[next],'keyboard');
      return;
    }
    if (order[active] === 'design' && window.portfolioDesignAlbum && ['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(event.key)) {
      event.preventDefault();
      if (event.key === 'Home' || event.key === 'End') window.portfolioDesignAlbum.setPage(event.key === 'End');
      else {
        const down=['ArrowDown','PageDown'].includes(event.key);
        if (!window.portfolioDesignAlbum.advance(down?1:-1)) navigateToSection(down?'skills':'rednote-notes','keyboard');
      }
      return;
    }
    if (order[active] === 'rednote-notes' && ['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(event.key)) {
      event.preventDefault();
      const wall = layers[active].querySelector('.rn-wall-scroll');
      if (event.key === 'Home') wall.scrollTop = 0;
      else if (event.key === 'End') wall.scrollTop = wall.scrollHeight;
      else wall.scrollTop += (['ArrowUp','PageUp'].includes(event.key) ? -1 : 1) * (event.key.startsWith('Page') ? wall.clientHeight * .85 : 48);
      return;
    }
    let next;
    if (['ArrowDown','PageDown'].includes(event.key)) next=active+1;
    else if (['ArrowUp','PageUp'].includes(event.key)) next=active-1;
    else if (event.key === 'Home') next=0;
    else if (event.key === 'End') next=order.length-1;
    else return;
    event.preventDefault();
    if (next>=0 && next<order.length) navigateToSection(order[next],'keyboard');
  });

  // Touch navigation shares the same section controller and transition lock.
  // Only a swipe that begins at the reading edge changes the Work slide.
  let swipe = null;
  viewport.addEventListener('touchstart',event=>{
    if (order[active] === 'rednote-notes') { swipe=null; return; }
    if (event.touches.length!==1 || !workSlides.includes(order[active]) || locked || document.body.classList.contains('drawer-open')) { swipe=null; return; }
    const area=areas[active], point=event.touches[0];
    if (order[active] === 'design' && window.portfolioDesignAlbum) { swipe={x:point.clientX,y:point.clientY,index:active,design:true}; return; }
    swipe={x:point.clientX,y:point.clientY,index:active,up:area.scrollTop<=4,down:area.scrollTop+area.clientHeight>=area.scrollHeight-4};
  },{passive:true});
  viewport.addEventListener('touchend',event=>{
    if (!swipe || !event.changedTouches.length) return;
    const start=swipe; swipe=null;
    const point=event.changedTouches[0], dy=start.y-point.clientY, dx=start.x-point.clientX;
    if (locked || active!==start.index || performance.now()<cooldown || Math.abs(dy)<55 || Math.abs(dy)<Math.abs(dx)*1.4) return;
    if (start.design) {
      event.preventDefault();
      if (window.portfolioDesignAlbum.advance(dy>0?1:-1)) { cooldown=performance.now()+180; gestureGuard=true; }
      else navigateToSection(dy>0?'skills':'rednote-notes','touch');
      return;
    }
    if (dy>0 ? !start.down : !start.up) return;
    const next=active+(dy>0?1:-1);
    if (next>=0 && next<order.length) { event.preventDefault(); navigateToSection(order[next],'touch'); }
  },{passive:false});
  viewport.addEventListener('touchcancel',()=>{swipe=null;},{passive:true});
  document.addEventListener('portfolio:localechange',()=>{if(document.documentElement.lang==='zh'&&locked)timeline?.progress(1).kill();});
  addEventListener('pagehide',event=>{if (!event.persisted) { timeline?.kill(); }});
})();
