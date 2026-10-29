(() => {
  const landing=document.querySelector('#work.work-landing');
  if(!landing) return;
  const viewport=landing.closest('.section-viewport');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  let entrance=null;
  const stop=()=>{entrance?.progress(1).kill();entrance=null;landing.classList.remove('work-running');};
  function enter(){
    stop();
    if(reduced.matches||!window.gsap||window.portfolioScreenMotion===false) return;
    const fade=(target,at,stagger=0)=>entrance.fromTo(target,{opacity:0,y:12},{opacity:1,y:0,duration:.48,stagger,clearProps:'transform,opacity'},at);
    entrance=gsap.timeline({defaults:{ease:'power3.out'},onComplete:()=>landing.classList.add('work-running')});
    fade(landing.querySelector('.work-utility'),0);
    if(document.documentElement.lang!=='zh')fade(landing.querySelector('.work-landing-title'),.12);
    fade(landing.querySelectorAll('.work-hub-heading'),.22);
    fade(landing.querySelectorAll('.work-category-entry'),.32,.09);
    fade(landing.querySelector('.trust-root'),.36);
    fade(landing.querySelectorAll('.trust-branch'),.5,.1);
    entrance.fromTo(landing.querySelectorAll('.logic-path'),{strokeDasharray:100,strokeDashoffset:100},{strokeDashoffset:0,duration:.7,stagger:.07,clearProps:'strokeDasharray,strokeDashoffset'},.56);
    fade(landing.querySelector('.thinking-cta'),.72);
  }
  document.addEventListener('portfolio:sectionchange',event=>{
    if((event.detail.slide||event.detail.id)==='work')requestAnimationFrame(enter);else stop();
  });
  reduced.addEventListener('change',()=>{stop();if(!reduced.matches&&viewport.dataset.activeWorkSlide==='work')enter();});
  document.addEventListener('visibilitychange',()=>landing.classList.toggle('work-running',!document.hidden&&!reduced.matches&&viewport.dataset.activeWorkSlide==='work'&&!entrance?.isActive()));
  if(viewport.dataset.activeWorkSlide==='work')requestAnimationFrame(enter);
  addEventListener('pagehide',event=>{if(!event.persisted)stop();});
})();
