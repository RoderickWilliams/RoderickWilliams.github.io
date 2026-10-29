(() => {
  const dialog=document.querySelector('#thinking-modal');
  if(!dialog)return;
  const surface=dialog.querySelector('.thinking-surface'),backdrop=dialog.querySelector('.thinking-backdrop');
  const framework=dialog.querySelector('.thinking-framework'),detail=dialog.querySelector('.thinking-detail');
  const tabs=[...dialog.querySelectorAll('[data-audience]')];
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const icons={
    box:'<path d="m16 3 12 7v14l-12 7-12-7V10Zm-12 7 12 7 12-7M16 17v14M10 6l12 7"/>',
    database:'<ellipse cx="16" cy="7" rx="11" ry="4"/><path d="M5 7v18c0 5 22 5 22 0V7M5 16c0 5 22 5 22 0"/>',
    heart:'<path d="M16 28 5 17C-3 8 9 0 16 8c7-8 19 0 11 9Z"/>',
    people:'<circle cx="17" cy="7" r="4"/><circle cx="7" cy="11" r="3"/><circle cx="27" cy="11" r="3"/><path d="M11 29V19a6 6 0 0 1 12 0v10M3 27v-7c0-4.5 5-6 7-3m21 10v-7c0-4.5-5-6-7-3"/>',
    shield:'<path d="M16 3c5 4 8 4 12 4v9c0 7-5 12-12 15C9 28 4 23 4 16V7c4 0 7 0 12-4Z"/>',
    content:'<rect x="7" y="2" width="18" height="29" rx="2"/><path d="M11 8h10M11 14h10M11 20h10M11 26h6"/>',
    clock:'<circle cx="16" cy="16" r="14"/><path d="M16 6v11l7 5"/>',
    target:'<circle cx="15" cy="17" r="13"/><circle cx="15" cy="17" r="8"/><circle cx="15" cy="17" r="3"/><path d="m15 17 14-14m-1 0-1 6 6-1-5-5"/>'
  };
  const svg=name=>`<svg viewBox="0 0 34 34" aria-hidden="true">${icons[name]}</svg>`;
  const models={
    business:{rationalSubtitle:'Business logic & commercial value',emotionalSubtitle:'Brand story & values alignment',nodes:[
      ['Business Value','Product capability, delivery quality, ROI, and business growth.',['Product capability','Delivery quality','ROI & business growth'],'box','left'],
      ['Cost & Efficiency','Price, time, and collaboration efficiency.',['Procurement cost','Decision-making cycle','Communication & integration cost'],'database','left'],
      ['Brand Credibility','Authentic brand storytelling, transparency, and long-term vision.',['Brand story & founder values','Transparency & credibility','Values / ESG / long-termism'],'heart','right'],
      ['Industry Recognition','Expert endorsement, ecosystem partnerships, and industry influence.',['Industry experts','Partner endorsements','Ecosystem & network','Social proof'],'people','right'],
      ['Risk Control','Compliance, delivery reliability, reputation, and long-term viability.',['Compliance & legal risk','Delivery reliability','Reputation risk','Financial stability'],'shield','right']
    ]},
    consumer:{rationalSubtitle:'Practical value & cost assessment',emotionalSubtitle:'Brand story & emotional connection',nodes:[
      ['Content Value','Useful, high-quality, and problem-solving content.',['Useful knowledge','Practical skills','Tangible benefits','e.g., saving money or time'],'content','left'],
      ['Attention Cost','Time, effort, and mental energy required to engage with content.',['Time cost','Learning effort','Attention cost','Effort to engage'],'clock','left'],
      ['Emotional Connection','An enjoyable, authentic, and relatable brand story.',['Enjoyment & entertainment','Authenticity & trust','Identity fit','Shared values & lifestyle'],'heart','right'],
      ['Social Identity','Recognition, belonging, and shareable social value.',['Peer recognition','Sense of belonging','Shareable content','Social status & identity'],'people','right'],
      ['Perceived Risk','Concerns about credibility, hidden motives, and content quality.',['Is it reliable?','Is it just marketing?','Will it really work for me?','Any potential risks or downsides?'],'shield','right']
    ]}
  };
  let audience='business',opener=null,activeNode=null,hideTimer=null,motion=null,switchMotion=null,closing=false;
  function hideDetail(){clearTimeout(hideTimer);activeNode?.removeAttribute('aria-describedby');activeNode=null;detail.hidden=true;}
  function render(next){
    audience=next;hideDetail();
    tabs.forEach(tab=>{const selected=tab.dataset.audience===next;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
    const model=models[next];
    const card=index=>{const [title,description,,icon]=model.nodes[index];return `<button type="button" class="thinking-node" data-node="${index}" aria-label="${title}: show detail"><span class="thinking-node-icon">${svg(icon)}</span><span><strong>${title}</strong><span class="thinking-node-description">${description}</span></span><span class="thinking-node-chevron" aria-hidden="true">›</span></button>`;};
    framework.innerHTML=`<div class="thinking-columns"><section class="thinking-column"><div class="thinking-column-heading"><h3>RATIONAL TRUST</h3><p>${model.rationalSubtitle}</p></div><div class="thinking-node-list">${card(0)}${card(1)}</div></section><section class="thinking-column"><div class="thinking-column-heading"><h3>EMOTIONAL TRUST</h3><p>${model.emotionalSubtitle}</p></div><div class="thinking-node-list">${card(2)}${card(3)}</div></section></div><svg class="thinking-model-path" viewBox="0 0 900 56" preserveAspectRatio="none" aria-hidden="true"><path pathLength="100" d="M200 1Q200 28 250 28H405Q445 28 450 51m-5-6 5 7 5-7M700 1Q700 28 650 28H495Q455 28 450 51"/></svg><div class="thinking-convergence">${card(4)}</div>`;
  }
  function drawPaths(timeline,at){timeline.fromTo(dialog.querySelectorAll('.thinking-model-path path,.thinking-final-path path'),{strokeDasharray:100,strokeDashoffset:100},{strokeDashoffset:0,duration:.5,clearProps:'strokeDasharray,strokeDashoffset'},at);}
  function open(next,trigger){
    if(dialog.open)return;
    opener=trigger;closing=false;render(next);surface.scrollTop=0;
    document.body.classList.add('thinking-modal-open');dialog.showModal();
    dialog.querySelector('.thinking-close').focus({preventScroll:true});
    if(!window.gsap||reduced.matches||window.portfolioScreenMotion===false)return;
    motion=gsap.timeline({defaults:{ease:'power3.out'}})
      .fromTo(backdrop,{opacity:0},{opacity:1,duration:.22,clearProps:'opacity'},0)
      .fromTo(surface,{opacity:0,y:14,scale:.975},{opacity:1,y:0,scale:1,duration:.42,clearProps:'opacity,transform'},0)
      .fromTo(dialog.querySelector('.thinking-modal-header'),{opacity:0,y:10},{opacity:1,y:0,duration:.35,clearProps:'opacity,transform'},.12)
      .fromTo(framework.querySelectorAll('.thinking-column-heading,.thinking-node'),{opacity:0,y:10},{opacity:1,y:0,duration:.36,stagger:.055,clearProps:'opacity,transform'},.22);
    drawPaths(motion,.48);
    motion.fromTo(dialog.querySelector('.thinking-final-node'),{opacity:0,y:8},{opacity:1,y:0,duration:.36,clearProps:'opacity,transform'},.66);
  }
  function close(){
    if(!dialog.open||closing)return;
    closing=true;hideDetail();motion?.progress(1).kill();switchMotion?.progress(1).kill();
    const finish=()=>{dialog.close();document.body.classList.remove('thinking-modal-open');opener?.focus({preventScroll:true});closing=false;};
    if(!window.gsap||reduced.matches||window.portfolioScreenMotion===false){finish();return;}
    motion=gsap.timeline({onComplete:finish}).to(surface,{opacity:0,y:8,scale:.985,duration:.24,ease:'power2.in',clearProps:'opacity,transform'},0).to(backdrop,{opacity:0,duration:.26,clearProps:'opacity'},0);
  }
  function setAudience(next){
    if(next===audience||closing)return;
    hideDetail();switchMotion?.kill();
    motion?.progress(1).kill();
    if(!window.gsap||reduced.matches||window.portfolioScreenMotion===false){render(next);return;}
    // Only framework content changes; the modal, header and final trust node stay anchored.
    tabs.forEach(tab=>{const selected=tab.dataset.audience===next;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
    switchMotion=gsap.timeline().to(framework,{opacity:0,y:6,duration:.15,ease:'power2.in',onComplete:()=>render(next)})
      .fromTo(framework,{opacity:0,y:6},{opacity:1,y:0,duration:.26,ease:'power2.out',clearProps:'opacity,transform'});
  }
  function showDetail(node){
    clearTimeout(hideTimer);if(activeNode===node&&!detail.hidden)return;
    hideDetail();activeNode=node;
    const data=models[audience].nodes[Number(node.dataset.node)];
    detail.replaceChildren();const ul=document.createElement('ul');
    data[2].forEach(text=>{const li=document.createElement('li');li.textContent=text;ul.append(li);});detail.append(ul);
    detail.hidden=false;node.setAttribute('aria-describedby',detail.id);
    const r=node.getBoundingClientRect(),d=detail.getBoundingClientRect(),header=dialog.querySelector('.thinking-modal-header').getBoundingClientRect();
    let side=data[4],x=side==='left'?r.left-d.width-24:r.right+24;
    if(x<12||x+d.width>innerWidth-12){side=side==='left'?'right':'left';x=side==='left'?r.left-d.width-12:r.right+12;}
    x=Math.max(12,Math.min(x,innerWidth-d.width-12));
    let y=r.top+(r.height-d.height)/2;
    y=Math.max(12,Math.min(header.bottom+8,innerHeight-d.height-12),Math.min(y,innerHeight-d.height-12));
    detail.dataset.side=side;detail.style.left=x+'px';detail.style.top=y+'px';
  }
  const deferHide=()=>{clearTimeout(hideTimer);hideTimer=setTimeout(hideDetail,100);};
  document.querySelectorAll('#work [data-thinking-branch]').forEach(trigger=>trigger.addEventListener('click',event=>{event.preventDefault();open(trigger.dataset.thinkingBranch,trigger);}));
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>setAudience(tab.dataset.audience));
    tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?tabs[0]:event.key==='End'?tabs[1]:tabs.find(t=>t!==tab);next.click();next.focus();});
  });
  framework.addEventListener('pointerover',event=>{const node=event.target.closest('.thinking-node');if(node&&event.pointerType!=='touch')showDetail(node);});
  framework.addEventListener('pointerout',event=>{const node=event.target.closest('.thinking-node');if(node&&!node.contains(event.relatedTarget))deferHide();});
  framework.addEventListener('focusin',event=>{const node=event.target.closest('.thinking-node');if(node)showDetail(node);});
  framework.addEventListener('focusout',event=>{if(!activeNode?.contains(event.relatedTarget))deferHide();});
  detail.addEventListener('pointerenter',()=>clearTimeout(hideTimer));detail.addEventListener('pointerleave',deferHide);
  dialog.addEventListener('click',event=>{
    const node=event.target.closest('.thinking-node');
    if(node){showDetail(node);return;}
    if(event.target.closest('.thinking-close')||event.target===backdrop||event.target===dialog){close();return;}
    if(!detail.contains(event.target))hideDetail();
  });
  dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
  dialog.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();close();return;}
    if(event.key!=='Tab')return;
    const focusable=[...dialog.querySelectorAll('button:not([tabindex="-1"])')];
    const first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  surface.addEventListener('scroll',hideDetail,{passive:true});addEventListener('resize',hideDetail);
  reduced.addEventListener('change',()=>{motion?.progress(1).kill();switchMotion?.progress(1).kill();});
  addEventListener('pagehide',()=>{clearTimeout(hideTimer);motion?.kill();switchMotion?.kill();});
})();
