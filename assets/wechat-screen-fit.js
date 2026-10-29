(() => {
 const page=document.querySelector('#wechat');
 if(!page)return;
 const area=page.closest('.section-scroll-area');
 const collection=page.querySelector('.wechat-collection');
 const groups=[...page.querySelectorAll('#wechat-articles .wechat-group')];
 let category='event',view='collection';
 const controls=document.createElement('nav');
 controls.className='wc-screen-controls';controls.setAttribute('aria-label','WeChat reading views');
 controls.innerHTML='<div class="wc-category-views"><button type="button" data-wc-category="event" aria-pressed="true">Event Story</button><button type="button" data-wc-category="research" aria-pressed="false">Research Update</button></div><button class="wc-reading-back" type="button">← Back to selection</button>';
 page.querySelector('.wechat-heading-row').after(controls);
 const apply=()=>{
  const compact=page.classList.contains('wc-paged-page');
  page.classList.toggle('wc-focus-analysis',compact&&view==='analysis');
  controls.querySelector('.wc-category-views').hidden=!compact||view==='analysis';
  controls.querySelector('.wc-reading-back').hidden=!compact||view!=='analysis';
  groups.forEach((group,index)=>{group.hidden=document.documentElement.lang!=='zh'&&compact&&index!==(category==='event'?0:1);});
  controls.querySelectorAll('[data-wc-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.wcCategory===category)));
 };
 controls.querySelectorAll('[data-wc-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.wcCategory;view='collection';apply();}));
 controls.querySelector('.wc-reading-back').addEventListener('click',()=>{view='collection';apply();});
 page.addEventListener('click',event=>{
  if(event.target.closest('[data-wechat-sample]')){category=groups.indexOf(event.target.closest('.wechat-group'))===0?'event':'research';view='analysis';apply();}
 });
 const size=()=>{
  if(!area.clientHeight)return;
  page.style.setProperty('--wechat-screen-height',`${area.clientHeight}px`);
  page.classList.toggle('wc-paged-page',area.clientWidth<=900||area.clientHeight<650);
  apply();
 };
 const observer=new ResizeObserver(size);observer.observe(area);
 document.addEventListener('portfolio:sectionchange',event=>{if(event.detail.slide==='wechat')requestAnimationFrame(size);});
 document.addEventListener('portfolio:localechange',size);
 window.WeChatReaderLayout={
  show:next=>{view=next==='analysis'?'analysis':'collection';apply();},
  showArticle:button=>{category=groups.indexOf(button.closest('.wechat-group'))===0?'event':'research';view='analysis';apply();}
 };
 size();
})();
