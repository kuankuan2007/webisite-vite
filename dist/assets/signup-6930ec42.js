import{_ as e,r as a,J as l,a as t,b as s,h as u,e as r,u as n,H as i,n as d,y as v,z as o,F as p,C as f,K as m,L as b,E as c,p as y,l as k,q as g}from"./all-a1f15435.js";import{m as h}from"./header-d669f84a.js";import{i as x}from"./text-e090861d.js";import{i as _,a as w}from"./date-c32753c8.js";import{i as j}from"./button-20f57242.js";import{i as I,a as $}from"./emailCode-85e6afa5.js";import"./selecter-a1f26544.js";const U={class:"main"},z=(e=>(y("data-v-37ef406a"),e=e(),k(),e))((()=>r("h1",{class:"title"},"注册",-1))),C={class:"bottom-button"},A=["href"],D=["href"];g(e({__name:"App",setup(e){let y=a(""),k=a(""),g=a(""),Z=a(""),q=a(""),E=l(new Date(1970,0,1)),F=a("保密"),H=a(""),J=a(null),K=a(null),L=a(null),R=a(null),S=a(null),B=a(null),G=[J,Z,K,L,R,B],M=a(0);function N(){if(0==M.value){for(let e of G){if(-1==e.value.wrong)return void f(`请填写${e.value.title}字段`);if(0!=e.value.wrong)return void f(e.value.reminder[e.value.wrong-1])}m(y.value,H.value).then((e=>{null===e?M.value=1:f(e.msg)}))}else 1==M.value?q.value.check().then((()=>{M.value=2})):2==M.value&&S.value.check().then((()=>{b(y.value,H.value,E.value,F.value,k.value)}))}return(e,a)=>(t(),s(p,null,[u(h,{title:"注册",jump:"/user/"}),r("div",U,[z,0==n(M)||1==n(M)?(t(),i(x,{key:0,ref_key:"usernameInput",ref:J,class:d(["input-box",{disabled:0!=n(M)}]),type:"text",title:"用户名",value:n(y),"onUpdate:value":a[0]||(a[0]=e=>v(y)?y.value=e.target.value:y=e.target.value),reminder:["用户名必须是2-32个非空白字符"],tester:e=>/^\S{2,32}$/.test(e)?0:1,disabled:n(M)>0},null,8,["class","value","tester","disabled"])):o("",!0),0==n(M)||2==n(M)?(t(),i(x,{key:1,ref_key:"emailInput",ref:Z,class:d(["input-box",{disabled:0!=n(M)}]),type:"email",title:"邮箱",value:n(H),"onUpdate:value":a[1]||(a[1]=e=>v(H)?H.value=e.target.value:H=e.target.value),reminder:["邮箱格式不正确"],tester:e=>/^[\w.%+-]+@(?:[^/\\\.&\?\#]+\.)+[^/\\\.&\?\#]+$/.test(e)?0:1,disabled:n(M)>0},null,8,["class","value","tester","disabled"])):o("",!0),0==n(M)?(t(),i(x,{key:2,ref_key:"passwordInput",ref:K,class:"input-box",type:"password",title:"密码",value:n(k),"onUpdate:value":a[2]||(a[2]=e=>v(k)?k.value=e.target.value:k=e.target.value),reminder:["密码太短","密码太长","密码需要包含数字","密码需要包含字母","密码不能包含特殊字符"],tester:e=>(n(L).refreshReminder(n(g),e),e.length<6?1:e.length>32?2:/^(?=.*[0-9]).{6,32}$/.test(e)?/^(?=.*[a-zA-Z]).{6,32}$/.test(e)?/^[a-zA-Z0-9]{6,32}$/.test(e)?0:5:4:3),disabled:n(M)>0},null,8,["value","tester","disabled"])):o("",!0),0==n(M)?(t(),i(x,{key:3,ref_key:"passwordInput2",ref:L,class:"input-box",type:"password",title:"确认密码",value:n(g),disabled:n(M)>0,"onUpdate:value":a[3]||(a[3]=e=>v(g)?g.value=e.target.value:g=e.target.value),reminder:["密码不匹配"],tester:(e,a=n(k))=>e===a?0:1},null,8,["value","disabled","tester"])):o("",!0),0==n(M)?(t(),i(_,{key:4,ref_key:"birthDateInput",ref:R,"onUpdate:date":a[4]||(a[4]=e=>v(E)?E.value=e:E=e),style:{"z-index":"1"},value:n(E),disabled:n(M)>0,class:"input-box",title:"出生日期",reminder:["出生日期应在当前日期之前"],tester:e=>e>new Date?1:0},null,8,["value","disabled","tester"])):o("",!0),0==n(M)?(t(),i(w,{key:5,ref_key:"sexInput",ref:B,"onUpdate:value":a[5]||(a[5]=e=>v(F)?F.value=e:F=e),style:{"z-index":"0"},value:n(F),class:"input-box",title:"性别",disabled:n(M)>0},null,8,["value","disabled"])):o("",!0),1==n(M)?(t(),i(I,{key:6,class:"input-box",ref_key:"imageCodeInput",ref:q},null,512)):o("",!0),2==n(M)?(t(),i($,{key:7,class:"input-box",ref_key:"emailCodeInput",ref:S},null,512)):o("",!0),u(j,{value:2!=n(M)?"下一步":"完成",onClick:N},null,8,["value"]),r("div",C,[r("p",null,[r("a",{href:`/login/reset/?from=${n(c)("from","/")}`},"忘记密码",8,A)]),r("p",null,[r("a",{href:`/login/?from=${n(c)("from","/")}`},"登录",8,D)])])])],64))}},[["__scopeId","data-v-37ef406a"]])).mount("#app");
