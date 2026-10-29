(() => {
 const page=document.querySelector('#wechat');if(!page)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const tabs=[...page.querySelectorAll('[role=tab]')],panels=[...page.querySelectorAll('.wechat-tab-panel')];
 const selection=page.querySelector('.wechat-selection'),collection=page.querySelector('.wechat-collection');
 let entry=null,transition=null,bodyMotion=null,tabMotion=null,hideTimer=null,activeNode=null;
 const explanations=new WeakMap();
 const node=(name,label,why,how,evidence=[])=>({name,label,why,how,evidence});
 const articles={
  event1:{title:'AI & Computing Innovation Seminar at Lanzhou University',context:'EVENT STORY · B2B COMMUNICATION',source:'https://mp.weixin.qq.com/s/ymqFOKQ2U4P83HjXLyKcLQ',decisions:[
   node('BUSINESS VALUE','Make capability tangible','Make technical capability relevant to university decision-makers.','Connect computing infrastructure with AI training, simulation, teaching, and research scenarios.',['AI Training','Scientific Computing','Research & Teaching']),
   node('INDUSTRY RECOGNITION','Build third-party proof','Build professional authority through credible external recognition.','Structure the story around recognized institutions, expert voices, and real collaboration scenarios.',['CCF','Lanzhou University','Industry Partners']),
   node('RISK CONTROL','Reduce collaboration uncertainty','Reduce uncertainty before potential collaboration.','Make application procedures, technical support, and collaboration paths explicit.',['Access Process','Technical Support','Collaboration Path'])]},
  event2:{title:"Xi’an Supercomputing at the 7th Western Digital Economy Expo",context:'EVENT STORY · B2B COMMUNICATION',source:"https://mp.weixin.qq.com/s/IEOwvHlvIrC4yXNyjf6fCQ",decisions:[
   node("BUSINESS VALUE","Show practical application","Help business audiences connect computing capability with operational needs.","Connect computing with enterprise applications",["SME Agent Platform", "AI Tax Assistance", "Domestic Computing Platform"]),
   node("INDUSTRY RECOGNITION","Show ecosystem participation","Give potential partners concrete evidence of participation in the regional digital economy.","Organize three forums into a collaboration story",["Government-Led Forums", "Two Partnership Signings", "Technical Report"]),
   node("COST & EFFICIENCY","Lower the trial barrier","Help SMEs understand a lower-cost starting point for trying computing services.","Highlight trial access and simpler deployment",["RMB 3,000 Trial Voucher", "One-Click Deployment", "Knowledge Reuse"])]},
  research1:{title:"Computing Support for Aerospace Design Research",context:'RESEARCH UPDATE · B2B COMMUNICATION',source:"https://mp.weixin.qq.com/s/ZehKj04qnC2ezMBQl-8JiQ",decisions:[
   node("BUSINESS VALUE","Show research value","Help enterprise R&D teams assess computing support for costly design evaluation.","Connect a costly research task with computing support",["Slow Evaluation", "Early Design", "Computing Support"]),
   node("INDUSTRY RECOGNITION","Show external evidence","Give readers evidence of research support beyond the center's own description.","Name the university, publication, and acknowledgement",["Northwestern Polytechnical University", "Published Paper", "Team Acknowledgement"]),
   node("BRAND CREDIBILITY","Explain the role clearly","Help prospective partners judge the center's reliability through a clear account of its role.","Explain the result, support role, and study limits",["Research Finding", "Computing & Technical Support", "Study Limits"])]},
  research2:{title:"Computing Support for More Stable Fast-Charging Batteries",context:'RESEARCH UPDATE · B2B COMMUNICATION',source:"https://mp.weixin.qq.com/s/mTjZhVoZIWsjeb-jyr5fag",decisions:[
   node("BUSINESS VALUE","Connect with a real need","Help enterprise R&D teams see how computing support can address a battery research problem.","Connect fast-charging research with computing support",["Fast Charging", "Battery Stability", "Computing Support"]),
   node("BRAND CREDIBILITY","Make the support specific","Help potential partners judge the center's support through a specific research example.","Show how computing helps explain the test result",["Battery Test", "Computer Simulation", "Team Acknowledgement"]),
   node("RISK CONTROL","Clarify what the result means","Help prospective partners assess the support before starting a research collaboration.","Define the computing contribution and its scope",["Simulation Support", "Team Acknowledgement", "Defined Support Role"])]},

 };
 const el=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;if(text)e.textContent=text;return e;};
 function closeNode(){clearTimeout(hideTimer);if(activeNode){activeNode.querySelector('button').setAttribute('aria-expanded','false');explanations.get(activeNode).hidden=true;activeNode=null;}}
 function openNode(wrapper){clearTimeout(hideTimer);if(activeNode!==wrapper)closeNode();activeNode=wrapper;wrapper.querySelector('button').setAttribute('aria-expanded','true');explanations.get(wrapper).hidden=false;}
 function deferClose(wrapper){clearTimeout(hideTimer);hideTimer=setTimeout(()=>{if(activeNode===wrapper&&!wrapper.matches(':hover')&&!explanations.get(wrapper).matches(':hover'))closeNode();},100);}
 function idle(){
  closeNode();window.WeChatArticleAnalysis?.reset(selection);selection.replaceChildren();const box=el('div','wechat-idle');
  box.innerHTML='<svg viewBox="0 0 155 106" aria-hidden="true"><path d="M130 98C148 28 67 1 21 29m20-25L20 30l33-5"/></svg>';
  box.append(el('h4','',tabs[0].getAttribute('aria-selected')==='true'?'Select an article\nto see the thinking\nbehind it.':'Select a video\nto see the thinking\nbehind it.'));selection.append(box);
 }
 function render(data,id){
  closeNode();
  const strategy=window.WeChatAnalysisData?.[id] || {sourceUrl:data.source,decisions:data.decisions.map((d,i)=>({id:String(i),name:d.name,label:d.label,decision:d.why,content:"Structure the story around audience needs",keywords:d.evidence,effect:"Help the audience form an informed view",effectDescription:d.how}))};
  window.WeChatArticleAnalysis.render(selection,strategy);
 }
 function changeBody(update){
  transition?.kill();bodyMotion?.kill();closeNode();if(!window.gsap||window.portfolioScreenMotion===false){update();return;}
  gsap.set(selection,{clearProps:'opacity,transform'});
  transition=gsap.timeline().to(selection,{opacity:0,y:reduced.matches?0:-3,duration:.14,ease:'power2.out'}).call(()=>{update();gsap.set(selection,{opacity:1,clearProps:'transform'});bodyMotion=gsap.fromTo([...selection.children],{opacity:0,y:reduced.matches?0:6},{opacity:1,y:0,duration:.24,stagger:reduced.matches?0:.05,ease:'power2.out',clearProps:'opacity,transform'});});
 }
 page.querySelectorAll('[data-wechat-sample]').forEach(button=>button.addEventListener('click',()=>{const data=articles[button.dataset.wechatSample];if(!data)return;page.querySelectorAll('[data-wechat-sample]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));changeBody(()=>render(data,button.dataset.wechatSample));}));
 function switchTab(tab){
  closeNode();transition?.kill();bodyMotion?.kill();tabMotion?.kill();
  if(window.gsap)gsap.set([collection,selection],{clearProps:'opacity,transform'});
  if(tab.getAttribute('aria-selected')==='true')return;
  const videos=tab.dataset.wechatTab==='videos';
  if(!videos)window.WeChatVideoPage.hide();
  tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;});
  panels.forEach(panel=>{panel.hidden=panel.id!==tab.getAttribute('aria-controls');});
  page.querySelectorAll('[data-wechat-sample]').forEach(item=>item.setAttribute('aria-pressed','false'));
  idle();if(videos)window.WeChatVideoPage.show();
  if(window.gsap&&window.portfolioScreenMotion!==false)tabMotion=gsap.fromTo([collection,selection],{opacity:0,y:reduced.matches?0:4},{opacity:1,y:0,duration:.24,clearProps:'opacity,transform'});
 }
 tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>switchTab(tab));tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();event.stopPropagation();const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;switchTab(tabs[next]);tabs[next].focus({preventScroll:true});});});
 document.addEventListener('pointerdown',event=>{if(activeNode&&!activeNode.contains(event.target)&&!explanations.get(activeNode).contains(event.target))closeNode();});page.addEventListener('keydown',event=>{if(event.key==='Escape'&&activeNode){event.stopPropagation();closeNode();}});
 function animate(active){entry?.kill();const targets=[...page.querySelectorAll('.work-utility,.wechat-title,.wechat-subtitle,.wechat-tabs,.wechat-group-heading,.wechat-item,.wechat-logic-label,.wechat-logic-title,.wechat-logic-caption,.wechat-idle')].filter(node=>document.documentElement.lang!=='zh'||!node.matches('.wechat-title,.wechat-subtitle'));if(window.gsap)gsap.set(targets,{clearProps:'opacity,transform'});if(active&&window.gsap&&window.portfolioScreenMotion!==false)entry=gsap.fromTo(targets,{opacity:0,y:reduced.matches?0:8},{opacity:1,y:0,duration:.35,stagger:reduced.matches?0:.045,ease:'power3.out',clearProps:'opacity,transform'});}
 document.addEventListener('portfolio:sectionchange',event=>{closeNode();animate(event.detail.slide==='wechat');});reduced.addEventListener('change',()=>{transition?.kill();tabMotion?.kill();if(window.gsap)gsap.set([collection,selection],{clearProps:'opacity,transform'});animate(false);});
 window.WeChatPage={
  setTab:name=>{const tab=tabs.find(tab=>tab.dataset.wechatTab===name);if(tab)switchTab(tab);},
  reset:()=>{
   switchTab(tabs[0]);
   page.querySelectorAll('[data-wechat-sample]').forEach(button=>button.setAttribute('aria-pressed','false'));
   idle();
  }
 };
 idle();animate(!page.closest('.section-layer').hidden);addEventListener('pagehide',()=>{entry?.kill();transition?.kill();tabMotion?.kill();clearTimeout(hideTimer);});
})();
