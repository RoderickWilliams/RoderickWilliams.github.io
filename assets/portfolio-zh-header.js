/* Keep the original controls in one stationary shared header in both locales. */
(() => {
  const records=[...document.querySelectorAll('.section-layer')].map(layer=>({
    layer,brand:layer.querySelector('.hero-category'),
    slot:layer.querySelector(':scope > .portfolio-button-slot'),
    resumes:layer.querySelector('.hero-resume-actions'),header:null,moves:[]
  }));
  function move(record,node,parent) {
    if(!node)return;
    const marker=document.createComment('original header position');
    node.before(marker);record.moves.push({node,marker});parent.append(node);
  }
  function update() {
    const zh=document.documentElement.lang==='zh';
    records.forEach(record=>{
      if(record.header){record.header.setAttribute('aria-label',zh?'页面表头':'Page header');return;}
      const header=document.createElement('header');header.className='zh-page-header';header.setAttribute('aria-label',zh?'页面表头':'Page header');
      const actions=document.createElement('div');actions.className='zh-header-actions';
      move(record,record.brand,header);move(record,record.resumes,actions);move(record,record.slot,actions);
      header.append(actions);record.layer.append(header);record.header=header;
    });
  }
  document.addEventListener('portfolio:localechange',update);
  update();
})();
