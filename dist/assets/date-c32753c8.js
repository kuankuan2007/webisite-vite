import{_ as e,r as t,o as r,w as a,a as l,b as i,e as s,t as n,u,h as o,j as d,T as c,n as p,v as m,x as f,m as v,p as g,l as h,S as y}from"./all-a1f15435.js";import{m as S}from"./selecter-a1f26544.js";const _={class:"input-group"},b={class:"reminder"},q=(e=>(g("data-v-64b9e041"),e=e(),h(),e))((()=>s("span",{class:"demo-icon"},"",-1))),A=e({__name:"sex",props:{title:{type:String,required:!1,default:"性别"},value:{type:String,required:!0,default:"保密"},tester:{type:Function,default:()=>0,required:!1},reminder:{type:Array,default:["内容格式不正确"],required:!1},disabled:{type:Boolean,required:!1,default:!1}},emits:["update:value"],setup(e,{expose:g,emit:h}){const y=e;let A=t(0);function x(e,...t){A.value=y.tester(e,...t)}let w=t(null),F=t(null);return r((()=>{a((()=>{y.title,w.value.style.setProperty("--title-width",`${F.value.clientWidth}px`)}))})),g({wrong:A,reminder:y.reminder,title:y.title,refreshReminder:x}),(e,t)=>(l(),i("div",{class:p(["main-box",{disabled:u(y).disabled}]),ref_key:"inputGroup",ref:w},[s("div",_,[s("p",{class:"title",ref_key:"title",ref:F},n(u(y).title),513),o(S,{"onUpdate:choice":t[0]||(t[0]=e=>{return x(t=e),void h("update:value",t);var t}),class:"selecter",values:["保密","男","女","其他"],choice:u(y).value},null,8,["choice"])]),o(c,{name:"reminder"},{default:d((()=>[m(s("p",b,[q,v(n(u(y).reminder[u(A)-1]),1)],512),[[f,0!=u(A)]])])),_:1})],2))}},[["__scopeId","data-v-64b9e041"]]),x=e=>(g("data-v-6e8708f4"),e=e(),h(),e),w={class:"input-group"},F=x((()=>s("p",null,"年",-1))),D=x((()=>s("p",null,"月",-1))),I=x((()=>s("p",null,"日",-1))),Y={class:"reminder"},k=x((()=>s("span",{class:"demo-icon"},"",-1))),U=e({__name:"date",props:{title:{type:String,required:!1,default:"日期"},value:{type:Date,required:!0,default:new Date(2e3,1,1)},tester:{type:Function,default:()=>0,required:!1},reminder:{type:Array,default:["内容格式不正确"],required:!1},disabled:{type:Boolean,required:!1,default:!1}},emits:["update:date"],setup(e,{expose:g,emit:h}){const _=e;let b=t(0);function q(e,...t){b.value=_.tester(e,...t)}let A=y((()=>_.value.getFullYear().toString())),x=y((()=>(_.value.getMonth()+1).toString())),U=y((()=>_.value.getDate().toString()));function j(e,t){let r=new Date(_.value);"year"===e&&r.setFullYear(parseInt(t,10)),"mounth"===e&&r.setMonth(parseInt(t,10)-1),"date"===e&&r.setDate(parseInt(t,10)),q(r),h("update:date",r)}let M=t(null),B=t(null);r((()=>{a((()=>{_.title,M.value.style.setProperty("--title-width",`${B.value.clientWidth}px`)}))}));let G=y((()=>{let e=_.value.getMonth()+1;return 2==e?_.value.getFullYear()%4==0&&_.value.getFullYear()%100!=0||_.value.getFullYear()%400==0?Array.from({length:29},((e,t)=>(t+1).toString())):Array.from({length:28},((e,t)=>(t+1).toString())):e<=7?e%2==0?Array.from({length:30},((e,t)=>(t+1).toString())):Array.from({length:31},((e,t)=>(t+1).toString())):e%2==0?Array.from({length:31},((e,t)=>(t+1).toString())):Array.from({length:30},((e,t)=>(t+1).toString()))}));return g({wrong:b,reminder:_.reminder,title:_.title,refreshReminder:q}),(e,t)=>(l(),i("div",{class:p(["main-box",{disabled:u(_).disabled}]),ref_key:"inputGroup",ref:M},[s("div",w,[s("p",{class:"title",ref_key:"title",ref:B},n(u(_).title),513),o(S,{"onUpdate:choice":t[0]||(t[0]=e=>j("year",e)),class:"selecter",values:Array.from({length:200},((e,t)=>(t+1900).toString())),choice:u(A)},null,8,["values","choice"]),F,o(S,{"onUpdate:choice":t[1]||(t[1]=e=>j("mounth",e)),class:"selecter",values:Array.from({length:12},((e,t)=>(t+1).toString())),choice:u(x)},null,8,["values","choice"]),D,o(S,{"onUpdate:choice":t[2]||(t[2]=e=>j("date",e)),class:"selecter",values:u(G),choice:u(U)},null,8,["values","choice"]),I]),o(c,{name:"reminder"},{default:d((()=>[m(s("p",Y,[k,v(n(u(_).reminder[u(b)-1]),1)],512),[[f,0!=u(b)]])])),_:1})],2))}},[["__scopeId","data-v-6e8708f4"]]);export{A as a,U as i};
