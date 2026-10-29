/* Position the contact title group using each locale's existing title rhythm. */
(() => {
  const viewport=document.querySelector('.section-viewport');
  const page=document.getElementById('contact');
  const layer=page?.closest('.section-layer');
  const heading=page?.querySelector('.contact-heading');
  const title=document.getElementById('contact-title');
  if(!viewport||!heading||!title)return;
  let frame=0;
  const point=element=>{
    let y=0;
    for(let node=element;node;node=node.offsetParent)y+=node.offsetTop;
    return y;
  };
  const number=value=>parseFloat(value)||0;
  function englishOrigin() {
    const reference=document.getElementById('wechat');
    const style=getComputedStyle(reference);
    const row=reference.querySelector('.wechat-heading-row');
    const utility=reference.querySelector('.work-utility');
    const rowStyle=getComputedStyle(row);
    const utilityStyle=getComputedStyle(utility);
    if(style.display==='grid')return number(style.paddingTop)+number(style.gridTemplateRows)+number(style.rowGap)+number(rowStyle.marginTop);
    return number(style.paddingTop)+number(utilityStyle.minHeight)+number(rowStyle.marginTop)+(style.display==='flex'?number(style.rowGap):0);
  }
  function align() {
    frame=0;
    heading.style.removeProperty('--contact-heading-shift');
    if(layer.hidden||heading.closest('[hidden]'))return;
    const header=layer.querySelector(':scope > .zh-page-header');
    const floor=header?header.offsetTop+header.offsetHeight+24:0;
    const reference=document.documentElement.lang==='zh'
      ?number(getComputedStyle(page).getPropertyValue('--contact-zh-title-origin'))
      :englishOrigin();
    const current=point(title)-point(layer);
    heading.style.setProperty('--contact-heading-shift',Math.max(0,Math.max(reference,floor)-current)+'px');
  }
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(align);};
  const resize=new ResizeObserver(schedule);resize.observe(viewport);
  const modes=new MutationObserver(schedule);modes.observe(page,{attributes:true,attributeFilter:['class']});
  document.addEventListener('portfolio:sectionchange',align);
  document.addEventListener('portfolio:localechange',schedule);
  document.fonts?.ready.then(schedule);
  document.fonts?.addEventListener('loadingdone',schedule);
  addEventListener('pagehide',event=>{
    if(event.persisted)return;
    cancelAnimationFrame(frame);resize.disconnect();modes.disconnect();
    document.fonts?.removeEventListener('loadingdone',schedule);
  });
  align();
})();
