(() => {
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let motion=null;
 const el=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n;};
 const drawings={decision:'<circle cx="17" cy="17" r="11"/><path d="M13 13a4 4 0 1 1 6 4c-2 1-2 2-2 3m0 4h.01"/>',content:'<path d="M9 3h12l6 6v22H9ZM21 3v7h6M13 15h10m-10 5h10m-10 5h7"/>',effect:'<path d="M6 29V20h5v9Zm9 0V13h5v16Zm9 0V5h5v24Z"/>'};
 function icon(type){const n=el('span','wc-stage-icon');n.innerHTML=`<svg viewBox="0 0 34 34" aria-hidden="true">${drawings[type]}</svg>`;return n;}
 function render(container,data){
  motion?.kill();const logic=container.closest('.wechat-logic');
  logic.classList.add('wc-analysis-active');
  logic.querySelector('.wechat-logic-caption').textContent=data.caption || 'How content choices translate B2B communication goals into brand trust.';
  logic.querySelector('.wc-original-link')?.remove();
  if(data.sourceUrl){const link=el('a','wc-original-link','VIEW ORIGINAL ARTICLE ');link.href=data.sourceUrl;link.target='_blank';link.rel='noopener noreferrer';link.append(el('span','','↗'));logic.querySelector('.wc-logic-header').append(link);}
  container.replaceChildren();
  const selector=el('div','wc-decision-selector');selector.setAttribute('role','tablist');selector.setAttribute('aria-label','Content decision path');
  const body=el('div','wc-strategy-body');body.id='wc-strategy-body';body.setAttribute('role','tabpanel');
  const footer=el('div','wc-strategy-footer'),progress=el('div','wc-progress');progress.setAttribute('aria-label','Decision progress');
  const trust=el('div','wc-build-trust'),handshake=el('img','build-trust-icon');handshake.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNCAzNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmY0MzJlIiBzdHJva2Utd2lkdGg9IjEuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4NCiA8cGF0aCBkPSJNNyA2IDIuNSAxMy41IDYuNSAxOE0yNyA2bDQuNSA3LjUtNCA0LjVNNyA2aDVsNC41IDNNMjcgNmgtNWwtOC41IDZhMiAyIDAgMCAwIDIuNSAzbDMtMiA4IDdhMiAyIDAgMCAxLTIuNSAzbC02LTUiLz4NCiA8cGF0aCBkPSJtMjMuNSAyMiAxIDFhMiAyIDAgMCAxLTIuNSAzbC02LTVtNSA0IDEgMWEyIDIgMCAwIDEtMi41IDNsLTItMiIvPg0KIDxwYXRoIGQ9Im02IDE5IDEuNS0xLjVhMS44IDEuOCAwIDAgMSAyLjUgMi41bC0xLjUgMS41QTEuOCAxLjggMCAwIDEgNiAxOVptMyAzIDEuNS0xLjVBMS44IDEuOCAwIDAgMSAxMyAyM2wtMS41IDEuNUExLjggMS44IDAgMCAxIDkgMjJabTMgMyAxLjUtMS41QTEuOCAxLjggMCAwIDEgMTYgMjZsLTEuNSAxLjVBMS44IDEuOCAwIDAgMSAxMiAyNVoiLz4NCjwvc3ZnPg0K';handshake.alt='';trust.append(handshake,el('strong','','BUILD TRUST'));
  const arrow=el('span','wc-final-arrow');arrow.setAttribute('aria-hidden','true');arrow.innerHTML='<svg viewBox="0 0 100 24" fill="none"><path d="M2 12h93m-8-8 8 8-8 8"/></svg>';footer.append(progress,arrow,trust);container.append(selector,body,footer);
  const tabs=[],steps=[],lines=[];let current=0;
  function stage(type,title,description,keywords){const row=el('section','wc-stage');row.append(icon(type));const copy=el('div','wc-stage-copy');copy.append(el('p','wc-stage-label',type.toUpperCase()),el('h4','',title));if(description)copy.append(el('p','wc-stage-description',description));if(keywords?.length){const chips=el('div','wc-keywords');keywords.forEach(word=>chips.append(el('span','',word)));copy.append(chips);}row.append(copy);return row;}
  function draw(index){const d=data.decisions[index];body.setAttribute('aria-labelledby',tabs[index].id);body.replaceChildren(stage('decision',d.name,d.decision),stage('content',d.content,null,d.keywords),stage('effect',d.effect,d.effectDescription));}
  function choose(index,animate=true){current=index;tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});steps.forEach((step,i)=>{if(i===index)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');});lines.forEach((line,i)=>{line.classList.toggle('wc-line-active',i===index);line.classList.toggle('wc-line-complete',i<index);});motion?.kill();
   if(!window.gsap||!animate||window.portfolioScreenMotion===false){draw(index);if(window.gsap)gsap.set(body,{clearProps:'opacity,transform'});return;}
   gsap.set(body,{clearProps:'opacity,transform'});motion=gsap.timeline().to(body,{opacity:0,y:reduced.matches?0:-3,duration:.14,ease:'power2.in'}).call(()=>draw(index)).fromTo(body,{opacity:0,y:reduced.matches?0:6},{opacity:1,y:0,duration:.22,ease:'power2.out',clearProps:'opacity,transform'});
  }
  data.decisions.slice(0,3).forEach((d,index)=>{
   const tab=el('button','wc-selector-item');tab.type='button';tab.id=`wc-decision-tab-${index}`;tab.setAttribute('role','tab');tab.setAttribute('aria-controls',body.id);tab.append(el('span','wc-number',String(index+1).padStart(2,'0')));const copy=el('span','wc-selector-copy');copy.append(el('strong','',d.name),el('span','',d.label));tab.append(copy);tabs.push(tab);selector.append(tab);tab.addEventListener('click',()=>choose(index));
   tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();event.stopPropagation();const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(current+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;choose(next);tabs[next].focus({preventScroll:true});});
   const step=el('button','wc-progress-step',String(index+1).padStart(2,'0'));step.type='button';step.setAttribute('aria-label',`Show ${d.name} path`);steps.push(step);progress.append(step);step.addEventListener('click',()=>choose(index));if(index<data.decisions.slice(0,3).length-1){const line=el('span','wc-progress-line');line.setAttribute('aria-hidden','true');lines.push(line);progress.append(line);}
  });choose(0,false);
 }
 function reset(container){motion?.kill();const logic=container.closest('.wechat-logic');logic.classList.remove('wc-analysis-active');logic.querySelector('.wc-original-link')?.remove();logic.querySelector('.wechat-logic-caption').textContent='How content strategy translates B2B communication goals into brand trust.';}
 window.WeChatArticleAnalysis={render,reset};
 reduced.addEventListener('change',()=>motion?.progress(1).kill());
})();
