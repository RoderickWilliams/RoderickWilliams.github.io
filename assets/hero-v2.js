(() => {
  if (!window.gsap) return;
  const hero = document.querySelector('#home');
  const viewport = document.querySelector('.section-viewport');
  const select = gsap.utils.selector(hero);
  let introPlayed = false;
  gsap.matchMedia().add('(prefers-reduced-motion:no-preference)', () => {
    let intro;
    if (!introPlayed && viewport.dataset.activeSection === 'home' && window.portfolioScreenMotion!==false) {
      introPlayed = true;
      intro = gsap.timeline({defaults:{duration:.55,ease:'power3.out',clearProps:'transform,opacity,visibility,clipPath'}});
      intro.from('.sidebar-ambient',{opacity:0,duration:.55},0);
      if (matchMedia('(min-width:900px)').matches) {
        intro.from('.glass-sidebar',{x:-18,scale:.992,autoAlpha:0,duration:.7},.08)
          .from('.sidebar-brand',{x:-10,autoAlpha:0,duration:.46},.24)
          .from('.sidebar-link',{x:-10,autoAlpha:0,duration:.46,stagger:.05},.43)
          .from('.language-switch',{x:-10,autoAlpha:0,duration:.46},.68);
      }
      intro.from(viewport,{y:14,scale:.995,autoAlpha:0,duration:.75},.14)
        .from(select('.hero-category'),{y:-8,autoAlpha:0},.3)
        .from(select('.hero-portfolio'),{y:-8,scale:.98,autoAlpha:0},.36)
        .from(select('.hero-greeting'),{y:16,rotation:-6,autoAlpha:0,duration:.58},.56)
        .from(select('.hello-underline'),{scaleX:0,transformOrigin:'left center',duration:.46},.68)
        .from(select('.hello-sparks'),{opacity:0,duration:.4},.75)
        .from(select('.hero-word'),{y:26,opacity:0,clipPath:'inset(100% 0 0 0)',duration:.62,stagger:.11},.68)
        .from(select('.hero-statement-wrap'),{y:22,rotation:-3,scale:.96,opacity:0,duration:.62},1.03)
        .from(select('.hero-statement>svg'),{scaleX:0,transformOrigin:'left center',duration:.35},1.37)
        .from(select('.hero-visual'),{y:18,opacity:0,duration:.7},1.08);
    }
    const onSection = () => {
      // Leaving during the introduction settles it; returning uses the existing short section transition.
      if (viewport.dataset.activeSection !== 'home' && intro?.isActive()) intro.progress(1);
    };
    document.addEventListener('portfolio:sectionchange',onSection);
    return () => {
      document.removeEventListener('portfolio:sectionchange',onSection);
    };
  });
})();
