(() => {
 const page=document.querySelector('.dp-page'), collections=window.portfolioDesign;
 if (!page || !collections?.length) return;
 const nav=page.querySelector('.dp-format-nav'), album=page.querySelector('.dp-album'), grid=page.querySelector('.dp-album-grid');
 const zh=()=>document.documentElement.lang==='zh', title=item=>zh()?item.zh:item.title;
 const companies={nsc:{logo:'assets/about/logos/nsc.svg',title:'NSC Xi’an',zh:'国家超算西安中心'},bytedance:{logo:'assets/about/logos/bytedance.svg',title:'ByteDance',zh:'字节跳动'},nowcoder:{logo:'assets/about/logos/nowcoder.svg',title:'Nowcoder',zh:'牛客'}};
 const companyFor=item=>companies[item.company||(category.id==='social'?'nowcoder':'')];
 const imageTitle=(item,index)=>((zh()?item.imageTitlesZh:item.imageTitles)?.[index]||(item.images.length===1?title(item):(zh()?`第 ${index+1} 页`:`Page ${index+1}`)));
 const positions=new Map(collections.map(item=>[item.id,0]));
 let category=collections[0], project=category.projects[0], imageIndex=0, pageSize=4, cards=[];
 const total=()=>Math.max(1,Math.ceil(category.projects.length/pageSize));
 const dialog=document.createElement('dialog');
 dialog.className='dp-viewer'; dialog.setAttribute('role','dialog'); dialog.setAttribute('aria-labelledby','dp-viewer-title');
 dialog.innerHTML='<header class="dp-viewer-header"><div class="dp-viewer-heading"><img class="dp-viewer-logo" alt=""><div><h2 id="dp-viewer-title"></h2><p></p></div></div><button type="button" class="dp-viewer-close" autofocus>×</button></header><div class="dp-viewer-media"><img class="dp-viewer-image" alt=""></div><footer class="dp-viewer-footer"><div class="dp-project-controls"><button type="button" data-dp-project="-1"></button><span class="dp-project-position"></span><button type="button" data-dp-project="1"></button></div><button type="button" class="dp-viewer-zoom"></button><div class="dp-page-controls"><button type="button" data-dp-page="-1">‹</button><span class="dp-page-position"></span><button type="button" data-dp-page="1">›</button></div></footer>';
 document.body.append(dialog);
 const buttons=collections.map(item=>{
  const button=document.createElement('button'); button.type='button'; button.dataset.format=item.id;
  button.addEventListener('click',()=>{category=item; project=item.projects[0]; imageIndex=0; pageSize=size(); renderAlbum(true);}); nav.append(button); return button;
 });
 function size(){
  const compact=page.clientWidth<650 || page.clientHeight<450;
  const wide=page.clientWidth>=1050 && page.clientHeight>=550;
  return compact?1:(wide?3:2);
 }
 function renderAlbum(animate=false){
  const index=Math.min(positions.get(category.id),total()-1); positions.set(category.id,index);
  const items=category.projects.slice(index*pageSize,index*pageSize+pageSize);
  const composition=items.length===1?'solo':(items.length===2?(category.id==='social'?'social':'pair'):(items.length===3?'trio':category.id));
  grid.className='dp-album-grid dp-composition-'+composition;
  cards=items.map(item=>{
   const node=document.createElement('figure'); node.className='dp-project';
   const brand=document.createElement('div');brand.className='dp-project-brand';
   const company=companyFor(item);
   if(company){const logo=document.createElement('img');logo.src=company.logo;logo.alt='';logo.decoding='async';brand.append(logo,document.createElement('span'));}
   else brand.hidden=true;
   const media=document.createElement('div');media.className='dp-project-media';media.dataset.count=Math.min(item.images.length,4);
   if(category.id==='brochures'&&item.width>item.height&&item.images.length===2)media.classList.add('dp-project-landscape-pages');
   item.images.slice(0,4).forEach((src,index)=>{
    const tile=document.createElement('figure');tile.className='dp-image-tile';
    const button=document.createElement('button');button.type='button';button.className='dp-project-image';
    const image=document.createElement('img');image.src=item.thumbnails?.[index]||src;image.alt='';image.decoding='async';image.loading='lazy';button.append(image);tile.append(button);
    if(item.images.length>1){const label=document.createElement('figcaption');label.className='dp-image-title';tile.append(label);}
    button.addEventListener('click',()=>{project=item;imageIndex=index;resetZoom();modal();dialog.showModal();});media.append(tile);
   });
   const caption=document.createElement('figcaption');caption.className='dp-project-caption';caption.append(document.createElement('h2'));
   const action=document.createElement('button');action.type='button';action.className='dp-open-project';action.innerHTML='<span></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M7 6h11v11"/></svg>';
   action.addEventListener('click',()=>{project=item;imageIndex=0;resetZoom();modal();dialog.showModal();});node.append(media,brand,caption,action);
   return {node,item};
  });
  grid.replaceChildren(...cards.map(card=>card.node)); locale();
  album.scrollTop=0;
  if(animate)document.dispatchEvent(new Event('portfolio:albumchange'));
 }
 function turnPage(delta){
  const index=positions.get(category.id), next=index+delta;
  if(next<0||next>=total())return false;
  positions.set(category.id,next); renderAlbum(true); return true;
 }
 function setPage(last){positions.set(category.id,last?total()-1:0);renderAlbum(true);}
 function advance(delta){
  if(turnPage(delta))return true;
  const next=collections.indexOf(category)+(delta>0?1:-1);
  if(next<0||next>=collections.length)return false;
  category=collections[next];pageSize=size();
  positions.set(category.id,delta>0?0:total()-1);
  project=category.projects[0];imageIndex=0;renderAlbum(true);return true;
 }
 function resetZoom(){dialog.classList.remove('dp-original-size');dialog.querySelector('.dp-viewer-media').scrollTo(0,0);}
 function modal(){
  const index=category.projects.indexOf(project);
  dialog.querySelector('h2').textContent=title(project);
  dialog.querySelector('p').textContent=project.images.length>1?imageTitle(project,imageIndex):title(category);
  const display=dialog.querySelector('.dp-viewer-image');
  const source=dialog.classList.contains('dp-original-size')?project.images[imageIndex]:(project.displayImages?.[imageIndex]||project.images[imageIndex]);
  if(display.getAttribute('src')!==source)display.src=source;display.decoding='async';dialog.querySelector('.dp-viewer-image').alt=title(project)+' · '+imageTitle(project,imageIndex);
  const company=companyFor(project),logo=dialog.querySelector('.dp-viewer-logo');logo.hidden=!company;
  if(company){logo.src=company.logo;logo.alt=title(company);}
  dialog.querySelector('.dp-viewer-close').setAttribute('aria-label',zh()?'关闭预览':'Close preview');
  dialog.querySelector('.dp-project-position').textContent=`${index+1} / ${category.projects.length}`;
  dialog.querySelector('[data-dp-project="-1"]').textContent=zh()?'上一件':'Previous project';
  dialog.querySelector('[data-dp-project="1"]').textContent=zh()?'下一件':'Next project';
  dialog.querySelector('[data-dp-project="-1"]').disabled=index===0;dialog.querySelector('[data-dp-project="1"]').disabled=index===category.projects.length-1;
  dialog.querySelector('.dp-page-controls').hidden=project.images.length<2;
  dialog.querySelector('.dp-page-position').textContent=`${imageIndex+1} / ${project.images.length}`;
  dialog.querySelector('[data-dp-page="-1"]').disabled=imageIndex===0;dialog.querySelector('[data-dp-page="1"]').disabled=imageIndex===project.images.length-1;
  dialog.querySelector('[data-dp-page="-1"]').setAttribute('aria-label',zh()?'上一页':'Previous page');
  dialog.querySelector('[data-dp-page="1"]').setAttribute('aria-label',zh()?'下一页':'Next page');
  dialog.querySelector('.dp-viewer-zoom').textContent=dialog.classList.contains('dp-original-size')?(zh()?'适应窗口':'Fit to window'):(zh()?'原始大小':'Original size');
 }
 function locale(){
  page.querySelectorAll('[data-dp-en]').forEach(node=>{node.textContent=zh()?node.dataset.dpZh:node.dataset.dpEn;});
  buttons.forEach((button,index)=>{button.textContent=title(collections[index]);button.setAttribute('aria-pressed',String(collections[index]===category));});
  const description=page.querySelector('.dp-format-description'),copy=(zh()?category.descriptionZh:category.description)||'';
  description.textContent=copy;description.hidden=!copy;
  if(copy)album.setAttribute('aria-describedby',description.id);else album.removeAttribute('aria-describedby');
  cards.forEach(({node,item})=>{
   node.querySelector('h2').textContent=title(item);
   const company=companyFor(item);if(company)node.querySelector('.dp-project-brand span').textContent=title(company);
   const action=node.querySelector('.dp-open-project');
   action.querySelector('span').textContent=item.images.length>4?(zh()?`查看全部 ${item.images.length} 张图片`:`View all ${item.images.length} images`):(zh()?'查看项目':'View project');
   action.setAttribute('aria-label',(zh()?'查看项目 ':'View project: ')+title(item));
   node.querySelectorAll('.dp-image-tile').forEach((tile,index)=>{
    const label=tile.querySelector('.dp-image-title');if(label)label.textContent=imageTitle(item,index);
    tile.querySelector('button').setAttribute('aria-label',(zh()?'放大查看 ':'Enlarge ')+title(item)+(item.images.length>1?' · '+imageTitle(item,index):''));
   });
  });
  page.querySelector('.dp-preview-status').textContent=zh()?`${category.projects.length} 个项目`:`${category.projects.length} projects`;
  page.querySelector('.dp-album-position').textContent=`${String(positions.get(category.id)+1).padStart(2,'0')} / ${String(total()).padStart(2,'0')}`;
  page.querySelector('[data-album-page="-1"]').disabled=positions.get(category.id)===0;
  page.querySelector('[data-album-page="1"]').disabled=positions.get(category.id)===total()-1;
  page.querySelector('.dp-album-pages').hidden=total()===1;
  page.querySelector('[data-album-page="-1"]').setAttribute('aria-label',zh()?'上一组作品':'Previous album page');
  page.querySelector('[data-album-page="1"]').setAttribute('aria-label',zh()?'下一组作品':'Next album page');
  nav.setAttribute('aria-label',zh()?'作品分类':'Design formats');album.setAttribute('aria-label',zh()?'设计作品册':'Design project album');
  if(dialog.open)modal();
 }
 function movePage(delta){imageIndex=Math.max(0,Math.min(project.images.length-1,imageIndex+delta));resetZoom();modal();}
 function moveProject(delta){const index=Math.max(0,Math.min(category.projects.length-1,category.projects.indexOf(project)+delta));project=category.projects[index];imageIndex=0;resetZoom();modal();}
 page.querySelectorAll('[data-album-page]').forEach(button=>button.addEventListener('click',()=>turnPage(Number(button.dataset.albumPage))));
 dialog.querySelectorAll('[data-dp-page]').forEach(button=>button.addEventListener('click',()=>movePage(Number(button.dataset.dpPage))));
 dialog.querySelectorAll('[data-dp-project]').forEach(button=>button.addEventListener('click',()=>moveProject(Number(button.dataset.dpProject))));
 dialog.querySelector('.dp-viewer-close').addEventListener('click',()=>dialog.close());
 dialog.querySelector('.dp-viewer-zoom').addEventListener('click',()=>{dialog.classList.toggle('dp-original-size');modal();});
 dialog.addEventListener('click',event=>{const box=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))dialog.close();});
 document.addEventListener('keydown',event=>{
  if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey||!['ArrowLeft','ArrowRight'].includes(event.key))return;
  const delta=event.key==='ArrowLeft'?-1:1;
  if(dialog.open){event.preventDefault();if(project.images.length>1)movePage(delta);else moveProject(delta);}
  else if(event.target.closest('.dp-album,.dp-album-pages')){event.preventDefault();turnPage(delta);}
 });
 function layout(){
  if(page.closest('.section-layer').hidden)return;
  const next=size();if(next===pageSize)return;
  const first=positions.get(category.id)*pageSize;pageSize=next;positions.set(category.id,Math.floor(first/pageSize));renderAlbum();
 }
 const observer=new ResizeObserver(layout);observer.observe(page);
 document.addEventListener('portfolio:localechange',locale);
 document.addEventListener('portfolio:sectionchange',event=>{if(event.detail.slide==='design')layout();else if(dialog.open)dialog.close();});
 window.portfolioDesignAlbum={turnPage,setPage,advance};
 renderAlbum();layout();
 addEventListener('pagehide',event=>{if(!event.persisted){observer.disconnect();dialog.remove();delete window.portfolioDesignAlbum;}});
})();
