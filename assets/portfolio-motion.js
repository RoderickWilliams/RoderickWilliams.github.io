(() => {
 const gsap=window.gsap,viewport=document.querySelector('.section-viewport');
 if(!gsap||!viewport)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),owned=new Map();
 let entrance=null,galleryObserver=null,entryFrame=0;
 const activeSlide=()=>viewport.dataset.activeWorkSlide||viewport.dataset.activeSection;
 const visible=node=>node?.isConnected&&!node.closest('[hidden]');
 function finish(tween){if(tween)tween.progress(1).kill();}
 function stop(){finish(entrance);entrance=null;owned.forEach(finish);owned.clear();galleryObserver?.disconnect();galleryObserver=null;cancelAnimationFrame(entryFrame);}
 function one(node,from,to){
  if(!node||reduced.matches||document.hidden||!visible(node)||(window.portfolioScreenMotion===false&&node.matches('dialog')))return;
  finish(owned.get(node));
  const tween=gsap.fromTo(node,from,{...to,onComplete:()=>owned.delete(node)});
  owned.set(node,tween);
 }
 function draw(timeline,paths,at){
  paths.forEach(path=>{
   const length=path.getTotalLength();
   if(length)timeline.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:.65,ease:'power2.inOut',clearProps:'strokeDasharray,strokeDashoffset'},at);
  });
 }
 function projectCards(){
  if(activeSlide()!=='design'||reduced.matches||window.portfolioScreenMotion===false)return;
  const grid=document.querySelector('.dp-album-grid');
  if(!grid)return;
  finish(owned.get(grid));
  const cards=[...grid.children];
  const timeline=gsap.timeline({defaults:{ease:'power3.out'},onComplete:()=>owned.delete(grid)});
  cards.forEach((card,index)=>{
   const at=index*.07;
   timeline.fromTo(card.querySelector('.dp-project-media'),{opacity:.3,scale:.975},{opacity:1,scale:1,duration:.48,clearProps:'opacity,transform'},at)
    .fromTo(card.querySelector('.dp-project-brand'),{opacity:0},{opacity:1,duration:.24,clearProps:'opacity'},at+.16)
    .fromTo(card.querySelectorAll('.dp-project-caption,.dp-open-project'),{opacity:0,y:5},{opacity:1,y:0,duration:.3,stagger:.04,clearProps:'opacity,transform'},at+.2);
  });
  owned.set(grid,timeline);
 }
 function gallery(){
  const root=document.querySelector('.rn-wall-scroll');
  if(!root)return;
  galleryObserver?.disconnect();
  // Opacity leaves measured masonry heights and all stable hit areas untouched.
  galleryObserver=new IntersectionObserver(entries=>{
   if(!galleryObserver||activeSlide()!=='rednote-notes')return;
   entries.filter(entry=>entry.isIntersecting).forEach((entry,index)=>{
    galleryObserver.unobserve(entry.target);
    one(entry.target,{opacity:.35},{opacity:1,duration:.38,delay:Math.min(index,5)*.04,ease:'power2.out',clearProps:'opacity'});
   });
  },{root,threshold:.12});
  root.querySelectorAll('.rn-wall-card').forEach(card=>galleryObserver.observe(card));
 }
 function enter(slide){
  stop();if(reduced.matches||document.hidden||window.portfolioScreenMotion===false)return;
  const layer=viewport.querySelector(`[data-section="${slide}"]`);
  if(!layer||layer.hidden)return;
  // Hero, About, Work and WeChat retain their own animation owners.
  if(slide==='rednote'){
   entrance=gsap.timeline({defaults:{ease:'power3.out'}});
   if(document.documentElement.lang!=='zh')entrance.fromTo(layer.querySelector('.rn-title'),{opacity:.4,x:-10},{opacity:1,x:0,duration:.42,clearProps:'opacity,transform'},.1);
   entrance.fromTo(layer.querySelectorAll('.rn-account-heading,.rn-featured-heading'),{opacity:0},{opacity:1,duration:.36,stagger:.07,clearProps:'opacity'},.22);
   const visual=layer.querySelector('.rn-profile-shot');
   if(visual)entrance.fromTo(visual,{scale:.975},{scale:1,duration:.65,clearProps:'transform'},.2);
  }else if(slide==='rednote-notes')gallery();
  else if(slide==='design')projectCards();
  else if(slide==='skills'){
   entrance=gsap.timeline({defaults:{ease:'power3.out'}})
    .fromTo(layer.querySelector('.skills-object-scene'),{opacity:.45,y:12,scale:.985},{opacity:1,y:0,scale:1,duration:.65,clearProps:'opacity,transform'},.12)
    .fromTo(layer.querySelector('.skills-scene-decor'),{opacity:0},{opacity:1,duration:.65,clearProps:'opacity'},.28);
   draw(entrance,[...layer.querySelectorAll('.skills-unpack-hint path')],.4);
  }else if(slide==='contact'){
   entrance=gsap.timeline({defaults:{ease:'power3.out'}});
   const card=layer.querySelector('.contact-details');
   if(visible(card))entrance.fromTo(card,{opacity:.35,rotation:-1.2,scale:.975},{opacity:1,rotation:0,scale:1,duration:.65,clearProps:'opacity,transform'},.12);
   const heading=layer.querySelector('.contact-handline');
   if(visible(heading))entrance.fromTo(heading,{opacity:0,x:-8},{opacity:1,x:0,duration:.42,clearProps:'opacity,transform'},.18);
   draw(entrance,[...layer.querySelectorAll('.contact-underline path')],.32);
   const channels=[...layer.querySelectorAll('.contact-channel')].filter(visible);
   if(channels.length)entrance.fromTo(channels,{opacity:0},{opacity:1,duration:.35,stagger:.065,clearProps:'opacity'},.36);
  }
 }
 function section(event){cancelAnimationFrame(entryFrame);entryFrame=requestAnimationFrame(()=>enter(event.detail.slide||event.detail.id));}
 function interaction(event){
  if(reduced.matches||window.portfolioScreenMotion===false)return;
  const button=event.target.closest('[data-contact-view],[data-rn-view],[data-select-note],[data-note-detail-choice]');
  if(!button)return;
  requestAnimationFrame(()=>{
   const page=button.closest('.contact-page,.rn-page');
   const selector=button.matches('[data-contact-view]')?'[data-contact-panel]:not([hidden])':'.rn-case:not([hidden]) .rn-case-copy';
   page?.querySelectorAll(selector).forEach(node=>one(node,{opacity:.5},{opacity:1,duration:.3,ease:'power2.out',clearProps:'opacity'}));
  });
 }
 const popupSelector='.skills-object-popover,.rn-gallery-tooltip,.thinking-detail,.dp-viewer,.rn-preview';
 const popupObserver=new MutationObserver(records=>{
  const targets=new Set(records.map(record=>record.target).filter(node=>node.matches?.(popupSelector)));
  targets.forEach(node=>{
   const open=node.matches('dialog')?node.open:!node.hidden;
   if(!open){finish(owned.get(node));owned.delete(node);return;}
   const modal=node.matches('dialog');
   one(node,{opacity:.35,scale:modal?.975:.985},{opacity:1,scale:1,duration:modal?.32:.2,ease:'power3.out',clearProps:'opacity,transform'});
  });
 });
 popupObserver.observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden','open']});
 document.addEventListener('portfolio:sectionchange',section);
 document.addEventListener('portfolio:albumchange',projectCards);
 document.addEventListener('click',interaction);
 reduced.addEventListener('change',stop);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 // End the whole-scene Skills entrance before its independent hover interaction.
 document.querySelector('.skills-packed-contents')?.addEventListener('pointerover',()=>finish(entrance));
 requestAnimationFrame(()=>enter(activeSlide()));
 addEventListener('pagehide',event=>{
  if(event.persisted){stop();return;}
  stop();popupObserver.disconnect();document.removeEventListener('portfolio:sectionchange',section);document.removeEventListener('portfolio:albumchange',projectCards);document.removeEventListener('click',interaction);
 });
})();
