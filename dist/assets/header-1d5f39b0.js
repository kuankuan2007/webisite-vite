import{_ as e,a as t,D as o,a6 as n,K as a,L as l,u as i,o as s,b as r,t as d,r as c,e as u,d as m,w as h,F as g,N as f,a1 as p,n as v,a4 as w,p as S,f as b,v as y,a7 as k}from"./all-0629bb55.js";let I=localStorage.setItem.bind(localStorage),E=localStorage.getItem.bind(localStorage);localStorage.setItem=function(e,t){let o=new Event("localStorageSetItemEvent");o.oldValue=E(e),o.newValue=t,o.key=e,I(...arguments),window.dispatchEvent(o)},localStorage.getItem=function(e){let t=new Event("localStorageGetItemEvent"),o=E(...arguments);return t.value=o,t.key=e,E(this,...arguments),window.dispatchEvent(t),o};let C=sessionStorage.setItem.bind(sessionStorage),j=sessionStorage.getItem.bind(sessionStorage);sessionStorage.setItem=function(e,t){let o=new Event("sessionStorageSetItemEvent");o.oldValue=j(e),o.newValue=t,o.key=e,C(...arguments),window.dispatchEvent(o)},sessionStorage.getItem=function(e){let t=new Event("sessionStorageGetItemEvent"),o=j(...arguments);return t.value=o,t.key=e,j(this,...arguments),window.dispatchEvent(t),o},window.passContextmenuEvent=null,window.addEventListener("contextmenu",(e=>{window.passContextmenuEvent&&e.target==window.passContextmenuEvent&&(window.passContextmenuEvent=null)}));const x={id:"user"},_=e({__name:"userBox",props:{jump:{type:String,required:!1,default:""},toLogin:{type:Boolean,required:!1,default:!1},needInfo:{type:Boolean,required:!1,default:!1}},setup(e){const c=e;let u=t(""),m=t(!1);function h(){location.href=`/login/?from=${encodeURI(location.href)}`}function g(){location.href="/user/"}return c.needInfo?o().then((e=>{e&&c.jump&&(location.href=c.jump),c.toLogin&&!e&&(location.href=`/login/?from=${encodeURI(location.href)}`),u.value=e.name,m.value=!0,e.state=!0,sessionStorage.setItem("userinfo",e)}),(e=>{c.toLogin&&(location.href=`/login/?from=${encodeURI(location.href)}`),sessionStorage.setItem("userinfo",JSON.stringify({state:!1}))})):n().then((e=>{e&&c.jump&&(location.href=c.jump),c.toLogin&&!e&&(location.href=`/login/?from=${encodeURI(location.href)}`),u.value=e,m.value=!0,sessionStorage.setItem("username",e)}),(e=>{c.toLogin&&(location.href=`/login/?from=${encodeURI(location.href)}`),sessionStorage.setItem("username","")})),(e,t)=>a((s(),r("div",x,[""===i(u)?(s(),r("p",{key:0,class:"login",onClick:h},"登录")):(s(),r("p",{key:1,class:"user",onClick:g},d(i(u)),1))],512)),[[l,i(m)]])}},[["__scopeId","data-v-22074579"]]);let L={light:"OS",color:"full",opacity:"blur",roundedBorder:"normal"},N={},B=c(N),O=matchMedia("(prefers-color-scheme: dark)");function G(){N=Object.assign({},L,JSON.parse(localStorage.getItem("theme")||"{}"));for(let t in N)B[t]=N[t];"OS"===N.light?(N.light=O.matches?L.light="dark":L.light="light",O.addEventListener("change",G)):O.removeEventListener("change",G);for(let t in N)document.documentElement.dataset[`theme${t.slice(0,1).toUpperCase()+t.slice(1)}`]=N[t];sessionStorage.setItem("theme",JSON.stringify(N));let e=new Event("themeRefresh");e.value=N,window.dispatchEvent(e)}G(),window.addEventListener("localStorageSetItemEvent",(e=>{"theme"===e.key&&G()})),window.addEventListener("storage",(function(e){"theme"===e.key&&G()}));const q=(e=>(S("data-v-2043335b"),e=e(),b(),e))((()=>u("h3",null,"主题选择",-1))),P={class:"mainList"},R=["onClick"],U={class:"valuename"},$=["src"],z=e({__name:"themesChoice",setup(e){function o(e){return new URL(Object.assign({"../image/themeShower/color-full.svg":"/assets/color-full-49e4e9dc.svg","../image/themeShower/color-simple.svg":"/assets/color-simple-ad6ed1e3.svg","../image/themeShower/light-OS.svg":"/assets/light-OS-d2fc8291.svg","../image/themeShower/light-dark.svg":"/assets/light-dark-fa5c789a.svg","../image/themeShower/light-light.svg":"/assets/light-light-30b21724.svg","../image/themeShower/opacity-blur.svg":"/assets/opacity-blur-85541377.svg","../image/themeShower/opacity-false.svg":"/assets/opacity-false-4c92e716.svg","../image/themeShower/opacity-true.svg":"/assets/opacity-true-c4a7d8da.svg","../image/themeShower/roundedBorder-full.svg":"/assets/roundedBorder-full-b6af5a4b.svg","../image/themeShower/roundedBorder-none.svg":"/assets/roundedBorder-none-0b1931ec.svg","../image/themeShower/roundedBorder-normal.svg":"/assets/light-light-30b21724.svg"})[`../image/themeShower/${e}.svg`],self.location).pathname}let n=t(null);function a(){n.value.showModal()}function l(){n.value.close()}let c={light:{light:"亮色",dark:"暗色",OS:"跟随系统"},color:{simple:"简约",full:"多彩"},opacity:{true:"半透明",false:"不透明",blur:"背景模糊"},roundedBorder:{full:"圆润",normal:"正常",none:"直角"}};return(e,t)=>(s(),r(g,null,[u("p",{class:"button demo-icon",onClick:a},""),m(w,{class:"dialog",ref_key:"themesChoicer",ref:n,a:"1",b:"2"},{default:h((()=>[q,u("div",null,[u("ul",P,[(s(!0),r(g,null,f(i(c),((e,t)=>(s(),r("li",null,[u("ul",{class:"line",style:p(`grid-template-columns: repeat(${Object.getOwnPropertyNames(e).length},minmax(0px,1fr));`)},[(s(!0),r(g,null,f(e,((e,n)=>(s(),r("li",{onClick:e=>function(e,t){B[e]=t,localStorage.setItem("theme",JSON.stringify(B))}(t,n),class:v({choice:i(B)[t]==n})},[u("p",U,d(e),1),u("img",{src:o(t+"-"+n),class:"shower"},null,8,$)],10,R)))),256))],4)])))),256))])]),u("p",{class:"close demo-icon",onClick:l},"")])),_:1},512)],64))}},[["__scopeId","data-v-2043335b"]]),J={type:"docs",version:"#0.0.1",pageList:[{name:"qq-robot",title:"QQ机器人(智障宽宽)"},{name:"self-made-pvz",title:"(合作)自制pvz"},{name:"dns-speed-measurement",title:"DNS测速"},{name:"ghm-base64-encoder",title:"GHM-BASE64编码器"},{name:"smart-reply",title:"智能回复"},{name:"folder-synchronization",title:"文件夹同步"},{name:"connector",title:"连点器"},{name:"simple-chat-software",title:"消息收发简易"},{name:"excel-pinyin",title:"Excel汉字转拼音"},{name:"handwritten-text-generator",title:"手写体生成器"},{name:"multithreaded-download",title:"多线程下载"},{name:"long-polling",title:"长轮询"},{name:"do-folder",title:"文件夹管理"}]},V=[{title:"长轮询",name:"long-polling"},{title:"文件夹管理",name:"do-folder"},{title:"DNS测速",name:"dns-speed-measurement"},{title:"简易聊天软件",name:"simple-chat-software"},{title:"BASE64编码器",name:"ghm-base64-encoder"},{title:"多线程下载",name:"multithreaded-download"},{title:"手写体模拟器",name:"handwritten-text-generator"},{title:"Excel汉字转拼音",name:"excel-pinyin"},{title:"智障回复",name:"smart-reply"},{title:"成语接龙辅助器",name:"idiom-solitaire"},{title:"pip自动更新",name:"pip-automatic-update"},{title:"长轮询",name:"long-polling"},{title:"连点器",name:"connector "},{title:"文件夹同步",name:"folder-synchronization"}],D={width:270,title:"菜单",nav:[{href:"/",word:"主页",icon:""},{href:"/blogs/",word:"博客",icon:""},{href:"/docs/",word:"帮助",icon:"",subNav:{title:"帮助",width:380,struct:{href:"/docs/docsPage/?name=%(name)s",word:"%(title)s",icon:""},data:{value:J,obj:["pageList"]}}},{href:"/words/",word:"一言",icon:""},{href:"/contactInformation/",word:"联系我们",icon:""},{href:"/feedback/",word:"反馈",icon:""},{href:"/chat/",word:"聊天",icon:""},{href:"/chatgpt/",word:"ChatGPT",icon:""},{href:"https://pypi.org/user/kuankuan/",word:"PyPI",icon:""},{href:"https://members.opensource.org/user/kuankuan/",word:"OSI",icon:""},{href:"https://gitee.com/kuankuan2007",word:"Gitee",icon:"",subNav:{title:"Gitee",width:330,struct:{href:"https://gitee.com/kuankuan2007/%(name)s",word:"%(title)s",icon:""},data:{value:V,obj:[]}}},{href:"https://gitlab.com/kuankuan2007",word:"Gitlab",icon:"",subNav:{title:"Gitlab",width:330,struct:{href:"https://gitlab.com/kuankuan2007/%(name)s",word:"%(title)s",icon:""},data:{value:V,obj:[]}}},{href:"https://github.com/kuankuan2007",word:"Github",icon:"",subNav:{title:"Github",width:330,struct:{href:"https://github.com/kuankuan2007/%(name)s",word:"%(title)s",icon:""},data:{value:V,obj:[]}}}]},M={class:"title"},A={class:"list"},Q=["onClick"],T={class:"demo-icon icon"},F={class:"word"},H=["onClick"],K=e({__name:"nav",setup(e){let o=t(!0),n=t(!1),m=c({}),h=t({});function w(){o.value=!1}function S(){h.value.parent?h.value=h.value.parent:o.value=!0}return function e(t){return o=this,n=null,a=function*(){if("data"in t){t.nav=[],"url"in t.data&&(t.data.value=yield(yield fetch(new URL(t.data.url,import.meta.url))).json());for(let e of t.data.obj)t.data.value=t.data.value[e];for(let e of t.data.value){let o={};for(let n in t.struct)o[n]=k.sprintf(t.struct[n],e);t.nav.push(o)}}for(let o of t.nav)"subNav"in o&&(o.subNav.parent=t,yield e(o.subNav))},new Promise(((e,t)=>{var l=e=>{try{s(a.next(e))}catch(o){t(o)}},i=e=>{try{s(a.throw(e))}catch(o){t(o)}},s=t=>t.done?e(t.value):Promise.resolve(t.value).then(l,i);s((a=a.apply(o,n)).next())}));var o,n,a}(D).then((()=>{m=c(D),h.value=m,n.value=!0})),(e,t)=>a((s(),r("div",{class:v({nav:!0,fold:i(o),unfold:!i(o)}),ref:"nav",style:p({width:i(h).width+"px"})},[u("p",M,d(i(h).title),1),u("p",{class:"fold-button demo-icon",onClick:S},""),u("p",{class:"unfold-button demo-icon",onClick:w},""),u("ul",A,[(s(!0),r(g,null,f(i(h).nav,(e=>(s(),r("li",{onClick:t=>{return o=e,void(location.href=o.href);var o},class:"nums"},[u("p",T,d(e.icon),1),u("p",F,d(e.word),1),"subNav"in e?(s(),r("p",{key:0,class:"demo-icon full-button",onClick:t=>{return o=e.subNav,n=t,h.value=o,void n.stopPropagation();var o,n}},"",8,H)):y("",!0)],8,Q)))),256))])],6)),[[l,i(n)]])}},[["__scopeId","data-v-fcc74c4d"]]),W={class:"header"},X={id:"titleGroup"},Y={id:"title"},Z=e({__name:"header",props:{title:{type:String,default:"宽宽2007",required:!0},jump:{type:String,default:"",required:!1},toLogin:{type:Boolean,default:!1,required:!1},needInfo:{type:Boolean,default:!1,required:!1}},setup(e){const t=e;let o=document.createElement("title");return o.innerText=t.title,document.head.appendChild(o),(e,o)=>(s(),r("header",W,[u("div",X,[u("h1",Y,d(i(t).title),1)]),m(z),m(_,{jump:i(t).jump,"to-login":i(t).toLogin,"need-info":i(t).needInfo},null,8,["jump","to-login","need-info"]),m(K)]))}},[["__scopeId","data-v-ad14fed4"]]);export{J as d,Z as m,N as n};
