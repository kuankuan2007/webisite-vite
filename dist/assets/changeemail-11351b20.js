import{_ as e,a,l,o as s,b as t,d as u,e as i,u as n,x as o,v as r,n as v,j as d,F as c,S as m,s as p,p as f,f as k,i as h}from"./all-7fb1665d.js";import{m as y}from"./header-93f915ff.js";import{i as _,a as b}from"./emailCode-a8ea0326.js";import{i as j}from"./button-f6c27800.js";import{i as g}from"./text-c77f088d.js";const w={class:"main"},x=(e=>(f("data-v-3afc1fd6"),e=e(),k(),e))((()=>i("h1",{class:"title"},"修改邮箱",-1)));h(e({__name:"App",setup(e){let f=a(),k=a(""),h=a(),C=a();a(),a();let I=l("userinfo",a,sessionStorage,{},!0),S=a(0);return(e,a)=>(s(),t(c,null,[u(y,{title:"用户设置",toLogin:!0,"need-info":!0}),i("div",w,[x,1!=n(S)?(s(),o(g,{key:0,class:"input-ele",value:n(I).name,disabled:!0,title:"用户"},null,8,["value"])):r("",!0),1==n(S)?(s(),o(g,{key:1,class:"input-ele",value:n(I).email,disabled:!0,title:"邮箱"},null,8,["value"])):r("",!0),0==n(S)?(s(),o(_,{key:2,class:"input-ele",ref_key:"imagecode",ref:f},null,512)):r("",!0),1==n(S)?(s(),o(b,{key:3,class:"input-ele",ref_key:"emailcode",ref:h},null,512)):r("",!0),2==n(S)?(s(),o(g,{key:4,ref:"emailInput",class:v(["input-ele",{disabled:n(S)>2}]),type:"email",title:"新邮箱",value:n(k),"onUpdate:value":a[0]||(a[0]=e=>d(k)?k.value=e.target.value:k=e.target.value),reminder:["邮箱格式不正确"],tester:e=>/^[\w.%+-]+@(?:[^/\\\.&\?\#]+\.)+[^/\\\.&\?\#]+$/.test(e)?0:1,disabled:n(S)>2},null,8,["class","value","tester","disabled"])):r("",!0),3==n(S)?(s(),o(b,{key:5,class:"input-ele",ref_key:"newEmailcode",ref:C,"use-new-email":!0},null,512)):r("",!0),u(j,{class:"input-ele",value:3===n(S)?"完成":"下一步",onClick:a[1]||(a[1]=e=>(0===S.value&&f.value.check().then((()=>{S.value=1})),1===S.value&&h.value.check().then((()=>{S.value=2})),2===S.value&&m(k.value).then((()=>{S.value=3})),void(3===S.value&&C.value.check().then((()=>{p("邮箱已更改",(()=>{location.href="/user/"}))})))))},null,8,["value"])])],64))}},[["__scopeId","data-v-3afc1fd6"]])).mount("#app");