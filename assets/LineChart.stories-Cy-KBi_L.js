import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,D as n,Dt as r,Gt as i,H as a,Nt as o,O as s,Pt as c,S as l,T as u,U as d,Vt as f,Xt as p,Zt as m,a as h,bt as g,cn as _,f as v,fn as y,ft as ee,gt as te,ht as b,i as x,jt as S,lt as C,mn as ne,mt as re,n as w,o as T,pt as ie,q as E,rt as D,sn as ae,st as O,ut as k,y as oe,zt as A}from"./iframe-BsWRsydk.js";import{i as se,n as ce,r as j,t as M}from"./create-runtime-stories-BWVMXit6.js";import{i as N,n as le,r as ue,t as de}from"./Guidelines-B4Q9fRhg.js";import{n as fe,t as pe}from"./Badge-BIs29jtc.js";import{n as P,t as me}from"./Spinner-BeA3b-MI.js";import{n as F,t as he}from"./LiveRegion-BIzpBPTB.js";function I(e,t=new Map){let n=new Map(t);for(let t of e){if(n.has(t))continue;let e=new Set(n.values()),r=[1,2,3,4,5,6].find(t=>!e.has(t));n.set(t,r??Ce(n.size))}return n}function ge(e,t){let n=e=>Number(e.toFixed(2));switch(e){case`circle`:return`M${n(-t)},0a${n(t)},${n(t)} 0 1,0 ${n(2*t)},0a${n(t)},${n(t)} 0 1,0 ${n(-2*t)},0Z`;case`square`:{let e=t*.85;return`M${n(-e)},${n(-e)}H${n(e)}V${n(e)}H${n(-e)}Z`}case`triangle`:{let e=t*1.15;return`M0,${n(-e)}L${n(e)},${n(e*.8)}H${n(-e)}Z`}case`diamond`:{let e=t*1.25;return`M0,${n(-e)}L${n(e)},0L0,${n(e)}L${n(-e)},0Z`}case`cross`:{let e=t*1.1,r=t*.38;return`M${n(-r)},${n(-e)}H${n(r)}V${n(-r)}H${n(e)}V${n(r)}H${n(r)}V${n(e)}H${n(-r)}V${n(r)}H${n(-e)}V${n(-r)}H${n(-r)}Z`}case`star`:{let e=t*1.3,r=e*.45,i=``;for(let t=0;t<10;t++){let a=t%2?r:e,o=Math.PI/5*t-Math.PI/2;i+=`${t?`L`:`M`}${n(Math.cos(o)*a)},${n(Math.sin(o)*a)}`}return`${i}Z`}}}function _e(e){if(!(e>0))return 1;let t=10**Math.floor(Math.log10(e)),n=e/t;return(n<=1?1:n<=2?2:n<=5?5:10)*t}function ve(e,t,n=4){if(!(t>e)){let n=Math.abs(e)>0?Math.abs(e)*.1:1;e-=n,t+=n}let r=_e((t-e)/n),i=[],a=Math.floor(e/r)*r,o=Math.ceil(t/r)*r;for(let e=a;e<=o+r/2;e+=r)i.push(Number(e.toPrecision(12)));return i}function ye(e,t,n){if(!(t>e)||n<1)return[Math.round(e)];let r=Math.max(1,_e((t-e)/n)),i=[];for(let n=Math.ceil(e/r)*r;n<=t;n+=r)i.push(n);return i}function be(e,t,n){if(!(t>e)||n<1)return[e];let r=t-e,i=we.find(e=>r/e<=n)??Math.ceil(r/n/H)*H,a=new Date(e).getTimezoneOffset()*B,o=[];for(let n=Math.ceil((e-a)/i)*i+a;n<=t;n+=i)o.push(n);return o}function xe(e){let t=e.slice(1).map((t,n)=>t-e[n]).filter(e=>e>0).sort((e,t)=>e-t);return t.length?t[Math.floor(t.length/2)]:0}var L,Se,R,Ce,z,B,V,H,we;function Te(){return(Te=e((()=>{L=[`circle`,`square`,`triangle`,`diamond`,`cross`,`star`],Se=e=>L[e-1],R=e=>`var(--cui-data-series-${e})`,Ce=e=>e%6+1,z=1e3,B=60*z,V=60*B,H=24*V,we=[z,5*z,10*z,30*z,B,5*B,10*B,15*B,30*B,V,3*V,6*V,12*V,H]})))()}function U(e,y){let C=ee();m(y,!0);let ne=x(y,`series`,19,()=>[]),re=x(y,`loading`,3,!1),w=x(y,`height`,3,240),T=x(y,`xMode`,3,`time`),ie=x(y,`locale`,3,`de-DE`),ae=x(y,`showSummary`,3,!1),k=x(y,`legend`,3,!0),se=x(y,`labels`,19,()=>({})),ce=h(y,De),j=i(()=>({...Ee,...se()})),M=i(()=>ne().map((e,t)=>{let n=e.points.filter(e=>Number.isFinite(e.v)).map(e=>({t:+e.t,v:e.v,x:0})).sort((e,t)=>e.t-t.t);n.forEach((e,t)=>e.x=T()===`index`?t:e.t);let r=T()===`index`?0:xe(n.map(e=>e.t))*2.5,i=new Set;return r>0&&n.forEach((e,t)=>t&&e.t-n[t-1].t>r&&i.add(t)),{id:e.id,name:e.name,slot:e.slot??Ce(t),pts:n,breaks:i}})),N=i(()=>g(M).flatMap(e=>e.pts)),le=i(()=>g(N).length===0),ue=i(()=>Math.min(...g(N).map(e=>e.t))),de=i(()=>Math.max(...g(N).map(e=>e.t))),fe=i(()=>new Intl.NumberFormat(ie(),{maximumFractionDigits:2})),pe=i(()=>{let e=g(de)-g(ue),t=e<=12e4?{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}:e<864e5?{hour:`2-digit`,minute:`2-digit`}:{day:`numeric`,month:`numeric`,hour:`2-digit`,minute:`2-digit`};return new Intl.DateTimeFormat(ie(),t)}),P=e=>y.formatValue?y.formatValue(e):`${g(fe).format(e)}${y.unit?` ${y.unit}`:``}`,F=e=>y.formatTime?y.formatTime(e):g(pe).format(e),I=f(0),_e=f(0),L=i(()=>w()===`fill`),z=i(()=>w()===`fill`?g(_e):w()),B=i(()=>y.yLabel?28:12),V=i(()=>y.xLabel?44:28),H=i(()=>ve(y.yMin??Math.min(...g(N).map(e=>e.v)),y.yMax??Math.max(...g(N).map(e=>e.v))).filter(e=>(y.yMin===void 0||e>=y.yMin)&&(y.yMax===void 0||e<=y.yMax))),we=i(()=>y.yMin??g(H)[0]),Te=i(()=>y.yMax??g(H)[g(H).length-1]),U=i(()=>Math.max(...g(H).map(e=>g(fe).format(e).length))*7+14),W=i(()=>Math.max(10,g(I)-g(U)-12)),G=i(()=>Math.max(10,g(z)-g(B)-g(V))),K=i(()=>{let e=Math.min(...g(N).map(e=>e.x)),t=Math.max(...g(N).map(e=>e.x));return t>e?[e,t]:T()===`index`?[e-1,t+1]:[e-6e4,t+6e4]}),q=e=>g(U)+(e-g(K)[0])/(g(K)[1]-g(K)[0])*g(W),J=e=>{let t=Math.min(g(Te),Math.max(g(we),e));return g(B)+(1-(t-g(we))/(g(Te)-g(we)||1))*g(G)},Y=i(()=>T()===`index`?ye(Math.max(0,g(K)[0]),g(K)[1],Math.max(2,Math.floor(g(W)/48))):be(g(K)[0],g(K)[1],Math.max(2,Math.floor(g(W)/90)))),qe=e=>T()===`index`?g(j).reading(e+1):F(e);function X(e){return e.pts.map((t,n)=>`${n===0||e.breaks.has(n)?`M`:`L`}${q(t.x).toFixed(1)},${J(t.v).toFixed(1)}`).join(``)}function Z(e){let t=Math.max(1,Math.ceil(e.pts.length/12)),n=e.pts.length-1;return e.pts.filter((r,i)=>{let a=(i===0||e.breaks.has(i))&&(i===n||e.breaks.has(i+1));return(n-i)%t===0||a})}let Q=f(null),Je=f(``),$=i(()=>{if(!g(Q))return null;let e=g(M).findIndex(e=>e.id===g(Q).id),t=g(M)[e];if(!t||!t.pts.length)return null;let n=Math.min(g(Q).index,t.pts.length-1);return{strand:t,at:e,index:n,point:t.pts[n],from:g(Q).from}});function Ye(e,t){let n=e.pts[t];return g(j).point({series:e.name,time:F(n.t),value:P(n.v),index:t+1,count:e.pts.length})}function Xe(e,t){let n=0;return e.pts.forEach((r,i)=>{Math.abs(r.x-t)<Math.abs(e.pts[n].x-t)&&(n=i)}),n}function Ze(e){let t=g(M).filter(e=>e.pts.length);if(!t.length)return;let n=g($)&&g($).from===`keyboard`?g($):null,r=n?.strand??t[0],i=n?.index??r.pts.length-1,a;switch(e.key){case`ArrowRight`:a={s:r,index:n?Math.min(r.pts.length-1,i+1):i};break;case`ArrowLeft`:a={s:r,index:n?Math.max(0,i-1):i};break;case`PageUp`:a={s:r,index:Math.min(r.pts.length-1,i+10)};break;case`PageDown`:a={s:r,index:Math.max(0,i-10)};break;case`Home`:a={s:r,index:0};break;case`End`:a={s:r,index:r.pts.length-1};break;case`ArrowDown`:case`ArrowUp`:{let o=t.indexOf(r),s=e.key===`ArrowDown`?1:-1,c=n?t[(o+s+t.length)%t.length]:r;a={s:c,index:n?Xe(c,r.pts[i].x):i};break}case`Escape`:if(!n)return;a=null;break;default:return}e.preventDefault(),A(Q,a?{id:a.s.id,index:a.index,from:`keyboard`}:null,!0),A(Je,a?Ye(a.s,a.index):``,!0)}function Qe(e){let t=e.currentTarget.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i={id:``,index:0,d:1/0};for(let e of g(M))for(let t=0;t<e.pts.length;t++){let a=e.pts[t],o=Math.hypot(q(a.x)-n,(J(a.v)-r)*.5);o<i.d&&(i={id:e.id,index:t,d:o})}i.id&&A(Q,{id:i.id,index:i.index,from:`pointer`},!0)}function $e(){g(Q)?.from===`pointer`&&A(Q,null)}let et=i(()=>y.summary?y.summary:g(le)?g(j).empty:g(j).summary({label:y.label,from:F(g(ue)),to:F(g(de)),series:g(M).filter(e=>e.pts.length).map(e=>{let t=e.pts.map(e=>e.v);return{name:e.name,min:P(Math.min(...t)),max:P(Math.max(...t)),last:P(e.pts[e.pts.length-1].v)}})})),tt=i(()=>{let e=[...new Set(g(N).map(e=>e.t))].sort((e,t)=>e-t),t=g(M).map(e=>new Map(e.pts.map(e=>[e.t,e.v])));return e.map(e=>({t:e,cells:t.map(t=>t.get(e))}))});var nt=Ke();oe(nt,()=>({class:[`cui-line-chart`,y.class],"data-fill":g(L)||void 0,"aria-busy":re()||void 0,...ce}),void 0,void 0,void 0,`svelte-iga5bf`);var rt=t(nt),it=e=>{var n=ke();a(n,21,()=>g(M),e=>e.id,(e,n)=>{var i=Oe(),a=t(i),o=t(a);let s;_(a);var d=c(a);_(i),r((e,t)=>{l(o,`d`,e),s=u(o,``,s,{fill:t}),D(d,` ${g(n).name??``}`)},[()=>ge(Se(g(n).slot),4.5),()=>R(g(n).slot)]),O(e,i)}),_(n),O(e,n)};E(rt,e=>{k()&&g(M).length>0&&e(it)});var at=c(rt,2),ot=e=>{var n=Ae();let i;var a=t(n);me(a,{get label(){return`${y.label??``}: ${g(j).loading??``}`},delay:300}),_(n),r(()=>i=u(n,``,i,{height:g(L)?void 0:`${g(z)}px`})),O(e,n)},st=e=>{var n=je();let i;var a=t(n),s=o(a,!0);_(n),r(()=>{l(n,`aria-label`,`${y.label??``}: ${g(j).empty??``}`),i=u(n,``,i,{height:g(L)?void 0:`${g(z)}px`}),D(s,g(j).empty)}),O(e,n)},ct=e=>{var n=Ve();let s;var d=t(n),f=e=>{var n=Be(),s=S(n),d=t(s),f=e=>{var t=Me();l(t,`y`,14);var n=o(t,!0);r(()=>{l(t,`x`,g(U)),D(n,y.yLabel)}),O(e,t)};E(d,e=>{y.yLabel&&e(f)});var p=c(d);a(p,16,()=>g(H),e=>e,(e,t)=>{var n=Ne(),i=S(n),a=c(i),s=o(a,!0);r((e,t,n,r)=>{l(i,`x1`,g(U)),l(i,`x2`,g(I)-12),l(i,`y1`,e),l(i,`y2`,t),l(a,`x`,g(U)-8),l(a,`y`,n),D(s,r)},[()=>J(t),()=>J(t),()=>J(t),()=>g(fe).format(t)]),O(e,n)});var m=c(p);a(m,16,()=>g(Y),e=>e,(e,t)=>{var n=Pe(),i=o(n,!0);r((e,t)=>{l(n,`x`,e),l(n,`y`,g(z)-g(V)+20),D(i,t)},[()=>q(t),()=>qe(t)]),O(e,n)});var h=c(m),v=e=>{var t=Fe(),n=o(t,!0);r(()=>{l(t,`x`,g(I)-12),l(t,`y`,g(z)-6),D(n,y.xLabel)}),O(e,t)};E(h,e=>{y.xLabel&&e(v)});var ee=c(h);a(ee,17,()=>g(M),e=>e.id,(e,t)=>{var n=Le(),i=S(n);let o;var s=c(i);a(s,17,()=>Z(g(t)),e=>e.x,(e,n)=>{var i=Ie();let a;r((e,t,n,r)=>{l(i,`d`,e),l(i,`transform`,`translate(${t??``},${n??``})`),a=u(i,``,a,{fill:r})},[()=>ge(Se(g(t).slot),3.5),()=>q(g(n).x),()=>J(g(n).v),()=>R(g(t).slot)]),O(e,i)}),r((e,t)=>{l(i,`d`,e),o=u(i,``,o,{stroke:t})},[()=>X(g(t)),()=>R(g(t).slot)]),O(e,n)});var te=c(ee),b=e=>{var n=Re(),i=S(n);let a;var s=o(i),d=c(i);let f;var p=t(d),m=c(p);let h;_(d),r((e,t,n,r,o)=>{a=u(i,``,a,{transform:e}),l(s,`y1`,g(B)),l(s,`y2`,g(z)-g(V)),f=u(d,``,f,{transform:t}),l(p,`d`,n),l(m,`d`,r),h=u(m,``,h,{fill:o})},[()=>`translate(${q(g($).point.x)??``}px, 0)`,()=>`translate(${q(g($).point.x)??``}px, ${J(g($).point.v)??``}px)`,()=>ge(Se(g($).strand.slot),8),()=>ge(Se(g($).strand.slot),5.5),()=>R(g($).strand.slot)]),O(e,n)};E(te,e=>{g($)&&e(b)}),_(s);var x=c(s),C=e=>{let n=i(()=>q(g($).point.x)>g(U)+g(W)/2);var a=ze();let s;var l=t(a),d=o(l,!0),f=c(l,2),p=o(f,!0),m=c(f,2),h=o(m,!0);_(a),r((e,t,n,r)=>{s=u(a,``,s,{left:e,right:t}),D(d,g($).strand.name),D(p,n),D(h,r)},[()=>g(n)?void 0:`${q(g($).point.x)+12}px`,()=>g(n)?`${g(I)-q(g($).point.x)+12}px`:void 0,()=>F(g($).point.t),()=>P(g($).point.v)]),O(e,a)};E(x,e=>{g($)&&e(C)}),r(()=>{l(s,`width`,g(I)),l(s,`height`,g(z))}),O(e,n)};E(d,e=>{g(I)>0&&g(z)>0&&e(f)}),_(n),r(()=>{l(n,`aria-roledescription`,g(j).roleDescription),l(n,`aria-label`,y.label),l(n,`aria-describedby`,`${C}-summary ${C}-hint`),s=u(n,``,s,{height:g(L)?void 0:`${g(z)}px`})}),b(`keydown`,n,Ze),te(`blur`,n,()=>A(Q,null)),b(`pointermove`,n,Qe),b(`pointerdown`,n,Qe),te(`pointerleave`,n,$e),v(n,`clientWidth`,e=>A(I,e)),v(n,`clientHeight`,e=>A(_e,e)),O(e,n)};E(at,e=>{re()&&g(le)?e(ot):g(le)?e(st,1):e(ct,-1)});var lt=c(at,2),ut=o(lt,!0),dt=c(lt,2),ft=o(dt,!0),pt=c(dt,2);he(pt,{get message(){return g(Je)}});var mt=c(pt,2),ht=e=>{var n=Ge(),i=t(n),s=t(i),l=o(s,!0),u=c(s),f=t(u),p=t(f),m=o(p,!0),h=c(p);a(h,17,()=>g(M),e=>e.id,(e,t)=>{var n=He(),i=o(n,!0);r(()=>D(i,g(t).name)),O(e,n)}),_(f),_(u);var v=c(u);a(v,21,()=>g(tt),e=>e.t,(e,n)=>{var i=We(),s=t(i),l=o(s,!0),u=c(s);a(u,17,()=>g(n).cells,d,(e,t)=>{var n=Ue(),i=o(n,!0);r(e=>D(i,e),[()=>g(t)===void 0?``:P(g(t))]),O(e,n)}),_(i),r(e=>D(l,e),[()=>F(g(n).t)]),O(e,i)}),_(v),_(i),_(n),r(e=>{D(l,e),D(m,g(j).time)},[()=>g(j).table(y.label)]),O(e,n)};E(mt,e=>{g(le)||e(ht)}),_(nt),r(()=>{l(lt,`id`,`${C}-summary`),n(lt,1,s([`summary`,!ae()&&`hidden`]),`svelte-iga5bf`),D(ut,g(et)),l(dt,`id`,`${C}-hint`),D(ft,g(j).keyboardHint)}),O(e,nt),p()}var Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke;function W(){return(W=e((()=>{ne(),w(),F(),P(),Te(),Ee={roleDescription:`Diagramm`,keyboardHint:`Pfeiltasten links und rechts gehen die Werte durch, oben und unten wechseln die Reihe, Pos1 und Ende springen an die Enden.`,empty:`Noch keine Werte`,loading:`Werte werden geladen`,time:`Zeit`,reading:e=>`${e}`,table:e=>`${e}: alle Werte`,summary:({from:e,to:t,series:n})=>`Liniendiagramm mit ${n.length===1?`einer Reihe`:`${n.length} Reihen`}, ${e} bis ${t}. `+n.map(e=>`${e.name}: ${e.min} bis ${e.max}, zuletzt ${e.last}.`).join(` `),point:({series:e,time:t,value:n,index:r,count:i})=>`${e}, ${t}: ${n}. Punkt ${r} von ${i}.`},De=new Set([`$$slots`,`$$events`,`$$legacy`,`label`,`series`,`loading`,`height`,`xMode`,`xLabel`,`yLabel`,`unit`,`yMin`,`yMax`,`locale`,`formatValue`,`formatTime`,`summary`,`showSummary`,`legend`,`labels`,`class`]),Oe=C(`<li class="svelte-iga5bf"><svg width="14" height="14" viewBox="-7 -7 14 14" aria-hidden="true" focusable="false" class="svelte-iga5bf"><path></path></svg> </li>`),ke=C(`<ul class="legend svelte-iga5bf"></ul>`),Ae=C(`<div class="state svelte-iga5bf"><!></div>`),je=C(`<div class="state svelte-iga5bf" role="img"><p class="svelte-iga5bf"> </p></div>`),Me=k(`<text class="axis-label svelte-iga5bf"> </text>`),Ne=k(`<line class="grid svelte-iga5bf"></line><text class="tick svelte-iga5bf" text-anchor="end" dominant-baseline="middle"> </text>`,1),Pe=k(`<text class="tick svelte-iga5bf" text-anchor="middle"> </text>`),Fe=k(`<text class="axis-label svelte-iga5bf" text-anchor="end"> </text>`),Ie=k(`<path></path>`),Le=k(`<path class="line svelte-iga5bf"></path><!>`,1),Re=k(`<g class="cursor svelte-iga5bf"><line class="svelte-iga5bf"></line></g><g class="cursor svelte-iga5bf"><path class="ring svelte-iga5bf"></path><path></path></g>`,1),ze=C(`<div class="readout svelte-iga5bf" aria-hidden="true"><span class="readout-name svelte-iga5bf"> </span> <span class="readout-time svelte-iga5bf"> </span> <strong> </strong></div>`),Be=k(`<svg aria-hidden="true" focusable="false" class="svelte-iga5bf"><!><!><!><!><!><!></svg><!>`,1),Ve=C(`<div class="plot svelte-iga5bf" role="application" tabindex="0"><!></div>`),He=C(`<th scope="col"> </th>`),Ue=C(`<td> </td>`),We=C(`<tr><th scope="row"> </th><!></tr>`),Ge=C(`<div class="hidden svelte-iga5bf"><table><caption> </caption><thead><tr><th scope="col"> </th><!></tr></thead><tbody></tbody></table></div>`),Ke=C(`<div><!> <!> <p> </p> <p class="hidden svelte-iga5bf"> </p> <!> <!></div>`),re([`keydown`,`pointermove`,`pointerdown`]),U.__docgen={data:[{name:`label`,visibility:`public`,description:`Accessible name of the chart, e.g. the feed ("Temperatur"). Not shown: the card titles it.`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`series`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`array`,text:`LineChartSeries[]`},static:!1,readonly:!1,defaultValue:`[]`},{name:`loading`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`height`,visibility:`public`,description:`Height of the plot in px, or "fill": the chart (legend included) fills the height its
container gives it, so a taller card is a taller chart. The width always follows the container.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`number`,text:`number`},{kind:`const`,type:`string`,value:`fill`,text:`"fill"`}],text:`number | "fill"`},static:!1,readonly:!1,defaultValue:`240`},{name:`xMode`,visibility:`public`,description:`What the x axis counts: "time" places readings at their real time (gaps stay visible),
"index" places the nth reading of each series at n, evenly spaced.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`time`,text:`"time"`},{kind:`const`,type:`string`,value:`index`,text:`"index"`}],text:`"time" | "index"`},static:!1,readonly:!1,defaultValue:`"time"`},{name:`xLabel`,visibility:`public`,description:`Caption of the x axis, at its right end ("Zeit", "Messung").`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`yLabel`,visibility:`public`,description:`Caption of the value axis, above it ("°C", "Lautstärke").`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`unit`,visibility:`public`,description:`Appended to values by the default value format ("°C").`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`yMin`,visibility:`public`,description:`Fix the ends of the value axis (a sensor's range); values outside are drawn at the edge.`,keywords:[],kind:`let`,type:{kind:`type`,type:`number`,text:`number`},static:!1,readonly:!1},{name:`yMax`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`number`,text:`number`},static:!1,readonly:!1},{name:`locale`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"de-DE"`},{name:`formatValue`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`(value: number) => string`},static:!1,readonly:!1},{name:`formatTime`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`(time: number) => string`},static:!1,readonly:!1},{name:`summary`,visibility:`public`,description:`Replaces the generated text summary (the chart's description).`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`showSummary`,visibility:`public`,description:`Shows the summary under the plot too; by default it is for assistive tech only.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`legend`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`true`},{name:`labels`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`object`,text:`Partial<LineChartLabels>`},static:!1,readonly:!1,defaultValue:`...`}],name:`LineChart.svelte`}})))()}function G(e,t,n,r=24,i=[]){let a=[];for(let o=0;o<r;o++){if(i.includes(o))continue;let r=t+n*Math.sin((o+e)/3)+(e*7+o*13)%5*.15;a.push({t:q+o*J+e*2e4,v:Math.round(r*10)/10})}return a}function K(e,n){m(n,!0);var r=$e(),a=S(r);Xe(a,{name:`Spielwiese`,template:(e,n=y)=>{var r=Ze();U(t(r),T(n)),_(r),O(e,r)},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<div class="widget" data-theme="dark" style="max-width: 40rem">
	<LineChart {...args} />
</div>`}}});var o=c(a,2);Xe(o,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Patterns" title="LineChart">
	{#snippet lead()}
		Verlauf eines Feeds über die Zeit, eine Linie pro Gerät. Gebaut für die dunklen Kacheln des
		IoT-Dashboards: jede Reihe hat eine der sechs Datenfarben, eine eigene Markerform und ihren
		Namen in der Legende. Wer nicht sieht, bekommt dieselben Werte als Zusammenfassung, mit dem
		Tastatur-Cursor und als Tabelle.
	{/snippet}

	<section>
		<h2>Aufbau</h2>
		<p class="section-intro">
			Legende oben, darunter die Fläche mit drei bis sechs Wertelinien und Uhrzeiten auf runden
			Schritten. Eine Lücke in den Daten (Wetterstation, 14:45 bis 14:55) bleibt eine Lücke. In
			die Fläche tabben und mit den Pfeiltasten die Werte durchgehen; die Maus zeigt den nächsten
			Punkt.
		</p>
		<article class="widget wide" data-theme="dark">
			<header>
				<h3>Temperatur</h3>
				<Badge>4 Geräte</Badge>
			</header>
			<LineChart label="Temperatur" series={four} unit="°C" />
		</article>
	</section>

	<section>
		<h2>Zustände</h2>
		<div class="grid">
			<article class="widget" data-theme="dark">
				<header><h3>Leer</h3></header>
				<LineChart label="Lautstärke" series={[]} height={160} />
			</article>
			<article class="widget" data-theme="dark">
				<header><h3>Lädt</h3></header>
				<LineChart label="Licht" loading height={160} />
			</article>
			<article class="widget" data-theme="dark">
				<header>
					<h3>Eine Reihe</h3>
					<Badge swatch={colourOf(one[0].slot as SeriesSlot)}>Wetterstation</Badge>
				</header>
				<LineChart
					label="Temperatur Wetterstation"
					series={one}
					unit="°C"
					height={160}
					legend={false}
				/>
			</article>
		</div>
	</section>

	<section>
		<h2>Sechs Reihen</h2>
		<p class="section-intro">
			Mehr als sechs Reihen zeigt ein Diagramm nicht: ab der siebten wiederholen sich Farben und
			Formen. Bei mehr Geräten filtert die App (Chips über der Kachel).
		</p>
		<article class="widget wide" data-theme="dark">
			<header><h3>Temperatur, alle Räume</h3></header>
			<LineChart label="Temperatur, alle Räume" series={six} unit="°C" height={280} />
		</article>
	</section>

	<section>
		<h2>In der Dashboard-Kachel</h2>
		<p class="section-intro">
			Mit <code>height="fill"</code> füllt das Diagramm samt Legende die Höhe, die die Kachel ihm
			lässt: eine höhere Kachel ist ein höheres Diagramm, nichts scrollt. Die linke Kachel lässt
			sich an der Ecke unten rechts größer ziehen. Rechts zählt die x-Achse nach Messung statt
			nach Uhrzeit (<code>xMode="index"</code>): die n-te Messung jedes Geräts steht bei n,
			gleichmäßig verteilt. <code>xLabel</code> und <code>yLabel</code> beschriften die Achsen.
		</p>
		<div class="tiles">
			<article class="widget tile resizable" data-theme="dark">
				<header><h3>Temperatur</h3></header>
				<LineChart label="Temperatur" series={four.slice(0, 2)} unit="°C" height="fill" />
			</article>
			<article class="widget tile" data-theme="dark">
				<header><h3>Temperatur nach Messung</h3></header>
				<LineChart
					label="Temperatur nach Messung"
					series={withSlots(
						devices.slice(0, 2).map((d) => ({ ...d, points: d.points.slice(0, 12) }))
					)}
					height="fill"
					xMode="index"
					xLabel="Messung"
					yLabel="°C"
				/>
			</article>
		</div>
	</section>

	<section>
		<h2>Lange deutsche Namen</h2>
		<p class="section-intro">
			Namen in der Legende brechen um statt abgeschnitten zu werden; auch eine schmale Kachel
			zeigt jeden Namen ganz.
		</p>
		<article class="widget narrow" data-theme="dark">
			<header><h3>Messwerte</h3></header>
			<LineChart label="Messwerte" series={longNames} unit="°C" height={200} />
		</article>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklem Band</h2>
		<p class="section-intro">
			Für die Vollbildansicht oder den Beamer ohne Kachel, mit sichtbarer Zusammenfassung (<code
				>showSummary</code
			>).
		</p>
		<LineChart label="Temperatur" series={four} unit="°C" height={320} showSummary />
	</section>

	<section>
		<h2>Barrierefreiheit</h2>
		<p class="section-intro">
			Die Fläche ist ein Tab-Stopp (<code>role="application"</code>, „Diagramm“) mit dem
			<code>label</code> als Namen. Ihre Beschreibung ist eine Textzusammenfassung (Zeitraum, je
			Reihe kleinster, größter und letzter Wert) plus die Tastenhilfe; mit <code>summary</code>
			kann die App eine eigene setzen. Links/Rechts gehen die Punkte einer Reihe durch, Oben/Unten wechseln
			die Reihe zum gleichen Zeitpunkt, Pos1/Ende und Bild auf/ab springen; jeder Punkt wird über eine
			LiveRegion angesagt und oben in der Fläche gezeigt. Escape nimmt den Cursor weg. Eine versteckte
			Tabelle enthält alle Werte. Der Cursor gleitet mit
			<code>--cui-duration-fast</code>; bei reduzierter Bewegung springt er.
		</p>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Nur auf dunklen Flächen (data-theme="dark"): dafür sind die sechs Datenfarben gemacht.',
				'Farben nach Seriennummer vergeben (assignSeriesSlots) und die Zuordnung halten, damit ein Gerät seine Farbe behält.',
				'Einheit über unit oder formatValue mitgeben; sie steht in Ansage und Tabelle.',
				'label nennt den Feed, so wie er im Kachel-Titel steht.'
			]}
			donts={[
				'Keine Status- oder Identitätsfarben für Reihen: Grün heißt „online“, nicht „Gerät 3“.',
				'Nicht mehr als sechs Reihen gleichzeitig.',
				'Keine Werte nur in der Grafik: was die App zusätzlich zeigt, gehört in summary.'
			]}
			notFor={[
				'Ein einzelner aktueller Wert: Readout-Zahl in der Kachel.',
				'Fortschritt oder Anteil: ProgressBar.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,n)=>{ue(e,{eyebrow:`Patterns`,title:`LineChart`,lead:e=>{ae();var t=ie(`Verlauf eines Feeds über die Zeit, eine Linie pro Gerät. Gebaut für die dunklen Kacheln des
			IoT-Dashboards: jede Reihe hat eine der sechs Datenfarben, eine eigene Markerform und ihren
			Namen in der Legende. Wer nicht sieht, bekommt dieselben Werte als Zusammenfassung, mit dem
			Tastatur-Cursor und als Tabelle.`);O(e,t)},children:(e,n)=>{var r=Qe(),a=S(r),o=c(t(a),4),s=t(o),l=c(t(s),2);pe(l,{children:(e,t)=>{ae();var n=ie(`4 Geräte`);O(e,n)},$$slots:{default:!0}}),_(s),U(c(s,2),{label:`Temperatur`,get series(){return Z},unit:`°C`}),_(o),_(a);var u=c(a,2),d=c(t(u),2),f=t(d);U(c(t(f),2),{label:`Lautstärke`,series:[],height:160}),_(f);var p=c(f,2);U(c(t(p),2),{label:`Licht`,loading:!0,height:160}),_(p);var m=c(p,2),h=t(m),v=c(t(h),2);{let e=i(()=>R(Je[0].slot));pe(v,{get swatch(){return g(e)},children:(e,t)=>{ae();var n=ie(`Wetterstation`);O(e,n)},$$slots:{default:!0}})}_(h),U(c(h,2),{label:`Temperatur Wetterstation`,get series(){return Je},unit:`°C`,height:160,legend:!1}),_(m),_(d),_(u);var y=c(u,2),ee=c(t(y),4);U(c(t(ee),2),{label:`Temperatur, alle Räume`,get series(){return Q},unit:`°C`,height:280}),_(ee),_(y);var te=c(y,2),b=c(t(te),4),x=t(b),C=c(t(x),2);{let e=i(()=>Z.slice(0,2));U(C,{label:`Temperatur`,get series(){return g(e)},unit:`°C`,height:`fill`})}_(x);var ne=c(x,2),re=c(t(ne),2);{let e=i(()=>X(Y.slice(0,2).map(e=>({...e,points:e.points.slice(0,12)}))));U(re,{label:`Temperatur nach Messung`,get series(){return g(e)},height:`fill`,xMode:`index`,xLabel:`Messung`,yLabel:`°C`})}_(ne),_(b),_(te);var w=c(te,2),T=c(t(w),4);U(c(t(T),2),{label:`Messwerte`,get series(){return $},unit:`°C`,height:200}),_(T),_(w);var E=c(w,2);U(c(t(E),4),{label:`Temperatur`,get series(){return Z},unit:`°C`,height:320,showSummary:!0}),_(E);var D=c(E,4),k=c(t(D),2);de(k,{dos:[`Nur auf dunklen Flächen (data-theme="dark"): dafür sind die sechs Datenfarben gemacht.`,`Farben nach Seriennummer vergeben (assignSeriesSlots) und die Zuordnung halten, damit ein Gerät seine Farbe behält.`,`Einheit über unit oder formatValue mitgeben; sie steht in Ansage und Tabelle.`,`label nennt den Feed, so wie er im Kachel-Titel steht.`],donts:[`Keine Status- oder Identitätsfarben für Reihen: Grün heißt „online“, nicht „Gerät 3“.`,`Nicht mehr als sechs Reihen gleichzeitig.`,`Keine Werte nur in der Grafik: was die App zusätzlich zeigt, gehört in summary.`],notFor:[`Ein einzelner aktueller Wert: Readout-Zahl in der Kachel.`,`Fortschritt oder Anteil: ProgressBar.`]}),_(D),O(e,r)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),O(e,r),p()}var q,J,Y,qe,X,Z,Q,Je,$,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt;function it(){return(it=e((()=>{ne(),se(),N(),le(),fe(),W(),Te(),w(),ce(),q=new Date(2026,10,2,14,0).getTime(),J=3e5,Y=[{id:`A1`,name:`Calliope 1`,points:G(0,21,1.2)},{id:`B2`,name:`Calliope 2`,points:G(2,19.5,1.6)},{id:`C3`,name:`Wetterstation`,points:G(5,17,2.4,24,[9,10,11])},{id:`D4`,name:`Calliope 4`,points:G(8,23,.8)},{id:`E5`,name:`Gewächshaus`,points:G(11,26,1.4)},{id:`F6`,name:`Klasse 7b`,points:G(14,15,1.1)}],qe=I(Y.map(e=>e.id)),X=e=>e.map(e=>({...e,slot:qe.get(e.id)})),Z=X(Y.slice(0,4)),Q=X(Y),Je=X(Y.slice(2,3)),$=X([{...Y[0],name:`Temperaturmessstation Schulhof Nord`},{...Y[1],name:`Bodenfeuchtigkeitssensor Gewächshaus`},{...Y[3],name:`Klassenzimmerluftqualitätsmessgerät`}]),Ye={title:`Patterns/LineChart`,component:U,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Temperatur`,series:Z,unit:`°C`,height:240,loading:!1,legend:!0,showSummary:!1},argTypes:{series:{control:!1},height:{control:{type:`range`,min:120,max:400,step:20}}}},{Story:Xe}=j(Ye),Ze=C(`<div class="widget svelte-1to5758" data-theme="dark" style="max-width: 40rem"><!></div>`),Qe=C(`<section><h2>Aufbau</h2> <p class="section-intro">Legende oben, darunter die Fläche mit drei bis sechs Wertelinien und Uhrzeiten auf runden
				Schritten. Eine Lücke in den Daten (Wetterstation, 14:45 bis 14:55) bleibt eine Lücke. In
				die Fläche tabben und mit den Pfeiltasten die Werte durchgehen; die Maus zeigt den nächsten
				Punkt.</p> <article class="widget wide svelte-1to5758" data-theme="dark"><header class="svelte-1to5758"><h3 class="svelte-1to5758">Temperatur</h3> <!></header> <!></article></section> <section><h2>Zustände</h2> <div class="grid svelte-1to5758"><article class="widget svelte-1to5758" data-theme="dark"><header class="svelte-1to5758"><h3 class="svelte-1to5758">Leer</h3></header> <!></article> <article class="widget svelte-1to5758" data-theme="dark"><header class="svelte-1to5758"><h3 class="svelte-1to5758">Lädt</h3></header> <!></article> <article class="widget svelte-1to5758" data-theme="dark"><header class="svelte-1to5758"><h3 class="svelte-1to5758">Eine Reihe</h3> <!></header> <!></article></div></section> <section><h2>Sechs Reihen</h2> <p class="section-intro">Mehr als sechs Reihen zeigt ein Diagramm nicht: ab der siebten wiederholen sich Farben und
				Formen. Bei mehr Geräten filtert die App (Chips über der Kachel).</p> <article class="widget wide svelte-1to5758" data-theme="dark"><header class="svelte-1to5758"><h3 class="svelte-1to5758">Temperatur, alle Räume</h3></header> <!></article></section> <section><h2>In der Dashboard-Kachel</h2> <p class="section-intro">Mit <code>height="fill"</code> füllt das Diagramm samt Legende die Höhe, die die Kachel ihm
				lässt: eine höhere Kachel ist ein höheres Diagramm, nichts scrollt. Die linke Kachel lässt
				sich an der Ecke unten rechts größer ziehen. Rechts zählt die x-Achse nach Messung statt
				nach Uhrzeit (<code>xMode="index"</code>): die n-te Messung jedes Geräts steht bei n,
				gleichmäßig verteilt. <code>xLabel</code> und <code>yLabel</code> beschriften die Achsen.</p> <div class="tiles svelte-1to5758"><article class="widget tile resizable svelte-1to5758" data-theme="dark"><header class="svelte-1to5758"><h3 class="svelte-1to5758">Temperatur</h3></header> <!></article> <article class="widget tile svelte-1to5758" data-theme="dark"><header class="svelte-1to5758"><h3 class="svelte-1to5758">Temperatur nach Messung</h3></header> <!></article></div></section> <section><h2>Lange deutsche Namen</h2> <p class="section-intro">Namen in der Legende brechen um statt abgeschnitten zu werden; auch eine schmale Kachel
				zeigt jeden Namen ganz.</p> <article class="widget narrow svelte-1to5758" data-theme="dark"><header class="svelte-1to5758"><h3 class="svelte-1to5758">Messwerte</h3></header> <!></article></section> <section data-theme="dark" class="dark-band svelte-1to5758"><h2>Auf dunklem Band</h2> <p class="section-intro">Für die Vollbildansicht oder den Beamer ohne Kachel, mit sichtbarer Zusammenfassung (<code>showSummary</code>).</p> <!></section> <section><h2>Barrierefreiheit</h2> <p class="section-intro">Die Fläche ist ein Tab-Stopp (<code>role="application"</code>, „Diagramm“) mit dem <code>label</code> als Namen. Ihre Beschreibung ist eine Textzusammenfassung (Zeitraum, je
				Reihe kleinster, größter und letzter Wert) plus die Tastenhilfe; mit <code>summary</code> kann die App eine eigene setzen. Links/Rechts gehen die Punkte einer Reihe durch, Oben/Unten wechseln
				die Reihe zum gleichen Zeitpunkt, Pos1/Ende und Bild auf/ab springen; jeder Punkt wird über eine
				LiveRegion angesagt und oben in der Fläche gezeigt. Escape nimmt den Cursor weg. Eine versteckte
				Tabelle enthält alle Werte. Der Cursor gleitet mit <code>--cui-duration-fast</code>; bei reduzierter Bewegung springt er.</p></section> <section><h2>Richtlinien</h2> <!></section>`,1),$e=C(`<!> <!>`,1),K.__docgen={data:[],name:`LineChart.stories.svelte`},et=M(K,Ye),tt=[`Spielwiese`,`Übersicht`],nt={...et.Spielwiese,tags:[`svelte-csf-v5`]},rt={...et.Übersicht,tags:[`svelte-csf-v5`]}})))()}it();export{nt as Spielwiese,tt as __namedExportsOrder,Ye as default,rt as Übersicht};