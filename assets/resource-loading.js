/* Request full-quality media only when its page becomes visible. */
(() => {
  const visibleMedia='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){const node=entry.target;if(node.hasAttribute('data-resource-href')){node.setAttribute('href',node.getAttribute('data-resource-href'));node.removeAttribute('data-resource-href');}visibleMedia.unobserve(node);}});
  },{rootMargin:'160px'}):null;
  const activate=root=>{
    if(!root)return;
    root.querySelectorAll('[data-resource-src],[data-resource-href],[data-resource-poster]').forEach(node=>{
      for(const attr of ['src','href','poster']){
        const key='data-resource-'+attr;
        if(node.hasAttribute(key)){node.setAttribute(attr,node.getAttribute(key));node.removeAttribute(key);}
      }
    });
  };
  window.PortfolioMedia={set(node,url,section,attr='src'){
    if(!section&&visibleMedia){node.setAttribute('data-resource-'+attr,url);visibleMedia.observe(node);return;}
    const layer=section?document.querySelector('[data-section="'+section+'"]'):null;
    if(!layer||!layer.hidden){node.removeAttribute('data-resource-'+attr);node.setAttribute(attr,url);}
    else node.setAttribute('data-resource-'+attr,url);
  }};
  document.addEventListener('portfolio:sectionchange',event=>{
    activate(document.querySelector('[data-section="'+(event.detail.slide||event.detail.id)+'"]'));
  });
  document.addEventListener('DOMContentLoaded',()=>{
    activate(document.querySelector('.section-layer:not([hidden])'));
    if('serviceWorker' in navigator) addEventListener('load',()=>{
      navigator.serviceWorker.register('resource-cache.js').catch(()=>{});
    },{once:true});
  },{once:true});
})();
