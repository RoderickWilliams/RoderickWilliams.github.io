/* Fit complete covers to the available case height, with room for metrics. */
(() => {
  const bodies=[...document.querySelectorAll('#rednote .rn-case-main')];
  if(!bodies.length)return;
  let frame=0;
  function fit() {
    frame=0;
    const zh=document.documentElement.lang==='zh';
    const sizes=bodies.map(body=>{
      if(!zh||!body.clientWidth||!body.clientHeight)return {body,width:null};
      const button=body.querySelector('.rn-cover-button');
      const metrics=body.querySelector('.rn-case-metrics');
      const parts=(button?.style.aspectRatio||'3 / 4').split('/').map(Number);
      const ratio=parts.length===2?parts[0]/parts[1]:parts[0];
      const metricHeight=Math.max(18,metrics?.offsetHeight||0);
      const width=Math.min(body.clientWidth*.40,(body.clientHeight-metricHeight-10)*ratio);
      return {body,width:Number.isFinite(width)&&width>0?Math.floor(width):null};
    });
    sizes.forEach(({body,width})=>{
      if(width===null)body.style.removeProperty('--rn-zh-cover-width');
      else body.style.setProperty('--rn-zh-cover-width',width+'px');
    });
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(fit);};
  const resize=new ResizeObserver(schedule);
  bodies.forEach(body=>resize.observe(body));
  document.addEventListener('portfolio:localechange',schedule);
  document.addEventListener('portfolio:sectionchange',schedule);
  document.fonts?.ready.then(schedule);
  addEventListener('pagehide',event=>{if(!event.persisted){resize.disconnect();cancelAnimationFrame(frame);}});
  schedule();
})();
