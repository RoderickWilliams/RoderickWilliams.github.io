(() => {
  const sidebar = document.querySelector('.glass-sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const main = document.querySelector('.page');
  const mobile = matchMedia('(max-width:899px)');
  const links = [...sidebar.querySelectorAll('.sidebar-link')];
  const language = sidebar.querySelector('.language-switch');
  const focusables = () => [toggle, ...sidebar.querySelectorAll('a,button')];
  function drawer(open, restore = false) {
    open = mobile.matches && open;
    sidebar.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    sidebar.inert = mobile.matches && !open;
    main.inert = open;
    document.body.classList.toggle('drawer-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) { sidebar.setAttribute('role', 'dialog'); sidebar.setAttribute('aria-modal', 'true'); links[0].focus(); }
    else { sidebar.removeAttribute('role'); sidebar.removeAttribute('aria-modal'); if (restore) toggle.focus(); }
  }
  drawer(false);
  toggle.addEventListener('click', () => drawer(!sidebar.classList.contains('open')));
  backdrop.addEventListener('click', () => drawer(false, true));
  mobile.addEventListener('change', () => drawer(false));
  addEventListener('keydown', event => {
    if (!sidebar.classList.contains('open')) return;
    if (event.key === 'Escape') drawer(false, true);
    if (event.key === 'Tab') {
      const controls = focusables(), first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  const setActive = id => links.forEach(link => {
    const active = link.hash === '#' + id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  links.forEach(link => link.addEventListener('click', () => drawer(false)));
  sidebar.querySelector('.sidebar-brand').addEventListener('click', () => drawer(false));
  setActive(main.dataset.activeSection || 'home');
  document.addEventListener('portfolio:sectionchange', event => setActive(event.detail.id));
  const zh = {
    "Phone":"电话",
    "Introduction":"个人简介",
    "Contact details":"联系方式",
    "Brand communication":"品牌传播",
    "Social content":"社交内容",
    "Event coverage":"活动报道",
    "Get in touch":"欢迎联系",
    "Email":"邮箱",
    "Website":"网站",
    "Focus":"工作领域",
    "Location":"所在地",
    "Thank you!":"感谢关注！",
    'CREATIVE PORTFOLIO':'创意作品集',
    'CONTENT':'内容','with purpose':'让表达有意义','Hello!':'你好！',"I'M":'我是',
    'A New Media Specialist':'新媒体运营', '& Brand Marketer.':'与品牌营销。','IS MY':'是我的','SUPERPOWER':'超能力',
    '02 / About & Experience':'02 / 关于与经历','EXPERIENCE':'工作经历','& STORY':'与我的故事',
    'Built across content, clients and technology.':'在内容、客户与技术领域积累经验。',
    'Assistant to the Marketing Director':'市场总监助理',"National Supercomputing Center in Xi'an":'国家超级计算西安中心',
    'Planned institutional visits, events and digital content for government, industry and research audiences while translating technical capability into clear partnership stories.':'面向政企与科研受众策划参访、活动和数字内容，将技术能力转化为清晰的合作叙事。',
    'Account Manager':'客户经理','China Merchants Bank':'招商银行',
    'Managed retail and enterprise relationships through segmented communication, tailored service and consistent follow-up across multiple channels.':'通过分层沟通、定制服务和多渠道跟进，维护零售与企业客户关系。',
    'Social Media Operations':'新媒体运营','Nowcoder':'牛客',
    'Built reusable content templates, produced high-volume social posts and used account and competitor data to improve editorial decisions.':'搭建可复用的内容模板，持续制作社交媒体笔记，并结合账号与竞品数据优化选题。',
    'English Translation Assistant':'英语翻译助理','ByteDance':'字节跳动',
    'Localized product, marketing and social content for overseas markets and established a terminology system for faster, more consistent delivery.':'面向海外市场完成产品、营销及社交内容本地化，并建立术语体系以提高效率和一致性。',
    'BRAND CONTENT':'品牌内容','EVENTS':'活动策划','CLIENT GROWTH':'客户增长','COMMUNICATION':'沟通','CONTENT OPS':'内容运营','DATA':'数据','LOCALIZATION':'本地化','GLOBAL CONTENT':'国际化内容',
    '03 / Capabilities':'03 / 能力','WHAT':'我能','I DO':'做什么','GOOD CONTENT':'好内容','GOOD BUSINESS':'好业务',
    'BRAND COMMUNICATION':'品牌传播','WEBSITE DESIGN':'网站设计','SOCIAL CONTENT':'社交内容','EVENT MARKETING':'活动营销',
    'Clear stories that make complex brands easier to understand and remember.':'用清晰的叙事，让复杂的品牌更容易被理解和记住。',
    'Responsive digital experiences shaped around real information and audience needs.':'围绕真实信息与受众需求，设计适配不同屏幕的数字体验。',
    'Useful, saveable content for WeChat, video channels and RedNote audiences.':'为微信公众号、视频号和小红书受众创作实用、值得收藏的内容。',
    'Campaign planning and field coverage that turn moments into lasting engagement.':'通过活动策划与现场报道，延续活动的关注与互动。',
    '04 / Portfolio System':'04 / 作品集','SELECTED':'精选','WORK':'作品','Scroll, explore':'向下浏览，探索作品','and stay curious.':'保持好奇。',
    'VIBE CODING':'创意开发','WECHAT ACCOUNT':'微信公众号','REDNOTE':'小红书','Brand Identity':'品牌视觉','Web Design':'网页设计','CASE STUDY COMING SOON':'案例即将上线',
    'Content Archive':'内容档案','ARTICLES':'文章','VIDEOS':'视频','READ ↗':'阅读 ↗',
    'How brand stories make complex technology easier to trust':'品牌故事如何让复杂技术更值得信任','From technical capability to audience value':'从技术能力到受众价值','Designing content for institutional audiences':'面向机构受众的内容设计',
    'BRAND STRATEGY / FEATURE':'品牌策略 / 专题','B2B CONTENT / INSIGHT':'企业内容 / 观点','CONTENT OPERATIONS / GUIDE':'内容运营 / 指南',
    'Inside the Brand Story':'走进品牌故事','Ideas in Motion':'创意进行时','Technology Made Clear':'让技术更清晰','VIDEO FEATURE / 01':'视频专题 / 01','EVENT COVERAGE / 02':'活动报道 / 02','EXPLAINER / 03':'讲解视频 / 03',
    'Selected Notes':'精选笔记','A collection of ideas, observations, and sample content.':'创意、观察与示例内容的作品集。','↓ keep scrolling':'继续向下浏览',
    'CONTENT THAT CONNECTS':'建立联系的内容','MAKE IDEAS MOVE':'让创意行动起来','CAMPAIGN DIARY':'活动日记','AUDIENCE INSIGHTS':'受众洞察','SOCIAL SYSTEMS':'社交内容体系','EVENT NOTES':'活动笔记','CONTENT BLUEPRINT':'内容蓝图',
    'BRAND IDENTITY / SELECTED NOTE':'品牌视觉 / 精选笔记','SOCIAL CAMPAIGN / SELECTED NOTE':'社交营销 / 精选笔记','CONTENT STRATEGY / SELECTED NOTE':'内容策略 / 精选笔记','UI/UX DESIGN / SELECTED NOTE':'交互设计 / 精选笔记','CREATIVE DIRECTION / SELECTED NOTE':'创意方向 / 精选笔记','SOCIAL CAMPAIGN / ARCHIVE NOTE':'社交营销 / 归档笔记','CONTENT RESEARCH / ARCHIVE NOTE':'内容研究 / 归档笔记','CONTENT OPERATIONS / ARCHIVE NOTE':'内容运营 / 归档笔记','EVENT MARKETING / ARCHIVE NOTE':'活动营销 / 归档笔记','BRAND STRATEGY / ARCHIVE NOTE':'品牌策略 / 归档笔记',
    '05 / Toolkit':'05 / 技能工具','SKILLS IN MOTION':'让技能落地','CREATE':'创作','BUILD':'搭建','OPERATE':'运营',
    'Brand storytelling':'品牌叙事','Editorial planning':'选题策划','Social media content':'社媒内容','Visual communication':'视觉传达','Website design':'网页设计','AI product prototyping':'AI 产品原型','Content systems':'内容体系','Data-informed workflows':'数据驱动的工作方法','WeChat operations':'公众号运营','RedNote operations':'小红书运营','Event marketing':'活动营销','Cross-team coordination':'跨团队协作',
    '06 / Contact':'06 / 联系',"LET'S CREATE":'一起创造','SOMETHING GREAT!':'值得期待的作品！','Have a project in mind?':'有想落地的项目吗？',"Let's bring the idea to life.":'让我们一起把它做出来。','CONTACT ME':'联系我','New Media & Brand Marketing':'新媒体运营与品牌营销',"Xi'an, China":'中国西安','THANK':'感谢','YOU!':'你的关注！','PASSIONATE ABOUT CONTENT.':'热爱内容创作。','FOCUSED ON RESULTS.':'关注实际成果。','✦ AVAILABLE FOR':'✦ 欢迎合作','BRAND & CONTENT PROJECTS':'品牌与内容项目',"✱ LET'S WORK TOGETHER!":'✱ 一起合作！'
  };
  const texts = [];
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode, key = node.nodeValue.trim();
    if (zh[key]) texts.push({ node, en: node.nodeValue, zh: node.nodeValue.replace(key, zh[key]) });
  }
  function setLanguage(locale) {
    locale = locale === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = locale;
    const contactLabel = sidebar.querySelector('a[href="#contact"] span');
    if (contactLabel) contactLabel.textContent = locale === 'zh' ? '联系' : 'Contact';
    language.dataset.language = locale;
    language.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === locale)));
    texts.forEach(text => { text.node.nodeValue = text[locale]; });
    try { localStorage.setItem('zibo-language', locale); } catch {}
    document.dispatchEvent(new Event('portfolio:localechange'));
  }
  language.querySelectorAll('button').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  let saved = 'zh'; try { saved = localStorage.getItem('zibo-language') || 'zh'; } catch {}
  setLanguage(saved);
})();
