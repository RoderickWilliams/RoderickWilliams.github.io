/* ==== assets/resource-loading.js ==== */
/* Request full-quality media only when its page becomes visible. */
(() => {
  const visibleMedia='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){const node=entry.target;if(node.hasAttribute('data-resource-href')){node.setAttribute('href',node.getAttribute('data-resource-href'));node.removeAttribute('data-resource-href');}visibleMedia.unobserve(node);}});
  },{rootMargin:'160px'}):null;
  const activate=root=>{
    if(!root)return;
    root.querySelectorAll('[data-resource-src],[data-resource-href],[data-resource-poster]').forEach(node=>{
      for(const attr of ['src','href','poster']){
        const key='data-resource-'+attr;
        if(node.hasAttribute(key)){node.setAttribute(attr,node.getAttribute(key));node.removeAttribute(key);}
      }
    });
  };
  window.PortfolioMedia={set(node,url,section,attr='src'){
    if(!section&&visibleMedia){node.setAttribute('data-resource-'+attr,url);visibleMedia.observe(node);return;}
    const layer=section?document.querySelector('[data-section="'+section+'"]'):null;
    if(!layer||!layer.hidden){node.removeAttribute('data-resource-'+attr);node.setAttribute(attr,url);}
    else node.setAttribute('data-resource-'+attr,url);
  }};
  document.addEventListener('portfolio:sectionchange',event=>{
    activate(document.querySelector('[data-section="'+(event.detail.slide||event.detail.id)+'"]'));
  });
  document.addEventListener('DOMContentLoaded',()=>{
    activate(document.querySelector('.section-layer:not([hidden])'));
    if('serviceWorker' in navigator) addEventListener('load',()=>{
      navigator.serviceWorker.register('resource-cache.js').catch(()=>{});
    },{once:true});
  },{once:true});
})();

/* ==== assets/vendor/gsap.min.js ==== */
/*!
 * GSAP 3.13.0
 * https://gsap.com
 * 
 * @license Copyright 2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function r(t){return"string"==typeof t}function s(t){return"function"==typeof t}function t(t){return"number"==typeof t}function u(t){return void 0===t}function v(t){return"object"==typeof t}function w(t){return!1!==t}function x(){return"undefined"!=typeof window}function y(t){return s(t)||r(t)}function P(t){return(i=yt(t,ot))&&ze}function Q(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function R(t,e){return!e&&console.warn(t)}function S(t,e){return t&&(ot[t]=e)&&i&&(i[t]=e)||ot}function T(){return 0}function ea(t){var e,r,i=t[0];if(v(i)||s(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(r=gt.length;r--&&!gt[r].targetTest(i););e=gt[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new Zt(t[r],e)))||t.splice(r,1);return t}function fa(t){return t._gsap||ea(Ot(t))[0]._gsap}function ga(t,e,r){return(r=t[e])&&s(r)?t[e]():u(r)&&t.getAttribute&&t.getAttribute(e)||r}function ha(t,e){return(t=t.split(",")).forEach(e)||t}function ia(t){return Math.round(1e5*t)/1e5||0}function ja(t){return Math.round(1e7*t)/1e7||0}function ka(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),"+"===r?t+i:"-"===r?t-i:"*"===r?t*i:t/i}function la(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r}function ma(){var t,e,r=dt.length,i=dt.slice(0);for(ct={},t=dt.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function na(t){return!!(t._initted||t._startAt||t.add)}function oa(t,e,r,i){dt.length&&!L&&ma(),t.render(e,r,i||!!(L&&e<0&&na(t))),dt.length&&!L&&ma()}function pa(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(at).length<2?e:r(t)?t.trim():t}function qa(t){return t}function ra(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function ua(t,e){for(var r in e)"__proto__"!==r&&"constructor"!==r&&"prototype"!==r&&(t[r]=v(e[r])?ua(t[r]||(t[r]={}),e[r]):e[r]);return t}function va(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i}function wa(t){var e=t.parent||I,r=t.keyframes?function _setKeyframeDefaults(i){return function(t,e){for(var r in e)r in t||"duration"===r&&i||"ease"===r||(t[r]=e[r])}}($(t.keyframes)):ra;if(w(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t}function ya(t,e,r,i,n){void 0===r&&(r="_first"),void 0===i&&(i="_last");var a,s=t[i];if(n)for(a=e[n];s&&s[n]>a;)s=s._prev;return s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=s,e.parent=e._dp=t,e}function za(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n=e._prev,a=e._next;n?n._next=a:t[r]===e&&(t[r]=a),a?a._prev=n:t[i]===e&&(t[i]=n),e._next=e._prev=e.parent=null}function Aa(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0}function Ba(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t}function Da(t,e,r,i){return t._startAt&&(L?t._startAt.revert(ht):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))}function Fa(t){return t._repeat?Tt(t._tTime,t=t.duration()+t._rDelay)*t:0}function Ha(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function Ia(t){return t._end=ja(t._start+(t._tDur/Math.abs(t._ts||t._rts||U)||0))}function Ja(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=ja(r._time-(0<t._ts?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ia(t),r._dirty||Ba(r,t)),t}function Ka(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=Ha(t.rawTime(),e),(!e._dur||Mt(0,e.totalDuration(),r)-e._tTime>U)&&e.render(r,!0)),Ba(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)0<=r.rawTime()&&r.totalTime(r._tTime),r=r._dp;t._zTime=-U}}function La(e,r,i,n){return r.parent&&Aa(r),r._start=ja((t(i)?i:i||e!==I?xt(e,i,r):e._time)+r._delay),r._end=ja(r._start+(r.totalDuration()/Math.abs(r.timeScale())||0)),ya(e,r,"_first","_last",e._sort?"_start":0),bt(r)||(e._recent=r),n||Ka(e,r),e._ts<0&&Ja(e,e._tTime),e}function Ma(t,e){return(ot.ScrollTrigger||Q("scrollTrigger",e))&&ot.ScrollTrigger.create(e,t)}function Na(t,e,r,i,n){return Wt(t,e,n),t._initted?!r&&t._pt&&!L&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&f!==Rt.frame?(dt.push(t),t._lazy=[n,i],1):void 0:1}function Sa(t,e,r,i){var n=t._repeat,a=ja(e)||0,s=t._tTime/t._tDur;return s&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=n?n<0?1e10:ja(a*(n+1)+t._rDelay*n):a,0<s&&!i&&Ja(t,t._tTime=t._tDur*s),t.parent&&Ia(t),r||Ba(t.parent,t),t}function Ta(t){return t instanceof Qt?Ba(t):Sa(t,t._dur)}function Wa(e,r,i){var n,a,s=t(r[1]),o=(s?2:1)+(e<2?0:1),u=r[o];if(s&&(u.duration=r[1]),u.parent=i,e){for(n=u,a=i;a&&!("immediateRender"in n);)n=a.vars.defaults||{},a=w(a.vars.inherit)&&a.parent;u.immediateRender=w(n.immediateRender),e<2?u.runBackwards=1:u.startAt=r[o-1]}return new Jt(r[0],u,r[1+o])}function Xa(t,e){return t||0===t?e(t):e}function Za(t,e){return r(t)&&(e=st.exec(t))?e[1]:""}function ab(t,e){return t&&v(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&v(t[0]))&&!t.nodeType&&t!==h}function db(r){return r=Ot(r)[0]||R("Invalid scope")||{},function(t){var e=r.current||r.nativeElement||r;return Ot(t,e.querySelectorAll?e:e===r?R("Invalid scope")||a.createElement("div"):r)}}function eb(t){return t.sort(function(){return.5-Math.random()})}function fb(t){if(s(t))return t;var p=v(t)?t:{each:t},_=Yt(p.ease),m=p.from||0,g=parseFloat(p.base)||0,y={},e=0<m&&m<1,T=isNaN(m)||e,b=p.axis,w=m,x=m;return r(m)?w=x={center:.5,edges:.5,end:1}[m]||0:!e&&T&&(w=m[0],x=m[1]),function(t,e,r){var i,n,a,s,o,u,h,l,f,d=(r||p).length,c=y[d];if(!c){if(!(f="auto"===p.grid?0:(p.grid||[1,N])[1])){for(h=-N;h<(h=r[f++].getBoundingClientRect().left)&&f<d;);f<d&&f--}for(c=y[d]=[],i=T?Math.min(f,d)*w-.5:m%f,n=f===N?0:T?d*x/f-.5:m/f|0,l=N,u=h=0;u<d;u++)a=u%f-i,s=n-(u/f|0),c[u]=o=b?Math.abs("y"===b?s:a):G(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&eb(c),c.max=h-l,c.min=l,c.v=d=(parseFloat(p.amount)||parseFloat(p.each)*(d<f?d-1:b?"y"===b?d/f:f:Math.max(f,d/f))||0)*("edges"===m?-1:1),c.b=d<0?g-d:g,c.u=Za(p.amount||p.each)||0,_=_&&d<0?jt(_):_}return d=(c[t]-c.min)/c.max||0,ja(c.b+(_?_(d):d)*c.v)+c.u}}function gb(i){var n=Math.pow(10,((i+"").split(".")[1]||"").length);return function(e){var r=ja(Math.round(parseFloat(e)/i)*i*n);return(r-r%1)/n+(t(e)?0:Za(e))}}function hb(h,e){var l,f,r=$(h);return!r&&v(h)&&(l=r=h.radius||N,h.values?(h=Ot(h.values),(f=!t(h[0]))&&(l*=l)):h=gb(h.increment)),Xa(e,r?s(h)?function(t){return f=h(t),Math.abs(f-t)<=l?f:t}:function(e){for(var r,i,n=parseFloat(f?e.x:e),a=parseFloat(f?e.y:0),s=N,o=0,u=h.length;u--;)(r=f?(r=h[u].x-n)*r+(i=h[u].y-a)*i:Math.abs(h[u]-n))<s&&(s=r,o=u);return o=!l||s<=l?h[o]:e,f||o===e||t(e)?o:o+Za(e)}:gb(h))}function ib(t,e,r,i){return Xa($(t)?!e:!0===r?!!(r=0):!i,function(){return $(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+.99*r))/r)*r*i)/i})}function mb(e,r,t){return Xa(t,function(t){return e[~~r(t)]})}function pb(t){for(var e,r,i,n,a=0,s="";~(e=t.indexOf("random(",a));)i=t.indexOf(")",e),n="["===t.charAt(e+7),r=t.substr(e+7,i-e-7).match(n?at:tt),s+=t.substr(a,e-a)+ib(n?r:+r[0],n?0:+r[1],+r[2]||1e-5),a=i+1;return s+t.substr(a,t.length-a)}function sb(t,e,r){var i,n,a,s=t.labels,o=N;for(i in s)(n=s[i]-e)<0==!!r&&n&&o>(n=Math.abs(n))&&(a=i,o=n);return a}function ub(t){return Aa(t),t.scrollTrigger&&t.scrollTrigger.kill(!!L),t.progress()<1&&Pt(t,"onInterrupt"),t}function xb(t){if(t)if(t=!t.name&&t.default||t,x()||t.headless){var e=t.name,r=s(t),i=e&&!r&&t.init?function(){this._props=[]}:t,n={init:T,render:ue,add:Vt,kill:de,modifier:he,rawVars:0},a={targetTest:0,get:0,getSetter:ie,aliases:{},register:0};if(Ft(),t!==i){if(pt[e])return;ra(i,ra(va(t,n),a)),yt(i.prototype,yt(n,va(t,a))),pt[i.prop=e]=i,t.targetTest&&(gt.push(i),ft[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}S(e,i),t.register&&t.register(ze,i,ge)}else Ct.push(t)}function Ab(t,e,r){return(6*(t+=t<0?1:1<t?-1:0)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*St+.5|0}function Bb(e,r,i){var n,a,s,o,u,h,l,f,d,c,p=e?t(e)?[e>>16,e>>8&St,e&St]:0:Dt.black;if(!p){if(","===e.substr(-1)&&(e=e.substr(0,e.length-1)),Dt[e])p=Dt[e];else if("#"===e.charAt(0)){if(e.length<6&&(e="#"+(n=e.charAt(1))+n+(a=e.charAt(2))+a+(s=e.charAt(3))+s+(5===e.length?e.charAt(4)+e.charAt(4):"")),9===e.length)return[(p=parseInt(e.substr(1,6),16))>>16,p>>8&St,p&St,parseInt(e.substr(7),16)/255];p=[(e=parseInt(e.substr(1),16))>>16,e>>8&St,e&St]}else if("hsl"===e.substr(0,3))if(p=c=e.match(tt),r){if(~e.indexOf("="))return p=e.match(et),i&&p.length<4&&(p[3]=1),p}else o=+p[0]%360/360,u=p[1]/100,n=2*(h=p[2]/100)-(a=h<=.5?h*(u+1):h+u-h*u),3<p.length&&(p[3]*=1),p[0]=Ab(o+1/3,n,a),p[1]=Ab(o,n,a),p[2]=Ab(o-1/3,n,a);else p=e.match(tt)||Dt.transparent;p=p.map(Number)}return r&&!c&&(n=p[0]/St,a=p[1]/St,s=p[2]/St,h=((l=Math.max(n,a,s))+(f=Math.min(n,a,s)))/2,l===f?o=u=0:(d=l-f,u=.5<h?d/(2-l-f):d/(l+f),o=l===n?(a-s)/d+(a<s?6:0):l===a?(s-n)/d+2:(n-a)/d+4,o*=60),p[0]=~~(o+.5),p[1]=~~(100*u+.5),p[2]=~~(100*h+.5)),i&&p.length<4&&(p[3]=1),p}function Cb(t){var r=[],i=[],n=-1;return t.split(zt).forEach(function(t){var e=t.match(rt)||[];r.push.apply(r,e),i.push(n+=e.length+1)}),r.c=i,r}function Db(t,e,r){var i,n,a,s,o="",u=(t+o).match(zt),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=Bb(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=Cb(t),(i=r.c).join(o)!==a.c.join(o)))for(s=(n=t.replace(zt,"1").split(rt)).length-1;l<s;l++)o+=n[l]+(~i.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!n)for(s=(n=t.split(zt)).length-1;l<s;l++)o+=n[l]+u[l];return o+n[s]}function Gb(t){var e,r=t.join(" ");if(zt.lastIndex=0,zt.test(r))return e=Et.test(r),t[1]=Db(t[1],e),t[0]=Db(t[0],e,Cb(t[1])),!0}function Pb(t){var e=(t+"").split("("),r=Lt[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,i,n={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),n[s]=isNaN(i)?i.replace(Bt,"").trim():+i,s=r.substr(e+1).trim();return n}(e[1])]:function _valueInParentheses(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)}(t).split(",").map(pa)):Lt._CE&&It.test(t)?Lt._CE("",t):r}function Rb(t,e){for(var r,i=t._first;i;)i instanceof Qt?Rb(i,e):!i.vars.yoyoEase||i._yoyo&&i._repeat||i._yoyo===e||(i.timeline?Rb(i.timeline,e):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=e)),i=i._next}function Tb(t,e,r,i){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===i&&(i=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var n,a={easeIn:e,easeOut:r,easeInOut:i};return ha(t,function(t){for(var e in Lt[t]=ot[t]=a,Lt[n=t.toLowerCase()]=r,a)Lt[n+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Lt[t+"."+e]=a[e]}),a}function Ub(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Vb(r,t,e){function Lm(t){return 1===t?1:i*Math.pow(2,-10*t)*K((t-a)*n)+1}var i=1<=t?t:1,n=(e||(r?.3:.45))/(t<1?t:1),a=n/q*(Math.asin(1/i)||0),s="out"===r?Lm:"in"===r?function(t){return 1-Lm(1-t)}:Ub(Lm);return n=q/n,s.config=function(t,e){return Vb(r,t,e)},s}function Wb(e,r){function Tm(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?Tm:"in"===e?function(t){return 1-Tm(1-t)}:Ub(Tm);return t.config=function(t){return Wb(e,t)},t}var F,L,l,I,h,n,a,i,o,f,d,c,p,_,m,g,b,M,k,O,A,C,D,z,E,B,j,Y,X={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Z={duration:.5,overwrite:!1,delay:0},N=1e8,U=1/N,q=2*Math.PI,V=q/4,W=0,G=Math.sqrt,H=Math.cos,K=Math.sin,J="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},$=Array.isArray,tt=/(?:-?\.?\d|\.)+/gi,et=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,rt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,it=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,nt=/[+-]=-?[.\d]+/,at=/[^,'"\[\]\s]+/gi,st=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ot={},ut={suppressEvents:!0,isStart:!0,kill:!1},ht={suppressEvents:!0,kill:!1},lt={suppressEvents:!0},ft={},dt=[],ct={},pt={},_t={},mt=30,gt=[],vt="",yt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},Tt=function _animationCycle(t,e){var r=Math.floor(t=ja(t/e));return t&&r===t?r-1:r},bt=function _isFromOrFromStart(t){var e=t.data;return"isFromStart"===e||"isStart"===e},wt={_start:0,endTime:T,totalDuration:T},xt=function _parsePosition(t,e,i){var n,a,s,o=t.labels,u=t._recent||wt,h=t.duration()>=N?u.endTime(!1):t._dur;return r(e)&&(isNaN(e)||e in o)?(a=e.charAt(0),s="%"===e.substr(-1),n=e.indexOf("="),"<"===a||">"===a?(0<=n&&(e=e.replace(/=/,"")),("<"===a?u._start:u.endTime(0<=u._repeat))+(parseFloat(e.substr(1))||0)*(s?(n<0?u:i).totalDuration()/100:1)):n<0?(e in o||(o[e]=h),o[e]):(a=parseFloat(e.charAt(n-1)+e.substr(n+1)),s&&i&&(a=a/100*($(i)?i[0]:i).totalDuration()),1<n?_parsePosition(t,e.substr(0,n-1),i)+a:h+a)):null==e?h:+e},Mt=function _clamp(t,e,r){return r<t?t:e<r?e:r},kt=[].slice,Ot=function toArray(t,e,i){return l&&!e&&l.selector?l.selector(t):!r(t)||i||!n&&Ft()?$(t)?function _flatten(t,e,i){return void 0===i&&(i=[]),t.forEach(function(t){return r(t)&&!e||ab(t,1)?i.push.apply(i,Ot(t)):i.push(t)})||i}(t,i):ab(t)?kt.call(t,0):t?[t]:[]:kt.call((e||a).querySelectorAll(t),0)},At=function mapRange(e,t,r,i,n){var a=t-e,s=i-r;return Xa(n,function(t){return r+((t-e)/a*s||0)})},Pt=function _callback(t,e,r){var i,n,a,s=t.vars,o=s[e],u=l,h=t._ctx;if(o)return i=s[e+"Params"],n=s.callbackScope||t,r&&dt.length&&ma(),h&&(l=h),a=i?o.apply(n,i):o.call(n),l=u,a},Ct=[],St=255,Dt={aqua:[0,St,St],lime:[0,St,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,St],navy:[0,0,128],white:[St,St,St],olive:[128,128,0],yellow:[St,St,0],orange:[St,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[St,0,0],pink:[St,192,203],cyan:[0,St,St],transparent:[St,St,St,0]},zt=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for(t in Dt)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Et=/hsl[a]?\(/,Rt=(k=Date.now,O=500,A=33,C=k(),D=C,E=z=1e3/240,g={time:0,frame:0,tick:function tick(){Al(!0)},deltaRatio:function deltaRatio(t){return b/(1e3/(t||60))},wake:function wake(){o&&(!n&&x()&&(h=n=window,a=h.document||{},ot.gsap=ze,(h.gsapVersions||(h.gsapVersions=[])).push(ze.version),P(i||h.GreenSockGlobals||!h.gsap&&h||{}),Ct.forEach(xb)),m="undefined"!=typeof requestAnimationFrame&&requestAnimationFrame,p&&g.sleep(),_=m||function(t){return setTimeout(t,E-1e3*g.time+1|0)},c=1,Al(2))},sleep:function sleep(){(m?cancelAnimationFrame:clearTimeout)(p),c=0,_=T},lagSmoothing:function lagSmoothing(t,e){O=t||1/0,A=Math.min(e||33,O)},fps:function fps(t){z=1e3/(t||240),E=1e3*g.time+z},add:function add(n,t,e){var a=t?function(t,e,r,i){n(t,e,r,i),g.remove(a)}:n;return g.remove(n),B[e?"unshift":"push"](a),Ft(),a},remove:function remove(t,e){~(e=B.indexOf(t))&&B.splice(e,1)&&e<=M&&M--},_listeners:B=[]}),Ft=function _wake(){return!c&&Rt.wake()},Lt={},It=/^[\d.\-M][\d.\-,\s]/,Bt=/["']/g,jt=function _invertEase(e){return function(t){return 1-e(1-t)}},Yt=function _parseEase(t,e){return t&&(s(t)?t:Lt[t]||Pb(t))||e};function Al(t){var e,r,i,n,a=k()-D,s=!0===t;if((O<a||a<0)&&(C+=a-A),(0<(e=(i=(D+=a)-C)-E)||s)&&(n=++g.frame,b=i-1e3*g.time,g.time=i/=1e3,E+=e+(z<=e?4:z-e),r=1),s||(p=_(Al)),r)for(M=0;M<B.length;M++)B[M](i,b,n,t)}function jn(t){return t<Y?j*t*t:t<.7272727272727273?j*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?j*(t-=2.25/2.75)*t+.9375:j*Math.pow(t-2.625/2.75,2)+.984375}ha("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;Tb(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Lt.Linear.easeNone=Lt.none=Lt.Linear.easeIn,Tb("Elastic",Vb("in"),Vb("out"),Vb()),j=7.5625,Y=1/2.75,Tb("Bounce",function(t){return 1-jn(1-t)},jn),Tb("Expo",function(t){return Math.pow(2,10*(t-1))*t+t*t*t*t*t*t*(1-t)}),Tb("Circ",function(t){return-(G(1-t*t)-1)}),Tb("Sine",function(t){return 1===t?1:1-H(t*V)}),Tb("Back",Wb("in"),Wb("out"),Wb()),Lt.SteppedEase=Lt.steps=ot.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),n=e?1:0;return function(t){return((i*Mt(0,.99999999,t)|0)+n)*r}}},Z.ease=Lt["quad.out"],ha("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return vt+=t+","+t+"Params,"});var Xt,Zt=function GSCache(t,e){this.id=W++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:ga,this.set=e?e.getSetter:ie},Nt=((Xt=Animation.prototype).delay=function delay(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},Xt.duration=function duration(t){return arguments.length?this.totalDuration(0<this._repeat?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},Xt.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Sa(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},Xt.totalTime=function totalTime(t,e){if(Ft(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Ja(this,t),!r._dp||r.parent||Ka(r,this);r&&r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(0<this._ts&&t<this._tDur||this._ts<0&&0<t||!this._tDur&&!t)&&La(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!e||this._initted&&Math.abs(this._zTime)===U||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),oa(this,t,e)),this},Xt.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Fa(this))%(this._dur+this._rDelay)||(t?this._dur:0),e):this._time},Xt.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):0<=this.rawTime()&&this._initted?1:0},Xt.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+Fa(this),e):this.duration()?Math.min(1,this._time/this._dur):0<this.rawTime()?1:0},Xt.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?Tt(this._tTime,r)+1:1},Xt.timeScale=function timeScale(t,e){if(!arguments.length)return this._rts===-U?0:this._rts;if(this._rts===t)return this;var r=this.parent&&this._ts?Ha(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-U?0:this._rts,this.totalTime(Mt(-Math.abs(this._delay),this.totalDuration(),r),!1!==e),Ia(this),function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this)},Xt.paused=function paused(t){return arguments.length?(this._ps!==t&&((this._ps=t)?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ft(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&Math.abs(this._zTime)!==U&&(this._tTime-=U)))),this):this._ps},Xt.startTime=function startTime(t){if(arguments.length){this._start=t;var e=this.parent||this._dp;return!e||!e._sort&&this.parent||La(e,this,t-this._delay),this}return this._start},Xt.endTime=function endTime(t){return this._start+(w(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},Xt.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ha(e.rawTime(t),this):this._tTime:this._tTime},Xt.revert=function revert(t){void 0===t&&(t=lt);var e=L;return L=t,na(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),"nested"!==this.data&&!1!==t.kill&&this.kill(),L=e,this},Xt.globalTime=function globalTime(t){for(var e=this,r=arguments.length?t:e.rawTime();e;)r=e._start+r/(Math.abs(e._ts)||1),e=e._dp;return!this.parent&&this._sat?this._sat.globalTime(t):r},Xt.repeat=function repeat(t){return arguments.length?(this._repeat=t===1/0?-2:t,Ta(this)):-2===this._repeat?1/0:this._repeat},Xt.repeatDelay=function repeatDelay(t){if(arguments.length){var e=this._time;return this._rDelay=t,Ta(this),e?this.time(e):this}return this._rDelay},Xt.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},Xt.seek=function seek(t,e){return this.totalTime(xt(this,t),w(e))},Xt.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,w(e)),this._dur||(this._zTime=-U),this},Xt.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},Xt.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},Xt.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},Xt.resume=function resume(){return this.paused(!1)},Xt.reversed=function reversed(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-U:0)),this):this._rts<0},Xt.invalidate=function invalidate(){return this._initted=this._act=0,this._zTime=-U,this},Xt.isActive=function isActive(){var t,e=this.parent||this._dp,r=this._start;return!(e&&!(this._ts&&this._initted&&e.isActive()&&(t=e.rawTime(!0))>=r&&t<this.endTime(!0)-U))},Xt.eventCallback=function eventCallback(t,e,r){var i=this.vars;return 1<arguments.length?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},Xt.then=function then(t){var i=this;return new Promise(function(e){function Eo(){var t=i.then;i.then=null,s(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),e(r),i.then=t}var r=s(t)?t:qa;i._initted&&1===i.totalProgress()&&0<=i._ts||!i._tTime&&i._ts<0?Eo():i._prom=Eo})},Xt.kill=function kill(){ub(this)},Animation);function Animation(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Sa(this,+t.duration,1,1),this.data=t.data,l&&(this._ctx=l).data.push(this),c||Rt.wake()}ra(Nt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-U,_prom:0,_ps:!1,_rts:1});var Qt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=w(t.sortChildren),I&&La(t.parent||I,_assertThisInitialized(r),e),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Ma(_assertThisInitialized(r),t.scrollTrigger),r}_inheritsLoose(Timeline,i);var e=Timeline.prototype;return e.to=function to(t,e,r){return Wa(0,arguments,this),this},e.from=function from(t,e,r){return Wa(1,arguments,this),this},e.fromTo=function fromTo(t,e,r,i){return Wa(2,arguments,this),this},e.set=function set(t,e,r){return e.duration=0,e.parent=this,wa(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new Jt(t,e,xt(this,r),1),this},e.call=function call(t,e,r){return La(this,Jt.delayedCall(0,t,e),r)},e.staggerTo=function staggerTo(t,e,r,i,n,a,s){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new Jt(t,r,xt(this,n)),this},e.staggerFrom=function staggerFrom(t,e,r,i,n,a,s){return r.runBackwards=1,wa(r).immediateRender=w(r.immediateRender),this.staggerTo(t,e,r,i,n,a,s)},e.staggerFromTo=function staggerFromTo(t,e,r,i,n,a,s,o){return i.startAt=r,wa(i).immediateRender=w(i.immediateRender),this.staggerTo(t,e,i,n,a,s,o)},e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d,c,p,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=t<=0?0:ja(t),y=this._zTime<0!=t<0&&(this._initted||!g);if(this!==I&&m<v&&0<=t&&(v=m),v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),i=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat){if(c=this._yoyo,o=g+this._rDelay,this._repeat<-1&&t<0)return this.totalTime(100*o+t,e,r);if(i=ja(v%o),v===m?(s=this._repeat,i=g):((s=~~(d=ja(v/o)))&&s===d&&(i=g,s--),g<i&&(i=g)),d=Tt(this._tTime,o),!_&&this._tTime&&d!==s&&this._tTime-d*o-this._dur<=0&&(d=s),c&&1&s&&(i=g-i,p=1),s!==d&&!this._lock){var T=c&&1&d,b=T===(c&&1&s);if(s<d&&(T=!T),_=T?0:v%g?g:v,this._lock=1,this.render(_||(p?0:ja(s*o)),e,!g)._lock=0,this._tTime=v,!e&&this.parent&&Pt(this,"onRepeat"),this.vars.repeatRefresh&&!p&&(this.invalidate()._lock=1),_&&_!==this._time||u!=!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(g=this._dur,m=this._tDur,b&&(this._lock=2,_=T?g:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!p&&this.invalidate()),this._lock=0,!this._ts&&!u)return this;Rb(this,p)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var i;if(e<r)for(i=t._first;i&&i._start<=r;){if("isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if("isPause"===i.data&&i._start<e)return i;i=i._prev}}(this,ja(_),ja(i)))&&(v-=i-(i=h._start)),this._tTime=v,this._time=i,this._act=!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t,_=0),!_&&v&&!e&&!d&&(Pt(this,"onStart"),this._tTime!==v))return this;if(_<=i&&0<=t)for(n=this._first;n;){if(a=n._next,(n._act||i>=n._start)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(i-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(i-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-U);break}}n=a}else{n=this._last;for(var w=t<0?t:i;n;){if(a=n._prev,(n._act||w<=n._end)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(w-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(w-n._start)*n._ts,e,r||L&&na(n)),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-U:U);break}}n=a}}if(h&&!e&&(this.pause(),h.render(_<=i?0:-U)._zTime=_<=i?1:-1,this._ts))return this._start=f,Ia(this),this.render(t,e,r);this._onUpdate&&!e&&Pt(this,"onUpdate",!0),(v===m&&this._tTime>=this.totalDuration()||!v&&_)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||this._lock||(!t&&g||!(v===m&&0<this._ts||!v&&this._ts<0)||Aa(this,1),e||t<0&&!_||!v&&!_&&m||(Pt(this,v===m&&0<=t?"onComplete":"onReverseComplete",!0),!this._prom||v<m&&0<this.timeScale()||this._prom())))}return this},e.add=function add(e,i){var n=this;if(t(i)||(i=xt(this,i,e)),!(e instanceof Nt)){if($(e))return e.forEach(function(t){return n.add(t,i)}),this;if(r(e))return this.addLabel(e,i);if(!s(e))return this;e=Jt.delayedCall(0,e)}return this!==e?La(this,e,i):this},e.getChildren=function getChildren(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-N);for(var n=[],a=this._first;a;)a._start>=i&&(a instanceof Jt?e&&n.push(a):(r&&n.push(a),t&&n.push.apply(n,a.getChildren(!0,e,r)))),a=a._next;return n},e.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},e.remove=function remove(t){return r(t)?this.removeLabel(t):s(t)?this.killTweensOf(t):(t.parent===this&&za(this,t),t===this._recent&&(this._recent=this._last),Ba(this))},e.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ja(Rt.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},e.addLabel=function addLabel(t,e){return this.labels[t]=xt(this,e),this},e.removeLabel=function removeLabel(t){return delete this.labels[t],this},e.addPause=function addPause(t,e,r){var i=Jt.delayedCall(0,e||T,r);return i.data="isPause",this._hasPause=1,La(this,i,xt(this,t))},e.removePause=function removePause(t){var e=this._first;for(t=xt(this,t);e;)e._start===t&&"isPause"===e.data&&Aa(e),e=e._next},e.killTweensOf=function killTweensOf(t,e,r){for(var i=this.getTweensOf(t,r),n=i.length;n--;)Ut!==i[n]&&i[n].kill(t,e);return this},e.getTweensOf=function getTweensOf(e,r){for(var i,n=[],a=Ot(e),s=this._first,o=t(r);s;)s instanceof Jt?la(s._targets,a)&&(o?(!Ut||s._initted&&s._ts)&&s.globalTime(0)<=r&&s.globalTime(s.totalDuration())>r:!r||s.isActive())&&n.push(s):(i=s.getTweensOf(a,r)).length&&n.push.apply(n,i),s=s._next;return n},e.tweenTo=function tweenTo(t,e){e=e||{};var r,i=this,n=xt(i,t),a=e.startAt,s=e.onStart,o=e.onStartParams,u=e.immediateRender,h=Jt.to(i,ra({ease:e.ease||"none",lazy:!1,immediateRender:!1,time:n,overwrite:"auto",duration:e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale())||U,onStart:function onStart(){if(i.pause(),!r){var t=e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale());h._dur!==t&&Sa(h,t,0,1).render(h._time,!0,!0),r=1}s&&s.apply(h,o||[])}},e));return u?h.render(0):h},e.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,ra({startAt:{time:xt(this,t)}},r))},e.recent=function recent(){return this._recent},e.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),sb(this,xt(this,t))},e.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),sb(this,xt(this,t),1)},e.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+U)},e.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);for(var i,n=this._first,a=this.labels;n;)n._start>=r&&(n._start+=t,n._end+=t),n=n._next;if(e)for(i in a)a[i]>=r&&(a[i]+=t);return Ba(this)},e.invalidate=function invalidate(t){var e=this._first;for(this._lock=0;e;)e.invalidate(t),e=e._next;return i.prototype.invalidate.call(this,t)},e.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._dp&&(this._time=this._tTime=this._pTime=0),t&&(this.labels={}),Ba(this)},e.totalDuration=function totalDuration(t){var e,r,i,n=0,a=this,s=a._last,o=N;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-t:t));if(a._dirty){for(i=a.parent;s;)e=s._prev,s._dirty&&s.totalDuration(),o<(r=s._start)&&a._sort&&s._ts&&!a._lock?(a._lock=1,La(a,s,r-s._delay,1)._lock=0):o=r,r<0&&s._ts&&(n-=r,(!i&&!a._dp||i&&i.smoothChildTiming)&&(a._start+=r/a._ts,a._time-=r,a._tTime-=r),a.shiftChildren(-r,!1,-Infinity),o=0),s._end>n&&s._ts&&(n=s._end),s=e;Sa(a,a===I&&a._time>n?a._time:n,1,1),a._dirty=0}return a._tDur},Timeline.updateRoot=function updateRoot(t){if(I._ts&&(oa(I,Ha(t,I)),f=Rt.frame),Rt.frame>=mt){mt+=X.autoSleep||120;var e=I._first;if((!e||!e._ts)&&X.autoSleep&&Rt._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||Rt.sleep()}}},Timeline}(Nt);ra(Qt.prototype,{_lock:0,_hasPause:0,_forcing:0});function bc(t,e,i,n,a,o){var u,h,l,f;if(pt[t]&&!1!==(u=new pt[t]).init(a,u.rawVars?e[t]:function _processVars(t,e,i,n,a){if(s(t)&&(t=Gt(t,a,e,i,n)),!v(t)||t.style&&t.nodeType||$(t)||J(t))return r(t)?Gt(t,a,e,i,n):t;var o,u={};for(o in t)u[o]=Gt(t[o],a,e,i,n);return u}(e[t],n,a,o,i),i,n,o)&&(i._pt=h=new ge(i._pt,a,t,0,1,u.render,u,0,u.priority),i!==d))for(l=i._ptLookup[i._targets.indexOf(a)],f=u._props.length;f--;)l[u._props[f]]=h;return u}function hc(t,r,e,i){var n,a,s=r.ease||i||"power1.inOut";if($(r))a=e[t]||(e[t]=[]),r.forEach(function(t,e){return a.push({t:e/(r.length-1)*100,v:t,e:s})});else for(n in r)a=e[n]||(e[n]=[]),"ease"===n||a.push({t:parseFloat(t),v:r[n],e:s})}var Ut,qt,Vt=function _addPropTween(t,e,i,n,a,o,u,h,l,f){s(n)&&(n=n(a||0,t,o));var d,c=t[e],p="get"!==i?i:s(c)?l?t[e.indexOf("set")||!s(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():c,_=s(c)?l?re:te:$t;if(r(n)&&(~n.indexOf("random(")&&(n=pb(n)),"="===n.charAt(1)&&(!(d=ka(p,n)+(Za(p)||0))&&0!==d||(n=d))),!f||p!==n||qt)return isNaN(p*n)||""===n?(c||e in t||Q(e,n),function _addComplexStringPropTween(t,e,r,i,n,a,s){var o,u,h,l,f,d,c,p,_=new ge(this._pt,t,e,0,1,oe,null,n),m=0,g=0;for(_.b=r,_.e=i,r+="",(c=~(i+="").indexOf("random("))&&(i=pb(i)),a&&(a(p=[r,i],t,e),r=p[0],i=p[1]),u=r.match(it)||[];o=it.exec(i);)l=o[0],f=i.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(d=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:d,c:"="===l.charAt(1)?ka(d,l)-d:parseFloat(l)-d,m:h&&h<4?Math.round:0},m=it.lastIndex);return _.c=m<i.length?i.substring(m,i.length):"",_.fp=s,(nt.test(i)||c)&&(_.e=0),this._pt=_}.call(this,t,e,p,n,_,h||X.stringFilter,l)):(d=new ge(this._pt,t,e,+p||0,n-(p||0),"boolean"==typeof c?se:ne,0,_),l&&(d.fp=l),u&&d.modifier(u,this,t),this._pt=d)},Wt=function _initTween(t,e,r){var i,n,a,s,o,u,h,l,f,d,c,p,_,m=t.vars,g=m.ease,v=m.startAt,y=m.immediateRender,T=m.lazy,b=m.onUpdate,x=m.runBackwards,M=m.yoyoEase,k=m.keyframes,O=m.autoRevert,A=t._dur,P=t._startAt,C=t._targets,S=t.parent,D=S&&"nested"===S.data?S.vars.targets:C,z="auto"===t._overwrite&&!F,E=t.timeline;if(!E||k&&g||(g="none"),t._ease=Yt(g,Z.ease),t._yEase=M?jt(Yt(!0===M?g:M,Z.ease)):0,M&&t._yoyo&&!t._repeat&&(M=t._yEase,t._yEase=t._ease,t._ease=M),t._from=!E&&!!m.runBackwards,!E||k&&!m.stagger){if(p=(l=C[0]?fa(C[0]).harness:0)&&m[l.prop],i=va(m,ft),P&&(P._zTime<0&&P.progress(1),e<0&&x&&y&&!O?P.render(-1,!0):P.revert(x&&A?ht:ut),P._lazy=0),v){if(Aa(t._startAt=Jt.set(C,ra({data:"isStart",overwrite:!1,parent:S,immediateRender:!0,lazy:!P&&w(T),startAt:null,delay:0,onUpdate:b&&function(){return Pt(t,"onUpdate")},stagger:0},v))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(L||!y&&!O)&&t._startAt.revert(ht),y&&A&&e<=0&&r<=0)return void(e&&(t._zTime=e))}else if(x&&A&&!P)if(e&&(y=!1),a=ra({overwrite:!1,data:"isFromStart",lazy:y&&!P&&w(T),immediateRender:y,stagger:0,parent:S},i),p&&(a[l.prop]=p),Aa(t._startAt=Jt.set(C,a)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(L?t._startAt.revert(ht):t._startAt.render(-1,!0)),t._zTime=e,y){if(!e)return}else _initTween(t._startAt,U,U);for(t._pt=t._ptCache=0,T=A&&w(T)||T&&!A,n=0;n<C.length;n++){if(h=(o=C[n])._gsap||ea(C)[n]._gsap,t._ptLookup[n]=d={},ct[h.id]&&dt.length&&ma(),c=D===C?n:D.indexOf(o),l&&!1!==(f=new l).init(o,p||i,t,c,D)&&(t._pt=s=new ge(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){d[t]=s}),f.priority&&(u=1)),!l||p)for(a in i)pt[a]&&(f=bc(a,i,t,c,o,D))?f.priority&&(u=1):d[a]=s=Vt.call(t,o,a,"get",i[a],c,D,0,m.stringFilter);t._op&&t._op[n]&&t.kill(o,t._op[n]),z&&t._pt&&(Ut=t,I.killTweensOf(o,d,t.globalTime(e)),_=!t.parent,Ut=0),t._pt&&T&&(ct[h.id]=1)}u&&_e(t),t._onInit&&t._onInit(t)}t._onUpdate=b,t._initted=(!t._op||t._pt)&&!_,k&&e<=0&&E.render(N,!0,!0)},Gt=function _parseFuncOrString(t,e,i,n,a){return s(t)?t.call(e,i,n,a):r(t)&&~t.indexOf("random(")?pb(t):t},Ht=vt+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Kt={};ha(Ht+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return Kt[t]=1});var Jt=function(E){function Tween(e,r,i,n){var a;"number"==typeof r&&(i.duration=r,r=i,i=null);var s,o,u,h,l,f,d,c,p=(a=E.call(this,n?r:wa(r))||this).vars,_=p.duration,m=p.delay,g=p.immediateRender,T=p.stagger,b=p.overwrite,x=p.keyframes,M=p.defaults,k=p.scrollTrigger,O=p.yoyoEase,A=r.parent||I,P=($(e)||J(e)?t(e[0]):"length"in r)?[e]:Ot(e);if(a._targets=P.length?ea(P):R("GSAP target "+e+" not found. https://gsap.com",!X.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=b,x||T||y(_)||y(m)){if(r=a.vars,(s=a.timeline=new Qt({data:"nested",defaults:M||{},targets:A&&"nested"===A.data?A.vars.targets:P})).kill(),s.parent=s._dp=_assertThisInitialized(a),s._start=0,T||y(_)||y(m)){if(h=P.length,d=T&&fb(T),v(T))for(l in T)~Ht.indexOf(l)&&((c=c||{})[l]=T[l]);for(o=0;o<h;o++)(u=va(r,Kt)).stagger=0,O&&(u.yoyoEase=O),c&&yt(u,c),f=P[o],u.duration=+Gt(_,_assertThisInitialized(a),o,f,P),u.delay=(+Gt(m,_assertThisInitialized(a),o,f,P)||0)-a._delay,!T&&1===h&&u.delay&&(a._delay=m=u.delay,a._start+=m,u.delay=0),s.to(f,u,d?d(o,f,P):0),s._ease=Lt.none;s.duration()?_=m=0:a.timeline=0}else if(x){wa(ra(s.vars.defaults,{ease:"none"})),s._ease=Yt(x.ease||r.ease||"none");var C,S,D,z=0;if($(x))x.forEach(function(t){return s.to(P,t,">")}),s.duration();else{for(l in u={},x)"ease"===l||"easeEach"===l||hc(l,x[l],u,x.easeEach);for(l in u)for(C=u[l].sort(function(t,e){return t.t-e.t}),o=z=0;o<C.length;o++)(D={ease:(S=C[o]).e,duration:(S.t-(o?C[o-1].t:0))/100*_})[l]=S.v,s.to(P,D,z),z+=D.duration;s.duration()<_&&s.to({},{duration:_-s.duration()})}}_||a.duration(_=s.duration())}else a.timeline=0;return!0!==b||F||(Ut=_assertThisInitialized(a),I.killTweensOf(P),Ut=0),La(A,_assertThisInitialized(a),i),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(g||!_&&!x&&a._start===ja(A._time)&&w(g)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(a))&&"nested"!==A.data)&&(a._tTime=-U,a.render(Math.max(0,-m)||0)),k&&Ma(_assertThisInitialized(a),k),a}_inheritsLoose(Tween,E);var e=Tween.prototype;return e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d=this._time,c=this._tDur,p=this._dur,_=t<0,m=c-U<t&&!_?c:t<U?0:t;if(p){if(m!==this._tTime||!t||r||!this._initted&&this._tTime||this._startAt&&this._zTime<0!=_||this._lazy){if(i=m,l=this.timeline,this._repeat){if(s=p+this._rDelay,this._repeat<-1&&_)return this.totalTime(100*s+t,e,r);if(i=ja(m%s),m===c?(a=this._repeat,i=p):(a=~~(o=ja(m/s)))&&a===o?(i=p,a--):p<i&&(i=p),(u=this._yoyo&&1&a)&&(f=this._yEase,i=p-i),o=Tt(this._tTime,s),i===d&&!r&&this._initted&&a===o)return this._tTime=m,this;a!==o&&(l&&this._yEase&&Rb(l,u),this.vars.repeatRefresh&&!u&&!this._lock&&i!==s&&this._initted&&(this._lock=r=1,this.render(ja(s*a),!0).invalidate()._lock=0))}if(!this._initted){if(Na(this,_?t:i,r,e,m))return this._tTime=0,this;if(!(d===this._time||r&&this.vars.repeatRefresh&&a!==o))return this;if(p!==this._dur)return this.render(t,e,r)}if(this._tTime=m,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(f||this._ease)(i/p),this._from&&(this.ratio=h=1-h),!d&&m&&!e&&!o&&(Pt(this,"onStart"),this._tTime!==m))return this;for(n=this._pt;n;)n.r(h,n.d),n=n._next;l&&l.render(t<0?t:l._dur*l._ease(i/this._dur),e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(_&&Da(this,t,0,r),Pt(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&Pt(this,"onRepeat"),m!==this._tDur&&m||this._tTime!==m||(_&&!this._onUpdate&&Da(this,t,0,!0),!t&&p||!(m===this._tDur&&0<this._ts||!m&&this._ts<0)||Aa(this,1),e||_&&!d||!(m||d||u)||(Pt(this,m===c?"onComplete":"onReverseComplete",!0),!this._prom||m<c&&0<this.timeScale()||this._prom()))}}else!function _renderZeroDurationTween(t,e,r,i){var n,a,s,o=t.ratio,u=e<0||!e&&(!t._start&&function _parentPlayheadIsBeforeStart(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||_parentPlayheadIsBeforeStart(e))}(t)&&(t._initted||!bt(t))||(t._ts<0||t._dp._ts<0)&&!bt(t))?0:1,h=t._rDelay,l=0;if(h&&t._repeat&&(l=Mt(0,t._tDur,e),a=Tt(l,h),t._yoyo&&1&a&&(u=1-u),a!==Tt(t._tTime,h)&&(o=1-u,t.vars.repeatRefresh&&t._initted&&t.invalidate())),u!==o||L||i||t._zTime===U||!e&&t._zTime){if(!t._initted&&Na(t,e,i,r,l))return;for(s=t._zTime,t._zTime=e||(r?U:0),r=r||e&&!s,t.ratio=u,t._from&&(u=1-u),t._time=0,t._tTime=l,n=t._pt;n;)n.r(u,n.d),n=n._next;e<0&&Da(t,e,0,!0),t._onUpdate&&!r&&Pt(t,"onUpdate"),l&&t._repeat&&!r&&t.parent&&Pt(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===u&&(u&&Aa(t,1),r||L||(Pt(t,u?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)}(this,t,e,r);return this},e.targets=function targets(){return this._targets},e.invalidate=function invalidate(t){return t&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),E.prototype.invalidate.call(this,t)},e.resetTo=function resetTo(t,e,r,i,n){c||Rt.wake(),this._ts||this.play();var a,s=Math.min(this._dur,(this._dp._time-this._start)*this._ts);return this._initted||Wt(this,s),a=this._ease(s/this._dur),function _updatePropTweens(t,e,r,i,n,a,s,o){var u,h,l,f,d=(t._pt&&t._ptCache||(t._ptCache={}))[e];if(!d)for(d=t._ptCache[e]=[],l=t._ptLookup,f=t._targets.length;f--;){if((u=l[f][e])&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return qt=1,t.vars[e]="+=0",Wt(t,s),qt=0,o?R(e+" not eligible for reset"):1;d.push(u)}for(f=d.length;f--;)(u=(h=d[f])._pt||h).s=!i&&0!==i||n?u.s+(i||0)+a*u.c:i,u.c=r-u.s,h.e&&(h.e=ia(r)+Za(h.e)),h.b&&(h.b=u.s+Za(h.b))}(this,t,e,r,i,a,s,n)?this.resetTo(t,e,r,i,1):(Ja(this,0),this.parent||ya(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e))return this._lazy=this._pt=0,this.parent?ub(this):this.scrollTrigger&&this.scrollTrigger.kill(!!L),this;if(this.timeline){var i=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,Ut&&!0!==Ut.vars.overwrite)._first||ub(this),this.parent&&i!==this.timeline.totalDuration()&&Sa(this,this._dur*this.timeline._tDur/i,0,1),this}var n,a,s,o,u,h,l,f=this._targets,d=t?Ot(t):f,c=this._ptLookup,p=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0}(f,d))return"all"===e&&(this._pt=0),ub(this);for(n=this._op=this._op||[],"all"!==e&&(r(e)&&(u={},ha(e,function(t){return u[t]=1}),e=u),e=function _addAliasesToVars(t,e){var r,i,n,a,s=t[0]?fa(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(i in r=yt({},e),o)if(i in r)for(n=(a=o[i].split(",")).length;n--;)r[a[n]]=r[i];return r}(f,e)),l=f.length;l--;)if(~d.indexOf(f[l]))for(u in a=c[l],"all"===e?(n[l]=e,o=a,s={}):(s=n[l]=n[l]||{},o=e),o)(h=a&&a[u])&&("kill"in h.d&&!0!==h.d.kill(u)||za(this,h,"_pt"),delete a[u]),"all"!==s&&(s[u]=1);return this._initted&&!this._pt&&p&&ub(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return Wa(1,arguments)},Tween.delayedCall=function delayedCall(t,e,r,i){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},Tween.fromTo=function fromTo(t,e,r){return Wa(2,arguments)},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return I.killTweensOf(t,e,r)},Tween}(Nt);ra(Jt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ha("staggerTo,staggerFrom,staggerFromTo",function(r){Jt[r]=function(){var t=new Qt,e=kt.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function pc(t,e,r){return t.setAttribute(e,r)}function xc(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)}var $t=function _setterPlain(t,e,r){return t[e]=r},te=function _setterFunc(t,e,r){return t[e](r)},re=function _setterFuncWithParam(t,e,r,i){return t[e](i.fp,r)},ie=function _getSetter(t,e){return s(t[e])?te:u(t[e])&&t.setAttribute?pc:$t},ne=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e6*(e.s+e.c*t))/1e6,e)},se=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},oe=function _renderComplexString(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},ue=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},he=function _addPluginModifier(t,e,r,i){for(var n,a=this._pt;a;)n=a._next,a.p===i&&a.modifier(t,e,r),a=n},de=function _killPropTweensOf(t){for(var e,r,i=this._pt;i;)r=i._next,i.p===t&&!i.op||i.op===t?za(this,i,"_pt"):i.dep||(e=1),i=r;return!e},_e=function _sortPropTweensByPriority(t){for(var e,r,i,n,a=t._pt;a;){for(e=a._next,r=i;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:i=a,(a._next=r)?r._prev=a:n=a,a=e}t._pt=i},ge=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=xc,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,i,n,a,s,o,u){this.t=e,this.s=i,this.c=n,this.p=r,this.r=a||ne,this.d=s||this,this.set=o||$t,this.pr=u||0,(this._next=t)&&(t._prev=this)}ha(vt+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return ft[t]=1}),ot.TweenMax=ot.TweenLite=Jt,ot.TimelineLite=ot.TimelineMax=Qt,I=new Qt({sortChildren:!1,defaults:Z,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),X.stringFilter=Gb;function Fc(t){return(be[t]||Me).map(function(t){return t()})}function Gc(){var t=Date.now(),o=[];2<t-Oe&&(Fc("matchMediaInit"),Te.forEach(function(t){var e,r,i,n,a=t.queries,s=t.conditions;for(r in a)(e=h.matchMedia(a[r]).matches)&&(i=1),e!==s[r]&&(s[r]=e,n=1);n&&(t.revert(),i&&o.push(t))}),Fc("matchMediaRevert"),o.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Oe=t,Fc("matchMedia"))}var ve,Te=[],be={},Me=[],Oe=0,Ae=0,Pe=((ve=Context.prototype).add=function add(t,i,n){function Iw(){var t,e=l,r=a.selector;return e&&e!==a&&e.data.push(a),n&&(a.selector=db(n)),l=a,t=i.apply(a,arguments),s(t)&&a._r.push(t),l=e,a.selector=r,a.isReverted=!1,t}s(t)&&(n=i,i=t,t=s);var a=this;return a.last=Iw,t===s?Iw(a,function(t){return a.add(null,t)}):t?a[t]=Iw:Iw},ve.ignore=function ignore(t){var e=l;l=null,t(this),l=e},ve.getTweens=function getTweens(){var e=[];return this.data.forEach(function(t){return t instanceof Context?e.push.apply(e,t.getTweens()):t instanceof Jt&&!(t.parent&&"nested"===t.parent.data)&&e.push(t)}),e},ve.clear=function clear(){this._r.length=this.data.length=0},ve.kill=function kill(i,t){var n=this;if(i?function(){for(var t,e=n.getTweens(),r=n.data.length;r--;)"isFlip"===(t=n.data[r]).data&&(t.revert(),t.getChildren(!0,!0,!1).forEach(function(t){return e.splice(e.indexOf(t),1)}));for(e.map(function(t){return{g:t._dur||t._delay||t._sat&&!t._sat.vars.immediateRender?t.globalTime(0):-1/0,t:t}}).sort(function(t,e){return e.g-t.g||-1/0}).forEach(function(t){return t.t.revert(i)}),r=n.data.length;r--;)(t=n.data[r])instanceof Qt?"nested"!==t.data&&(t.scrollTrigger&&t.scrollTrigger.revert(),t.kill()):t instanceof Jt||!t.revert||t.revert(i);n._r.forEach(function(t){return t(i,n)}),n.isReverted=!0}():this.data.forEach(function(t){return t.kill&&t.kill()}),this.clear(),t)for(var e=Te.length;e--;)Te[e].id===this.id&&Te.splice(e,1)},ve.revert=function revert(t){this.kill(t||{})},Context);function Context(t,e){this.selector=e&&db(e),this.data=[],this._r=[],this.isReverted=!1,this.id=Ae++,t&&this.add(t)}var Ce,Se=((Ce=MatchMedia.prototype).add=function add(t,e,r){v(t)||(t={matches:t});var i,n,a,s=new Pe(0,r||this.scope),o=s.conditions={};for(n in l&&!s.selector&&(s.selector=l.selector),this.contexts.push(s),e=s.add("onMatch",e),s.queries=t)"all"===n?a=1:(i=h.matchMedia(t[n]))&&(Te.indexOf(s)<0&&Te.push(s),(o[n]=i.matches)&&(a=1),i.addListener?i.addListener(Gc):i.addEventListener("change",Gc));return a&&e(s,function(t){return s.add(null,t)}),this},Ce.revert=function revert(t){this.kill(t||{})},Ce.kill=function kill(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},MatchMedia);function MatchMedia(t){this.contexts=[],this.scope=t,l&&l.data.push(this)}var De={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return xb(t)})},timeline:function timeline(t){return new Qt(t)},getTweensOf:function getTweensOf(t,e){return I.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,n){r(i)&&(i=Ot(i)[0]);var a=fa(i||{}).get,s=e?qa:pa;return"native"===e&&(e=""),i?t?s((pt[t]&&pt[t].get||a)(i,t,e,n)):function(t,e,r){return s((pt[t]&&pt[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,i){if(1<(r=Ot(r)).length){var n=r.map(function(t){return ze.quickSetter(t,e,i)}),a=n.length;return function(t){for(var e=a;e--;)n[e](t)}}r=r[0]||{};var s=pt[e],o=fa(r),u=o.harness&&(o.harness.aliases||{})[e]||e,h=s?function(t){var e=new s;d._pt=0,e.init(r,i?t+i:t,d,0,[r]),e.render(1,e),d._pt&&ue(1,d)}:o.set(r,u);return s?h:function(t){return h(r,u,i?t+i:t,o,1)}},quickTo:function quickTo(t,i,e){function ay(t,e,r){return n.resetTo(i,t,e,r)}var r,n=ze.to(t,ra(((r={})[i]="+=0.1",r.paused=!0,r.stagger=0,r),e||{}));return ay.tween=n,ay},isTweening:function isTweening(t){return 0<I.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=Yt(t.ease,Z.ease)),ua(Z,t||{})},config:function config(t){return ua(X,t||{})},registerEffect:function registerEffect(t){var i=t.name,n=t.effect,e=t.plugins,a=t.defaults,r=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!pt[t]&&!ot[t]&&R(i+" effect requires "+t+" plugin.")}),_t[i]=function(t,e,r){return n(Ot(t),ra(e||{},a),r)},r&&(Qt.prototype[i]=function(t,e,r){return this.add(_t[i](t,v(e)?e:(r=e)&&{},this),r)})},registerEase:function registerEase(t,e){Lt[t]=Yt(e)},parseEase:function parseEase(t,e){return arguments.length?Yt(t,e):Lt},getById:function getById(t){return I.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,i,n=new Qt(t);for(n.smoothChildTiming=w(t.smoothChildTiming),I.remove(n),n._dp=0,n._time=n._tTime=I._time,r=I._first;r;)i=r._next,!e&&!r._dur&&r instanceof Jt&&r.vars.onComplete===r._targets[0]||La(n,r,r._start-r._delay),r=i;return La(I,n,0),n},context:function context(t,e){return t?new Pe(t,e):l},matchMedia:function matchMedia(t){return new Se(t)},matchMediaRefresh:function matchMediaRefresh(){return Te.forEach(function(t){var e,r,i=t.conditions;for(r in i)i[r]&&(i[r]=!1,e=1);e&&t.revert()})||Gc()},addEventListener:function addEventListener(t,e){var r=be[t]||(be[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function removeEventListener(t,e){var r=be[t],i=r&&r.indexOf(e);0<=i&&r.splice(i,1)},utils:{wrap:function wrap(e,t,r){var i=t-e;return $(e)?mb(e,wrap(0,e.length),t):Xa(r,function(t){return(i+(t-e)%i)%i+e})},wrapYoyo:function wrapYoyo(e,t,r){var i=t-e,n=2*i;return $(e)?mb(e,wrapYoyo(0,e.length-1),t):Xa(r,function(t){return e+(i<(t=(n+(t-e)%n)%n||0)?n-t:t)})},distribute:fb,random:ib,snap:hb,normalize:function normalize(t,e,r){return At(t,e,0,1,r)},getUnit:Za,clamp:function clamp(e,r,t){return Xa(t,function(t){return Mt(e,r,t)})},splitColor:Bb,toArray:Ot,selector:db,mapRange:At,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||Za(t))}},interpolate:function interpolate(e,i,t,n){var a=isNaN(e+i)?0:function(t){return(1-t)*e+t*i};if(!a){var s,o,u,h,l,f=r(e),d={};if(!0===t&&(n=1)&&(t=null),f)e={p:e},i={p:i};else if($(e)&&!$(i)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=i}else n||(e=yt($(e)?[]:{},e));if(!u){for(s in i)Vt.call(d,e,s,"get",i[s]);a=function func(t){return ue(t,d)||(f?e.p:e)}}}return Xa(t,a)},shuffle:eb},install:P,effects:_t,ticker:Rt,updateRoot:Qt.updateRoot,plugins:pt,globalTimeline:I,core:{PropTween:ge,globals:S,Tween:Jt,Timeline:Qt,Animation:Nt,getCache:fa,_removeLinkedListItem:za,reverting:function reverting(){return L},context:function context(t){return t&&l&&(l.data.push(t),t._ctx=l),l},suppressOverwrites:function suppressOverwrites(t){return F=t}}};ha("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return De[t]=Jt[t]}),Rt.add(Qt.updateRoot),d=De.to({},{duration:0});function Kc(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function Mc(t,a){return{name:t,headless:1,rawVars:1,init:function init(t,n,e){e._onInit=function(t){var e,i;if(r(n)&&(e={},ha(n,function(t){return e[t]=1}),n=e),a){for(i in e={},n)e[i]=a(n[i]);n=e}!function _addModifiers(t,e){var r,i,n,a=t._targets;for(r in e)for(i=a.length;i--;)(n=(n=t._ptLookup[i][r])&&n.d)&&(n._pt&&(n=Kc(n,r)),n&&n.modifier&&n.modifier(e[r],t,a[i],r))}(t,n)}}}}var ze=De.registerPlugin({name:"attr",init:function init(t,e,r,i,n){var a,s,o;for(a in this.tween=r,e)o=t.getAttribute(a)||"",(s=this.add(t,"setAttribute",(o||0)+"",e[a],i,n,0,0,a)).op=a,s.b=o,this._props.push(a)},render:function render(t,e){for(var r=e._pt;r;)L?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",headless:1,init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},Mc("roundProps",gb),Mc("modifiers"),Mc("snap",hb))||De;Jt.version=Qt.version=ze.version="3.13.0",o=1,x()&&Ft();function wd(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function xd(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function yd(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function zd(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function Ad(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function Bd(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Cd(t,e,r){return t.style[e]=r}function Dd(t,e,r){return t.style.setProperty(e,r)}function Ed(t,e,r){return t._gsap[e]=r}function Fd(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function Gd(t,e,r,i,n){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(n,a)}function Hd(t,e,r,i,n){var a=t._gsap;a[e]=r,a.renderTransform(n,a)}function Kd(t,e){var r=this,i=this.target,n=i.style,a=i._gsap;if(t in sr&&n){if(this.tfm=this.tfm||{},"transform"===t)return cr.transform.split(",").forEach(function(t){return Kd.call(r,t,e)});if(~(t=cr[t]||t).indexOf(",")?t.split(",").forEach(function(t){return r.tfm[t]=Tr(i,t)}):this.tfm[t]=a.x?a[t]:Tr(i,t),t===_r&&(this.tfm.zOrigin=a.zOrigin),0<=this.props.indexOf(pr))return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(_r,e,"")),t=pr}(n||e)&&this.props.push(t,e,n[t])}function Ld(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))}function Md(){var t,e,r=this.props,i=this.target,n=i.style,a=i._gsap;for(t=0;t<r.length;t+=3)r[t+1]?2===r[t+1]?i[r[t]](r[t+2]):i[r[t]]=r[t+2]:r[t+2]?n[r[t]]=r[t+2]:n.removeProperty("--"===r[t].substr(0,2)?r[t]:r[t].replace(lr,"-$1").toLowerCase());if(this.tfm){for(e in this.tfm)a[e]=this.tfm[e];a.svg&&(a.renderTransform(),i.setAttribute("data-svg-origin",this.svgo||"")),(t=Ye())&&t.isStart||n[pr]||(Ld(n),a.zOrigin&&n[_r]&&(n[_r]+=" "+a.zOrigin+"px",a.zOrigin=0,a.renderTransform()),a.uncache=1)}}function Nd(t,e){var r={target:t,props:[],revert:Md,save:Kd};return t._gsap||ze.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(t){return r.save(t)}),r}function Pd(t,e){var r=Re.createElementNS?Re.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Re.createElement(t);return r&&r.style?r:Re.createElement(t)}function Qd(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(lr,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&Qd(t,gr(e)||e,1)||""}function Td(){(function _windowExists(){return"undefined"!=typeof window})()&&window.document&&(Ee=window,Re=Ee.document,Fe=Re.documentElement,Ie=Pd("div")||{style:{}},Pd("div"),pr=gr(pr),_r=pr+"Origin",Ie.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Xe=!!gr("perspective"),Ye=ze.core.reverting,Le=1)}function Ud(t){var e,r=t.ownerSVGElement,i=Pd("svg",r&&r.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=t.cloneNode(!0);n.style.display="block",i.appendChild(n),Fe.appendChild(i);try{e=n.getBBox()}catch(t){}return i.removeChild(n),Fe.removeChild(i),e}function Vd(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function Wd(e){var r,i;try{r=e.getBBox()}catch(t){r=Ud(e),i=1}return r&&(r.width||r.height)||i||(r=Ud(e)),!r||r.width||r.x||r.y?r:{x:+Vd(e,["x","cx","x1"])||0,y:+Vd(e,["y","cy","y1"])||0,width:0,height:0}}function Xd(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!Wd(t))}function Yd(t,e){if(e){var r,i=t.style;e in sr&&e!==_r&&(e=pr),i.removeProperty?("ms"!==(r=e.substr(0,2))&&"webkit"!==e.substr(0,6)||(e="-"+e),i.removeProperty("--"===r?e:e.replace(lr,"-$1").toLowerCase())):i.removeAttribute(e)}}function Zd(t,e,r,i,n,a){var s=new ge(t._pt,e,r,0,1,a?Bd:Ad);return(t._pt=s).b=i,s.e=n,t._props.push(r),s}function ae(t,e,r,i){var n,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=Ie.style,f=fr.test(e),d="svg"===t.tagName.toLowerCase(),c=(d?"client":"offset")+(f?"Width":"Height"),p="px"===i,_="%"===i;if(i===h||!u||vr[i]||vr[h])return u;if("px"===h||p||(u=ae(t,e,r,"px")),o=t.getCTM&&Xd(t),(_||"%"===h)&&(sr[e]||~e.indexOf("adius")))return n=o?t.getBBox()[f?"width":"height"]:t[c],ia(_?u/n*100:u/100*n);if(l[f?"width":"height"]=100+(p?h:i),a="rem"!==i&&~e.indexOf("adius")||"em"===i&&t.appendChild&&!d?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==Re&&a.appendChild||(a=Re.body),(s=a._gsap)&&_&&s.width&&f&&s.time===Rt.time&&!s.uncache)return ia(u/s.width*100);if(!_||"height"!==e&&"width"!==e)!_&&"%"!==h||yr[Qd(a,"display")]||(l.position=Qd(t,"position")),a===t&&(l.position="static"),a.appendChild(Ie),n=Ie[c],a.removeChild(Ie),l.position="absolute";else{var m=t.style[e];t.style[e]=100+i,n=t[c],m?t.style[e]=m:Yd(t,e)}return f&&_&&((s=fa(a)).time=Rt.time,s.width=a[c]),ia(p?n*u/100:n&&u?100/n*u:0)}function ce(t,e,r,i){if(!r||"none"===r){var n=gr(e,t,1),a=n&&Qd(t,n,1);a&&a!==r?(e=n,r=a):"borderColor"===e&&(r=Qd(t,"borderTopColor"))}var s,o,u,h,l,f,d,c,p,_,m,g=new ge(this._pt,t.style,e,0,1,oe),v=0,y=0;if(g.b=r,g.e=i,r+="","var(--"===(i+="").substring(0,6)&&(i=Qd(t,i.substring(4,i.indexOf(")")))),"auto"===i&&(f=t.style[e],t.style[e]=i,i=Qd(t,e)||i,f?t.style[e]=f:Yd(t,e)),Gb(s=[r,i]),i=s[1],u=(r=s[0]).match(rt)||[],(i.match(rt)||[]).length){for(;o=rt.exec(i);)d=o[0],p=i.substring(v,o.index),l?l=(l+1)%5:"rgba("!==p.substr(-5)&&"hsla("!==p.substr(-5)||(l=1),d!==(f=u[y++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),"="===d.charAt(1)&&(d=ka(h,d)+m),c=parseFloat(d),_=d.substr((c+"").length),v=rt.lastIndex-_.length,_||(_=_||X.units[e]||m,v===i.length&&(i+=_,g.e+=_)),m!==_&&(h=ae(t,e,f,_)||0),g._pt={_next:g._pt,p:p||1===y?p:",",s:h,c:c-h,m:l&&l<4||"zIndex"===e?Math.round:0});g.c=v<i.length?i.substring(v,i.length):""}else g.r="display"===e&&"none"===i?Bd:Ad;return nt.test(i)&&(g.e=0),this._pt=g}function ee(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==i&&"right"!==i||(t=r,r=i,i=t),e[0]=br[r]||r,e[1]=br[i]||i,e.join(" ")}function fe(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,n,a=e.t,s=a.style,o=e.u,u=a._gsap;if("all"===o||!0===o)s.cssText="",i=1;else for(n=(o=o.split(",")).length;-1<--n;)r=o[n],sr[r]&&(i=1,r="transformOrigin"===r?_r:pr),Yd(a,r);i&&(Yd(a,pr),u&&(u.svg&&a.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",kr(a,1),u.uncache=1,Ld(s)))}}function je(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function ke(t){var e=Qd(t,pr);return je(e)?xr:e.substr(7).match(et).map(ia)}function le(t,e){var r,i,n,a,s=t._gsap||fa(t),o=t.style,u=ke(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(n=t.transform.baseVal.consolidate().matrix).a,n.b,n.c,n.d,n.e,n.f]).join(",")?xr:u:(u!==xr||t.offsetParent||t===Fe||s.svg||(n=o.display,o.display="block",(r=t.parentNode)&&(t.offsetParent||t.getBoundingClientRect().width)||(a=1,i=t.nextElementSibling,Fe.appendChild(t)),u=ke(t),n?o.display=n:Yd(t,"display"),a&&(i?r.insertBefore(t,i):r?r.appendChild(t):Fe.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function me(t,e,r,i,n,a){var s,o,u,h=t._gsap,l=n||le(t,!0),f=h.xOrigin||0,d=h.yOrigin||0,c=h.xOffset||0,p=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==xr&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=Wd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),i||!1!==i&&h.smooth?(y=w-f,T=x-d,h.xOffset=c+(y*_+T*g)-y,h.yOffset=p+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!i,h.origin=e,h.originIsAbsolute=!!r,t.style[_r]="0px 0px",a&&(Zd(a,h,"xOrigin",f,w),Zd(a,h,"yOrigin",d,x),Zd(a,h,"xOffset",c,h.xOffset),Zd(a,h,"yOffset",p,h.yOffset)),t.setAttribute("data-svg-origin",w+" "+x)}function pe(t,e,r){var i=Za(e);return ia(parseFloat(e)+parseFloat(ae(t,"x",r+"px",i)))+i}function we(t,e,i,n,a){var s,o,u=360,h=r(a),l=parseFloat(a)*(h&&~a.indexOf("rad")?or:1)-n,f=n+l+"deg";return h&&("short"===(s=a.split("_")[1])&&(l%=u)!==l%180&&(l+=l<0?u:-u),"cw"===s&&l<0?l=(l+36e9)%u-~~(l/u)*u:"ccw"===s&&0<l&&(l=(l-36e9)%u-~~(l/u)*u)),t._pt=o=new ge(t._pt,e,i,n,l,xd),o.e=f,o.u="deg",t._props.push(i),o}function xe(t,e){for(var r in e)t[r]=e[r];return t}function ye(t,e,r){var i,n,a,s,o,u,h,l=xe({},r._gsap),f=r.style;for(n in l.svg?(a=r.getAttribute("transform"),r.setAttribute("transform",""),f[pr]=e,i=kr(r,1),Yd(r,pr),r.setAttribute("transform",a)):(a=getComputedStyle(r)[pr],f[pr]=e,i=kr(r,1),f[pr]=a),sr)(a=l[n])!==(s=i[n])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(n)<0&&(o=Za(a)!==(h=Za(s))?ae(r,n,a,h):parseFloat(a),u=parseFloat(s),t._pt=new ge(t._pt,i,n,o,u-o,wd),t._pt.u=h||0,t._props.push(n));xe(i,l)}var Ee,Re,Fe,Le,Ie,Be,Ye,Xe,Ze=Lt.Power0,Ne=Lt.Power1,Qe=Lt.Power2,Ue=Lt.Power3,qe=Lt.Power4,Ve=Lt.Linear,We=Lt.Quad,Ge=Lt.Cubic,He=Lt.Quart,Ke=Lt.Quint,Je=Lt.Strong,$e=Lt.Elastic,tr=Lt.Back,er=Lt.SteppedEase,rr=Lt.Bounce,ir=Lt.Sine,nr=Lt.Expo,ar=Lt.Circ,sr={},or=180/Math.PI,ur=Math.PI/180,hr=Math.atan2,lr=/([A-Z])/g,fr=/(left|right|width|margin|padding|x)/i,dr=/[\s,\(]\S/,cr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},pr="transform",_r=pr+"Origin",mr="O,Moz,ms,Ms,Webkit".split(","),gr=function _checkPropPrefix(t,e,r){var i=(e||Ie).style,n=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(mr[n]+t in i););return n<0?null:(3===n?"ms":0<=n?mr[n]:"")+t},vr={deg:1,rad:1,turn:1},yr={grid:1,flex:1},Tr=function _get(t,e,r,i){var n;return Le||Td(),e in cr&&"transform"!==e&&~(e=cr[e]).indexOf(",")&&(e=e.split(",")[0]),sr[e]&&"transform"!==e?(n=kr(t,i),n="transformOrigin"!==e?n[e]:n.svg?n.origin:Or(Qd(t,_r))+" "+n.zOrigin+"px"):(n=t.style[e])&&"auto"!==n&&!i&&!~(n+"").indexOf("calc(")||(n=wr[e]&&wr[e](t,e,r)||Qd(t,e)||ga(t,e)||("opacity"===e?1:0)),r&&!~(n+"").trim().indexOf(" ")?ae(t,e,n,r)+r:n},br={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},wr={clearProps:function clearProps(t,e,r,i,n){if("isFromStart"!==n.data){var a=t._pt=new ge(t._pt,e,r,0,0,fe);return a.u=i,a.pr=-10,a.tween=n,t._props.push(r),1}}},xr=[1,0,0,1,0,0],Mr={},kr=function _parseTransform(t,e){var r=t._gsap||new Zt(t);if("x"in r&&!e&&!r.uncache)return r;var i,n,a,s,o,u,h,l,f,d,c,p,_,m,g,v,y,T,b,w,x,M,k,O,A,P,C,S,D,z,E,R,F=t.style,L=r.scaleX<0,I="deg",B=getComputedStyle(t),j=Qd(t,_r)||"0";return i=n=a=u=h=l=f=d=c=0,s=o=1,r.svg=!(!t.getCTM||!Xd(t)),B.translate&&("none"===B.translate&&"none"===B.scale&&"none"===B.rotate||(F[pr]=("none"!==B.translate?"translate3d("+(B.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==B.rotate?"rotate("+B.rotate+") ":"")+("none"!==B.scale?"scale("+B.scale.split(" ").join(",")+") ":"")+("none"!==B[pr]?B[pr]:"")),F.scale=F.rotate=F.translate="none"),m=le(t,r.svg),r.svg&&(O=r.uncache?(A=t.getBBox(),j=r.xOrigin-A.x+"px "+(r.yOrigin-A.y)+"px",""):!e&&t.getAttribute("data-svg-origin"),me(t,O||j,!!O||r.originIsAbsolute,!1!==r.smooth,m)),p=r.xOrigin||0,_=r.yOrigin||0,m!==xr&&(T=m[0],b=m[1],w=m[2],x=m[3],i=M=m[4],n=k=m[5],6===m.length?(s=Math.sqrt(T*T+b*b),o=Math.sqrt(x*x+w*w),u=T||b?hr(b,T)*or:0,(f=w||x?hr(w,x)*or+u:0)&&(o*=Math.abs(Math.cos(f*ur))),r.svg&&(i-=p-(p*T+_*w),n-=_-(p*b+_*x))):(R=m[6],z=m[7],C=m[8],S=m[9],D=m[10],E=m[11],i=m[12],n=m[13],a=m[14],h=(g=hr(R,D))*or,g&&(O=M*(v=Math.cos(-g))+C*(y=Math.sin(-g)),A=k*v+S*y,P=R*v+D*y,C=M*-y+C*v,S=k*-y+S*v,D=R*-y+D*v,E=z*-y+E*v,M=O,k=A,R=P),l=(g=hr(-w,D))*or,g&&(v=Math.cos(-g),E=x*(y=Math.sin(-g))+E*v,T=O=T*v-C*y,b=A=b*v-S*y,w=P=w*v-D*y),u=(g=hr(b,T))*or,g&&(O=T*(v=Math.cos(g))+b*(y=Math.sin(g)),A=M*v+k*y,b=b*v-T*y,k=k*v-M*y,T=O,M=A),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=ia(Math.sqrt(T*T+b*b+w*w)),o=ia(Math.sqrt(k*k+R*R)),g=hr(M,k),f=2e-4<Math.abs(g)?g*or:0,c=E?1/(E<0?-E:E):0),r.svg&&(O=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!je(Qd(t,pr)),O&&t.setAttribute("transform",O))),90<Math.abs(f)&&Math.abs(f)<270&&(L?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),e=e||r.uncache,r.x=i-((r.xPercent=i&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+"px",r.y=n-((r.yPercent=n&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-n)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+"px",r.z=a+"px",r.scaleX=ia(s),r.scaleY=ia(o),r.rotation=ia(u)+I,r.rotationX=ia(h)+I,r.rotationY=ia(l)+I,r.skewX=f+I,r.skewY=d+I,r.transformPerspective=c+"px",(r.zOrigin=parseFloat(j.split(" ")[2])||!e&&r.zOrigin||0)&&(F[_r]=Or(j)),r.xOffset=r.yOffset=0,r.force3D=X.force3D,r.renderTransform=r.svg?zr:Xe?Dr:Ar,r.uncache=0,r},Or=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},Ar=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Dr(t,e)},Pr="0deg",Cr="0px",Sr=") ",Dr=function _renderCSSTransforms(t,e){var r=e||this,i=r.xPercent,n=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,d=r.skewY,c=r.scaleX,p=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==Pr||h!==Pr)){var b,w=parseFloat(h)*ur,x=Math.sin(w),M=Math.cos(w);w=parseFloat(l)*ur,b=Math.cos(w),a=pe(g,a,x*b*-v),s=pe(g,s,-Math.sin(w)*-v),o=pe(g,o,M*b*-v+v)}_!==Cr&&(y+="perspective("+_+Sr),(i||n)&&(y+="translate("+i+"%, "+n+"%) "),!T&&a===Cr&&s===Cr&&o===Cr||(y+=o!==Cr||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+Sr),u!==Pr&&(y+="rotate("+u+Sr),h!==Pr&&(y+="rotateY("+h+Sr),l!==Pr&&(y+="rotateX("+l+Sr),f===Pr&&d===Pr||(y+="skew("+f+", "+d+Sr),1===c&&1===p||(y+="scale("+c+", "+p+Sr),g.style[pr]=y||"translate(0, 0)"},zr=function _renderSVGTransforms(t,e){var r,i,n,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,d=o.rotation,c=o.skewX,p=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),M=parseFloat(f);d=parseFloat(d),c=parseFloat(c),(p=parseFloat(p))&&(c+=p=parseFloat(p),d+=p),d||c?(d*=ur,c*=ur,r=Math.cos(d)*_,i=Math.sin(d)*_,n=Math.sin(d-c)*-m,a=Math.cos(d-c)*m,c&&(p*=ur,s=Math.tan(c-p),n*=s=Math.sqrt(1+s*s),a*=s,p&&(s=Math.tan(p),r*=s=Math.sqrt(1+s*s),i*=s)),r=ia(r),i=ia(i),n=ia(n),a=ia(a)):(r=_,a=m,i=n=0),(x&&!~(l+"").indexOf("px")||M&&!~(f+"").indexOf("px"))&&(x=ae(g,"x",l,"px"),M=ae(g,"y",f,"px")),(v||y||T||b)&&(x=ia(x+v-(v*r+y*n)+T),M=ia(M+y-(v*i+y*a)+b)),(u||h)&&(s=g.getBBox(),x=ia(x+u/100*s.width),M=ia(M+h/100*s.height)),s="matrix("+r+","+i+","+n+","+a+","+x+","+M+")",g.setAttribute("transform",s),w&&(g.style[pr]=s)};ha("padding,margin,Width,Radius",function(e,r){var t="Right",i="Bottom",n="Left",o=(r<3?["Top",t,i,n]:["Top"+n,"Top"+t,i+t,i+n]).map(function(t){return r<2?e+t:"border"+t+e});wr[1<r?"border"+e:e]=function(e,t,r,i,n){var a,s;if(arguments.length<4)return a=o.map(function(t){return Tr(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(i+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,n)}});var Er,Rr,Fr,Lr={name:"css",register:Td,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,i,n,a){var s,o,u,h,l,f,d,c,p,_,m,g,v,y,T,b,w=this._props,x=t.style,M=i.vars.startAt;for(d in Le||Td(),this.styles=this.styles||Nd(t),b=this.styles.props,this.tween=i,e)if("autoRound"!==d&&(o=e[d],!pt[d]||!bc(d,e,i,n,t,a)))if(l=typeof o,f=wr[d],"function"===l&&(l=typeof(o=o.call(i,n,t,a))),"string"===l&&~o.indexOf("random(")&&(o=pb(o)),f)f(this,t,d,o,i)&&(T=1);else if("--"===d.substr(0,2))s=(getComputedStyle(t).getPropertyValue(d)+"").trim(),o+="",zt.lastIndex=0,zt.test(s)||(c=Za(s),p=Za(o)),p?c!==p&&(s=ae(t,d,s,p)+p):c&&(o+=c),this.add(x,"setProperty",s,o,n,a,0,0,d),w.push(d),b.push(d,0,x[d]);else if("undefined"!==l){if(M&&d in M?(s="function"==typeof M[d]?M[d].call(i,n,t,a):M[d],r(s)&&~s.indexOf("random(")&&(s=pb(s)),Za(s+"")||"auto"===s||(s+=X.units[d]||Za(Tr(t,d))||""),"="===(s+"").charAt(1)&&(s=Tr(t,d))):s=Tr(t,d),h=parseFloat(s),(_="string"===l&&"="===o.charAt(1)&&o.substr(0,2))&&(o=o.substr(2)),u=parseFloat(o),d in cr&&("autoAlpha"===d&&(1===h&&"hidden"===Tr(t,"visibility")&&u&&(h=0),b.push("visibility",0,x.visibility),Zd(this,x,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),"scale"!==d&&"transform"!==d&&~(d=cr[d]).indexOf(",")&&(d=d.split(",")[0])),m=d in sr)if(this.styles.save(d),"string"===l&&"var(--"===o.substring(0,6)&&(o=Qd(t,o.substring(4,o.indexOf(")"))),u=parseFloat(o)),g||((v=t._gsap).renderTransform&&!e.parseTransform||kr(t,e.parseTransform),y=!1!==e.smoothOrigin&&v.smooth,(g=this._pt=new ge(this._pt,x,pr,0,1,v.renderTransform,v,0,-1)).dep=1),"scale"===d)this._pt=new ge(this._pt,v,"scaleY",v.scaleY,(_?ka(v.scaleY,_+u):u)-v.scaleY||0,wd),this._pt.u=0,w.push("scaleY",d),d+="X";else{if("transformOrigin"===d){b.push(_r,0,x[_r]),o=ee(o),v.svg?me(t,o,0,y,0,this):((p=parseFloat(o.split(" ")[2])||0)!==v.zOrigin&&Zd(this,v,"zOrigin",v.zOrigin,p),Zd(this,x,d,Or(s),Or(o)));continue}if("svgOrigin"===d){me(t,o,1,y,0,this);continue}if(d in Mr){we(this,v,d,h,_?ka(h,_+o):o);continue}if("smoothOrigin"===d){Zd(this,v,"smooth",v.smooth,o);continue}if("force3D"===d){v[d]=o;continue}if("transform"===d){ye(this,o,t);continue}}else d in x||(d=gr(d)||d);if(m||(u||0===u)&&(h||0===h)&&!dr.test(o)&&d in x)u=u||0,(c=(s+"").substr((h+"").length))!==(p=Za(o)||(d in X.units?X.units[d]:c))&&(h=ae(t,d,s,p)),this._pt=new ge(this._pt,m?v:x,d,h,(_?ka(h,_+u):u)-h,m||"px"!==p&&"zIndex"!==d||!1===e.autoRound?wd:zd),this._pt.u=p||0,c!==p&&"%"!==p&&(this._pt.b=s,this._pt.r=yd);else if(d in x)ce.call(this,t,d,s,_?_+o:o);else if(d in t)this.add(t,d,s||t[d],_?_+o:o,n,a);else if("parseTransform"!==d){Q(d,o);continue}m||(d in x?b.push(d,0,x[d]):"function"==typeof t[d]?b.push(d,2,t[d]()):b.push(d,1,s||t[d])),w.push(d)}T&&_e(this)},render:function render(t,e){if(e.tween._time||!Ye())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:Tr,aliases:cr,getSetter:function getSetter(t,e,r){var i=cr[e];return i&&i.indexOf(",")<0&&(e=i),e in sr&&e!==_r&&(t._gsap.x||Tr(t,"x"))?r&&Be===r?"scale"===e?Fd:Ed:(Be=r||{})&&("scale"===e?Gd:Hd):t.style&&!u(t.style[e])?Cd:~e.indexOf("-")?Dd:ie(t,e)},core:{_removeProperty:Yd,_getMatrix:le}};ze.utils.checkPrefix=gr,ze.core.getStyleSaver=Nd,Fr=ha((Er="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(Rr="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){sr[t]=1}),ha(Rr,function(t){X.units[t]="deg",Mr[t]=1}),cr[Fr[13]]=Er+","+Rr,ha("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");cr[e[1]]=Fr[e[0]]}),ha("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){X.units[t]="px"}),ze.registerPlugin(Lr);var Ir=ze.registerPlugin(Lr)||ze,Br=Ir.core.Tween;e.Back=tr,e.Bounce=rr,e.CSSPlugin=Lr,e.Circ=ar,e.Cubic=Ge,e.Elastic=$e,e.Expo=nr,e.Linear=Ve,e.Power0=Ze,e.Power1=Ne,e.Power2=Qe,e.Power3=Ue,e.Power4=qe,e.Quad=We,e.Quart=He,e.Quint=Ke,e.Sine=ir,e.SteppedEase=er,e.Strong=Je,e.TimelineLite=Qt,e.TimelineMax=Qt,e.TweenLite=Jt,e.TweenMax=Br,e.default=Ir,e.gsap=Ir;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});


/* ==== assets/screen-cuts.js ==== */
/* Screen and view changes are direct cuts. Object hover motion is independent. */
window.portfolioScreenMotion = false;

/* ==== assets/section-navigation.js ==== */
(() => {
  const viewport = document.querySelector('.section-viewport');
  const order = ['home','work','wechat','rednote','rednote-notes','design','skills','contact'];
  const workSlides = ['work','wechat','rednote','rednote-notes','design'];
  const layers = order.map(id => viewport.querySelector(`[data-section="${id}"]`));
  const areas = layers.map(layer => layer.querySelector('.section-scroll-area'));
  const links = [...document.querySelectorAll('.sidebar-link')];
  const positions = order.map(() => 0);
  const mobile = matchMedia('(max-width:899px)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const hero = document.querySelector('#home');
  let active = 0, locked = false, pendingUrl = null, timeline = null;
  let accumulator = 0, lastWheel = 0, lastContentWheel = -Infinity, cooldown = 0, gestureGuard = false;
  const resolve = hash => {
    const id = hash.replace(/^#/, '');
    if (!id || id === 'about') return {index:0,target:hero};
    const target = document.getElementById(id);
    const owner = target?.closest('.section-layer');
    return owner ? {index:order.indexOf(owner.dataset.section),target} : null;
  };
  const publish = () => {
    const section = workSlides.includes(order[active]) ? 'work' : order[active];
    // Resume actions switch immediately, outside the reading-area crossfade.
    layers.forEach((layer,index)=>{
      const resumes=layer.querySelector('.hero-resume-actions');
      if(resumes)resumes.hidden=index!==active;
    });
    viewport.dataset.activeSection = section;
    viewport.dataset.activeWorkSlide = workSlides.includes(order[active]) ? order[active] : '';
    links.forEach(link => {
      const selected = link.hash === '#' + section;
      link.classList.toggle('active',selected);
      if (selected) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
    document.dispatchEvent(new CustomEvent('portfolio:sectionchange',{detail:{id:section,slide:order[active]}}));
  };
  const setVisible = (index, visible) => {
    layers[index].hidden = !visible;
    layers[index].inert = !visible;
    layers[index].setAttribute('aria-hidden',String(!visible));
  };
  const moveToAnchor = (index,target) => {
    if (target && target.id !== order[index]) {
      const area = areas[index];
      area.scrollTo({top:area.scrollTop + target.getBoundingClientRect().top - area.getBoundingClientRect().top,behavior:reduced.matches?'instant':'smooth'});
    }
  };
  const updateUrl = (target,source) => {
    const hash = '#' + target.id;
    if (source !== 'url' && location.hash !== hash) history.pushState(null,'',hash);
  };
  function navigateToSection(targetId,source='sidebar') {
    const destination = resolve(targetId);
    if (!destination || destination.index < 0) return false;
    if (locked) { if (source === 'url') pendingUrl = targetId; return false; }
    const {index,target} = destination;
    if (index === active) { updateUrl(target,source); moveToAnchor(index,target); return false; }
    const previous = active, direction = index > active ? 1 : -1;
    positions[previous] = areas[previous].scrollTop;
    locked = true; accumulator = 0;
    layers[previous].inert = true;
    setVisible(index,true);
    layers[index].inert = true;
    areas[index].scrollTop = positions[index];
    active = index; publish(); updateUrl(target,source);
    const finish = () => {
      setVisible(previous,false); setVisible(index,true);
      [layers[previous],layers[index]].forEach(layer => { layer.style.opacity=''; layer.style.transform=''; });
      locked = false; cooldown = performance.now() + 180; gestureGuard = true;
      moveToAnchor(index,target);
      if (source === 'sidebar' || source === 'keyboard') {
        const heading = layers[index].querySelector('h1,h2');
        if (heading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
      }
      if (pendingUrl !== null) { const next = pendingUrl; pendingUrl = null; navigateToSection(next,'url'); }
    };
    // Page fades are separate from the disabled component entrance effects.
    // Animate only the reading areas; the shared headers stay stationary.
    if(reduced.matches){finish();return true;}
    const outgoing=areas[previous],incoming=areas[index];
    const settle=()=>{
      outgoing.style.opacity='';incoming.style.opacity='';finish();
    };
    if(window.gsap){
      timeline=gsap.timeline({defaults:{ease:'power1.inOut'},onComplete:settle});
      timeline.to(outgoing,{opacity:0,duration:.24},0)
        .fromTo(incoming,{opacity:0},{opacity:1,duration:.24},0);
    }else if(incoming.animate){
      const fades=[
        outgoing.animate([{opacity:1},{opacity:0}],{duration:240,easing:'ease-in-out',fill:'both'}),
        incoming.animate([{opacity:0},{opacity:1}],{duration:240,easing:'ease-in-out',fill:'both'})
      ];
      let complete=false;
      const done=()=>{
        if(complete)return;complete=true;
        fades.forEach(fade=>fade.cancel());settle();
      };
      timeline={progress:()=>{done();return timeline;},kill:()=>{done();}};
      Promise.all(fades.map(fade=>fade.finished)).then(done,done);
    }else settle();
    return true;
  }
  const initial = resolve(location.hash) || {index:0,target:hero};
  active = initial.index;
  layers.forEach((_,index) => setVisible(index,index === active));
  publish();
  if (initial.target.id !== order[active]) requestAnimationFrame(() => moveToAnchor(active,initial.target));

  document.addEventListener('click',event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.hasAttribute('download') || link.target === '_blank') return;
    if (!resolve(link.hash)) return;
    event.preventDefault();
    navigateToSection(link.hash,'sidebar');
  });
  const handleUrl = () => navigateToSection(location.hash,'url');
  addEventListener('popstate',handleUrl);
  addEventListener('hashchange',handleUrl);

  viewport.addEventListener('wheel',event => {
    if ((mobile.matches && !workSlides.includes(order[active])) || event.ctrlKey || event.shiftKey || Math.abs(event.deltaX)>Math.abs(event.deltaY) || document.body.classList.contains('drawer-open') || document.querySelector('dialog[open],[aria-modal="true"]:not(dialog):not([hidden]),[popover]:popover-open')) return;
    const now = performance.now(), gap = now-lastWheel;
    lastWheel = now;
    if (locked || now < cooldown || (gestureGuard && gap < 180)) { event.preventDefault(); accumulator=0; return; }
    gestureGuard = false;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1);
    if (!delta) return;
    const reader=window.PortfolioReadingFlow;
    if(reader?.handles(order[active])){
      event.preventDefault();
      if(reader.scroll(order[active],delta)){accumulator=0;lastContentWheel=now;return;}
      // Read to the boundary, release the wheel, then start the next content step.
      if(now-lastContentWheel<180){accumulator=0;lastContentWheel=now;return;}
      if(gap>180||Math.sign(accumulator)!==Math.sign(delta))accumulator=0;
      accumulator+=delta;
      if(Math.abs(accumulator)<60)return;
      accumulator=0;
      if(reader.advance(order[active],delta>0?1:-1)){
        cooldown=now+180;gestureGuard=true;
      }else{
        const next=active+(delta>0?1:-1);
        if(next>=0&&next<order.length)navigateToSection(order[next],'wheel');
      }
      return;
    }
    if (order[active] === 'design'  && window.portfolioDesignAlbum) {
      const album=layers[active].querySelector('.dp-album'), down=delta>0;
      const readingAreas=[event.target.closest('.dp-project-media'),...layers[active].querySelectorAll('.dp-project-media'),album].filter(Boolean);
      const readingArea=readingAreas.find(area=>area.scrollHeight>area.clientHeight+4&&(down?area.scrollTop+area.clientHeight<area.scrollHeight-4:area.scrollTop>4));
      if(readingArea){event.preventDefault();readingArea.scrollTop+=delta;accumulator=0;lastContentWheel=now;return;}
      event.preventDefault();
      if(now-lastContentWheel<180){accumulator=0;lastContentWheel=now;return;}
      if (gap > 180 || Math.sign(accumulator) !== Math.sign(delta)) accumulator=0;
      accumulator += delta;
      if (Math.abs(accumulator) >= 60) {
        accumulator=0;
        if (window.portfolioDesignAlbum.advance(delta>0?1:-1)) { cooldown=now+180; gestureGuard=true; }
        else navigateToSection(delta>0?'skills':'rednote-notes','wheel');
      }
      return;
    }
    if (order[active] === 'rednote-notes') {
      const selector = '.rn-wall-scroll';
      const wall = layers[active].querySelector(selector);
      const atTop = delta < 0 && wall.scrollTop <= 4;
      const atBottom = delta > 0 && wall.scrollTop + wall.clientHeight >= wall.scrollHeight - 4;
      if (atTop || atBottom) {
        event.preventDefault();
        // A fresh gesture at either reading edge moves to the adjacent Work page.
        if (now-lastContentWheel < 180) { accumulator=0; lastContentWheel=now; return; }
        if (gap > 180 || Math.sign(accumulator) !== Math.sign(delta)) accumulator=0;
        accumulator += delta;
        if (Math.abs(accumulator) >= 60) { accumulator=0; navigateToSection(atTop ? 'rednote' : 'design','wheel'); }
        return;
      }
      accumulator = 0; lastContentWheel = now;
      if (!event.target.closest(selector)) { event.preventDefault(); wall.scrollTop += delta; }
      return;
    }
    const area = areas[active], down = delta > 0;
    const canRead = area.scrollHeight > area.clientHeight+4 && (down ? area.scrollTop+area.clientHeight < area.scrollHeight-4 : area.scrollTop>4);
    if (canRead) { accumulator=0; lastContentWheel=now; return; }
    event.preventDefault();
    // Reaching an edge within the same gesture never navigates away.
    if (now-lastContentWheel < 180) { accumulator=0; lastContentWheel=now; return; }
    if (gap > 180 || Math.sign(accumulator) !== Math.sign(delta)) accumulator=0;
    accumulator += delta;
    if (Math.abs(accumulator) < 60) return;
    const next = active + (down?1:-1);
    accumulator=0;
    if (next >= 0 && next < order.length) navigateToSection(order[next],'wheel');
  },{passive:false});
  addEventListener('keydown',event => {
    if (document.body.classList.contains('thinking-modal-open') || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input,textarea,select,[contenteditable],[role="dialog"]') || document.body.classList.contains('drawer-open')) return;
    const reader=window.PortfolioReadingFlow;
    if(reader?.handles(order[active])&&['ArrowDown','ArrowUp','PageDown','PageUp'].includes(event.key)){
      event.preventDefault();
      if(locked||performance.now()<cooldown)return;
      const direction=['ArrowDown','PageDown'].includes(event.key)?1:-1;
      const delta=direction*(event.key.startsWith('Page')?areas[active].clientHeight*.85:48);
      if(reader.scroll(order[active],delta))return;
      if(reader.advance(order[active],direction)){cooldown=performance.now()+180;return;}
      const next=active+direction;
      if(next>=0&&next<order.length)navigateToSection(order[next],'keyboard');
      return;
    }
    if (order[active] === 'design' && window.portfolioDesignAlbum && ['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(event.key)) {
      event.preventDefault();
      if (event.key === 'Home' || event.key === 'End') window.portfolioDesignAlbum.setPage(event.key === 'End');
      else {
        const down=['ArrowDown','PageDown'].includes(event.key);
        if (!window.portfolioDesignAlbum.advance(down?1:-1)) navigateToSection(down?'skills':'rednote-notes','keyboard');
      }
      return;
    }
    if (order[active] === 'rednote-notes' && ['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(event.key)) {
      event.preventDefault();
      const wall = layers[active].querySelector('.rn-wall-scroll');
      if (event.key === 'Home') wall.scrollTop = 0;
      else if (event.key === 'End') wall.scrollTop = wall.scrollHeight;
      else wall.scrollTop += (['ArrowUp','PageUp'].includes(event.key) ? -1 : 1) * (event.key.startsWith('Page') ? wall.clientHeight * .85 : 48);
      return;
    }
    let next;
    if (['ArrowDown','PageDown'].includes(event.key)) next=active+1;
    else if (['ArrowUp','PageUp'].includes(event.key)) next=active-1;
    else if (event.key === 'Home') next=0;
    else if (event.key === 'End') next=order.length-1;
    else return;
    event.preventDefault();
    if (next>=0 && next<order.length) navigateToSection(order[next],'keyboard');
  });

  // Touch navigation shares the same section controller and transition lock.
  // Only a swipe that begins at the reading edge changes the Work slide.
  let swipe = null;
  viewport.addEventListener('touchstart',event=>{
    if (order[active] === 'rednote-notes') { swipe=null; return; }
    if (event.touches.length!==1 || !workSlides.includes(order[active]) || locked || document.body.classList.contains('drawer-open')) { swipe=null; return; }
    const area=areas[active], point=event.touches[0];
    if (order[active] === 'design' && window.portfolioDesignAlbum) { swipe={x:point.clientX,y:point.clientY,index:active,design:true}; return; }
    swipe={x:point.clientX,y:point.clientY,index:active,up:area.scrollTop<=4,down:area.scrollTop+area.clientHeight>=area.scrollHeight-4};
  },{passive:true});
  viewport.addEventListener('touchend',event=>{
    if (!swipe || !event.changedTouches.length) return;
    const start=swipe; swipe=null;
    const point=event.changedTouches[0], dy=start.y-point.clientY, dx=start.x-point.clientX;
    if (locked || active!==start.index || performance.now()<cooldown || Math.abs(dy)<55 || Math.abs(dy)<Math.abs(dx)*1.4) return;
    if (start.design) {
      event.preventDefault();
      if (window.portfolioDesignAlbum.advance(dy>0?1:-1)) { cooldown=performance.now()+180; gestureGuard=true; }
      else navigateToSection(dy>0?'skills':'rednote-notes','touch');
      return;
    }
    if (dy>0 ? !start.down : !start.up) return;
    const next=active+(dy>0?1:-1);
    if (next>=0 && next<order.length) { event.preventDefault(); navigateToSection(order[next],'touch'); }
  },{passive:false});
  viewport.addEventListener('touchcancel',()=>{swipe=null;},{passive:true});
  document.addEventListener('portfolio:localechange',()=>{if(document.documentElement.lang==='zh'&&locked)timeline?.progress(1).kill();});
  addEventListener('pagehide',event=>{if (!event.persisted) { timeline?.kill(); }});
})();

/* ==== assets/portfolio-zh-data.js ==== */
window.PortfolioChineseCopy = {"phrases":{"global":{"Zibo Wang — New Media Operations & Brand Marketing":"王子博 — 新媒体运营与品牌营销","ZIBO WANG":"王子博","Home":"首页","About":"关于","Work":"作品","Skills":"技能","Contact":"联系","English":"English","Placeholder preview":"预览占位","This is placeholder content. Once the original link is provided, the account profile or post will open here.":"这里是占位内容。补上原始链接后，就会在这里打开账号主页或笔记。","Zibo Wang — New Media Operations and Brand Marketing portfolio":"王子博 — 新媒体运营与品牌营销作品集","Open navigation":"打开菜单","Portfolio navigation":"作品集菜单","Primary navigation":"主菜单","Website language":"网站语言","Switch to Chinese":"切换为中文","Switch to English":"切换为英文","Close preview":"关闭预览","Close navigation":"关闭菜单"},"home":{"MY PORTFOLIO":"我的作品集","NEW MEDIA BRAND MARKETING":"新媒体·品牌营销","Hello!":"你好！","I'M ZIBO WANG":"我是王子博","A New Media Specialist& Brand Marketer.":"做新媒体，也做品牌营销。","Home content":"首页内容"},"work":{"MY PORTFOLIO":"我的作品集","NEW MEDIA BRAND MARKETING":"新媒体·品牌营销","WHAT DID I DO & HOW DO I THINK":"我做过什么 & 我的想法","MY EXPERIENCE":"我的经历","WeChat":"微信公众号","RedNote":"小红书","Content strategy, data analysis, and community management.":"内容策划、数据分析与社群运营。","Design":"设计","Brochure, poster, and social media content design.":"宣传册、海报与社媒内容设计。","HOW I THINK":"我的想法","BUILD TRUST":"建立信任","Business":"企业客户","Value · Growth · ROI":"价值 · 增长 · 投资回报","Consumer":"个人消费者","Emotion · Identity · Social Value":"情感 · 身份认同 · 社交价值","EXPLORE MY THINKING":"我的内容决策链","Work experience and thinking":"作品与思路","Work categories":"作品分类","Explore WeChat work":"看看微信作品","Explore RedNote work":"看看小红书作品","Explore Design work":"看看设计作品","Content management, brand promotion, and user growth.":"内容运营、品牌推广与用户增长。"},"thinking":{"MY THINKING MODEL":"我的思考模型","HOW DO I THINK":"我如何思考","Different audiences build trust in different ways.":"不同受众，建立信任的方式也不同。","Business":"企业客户","Consumer":"个人消费者","BUILD TRUST":"建立信任","Close thinking model":"关闭思考模型","Thinking audience":"思考模型受众切换","Trust framework":"信任框架","Business logic & commercial value":"商业逻辑与商业价值","Brand story & values alignment":"品牌故事与价值观契合","Business Value":"商业价值","Product capability, delivery quality, ROI, and business growth.":"这项合作能为业务带来什么改变？","Product capability":"产品能力","Delivery quality":"交付质量","ROI & business growth":"投资回报与业务增长","Cost & Efficiency":"成本与效率","Price, time, and collaboration efficiency.":"投入是否值得，合作能否顺利推进？","Procurement cost":"采购成本","Decision-making cycle":"决策周期","Communication & integration cost":"沟通与对接成本","Brand Credibility":"品牌可信度","Authentic brand storytelling, transparency, and long-term vision.":"这家企业为何值得长期合作？","Brand story & founder values":"品牌故事与创始人价值观","Transparency & credibility":"透明度与可信度","Values / ESG / long-termism":"价值观 / ESG / 长期主义","Industry Recognition":"行业认可","Expert endorsement, ecosystem partnerships, and industry influence.":"同行与合作伙伴如何看待这家企业？","Industry experts":"行业专家","Partner endorsements":"合作伙伴背书","Ecosystem & network":"生态与网络","Social proof":"社会认同","Risk Control":"风险控制","Compliance, delivery reliability, reputation, and long-term viability.":"哪些不确定性会影响合作的持续开展？","Compliance & legal risk":"合规与法律风险","Delivery reliability":"交付可靠性","Reputation risk":"声誉风险","Financial stability":"财务稳定性","Practical value & cost assessment":"实用价值与成本考量","Brand story & emotional connection":"品牌故事与情感连接","Content Value":"内容价值","Useful, high-quality, and problem-solving content.":"这条内容能帮我解决什么具体问题？","Useful knowledge":"有用知识","Practical skills":"实用技能","Tangible benefits":"实际收益","e.g., saving money or time":"例如省钱或省时","Attention Cost":"注意力成本","Time, effort, and mental energy required to engage with content.":"我能否快速看懂，并愿意继续了解？","Time cost":"时间成本","Learning effort":"学习成本","Attention cost":"注意力成本","Effort to engage":"参与成本","Emotional Connection":"情感连接","An enjoyable, authentic, and relatable brand story.":"它能否让我产生兴趣，并感到被理解？","Enjoyment & entertainment":"愉悦感与娱乐性","Authenticity & trust":"真实与信任","Identity fit":"身份契合","Shared values & lifestyle":"价值观与生活方式认同","Social Identity":"社会身份","Recognition, belonging, and shareable social value.":"我为什么愿意把它分享给身边的人？","Peer recognition":"同伴认同","Sense of belonging":"归属感","Shareable content":"可分享内容","Social status & identity":"社会地位与身份","Perceived Risk":"感知风险","Concerns about credibility, hidden motives, and content quality.":"关注、相信或行动之前，我还有哪些顾虑？","Is it reliable?":"靠得住吗？","Is it just marketing?":"是不是纯营销？","Will it really work for me?":"对我真的有用吗？","Any potential risks or downsides?":"有没有风险或不足？","RATIONAL TRUST {value} {value}{value} EMOTIONAL TRUST {value} {value}{value} {value}":"理性信任 {value} {value}{value} 情感信任 {value} {value}{value} {value}","RATIONAL TRUST":"理性信任","EMOTIONAL TRUST":"情感信任"},"wechat":{"BACK TO WORK":"返回作品总览","MY PORTFOLIO":"我的作品集","NEW MEDIA BRAND MARKETING":"新媒体·品牌营销","WECHAT":"微信公众号","Content Management & Brand Communication":"内容管理与品牌传播","Articles":"文章","Videos":"视频","EVENT STORIES02":"活动报道 02","Event Story":"活动报道","AI & Computing Innovation Seminar at Lanzhou University":"智算融合・创领未来｜国家超级计算西安中心携手兰州大学成功举办大模型时代人工智能与算力创新应用研讨会","2026.04.18 · Lanzhou University":"2026.04.18 · 兰州大学","Xi’an Supercomputing at the 7th Western Digital Economy Expo":"国家超算西安中心亮相第七届西部数博会 三场活动密集发声赋能数字经济新实践","2026.06.29 · Xi’an":"2026.06.29 · 西安","RESEARCH UPDATES02":"科研动态 02","Research Update":"科研动态","Computing Support for More Stable Fast-Charging Batteries":"科研速递｜国家超级计算西安中心助力西安交通大学在《Angewandte Chemie International Edition》期刊发表论文","2026.06.03 · Xi’an Jiaotong University":"2026.06.03 · 西安交通大学","Computing Support for Aerospace Design Research":"科研速递｜国家超级计算西安中心助力西北工业大学在《Aerospace Science and Technology》期刊发表论文","2026.06.16 · Northwestern Polytechnical University":"2026.06.16 · 西北工业大学","Your browser does not support embedded video. Use the Open on WeChat link below.":"当前浏览器不支持内嵌视频，请点下方“在微信中打开”。","PLAY VIDEO":"播放视频","AI & Computing Seminar at Lanzhou University":"兰州大学人工智能与算力创新应用研讨会","Event: 18 Apr 2026":"活动：2026.04.18","OPEN ON WECHAT ↗":"在微信中打开 ↗","SWITCH VIDEO":"切换视频","UP NEXT":"接下来","Computing Service Workshop at Northwest Normal University":"西安超算中心算力平台推广培训活动·西北师范大学","Use Open on WeChat to watch the video.":"请点“在微信中打开”观看视频。","MY CONTENT LOGIC":"我的内容思路","WHY THIS CONTENT":"为什么这么做内容","How content strategy translates B2B communication goals into brand trust.":"内容策略如何服务 B2B 传播目标、积累品牌信任。","WeChat work":"微信作品","WeChat content type":"微信内容类型","Selected WeChat video":"精选微信视频","Play AI & Computing Seminar at Lanzhou University":"播放兰州大学人工智能与算力创新应用研讨会","BUSINESS VALUE":"商业价值","Demonstrate practical value":"落到实际用途","Demonstrate relevance to real research and teaching needs.":"对应真实的科研与教学需求。","Translate capabilities into application cases":"把算力讲成具体案例","AI Model Training":"AI 模型训练","Scientific Simulation":"科学计算模拟","Research & Teaching":"科研与教学","Show practical relevance":"讲清实际用处","Position computing capabilities as practical solutions to concrete research and teaching needs.":"让读者看到，算力能解决具体的科研和教学问题。","INDUSTRY RECOGNITION":"行业认可","Strengthen external validation":"借外部认可","Build credibility through recognized institutions and industry voices.":"借权威机构与行业专家建立可信度。","Integrate third-party authority":"引入第三方认可","CCF":"中国计算机学会（CCF）","Lanzhou University":"兰州大学","Industry Experts":"行业专家","Ecosystem Partners":"生态合作伙伴","Create third-party validation":"让第三方来佐证","Reinforce professional credibility through independent institutional and expert endorsement.":"有独立机构与专家认可，专业性更站得住。","RISK CONTROL":"风险控制","Reduce collaboration uncertainty":"降低合作顾虑","Address uncertainty around access, support, and implementation.":"把接入、支持、实施各环节的疑问说清楚。","Clarify the collaboration pathway":"讲清合作路径","Access Process":"接入流程","Technical Support":"技术支持","Tailored Solutions":"定制化方案","Collaboration Mechanism":"合作机制","Lower perceived collaboration risk":"降低合作的不确定感","Make the path from initial interest to practical engagement clearer and more actionable.":"从有意向到真合作，每一步都看得明白、走得下去。","Show practical application":"展示真实应用","Help business audiences connect computing capability with operational needs.":"让 B 端读者看到算力与自身业务的连接点。","Connect computing with enterprise applications":"把算力和企业场景连起来","SME Agent Platform":"中小企业智能体平台","AI Tax Assistance":"AI 税务助手","Domestic Computing Platform":"国产算力平台","Make the business value tangible":"让商业价值看得见","Help potential partners relate computing resources to knowledge retrieval and tax service needs.":"让潜在伙伴看懂算力在知识检索和税务服务中的用途。","Show ecosystem participation":"体现生态参与","Give potential partners concrete evidence of participation in the regional digital economy.":"用具体事实说明我们在区域数字经济中的参与。","Organize three forums into a collaboration story":"把三场论坛串成一条合作线","Government-Led Forums":"政府主办论坛","Two Partnership Signings":"两场合作签约","Technical Report":"技术报告","Build confidence in ecosystem engagement":"让生态参与可被验证","Make institutional participation, technical contribution, and signed cooperation visible in one narrative.":"一篇内容交代清楚谁参与、贡献了什么技术、签了什么合作。","COST & EFFICIENCY":"成本与效率","Lower the trial barrier":"降低试用门槛","Help SMEs understand a lower-cost starting point for trying computing services.":"让中小企业知道，试用算力可以低成本起步。","Highlight trial access and simpler deployment":"突出试用入口和更省事的部署","RMB 3,000 Trial Voucher":"3,000 元试用券","One-Click Deployment":"一键部署","Knowledge Reuse":"知识复用","Make initial engagement more approachable":"降低第一次接触的门槛","Show how the voucher draw and one-click deployment can reduce the cost and effort of an initial trial.":"讲明试用券和一键部署如何降低首次试用的成本与门槛。","How research updates translate B2B communication goals into brand trust.":"科研动态怎么把 B2B 传播目标变成品牌信任。","Show research value":"体现科研价值","Help enterprise R&D teams assess computing support for costly design evaluation.":"帮企业研发团队判断算力在高成本设计评估中的价值。","Connect a costly research task with computing support":"把高成本科研任务和算力支持连起来","Slow Evaluation":"评估周期长","Early Design":"早期设计","Computing Support":"算力支持","Make the service relevant to design work":"让服务与设计工作直接相关","Explain how the center supported a study seeking faster design assessment, giving potential research partners a concrete example.":"讲清中心如何帮一项研究加快设计评估，给潜在科研伙伴一个具体案例。","Show external evidence":"提供外部证据","Give readers evidence of research support beyond the center's own description.":"除了自己讲，还要给出中心之外的证据。","Name the university, publication, and acknowledgement":"写明高校、期刊和致谢","Northwestern Polytechnical University":"西北工业大学","Published Paper":"已发表论文","Team Acknowledgement":"团队致谢","Give brand claims an external basis":"为品牌说法提供外部依据","The named university, published paper, and team's acknowledgement show where the center contributed to research.":"高校有名有姓、论文已发表、团队公开致谢，中心做了什么一目了然。","BRAND CREDIBILITY":"品牌可信度","Explain the role clearly":"把角色讲清楚","Help prospective partners judge the center's reliability through a clear account of its role.":"把中心做了什么、边界在哪讲清楚，潜在伙伴自会判断。","Explain the result, support role, and study limits":"讲清结果、支持角色与研究局限","Research Finding":"研究成果","Computing & Technical Support":"算力与技术支持","Study Limits":"研究局限","Build confidence in a transparent partner":"透明才能建立合作信心","Credit the research team for the finding, explain the center's support, and describe the study's stated limits.":"成果归研究团队，中心只讲自己提供的支持，同时交代研究本身声明的局限。","Connect with a real need":"对接真实需求","Help enterprise R&D teams see how computing support can address a battery research problem.":"让企业研发团队看到算力能解决哪些电池研究问题。","Connect fast-charging research with computing support":"把快充研究和算力支持连起来","Fast Charging":"快充","Battery Stability":"电池稳定性","Make the service relevant to enterprise R&D":"让服务与企业研发直接相关","Show how calculations helped explain a practical battery problem, giving potential R&D partners a concrete reason to consider computing support.":"讲清计算如何解释一个实际电池问题，给潜在研发伙伴一个考虑算力的具体理由。","Make the support specific":"把支持说具体","Help potential partners judge the center's support through a specific research example.":"用一个具体研究案例，让潜在伙伴判断中心的支持范围。","Show how computing helps explain the test result":"讲清计算如何解释测试结果","Battery Test":"电池测试","Computer Simulation":"计算模拟","Make the support role credible":"让支持角色可信","Describe how calculations helped explain the battery behavior, making the center's contribution specific and understandable.":"讲清计算如何解释电池表现，让中心的贡献具体、易懂。","Clarify what the result means":"说清结果意味着什么","Help prospective partners assess the support before starting a research collaboration.":"让潜在伙伴在谈合作前就能评估支持力度。","Define the computing contribution and its scope":"界定算力贡献的边界","Simulation Support":"模拟支持","Defined Support Role":"明确的角色边界","Reduce uncertainty about collaboration":"减少合作的不确定感","Clarify the contribution and its scope so prospective partners can assess whether the service fits their research.":"把贡献和边界讲明白，潜在伙伴自己就能判断合不合适。","VIDEO FORMAT":"视频形式","Document the seminar with on-site footage":"用现场素材记录整场","Document presentations and audience participation to show potential partners how the center works with universities.":"记录嘉宾分享和观众互动，让潜在伙伴看到中心和高校怎么合作。","TEMPLATE DESIGN":"模板设计","Keep the center and event clearly identified":"中心和活动信息一眼能认出","Keep the logo, event title, date, and venue in fixed positions so viewers can identify the organizer and follow the event.":"标识、活动名、日期、地点固定在同一位置，观众一眼认出主办方，也方便跟进。","Event: 8 May 2026":"活动：2026.05.08","Record the event with a fast-paced edit":"用快节奏剪辑记录现场","Use quick cuts between speaker and audience footage to record the event and show potential partners the center's on-site participation.":"嘉宾和观众镜头快速切换，既记录活动，也让潜在伙伴看到中心确实在现场。","Maintain a consistent identity across event videos":"活动视频保持统一识别","Use the same blue layout and placement of event details so viewers can recognize the center across different university events.":"沿用同一套蓝色版式和信息位置，换到哪所高校，观众都认得出中心。","DECISION":"决策","CONTENT":"内容","EFFECT":"效果","How content choices translate B2B communication goals into brand trust.":"内容选择如何服务 B2B 传播目标、积累品牌信任。","VIEW ORIGINAL ARTICLE":"查看原文","Content decision path":"内容决策路径","Decision progress":"决策进度","BUILD TRUST":"建立信任","Show {value} path":"显示{value}路径","MY VIDEO STRATEGY":"我的视频思路","WHY THIS VIDEO":"为什么这样剪视频","How event videos support B2B communication and build brand trust.":"活动视频如何支持 B2B 传播、建立品牌信任。","BUSINESS DECISION":"商业决策","Switch video to {value}":"切换到{value}","Play {value}":"播放{value}","Loading video…":"视频加载中……","TRY AGAIN":"重试","Playback could not start. Try again or open the video on WeChat.":"没能开始播放。可以重试，或去微信里打开。","The video could not load. Try again or open it on WeChat.":"视频没加载出来。可以重试，或去微信里打开。","Select an article to see the thinking behind it.":"点一篇文章，看看背后的思路。","Select a video to see the thinking behind it.":"点一个视频，看看背后的思路。","Structure the story around audience needs":"跟着受众需求讲故事","Help the audience form an informed view":"让读者看完能自己判断","WeChat reading views":"微信阅读视图","← Back to selection":"← 返回","Why this video →":"为什么这样剪视频 →","WeChat articles":"公众号文章"},"rednote":{"BACK TO WORK":"返回作品总览","MY PORTFOLIO":"我的作品集","NEW MEDIA BRAND MARKETING":"新媒体·品牌营销","Account Analysis":"账号分析","Post 01":"笔记一","Post 02":"笔记二","REDNOTE":"小红书","Social Media Account Management & Content Strategy":"社媒账号运营与内容策略","ACCOUNT MANAGEMENT STRATEGY":"账号运营策略","Select an Account":"选择账号","Nowcoder":"牛客","CURRENT ACCOUNT":"当前账号","Career Mentor":"求职大师姐","⇄ SWITCH ACCOUNT":"⇄ 切换账号","ACCOUNT POSITIONING":"账号定位","Job opportunities, job-search advice, and job-search tools.":"招聘机会、求职建议和求职工具。","TARGET AUDIENCE":"目标受众","Students and graduates preparing for job applications.":"正在准备求职的在校生和应届毕业生。","APPROACH":"运营思路","Publish employer lists and job-search advice, along with guides to using Nowcoder's job-search tools.":"发布企业名单和求职建议，顺带教大家用牛客的求职工具。","FRAMEWORK":"运营框架","Understand job-seeker needs → Provide practical resources → Support job applications → Guide readers to Nowcoder.":"了解求职需求 → 提供实用资料 → 助力求职申请 → 引导进入牛客平台","01 / 02 · NOWCODER":"01 / 02 · 牛客","VIEW ACCOUNT PROFILE ↗":"查看账号主页 ↗","FEATURED POSTS":"精选笔记","2 CASE STUDIES":"2 个案例分析","Enable JavaScript to view the two featured posts and their analysis.":"启用 JavaScript 后，就能看到这两篇精选笔记和分析。","Scroll down to explore more posts":"往下滑，看更多笔记","RedNote work":"小红书作品","RedNote overview content":"小红书总览","Open Nowcoder profile":"打开牛客账号主页","Nowcoder profile screenshot":"牛客账号主页截图","OPERATED BY NOWCODER · BUILT FROM SCRATCH":"由牛客运营 · 从零搭建","Offer job-search advice in the voice of a senior student.":"用师姐的口吻讲求职。","Students seeking clear guidance on job searches and applications.":"想在求职和申请上得到明确指导的在校学生。","Answer questions in a senior-student voice and guide readers to private channels or Nowcoder.":"用师姐口吻答疑，把读者引到私域或牛客。","Define the persona → Analyze job-seeker pain points → Plan content topics → Answer questions → Guide readers to private channels / Nowcoder.":"立人设 → 找痛点 → 定选题 → 答问题 → 引导到私域／牛客","Shenzhen Companies with Two-Day Weekends Worth Applying To ✨":"深圳可闭眼投的双休公司合集✨️","Address a specific job-search need.":"对准一个具体的求职需求。","Filtering by city and two-day weekends helps readers assess whether the content meets their job-search needs.":"用城市和双休两个条件做筛选，读者一眼就知道合不合自己。","Make information on 45 companies easy to browse and save.":"45 家企业的信息，一眼扫完，顺手就存。","Large-format keywords and three numbered columns make the list easy to scan and revisit.":"大字号关键词加三栏编号，扫得快，回头也好找。","Practical Value":"实用价值","Information Search Effort":"信息查找成本","Clear selection criteria help narrow the search, while the list can be saved for future reference during job applications.":"筛选条件清楚，范围一下就缩小；清单存下来，投简历时还能翻。","NOWCODER · AUG 21, 2024":"牛客 · 2024.08.21","Part-Time Hourly Pay Roundup — A Must-Save for Students Looking for Part-Time Work!":"兼职时薪合集！想做兼职的同学一定要码住！","Help students choose part-time jobs.":"帮学生挑兼职。","Hourly pay is an important factor when students choose part-time jobs.":"挑兼职时，学生最在意的就是时薪。","Compare hourly pay, benefits, and job requirements.":"对比时薪、福利与工作要求。","Brand logos and a consistent section layout make hourly pay, benefits, and working conditions easier to compare.":"品牌标识加统一版式，时薪、福利、工作条件横向一比就清楚。","Uncertainty":"不确定性","Approachability":"亲近感","Hourly pay makes direct comparisons easier, while working conditions help readers know what to expect. The senior-student voice makes the advice more approachable.":"时薪方便横向比较，工作条件让人心里有底；师姐口吻让建议更好接受。","CAREER MENTOR · FEATURED POST":"求职大师姐 · 精选笔记","Audience":"目标受众","Approach":"运营思路","Framework":"运营框架","Account 01 · Nowcoder":"账号一 · 牛客","Account 02 · Career Mentor":"账号二 · 求职大师姐","02 / 02 · CAREER MENTOR":"02 / 02 · 求职大师姐","Select a post to read":"点一篇笔记看看","Account {value} · {value}":"账号{value} · {value}","VIEW ORIGINAL POST ↗":"查看原始笔记 ↗","01 · TOPIC ANALYSIS":"01 · 选题分析","02 · POST DESIGN":"02 · 笔记设计","USER DECISION FACTORS":"个人用户决策因素","Post analysis sections":"笔记分析板块","Topic Analysis":"选题分析","Post Design":"笔记设计","Decision Factors":"决策因素","Account strategy detail":"账号策略详情","{value} · Demo profile":"{value} · 主页示意","ILLUSTRATIVE STRATEGY":"策略示意","{value} {value} profile":"{value} {value} 主页","{value} profile screenshot":"{value} 主页截图","SIMPLE IDEAS":"简单的想法"},"rednote-notes":{"BACK TO WORK":"返回作品总览","MY PORTFOLIO":"我的作品集","NEW MEDIA BRAND MARKETING":"新媒体·品牌营销","MORE POSTS":"更多笔记","Explore more posts and their engagement.":"看更多笔记和它们的互动数据。","More RedNote posts":"更多小红书笔记","Scroll through RedNote posts":"滚动浏览小红书笔记","Part-Time Hourly Pay Roundup — A Must-Save for Students Looking for Part-Time Work!":"兼职时薪合集！想做兼职的同学一定要码住！","Part-Time Hourly Pay Roundup — A Must-Save for Students Looking for Part-Time Work!; 9900 likes, 4904 saves, 492 comments. Recorded engagement. Open original post.":"兼职时薪合集！想做兼职的同学一定要码住！点赞 9,900，收藏 4,904，评论 492。数据为记录时的互动量。打开原始笔记。","Stable Job Opportunities for 2025 Graduates":"强烈建议25届一定要投这些“铁饭碗”！","Stable Job Opportunities for 2025 Graduates; 7658 likes, 6531 saves, 143 comments. Recorded engagement. Open original post.":"强烈建议25届一定要投这些“铁饭碗”！点赞 7,658，收藏 6,531，评论 143。数据为记录时的互动量。打开原始笔记。","15 University Majors with Strong Earning Potential":"填志愿必看！最有钱途的十五大专业！","15 University Majors with Strong Earning Potential; 3827 likes, 2040 saves, 105 comments. Recorded engagement. Open original post.":"填志愿必看！最有钱途的十五大专业！点赞 3,827，收藏 2,040，评论 105。数据为记录时的互动量。打开原始笔记。","Public-Sector Recruitment in the Second Half of 2024":"今年下半年还能进编制！不要再错过啦！","Public-Sector Recruitment in the Second Half of 2024; 2812 likes, 1792 saves, 28 comments. Recorded engagement. Open original post.":"今年下半年还能进编制！不要再错过啦！点赞 2,812，收藏 1,792，评论 28。数据为记录时的互动量。打开原始笔记。","Part-Time Hourly Pay Roundup: Part 2":"兼职时薪第二弹！想兼职的同学一定要码住！","Part-Time Hourly Pay Roundup: Part 2; 2663 likes, 1139 saves, 170 comments. Recorded engagement. Open original post.":"兼职时薪第二弹！想兼职的同学一定要码住！点赞 2,663，收藏 1,139，评论 170。数据为记录时的互动量。打开原始笔记。","Summer Jobs: Common Pitfalls to Avoid":"想做暑假工的同学必看！一定要注意避坑！","Summer Jobs: Common Pitfalls to Avoid; 2356 likes, 1459 saves, 91 comments. Recorded engagement. Open original post.":"想做暑假工的同学必看！一定要注意避坑！点赞 2,356，收藏 1,459，评论 91。数据为记录时的互动量。打开原始笔记。","AI Interviews: Easier Than You Might Expect":"其实，AI面试真的挺水的……","AI Interviews: Easier Than You Might Expect; 2240 likes, 2471 saves, 3 comments. Recorded engagement. Open original post.":"其实，AI面试真的挺水的……点赞 2,240，收藏 2,471，评论 3。数据为记录时的互动量。打开原始笔记。","Internship Pay at Major Companies":"大厂实习薪资合集！想实习的同学千万别错过","Internship Pay at Major Companies; 1845 likes, 1474 saves, 84 comments. Recorded engagement. Open original post.":"大厂实习薪资合集！想实习的同学千万别错过，点赞 1,845，收藏 1,474，评论 84。数据为记录时的互动量。打开原始笔记。","2025 Guangdong Civil Service Exam Timeline":"2025广东公考参考时间线！真的要马住！","2025 Guangdong Civil Service Exam Timeline; 1662 likes, 2406 saves, 42 comments. Recorded engagement. Open original post.":"2025广东公考参考时间线！真的要马住！点赞 1,662，收藏 2,406，评论 42。数据为记录时的互动量。打开原始笔记。","A Résumé for Anime Fans and Collectors":"我们二次元吃谷人也有属于自己的简历！","A Résumé for Anime Fans and Collectors; 1627 likes, 1165 saves, 9 comments. Recorded engagement. Open original post.":"我们二次元吃谷人也有属于自己的简历！点赞 1,627，收藏 1,165，评论 9。数据为记录时的互动量。打开原始笔记。","Shenzhen Companies with Two-Day Weekends Worth Applying To ✨":"深圳可闭眼投的双休公司合集✨️","Shenzhen Companies with Two-Day Weekends Worth Applying To ✨; 1397 likes, 1753 saves, 148 comments. Recorded engagement. Open original post.":"深圳可闭眼投的双休公司合集✨️，点赞 1,397，收藏 1,753，评论 148。数据为记录时的互动量。打开原始笔记。","What Students Should Know About Take-Home Pay":"大学生找工作，一定要明白【到手工资】！","What Students Should Know About Take-Home Pay; 1249 likes, 1076 saves, 8 comments. Recorded engagement. Open original post.":"大学生找工作，一定要明白【到手工资】！点赞 1,249，收藏 1,076，评论 8。数据为记录时的互动量。打开原始笔记。","Certification Exams in the Second Half of 2024":"🐴马住！24下半年还能考的证书合集！","Certification Exams in the Second Half of 2024; 1210 likes, 990 saves, 12 comments. Recorded engagement. Open original post.":"🐴马住！24下半年还能考的证书合集！点赞 1,210，收藏 990，评论 12。数据为记录时的互动量。打开原始笔记。","Guangzhou MCN Companies and Their Top Creators":"广州MCN清单，顶流博主都在哪些公司？","Guangzhou MCN Companies and Their Top Creators; 1163 likes, 912 saves, 91 comments. Recorded engagement. Open original post.":"广州MCN清单，顶流博主都在哪些公司？点赞 1,163，收藏 912，评论 91。数据为记录时的互动量。打开原始笔记。","Understanding Recent-Graduate Eligibility":"关于应届生身份那些事儿","Understanding Recent-Graduate Eligibility; 709 likes, 435 saves, 378 comments. Recorded engagement. Open original post.":"关于应届生身份那些事儿，点赞 709，收藏 435，评论 378。数据为记录时的互动量。打开原始笔记。","Sample content · Original link pending":"示例内容 · 原始链接待补充","{value}; {value} likes, {value} saves, {value} comments. {value} {value}.":"{value}；点赞 {value}，收藏 {value}，评论 {value}。{value} {value}。","SAMPLE":"示例"},"design":{"BACK TO WORK":"返回作品总览","MY PORTFOLIO":"我的作品集","NEW MEDIA BRAND MARKETING":"新媒体·品牌营销","DESIGN":"设计","Selected print and social media work for NSC Xi’an, ByteDance and Nowcoder.":"国家超算西安中心、字节跳动、牛客的平面与社媒作品。","Design collection":"设计作品集","Design formats":"作品分类","Design project album":"设计作品册","Album pages":"作品册页码","Previous album page":"上一组作品","Next album page":"下一组作品","Brochures":"宣传册","Industrial Simulation Solutions":"工业仿真行业解决方案","Page 1":"第 1 页","Page 2":"第 2 页","NSC Xi’an Brochure":"国家超级计算西安中心宣传册","ByteDance K12 Education Products":"字节跳动K12教育产品","Page 3":"第 3 页","Page 4":"第 4 页","Page 5":"第 5 页","Page 6":"第 6 页","Page 7":"第 7 页","Page 8":"第 8 页","Page 9":"第 9 页","Posters":"海报","SCNet Computing Platform":"超算互联网平台宣传海报","Labour Day 2026":"五一劳动节海报","Lanzhou University AI and Computing Seminar":"兰州大学人工智能与算力创新应用研讨会","Xi’an Jiaotong University AI Event Invitation":"西安交通大学 AI 技能公益普及活动邀请函","Innovation Voucher Policy Briefing":"陕西省科技创新券政策宣讲会","Event poster":"政策宣讲会海报","Event key visual":"政策宣讲会主视觉","Social content":"新媒体内容","Cover Templates":"封面模板","University Application Advice Cover":"填志愿必看封面","Summer Internship Return Offer Cover":"暑期实习转正分享封面","Opening Page Templates":"首图模板","Campus Recruitment Onboarding Guide":"关于校招入职那些事","Student Part-Time Pay Comparison":"大学生兼职时薪清单","International Student Job Search Timeline":"留学生求职时间线","Interview Experience Sharing Templates":"面试经验分享模板","Java Interview Questions":"Java 面试题内页模板","Interview Resource Closing Card":"牛客面试题库尾图","Closing Cards for Resource Access":"引流尾图模板","Interview Question Bank Closing Card":"免费获取海量面试题尾图","Nowcoder App Interview Resources Closing Card":"牛客 App 面经资源尾图","Free Learning Resources Closing Card":"免费学习教程尾图","2025 Graduate Recruitment Resources Closing Card":"25 届校招资料尾图","2024 Spring Campus Recruitment White Paper Closing Card":"牛客 2024 春季校园招聘白皮书尾图","AI Product Interview Templates":"AI 产品面经模板系列","MiniMax Hailuo AI Interview Template":"MiniMax 海螺 AI 产品面经模板","Baidu ERNIE AI Interview Template":"百度文心一言 AI 产品面经模板","NIO AI Product Interview Template":"蔚来 AI 产品经理面经模板","Graduate Salary Cover Templates":"24 届校招薪资首图模板系列","Huawei Graduate Salary Cover":"华为 24 届校招薪资首图模板","Xiaomi Graduate Salary Cover":"小米 24 届校招薪资首图模板","Baidu Graduate Salary Cover":"百度 24 届校招薪资首图模板","Employer Recruitment Cover Templates":"企业校招首图模板系列","DiDi Recruitment Cover":"滴滴招聘首图模板","NovaStar Recruitment Cover":"诺瓦星云招聘首图模板","Xiaomi Recruitment Cover":"小米招聘首图模板","NSC Xi’an":"国家超算西安中心","ByteDance":"字节跳动","Nowcoder":"牛客","3 projects":"3 个项目","5 projects":"5 个项目","7 projects":"7 个项目","View all 5 images":"查看全部 5 张图片","Page {value}":"第 {value} 页","Close preview":"关闭预览","Previous project":"上一件","Next project":"下一件","Previous page":"上一页","Next page":"下一页","Fit to window":"适应窗口","Original size":"原始大小","View all {value} images":"查看全部 {value} 张图片","View project":"查看项目","View project:":"查看项目：","Enlarge":"放大","{value} projects":"{value} 个项目","NSC Xi’an Annual Report":"国家超级计算西安中心年报","Selected print and social media work for NSC Xi’an and Nowcoder.":"国家超算西安中心与牛客的平面及社媒作品。"},"skills":{"MY PORTFOLIO":"我的作品集","NEW MEDIA BRAND MARKETING":"新媒体·品牌营销","SKILLS":"技能","Hover to unpack my skills.Tap to unpack my skills.":"点击查看详细技能","Skills content":"技能内容","AI and web skills":"AI 与网页技能","Content skills":"内容技能","Design skills":"设计技能","Office skills":"办公技能","Language skills":"语言技能","Social media and event skills":"社媒与活动技能","Video editing skills":"视频剪辑技能","Zibo's orange canvas bag":"王子博的橙色帆布包","AI & WEB":"AI 与网页","Website design":"网页设计","AI product prototyping":"AI 产品原型","Content systems":"内容体系","Data-informed workflows":"数据驱动的工作方法","Codex · Cursor · Trae":"Codex · Cursor · Trae","CONTENT":"内容策划","Brand storytelling":"品牌叙事","Editorial planning":"选题策划","Social media content":"社媒内容","DESIGN":"图文设计","Visual communication":"视觉传达","Gaoding Design":"稿定设计","Canva":"Canva","LANGUAGES":"语言技能","English: TEM-8":"英语（专业八级）","Mandarin: Native":"普通话（母语）","OFFICE":"日常办公","Microsoft Office":"Microsoft Office","WPS":"WPS","SOCIAL & EVENTS":"社媒与活动运营","WeChat operations":"公众号运营","RedNote operations":"小红书运营","Event marketing":"活动营销","Cross-team coordination":"跨团队协作","VIDEO":"视频剪辑","Jianying":"剪映","CONTENT OPERATIONS":"内容运营","SOCIAL MEDIA & BRAND PROMOTION":"社媒运营与品牌宣传","AI VibeCoding":"AI VibeCoding","AI product design":"AI产品设计","WeChat official account operations":"公众号运营","Brand promotion":"品牌推广","Event planning":"活动策划"},"contact":{"MY PORTFOLIO":"我的作品集","NEW MEDIA BRAND MARKETING":"新媒体·品牌营销","Introduction":"个人简介","Contact details":"联系方式","LET'S CREATE":"一起创造","SOMETHING GREAT!":"值得期待的作品！","Have a project in mind?":"有想落地的项目吗？","Let's bring the idea to life.":"让我们一起把它做出来。","Brand communication / Social contentEvent coverage":"品牌传播/新媒体内容","Get in touch":"欢迎联系","ZIBO WANG":"王子博","New Media & Brand Marketing":"新媒体运营与品牌营销","Phone":"电话","Email":"邮箱","wzb13149232818@163.com":"wzb13149232818@163.com","Location":"所在地","Xi'an, China":"中国西安","CONTACT ME":"联系我","PASSIONATE ABOUT CONTENT.FOCUSED ON RESULTS.":"热爱内容，也看重结果。","✦ AVAILABLE FORBRAND & CONTENT PROJECTS":"✦ 欢迎品牌与内容合作","Thank you!":"感谢关注！","Contact content":"联系区域","Contact views":"联系方式切换"}},"bindings":[{"page":"global","selector":"title","en":"Zibo Wang — New Media Operations & Brand Marketing","zh":"王子博 — 新媒体运营与品牌营销","attr":null},{"page":"global","selector":"#portfolio-sidebar > .sidebar-brand[href=\"#home\"] > span","en":"ZIBO WANG","zh":"王子博","attr":null},{"page":"global","selector":"#portfolio-sidebar > .sidebar-links > .sidebar-link[href=\"#home\"] > span","en":"Home","zh":"首页","attr":null},{"page":"global","selector":"#portfolio-sidebar > .sidebar-links > .sidebar-link[href=\"#work\"] > span","en":"Work","zh":"作品","attr":null},{"page":"global","selector":"#portfolio-sidebar > .sidebar-links > .sidebar-link[href=\"#skills\"] > span","en":"Skills","zh":"技能","attr":null},{"page":"global","selector":"#portfolio-sidebar > .sidebar-links > .sidebar-link[href=\"#contact\"] > span","en":"Contact","zh":"联系","attr":null},{"page":"global","selector":"#portfolio-sidebar > .language-switch > button","en":"English","zh":"English","attr":null},{"page":"global","selector":".rn-preview > #rn-preview-title","en":"Placeholder preview","zh":"预览占位","attr":null},{"page":"global","selector":".rn-preview > p","en":"This is placeholder content. Once the original link is provided, the account profile or post will open here.","zh":"这里是占位内容。补上原始链接后，就会在这里打开账号主页或笔记。","attr":null},{"page":"global","selector":".sidebar-toggle","en":"Open navigation","zh":"打开菜单","attr":"aria-label"},{"page":"global","selector":"#portfolio-sidebar","en":"Portfolio navigation","zh":"作品集菜单","attr":"aria-label"},{"page":"global","selector":"#portfolio-sidebar > .sidebar-links","en":"Primary navigation","zh":"主菜单","attr":"aria-label"},{"page":"global","selector":"#portfolio-sidebar > .language-switch","en":"Website language","zh":"网站语言","attr":"aria-label"},{"page":"global","selector":"#portfolio-sidebar > .language-switch > button","en":"Switch to Chinese","zh":"切换为中文","attr":"aria-label"},{"page":"global","selector":"#portfolio-sidebar > .language-switch > button","en":"Switch to English","zh":"切换为英文","attr":"aria-label"},{"page":"global","selector":".rn-preview > .rn-preview-close","en":"Close preview","zh":"关闭预览","attr":"aria-label"},{"page":"home","selector":".section-layer > .portfolio-button-slot > .hero-portfolio[href=\"#work\"] > span","en":"MY PORTFOLIO","zh":"我的作品集","attr":null},{"page":"home","selector":".hero-stage > .hero-topbar > .hero-category > span","en":"NEW MEDIA BRAND MARKETING","zh":"新媒体·品牌营销","attr":null},{"page":"home","selector":".hero-stage > .hero-text > .hero-greeting > span","en":"Hello!","zh":"你好！","attr":null},{"page":"home","selector":"#home > .hero-stage > .hero-text > #hero-name","en":"I'M ZIBO WANG","zh":"我是王子博","attr":null},{"page":"home","selector":".hero-stage > .hero-text > .hero-statement-wrap > .hero-statement","en":"A New Media Specialist& Brand Marketer.","zh":"做新媒体，也做品牌营销。","attr":null},{"page":"home","selector":".section-layer > .section-scroll-area","en":"Home content","zh":"首页内容","attr":"aria-label"},{"page":"work","selector":".section-layer > .portfolio-button-slot > .hero-portfolio[href=\"#work\"] > span","en":"MY PORTFOLIO","zh":"我的作品集","attr":null},{"page":"work","selector":"#work > .work-utility > .hero-category > span","en":"NEW MEDIA BRAND MARKETING","zh":"新媒体·品牌营销","attr":null},{"page":"work","selector":".section-layer > .section-scroll-area > #work > #work-landing-title","en":"WHAT DID I DO & HOW DO I THINK","zh":"我做过什么 & 我的想法","attr":null},{"page":"work","selector":"#work > .work-hub-grid > .work-experience > #work-experience-title","en":"MY EXPERIENCE","zh":"我的经历","attr":null},{"page":"work","selector":".work-category-entry > .work-category-card[href=\"#wechat\"] > .work-category-copy > .work-card-title","en":"WeChat","zh":"微信公众号","attr":null},{"page":"work","selector":".work-category-entry > .work-category-card[href=\"#wechat\"] > .work-category-copy > .work-card-description","en":"Content management, brand promotion, and user growth.","zh":"内容运营、品牌推广与用户增长。","attr":null},{"page":"work","selector":".work-category-entry > .work-category-card[href=\"#rednote\"] > .work-category-copy > .work-card-title","en":"RedNote","zh":"小红书","attr":null},{"page":"work","selector":".work-category-entry > .work-category-card[href=\"#rednote\"] > .work-category-copy > .work-card-description","en":"Content strategy, data analysis, and community management.","zh":"内容策划、数据分析与社群运营。","attr":null},{"page":"work","selector":".work-category-entry > .work-category-card[href=\"#design\"] > .work-category-copy > .work-card-title","en":"Design","zh":"设计","attr":null},{"page":"work","selector":".work-category-entry > .work-category-card[href=\"#design\"] > .work-category-copy > .work-card-description","en":"Brochure, poster, and social media content design.","zh":"宣传册、海报与社媒内容设计。","attr":null},{"page":"work","selector":"#work > .work-hub-grid > .work-thinking > #work-thinking-title","en":"HOW I THINK","zh":"我的想法","attr":null},{"page":"work","selector":".work-hub-grid > .work-thinking > .trust-model > .trust-root","en":"BUILD TRUST","zh":"建立信任","attr":null},{"page":"work","selector":".trust-branches > .trust-branch > .trust-branch-top > strong","en":"Business","zh":"企业客户","attr":null},{"page":"work","selector":".trust-model > .trust-branches > .trust-branch > small","en":"Value · Growth · ROI","zh":"价值 · 增长 · 投资回报","attr":null},{"page":"work","selector":".trust-branches > .trust-branch > .trust-branch-top > strong","en":"Consumer","zh":"个人消费者","attr":null},{"page":"work","selector":".trust-model > .trust-branches > .trust-branch > small","en":"Emotion · Identity · Social Value","zh":"情感 · 身份认同 · 社交价值","attr":null},{"page":"work","selector":".work-hub-grid > .work-thinking > .trust-model > .thinking-cta","en":"EXPLORE MY THINKING","zh":"我的内容决策链","attr":null},{"page":"work","selector":".section-layer > .section-scroll-area","en":"Work experience and thinking","zh":"作品与思路","attr":"aria-label"},{"page":"work","selector":"#work > .work-hub-grid > .work-experience > .work-card-list","en":"Work categories","zh":"作品分类","attr":"aria-label"},{"page":"work","selector":".work-experience > .work-card-list > .work-category-entry > .work-category-card[href=\"#wechat\"]","en":"Explore WeChat work","zh":"看看微信作品","attr":"aria-label"},{"page":"work","selector":".work-experience > .work-card-list > .work-category-entry > .work-category-card[href=\"#rednote\"]","en":"Explore RedNote work","zh":"看看小红书作品","attr":"aria-label"},{"page":"work","selector":".work-experience > .work-card-list > .work-category-entry > .work-category-card[href=\"#design\"]","en":"Explore Design work","zh":"看看设计作品","attr":"aria-label"},{"page":"thinking","selector":".thinking-surface > .thinking-modal-header > div > .thinking-modal-eyebrow","en":"MY THINKING MODEL","zh":"我的思考模型","attr":null},{"page":"thinking","selector":".thinking-surface > .thinking-modal-header > div > #thinking-modal-title","en":"HOW DO I THINK","zh":"我如何思考","attr":null},{"page":"thinking","selector":".thinking-surface > .thinking-modal-header > div > #thinking-modal-subtitle","en":"Different audiences build trust in different ways.","zh":"不同受众，建立信任的方式也不同。","attr":null},{"page":"thinking","selector":".thinking-surface > .thinking-modal-header > .thinking-modal-tabs > button[data-audience=\"business\"]","en":"Business","zh":"企业客户","attr":null},{"page":"thinking","selector":".thinking-surface > .thinking-modal-header > .thinking-modal-tabs > button[data-audience=\"consumer\"]","en":"Consumer","zh":"个人消费者","attr":null},{"page":"thinking","selector":"#thinking-modal > .thinking-surface > .thinking-final-node","en":"BUILD TRUST","zh":"建立信任","attr":null},{"page":"thinking","selector":"#thinking-modal > .thinking-surface > .thinking-close","en":"Close thinking model","zh":"关闭思考模型","attr":"aria-label"},{"page":"thinking","selector":"#thinking-modal > .thinking-surface > .thinking-modal-header > .thinking-modal-tabs","en":"Thinking audience","zh":"思考模型受众切换","attr":"aria-label"},{"page":"thinking","selector":"#thinking-modal > .thinking-surface > #thinking-framework","en":"Trust framework","zh":"信任框架","attr":"aria-label"},{"page":"wechat","selector":".section-layer > .portfolio-button-slot > .wechat-back-link[href=\"#work\"] > span","en":"BACK TO WORK","zh":"返回作品总览","attr":null},{"page":"wechat","selector":".section-layer > .portfolio-button-slot > .hero-portfolio[href=\"#work\"] > span","en":"MY PORTFOLIO","zh":"我的作品集","attr":null},{"page":"wechat","selector":"#wechat > .work-utility > .hero-category > span","en":"NEW MEDIA BRAND MARKETING","zh":"新媒体·品牌营销","attr":null},{"page":"wechat","selector":"#wechat > .wechat-heading-row > div > #wechat-title","en":"WECHAT","zh":"微信公众号","attr":null},{"page":"wechat","selector":"#wechat > .wechat-heading-row > div > .wechat-subtitle","en":"Content Management & Brand Communication","zh":"内容管理与品牌传播","attr":null},{"page":"wechat","selector":".wechat-collection > #wechat-articles > .wechat-group > .wechat-group-heading","en":"EVENT STORIES02","zh":"活动报道 02","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"event1\"] > .wechat-item-copy > .wechat-item-tag","en":"Event Story","zh":"活动报道","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"event1\"] > .wechat-item-copy > strong","en":"AI & Computing Innovation Seminar at Lanzhou University","zh":"智算融合・创领未来｜国家超级计算西安中心携手兰州大学成功举办大模型时代人工智能与算力创新应用研讨会","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"event1\"] > .wechat-item-copy > small","en":"2026.04.18 · Lanzhou University","zh":"2026.04.18 · 兰州大学","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"event2\"] > .wechat-item-copy > .wechat-item-tag","en":"Event Story","zh":"活动报道","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"event2\"] > .wechat-item-copy > strong","en":"Xi’an Supercomputing at the 7th Western Digital Economy Expo","zh":"国家超算西安中心亮相第七届西部数博会 三场活动密集发声赋能数字经济新实践","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"event2\"] > .wechat-item-copy > small","en":"2026.06.29 · Xi’an","zh":"2026.06.29 · 西安","attr":null},{"page":"wechat","selector":".wechat-collection > #wechat-articles > .wechat-group > .wechat-group-heading","en":"RESEARCH UPDATES02","zh":"科研动态 02","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"research2\"] > .wechat-item-copy > .wechat-item-tag","en":"Research Update","zh":"科研动态","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"research2\"] > .wechat-item-copy > strong","en":"Computing Support for More Stable Fast-Charging Batteries","zh":"科研速递｜国家超级计算西安中心助力西安交通大学在《Angewandte Chemie International Edition》期刊发表论文","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"research2\"] > .wechat-item-copy > small","en":"2026.06.03 · Xi’an Jiaotong University","zh":"2026.06.03 · 西安交通大学","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"research1\"] > .wechat-item-copy > .wechat-item-tag","en":"Research Update","zh":"科研动态","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"research1\"] > .wechat-item-copy > strong","en":"Computing Support for Aerospace Design Research","zh":"科研速递｜国家超级计算西安中心助力西北工业大学在《Aerospace Science and Technology》期刊发表论文","attr":null},{"page":"wechat","selector":".wechat-group > .wechat-item[data-wechat-sample=\"research1\"] > .wechat-item-copy > small","en":"2026.06.16 · Northwestern Polytechnical University","zh":"2026.06.16 · 西北工业大学","attr":null},{"page":"wechat","selector":"#wechat > .wechat-content-grid > .wechat-logic > .wechat-logic-label","en":"MY CONTENT LOGIC","zh":"我的内容思路","attr":null},{"page":"wechat","selector":".wechat-content-grid > .wechat-logic > .wc-logic-header > #wechat-logic-title","en":"WHY THIS CONTENT","zh":"为什么这么做内容","attr":null},{"page":"wechat","selector":"#wechat > .wechat-content-grid > .wechat-logic > .wechat-logic-caption","en":"How content strategy translates B2B communication goals into brand trust.","zh":"内容策略如何服务 B2B 传播目标、积累品牌信任。","attr":null},{"page":"wechat","selector":".section-layer > .section-scroll-area","en":"WeChat work","zh":"微信作品","attr":"aria-label"},{"page":"rednote","selector":".section-layer > .portfolio-button-slot > .wechat-back-link[href=\"#work\"] > span","en":"BACK TO WORK","zh":"返回作品总览","attr":null},{"page":"rednote","selector":".section-layer > .portfolio-button-slot > .hero-portfolio[href=\"#work\"] > span","en":"MY PORTFOLIO","zh":"我的作品集","attr":null},{"page":"rednote","selector":"#rednote-overview > .rn-utility > .hero-category > span","en":"NEW MEDIA BRAND MARKETING","zh":"新媒体·品牌营销","attr":null},{"page":"rednote","selector":"#rednote > #rednote-overview > .rn-overview-tabs > button","en":"Account Analysis","zh":"账号分析","attr":null},{"page":"rednote","selector":"#rednote > #rednote-overview > .rn-overview-tabs > button","en":"Post 01","zh":"笔记一","attr":null},{"page":"rednote","selector":"#rednote > #rednote-overview > .rn-overview-tabs > button","en":"Post 02","zh":"笔记二","attr":null},{"page":"rednote","selector":"#rednote-overview > .rn-layout > .rn-account-panel > #rednote-title","en":"REDNOTE","zh":"小红书","attr":null},{"page":"rednote","selector":"#rednote-overview > .rn-layout > .rn-account-panel > .rn-subtitle","en":"Social Media Account Management & Content Strategy","zh":"社媒账号运营与内容策略","attr":null},{"page":"rednote","selector":".rn-layout > .rn-account-panel > .rn-account-heading > #rn-account-heading","en":"ACCOUNT MANAGEMENT STRATEGY","zh":"账号运营策略","attr":null},{"page":"rednote","selector":".rn-layout > .rn-account-panel > .rn-account-heading > p","en":"Select an Account","zh":"选择账号","attr":null},{"page":"rednote","selector":".rn-account-switch > .rn-account-button > span > strong","en":"Nowcoder","zh":"牛客","attr":null},{"page":"rednote","selector":".rn-account-switch > .rn-account-button > span > small","en":"CURRENT ACCOUNT","zh":"当前账号","attr":null},{"page":"rednote","selector":".rn-account-switch > .rn-account-button > span > strong","en":"Career Mentor","zh":"求职大师姐","attr":null},{"page":"rednote","selector":".rn-account-switch > .rn-account-button > span > small","en":"⇄ SWITCH ACCOUNT","zh":"⇄ 切换账号","attr":null},{"page":"rednote","selector":".rn-account-panel > #rn-account-detail > .rn-account-copy > .rn-demo","en":"ACCOUNT POSITIONING","zh":"账号定位","attr":null},{"page":"rednote","selector":".rn-account-panel > #rn-account-detail > .rn-account-copy > h3","en":"Job opportunities, job-search advice, and job-search tools.","zh":"招聘机会、求职建议和求职工具。","attr":null},{"page":"rednote","selector":"#rn-account-detail > .rn-account-copy > dl > dt","en":"TARGET AUDIENCE","zh":"目标受众","attr":null},{"page":"rednote","selector":"#rn-account-detail > .rn-account-copy > dl > dd","en":"Students and graduates preparing for job applications.","zh":"正在准备求职的在校生和应届毕业生。","attr":null},{"page":"rednote","selector":"#rn-account-detail > .rn-account-copy > dl > dt","en":"APPROACH","zh":"运营思路","attr":null},{"page":"rednote","selector":"#rn-account-detail > .rn-account-copy > dl > dd","en":"Publish employer lists and job-search advice, along with guides to using Nowcoder's job-search tools.","zh":"发布企业名单和求职建议，顺带教大家用牛客的求职工具。","attr":null},{"page":"rednote","selector":"#rn-account-detail > .rn-account-copy > dl > dt","en":"FRAMEWORK","zh":"运营框架","attr":null},{"page":"rednote","selector":"#rn-account-detail > .rn-account-copy > dl > dd","en":"Understand job-seeker needs → Provide practical resources → Support job applications → Guide readers to Nowcoder.","zh":"了解求职需求 → 提供实用资料 → 助力求职申请 → 引导进入牛客平台","attr":null},{"page":"rednote","selector":".rn-layout > .rn-account-panel > .rn-account-footer > span","en":"01 / 02 · NOWCODER","zh":"01 / 02 · 牛客","attr":null},{"page":"rednote","selector":".rn-layout > .rn-account-panel > .rn-account-footer > .rn-profile-link","en":"VIEW ACCOUNT PROFILE ↗","zh":"查看账号主页 ↗","attr":null},{"page":"rednote","selector":".rn-layout > .rn-featured > .rn-featured-heading > #rn-featured-title","en":"FEATURED POSTS","zh":"精选笔记","attr":null},{"page":"rednote","selector":".rn-layout > .rn-featured > .rn-featured-heading > .rn-demo","en":"2 CASE STUDIES","zh":"2 个案例分析","attr":null},{"page":"rednote","selector":".rn-layout > .rn-featured > noscript > p","en":"Enable JavaScript to view the two featured posts and their analysis.","zh":"启用 JavaScript 后，就能看到这两篇精选笔记和分析。","attr":null},{"page":"rednote","selector":"#rednote > #rednote-overview > .rn-scroll-cue[href=\"#rednote-notes\"] > span","en":"Scroll down to explore more posts","zh":"往下滑，看更多笔记","attr":null},{"page":"rednote","selector":".section-layer > .section-scroll-area","en":"RedNote work","zh":"小红书作品","attr":"aria-label"},{"page":"rednote","selector":".section-scroll-area > #rednote > #rednote-overview > .rn-overview-tabs","en":"RedNote overview content","zh":"小红书总览","attr":"aria-label"},{"page":"rednote","selector":"#rednote-overview > .rn-layout > .rn-account-panel > .rn-account-switch","en":"Select an Account","zh":"选择账号","attr":"aria-label"},{"page":"rednote","selector":".rn-account-panel > #rn-account-detail > div > .rn-profile-preview","en":"Open Nowcoder profile","zh":"打开牛客账号主页","attr":"aria-label"},{"page":"rednote","selector":"div > .rn-profile-preview > .rn-profile-shot > img","en":"Nowcoder profile screenshot","zh":"牛客账号主页截图","attr":"alt"},{"page":"rednote-notes","selector":".section-layer > .portfolio-button-slot > .wechat-back-link[href=\"#work\"] > span","en":"BACK TO WORK","zh":"返回作品总览","attr":null},{"page":"rednote-notes","selector":".section-layer > .portfolio-button-slot > .hero-portfolio[href=\"#work\"] > span","en":"MY PORTFOLIO","zh":"我的作品集","attr":null},{"page":"rednote-notes","selector":"#rednote-notes > .rn-utility > .hero-category > span","en":"NEW MEDIA BRAND MARKETING","zh":"新媒体·品牌营销","attr":null},{"page":"rednote-notes","selector":".section-scroll-area > #rednote-notes > .rn-gallery-header > #rn-gallery-title","en":"MORE POSTS","zh":"更多笔记","attr":null},{"page":"rednote-notes","selector":".section-scroll-area > #rednote-notes > .rn-gallery-header > .rn-gallery-description","en":"Explore more posts and their engagement.","zh":"看更多笔记和它们的互动数据。","attr":null},{"page":"rednote-notes","selector":".section-layer > .section-scroll-area","en":"More RedNote posts","zh":"更多小红书笔记","attr":"aria-label"},{"page":"rednote-notes","selector":".section-layer > .section-scroll-area > #rednote-notes > .rn-wall-scroll","en":"Scroll through RedNote posts","zh":"滚动浏览小红书笔记","attr":"aria-label"},{"page":"design","selector":".section-layer > .portfolio-button-slot > .wechat-back-link[href=\"#work\"] > span","en":"BACK TO WORK","zh":"返回作品总览","attr":null},{"page":"design","selector":".section-layer > .portfolio-button-slot > .hero-portfolio[href=\"#work\"] > span","en":"MY PORTFOLIO","zh":"我的作品集","attr":null},{"page":"design","selector":"#design > .work-utility > .hero-category > span","en":"NEW MEDIA BRAND MARKETING","zh":"新媒体·品牌营销","attr":null},{"page":"design","selector":".section-scroll-area > #design > .dp-heading > #design-title","en":"DESIGN","zh":"设计","attr":null},{"page":"design","selector":".section-scroll-area > #design > .dp-copy > .dp-intro","en":"Selected print and social media work for NSC Xi’an and Nowcoder.","zh":"国家超算西安中心与牛客的平面及社媒作品。","attr":null},{"page":"design","selector":".section-layer > .section-scroll-area","en":"Design collection","zh":"设计作品集","attr":"aria-label"},{"page":"design","selector":".section-scroll-area > #design > .dp-heading > .dp-format-nav","en":"Design formats","zh":"作品分类","attr":"aria-label"},{"page":"design","selector":".section-layer > .section-scroll-area > #design > .dp-album","en":"Design project album","zh":"设计作品册","attr":"aria-label"},{"page":"design","selector":".section-scroll-area > #design > .dp-album-footer > .dp-album-pages","en":"Album pages","zh":"作品册页码","attr":"aria-label"},{"page":"design","selector":"#design > .dp-album-footer > .dp-album-pages > button","en":"Previous album page","zh":"上一组作品","attr":"aria-label"},{"page":"design","selector":"#design > .dp-album-footer > .dp-album-pages > button","en":"Next album page","zh":"下一组作品","attr":"aria-label"},{"page":"skills","selector":".section-layer > .portfolio-button-slot > .hero-portfolio[href=\"#work\"] > span","en":"MY PORTFOLIO","zh":"我的作品集","attr":null},{"page":"skills","selector":"#skills > .about-utility > .hero-category > span","en":"NEW MEDIA BRAND MARKETING","zh":"新媒体·品牌营销","attr":null},{"page":"skills","selector":".section-scroll-area > #skills > .skills-head > #skills-title","en":"SKILLS","zh":"技能","attr":null},{"page":"skills","selector":"#skills > .skills-object-stage > .skills-object-scene > .skills-unpack-hint","en":"Hover to unpack my skills.Tap to unpack my skills.","zh":"点击查看详细技能","attr":null},{"page":"skills","selector":".section-layer > .section-scroll-area","en":"Skills content","zh":"技能内容","attr":"aria-label"},{"page":"skills","selector":".skills-object-stage > .skills-object-scene > .skills-packed-contents > .skills-object-hit[data-object=\"ai\"]","en":"AI and web skills","zh":"AI 与网页技能","attr":"aria-label"},{"page":"skills","selector":".skills-object-stage > .skills-object-scene > .skills-packed-contents > .skills-object-hit[data-object=\"content\"]","en":"Content skills","zh":"内容技能","attr":"aria-label"},{"page":"skills","selector":".skills-object-stage > .skills-object-scene > .skills-packed-contents > .skills-object-hit[data-object=\"design\"]","en":"Design skills","zh":"设计技能","attr":"aria-label"},{"page":"skills","selector":".skills-object-stage > .skills-object-scene > .skills-packed-contents > .skills-object-hit[data-object=\"office\"]","en":"Office skills","zh":"办公技能","attr":"aria-label"},{"page":"skills","selector":".skills-object-stage > .skills-object-scene > .skills-packed-contents > .skills-object-hit[data-object=\"language\"]","en":"Language skills","zh":"语言技能","attr":"aria-label"},{"page":"skills","selector":".skills-object-stage > .skills-object-scene > .skills-packed-contents > .skills-object-hit[data-object=\"social\"]","en":"Social media and event skills","zh":"社媒与活动技能","attr":"aria-label"},{"page":"skills","selector":".skills-object-stage > .skills-object-scene > .skills-packed-contents > .skills-object-hit[data-object=\"video\"]","en":"Video editing skills","zh":"视频剪辑技能","attr":"aria-label"},{"page":"skills","selector":".skills-object-scene > .skills-bag-front-plane > .skills-bag-shell > img","en":"Zibo's orange canvas bag","zh":"王子博的橙色帆布包","attr":"alt"},{"page":"contact","selector":".section-layer > .portfolio-button-slot > .hero-portfolio[href=\"#work\"] > span","en":"MY PORTFOLIO","zh":"我的作品集","attr":null},{"page":"contact","selector":"#contact > .contact-utility > .hero-category > span","en":"NEW MEDIA BRAND MARKETING","zh":"新媒体·品牌营销","attr":null},{"page":"contact","selector":".section-scroll-area > #contact > .contact-view-toggle > button[data-contact-view=\"intro\"]","en":"Introduction","zh":"个人简介","attr":null},{"page":"contact","selector":".section-scroll-area > #contact > .contact-view-toggle > button[data-contact-view=\"details\"]","en":"Contact details","zh":"联系方式","attr":null},{"page":"contact","selector":".contact-body > #contact-intro > .contact-heading > #contact-title","en":"LET'S CREATE","zh":"一起创造","attr":null},{"page":"contact","selector":".contact-body > #contact-intro > .contact-heading > .contact-handline","en":"SOMETHING GREAT!","zh":"值得期待的作品！","attr":null},{"page":"contact","selector":".contact-body > #contact-intro > .contact-invitation > p","en":"Have a project in mind?","zh":"有想落地的项目吗？","attr":null},{"page":"contact","selector":".contact-body > #contact-intro > .contact-invitation > p","en":"Let's bring the idea to life.","zh":"让我们一起把它做出来。","attr":null},{"page":"contact","selector":"#contact > .contact-body > #contact-intro > .contact-scope","en":"Brand communication / Social contentEvent coverage","zh":"品牌传播/新媒体内容","attr":null},{"page":"contact","selector":".contact-body > #contact-details > .contact-card-identity > .contact-card-label","en":"Get in touch","zh":"欢迎联系","attr":null},{"page":"contact","selector":".contact-body > #contact-details > .contact-card-identity > h2","en":"ZIBO WANG","zh":"王子博","attr":null},{"page":"contact","selector":".contact-body > #contact-details > .contact-card-identity > .contact-card-role","en":"New Media & Brand Marketing","zh":"新媒体运营与品牌营销","attr":null},{"page":"contact","selector":"#contact-details > .contact-channels > .contact-channel > dt","en":"Phone","zh":"电话","attr":null},{"page":"contact","selector":"#contact-details > .contact-channels > .contact-channel > dt","en":"Email","zh":"邮箱","attr":null},{"page":"contact","selector":"#contact-details > .contact-channels > .contact-channel > dd","en":"wzb13149232818@163.com","zh":"wzb13149232818@163.com","attr":null},{"page":"contact","selector":"#contact-details > .contact-channels > .contact-channel > dt","en":"Location","zh":"所在地","attr":null},{"page":"contact","selector":"#contact-details > .contact-channels > .contact-channel > dd","en":"Xi'an, China","zh":"中国西安","attr":null},{"page":"contact","selector":".contact-body > #contact-details > .contact-email-button > span","en":"CONTACT ME","zh":"联系我","attr":null},{"page":"contact","selector":".section-scroll-area > #contact > .contact-closing > p","en":"PASSIONATE ABOUT CONTENT.FOCUSED ON RESULTS.","zh":"热爱内容，也看重结果。","attr":null},{"page":"contact","selector":".section-scroll-area > #contact > .contact-closing > p","en":"✦ AVAILABLE FORBRAND & CONTENT PROJECTS","zh":"✦ 欢迎品牌与内容合作","attr":null},{"page":"contact","selector":".section-scroll-area > #contact > .contact-closing > .contact-thanks","en":"Thank you!","zh":"感谢关注！","attr":null},{"page":"contact","selector":".section-layer > .section-scroll-area","en":"Contact content","zh":"联系区域","attr":"aria-label"},{"page":"contact","selector":".section-layer > .section-scroll-area > #contact > .contact-view-toggle","en":"Contact views","zh":"联系方式切换","attr":"aria-label"}],"legacy":{"global":{"新媒体运营":"NEW MEDIA","品牌营销":"BRAND MARKETING"},"home":{"新媒体运营":"A New Media Specialist","与品牌营销。":"& Brand Marketer.","我是":"I'M"},"work":{},"thinking":{},"wechat":{},"rednote":{},"rednote-notes":{},"design":{"宣传册":"Brochures","工业仿真行业解决方案":"Industrial Simulation Solutions","第 1 页":"Page 1","第 2 页":"Page 2","国家超级计算西安中心宣传册":"NSC Xi’an Brochure","字节跳动K12教育产品":"ByteDance K12 Education Products","第 3 页":"Page 3","第 4 页":"Page 4","第 5 页":"Page 5","第 6 页":"Page 6","第 7 页":"Page 7","第 8 页":"Page 8","第 9 页":"Page 9","海报":"Posters","超算互联网平台宣传海报":"SCNet Computing Platform","五一劳动节海报":"Labour Day 2026","兰州大学人工智能与算力创新应用研讨会":"Lanzhou University AI and Computing Seminar","西安交通大学 AI 技能公益普及活动邀请函":"Xi’an Jiaotong University AI Event Invitation","陕西省科技创新券政策宣讲会":"Innovation Voucher Policy Briefing","政策宣讲会海报":"Event poster","政策宣讲会主视觉":"Event key visual","新媒体内容":"Social content","封面模板":"Cover Templates","填志愿必看封面":"University Application Advice Cover","暑期实习转正分享封面":"Summer Internship Return Offer Cover","首图模板":"Opening Page Templates","关于校招入职那些事":"Campus Recruitment Onboarding Guide","大学生兼职时薪清单":"Student Part-Time Pay Comparison","留学生求职时间线":"International Student Job Search Timeline","面试经验分享模板":"Interview Experience Sharing Templates","Java 面试题内页模板":"Java Interview Questions","牛客面试题库尾图":"Interview Resource Closing Card","引流尾图模板":"Closing Cards for Resource Access","免费获取海量面试题尾图":"Interview Question Bank Closing Card","牛客 App 面经资源尾图":"Nowcoder App Interview Resources Closing Card","免费学习教程尾图":"Free Learning Resources Closing Card","25 届校招资料尾图":"2025 Graduate Recruitment Resources Closing Card","牛客 2024 春季校园招聘白皮书尾图":"2024 Spring Campus Recruitment White Paper Closing Card","AI 产品面经模板系列":"AI Product Interview Templates","MiniMax 海螺 AI 产品面经模板":"MiniMax Hailuo AI Interview Template","百度文心一言 AI 产品面经模板":"Baidu ERNIE AI Interview Template","蔚来 AI 产品经理面经模板":"NIO AI Product Interview Template","24 届校招薪资首图模板系列":"Graduate Salary Cover Templates","华为 24 届校招薪资首图模板":"Huawei Graduate Salary Cover","小米 24 届校招薪资首图模板":"Xiaomi Graduate Salary Cover","百度 24 届校招薪资首图模板":"Baidu Graduate Salary Cover","企业校招首图模板系列":"Employer Recruitment Cover Templates","滴滴招聘首图模板":"DiDi Recruitment Cover","诺瓦星云招聘首图模板":"NovaStar Recruitment Cover","小米招聘首图模板":"Xiaomi Recruitment Cover","国家超算西安中心":"NSC Xi’an","字节跳动":"ByteDance","牛客":"Nowcoder","上一件":"Previous project","下一件":"Next project","原始大小":"Original size","上一组作品":"Previous album page","下一组作品":"Next album page","设计作品分类":"Design formats","设计项目画册":"Design project album","国家超级计算西安中心年报":"NSC Xi’an Annual Report"},"skills":{"AI 与网站":"AI & WEB","网站设计":"Website design","AI 产品原型":"AI product prototyping","内容管理体系":"Content systems","数据驱动的工作流程":"Data-informed workflows","内容策划":"CONTENT","品牌叙事":"Brand storytelling","社媒内容制作":"Social media content","图文设计":"DESIGN","视觉传达":"Visual communication","稿定设计":"Gaoding Design","语言技能":"LANGUAGES","英语：专业八级":"English: TEM-8","普通话：母语":"Mandarin: Native","日常办公":"OFFICE","社媒与活动运营":"SOCIAL & EVENTS","微信运营":"WeChat operations","小红书运营":"RedNote operations","活动营销":"Event marketing","跨团队协作":"Cross-team coordination","视频剪辑":"VIDEO","剪映":"Jianying","Zibo 的橙色帆布包":"Zibo's orange canvas bag","Zibo的橙色帆布包":"Zibo's orange canvas bag"},"contact":{"项目邀请":"Introduction","社交内容":"Social content","感谢关注！":"Thank you!","值得期待的作品！":"SOMETHING GREAT!","有想推进的项目吗？":"Have a project in mind?","把这个想法做成作品。":"Let's bring the idea to life.","新媒体运营与品牌营销":"New Media & Brand Marketing","热爱内容创作。":"PASSIONATE ABOUT CONTENT.","关注实际成果。":"FOCUSED ON RESULTS.","✦ 欢迎合作":"✦ AVAILABLE FOR","品牌与内容项目":"BRAND & CONTENT PROJECTS"}},"segments":[[".hero-category > span:not(.asterisk)",["新媒体·品牌营销",""]],["#hero-name",["我是"," ","王子博"," ",""]],[".hero-statement",["做新媒体，也做品牌营销。",""]],["#work-landing-title",["我做过什么 & ","我的想法"]],["#thinking-modal-title",["我如何","思考"]],[".skills-hint-hover",["点击查看","详细技能"]],[".skills-hint-touch",["点击查看","详细技能"]]],"description":"王子博 — 新媒体运营与品牌营销作品集"};

/* ==== assets/portfolio-zh.js ==== */
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

/* ==== assets/sidebar.js ==== */
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

/* ==== assets/hero-v2.js ==== */
(() => {
  if (!window.gsap) return;
  const hero = document.querySelector('#home');
  const viewport = document.querySelector('.section-viewport');
  const select = gsap.utils.selector(hero);
  let introPlayed = false;
  gsap.matchMedia().add('(prefers-reduced-motion:no-preference)', () => {
    let intro;
    if (!introPlayed && viewport.dataset.activeSection === 'home' && window.portfolioScreenMotion!==false) {
      introPlayed = true;
      intro = gsap.timeline({defaults:{duration:.55,ease:'power3.out',clearProps:'transform,opacity,visibility,clipPath'}});
      intro.from('.sidebar-ambient',{opacity:0,duration:.55},0);
      if (matchMedia('(min-width:900px)').matches) {
        intro.from('.glass-sidebar',{x:-18,scale:.992,autoAlpha:0,duration:.7},.08)
          .from('.sidebar-brand',{x:-10,autoAlpha:0,duration:.46},.24)
          .from('.sidebar-link',{x:-10,autoAlpha:0,duration:.46,stagger:.05},.43)
          .from('.language-switch',{x:-10,autoAlpha:0,duration:.46},.68);
      }
      intro.from(viewport,{y:14,scale:.995,autoAlpha:0,duration:.75},.14)
        .from(select('.hero-category'),{y:-8,autoAlpha:0},.3)
        .from(select('.hero-portfolio'),{y:-8,scale:.98,autoAlpha:0},.36)
        .from(select('.hero-greeting'),{y:16,rotation:-6,autoAlpha:0,duration:.58},.56)
        .from(select('.hello-underline'),{scaleX:0,transformOrigin:'left center',duration:.46},.68)
        .from(select('.hello-sparks'),{opacity:0,duration:.4},.75)
        .from(select('.hero-word'),{y:26,opacity:0,clipPath:'inset(100% 0 0 0)',duration:.62,stagger:.11},.68)
        .from(select('.hero-statement-wrap'),{y:22,rotation:-3,scale:.96,opacity:0,duration:.62},1.03)
        .from(select('.hero-statement>svg'),{scaleX:0,transformOrigin:'left center',duration:.35},1.37)
        .from(select('.hero-visual'),{y:18,opacity:0,duration:.7},1.08);
    }
    const onSection = () => {
      // Leaving during the introduction settles it; returning uses the existing short section transition.
      if (viewport.dataset.activeSection !== 'home' && intro?.isActive()) intro.progress(1);
    };
    document.addEventListener('portfolio:sectionchange',onSection);
    return () => {
      document.removeEventListener('portfolio:sectionchange',onSection);
    };
  });
})();

/* ==== assets/work-landing.js ==== */
(() => {
  const landing=document.querySelector('#work.work-landing');
  if(!landing) return;
  const viewport=landing.closest('.section-viewport');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  let entrance=null;
  const stop=()=>{entrance?.progress(1).kill();entrance=null;landing.classList.remove('work-running');};
  function enter(){
    stop();
    if(reduced.matches||!window.gsap||window.portfolioScreenMotion===false) return;
    const fade=(target,at,stagger=0)=>entrance.fromTo(target,{opacity:0,y:12},{opacity:1,y:0,duration:.48,stagger,clearProps:'transform,opacity'},at);
    entrance=gsap.timeline({defaults:{ease:'power3.out'},onComplete:()=>landing.classList.add('work-running')});
    fade(landing.querySelector('.work-utility'),0);
    if(document.documentElement.lang!=='zh')fade(landing.querySelector('.work-landing-title'),.12);
    fade(landing.querySelectorAll('.work-hub-heading'),.22);
    fade(landing.querySelectorAll('.work-category-entry'),.32,.09);
    fade(landing.querySelector('.trust-root'),.36);
    fade(landing.querySelectorAll('.trust-branch'),.5,.1);
    entrance.fromTo(landing.querySelectorAll('.logic-path'),{strokeDasharray:100,strokeDashoffset:100},{strokeDashoffset:0,duration:.7,stagger:.07,clearProps:'strokeDasharray,strokeDashoffset'},.56);
    fade(landing.querySelector('.thinking-cta'),.72);
  }
  document.addEventListener('portfolio:sectionchange',event=>{
    if((event.detail.slide||event.detail.id)==='work')requestAnimationFrame(enter);else stop();
  });
  reduced.addEventListener('change',()=>{stop();if(!reduced.matches&&viewport.dataset.activeWorkSlide==='work')enter();});
  document.addEventListener('visibilitychange',()=>landing.classList.toggle('work-running',!document.hidden&&!reduced.matches&&viewport.dataset.activeWorkSlide==='work'&&!entrance?.isActive()));
  if(viewport.dataset.activeWorkSlide==='work')requestAnimationFrame(enter);
  addEventListener('pagehide',event=>{if(!event.persisted)stop();});
})();

/* ==== assets/thinking-modal.js ==== */
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

/* ==== assets/wechat-analysis-data.js ==== */
/* Strategy wording supplied by why_this_content_design.md; effects are intended. */
window.WeChatAnalysisData={
 event1:{sourceUrl:'https://mp.weixin.qq.com/s/ymqFOKQ2U4P83HjXLyKcLQ',decisions:[
  {id:'business-value',name:'BUSINESS VALUE',label:'Demonstrate practical value',decision:'Demonstrate relevance to real research and teaching needs.',content:'Translate capabilities into application cases',keywords:['AI Model Training','Scientific Simulation','Research & Teaching'],effect:'Show practical relevance',effectDescription:'Position computing capabilities as practical solutions to concrete research and teaching needs.'},
  {id:'industry-recognition',name:'INDUSTRY RECOGNITION',label:'Strengthen external validation',decision:'Build credibility through recognized institutions and industry voices.',content:'Integrate third-party authority',keywords:['CCF','Lanzhou University','Industry Experts','Ecosystem Partners'],effect:'Create third-party validation',effectDescription:'Reinforce professional credibility through independent institutional and expert endorsement.'},
  {id:'risk-control',name:'RISK CONTROL',label:'Reduce collaboration uncertainty',decision:'Address uncertainty around access, support, and implementation.',content:'Clarify the collaboration pathway',keywords:['Access Process','Technical Support','Tailored Solutions','Collaboration Mechanism'],effect:'Lower perceived collaboration risk',effectDescription:'Make the path from initial interest to practical engagement clearer and more actionable.'}
 ]}
};

/* Expo strategy derived from the user-supplied article transcript; effects are intended. */
window.WeChatAnalysisData.event2={
 "sourceUrl": "https://mp.weixin.qq.com/s/IEOwvHlvIrC4yXNyjf6fCQ",
 "decisions": [
  {
   "id": "business-value",
   "name": "BUSINESS VALUE",
   "label": "Show practical application",
   "decision": "Help business audiences connect computing capability with operational needs.",
   "content": "Connect computing with enterprise applications",
   "keywords": [
    "SME Agent Platform",
    "AI Tax Assistance",
    "Domestic Computing Platform"
   ],
   "effect": "Make the business value tangible",
   "effectDescription": "Help potential partners relate computing resources to knowledge retrieval and tax service needs."
  },
  {
   "id": "industry-recognition",
   "name": "INDUSTRY RECOGNITION",
   "label": "Show ecosystem participation",
   "decision": "Give potential partners concrete evidence of participation in the regional digital economy.",
   "content": "Organize three forums into a collaboration story",
   "keywords": [
    "Government-Led Forums",
    "Two Partnership Signings",
    "Technical Report"
   ],
   "effect": "Build confidence in ecosystem engagement",
   "effectDescription": "Make institutional participation, technical contribution, and signed cooperation visible in one narrative."
  },
  {
   "id": "cost-efficiency",
   "name": "COST & EFFICIENCY",
   "label": "Lower the trial barrier",
   "decision": "Help SMEs understand a lower-cost starting point for trying computing services.",
   "content": "Highlight trial access and simpler deployment",
   "keywords": [
    "RMB 3,000 Trial Voucher",
    "One-Click Deployment",
    "Knowledge Reuse"
   ],
   "effect": "Make initial engagement more approachable",
   "effectDescription": "Show how the voucher draw and one-click deployment can reduce the cost and effort of an initial trial."
  }
 ]
};

/* Research strategy from the user-supplied transcript; effects are intended. */
window.WeChatAnalysisData.research1={
 "sourceUrl": "https://mp.weixin.qq.com/s/ZehKj04qnC2ezMBQl-8JiQ",
 "publishedDate": "2026-06-16",
 "audience": "business",
 "caption": "How research updates translate B2B communication goals into brand trust.",
 "decisions": [
  {
   "id": "business-value",
   "name": "BUSINESS VALUE",
   "label": "Show research value",
   "decision": "Help enterprise R&D teams assess computing support for costly design evaluation.",
   "content": "Connect a costly research task with computing support",
   "keywords": [
    "Slow Evaluation",
    "Early Design",
    "Computing Support"
   ],
   "effect": "Make the service relevant to design work",
   "effectDescription": "Explain how the center supported a study seeking faster design assessment, giving potential research partners a concrete example."
  },
  {
   "id": "industry-recognition",
   "name": "INDUSTRY RECOGNITION",
   "label": "Show external evidence",
   "decision": "Give readers evidence of research support beyond the center's own description.",
   "content": "Name the university, publication, and acknowledgement",
   "keywords": [
    "Northwestern Polytechnical University",
    "Published Paper",
    "Team Acknowledgement"
   ],
   "effect": "Give brand claims an external basis",
   "effectDescription": "The named university, published paper, and team's acknowledgement show where the center contributed to research."
  },
  {
   "id": "brand-credibility",
   "name": "BRAND CREDIBILITY",
   "label": "Explain the role clearly",
   "decision": "Help prospective partners judge the center's reliability through a clear account of its role.",
   "content": "Explain the result, support role, and study limits",
   "keywords": [
    "Research Finding",
    "Computing & Technical Support",
    "Study Limits"
   ],
   "effect": "Build confidence in a transparent partner",
   "effectDescription": "Credit the research team for the finding, explain the center's support, and describe the study's stated limits."
  }
 ]
};

/* Research strategy from the user-supplied transcript; effects are intended. */
window.WeChatAnalysisData.research2={
 "sourceUrl": "https://mp.weixin.qq.com/s/mTjZhVoZIWsjeb-jyr5fag",
 "publishedDate": "2026-06-03",
 "audience": "business",
 "caption": "How research updates translate B2B communication goals into brand trust.",
 "decisions": [
  {
   "id": "business-value",
   "name": "BUSINESS VALUE",
   "label": "Connect with a real need",
   "decision": "Help enterprise R&D teams see how computing support can address a battery research problem.",
   "content": "Connect fast-charging research with computing support",
   "keywords": [
    "Fast Charging",
    "Battery Stability",
    "Computing Support"
   ],
   "effect": "Make the service relevant to enterprise R&D",
   "effectDescription": "Show how calculations helped explain a practical battery problem, giving potential R&D partners a concrete reason to consider computing support."
  },
  {
   "id": "brand-credibility",
   "name": "BRAND CREDIBILITY",
   "label": "Make the support specific",
   "decision": "Help potential partners judge the center's support through a specific research example.",
   "content": "Show how computing helps explain the test result",
   "keywords": [
    "Battery Test",
    "Computer Simulation",
    "Team Acknowledgement"
   ],
   "effect": "Make the support role credible",
   "effectDescription": "Describe how calculations helped explain the battery behavior, making the center's contribution specific and understandable."
  },
  {
   "id": "risk-control",
   "name": "RISK CONTROL",
   "label": "Clarify what the result means",
   "decision": "Help prospective partners assess the support before starting a research collaboration.",
   "content": "Define the computing contribution and its scope",
   "keywords": [
    "Simulation Support",
    "Team Acknowledgement",
    "Defined Support Role"
   ],
   "effect": "Reduce uncertainty about collaboration",
   "effectDescription": "Clarify the contribution and its scope so prospective partners can assess whether the service fits their research."
  }
 ]
};

window.WeChatAnalysisData.event2.publishedDate='2026-06-29';

/* ==== assets/wechat-analysis-template.js ==== */
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

/* ==== assets/wechat-page.js ==== */
(() => {
 const page=document.querySelector('#wechat');if(!page)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
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
  box.append(el('h4','','Select an article\nto see the thinking\nbehind it.'));selection.append(box);
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
 document.addEventListener('pointerdown',event=>{if(activeNode&&!activeNode.contains(event.target)&&!explanations.get(activeNode).contains(event.target))closeNode();});page.addEventListener('keydown',event=>{if(event.key==='Escape'&&activeNode){event.stopPropagation();closeNode();}});
 function animate(active){entry?.kill();const targets=[...page.querySelectorAll('.work-utility,.wechat-title,.wechat-subtitle,.wechat-tabs,.wechat-group-heading,.wechat-item,.wechat-logic-label,.wechat-logic-title,.wechat-logic-caption,.wechat-idle')].filter(node=>document.documentElement.lang!=='zh'||!node.matches('.wechat-title,.wechat-subtitle'));if(window.gsap)gsap.set(targets,{clearProps:'opacity,transform'});if(active&&window.gsap&&window.portfolioScreenMotion!==false)entry=gsap.fromTo(targets,{opacity:0,y:reduced.matches?0:8},{opacity:1,y:0,duration:.35,stagger:reduced.matches?0:.045,ease:'power3.out',clearProps:'opacity,transform'});}
 document.addEventListener('portfolio:sectionchange',event=>{closeNode();animate(event.detail.slide==='wechat');});reduced.addEventListener('change',()=>{transition?.kill();tabMotion?.kill();if(window.gsap)gsap.set([collection,selection],{clearProps:'opacity,transform'});animate(false);});
 window.WeChatPage={
  reset:()=>{
   page.querySelectorAll('[data-wechat-sample]').forEach(button=>button.setAttribute('aria-pressed','false'));
   idle();
  }
 };
 idle();animate(!page.closest('.section-layer').hidden);addEventListener('pagehide',()=>{entry?.kill();transition?.kill();tabMotion?.kill();clearTimeout(hideTimer);});
})();

/* ==== assets/rednote-data.js ==== */
/* Original note metadata and portfolio analysis. */
window.rednoteContent = {
  "accounts": [
    {
      "id": "01",
      "name": "Nowcoder",
      "profileUrl": "https://xhslink.cn/o/40oQuXFTWIQ",
      "image": "assets/rednote/nowcoder-profile.webp",
      "descriptionLabel": "ACCOUNT POSITIONING",
      "positioning": "Job opportunities, job-search advice, and job-search tools.",
      "audience": "Students and graduates preparing for job applications.",
      "approach": "Publish employer lists and job-search advice, along with guides to using Nowcoder's job-search tools.",
      "framework": "Understand job-seeker needs → Provide practical resources → Support job applications → Guide readers to Nowcoder."
    },
    {
      "id": "02",
      "name": "Career Mentor",
      "profileUrl": "https://xhslink.cn/o/6AUWhuX0Nh9",
      "image": "assets/rednote/career-mentor-profile.webp",
      "descriptionLabel": "OPERATED BY NOWCODER · BUILT FROM SCRATCH",
      "positioning": "Offer job-search advice in the voice of a senior student.",
      "audience": "Students seeking clear guidance on job searches and applications.",
      "approach": "Answer questions in a senior-student voice and guide readers to private channels or Nowcoder.",
      "framework": "Define the persona → Analyze job-seeker pain points → Plan content topics → Answer questions → Guide readers to private channels / Nowcoder."
    }
  ],
  "notes": [
    {
      "id": "moment",
      "account": "02",
      "title": "Part-Time Hourly Pay Roundup — A Must-Save for Students Looking for Part-Time Work!",
      "coverText": "",
      "theme": "coral",
      "ratio": "portrait",
      "url": "https://xhslink.cn/o/2ElrIIpkQZy",
      "image": "assets/rednote/moment-original-20261013.webp",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "panelRatio": 0.75,
      "date": "2024.05.22",
      "likes": 9900,
      "saves": 4904,
      "comments": 492,
      "featured": true,
      "why": "Help students choose part-time jobs.",
      "whyDetail": "Hourly pay is an important factor when students choose part-time jobs.",
      "design": "Compare hourly pay, benefits, and job requirements.",
      "designDetail": "Brand logos and a consistent section layout make hourly pay, benefits, and working conditions easier to compare.",
      "decisions": [
        "Practical Value",
        "Uncertainty",
        "Approachability"
      ],
      "reason": "Hourly pay makes direct comparisons easier, while working conditions help readers know what to expect. The senior-student voice makes the advice more approachable.",
      "engagement": "Useful comparisons and a save prompt may help explain the 4,904 saves.",
      "displayMeta": "CAREER MENTOR · FEATURED POST",
      "noteId": "664d9a610000000016010f34",
      "originalTitle": "兼职时薪合集！想做兼职的同学一定要码住！",
      "recordedAt": "2026-10-13T05:11:12+08:00"
    },
    {
      "id": "ironbowl",
      "noteId": "66d6e092000000001d01473c",
      "account": "02",
      "originalTitle": "强烈建议25届一定要投这些“铁饭碗”！",
      "title": "Stable Job Opportunities for 2025 Graduates",
      "url": "https://xhslink.cn/o/QVngh6LDnO",
      "likes": 7658,
      "saves": 6531,
      "comments": 143,
      "date": "2024.09.09",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.7484407484407485,
      "image": "assets/rednote/ironbowl-original-20261013.webp"
    },
    {
      "id": "majors",
      "noteId": "6662cfde000000000e033292",
      "account": "02",
      "originalTitle": "填志愿必看！最有钱途的十五大专业！",
      "title": "15 University Majors with Strong Earning Potential",
      "url": "https://xhslink.cn/o/9tlGxJBwV00",
      "likes": 3827,
      "saves": 2040,
      "comments": 105,
      "date": "2024.06.07",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.75,
      "image": "assets/rednote/majors-original-20261013.webp"
    },
    {
      "id": "publicjobs",
      "noteId": "66583f97000000001401b186",
      "account": "02",
      "originalTitle": "今年下半年还能进编制！不要再错过啦！",
      "title": "Public-Sector Recruitment in the Second Half of 2024",
      "url": "https://xhslink.cn/o/1tUBoYCyGkG",
      "likes": 2812,
      "saves": 1792,
      "comments": 28,
      "date": "2024.05.30",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.75,
      "image": "assets/rednote/publicjobs-original-20261013.webp"
    },
    {
      "id": "parttime2",
      "noteId": "666173a40000000006005a01",
      "account": "02",
      "originalTitle": "兼职时薪第二弹！想兼职的同学一定要码住！",
      "title": "Part-Time Hourly Pay Roundup: Part 2",
      "url": "https://xhslink.cn/o/ATrP00qdMjR",
      "likes": 2663,
      "saves": 1139,
      "comments": 170,
      "date": "2024.06.06",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.75,
      "image": "assets/rednote/parttime2-original-20261013.webp"
    },
    {
      "id": "summerjobs",
      "noteId": "667142f7000000000d00c025",
      "account": "02",
      "originalTitle": "想做暑假工的同学必看！一定要注意避坑！",
      "title": "Summer Jobs: Common Pitfalls to Avoid",
      "url": "https://xhslink.cn/o/1LF8QQbMPCz",
      "likes": 2356,
      "saves": 1459,
      "comments": 91,
      "date": "2024.07.04",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.7484407484407485,
      "image": "assets/rednote/summerjobs-original-20261013.webp"
    },
    {
      "id": "aiinterview",
      "noteId": "66c469f7000000001d03aab1",
      "account": "02",
      "originalTitle": "其实，AI面试真的挺水的……",
      "title": "AI Interviews: Easier Than You Might Expect",
      "url": "https://xhslink.cn/o/8lXl99vHkyB",
      "date": "2024.08.21",
      "likes": 2240,
      "saves": 2471,
      "comments": 3,
      "recordedAt": "2026-10-13T06:46:52+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.75,
      "image": "assets/rednote/aiinterview-original-20261013.webp"
    },
    {
      "id": "internpay",
      "noteId": "664eeafd0000000005005af9",
      "account": "02",
      "originalTitle": "大厂实习薪资合集！想实习的同学千万别错过",
      "title": "Internship Pay at Major Companies",
      "url": "https://xhslink.cn/o/3sFH3WvJCHM",
      "likes": 1845,
      "saves": 1474,
      "comments": 84,
      "date": "2024.05.23",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.7484407484407485,
      "image": "assets/rednote/internpay-original-20261013.webp"
    },
    {
      "id": "civilservice",
      "noteId": "66d17b71000000001d01a22e",
      "account": "02",
      "originalTitle": "2025广东公考参考时间线！真的要马住！",
      "title": "2025 Guangdong Civil Service Exam Timeline",
      "url": "https://xhslink.cn/o/8Uy19bL4OB",
      "likes": 1662,
      "saves": 2406,
      "comments": 42,
      "date": "2024.09.24",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.7484407484407485,
      "image": "assets/rednote/civilservice-original-20261013.webp"
    },
    {
      "id": "animecv",
      "noteId": "6697ab31000000002501585b",
      "account": "02",
      "originalTitle": "我们二次元吃谷人也有属于自己的简历！",
      "title": "A Résumé for Anime Fans and Collectors",
      "url": "https://xhslink.cn/o/2M9TSvVfOIa",
      "likes": 1627,
      "saves": 1165,
      "comments": 9,
      "date": "2024.07.18",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.75,
      "image": "assets/rednote/animecv-original-20261013.webp"
    },
    {
      "id": "practical",
      "account": "01",
      "title": "Shenzhen Companies with Two-Day Weekends Worth Applying To ✨",
      "coverText": "",
      "theme": "blue",
      "ratio": "portrait",
      "url": "https://xhslink.cn/o/2YGvsiuwaMY",
      "image": "assets/rednote/practical-original-20261013.webp",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "panelRatio": 0.7484407484407485,
      "date": "2024.08.21",
      "likes": 1397,
      "saves": 1753,
      "comments": 148,
      "featured": true,
      "why": "Address a specific job-search need.",
      "whyDetail": "Filtering by city and two-day weekends helps readers assess whether the content meets their job-search needs.",
      "design": "Make information on 45 companies easy to browse and save.",
      "designDetail": "Large-format keywords and three numbered columns make the list easy to scan and revisit.",
      "decisions": [
        "Practical Value",
        "Information Search Effort"
      ],
      "reason": "Clear selection criteria help narrow the search, while the list can be saved for future reference during job applications.",
      "engagement": "Saves exceed likes, consistent with the list’s value as a reference.",
      "displayMeta": "NOWCODER · AUG 21, 2024",
      "noteId": "66c591b2000000001f0190a7",
      "originalTitle": "深圳可闭眼投的双休公司合集✨️",
      "recordedAt": "2026-10-13T05:11:12+08:00"
    },
    {
      "id": "takehome",
      "account": "01",
      "title": "What Students Should Know About Take-Home Pay",
      "coverText": "",
      "theme": "yellow",
      "ratio": "portrait",
      "url": "https://xhslink.cn/o/6phwuN5RWH",
      "image": "assets/rednote/takehome-original-20261013.webp",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "panelRatio": 0.7484407484407485,
      "date": "2024.08.22",
      "likes": 1249,
      "saves": 1076,
      "comments": 8,
      "featured": false,
      "originalTitle": "大学生找工作，一定要明白【到手工资】!",
      "noteId": "66c705aa000000001f03b995",
      "recordedAt": "2026-10-13T05:11:12+08:00"
    },
    {
      "id": "certificates",
      "noteId": "666815ef000000000e0325e9",
      "account": "01",
      "originalTitle": "🐴马住！24下半年还能考的证书合集！",
      "title": "Certification Exams in the Second Half of 2024",
      "url": "https://xhslink.cn/o/JZUVPEBLVj",
      "likes": 1210,
      "saves": 990,
      "comments": 12,
      "date": "2024.06.12",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.75,
      "image": "assets/rednote/certificates-original-20261013.webp"
    },
    {
      "id": "mcn",
      "noteId": "66c32bb2000000001d017606",
      "account": "01",
      "originalTitle": "广州MCN清单，顶流博主都在哪些公司？",
      "title": "Guangzhou MCN Companies and Their Top Creators",
      "url": "https://xhslink.cn/o/3HiaSIrcNFp",
      "likes": 1163,
      "saves": 912,
      "comments": 91,
      "date": "2024.08.19",
      "recordedAt": "2026-10-13T05:11:12+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.75,
      "image": "assets/rednote/mcn-original-20261013.webp"
    },
    {
      "id": "graduatestatus",
      "noteId": "665eefc80000000006006308",
      "account": "02",
      "originalTitle": "关于应届生身份那些事儿",
      "title": "Understanding Recent-Graduate Eligibility",
      "url": "https://xhslink.cn/o/97Q5ST67S3Z",
      "date": "2024.06.14",
      "likes": 709,
      "saves": 435,
      "comments": 378,
      "recordedAt": "2026-10-13T06:46:52+08:00",
      "coverText": "",
      "real": true,
      "sourcePanel": true,
      "panelWidth": 1,
      "ratio": "portrait",
      "theme": "blue",
      "featured": false,
      "panelRatio": 0.7484407484407485,
      "image": "assets/rednote/graduatestatus-original-20261013.webp"
    }
  ]
};

/* ==== assets/rednote-page.js ==== */
(() => {
  const page = document.querySelector('.rn-page');
  const content = window.rednoteContent;
  if (!page || !content) return;
  const area = page.closest('.section-scroll-area');
  const gallery = document.querySelector('#rednote-notes');
  const galleryArea = gallery.closest('.section-scroll-area');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.querySelector('.rn-preview');
  let account = content.accounts[0];
  let tween;
  let opener;
  let overviewView = 'account';
  let selectedNote = 0;
  let accountDetail = 'audience';
  let noteDetail = 'topic';
  page.classList.add('rn-reader-page');
  // Preserve field identifiers before the locale adapter translates their labels.
  page.querySelectorAll('.rn-account-copy dt').forEach(dt=>{
    if(!dt.dataset.accountField)dt.dataset.accountField=dt.textContent.trim().toLowerCase();
  });
  const applyOverviewView = () => {
    const paged = page.classList.contains('rn-paged-overview');
    page.querySelector('.rn-account-panel').hidden = paged && overviewView !== 'account';
    page.querySelector('.rn-featured').hidden = paged && overviewView === 'account';
    if (paged && overviewView.startsWith('note')) selectedNote = Number(overviewView.slice(4)) - 1;
    page.querySelectorAll('.rn-case').forEach((item,index) => { item.hidden = index !== selectedNote; });
    page.classList.toggle('rn-narrow-reader',area.clientWidth < 600);
    page.querySelectorAll('.rn-case').forEach(item => { item.dataset.noteDetail = noteDetail; });
    page.querySelectorAll('[data-note-detail-choice]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.noteDetailChoice === noteDetail)));
    page.querySelectorAll('[data-select-note]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.selectNote) === selectedNote)));
    const compactDetails = area.clientWidth < 600 || area.clientHeight < 650;
    page.classList.toggle('rn-detail-views', compactDetails);
    page.querySelectorAll('.rn-account-copy dt').forEach(dt => { const key = dt.dataset.accountField || dt.textContent.toLowerCase(); dt.hidden = compactDetails && key !== accountDetail; dt.nextElementSibling.hidden = dt.hidden; });
    page.querySelectorAll('[data-account-detail]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.accountDetail === accountDetail)));
    page.querySelectorAll('[data-rn-view]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.rnView === overviewView)));
  };
  page.querySelectorAll('[data-rn-view]').forEach(button => button.addEventListener('click',() => { overviewView = button.dataset.rnView; applyOverviewView(); }));
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const cover = note => {
    const element = make('div', `rn-cover rn-${note.theme} rn-${note.ratio}`);
    if (note.coverText) element.append(make('strong', '', note.coverText));
    if (note.real) element.classList.add('rn-real-cover');
    if (note.sourcePanel) {
      element.classList.add('rn-source-panel');
      element.style.setProperty('--rn-panel-width', `${100 / note.panelWidth}%`);
      element.style.setProperty('--rn-panel-ratio', note.panelRatio);
    }
    if (note.image) {
      if (note.sourcePanel) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('viewBox', `0 0 ${note.panelRatio} 1`);
        svg.setAttribute('role','img');
        svg.setAttribute('aria-label',note.title);
        svg.setAttribute('preserveAspectRatio','xMidYMid meet');
        const picture = document.createElementNS(svg.namespaceURI,'image');
        window.PortfolioMedia.set(picture,note.image,null,'href');
        picture.setAttribute('width',note.panelRatio / note.panelWidth);
        picture.setAttribute('height','1');
        svg.append(picture);
        element.append(svg);
      } else {
        const image = make('img'); image.src = note.image; image.alt = note.title;
        image.loading = 'lazy'; image.decoding = 'async'; element.append(image);
      }
    }
    return element;
  };
  const preview = (title, visual, trigger) => {
    opener = trigger;
    dialog.querySelector('h2').textContent = title;
    dialog.querySelector('.rn-preview-body').replaceChildren(visual);
    dialog.showModal();
  };
  const action = (className, text, url, callback) => {
    const element = make(url ? 'a' : 'button', className, text);
    if (url) {
      element.href = url;
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    } else {
      element.type = 'button';
      element.addEventListener('click', () => callback(element));
    }
    return element;
  };
  const openNote = (note, trigger) => preview(note.title, cover(note), trigger);
  const group = (label, heading, body) => {
    const element = make('div', 'rn-analysis-group');
    element.append(make('h4', '', label), make('strong', '', heading), make('p', '', body));
    return element;
  };
  const icons = {
    likes: 'M12 20 3 11C-2 4 7 0 12 6c5-6 14-2 9 5Z',
    saves: 'M6 3h12v18l-6-4-6 4Z',
    comments: 'M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z'
  };
  const metric = (kind, number, real = false) => {
    const span = make('span');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', icons[kind]);
    svg.append(path);
    span.setAttribute('aria-label', `${number} ${kind}, ${real ? 'recorded engagement' : 'sample data'}`);
    span.append(svg, document.createTextNode(number.toLocaleString('en-US')));
    return span;
  };
  const featuredNotes = content.notes.filter(note => note.featured).sort((a,b) => a.account.localeCompare(b.account));
  const noteSelector = make('nav','rn-note-selector');
  noteSelector.setAttribute('aria-label','Select a post to read');
  featuredNotes.forEach((note,index) => {
    const button = make('button','rn-note-choice'); button.type = 'button';
    button.dataset.selectNote = index; button.setAttribute('aria-pressed',String(index === selectedNote));
    button.setAttribute('aria-controls',`rn-case-${note.account}`);
    button.append(make('span','',`Account ${note.account} · ${content.accounts.find(item => item.id === note.account).name}`),make('strong','',note.title));
    button.addEventListener('click',()=>{ selectedNote = index; overviewView = `note${index + 1}`; applyOverviewView(); });
    noteSelector.append(button);
  });
  page.querySelector('.rn-featured-heading').after(noteSelector);
  featuredNotes.forEach(note => {
    const article = make('article', 'rn-case');
    article.id = `rn-case-${note.account}`;
    const media = make('div', 'rn-case-media');
    const visualLink = action('rn-cover-button', undefined, note.url, trigger => openNote(note, trigger));
    if (note.real) visualLink.classList.add('rn-image-frame');
    if (note.sourcePanel) visualLink.style.aspectRatio = note.panelRatio;
    visualLink.setAttribute('aria-label', `${note.title}: ${note.url ? 'open original post' : 'preview placeholder post'}`);
    visualLink.append(cover(note));
    media.append(visualLink);
    if (note.real) {
      const metrics = make('div', 'rn-case-metrics');
      ['likes', 'saves', 'comments'].forEach(kind => metrics.append(metric(kind, note[kind], true)));
      media.append(metrics);
    }

    const heading = make('header', 'rn-note-heading');
    const titleBlock = make('div', 'rn-note-title-block');
    titleBlock.append(make('span', 'rn-label', note.displayMeta), make('h3', '', note.title));
    heading.append(titleBlock, action('rn-note-link', "VIEW ORIGINAL POST ↗", note.url, trigger => openNote(note, trigger)));
    const copy = make('div', 'rn-case-copy');
    copy.append(group("01 · TOPIC ANALYSIS", note.why, note.whyDetail), group('02 · POST DESIGN', note.design, note.designDetail));
    const decisions = make('footer', 'rn-decision-band');
    const tags = make('div', 'rn-decision-tags');
    note.decisions.forEach(decision => tags.append(make('span', '', decision)));
    const decisionCopy = make('div', 'rn-decision-copy');
    decisionCopy.append(make('h4', '', 'USER DECISION FACTORS'), tags, make('p', '', note.reason));
    decisions.append(decisionCopy);
    const main = make('div','rn-case-main'); main.append(media,copy);
    const detailControls = make('nav','rn-note-step-controls');
    detailControls.setAttribute('aria-label','Post analysis sections');
    [['topic',"Topic Analysis"],['design',"Post Design"],['decision',"Decision Factors"]].forEach(([key,label])=>{ const button=make('button','',label);button.type='button';button.dataset.noteDetailChoice=key;button.addEventListener('click',()=>{noteDetail=key;applyOverviewView();});detailControls.append(button); });
    article.append(heading, detailControls, main, decisions);
    page.querySelector('.rn-featured').append(article);
  });
  const galleryScroll = gallery.querySelector('.rn-wall-scroll');
  const tooltip = make('div', 'rn-gallery-tooltip');
  tooltip.id = 'rn-gallery-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.hidden = true;
  gallery.append(tooltip);
  let tooltipCard;
  let tooltipTimer;
  const hideTooltip = () => {
    clearTimeout(tooltipTimer);
    tooltip.hidden = true;
    tooltipCard?.removeAttribute('aria-describedby');
    tooltipCard = null;
  };
  const showTooltip = (note, card) => {
    hideTooltip();
    tooltipCard = card;
    const counts = make('div', 'rn-tooltip-metrics');
    ['likes', 'saves', 'comments'].forEach(kind => counts.append(metric(kind, note[kind], Boolean(note.real))));
    tooltip.replaceChildren(make('h3', '', note.title), counts);
    if (!note.real) tooltip.append(make('p', 'rn-tooltip-sample', 'Sample content · Original link pending'));
    tooltip.hidden = false;
    card.setAttribute('aria-describedby', tooltip.id);
    const pageBox = gallery.getBoundingClientRect();
    const cardBox = card.getBoundingClientRect();
    const popup = tooltip.getBoundingClientRect();
    let left = cardBox.right - pageBox.left + 12;
    if (left + popup.width > pageBox.width - 16) left = cardBox.left - pageBox.left - popup.width - 12;
    left = Math.max(16, Math.min(left, pageBox.width - popup.width - 16));
    const top = Math.max(16, Math.min(cardBox.top - pageBox.top + 24, pageBox.height - popup.height - 16));
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  };
  const scheduleTooltipHide = () => {
    clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(() => {
      if (!tooltip.matches(':hover') && !tooltipCard?.matches(':hover,:focus')) hideTooltip();
    }, 120);
  };
  tooltip.addEventListener('pointerenter', () => clearTimeout(tooltipTimer));
  tooltip.addEventListener('pointerleave', scheduleTooltipHide);
  galleryScroll.addEventListener('scroll', hideTooltip, {passive: true});
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !tooltip.hidden) hideTooltip(); });
  const galleryNotes = [...new Map(content.notes.map(note => [note.noteId || note.url || note.id, note])).values()]
    .sort((a,b) => b.likes - a.likes);
  galleryNotes.forEach(note => {
    const card = action('rn-wall-card', undefined, note.url, trigger => openNote(note, trigger));
    if (note.real) card.classList.add('rn-image-frame');
    card.dataset.account = note.account;
    card.dataset.noteId = note.noteId || note.id;
    card.setAttribute('aria-label', `${note.title}; ${note.likes} likes, ${note.saves} saves, ${note.comments} comments. ${note.real ? 'Recorded engagement.' : 'Sample data.'} ${note.url ? 'Open original post' : 'Preview placeholder post'}.`);
    const visual = make('div', 'rn-wall-cover');
    visual.append(cover(note));
    if (!note.real) visual.append(make('span', 'rn-wall-sample', 'SAMPLE'));
    card.append(visual);
    card.addEventListener('pointerenter', () => showTooltip(note, card));
    card.addEventListener('pointerleave', scheduleTooltipHide);
    card.addEventListener('focus', () => showTooltip(note, card));
    card.addEventListener('blur', scheduleTooltipHide);
    card.addEventListener('click', hideTooltip);
    gallery.querySelector('.rn-wall').append(card);
  });
  const layoutWall = () => {
    const wall = gallery.querySelector('.rn-wall');
    if (!wall.clientWidth) return;
    const style = getComputedStyle(wall);
    const row = parseFloat(style.gridAutoRows);
    const gap = parseFloat(style.rowGap);
    const spans = [...wall.children].map(card => [card, Math.ceil((card.getBoundingClientRect().height + gap) / (row + gap))]);
    spans.forEach(([card, span]) => { card.style.gridRowEnd = `span ${span}`; });
  };
  page.querySelector('.rn-featured-heading h2').textContent = "FEATURED POSTS";
  page.querySelector('.rn-featured-heading .rn-demo').textContent = '2 CASE STUDIES';
  const detailTabs = make('nav','rn-account-detail-tabs');
  detailTabs.setAttribute('aria-label','Account strategy detail');
  ['audience','approach','framework'].forEach(key=>{
    const button=make('button','',key[0].toUpperCase()+key.slice(1)); button.type='button';
    button.dataset.accountDetail=key;
    button.addEventListener('click',()=>{accountDetail=key;applyOverviewView();});
    detailTabs.append(button);
  });
  page.querySelector('.rn-account-copy dl').before(detailTabs);
  const profileShot = page.querySelector('.rn-profile-shot');
  const originalProfile = profileShot.innerHTML;
  const profileControls = [...page.querySelectorAll('[data-open-profile]')];
  const openProfile = trigger => {
    if (account.profileUrl) window.open(account.profileUrl, '_blank', 'noopener,noreferrer');
    else preview(`${account.name} · Demo profile`, profileShot.cloneNode(true), trigger);
  };
  profileControls.forEach(control => control.addEventListener('click', () => openProfile(control)));
  const selectAccount = id => {
    account = content.accounts.find(item => item.id === id) || account;
    page.querySelectorAll('.rn-account-button').forEach(button => {
      const selected = button.dataset.account === account.id;
      button.setAttribute('aria-pressed', String(selected));
      button.querySelector('strong').textContent = content.accounts.find(item => item.id === button.dataset.account)?.name || button.querySelector('strong').textContent;
      button.querySelector('small').textContent = selected ? "CURRENT ACCOUNT" : '⇄ SWITCH ACCOUNT';
    });
    for (const key of ['positioning', 'audience', 'approach', 'framework']) page.querySelector(`[data-${key}]`).textContent = account[key];
    page.querySelector('[data-account-status]').textContent = `${account.id} / 02 · ${account.name.toUpperCase()}${account.image ? '' : ' · DEMO'}`;
    page.querySelector('.rn-account-copy .rn-demo').textContent = account.descriptionLabel || 'ILLUSTRATIVE STRATEGY';
    profileControls[0].setAttribute('aria-label', `${account.profileUrl ? 'Open' : 'Preview'} ${account.name} profile`);
    profileShot.dataset.account = account.id;
    if (account.image) {
      const image = make('img');
      window.PortfolioMedia.set(image,account.image,'rednote');
      image.alt = `${account.name} profile screenshot`;
      image.decoding = 'async';
      profileShot.replaceChildren(image);
    } else {
      // This is fixed local placeholder markup, not imported account content.
      profileShot.innerHTML = originalProfile;
      profileShot.querySelector('[data-profile-name]').textContent = account.name;
      profileShot.querySelector('[data-profile-bio]').textContent = account.positioning;
      profileShot.querySelector('.rn-profile-banner').innerHTML = account.id === '01' ? 'EVERYDAY<br>GOOD IDEAS.' : 'CITY MOMENTS.<br>SHARED STORIES.';
      const samples = account.id === '01' ? ['SMALL CHANGES', 'SIMPLE IDEAS', 'A QUIET MORNING', 'GOOD HABITS', 'MAKE SPACE', 'EVERYDAY DETAILS'] : ['CITY WALKS', 'CAFE MOMENTS', 'WEEKEND STORIES', 'SUNSET SCENES', 'SHARED FEELINGS', 'LITTLE JOYS'];
      profileShot.querySelectorAll('.rn-mini-cover').forEach((element, index) => { element.textContent = samples[index]; });
      profileShot.querySelector('.rn-profile-stats').firstElementChild.textContent = account.id === '01' ? '120 Posts' : '96 Posts';
      profileShot.querySelector('.rn-profile-stats').children[1].textContent = account.id === '01' ? '8.6k Followers' : '5.2k Followers';
    }
    if (window.gsap && window.portfolioScreenMotion!==false) {
      tween?.kill();
      tween = window.gsap.fromTo(page.querySelector('.rn-account-body'), {opacity: reduced.matches ? 1 : .6}, {opacity: 1, duration: reduced.matches ? 0 : .25, overwrite: 'auto', clearProps: 'opacity'});
    }
  };
  page.querySelectorAll('.rn-account-button').forEach(button => button.addEventListener('click', () => selectAccount(button.dataset.account)));
  dialog.querySelector('.rn-preview-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus());
  const sizeIntro = () => {
    hideTooltip();
    if (area.clientHeight) {
      page.style.setProperty('--rn-screen-height', `${area.clientHeight}px`);
      page.classList.toggle('rn-paged-overview',area.clientWidth <= 1000 || area.clientHeight < 740);
      applyOverviewView();
      // If complete text still exceeds the available desktop height, keep it in switchable views.
      if (!page.classList.contains('rn-paged-overview') && page.querySelector('.rn-intro').scrollHeight > area.clientHeight + 2) {
        page.classList.add('rn-paged-overview');
        applyOverviewView();
      }
    }
    if (galleryArea.clientHeight) {
      gallery.style.setProperty('--rn-screen-height', `${galleryArea.clientHeight}px`);
      layoutWall();
    }
  };
  const observer = new ResizeObserver(sizeIntro);
  observer.observe(area);
  observer.observe(galleryArea);
  document.addEventListener('portfolio:sectionchange', event => {
    hideTooltip();
    if (['rednote', 'rednote-notes'].includes(event.detail.slide)) requestAnimationFrame(sizeIntro);
    if (dialog.open) dialog.close();
  });
  addEventListener('pagehide', () => tween?.kill());
  window.RednoteReader={
    state:()=>({accountIndex:content.accounts.indexOf(account),accountCount:content.accounts.length,
      selectedNote,noteCount:featuredNotes.length,accountDetail,noteDetail,
      details:page.classList.contains('rn-detail-views'),narrow:page.classList.contains('rn-narrow-reader')}),
    setAccount:(index,detail='audience')=>{
      accountDetail=detail;overviewView='account';
      selectAccount(content.accounts[Math.max(0,Math.min(content.accounts.length-1,index))].id);
      applyOverviewView();
    },
    setNote:(index,detail='topic')=>{
      selectedNote=Math.max(0,Math.min(featuredNotes.length-1,index));
      overviewView='note'+(selectedNote+1);noteDetail=detail;applyOverviewView();
    },
    setAccountDetail:key=>{accountDetail=key;applyOverviewView();},
    setNoteDetail:key=>{noteDetail=key;applyOverviewView();}
  };
  selectAccount(account.id);
  sizeIntro();
})();

/* ==== assets/wechat-screen-fit.js ==== */
(() => {
 const page=document.querySelector('#wechat');
 if(!page)return;
 const area=page.closest('.section-scroll-area');
 const collection=page.querySelector('.wechat-collection');
 const groups=[...page.querySelectorAll('#wechat-articles .wechat-group')];
 let category='event',view='collection';
 const controls=document.createElement('nav');
 controls.className='wc-screen-controls';controls.setAttribute('aria-label','WeChat reading views');
 controls.innerHTML='<div class="wc-category-views"><button type="button" data-wc-category="event" aria-pressed="true">Event Story</button><button type="button" data-wc-category="research" aria-pressed="false">Research Update</button></div><button class="wc-reading-back" type="button">← Back to selection</button>';
 page.querySelector('.wechat-heading-row').after(controls);
 const apply=()=>{
  const compact=page.classList.contains('wc-paged-page');
  page.classList.toggle('wc-focus-analysis',compact&&view==='analysis');
  controls.querySelector('.wc-category-views').hidden=!compact||view==='analysis';
  controls.querySelector('.wc-reading-back').hidden=!compact||view!=='analysis';
  groups.forEach((group,index)=>{group.hidden=document.documentElement.lang!=='zh'&&compact&&index!==(category==='event'?0:1);});
  controls.querySelectorAll('[data-wc-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.wcCategory===category)));
 };
 controls.querySelectorAll('[data-wc-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.wcCategory;view='collection';apply();}));
 controls.querySelector('.wc-reading-back').addEventListener('click',()=>{view='collection';apply();});
 page.addEventListener('click',event=>{
  if(event.target.closest('[data-wechat-sample]')){category=groups.indexOf(event.target.closest('.wechat-group'))===0?'event':'research';view='analysis';apply();}
 });
 const size=()=>{
  if(!area.clientHeight)return;
  page.style.setProperty('--wechat-screen-height',`${area.clientHeight}px`);
  page.classList.toggle('wc-paged-page',area.clientWidth<=900||area.clientHeight<650);
  apply();
 };
 const observer=new ResizeObserver(size);observer.observe(area);
 document.addEventListener('portfolio:sectionchange',event=>{if(event.detail.slide==='wechat')requestAnimationFrame(size);});
 document.addEventListener('portfolio:localechange',size);
 window.WeChatReaderLayout={
  show:next=>{view=next==='analysis'?'analysis':'collection';apply();},
  showArticle:button=>{category=groups.indexOf(button.closest('.wechat-group'))===0?'event':'research';view='analysis';apply();}
 };
 size();
})();

/* ==== assets/contact-page.js ==== */
(() => {
  const page = document.querySelector('.contact-page');
  if (!page) return;
  const views = page.querySelector('.contact-view-toggle');
  const buttons = [...views.querySelectorAll('[data-contact-view]')];
  const panels = [...page.querySelectorAll('[data-contact-panel]')];
  let selected = 'intro';
  function layout() {
    const paged = page.clientWidth <= 720 || page.clientHeight < 530;
    page.classList.toggle('contact-paged', paged);
    views.hidden = !paged;
    panels.forEach(panel => { panel.hidden = paged && panel.dataset.contactPanel !== selected; });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.contactView === selected)));
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.contactView;
    layout();
  }));
  const observer = new ResizeObserver(() => { if (!page.closest('.section-layer').hidden) layout(); });
  observer.observe(page);
  document.addEventListener('portfolio:sectionchange', event => { if (event.detail.id === 'contact') layout(); });
  addEventListener('pagehide', event => { if (!event.persisted) observer.disconnect(); });
})();

/* ==== assets/design-data.js ==== */
window.portfolioDesign = [
  {
    "id": "brochures",
    "title": "Brochures",
    "zh": "宣传册",
    "description": "",
    "descriptionZh": "",
    "projects": [
      {
        "id": "industrial-simulation-solutions",
        "title": "Industrial Simulation Solutions",
        "zh": "工业仿真行业解决方案",
        "company": "nsc",
        "images": [
          "assets/design/uploaded-20261013/brochures-20261013/industrial-simulation-solutions/page-001.webp",
          "assets/design/uploaded-20261013/brochures-20261013/industrial-simulation-solutions/page-002.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/industrial-simulation-solutions-01-thumb.webp",
          "assets/design/screen-previews-20261029/industrial-simulation-solutions-02-thumb.webp"
        ],
        "width": 2041,
        "height": 2863,
        "imageTitles": [
          "Page 1",
          "Page 2"
        ],
        "imageTitlesZh": [
          "第 1 页",
          "第 2 页"
        ],
        "source": "F:\\国家超级计算西安中心\\02工业仿真行业解决方案彩页-1202(2)_1.pdf",
        "pageCount": 2,
        "displayImages": [
          "assets/design/screen-previews-20261029/industrial-simulation-solutions-01-fit.webp",
          "assets/design/screen-previews-20261029/industrial-simulation-solutions-02-fit.webp"
        ]
      },
      {
        "id": "national-supercomputing-center-b2b",
        "title": "NSC Xi’an Brochure",
        "zh": "国家超级计算西安中心宣传册",
        "company": "nsc",
        "images": [
          "assets/design/uploaded-20261013/brochures-20261013/national-supercomputing-center-b2b/page-001.webp",
          "assets/design/uploaded-20261013/brochures-20261013/national-supercomputing-center-b2b/page-002.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/national-supercomputing-center-b2b-01-thumb.webp",
          "assets/design/screen-previews-20261029/national-supercomputing-center-b2b-02-thumb.webp"
        ],
        "width": 7937,
        "height": 2693,
        "imageTitles": [
          "Page 1",
          "Page 2"
        ],
        "imageTitlesZh": [
          "第 1 页",
          "第 2 页"
        ],
        "source": "C:\\Users\\wzb02\\Desktop\\Zibo_WAMG_Brochure of National Supercomputing Center in Xi'an_to B.pdf",
        "pageCount": 2,
        "displayImages": [
          "assets/design/screen-previews-20261029/national-supercomputing-center-b2b-01-fit.webp",
          "assets/design/screen-previews-20261029/national-supercomputing-center-b2b-02-fit.webp"
        ]
      },
      {
        "id": "nsc-annual-report",
        "title": "NSC Xi’an Annual Report",
        "zh": "国家超级计算西安中心年报",
        "company": "nsc",
        "images": [
          "assets/design/annual-report-20261029/page-001.webp",
          "assets/design/annual-report-20261029/page-002.webp",
          "assets/design/annual-report-20261029/page-003.webp",
          "assets/design/annual-report-20261029/page-004.webp",
          "assets/design/annual-report-20261029/page-005.webp",
          "assets/design/annual-report-20261029/page-006.webp",
          "assets/design/annual-report-20261029/page-007.webp",
          "assets/design/annual-report-20261029/page-008.webp",
          "assets/design/annual-report-20261029/page-009.webp",
          "assets/design/annual-report-20261029/page-010.webp",
          "assets/design/annual-report-20261029/page-011.webp",
          "assets/design/annual-report-20261029/page-012.webp",
          "assets/design/annual-report-20261029/page-013.webp",
          "assets/design/annual-report-20261029/page-014.webp",
          "assets/design/annual-report-20261029/page-015.webp",
          "assets/design/annual-report-20261029/page-016.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/nsc-annual-report-01-thumb.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-02-thumb.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-03-thumb.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-04-thumb.webp"
        ],
        "width": 4026,
        "height": 2750,
        "imageTitles": [
          "Page 1",
          "Page 2",
          "Page 3",
          "Page 4",
          "Page 5",
          "Page 6",
          "Page 7",
          "Page 8",
          "Page 9",
          "Page 10",
          "Page 11",
          "Page 12",
          "Page 13",
          "Page 14",
          "Page 15",
          "Page 16"
        ],
        "imageTitlesZh": [
          "第 1 页",
          "第 2 页",
          "第 3 页",
          "第 4 页",
          "第 5 页",
          "第 6 页",
          "第 7 页",
          "第 8 页",
          "第 9 页",
          "第 10 页",
          "第 11 页",
          "第 12 页",
          "第 13 页",
          "第 14 页",
          "第 15 页",
          "第 16 页"
        ],
        "pageCount": 16,
        "displayImages": [
          "assets/design/screen-previews-20261029/nsc-annual-report-01-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-02-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-03-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-04-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-05-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-06-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-07-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-08-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-09-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-10-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-11-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-12-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-13-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-14-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-15-fit.webp",
          "assets/design/screen-previews-20261029/nsc-annual-report-16-fit.webp"
        ]
      }
    ]
  },
  {
    "id": "posters",
    "title": "Posters",
    "zh": "海报",
    "description": "",
    "descriptionZh": "",
    "projects": [
      {
        "id": "scnet-platform",
        "title": "SCNet Computing Platform",
        "zh": "超算互联网平台宣传海报",
        "company": "nsc",
        "width": 9524,
        "height": 13470,
        "sources": [
          "F:/国家超级计算西安中心/超算单页最终版-足克157_01.png"
        ],
        "images": [
          "assets/design/uploaded-20261013/posters-20261013/scnet-platform-01-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/scnet-platform-01-thumb.webp"
        ],
        "imageTitles": [
          "SCNet Computing Platform"
        ],
        "imageTitlesZh": [
          "超算互联网平台宣传海报"
        ],
        "displayImages": [
          "assets/design/screen-previews-20261029/scnet-platform-01-fit.webp"
        ]
      },
      {
        "id": "labour-day-2026",
        "title": "Labour Day 2026",
        "zh": "五一劳动节海报",
        "company": "nsc",
        "width": 1023,
        "height": 1537,
        "sources": [
          "F:/国家超级计算西安中心/五一劳动节海报二稿.jpg"
        ],
        "images": [
          "assets/design/uploaded-20261013/posters-20261013/labour-day-2026-01-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/labour-day-2026-01-thumb.webp"
        ],
        "imageTitles": [
          "Labour Day 2026"
        ],
        "imageTitlesZh": [
          "五一劳动节海报"
        ],
        "displayImages": [
          "assets/design/uploaded-20261013/posters-20261013/labour-day-2026-01-preview.webp"
        ]
      },
      {
        "id": "innovation-voucher",
        "title": "Innovation Voucher Policy Briefing",
        "zh": "陕西省科技创新券政策宣讲会",
        "company": "nsc",
        "width": 800,
        "height": 2000,
        "sources": [
          "F:/国家超级计算西安中心/《陕西省科技创新券管理办法》政策宣讲会国家超算西安中心专场/《陕西省科技创新券管理办法》 政策宣讲会海报二稿.jpg",
          "F:/国家超级计算西安中心/《陕西省科技创新券管理办法》政策宣讲会国家超算西安中心专场/《陕西省科技创新券管理办法》 政策宣讲会主k.png"
        ],
        "images": [
          "assets/design/uploaded-20261013/posters-20261013/innovation-voucher-01-preview.webp",
          "assets/design/uploaded-20261013/posters-20261013/innovation-voucher-02-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/innovation-voucher-01-thumb.webp",
          "assets/design/screen-previews-20261029/innovation-voucher-02-thumb.webp"
        ],
        "imageTitles": [
          "Event poster",
          "Event key visual"
        ],
        "imageTitlesZh": [
          "政策宣讲会海报",
          "政策宣讲会主视觉"
        ],
        "displayImages": [
          "assets/design/screen-previews-20261029/innovation-voucher-01-fit.webp",
          "assets/design/uploaded-20261013/posters-20261013/innovation-voucher-02-preview.webp"
        ]
      }
    ]
  },
  {
    "id": "social",
    "title": "Social content",
    "zh": "新媒体内容",
    "description": "",
    "descriptionZh": "",
    "projects": [
      {
        "id": "social-cover-templates",
        "title": "Cover Templates",
        "zh": "封面模板",
        "company": "nowcoder",
        "width": 1242,
        "height": 1660,
        "images": [
          "assets/design/uploaded-20261013/social-20261013/university-choice-cover-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/internship-return-offer-cover-01-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/social-cover-templates-01-thumb.webp",
          "assets/design/screen-previews-20261029/social-cover-templates-02-thumb.webp"
        ],
        "imageTitles": [
          "University Application Advice Cover",
          "Summer Internship Return Offer Cover"
        ],
        "imageTitlesZh": [
          "填志愿必看封面",
          "暑期实习转正分享封面"
        ],
        "sources": [
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-f2b6b48f-5cb8-4959-ae49-008db0f23c65.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-92ae29af-6a6b-41f9-9fba-3beee66e444c.jpg"
        ],
        "displayImages": [
          "assets/design/uploaded-20261013/social-20261013/university-choice-cover-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/internship-return-offer-cover-01-preview.webp"
        ]
      },
      {
        "id": "social-opening-templates",
        "title": "Opening Page Templates",
        "zh": "首图模板",
        "company": "nowcoder",
        "width": 1242,
        "height": 1660,
        "images": [
          "assets/design/uploaded-20261013/social-20261013/campus-onboarding-cover-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/part-time-pay-template-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/international-student-timeline-01-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/social-opening-templates-01-thumb.webp",
          "assets/design/screen-previews-20261029/social-opening-templates-02-thumb.webp",
          "assets/design/screen-previews-20261029/social-opening-templates-03-thumb.webp"
        ],
        "imageTitles": [
          "Campus Recruitment Onboarding Guide",
          "Student Part-Time Pay Comparison",
          "International Student Job Search Timeline"
        ],
        "imageTitlesZh": [
          "关于校招入职那些事",
          "大学生兼职时薪清单",
          "留学生求职时间线"
        ],
        "sources": [
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-ddadfbd4-bf14-4e67-a285-b35f26585e52.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-be3b8fc1-b45c-4216-bb9d-fc810f3153b2.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-41c88c1a-11d0-4eca-bdda-32a9f6491b80.jpg"
        ],
        "displayImages": [
          "assets/design/uploaded-20261013/social-20261013/campus-onboarding-cover-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/part-time-pay-template-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/international-student-timeline-01-preview.webp"
        ]
      },
      {
        "id": "java-interview-cards",
        "title": "Interview Experience Sharing Templates",
        "zh": "面试经验分享模板",
        "company": "nowcoder",
        "width": 1242,
        "height": 1660,
        "sources": [
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-82ced6a5-4d41-4ee4-b603-c394305c560f.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-f1fa8587-b410-4340-814d-2695014a5e33.jpg"
        ],
        "images": [
          "assets/design/uploaded-20261013/social-20261013/java-interview-cards-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/java-interview-cards-02-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/java-interview-cards-01-thumb.webp",
          "assets/design/screen-previews-20261029/java-interview-cards-02-thumb.webp"
        ],
        "imageTitles": [
          "Java Interview Questions",
          "Interview Resource Closing Card"
        ],
        "imageTitlesZh": [
          "Java 面试题内页模板",
          "牛客面试题库尾图"
        ],
        "displayImages": [
          "assets/design/uploaded-20261013/social-20261013/java-interview-cards-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/java-interview-cards-02-preview.webp"
        ]
      },
      {
        "id": "social-closing-templates",
        "title": "Closing Cards for Resource Access",
        "zh": "引流尾图模板",
        "company": "nowcoder",
        "width": 1242,
        "height": 1660,
        "images": [
          "assets/design/uploaded-20261013/social-20261013/interview-bank-closing-card-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/app-interview-closing-card-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/learning-resources-closing-card-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/campus-resources-closing-card-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/recruitment-whitepaper-closing-card-01-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/social-closing-templates-01-thumb.webp",
          "assets/design/screen-previews-20261029/social-closing-templates-02-thumb.webp",
          "assets/design/screen-previews-20261029/social-closing-templates-03-thumb.webp",
          "assets/design/screen-previews-20261029/social-closing-templates-04-thumb.webp"
        ],
        "imageTitles": [
          "Interview Question Bank Closing Card",
          "Nowcoder App Interview Resources Closing Card",
          "Free Learning Resources Closing Card",
          "2025 Graduate Recruitment Resources Closing Card",
          "2024 Spring Campus Recruitment White Paper Closing Card"
        ],
        "imageTitlesZh": [
          "免费获取海量面试题尾图",
          "牛客 App 面经资源尾图",
          "免费学习教程尾图",
          "25 届校招资料尾图",
          "牛客 2024 春季校园招聘白皮书尾图"
        ],
        "sources": [
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-a50292fd-6364-43d6-bb45-4a284813b9e3.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-99032126-9736-4e6d-a22f-7e252e512d7f.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-21526e26-ea3f-48e9-9927-59743e8d907e.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-89be2375-b555-4335-aae9-aa0042e9d532.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-0d9a46a1-790c-4812-8fc9-b2d0f6159a32.jpg"
        ],
        "displayImages": [
          "assets/design/uploaded-20261013/social-20261013/interview-bank-closing-card-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/app-interview-closing-card-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/learning-resources-closing-card-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/campus-resources-closing-card-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/recruitment-whitepaper-closing-card-01-preview.webp"
        ]
      },
      {
        "id": "ai-product-interview-templates",
        "title": "AI Product Interview Templates",
        "zh": "AI 产品面经模板系列",
        "company": "nowcoder",
        "width": 1242,
        "height": 1660,
        "sources": [
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-bd747fd4-0082-408a-aeae-3268cebc2ddb.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-d216e533-7dd9-49d6-9b35-c918dd8dfe60.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-a1b181e7-07df-464e-8331-111720be24d3.jpg"
        ],
        "images": [
          "assets/design/uploaded-20261013/social-20261013/ai-product-interview-templates-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/ai-product-interview-templates-02-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/ai-product-interview-templates-03-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/ai-product-interview-templates-01-thumb.webp",
          "assets/design/screen-previews-20261029/ai-product-interview-templates-02-thumb.webp",
          "assets/design/screen-previews-20261029/ai-product-interview-templates-03-thumb.webp"
        ],
        "imageTitles": [
          "MiniMax Hailuo AI Interview Template",
          "Baidu ERNIE AI Interview Template",
          "NIO AI Product Interview Template"
        ],
        "imageTitlesZh": [
          "MiniMax 海螺 AI 产品面经模板",
          "百度文心一言 AI 产品面经模板",
          "蔚来 AI 产品经理面经模板"
        ],
        "displayImages": [
          "assets/design/uploaded-20261013/social-20261013/ai-product-interview-templates-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/ai-product-interview-templates-02-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/ai-product-interview-templates-03-preview.webp"
        ]
      },
      {
        "id": "graduate-salary-cover-templates",
        "title": "Graduate Salary Cover Templates",
        "zh": "24 届校招薪资首图模板系列",
        "company": "nowcoder",
        "width": 1242,
        "height": 1660,
        "sources": [
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-1403d177-99cd-4bf4-98c8-543958613bc7.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-34b15279-fc18-4aac-abb3-d7b4337954c3.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-f1cf0508-470d-40fa-bc22-31e01ca03343.jpg"
        ],
        "images": [
          "assets/design/uploaded-20261013/social-20261013/graduate-salary-cover-templates-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/graduate-salary-cover-templates-02-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/graduate-salary-cover-templates-03-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/graduate-salary-cover-templates-01-thumb.webp",
          "assets/design/screen-previews-20261029/graduate-salary-cover-templates-02-thumb.webp",
          "assets/design/screen-previews-20261029/graduate-salary-cover-templates-03-thumb.webp"
        ],
        "imageTitles": [
          "Huawei Graduate Salary Cover",
          "Xiaomi Graduate Salary Cover",
          "Baidu Graduate Salary Cover"
        ],
        "imageTitlesZh": [
          "华为 24 届校招薪资首图模板",
          "小米 24 届校招薪资首图模板",
          "百度 24 届校招薪资首图模板"
        ],
        "displayImages": [
          "assets/design/uploaded-20261013/social-20261013/graduate-salary-cover-templates-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/graduate-salary-cover-templates-02-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/graduate-salary-cover-templates-03-preview.webp"
        ]
      },
      {
        "id": "employer-recruitment-cover-templates",
        "title": "Employer Recruitment Cover Templates",
        "zh": "企业校招首图模板系列",
        "company": "nowcoder",
        "width": 1242,
        "height": 1660,
        "sources": [
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-f70e5128-f95c-4971-b7be-0b34a0dd5f58.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-65db6cee-8d7e-4ece-aa27-3f848a30ed2b.jpg",
          "C:/Users/wzb02/AppData/Local/Temp/codex-clipboard-af2aa6fd-1c51-4fa7-958f-3b506ecee346.jpg"
        ],
        "images": [
          "assets/design/uploaded-20261013/social-20261013/employer-recruitment-cover-templates-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/employer-recruitment-cover-templates-02-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/employer-recruitment-cover-templates-03-preview.webp"
        ],
        "thumbnails": [
          "assets/design/screen-previews-20261029/employer-recruitment-cover-templates-01-thumb.webp",
          "assets/design/screen-previews-20261029/employer-recruitment-cover-templates-02-thumb.webp",
          "assets/design/screen-previews-20261029/employer-recruitment-cover-templates-03-thumb.webp"
        ],
        "imageTitles": [
          "DiDi Recruitment Cover",
          "NovaStar Recruitment Cover",
          "Xiaomi Recruitment Cover"
        ],
        "imageTitlesZh": [
          "滴滴招聘首图模板",
          "诺瓦星云招聘首图模板",
          "小米招聘首图模板"
        ],
        "displayImages": [
          "assets/design/uploaded-20261013/social-20261013/employer-recruitment-cover-templates-01-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/employer-recruitment-cover-templates-02-preview.webp",
          "assets/design/uploaded-20261013/social-20261013/employer-recruitment-cover-templates-03-preview.webp"
        ]
      }
    ]
  }
];

/* ==== assets/design-page.js ==== */
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

/* ==== assets/skills-bag.js ==== */
(() => {
 const page=document.querySelector('#skills'),stage=page?.querySelector('.skills-object-stage');
 if(!stage)return;
 const scene=stage.querySelector('.skills-object-scene'),panel=stage.querySelector('.skills-object-popover'),hits=[...scene.querySelectorAll('[data-object]')];
 const skills={
  ai:{en:'AI VibeCoding',zh:'AI VibeCoding',items:['Website design','AI product design','Codex • Claude • DeepSeek Harness'],itemsZh:['网页设计','AI产品设计','Codex • Claude • DeepSeek Harness'],side:'right'},
  content:{en:'CONTENT OPERATIONS',zh:'内容运营',items:['Brand storytelling','Editorial planning','Social media content'],itemsZh:['品牌叙事','内容策划','社媒内容'],side:'left'},
  design:{en:'DESIGN',zh:'图文设计',items:['Visual communication','Gaoding Design','Canva'],itemsZh:['视觉传达','稿定设计','Canva'],side:'left'},
  language:{en:'LANGUAGES',zh:'语言技能',items:['English: TEM-8','Mandarin: Native'],itemsZh:['英语（专业八级）','普通话（母语）'],side:'right'},
  office:{en:'OFFICE',zh:'日常办公',items:['Microsoft Office','WPS'],itemsZh:['Microsoft Office','WPS'],side:'right'},
  social:{en:'SOCIAL MEDIA & BRAND PROMOTION',zh:'社媒运营与品牌宣传',items:['WeChat official account operations','RedNote operations','Brand promotion','Event planning'],itemsZh:['公众号运营','小红书运营','品牌推广','活动策划'],side:'right'},
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

/* ==== assets/portfolio-motion.js ==== */
(() => {
 const gsap=window.gsap,viewport=document.querySelector('.section-viewport');
 if(!gsap||!viewport)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),owned=new Map();
 let entrance=null,galleryObserver=null,entryFrame=0;
 const activeSlide=()=>viewport.dataset.activeWorkSlide||viewport.dataset.activeSection;
 const visible=node=>node?.isConnected&&!node.closest('[hidden]');
 function finish(tween){if(tween)tween.progress(1).kill();}
 function stop(){finish(entrance);entrance=null;owned.forEach(finish);owned.clear();galleryObserver?.disconnect();galleryObserver=null;cancelAnimationFrame(entryFrame);}
 function one(node,from,to){
  if(!node||reduced.matches||document.hidden||!visible(node)||(window.portfolioScreenMotion===false&&node.matches('dialog')))return;
  finish(owned.get(node));
  const tween=gsap.fromTo(node,from,{...to,onComplete:()=>owned.delete(node)});
  owned.set(node,tween);
 }
 function draw(timeline,paths,at){
  paths.forEach(path=>{
   const length=path.getTotalLength();
   if(length)timeline.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:.65,ease:'power2.inOut',clearProps:'strokeDasharray,strokeDashoffset'},at);
  });
 }
 function projectCards(){
  if(activeSlide()!=='design'||reduced.matches||window.portfolioScreenMotion===false)return;
  const grid=document.querySelector('.dp-album-grid');
  if(!grid)return;
  finish(owned.get(grid));
  const cards=[...grid.children];
  const timeline=gsap.timeline({defaults:{ease:'power3.out'},onComplete:()=>owned.delete(grid)});
  cards.forEach((card,index)=>{
   const at=index*.07;
   timeline.fromTo(card.querySelector('.dp-project-media'),{opacity:.3,scale:.975},{opacity:1,scale:1,duration:.48,clearProps:'opacity,transform'},at)
    .fromTo(card.querySelector('.dp-project-brand'),{opacity:0},{opacity:1,duration:.24,clearProps:'opacity'},at+.16)
    .fromTo(card.querySelectorAll('.dp-project-caption,.dp-open-project'),{opacity:0,y:5},{opacity:1,y:0,duration:.3,stagger:.04,clearProps:'opacity,transform'},at+.2);
  });
  owned.set(grid,timeline);
 }
 function gallery(){
  const root=document.querySelector('.rn-wall-scroll');
  if(!root)return;
  galleryObserver?.disconnect();
  // Opacity leaves measured masonry heights and all stable hit areas untouched.
  galleryObserver=new IntersectionObserver(entries=>{
   if(!galleryObserver||activeSlide()!=='rednote-notes')return;
   entries.filter(entry=>entry.isIntersecting).forEach((entry,index)=>{
    galleryObserver.unobserve(entry.target);
    one(entry.target,{opacity:.35},{opacity:1,duration:.38,delay:Math.min(index,5)*.04,ease:'power2.out',clearProps:'opacity'});
   });
  },{root,threshold:.12});
  root.querySelectorAll('.rn-wall-card').forEach(card=>galleryObserver.observe(card));
 }
 function enter(slide){
  stop();if(reduced.matches||document.hidden||window.portfolioScreenMotion===false)return;
  const layer=viewport.querySelector(`[data-section="${slide}"]`);
  if(!layer||layer.hidden)return;
  // Hero, About, Work and WeChat retain their own animation owners.
  if(slide==='rednote'){
   entrance=gsap.timeline({defaults:{ease:'power3.out'}});
   if(document.documentElement.lang!=='zh')entrance.fromTo(layer.querySelector('.rn-title'),{opacity:.4,x:-10},{opacity:1,x:0,duration:.42,clearProps:'opacity,transform'},.1);
   entrance.fromTo(layer.querySelectorAll('.rn-account-heading,.rn-featured-heading'),{opacity:0},{opacity:1,duration:.36,stagger:.07,clearProps:'opacity'},.22);
   const visual=layer.querySelector('.rn-profile-shot');
   if(visual)entrance.fromTo(visual,{scale:.975},{scale:1,duration:.65,clearProps:'transform'},.2);
  }else if(slide==='rednote-notes')gallery();
  else if(slide==='design')projectCards();
  else if(slide==='skills'){
   entrance=gsap.timeline({defaults:{ease:'power3.out'}})
    .fromTo(layer.querySelector('.skills-object-scene'),{opacity:.45,y:12,scale:.985},{opacity:1,y:0,scale:1,duration:.65,clearProps:'opacity,transform'},.12)
    .fromTo(layer.querySelector('.skills-scene-decor'),{opacity:0},{opacity:1,duration:.65,clearProps:'opacity'},.28);
   draw(entrance,[...layer.querySelectorAll('.skills-unpack-hint path')],.4);
  }else if(slide==='contact'){
   entrance=gsap.timeline({defaults:{ease:'power3.out'}});
   const card=layer.querySelector('.contact-details');
   if(visible(card))entrance.fromTo(card,{opacity:.35,rotation:-1.2,scale:.975},{opacity:1,rotation:0,scale:1,duration:.65,clearProps:'opacity,transform'},.12);
   const heading=layer.querySelector('.contact-handline');
   if(visible(heading))entrance.fromTo(heading,{opacity:0,x:-8},{opacity:1,x:0,duration:.42,clearProps:'opacity,transform'},.18);
   draw(entrance,[...layer.querySelectorAll('.contact-underline path')],.32);
   const channels=[...layer.querySelectorAll('.contact-channel')].filter(visible);
   if(channels.length)entrance.fromTo(channels,{opacity:0},{opacity:1,duration:.35,stagger:.065,clearProps:'opacity'},.36);
  }
 }
 function section(event){cancelAnimationFrame(entryFrame);entryFrame=requestAnimationFrame(()=>enter(event.detail.slide||event.detail.id));}
 function interaction(event){
  if(reduced.matches||window.portfolioScreenMotion===false)return;
  const button=event.target.closest('[data-contact-view],[data-rn-view],[data-select-note],[data-note-detail-choice]');
  if(!button)return;
  requestAnimationFrame(()=>{
   const page=button.closest('.contact-page,.rn-page');
   const selector=button.matches('[data-contact-view]')?'[data-contact-panel]:not([hidden])':'.rn-case:not([hidden]) .rn-case-copy';
   page?.querySelectorAll(selector).forEach(node=>one(node,{opacity:.5},{opacity:1,duration:.3,ease:'power2.out',clearProps:'opacity'}));
  });
 }
 const popupSelector='.skills-object-popover,.rn-gallery-tooltip,.thinking-detail,.dp-viewer,.rn-preview';
 const popupObserver=new MutationObserver(records=>{
  const targets=new Set(records.map(record=>record.target).filter(node=>node.matches?.(popupSelector)));
  targets.forEach(node=>{
   const open=node.matches('dialog')?node.open:!node.hidden;
   if(!open){finish(owned.get(node));owned.delete(node);return;}
   const modal=node.matches('dialog');
   one(node,{opacity:.35,scale:modal?.975:.985},{opacity:1,scale:1,duration:modal?.32:.2,ease:'power3.out',clearProps:'opacity,transform'});
  });
 });
 popupObserver.observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden','open']});
 document.addEventListener('portfolio:sectionchange',section);
 document.addEventListener('portfolio:albumchange',projectCards);
 document.addEventListener('click',interaction);
 reduced.addEventListener('change',stop);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 // End the whole-scene Skills entrance before its independent hover interaction.
 document.querySelector('.skills-packed-contents')?.addEventListener('pointerover',()=>finish(entrance));
 requestAnimationFrame(()=>enter(activeSlide()));
 addEventListener('pagehide',event=>{
  if(event.persisted){stop();return;}
  stop();popupObserver.disconnect();document.removeEventListener('portfolio:sectionchange',section);document.removeEventListener('portfolio:albumchange',projectCards);document.removeEventListener('click',interaction);
 });
})();

/* ==== assets/portfolio-zh-header.js ==== */
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

/* ==== assets/portfolio-zh-headings.js ==== */
/* Static Chinese primary headings, with captions reserved in normal flow. */
(() => {
  const viewport=document.querySelector('.section-viewport');
  if(!viewport)return;
  const headings=[
    ['about','#about-title','#about-title',null],
    ['work','#work-landing-title','#work-landing-title'],
    ['wechat','.wechat-heading-row','#wechat-title','.wechat-subtitle'],
    ['rednote','#rednote-title','#rednote-title','.rn-subtitle'],
    ['rednote-notes','.rn-gallery-header','#rn-gallery-title','.rn-gallery-description'],
    ['design','.dp-heading','#design-title','.dp-intro'],
    ['skills','.skills-head','#skills-title']
  ].map(([id,blockSelector,titleSelector,captionSelector])=>({
    id,layer:document.querySelector('.section-layer[data-section="'+id+'"]'),
    block:document.querySelector(blockSelector),title:document.querySelector(titleSelector),
    caption:captionSelector?document.querySelector('#'+id+' '+captionSelector):null
  })).filter(item=>item.layer&&item.block&&item.title);
  const properties=['--zh-heading-base-top','--zh-heading-base-left','--zh-heading-shift-top','--zh-heading-shift-left'];
  let frame=0;
  // offset geometry excludes GSAP's temporary entry transforms and scroll.
  function layoutPoint(element) {
    let x=0,y=0;
    for(let node=element;node;node=node.offsetParent) {x+=node.offsetLeft;y+=node.offsetTop;}
    return {x,y};
  }
  function reset(item) {
    item.block.removeAttribute('data-zh-heading-align');
    properties.forEach(name=>item.block.style.removeProperty(name));
    if(item.caption) {
      item.caption.removeAttribute('data-zh-caption-align');
      ['--zh-caption-base-top','--zh-caption-base-left','--zh-caption-shift-top','--zh-caption-shift-left'].forEach(name=>item.caption.style.removeProperty(name));
    }
  }
  function align() {
    frame=0;
    const videoLogic=document.querySelector('#wechat .wechat-logic');
    if(videoLogic){
      videoLogic.removeAttribute('data-wv-subtitle-align');
      videoLogic.style.removeProperty('--wv-logic-offset');
    }
    if(document.documentElement.lang!=='zh') {headings.forEach(reset);return;}
    const active=viewport.dataset.activeWorkSlide||viewport.dataset.activeSection;
    const item=headings.find(item=>item.id===active&&!item.layer.hidden);
    if(!item||!item.title.getClientRects().length)return;
    // Read native margins, then reserve offsets in flow before the page paints.
    reset(item);
    const base=getComputedStyle(item.block);
    const top=parseFloat(base.marginTop)||0,left=parseFloat(base.marginLeft)||0;
    item.block.style.setProperty('--zh-heading-base-top',top+'px');
    item.block.style.setProperty('--zh-heading-base-left',left+'px');
    item.block.dataset.zhHeadingAlign='true';
    const rules=getComputedStyle(item.block);
    const read=name=>parseFloat(rules.getPropertyValue(name))||0;
    const targetX=read('--zh-reference-padding-x');
    const header=item.layer.querySelector(':scope > .zh-page-header');
    const headerFloor=header?header.offsetTop+header.offsetHeight+24:0;
    const targetY=Math.max(headerFloor,read('--zh-reference-padding-top')+read('--zh-reference-utility-height')+read('--zh-reference-heading-gap')+read('--zh-reference-heading-lift'));
    const origin=layoutPoint(item.layer);
    let x=0,y=0;
    // A flex parent's shrink allocation may change after the first reservation.
    for(let pass=0;pass<2;pass++) {
      const point=layoutPoint(item.title);
      x+=targetX-(point.x-origin.x);y+=targetY-(point.y-origin.y);
      item.block.style.setProperty('--zh-heading-shift-left',x+'px');
      item.block.style.setProperty('--zh-heading-shift-top',y+'px');
    }
    if(item.caption&&!item.caption.closest('[hidden]')) {
      const caption=item.caption,base=getComputedStyle(caption);
      caption.style.setProperty('--zh-caption-base-top',(parseFloat(base.marginTop)||0)+'px');
      caption.style.setProperty('--zh-caption-base-left',(parseFloat(base.marginLeft)||0)+'px');
      caption.dataset.zhCaptionAlign='true';
      const point=layoutPoint(caption),title=layoutPoint(item.title);
      caption.style.setProperty('--zh-caption-shift-left',(title.x-point.x)+'px');
      caption.style.setProperty('--zh-caption-shift-top',Math.max(0,title.y+item.title.offsetHeight+10-point.y)+'px');
    }
    // Align the article/video strategy title with the left subtitle.
    // Padding moves its content group in flow, preserving the column's bottom edge.
    const wechatPage=document.getElementById('wechat');
    if(active==='wechat'&&wechatPage&&videoLogic&&item.caption&&
       getComputedStyle(wechatPage.querySelector('.wechat-content-grid')).display==='contents') {
      const title=videoLogic.querySelector('.wechat-logic-title');
      if(title){
        const offset=Math.max(0,layoutPoint(item.caption).y-layoutPoint(title).y);
        videoLogic.style.setProperty('--wv-logic-offset',offset+'px');
        videoLogic.dataset.wvSubtitleAlign='true';
      }
    }
  }
  function schedule() {cancelAnimationFrame(frame);frame=requestAnimationFrame(align);}
  const resize=new ResizeObserver(schedule);
  resize.observe(viewport);
  // Existing readers can switch compact modes in their own resize callback.
  // Align after that class change, before the browser paints the new mode.
  const readerLayout=new MutationObserver(align);
  ['wechat','rednote'].forEach(id=>{
    const page=document.getElementById(id);
    if(page)readerLayout.observe(page,{attributes:true,attributeFilter:['class']});
  });
  // Section visibility is set before this event; align synchronously to avoid
  // showing the old coordinates for one animation frame.
  document.addEventListener('portfolio:sectionchange',align);
  document.addEventListener('portfolio:localechange',schedule);
  document.addEventListener('DOMContentLoaded',schedule,{once:true});
  document.fonts?.ready.then(schedule);
  document.fonts?.addEventListener('loadingdone',schedule);
  addEventListener('pagehide',event=>{
    if(event.persisted)return;
    cancelAnimationFrame(frame);resize.disconnect();readerLayout.disconnect();
    document.fonts?.removeEventListener('loadingdone',schedule);
  });
  align();
})();

/* ==== assets/rednote-zh-media.js ==== */
/* Fit complete covers to the available case height, with room for metrics. */
(() => {
  const bodies=[...document.querySelectorAll('#rednote .rn-case-main')];
  if(!bodies.length)return;
  let frame=0;
  function fit() {
    frame=0;
    const zh=document.documentElement.lang==='zh';
    const sizes=bodies.map(body=>{
      if(!zh||!body.clientWidth||!body.clientHeight)return {body,width:null};
      const button=body.querySelector('.rn-cover-button');
      const metrics=body.querySelector('.rn-case-metrics');
      const parts=(button?.style.aspectRatio||'3 / 4').split('/').map(Number);
      const ratio=parts.length===2?parts[0]/parts[1]:parts[0];
      const metricHeight=Math.max(18,metrics?.offsetHeight||0);
      const width=Math.min(body.clientWidth*.40,(body.clientHeight-metricHeight-10)*ratio);
      return {body,width:Number.isFinite(width)&&width>0?Math.floor(width):null};
    });
    sizes.forEach(({body,width})=>{
      if(width===null)body.style.removeProperty('--rn-zh-cover-width');
      else body.style.setProperty('--rn-zh-cover-width',width+'px');
    });
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(fit);};
  const resize=new ResizeObserver(schedule);
  bodies.forEach(body=>resize.observe(body));
  document.addEventListener('portfolio:localechange',schedule);
  document.addEventListener('portfolio:sectionchange',schedule);
  document.fonts?.ready.then(schedule);
  addEventListener('pagehide',event=>{if(!event.persisted){resize.disconnect();cancelAnimationFrame(frame);}});
  schedule();
})();

/* ==== assets/portfolio-position-refinements.js ==== */
/* Position the contact title group using each locale's existing title rhythm. */
(() => {
  const viewport=document.querySelector('.section-viewport');
  const page=document.getElementById('contact');
  const layer=page?.closest('.section-layer');
  const heading=page?.querySelector('.contact-heading');
  const title=document.getElementById('contact-title');
  if(!viewport||!heading||!title)return;
  let frame=0;
  const point=element=>{
    let y=0;
    for(let node=element;node;node=node.offsetParent)y+=node.offsetTop;
    return y;
  };
  const number=value=>parseFloat(value)||0;
  function englishOrigin() {
    const reference=document.getElementById('wechat');
    const style=getComputedStyle(reference);
    const row=reference.querySelector('.wechat-heading-row');
    const utility=reference.querySelector('.work-utility');
    const rowStyle=getComputedStyle(row);
    const utilityStyle=getComputedStyle(utility);
    if(style.display==='grid')return number(style.paddingTop)+number(style.gridTemplateRows)+number(style.rowGap)+number(rowStyle.marginTop);
    return number(style.paddingTop)+number(utilityStyle.minHeight)+number(rowStyle.marginTop)+(style.display==='flex'?number(style.rowGap):0);
  }
  function align() {
    frame=0;
    heading.style.removeProperty('--contact-heading-shift');
    if(layer.hidden||heading.closest('[hidden]'))return;
    const header=layer.querySelector(':scope > .zh-page-header');
    const floor=header?header.offsetTop+header.offsetHeight+24:0;
    const reference=document.documentElement.lang==='zh'
      ?number(getComputedStyle(page).getPropertyValue('--contact-zh-title-origin'))
      :englishOrigin();
    const current=point(title)-point(layer);
    heading.style.setProperty('--contact-heading-shift',Math.max(0,Math.max(reference,floor)-current)+'px');
  }
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(align);};
  const resize=new ResizeObserver(schedule);resize.observe(viewport);
  const modes=new MutationObserver(schedule);modes.observe(page,{attributes:true,attributeFilter:['class']});
  document.addEventListener('portfolio:sectionchange',align);
  document.addEventListener('portfolio:localechange',schedule);
  document.fonts?.ready.then(schedule);
  document.fonts?.addEventListener('loadingdone',schedule);
  addEventListener('pagehide',event=>{
    if(event.persisted)return;
    cancelAnimationFrame(frame);resize.disconnect();modes.disconnect();
    document.fonts?.removeEventListener('loadingdone',schedule);
  });
  align();
})();

/* ==== assets/content-reading-flow.js ==== */
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
  function resetWechat(){
    window.WeChatPage.reset();
    window.WeChatReaderLayout?.show(compact()?'analysis':'collection');
    resetScroll(wechat);
  }
  function advanceWechat(direction){
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
    if(direction>0)return index<articles.length-1?openArticle(index+1):false;
    if(index>0)return openArticle(index-1,true);
    resetWechat();return true;
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
      if(!wechat.querySelector('[data-wechat-sample][aria-pressed="true"]'))return false;
      return move([
        wechat.querySelector('.wc-strategy-body'),
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
