/* Static Chinese primary headings, with captions reserved in normal flow. */
(() => {
  const viewport=document.querySelector('.section-viewport');
  if(!viewport)return;
  const headings=[
    ['about','#about-title','#about-title',null],
    ['work','#work-landing-title','#work-landing-title'],
    ['wechat','.wechat-heading-row','#wechat-title','.wechat-subtitle'],
    ['rednote','#rednote-title','#rednote-title','.rn-subtitle'],
    ['rednote-notes','.rn-gallery-header','#rn-gallery-title','.rn-gallery-description'],
    ['design','.dp-heading','#design-title','.dp-intro'],
    ['skills','.skills-head','#skills-title']
  ].map(([id,blockSelector,titleSelector,captionSelector])=>({
    id,layer:document.querySelector('.section-layer[data-section="'+id+'"]'),
    block:document.querySelector(blockSelector),title:document.querySelector(titleSelector),
    caption:captionSelector?document.querySelector('#'+id+' '+captionSelector):null
  })).filter(item=>item.layer&&item.block&&item.title);
  const properties=['--zh-heading-base-top','--zh-heading-base-left','--zh-heading-shift-top','--zh-heading-shift-left'];
  let frame=0;
  // offset geometry excludes GSAP's temporary entry transforms and scroll.
  function layoutPoint(element) {
    let x=0,y=0;
    for(let node=element;node;node=node.offsetParent) {x+=node.offsetLeft;y+=node.offsetTop;}
    return {x,y};
  }
  function reset(item) {
    item.block.removeAttribute('data-zh-heading-align');
    properties.forEach(name=>item.block.style.removeProperty(name));
    if(item.caption) {
      item.caption.removeAttribute('data-zh-caption-align');
      ['--zh-caption-base-top','--zh-caption-base-left','--zh-caption-shift-top','--zh-caption-shift-left'].forEach(name=>item.caption.style.removeProperty(name));
    }
  }
  function align() {
    frame=0;
    const videoLogic=document.querySelector('#wechat .wechat-logic');
    if(videoLogic){
      videoLogic.removeAttribute('data-wv-subtitle-align');
      videoLogic.style.removeProperty('--wv-logic-offset');
    }
    if(document.documentElement.lang!=='zh') {headings.forEach(reset);return;}
    const active=viewport.dataset.activeWorkSlide||viewport.dataset.activeSection;
    const item=headings.find(item=>item.id===active&&!item.layer.hidden);
    if(!item||!item.title.getClientRects().length)return;
    // Read native margins, then reserve offsets in flow before the page paints.
    reset(item);
    const base=getComputedStyle(item.block);
    const top=parseFloat(base.marginTop)||0,left=parseFloat(base.marginLeft)||0;
    item.block.style.setProperty('--zh-heading-base-top',top+'px');
    item.block.style.setProperty('--zh-heading-base-left',left+'px');
    item.block.dataset.zhHeadingAlign='true';
    const rules=getComputedStyle(item.block);
    const read=name=>parseFloat(rules.getPropertyValue(name))||0;
    const targetX=read('--zh-reference-padding-x');
    const header=item.layer.querySelector(':scope > .zh-page-header');
    const headerFloor=header?header.offsetTop+header.offsetHeight+24:0;
    const targetY=Math.max(headerFloor,read('--zh-reference-padding-top')+read('--zh-reference-utility-height')+read('--zh-reference-heading-gap')+read('--zh-reference-heading-lift'));
    const origin=layoutPoint(item.layer);
    let x=0,y=0;
    // A flex parent's shrink allocation may change after the first reservation.
    for(let pass=0;pass<2;pass++) {
      const point=layoutPoint(item.title);
      x+=targetX-(point.x-origin.x);y+=targetY-(point.y-origin.y);
      item.block.style.setProperty('--zh-heading-shift-left',x+'px');
      item.block.style.setProperty('--zh-heading-shift-top',y+'px');
    }
    if(item.caption&&!item.caption.closest('[hidden]')) {
      const caption=item.caption,base=getComputedStyle(caption);
      caption.style.setProperty('--zh-caption-base-top',(parseFloat(base.marginTop)||0)+'px');
      caption.style.setProperty('--zh-caption-base-left',(parseFloat(base.marginLeft)||0)+'px');
      caption.dataset.zhCaptionAlign='true';
      const point=layoutPoint(caption),title=layoutPoint(item.title);
      caption.style.setProperty('--zh-caption-shift-left',(title.x-point.x)+'px');
      caption.style.setProperty('--zh-caption-shift-top',Math.max(0,title.y+item.title.offsetHeight+10-point.y)+'px');
    }
    // Align the article/video strategy title with the left subtitle.
    // Padding moves its content group in flow, preserving the column's bottom edge.
    const wechatPage=document.getElementById('wechat');
    if(active==='wechat'&&wechatPage&&videoLogic&&item.caption&&
       getComputedStyle(wechatPage.querySelector('.wechat-content-grid')).display==='contents') {
      const title=videoLogic.querySelector('.wechat-logic-title');
      if(title){
        const offset=Math.max(0,layoutPoint(item.caption).y-layoutPoint(title).y);
        videoLogic.style.setProperty('--wv-logic-offset',offset+'px');
        videoLogic.dataset.wvSubtitleAlign='true';
      }
    }
  }
  function schedule() {cancelAnimationFrame(frame);frame=requestAnimationFrame(align);}
  const resize=new ResizeObserver(schedule);
  resize.observe(viewport);
  // Existing readers can switch compact modes in their own resize callback.
  // Align after that class change, before the browser paints the new mode.
  const readerLayout=new MutationObserver(align);
  ['wechat','rednote'].forEach(id=>{
    const page=document.getElementById(id);
    if(page)readerLayout.observe(page,{attributes:true,attributeFilter:['class']});
  });
  // Section visibility is set before this event; align synchronously to avoid
  // showing the old coordinates for one animation frame.
  document.addEventListener('portfolio:sectionchange',align);
  document.addEventListener('portfolio:localechange',schedule);
  document.addEventListener('DOMContentLoaded',schedule,{once:true});
  document.fonts?.ready.then(schedule);
  document.fonts?.addEventListener('loadingdone',schedule);
  addEventListener('pagehide',event=>{
    if(event.persisted)return;
    cancelAnimationFrame(frame);resize.disconnect();readerLayout.disconnect();
    document.fonts?.removeEventListener('loadingdone',schedule);
  });
  align();
})();
