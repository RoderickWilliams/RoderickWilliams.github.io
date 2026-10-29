/* Consume each content view before letting the shared section controller advance. */
(() => {
  const viewport=document.querySelector('.section-viewport');
  const wechat=document.getElementById('wechat');
  const rednote=document.getElementById('rednote');
  if(!viewport||!wechat||!rednote)return;
  let side='left',previous='';
  const fields=['audience','approach','framework'];
  const details=['topic','design','decision'];
  const area=page=>page.closest('.section-scroll-area');
  const compact=()=>wechat.classList.contains('wc-paged-page');
  const articleButtons=()=>[...wechat.querySelectorAll('[data-wechat-sample]')];
  const decisionButtons=()=>[...wechat.querySelectorAll('.wc-selector-item')];
  const videos=()=>wechat.classList.contains('wechat-video-mode');
  function visible(node){return node&&!node.closest('[hidden]')&&node.getClientRects().length>0;}
  function move(nodes,delta){
    for(const node of nodes){
      if(!visible(node)||!/(auto|scroll)/.test(getComputedStyle(node).overflowY))continue;
      const bottom=node.scrollHeight-node.clientHeight;
      if(bottom<=4||(delta>0?node.scrollTop>=bottom-4:node.scrollTop<=4))continue;
      node.scrollTop=Math.max(0,Math.min(bottom,node.scrollTop+delta));
      return true;
    }
    return false;
  }
  function resetScroll(page){
    [area(page),...page.querySelectorAll('.wc-strategy-body,.wechat-selection,.wv-analysis,.rn-account-copy,.rn-case-copy,.rn-featured')]
      .forEach(node=>{node.scrollTop=0;});
  }
  function openArticle(index,lastDecision=false){
    const button=articleButtons()[index];
    if(!button)return false;
    window.WeChatReaderLayout?.showArticle(button);
    button.click();
    if(lastDecision)decisionButtons().at(-1)?.click();
    resetScroll(wechat);
    return true;
  }
  function showVideo(index,analysis=false){
    window.WeChatPage.setTab('videos');
    window.WeChatVideoPage.select(index);
    window.WeChatReaderLayout?.show(analysis?'analysis':'collection');
    resetScroll(wechat);
    return true;
  }
  function resetWechat(){
    window.WeChatPage.reset();
    window.WeChatReaderLayout?.show(compact()?'analysis':'collection');
    resetScroll(wechat);
  }
  function advanceWechat(direction){
    if(!videos()){
      const articles=articleButtons();
      const index=articles.findIndex(button=>button.getAttribute('aria-pressed')==='true');
      if(index<0)return direction>0?openArticle(0):false;
      if(direction>0&&compact()&&!wechat.classList.contains('wc-focus-analysis')){
        window.WeChatReaderLayout.show('analysis');resetScroll(wechat);return true;
      }
      const decisions=decisionButtons();
      const current=decisions.findIndex(button=>button.getAttribute('aria-selected')==='true');
      const next=current+direction;
      if(next>=0&&next<decisions.length){decisions[next].click();resetScroll(wechat);return true;}
      if(direction>0)return index<articles.length-1?openArticle(index+1):showVideo(0);
      if(index>0)return openArticle(index-1,true);
      resetWechat();return true;
    }
    const video=window.WeChatVideoPage;
    const analysis=wechat.classList.contains('wc-focus-analysis');
    if(compact()&&((direction>0&&!analysis)||(direction<0&&analysis))){
      window.WeChatReaderLayout.show(direction>0?'analysis':'collection');
      resetScroll(wechat);return true;
    }
    if(direction>0)return video.current<video.count-1?showVideo(video.current+1):false;
    if(video.current>0)return showVideo(video.current-1,true);
    window.WeChatPage.setTab('articles');
    return openArticle(articleButtons().length-1,true);
  }
  function setAccount(index,detail='audience'){
    side='left';rednote.dataset.readingSide=side;
    window.RednoteReader.setAccount(index,detail);resetScroll(rednote);return true;
  }
  function setNote(index,detail='topic'){
    side='right';rednote.dataset.readingSide=side;
    window.RednoteReader.setNote(index,detail);resetScroll(rednote);return true;
  }
  function advanceRednote(direction){
    const reader=window.RednoteReader;
    const state=reader.state();
    if(side==='left'){
      const next=fields.indexOf(state.accountDetail)+direction;
      if(state.details&&next>=0&&next<fields.length){reader.setAccountDetail(fields[next]);resetScroll(rednote);return true;}
      if(direction>0)return state.accountIndex<state.accountCount-1?setAccount(state.accountIndex+1):setNote(0);
      return state.accountIndex>0?setAccount(state.accountIndex-1,'framework'):false;
    }
    const next=details.indexOf(state.noteDetail)+direction;
    if(state.narrow&&next>=0&&next<details.length){reader.setNoteDetail(details[next]);resetScroll(rednote);return true;}
    if(direction>0)return state.selectedNote<state.noteCount-1?setNote(state.selectedNote+1):false;
    return state.selectedNote>0?setNote(state.selectedNote-1,'decision'):setAccount(state.accountCount-1,'framework');
  }
  function scroll(slide,delta){
    if(slide==='wechat'){
      if(!videos()&&!wechat.querySelector('[data-wechat-sample][aria-pressed="true"]'))return false;
      return move([
        wechat.querySelector(videos()?'.wv-analysis':'.wc-strategy-body'),
        wechat.querySelector('.wechat-selection'),wechat.querySelector('.wechat-logic'),area(wechat)
      ],delta);
    }
    if(slide==='rednote')return move(side==='left'
      ?[rednote.querySelector('.rn-account-copy'),rednote.querySelector('.rn-account-panel'),area(rednote)]
      :[rednote.querySelector('.rn-case:not([hidden]) .rn-case-copy'),rednote.querySelector('.rn-featured'),area(rednote)],delta);
    return false;
  }
  rednote.addEventListener('click',event=>{
    const button=event.target.closest('[data-account],[data-select-note],[data-rn-view]');
    if(!button)return;
    side=button.matches('[data-account]')||button.dataset.rnView==='account'?'left':'right';
    rednote.dataset.readingSide=side;
  });
  function enter(slide){
    if(slide!==previous){
      if(slide==='wechat'&&previous!=='rednote')resetWechat();
      if(slide==='rednote'&&previous!=='rednote-notes')setAccount(0);
    }
    previous=slide;
  }
  window.PortfolioReadingFlow={
    handles:slide=>slide==='wechat'||slide==='rednote',scroll,
    advance:(slide,direction)=>slide==='wechat'?advanceWechat(direction):advanceRednote(direction)
  };
  document.addEventListener('portfolio:sectionchange',event=>enter(event.detail.slide||event.detail.id));
  enter(viewport.dataset.activeWorkSlide||viewport.dataset.activeSection);
})();
