import{_ as e,a,l as t,s,m as l,o as n,b as c,d as o,u as r,e as i,t as u,n as p,q as d,v as m,F as h,p as f,f as v,i as k}from"./all-3e823b9f.js";import{m as y}from"./header-b76a1fc8.js";import{_ as S}from"./markdownShower-98ca1d23.js";import{m as _}from"./selecter-df9bbc99.js";const b=e=>(f("data-v-ccf40e61"),e=e(),v(),e),j={key:0,class:"main"},A={class:"title"},B={class:"info"},I=b((()=>i("h2",null,"内容",-1))),L=b((()=>i("h2",null,"复现步骤",-1))),g={key:1,class:"disabled"},w=b((()=>i("h2",null,"管理员回复",-1))),F={key:3,class:"disabled"};k(e({__name:"App",setup(e){let f=a(null),v=a(!1),k=a(parseInt(t("id","-1"),10));return-1===k.value&&s("获取数据失败",(()=>{location.href="/feedback/"})),l(k.value).then((e=>{f.value=e,v.value=!0}),(e=>{s("获取数据失败",(()=>{location.href="/feedback/"}))})),(e,a)=>(n(),c(h,null,[o(y,{title:"宽宽2007·反馈"}),r(v)?(n(),c("div",j,[i("h1",A,u(r(f).title),1),o(_,{values:["Waiting","A1","A2","A3","B1","B2","B3","Finish"],choice:r(f).statue,"onUpdate:choice":a[0]||(a[0]=e=>r(f).statue=e),class:p(["statue",r(f).statue])},null,8,["choice","class"]),i("p",B,u(r(f).time)+" · "+u(r(f).user),1),I,o(S,{ref:"contentInput",content:r(f).content,headerLevelStart:3},null,8,["content"]),L,""!=r(f).recirculationStep?(n(),d(S,{key:0,content:r(f).recirculationStep,headerLevelStart:3},null,8,["content"])):(n(),c("p",g,"作者没有提供复现步骤")),w,""!=r(f).reply?(n(),d(S,{key:2,content:r(f).reply,headerLevelStart:3},null,8,["content"])):(n(),c("p",F,"管理员还未进行回复"))])):m("",!0)],64))}},[["__scopeId","data-v-ccf40e61"]])).mount("#app");