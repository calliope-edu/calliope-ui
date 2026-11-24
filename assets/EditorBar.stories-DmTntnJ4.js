import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Gt as r,H as i,Nt as a,Pt as o,S as s,Ut as c,Vt as l,Xt as u,Zt as d,bt as f,cn as p,ct as m,fn as h,jt as g,lt as _,mn as v,n as y,o as b,pt as x,rt as S,sn as C,st as w,un as T,zt as E}from"./iframe-BsWRsydk.js";import{i as D,n as O,r as k,t as A}from"./create-runtime-stories-BWVMXit6.js";import{n as j,t as ee}from"./Menu-CTLJCgcZ.js";import{i as M,n as N,r as te,t as ne}from"./MenuRadioItem-mnsUvDOZ.js";import{n as P,t as F}from"./IconButton-DZwsdOXG.js";import{n as I,t as re}from"./Popover-Cfrtd_V2.js";import{n as ie,t as L}from"./Button-BP41bGzH.js";import{n as ae,t as R}from"./SegmentedControl-CIk5WKUi.js";function z(e,_){d(_,!0);let v=(e,l=h,u,d)=>{let _=c(()=>T(u?.(),!1)),v=c(()=>T(d?.(),`subtle`));var k=q(),j=o(t(k),2);i(j,20,()=>[`bar`,`pill`],e=>e,(e,t)=>{{let n=r(()=>f(_)?f(y):`blocks`);R(e,{label:`Programmiersprache`,get variant(){return t},size:`s`,get options(){return H},get value(){return f(n)},onValueChange:e=>f(_)&&E(y,e,!0)})}}),p(j);var M=o(j,2),N=t(M);{let e=r(()=>f(_)&&f(O)?`Wird geteilt…`:`Programm teilen`),t=r(()=>f(_)&&f(O)),n=r(()=>f(_)?A:void 0);F(N,{variant:`bar`,icon:`share`,get label(){return f(e)},get loading(){return f(t)},get onclick(){return f(n)}})}var P=o(N,2);re(P,{title:`Erweiterungen`,side:`bottom`,align:`end`,size:`l`,trigger:(e,t)=>{L(e,b(()=>t?.().props,{variant:`bar`,iconEnd:`chevron-down`,children:(e,t)=>{C();var r=x();n(()=>S(r,`${W.length??``} Erweiterungen`)),w(e,r)},$$slots:{default:!0}}))},children:(e,r)=>{var s=K();i(s,21,()=>W,e=>e.name,(e,r)=>{var i=G(),s=t(i),c=a(s,!0),l=o(s,2),u=a(l,!0);p(i),n(()=>{S(c,f(r).name),S(u,f(r).source)}),w(e,i)}),p(s),w(e,s)},$$slots:{trigger:!0,default:!0}});var I=o(P,2);ee(I,{align:`end`,trigger:(e,t)=>{L(e,b(()=>t?.().props,{variant:`bar`,iconEnd:`chevron-down`,children:(e,t)=>{C();var r=x();n(()=>S(r,`Calliope mini ${(f(_)?f(D):`3`)??``}`)),w(e,r)},$$slots:{default:!0}}))},children:(e,t)=>{{let t=r(()=>f(_)?f(D):`3`);te(e,{label:`Calliope mini`,get value(){return f(t)},onValueChange:e=>f(_)&&E(D,e,!0),children:(e,t)=>{var r=m(),a=g(r);i(a,16,()=>[`1`,`2`,`3`],e=>e,(e,t)=>{ne(e,{get value(){return t},children:(e,r)=>{C();var i=x();n(()=>S(i,`Calliope mini ${t??``}`)),w(e,i)},$$slots:{default:!0}})}),w(e,r)},$$slots:{default:!0}})}},$$slots:{trigger:!0,default:!0}}),p(M),p(k),n(()=>{s(k,`data-theme`,l()),s(k,`data-surface`,f(v))}),w(e,k)},y=l(`blocks`),D=l(`3`),O=l(!1),k=l(`dashboard`);function A(){E(O,!0),setTimeout(()=>E(O,!1),1500)}V(e,{name:`MakeCode und IoT`,asChild:!0,children:(e,r)=>{var a=Y(),c=o(t(a),6);v(c,()=>void 0,()=>!0);var l=o(c,6),u=t(l);v(u,()=>`light`);var d=o(u,2);v(d,()=>`dark`),p(l);var m=o(l,6),h=t(m),g=t(h);v(g,()=>`light`,()=>!1,()=>`default`),p(h);var _=o(h,2),y=t(_);v(y,()=>`dark`,()=>!1,()=>`page`),p(_),p(m);var b=o(m,4);i(b,20,()=>[`light`,`dark`],e=>e,(e,r)=>{var i=J(),a=o(t(i),2),c=t(a);R(c,{label:`Ansicht`,variant:`bar`,size:`s`,get options(){return U},get value(){return f(k)},set value(e){E(k,e,!0)}});var l=o(c,2);R(l,{label:`Ansicht`,variant:`pill`,size:`s`,get options(){return U},get value(){return f(k)},set value(e){E(k,e,!0)}}),p(a);var u=o(a,2),d=t(u);L(d,{variant:`bar`,icon:`add`,children:(e,t)=>{C();var n=x(`Neues Programm`);w(e,n)},$$slots:{default:!0}});var m=o(d,2);L(m,{variant:`bar`,iconEnd:`chevron-down`,children:(e,t)=>{C();var n=x(`Token`);w(e,n)},$$slots:{default:!0}}),p(u),p(i),n(()=>s(i,`data-theme`,r)),w(e,i)}),p(b),p(a),w(e,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="page">
	<header>
		<p class="eyebrow">Rezept</p>
		<h1>Editor-Leiste</h1>
		<p class="lead">
			Die Leiste über einem eingebetteten Editor: in der Mitte der Umschalter als Pille (<code
				>SegmentedControl variant="pill"</code
			>), rechts die Leisten-Buttons (<code>Button variant="bar"</code>, Teilen als
			<code>IconButton variant="bar"</code>). Die Leiste selbst ist <code>surface.subtle</code>
			und folgt dem Theme der Seite; <code>data-surface="subtle"</code> malt sie und sagt den Leisten-Buttons,
			dass sie auf Grau stehen. Die Buttons nehmen das jeweils andere Neutral: weiß auf der grauen,
			schwarz auf der dunkelgrauen Leiste. Steht die Leiste auf der Seite oder einer Karte (ohne Attribut),
			werden sie grau auf Weiß und dunkelgrau auf Schwarz.
		</p>
		<p class="lead">
			Zum Vergleich steht links neben der Pille <code>SegmentedControl variant="bar"</code>: die
			Pille in der Fläche der Leisten-Buttons, die Wahl schwarz (hell) bzw. weiß (dunkel).
		</p>
	</header>

	<h2>MakeCode</h2>
	<p class="note">Folgt dem Theme der Seite (Umschalter oben in der Werkzeugleiste).</p>
	{@render makecodeBar(undefined, true)}

	<h2>Auf grauer Leiste</h2>
	<p class="note">
		<code>data-surface="subtle"</code>: weiß auf Grau (hell), schwarz auf Dunkelgrau (dunkel).
	</p>
	<div class="stack">
		{@render makecodeBar('light')}
		{@render makecodeBar('dark')}
	</div>

	<h2>Auf weißer und schwarzer Fläche</h2>
	<p class="note">
		Ohne Attribut oder mit <code>data-surface="default"</code> / <code>"page"</code>: grau auf
		Weiß (hell), dunkelgrau auf Schwarz (dunkel).
	</p>
	<div class="stack">
		<div class="frame" data-theme="light">{@render makecodeBar('light', false, 'default')}</div>
		<div class="frame" data-theme="dark">{@render makecodeBar('dark', false, 'page')}</div>
	</div>

	<h2>IoT-Dashboard</h2>
	<div class="stack">
		{#each ['light', 'dark'] as const as theme (theme)}
			<div class="editor-bar" data-theme={theme} data-surface="subtle">
				<div class="bar-start"><span class="bar-title">Klimaprojekt 7b</span></div>
				<div class="switches">
					<SegmentedControl
						label="Ansicht"
						variant="bar"
						size="s"
						options={views}
						bind:value={view}
					/>
					<SegmentedControl
						label="Ansicht"
						variant="pill"
						size="s"
						options={views}
						bind:value={view}
					/>
				</div>
				<div class="bar-end">
					<Button variant="bar" icon="add">Neues Programm</Button>
					<Button variant="bar" iconEnd="chevron-down">Token</Button>
				</div>
			</div>
		{/each}
	</div>
</div>`}}}),u()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{v(),D(),ie(),P(),j(),M(),N(),I(),ae(),y(),O(),B={title:`Rezepte/Editor-Leiste`,parameters:{layout:`fullscreen`,docs:{description:{component:``}}}},{Story:V}=k(B),H=[{value:`blocks`,label:`Blöcke`},{value:`javascript`,label:`JavaScript`},{value:`python`,label:`Python`}],U=[{value:`dashboard`,label:`Dashboard`},{value:`feeds`,label:`Feeds`}],W=[{name:`iot`,source:`calliope-edu/pxt-iot`},{name:`neopixel`,source:`microsoft/pxt-neopixel`}],G=_(`<li class="svelte-ti9gcy"><span class="extension-name svelte-ti9gcy"> </span> <span class="extension-source svelte-ti9gcy"> </span></li>`),K=_(`<ul class="extensions svelte-ti9gcy"></ul>`),q=_(`<div class="editor-bar svelte-ti9gcy"><div class="bar-start"></div> <div class="switches svelte-ti9gcy"></div> <div class="bar-end svelte-ti9gcy"><!> <!> <!></div></div>`),J=_(`<div class="editor-bar svelte-ti9gcy" data-surface="subtle"><div class="bar-start"><span class="bar-title svelte-ti9gcy">Klimaprojekt 7b</span></div> <div class="switches svelte-ti9gcy"><!> <!></div> <div class="bar-end svelte-ti9gcy"><!> <!></div></div>`),Y=_(`<div class="page svelte-ti9gcy"><header><p class="eyebrow svelte-ti9gcy">Rezept</p> <h1 class="svelte-ti9gcy">Editor-Leiste</h1> <p class="lead svelte-ti9gcy">Die Leiste über einem eingebetteten Editor: in der Mitte der Umschalter als Pille (<code>SegmentedControl variant="pill"</code>), rechts die Leisten-Buttons (<code>Button variant="bar"</code>, Teilen als <code>IconButton variant="bar"</code>). Die Leiste selbst ist <code>surface.subtle</code> und folgt dem Theme der Seite; <code>data-surface="subtle"</code> malt sie und sagt den Leisten-Buttons,
				dass sie auf Grau stehen. Die Buttons nehmen das jeweils andere Neutral: weiß auf der grauen,
				schwarz auf der dunkelgrauen Leiste. Steht die Leiste auf der Seite oder einer Karte (ohne Attribut),
				werden sie grau auf Weiß und dunkelgrau auf Schwarz.</p> <p class="lead svelte-ti9gcy">Zum Vergleich steht links neben der Pille <code>SegmentedControl variant="bar"</code>: die
				Pille in der Fläche der Leisten-Buttons, die Wahl schwarz (hell) bzw. weiß (dunkel).</p></header> <h2 class="svelte-ti9gcy">MakeCode</h2> <p class="note svelte-ti9gcy">Folgt dem Theme der Seite (Umschalter oben in der Werkzeugleiste).</p> <!> <h2 class="svelte-ti9gcy">Auf grauer Leiste</h2> <p class="note svelte-ti9gcy"><code>data-surface="subtle"</code>: weiß auf Grau (hell), schwarz auf Dunkelgrau (dunkel).</p> <div class="stack svelte-ti9gcy"><!> <!></div> <h2 class="svelte-ti9gcy">Auf weißer und schwarzer Fläche</h2> <p class="note svelte-ti9gcy">Ohne Attribut oder mit <code>data-surface="default"</code> / <code>"page"</code>: grau auf
			Weiß (hell), dunkelgrau auf Schwarz (dunkel).</p> <div class="stack svelte-ti9gcy"><div class="frame svelte-ti9gcy" data-theme="light"><!></div> <div class="frame svelte-ti9gcy" data-theme="dark"><!></div></div> <h2 class="svelte-ti9gcy">IoT-Dashboard</h2> <div class="stack svelte-ti9gcy"></div></div>`),z.__docgen={data:[],name:`EditorBar.stories.svelte`},X=A(z,B),Z=[`MakeCodeUndIoT`],Q={...X.MakeCodeUndIoT,tags:[`svelte-csf-v5`]}})))()}$();export{Q as MakeCodeUndIoT,Z as __namedExportsOrder,B as default};