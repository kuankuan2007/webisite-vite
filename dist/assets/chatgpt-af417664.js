import{_ as e,a as t,l as a,P as s,N as o,O as n,u as l,o as r,b as i,e as d,h as c,t as u,v as m,d as h,w as g,n as p,a2 as v,s as f,r as y,a0 as k,L as b,M as _,F as w,Q as S,T as x,j as M,a3 as R,x as j,p as B,f as C,i as E}from"./all-7fb1665d.js";import{m as O}from"./header-93f915ff.js";import{_ as T}from"./contextMenu-e95d3f2a.js";import{_ as A}from"./markdownShower-23abf85c.js";import{m as H}from"./markDownEditor-f49b7113.js";const L={class:"message"},N={class:"info"},q={key:0,class:"loading",src:"/assets/loading-422763ff.gif"},D=e({__name:"history",props:{data:{type:Object,default:{},required:!0},right:{type:Boolean,default:!1,required:!1}},emits:["recall"],setup(e,{emit:y}){const k=e;let b=t(!0),_=t();function w(e){"copy-markdown"===e?(v(k.data.message),f("复制成功")):"copy-html"===e?(v(_.value.makeHtml(k.data.message)),f("复制成功")):"delete"===e?b.value=!1:"recall"===e&&y("recall")}a("username",t,sessionStorage,"",!1),a("userrights",t,sessionStorage,"",!1);let S=s((()=>({title:"消息",menu:[{title:"复制",sub:{title:!1,menu:[{title:"MarkDown",event:"copy-markdown"},{title:"HTML",event:"copy-html"}]}},{title:"删除消息",event:"delete"}]})));return(t,a)=>o((r(),i("div",{class:p(["message-box",{right:l(k).right,normal:!l(k).right}])},[d("div",L,[d("p",N,[c(u(`${e.data.user}`)+" ",1),0===l(k).data.statue?(r(),i("img",q)):m("",!0)]),h(T,{onChoice:w,data:l(S)},{default:g((()=>[h(A,{class:p([{empty:!e.data.message},"content"]),content:e.data.message||"正在思考...",ref_key:"messageShower",ref:_,"header-level-start":2},null,8,["class","content"])])),_:1},8,["data"])])],2)),[[n,l(b)]])}},[["__scopeId","data-v-51109dd9"]]);let I=a("username",t,sessionStorage,"",!1);class W{constructor(e,t,a=0,s=void 0){this.message=t,this.user=e,this.statue=a,this.error=s}add(e){this.message+=e}}let $,J=y([new W("Sysyem","Welcome to chatgpt!",1)]);function P(e){let t=JSON.parse(e.data);void 0===t.type?J[J.length-1].add(t.text):"END"===t.type?J[J.length-1].statue=1:"ERROR"===t.type&&(J[J.length-1].statue=-1,k(`ERROR: ${t.content}`),J[J.length-1].error=t.content)}const F={class:"main"},G={class:"history-list"},K={class:"input-box"},Q=(e=>(B("data-v-f8a52f98"),e=e(),C(),e))((()=>d("span",{class:"demo-icon"},"",-1)));E(e({__name:"App",setup(e){b((()=>{$=new WebSocket("wss://kuankuan.site/chatgpt"),$.onmessage=P,_((()=>{bottomAdded.value,v.value.scrollHeight-v.value.clientHeight-v.value.scrollTop<300&&setTimeout(toButton,0)}))}));let m=s((()=>R.height/4)),v=t(),y=a("username",t,sessionStorage,"",!1),B=t();function C(e){e.ctrlKey&&E()}function E(){var e;B.refresh&&B.refresh(),e=B.value,(/^\s*$/.test(e)?(f("消息为空哦"),0):0===J[J.length-1].statue?(k("上次响应还未结束，请耐心等待"),0):(J.push(new W(I.value,e,1)),J.push(new W("chatGPT","")),$.send(JSON.stringify({check:localStorage.getItem("check"),question:e})),1))&&(B.value="")}function T(e){"send"===e&&E()}return(e,t)=>(r(),i(w,null,[h(O,{title:"聊天室","need-rights":!0,toLogin:!0}),d("div",F,[d("div",{class:"history-box",ref_key:"historyBox",ref:v},[d("div",G,[d("button",{class:p(["get-more",{disabled:0!=e.hasMore}]),onClick:t[0]||(t[0]=(...t)=>e.getMore&&e.getMore(...t))},[d("span",null,u(e.getMoreWords),1)],2),(r(!0),i(w,null,S(l(J),(t=>(r(),j(D,{onRecall:a=>e.recall(t.id),data:t,key:t.id,right:t.user===l(y)},null,8,["onRecall","data","right"])))),128))])],512),d("div",K,[h(x,{name:"to-botton"},{default:g((()=>[o(d("button",{onClick:t[1]||(t[1]=(...t)=>e.toButton&&e.toButton(...t)),class:"to-bottom"},[d("span",null,[c(u(e.bottomAdded)+" ",1),Q])],512),[[n,e.bottomAdded>0]])])),_:1}),h(H,{"place-holder":"按下Ctrl+Enter以发送",onSpicalEnter:C,"other-buttons":[{event:"send",inner:'发送<span class="demo-icon"><span>'}],headerLevelStart:2,"max-editor-height":l(m),content:l(B),"onUpdate:content":t[2]||(t[2]=e=>M(B)?B.value=e.target.value:B=e.target.value),onCustomButtomClick:T},null,8,["other-buttons","max-editor-height","content"])])])],64))}},[["__scopeId","data-v-f8a52f98"]])).mount("#app");