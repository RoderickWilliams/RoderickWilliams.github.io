(() => {
 const page=document.querySelector('#skills'),stage=page?.querySelector('.skills-object-stage');
 if(!stage)return;
 const scene=stage.querySelector('.skills-object-scene'),panel=stage.querySelector('.skills-object-popover'),hits=[...scene.querySelectorAll('[data-object]')];
 const skills={
  ai:{en:'AI & WEB',zh:'AI 与网页',items:['Website design','AI product prototyping','Content systems','Data-informed workflows','Codex · Cursor · Trae'],itemsZh:['网页设计','AI 产品原型','内容体系','数据驱动的工作方法','Codex · Cursor · Trae'],side:'right'},
  content:{en:'CONTENT',zh:'内容策划',items:['Brand storytelling','Editorial planning','Social media content'],itemsZh:['品牌叙事','内容策划','社媒内容'],side:'left'},
  design:{en:'DESIGN',zh:'图文设计',items:['Visual communication','Gaoding Design','Canva'],itemsZh:['视觉传达','稿定设计','Canva'],side:'left'},
  language:{en:'LANGUAGES',zh:'语言技能',items:['English: TEM-8','Mandarin: Native'],itemsZh:['英语（专业八级）','普通话（母语）'],side:'right'},
  office:{en:'OFFICE',zh:'日常办公',items:['Microsoft Office','WPS'],itemsZh:['Microsoft Office','WPS'],side:'right'},
  social:{en:'SOCIAL & EVENTS',zh:'社媒与活动运营',items:['WeChat operations','RedNote operations','Event marketing','Cross-team coordination'],itemsZh:['微信运营','小红书运营','活动营销','跨团队协作'],side:'right'},
  video:{en:'VIDEO',zh:'视频剪辑',items:['Jianying'],itemsZh:['剪映'],side:'left'}
 };
 let active=null,pinned=false,leaveTimer=null;
 const isZh=()=>document.documentElement.lang==='zh';
 function position(){
  if(!active||panel.hidden)return;
  const box=stage.getBoundingClientRect(),bag=scene.getBoundingClientRect(),object=active.getBoundingClientRect();
  panel.style.maxHeight=Math.max(90,box.height-12)+'px';
  if(stage.classList.contains('skills-object-compact'))return;
  const left=skills[active.dataset.object].side==='left'?bag.left-box.left+bag.width*.13-panel.offsetWidth-16:bag.left-box.left+bag.width*.92+16;
  panel.style.left=Math.max(0,Math.min(box.width-panel.offsetWidth,left))+'px';
  panel.style.top=Math.max(0,Math.min(box.height-panel.offsetHeight,object.top-box.top))+'px';
 }
 function content(){
  const skill=skills[active.dataset.object],zh=isZh();
  panel.querySelector('h3').textContent=zh?skill.zh:skill.en;
  panel.querySelector('ul').replaceChildren(...(zh?skill.itemsZh:skill.items).map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
 }
 function show(hit){
  clearTimeout(leaveTimer);active=hit;
  hits.forEach(button=>{const selected=button===hit;button.classList.toggle('is-active',selected);button.setAttribute('aria-expanded',String(selected));if(selected)button.setAttribute('aria-describedby',panel.id);else button.removeAttribute('aria-describedby');});
  content();panel.hidden=false;position();
 }
 function close(){
  clearTimeout(leaveTimer);active=null;pinned=false;panel.hidden=true;
  hits.forEach(hit=>{hit.classList.remove('is-active');hit.setAttribute('aria-expanded','false');hit.removeAttribute('aria-describedby');});
 }
 function leave(){
  clearTimeout(leaveTimer);leaveTimer=setTimeout(()=>{if(!pinned&&!stage.querySelector('.skills-object-hit:hover')&&!panel.matches(':hover')&&!scene.contains(document.activeElement))close();},140);
 }
 hits.forEach(hit=>{
  hit.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){pinned=false;show(hit);}});
  hit.addEventListener('pointerleave',leave);hit.addEventListener('focus',()=>show(hit));hit.addEventListener('blur',leave);
  hit.addEventListener('click',()=>{if(pinned&&active===hit)close();else{pinned=true;show(hit);}});
 });
 panel.addEventListener('pointerenter',()=>clearTimeout(leaveTimer));panel.addEventListener('pointerleave',leave);
 document.addEventListener('pointerdown',event=>{if(active&&!event.target.closest('.skills-object-hit')&&!panel.contains(event.target))close();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&active){event.preventDefault();close();}});
 function layout(){
  if(page.closest('.section-layer')?.hidden)return;
  const compact=stage.clientWidth<850;stage.classList.toggle('skills-object-compact',compact);
  const availableHeight=Math.max(0,stage.clientHeight-(compact?164:0));
  const availableWidth=Math.max(0,stage.clientWidth-(compact?0:392));
  const width=Math.min(1180,availableWidth,availableHeight*1.5),height=width/1.5;
  scene.style.width=width+'px';scene.style.height=height+'px';
  scene.style.setProperty('--scene-width',width+'px');scene.style.setProperty('--scene-height',height+'px');position();
 }
 function locale(){
  hits.forEach(hit=>hit.setAttribute('aria-label',isZh()?skills[hit.dataset.object].zh:skills[hit.dataset.object].en));
  scene.querySelector('.skills-bag-shell img').alt=isZh()?"王子博的橙色帆布包":"Zibo's orange canvas bag";
  if(active){content();position();}
 }
 const observer=new ResizeObserver(layout);observer.observe(stage);
 document.addEventListener('portfolio:localechange',locale);
 document.addEventListener('portfolio:sectionchange',event=>{if(event.detail.slide==='skills')layout();else close();});
 locale();layout();
 addEventListener('pagehide',event=>{if(!event.persisted){observer.disconnect();clearTimeout(leaveTimer);}});
})();
