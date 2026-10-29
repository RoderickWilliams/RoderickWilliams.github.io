/* Additive Chinese locale. English source nodes and component owners stay intact. */
(() => {
  'use strict';
  const data = window.PortfolioChineseCopy;
  if (!data) return;
  const normalize = value => String(value).replace(/\s+/g, ' ').trim();
  const originalText = new WeakMap(), originalAttributes = new WeakMap();
  const appliedText = new WeakMap(), appliedAttributes = new WeakMap();
  const handled = new Set();
  // .hero-greeting 改为跟随语言（中文显示「你好！」）；.contact-closing 仍按原设计保留英文，
  // 它底部那两行英文是当图形元素用的。
  const englishOnly = '.contact-closing';
  const attrs = ['aria-label','alt','title','content'];
  const excluded = element => !element || !!element.closest('script,style,svg,noscript,[data-locale-fixed="true"],.hero-resume-actions');
  const pageOf = element => {
    if (element.closest('#thinking-modal')) return 'thinking';
    if (element.closest('.dp-viewer')) return 'design';
    if (element.closest('.rn-preview')) return 'rednote';
    return element.closest('[data-section]')?.dataset.section || 'global';
  };
  const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const templates = {};
  const reverse = {};
  Object.entries(data.phrases).forEach(([page, entries]) => {
    reverse[page] = new Map();
    templates[page] = [];
    Object.entries(entries).forEach(([en,zh]) => {
      if (en.includes('{value}')) {
        // The framework HTML aggregate is not a real text/attribute node.
        if (en.startsWith('RATIONAL TRUST')) return;
        templates[page].push({regex:new RegExp('^'+en.split('{value}').map(escapeRegExp).join('(.+?)')+'$'),zh});
      } else if (!reverse[page].has(zh)) reverse[page].set(zh,en);
    });
  });
  function translate(value,page,depth=0) {
    const key=normalize(value), local=data.phrases[page] || {};
    if (Object.hasOwn(local,key)) return local[key];
    if (Object.hasOwn(data.phrases.global,key)) return data.phrases.global[key];
    if (depth>2) return null;
    for (const template of [...(templates[page] || []),...templates.global]) {
      const match=key.match(template.regex);
      if (!match) continue;
      let i=1;
      return template.zh.replace(/\{value\}/g,()=>{
        const part=match[i++]; return translate(part,page,depth+1) ?? part;
      });
    }
    if (page==='thinking' && key.endsWith(': show detail')) {
      const title=translate(key.slice(0,-13),page,depth+1);
      return title ? title+'：查看详情' : null;
    }
    if (page==='design') {
      for (const [prefix,zh] of [['View project: ','查看项目：'],['Enlarge ','放大']]) {
        if (!key.startsWith(prefix)) continue;
        const parts=key.slice(prefix.length).split(' · ');
        return zh+parts.map(part=>translate(part,page,depth+1) ?? part).join(' · ');
      }
    }
    return null;
  }
  function englishBaseline(value,page) {
    if(document.documentElement.lang!=='zh')return value;
    const key=normalize(value);
    const legacy=data.legacy[page]?.[key] || data.legacy.global[key];
    if (legacy) return value.replace(key,legacy);
    if (page==='design') {
      const prefixes=[['查看项目 ','View project: '],['放大查看 ','Enlarge ']];
      for(const [prefix,enPrefix] of prefixes) {
        if(!key.startsWith(prefix))continue;
        const parts=key.slice(prefix.length).split(' · ');
        const enParts=parts.map(part=>data.legacy.design[part] || reverse.design.get(part) || part);
        return value.replace(key,enPrefix+enParts.join(' · '));
      }
    }
    // Only known localized values have a reverse mapping. Chinese evidence
    // inside data/images is never guessed or translated backwards.
    if (/[\u3400-\u9fff]/.test(key)) {
      const en=reverse[page]?.get(key) || reverse.global.get(key);
      if (en) return value.replace(key,en);
    }
    return value;
  }
  function textBaseline(node) {
    const page=pageOf(node.parentElement), value=node.nodeValue;
    if (!originalText.has(node) || (appliedText.has(node) && appliedText.get(node)!==value)) {
      originalText.set(node,englishBaseline(value,page));
      appliedText.delete(node);
    }
    return originalText.get(node);
  }
  function textNodes(element,includeWhitespace=false) {
    const result=[], walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node=walker.currentNode;
      if (!excluded(node.parentElement) && (includeWhitespace || normalize(textBaseline(node)))) result.push(node);
    }
    return result;
  }
  function writeText(node,value) {
    if (node.nodeValue!==value) node.nodeValue=value;
    appliedText.set(node,value);
    handled.add(node);
  }
  function attributeBaseline(element,name) {
    let saved=originalAttributes.get(element);
    if (!saved) originalAttributes.set(element,saved=new Map());
    const applied=appliedAttributes.get(element), value=element.getAttribute(name);
    if (!saved.has(name) || (applied?.has(name) && applied.get(name)!==value)) saved.set(name,englishBaseline(value,pageOf(element)));
    return saved.get(name);
  }
  function writeAttribute(element,name,value) {
    if (element.getAttribute(name)!==value) element.setAttribute(name,value);
    let applied=appliedAttributes.get(element);
    if (!applied) appliedAttributes.set(element,applied=new Map());
    applied.set(name,value);
  }
  function baselineContent(element) {
    if (element.nodeType===Node.TEXT_NODE) return textBaseline(element);
    if (element.nodeType!==Node.ELEMENT_NODE || excluded(element)) return '';
    if (element.tagName==='BR') return ' ';
    return [...element.childNodes].map(baselineContent).join('');
  }
  function group(element,zh) {
    const nodes=textNodes(element);
    if (!nodes.length) return;
    // Keep icons, nested emphasis and animation refs; allocate a phrase over
    // its existing spans instead of replacing the component's DOM.
    if (nodes.length===1) { writeText(nodes[0],zh); return; }
    const lengths=nodes.map(node=>normalize(textBaseline(node)).length);
    const total=lengths.reduce((sum,n)=>sum+n,0);
    let offset=0;
    nodes.forEach((node,index)=>{
      const end=index===nodes.length-1?zh.length:offset+Math.round(zh.length*lengths[index]/total);
      writeText(node,zh.slice(offset,end));offset=end;
    });
  }
  function structuralChinese() {
    const parts=(selector,values)=>document.querySelectorAll(selector).forEach(element=>{
      const nodes=textNodes(element);
      nodes.forEach((node,index)=>writeText(node,values[index] ?? ''));
    });
    // Whitespace between animated words stays in the original nodes.
    parts('.hero-im',['我是']);
    parts('.hero-name-row .hero-word:not(.hero-wang)',['王子博']);
    parts('.hero-wang',['']);
    data.segments.filter(([selector])=>selector!=='#hero-name').forEach(([selector,values])=>parts(selector,values));
    document.querySelectorAll('.wechat-group-heading').forEach(element=>{
      const nodes=textNodes(element).filter(node=>!node.parentElement.closest('.wechat-group-heading > span'));
      nodes.forEach(node=>{
        const key=normalize(textBaseline(node));
        if (key==='EVENT STORIES') writeText(node,'活动报道');
        if (key==='RESEARCH UPDATES') writeText(node,'科研动态');
      });
    });
    document.querySelectorAll('.wechat-logic-title').forEach(element=>{
      const em=element.querySelector('em');
      if (!em) return;
      const video=normalize(baselineContent(em))==='VIDEO';
      const direct=[...element.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE && normalize(textBaseline(node)));
      direct.forEach((node,index)=>writeText(node,index===0?'为什么这样':''));
      group(em,video?'剪视频':'做内容');
    });
    const scope=document.querySelector('.contact-scope');
    if (scope) {
      // 中文压成一行「品牌传播/新媒体内容」，英文的视觉分隔符与第二行不再输出
      const nodes=textNodes(scope).filter(node=>!node.parentElement.closest('.contact-scope-event'));
      nodes.forEach((node,index)=>writeText(node,index===0?'品牌传播/新媒体内容':''));
      const event=scope.querySelector('.contact-scope-event');
      if(event)textNodes(event,true).forEach(node=>writeText(node,''));
    }
  }
  function capture() {
    const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {const node=walker.currentNode;if(!excluded(node.parentElement))textBaseline(node);}
    document.querySelectorAll('[aria-label],[alt],[title],meta[name="description"]').forEach(element=>{
      if(excluded(element))return;
      attrs.forEach(attr=>{if(element.hasAttribute(attr))attributeBaseline(element,attr);});
    });
  }
  let queued=false;
  const observer=new MutationObserver(()=>schedule());
  const observe=()=>observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attrs});
  function apply() {
    queued=false; observer.disconnect(); handled.clear();
    window.PortfolioChineseExperience?.(document.documentElement.lang==='zh');
    capture();
    const zh=document.documentElement.lang==='zh';
    document.querySelectorAll(englishOnly).forEach(element=>{
      textNodes(element,true).forEach(node=>writeText(node,textBaseline(node)));
    });
    if (zh) {
      structuralChinese();
      data.bindings.forEach(binding=>{
        document.querySelectorAll(binding.selector).forEach(element=>{
          if(excluded(element) || pageOf(element)!==binding.page && binding.page!=='global')return;
          if(binding.attr) {
            if(element.hasAttribute(binding.attr) && normalize(attributeBaseline(element,binding.attr))===binding.en)writeAttribute(element,binding.attr,binding.zh);
          } else if(normalize(baselineContent(element))===binding.en && !textNodes(element).some(node=>handled.has(node)))group(element,binding.zh);
        });
      });
    }
    const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
      const node=walker.currentNode;
      if(excluded(node.parentElement) || handled.has(node))continue;
      const en=textBaseline(node), key=normalize(en), translated=zh?translate(en,pageOf(node.parentElement)):null;
      writeText(node,translated==null?en:en.replace(key,translated));
    }
    document.querySelectorAll('[aria-label],[alt],[title],meta[name="description"]').forEach(element=>{
      if(excluded(element))return;
      attrs.forEach(name=>{
        if(!element.hasAttribute(name))return;
        const en=attributeBaseline(element,name), translated=zh&&!element.closest(englishOnly)?translate(en,pageOf(element)):null;
        writeAttribute(element,name,translated ?? en);
      });
    });
    // Heading support copy uses no closing punctuation in either language.
    const captions='.hero-statement,.work-card-description,.wechat-subtitle,.wechat-logic-caption,.rn-subtitle,.rn-gallery-description,.dp-intro,.dp-format-description,.thinking-modal-subtitle,.thinking-node-description,.rn-analysis-group p,.wc-stage-description,.rn-decision-caption,.contact-invitation p';
    document.querySelectorAll(captions).forEach(element=>{
      const nodes=textNodes(element).filter(node=>node.nodeValue.trim());
      const last=nodes.at(-1);
      if(last)writeText(last,last.nodeValue.replace(/[.!?。！？；;，,:：…]+\s*$/u,''));
    });
    const galleryCaption=document.querySelector('.rn-gallery-description');
    if(galleryCaption)galleryCaption.hidden=zh;
    // Details explicitly marked English use the active language for CJK speech.
    document.querySelectorAll('.experience-popover').forEach(element=>element.lang=zh?'zh':'en');
    observe();
  }
  function schedule() {
    if(queued)return;queued=true;queueMicrotask(apply);
  }
  capture(); observe();
  document.addEventListener('portfolio:localechange',schedule);
  document.addEventListener('DOMContentLoaded',schedule,{once:true});
})();
