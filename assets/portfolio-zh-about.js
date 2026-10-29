/* User-supplied Chinese CV; the original English resume data stays immutable. */
(() => {
  const original=JSON.parse(document.querySelector('#about-resume-data').textContent);
  const detail=document.querySelector('#about .experience-popover');
  if(!detail)return;
  const experience={
    2026:{company:'国家超级计算西安中心',role:'市场总监助理（品牌宣传与整合营销）',period:'2026.04 - 2026.07',location:'中国陕西西安',bullets:[
      ['政企参访对接','负责政府领导、重点企业及科研院所等高端参访团的全流程接待工作，精细化统筹行程安排、展厅讲解与品牌宣传，确保接待专业流畅，强化品牌信任；在沟通中主动挖掘算力适配、人才培养等合作需求，积极识别营销线索，协助市场总监跟进对接，推动10+合作意向转化为落地项目'],
      ['活动策划执行','独立策划并执行20+场学术研讨及宣传活动；负责方案撰写、资源对接、物料设计、环节策划、会场布置、会务服务及后期宣发；实现从需求收集、活动执行到成果输出的全域闭环，以活动为载体整合传播资源，放大品牌声量'],
      ['私域内容运营','负责超算中心官方公众号及视频号内容策划与运营，聚焦“超算应用”“活动纪实”等方向；通过选题策划、内容发布与数据复盘，实现账号浏览量破万、互动率提高75%，算力体验与购买增量20%以上']
    ]},
    2025:{company:'招商银行西安分行',role:'市场客户经理',period:'2025.08 - 2026.02',location:'中国陕西西安分行',bullets:[
      ['零售客群运营','负责月日均总资产20万元以下集约化客群的用户服务与社群运营，基于客户画像分层制定金融产品服务策略；通过线上社群、企微及线下网点多渠道建联，持续挖掘客户潜在需求并匹配个性化营销方案，提升客户黏性与活跃度，APP月活跃度提升约40%'],
      ['企业获客营销','负责数十家企业客户的全周期开拓、经营与维护；依托银行智能系统研判企业关联客户与产业链线索，结合线下进企活动等渠道拓展获客，深入分析企业经营痛点与差异化需求，输出涵盖产品、服务与资源的精细化解决方案，持续推动客户长期合作与价值提升']
    ]},
    2024:{company:'牛客科技',role:'新媒体运营',period:'2024.05 - 2024.08',location:'中国广东深圳分公司',bullets:[
      ['内容策划运营','负责小红书官方号与素人号内容策划及运营，基于账号定位与用户画像策划高互动内容，结合数据反馈持续优化封面、标题与选题策略；运用稿定设计、Canva搭建10+套可复用笔记模板，统一视觉风格并提升产出效率，累计输出笔记140+篇，实现粉丝增长1200+'],
      ['数据复盘分析','及时跟踪笔记周、月流量数据，覆盖互动率、涨粉、转化率及后期推流表现，并对标竞品数据定位优化空间；通过数据复盘反哺内容策略与运营节奏，保障月均输出10+篇爆款笔记']
    ]},
    2022:{company:'字节跳动',role:'火山引擎国际化翻译平台英语翻译',period:'2022.08 - 2022.09',location:'中国北京',bullets:[
      ['产品出海本地化','负责产品文案、官网及营销物料的英译与海外本地化；结合目标市场语境优化表达，建立并维护术语库，统一品牌与产品术语，实现翻译效率整体提高20%'],
      ['海外新媒体宣发','负责新媒体内容翻译及本地化；采用“机器翻译+译后编辑”模式优化流程，适配平台调性与受众文化，保障内容时效与传播效果，单周翻译量1w+']
    ]}
  };
  let localized=false;
  window.PortfolioChineseExperience=zh=>{
    if(!zh&&!localized)return;
    const year=Number(detail.querySelector('.popover-brand span').textContent);
    const item=zh?experience[year]:original.experience.find(item=>item.year===year);
    if(!item)return;
    for(const field of ['company','role','date','location']) {
      const element=detail.querySelector('.popover-'+field);
      const text=item[field==='date'?'period':field];
      if(zh)element.dataset.localeFixed='true';else delete element.dataset.localeFixed;
      if(element.textContent!==text)element.textContent=text;
    }
    const logo=detail.querySelector('.popover-brand img');
    if(zh)logo.dataset.localeFixed='true';else delete logo.dataset.localeFixed;
    logo.alt=item.company;
    const list=detail.querySelector('.popover-bullets');
    if(zh) {
      list.dataset.localeFixed='true';
      if(list.dataset.resumeYear!==String(year)||!list.firstElementChild?.classList.contains('resume-detail')) {
        list.replaceChildren(...item.bullets.map(([label,text])=>{
          const li=document.createElement('li');li.className='resume-detail';
          const strong=document.createElement('strong');strong.textContent=label+'：';
          li.append(strong,document.createTextNode(text));return li;
        }));
        list.dataset.resumeYear=String(year);
      }
    } else {
      delete list.dataset.localeFixed;delete list.dataset.resumeYear;
      list.replaceChildren(...item.bullets.map(text=>{
        const li=document.createElement('li');li.textContent=text;return li;
      }));
    }
    detail.classList.toggle('locale-resume-zh',zh);
    localized=zh;
  };
})();
