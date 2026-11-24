import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Gt as r,Nt as i,Ot as a,Pt as o,S as s,Vt as c,Xt as l,Zt as u,a as d,bt as f,cn as p,et as m,fn as h,i as g,jt as _,lt as v,mn as y,n as b,o as x,pt as S,rt as C,sn as w,st as T,u as E,y as D,zt as O}from"./iframe-BsWRsydk.js";import{i as k,n as A,r as j,t as ee}from"./create-runtime-stories-BWVMXit6.js";import{i as te,n as ne,r as re,t as ie}from"./Guidelines-B4Q9fRhg.js";import{n as ae,t as oe}from"./Menu-CTLJCgcZ.js";import{n as se,t as M}from"./MenuItem-i0frKsX6.js";import{n as ce,t as N}from"./IconButton-DZwsdOXG.js";import{n as le,t as ue}from"./Button-BP41bGzH.js";import{n as de,t as fe}from"./SegmentedControl-CIk5WKUi.js";function P(e,n){u(n,!0);let r=g(n,`orientation`,3,`horizontal`),i=d(n,R),o=c(null),s=null;function h(){return f(o)?Array.from(f(o).querySelectorAll(F)).filter(e=>e.closest(`[role="toolbar"]`)===f(o)&&!e.closest(I)&&!e.matches(`:disabled`)&&!e.closest(`[hidden], [inert]`)):[]}function _(){let e=h();s&&e.includes(s)||(s=e[0]??null);for(let t of e)t.tabIndex=t===s?0:-1}a(()=>{if(!f(o))return;_();let e=new MutationObserver(_);return e.observe(f(o),{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`disabled`,`hidden`]}),()=>e.disconnect()});function v(e){n.onfocusin?.(e);let t=e.target;h().includes(t)&&(s=t,_())}function y(e){if(n.onkeydown?.(e),e.defaultPrevented)return;let t=e.target,i=h(),a=i.indexOf(t);if(a===-1)return;let[o,c]=r()===`vertical`?[`ArrowUp`,`ArrowDown`]:[`ArrowLeft`,`ArrowRight`],l=t.matches(L),u;if(e.key===c&&!l)u=(a+1)%i.length;else if(e.key===o&&!l)u=(a-1+i.length)%i.length;else if(e.key===`Home`&&!l)u=0;else if(e.key===`End`&&!l)u=i.length-1;else return;e.preventDefault(),s=i[u],_(),s.focus()}var b=z();D(b,()=>({class:`cui-toolbar`,role:`toolbar`,"aria-label":n.label,"aria-orientation":r(),"data-orientation":r(),...i,onkeydown:y,onfocusin:v}),void 0,void 0,void 0,`svelte-1st7dmr`);var x=t(b);m(x,()=>n.children),p(b),E(b,e=>O(o,e),()=>f(o)),T(e,b),l()}var F,I,L,R,z;function B(){return(B=e((()=>{y(),b(),F=`button, a[href], input, select, textarea, [tabindex]`,I=`[role="radiogroup"], [role="tablist"], [role="listbox"], [role="grid"]`,L=`input:not([type="checkbox"], [type="radio"], [type="button"]), textarea, select`,R=new Set([`$$slots`,`$$events`,`$$legacy`,`label`,`orientation`,`children`,`onkeydown`,`onfocusin`]),z=v(`<div><!></div>`),P.__docgen={data:[{name:`label`,visibility:`public`,description:`Required accessible name ("Programm", "Formatierung").`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`orientation`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`horizontal`,text:`"horizontal"`},{kind:`const`,type:`string`,value:`vertical`,text:`"vertical"`}],text:`"horizontal" | "vertical"`},static:!1,readonly:!1,defaultValue:`"horizontal"`},{name:`children`,visibility:`public`,description:`Buttons, IconButtons, Menu triggers, a SegmentedControl, ToolbarSeparator.`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`Toolbar.svelte`}})))()}function V(e,t){let r=g(t,`orientation`,3,`vertical`);var i=H();n(()=>s(i,`aria-orientation`,r())),T(e,i)}var H;function U(){return(U=e((()=>{y(),b(),H=v(`<div class="cui-toolbar-separator svelte-3i1ql6" role="separator"></div>`),V.__docgen={data:[{name:`orientation`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`horizontal`,text:`"horizontal"`},{kind:`const`,type:`string`,value:`vertical`,text:`"vertical"`}],text:`"horizontal" | "vertical"`},static:!1,readonly:!1,defaultValue:`"vertical"`}],name:`ToolbarSeparator.svelte`}})))()}function W(e,a){u(a,!0);let s=c(!1),d=c(`blocks`),m=c(`–`);var g=J(),v=_(g);K(v,{name:`Spielwiese`,template:(e,t=h)=>{{let n=r(()=>t().label??`Programm`);P(e,{get label(){return f(n)},get orientation(){return t().orientation},children:(e,n)=>{var i=q(),a=_(i);N(a,{icon:`play`,label:`Starten`});var s=o(a,2);N(s,{icon:`stop`,label:`Stoppen`});var c=o(s,2);{let e=r(()=>t().orientation===`vertical`?`horizontal`:`vertical`);V(c,{get orientation(){return f(e)}})}var l=o(c,2);N(l,{icon:`download`,label:`Herunterladen`});var u=o(l,2);N(u,{icon:`share`,label:`Teilen`}),T(e,i)},$$slots:{default:!0}})}},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Toolbar label={args.label ?? 'Programm'} orientation={args.orientation}>
	<IconButton icon="play" label="Starten" />
	<IconButton icon="stop" label="Stoppen" />
	<ToolbarSeparator orientation={args.orientation === 'vertical' ? 'horizontal' : 'vertical'} />
	<IconButton icon="download" label="Herunterladen" />
	<IconButton icon="share" label="Teilen" />
</Toolbar>`}}});var y=o(v,2);K(y,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Navigation" title="Toolbar">
	{#snippet lead()}
		Eine Leiste zusammengehöriger Werkzeuge mit nur einem Tab-Stopp: Tab springt in die Leiste und
		wieder heraus, die Pfeiltasten wandern darin, Pos1 und Ende springen an die Ränder. Das spart
		Schülerinnen und Schülern, die mit der Tastatur arbeiten, viele Tab-Schritte.
	{/snippet}

	<section>
		<h2>Editor-Leiste</h2>
		<p class="section-intro">
			Probier es: in die Leiste tabben, mit ← → wandern. Deaktivierte Buttons werden übersprungen,
			ein Menü-Auslöser öffnet mit Enter oder ↓.
		</p>
		<div class="frame">
			<Toolbar label="Programm">
				<Button size="s" icon={running ? 'stop' : 'play'} onclick={() => (running = !running)}>
					{running ? 'Stoppen' : 'Starten'}
				</Button>
				<IconButton icon="retry" label="Neu starten" size="s" disabled={!running} />
				<ToolbarSeparator />
				<IconButton
					icon="download"
					label="Herunterladen"
					size="s"
					onclick={() => (lastAction = 'Herunterladen')}
				/>
				<IconButton
					icon="share"
					label="Teilen"
					size="s"
					onclick={() => (lastAction = 'Teilen')}
				/>
				<Menu>
					{#snippet trigger({ props })}
						<IconButton {...props} icon="more" label="Weitere Aktionen" size="s" />
					{/snippet}
					<MenuItem icon="copy" onSelect={() => (lastAction = 'Duplizieren')}
						>Duplizieren</MenuItem
					>
					<MenuItem icon="edit" onSelect={() => (lastAction = 'Umbenennen')}>Umbenennen</MenuItem>
				</Menu>
			</Toolbar>
			<p class="hint">Zuletzt: {lastAction}</p>
		</div>
	</section>

	<section>
		<h2>Mit Ansichtswechsel</h2>
		<p class="section-intro">
			Ein SegmentedControl in der Leiste behält seinen eigenen Tab-Stopp und seine Pfeiltasten
			(eine Radiogruppe): Tab erreicht ihn, ← → wechseln darin die Ansicht.
		</p>
		<div class="frame">
			<Toolbar label="Editor">
				<SegmentedControl
					label="Ansicht"
					size="s"
					options={[
						{ value: 'blocks', label: 'Blöcke' },
						{ value: 'python', label: 'Python' }
					]}
					bind:value={view}
				/>
				<ToolbarSeparator />
				<IconButton icon="help" label="Hilfe" size="s" />
				<IconButton icon="settings" label="Einstellungen" size="s" />
			</Toolbar>
		</div>
	</section>

	<section>
		<h2>Senkrecht</h2>
		<p class="section-intro">Am Rand einer Arbeitsfläche; hier wandern ↑ ↓.</p>
		<div class="frame narrow">
			<Toolbar label="Ansicht" orientation="vertical">
				<IconButton icon="fullscreen" label="Vollbild" />
				<IconButton icon="expand" label="Vergrößern" />
				<IconButton icon="collapse" label="Verkleinern" />
				<ToolbarSeparator orientation="horizontal" />
				<IconButton icon="settings" label="Einstellungen" />
			</Toolbar>
		</div>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Toolbar label="Serielle Ausgabe">
			<IconButton icon="pause" label="Anhalten" size="s" />
			<IconButton icon="delete" label="Leeren" size="s" />
			<ToolbarSeparator />
			<IconButton icon="download" label="Als CSV herunterladen" size="s" />
		</Toolbar>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'label nennt, wofür die Leiste ist („Programm“, „Serielle Ausgabe“).',
				'Jeder Icon-Button hat ein label; der Tooltip zeigt es.',
				'Gruppen mit ToolbarSeparator trennen.'
			]}
			donts={[
				'Keine einzelnen Buttons als Toolbar: ab etwa drei Werkzeugen lohnt sie sich.',
				'Keine Textfelder als Hauptinhalt: dort gehören die Pfeiltasten dem Feld.'
			]}
			notFor={[
				'Navigation zwischen Seiten: Links oder Tabs.',
				'Eine Auswahl aus zwei bis vier Ansichten allein: SegmentedControl.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,a)=>{re(e,{eyebrow:`Navigation`,title:`Toolbar`,lead:e=>{w();var t=S(`Eine Leiste zusammengehöriger Werkzeuge mit nur einem Tab-Stopp: Tab springt in die Leiste und
			wieder heraus, die Pfeiltasten wandern darin, Pos1 und Ende springen an die Ränder. Das spart
			Schülerinnen und Schülern, die mit der Tastatur arbeiten, viele Tab-Schritte.`);T(e,t)},children:(e,a)=>{var c=Z(),l=_(c),u=o(t(l),4),h=t(u);P(h,{label:`Programm`,children:(e,t)=>{var i=Y(),a=_(i);{let e=r(()=>f(s)?`stop`:`play`);ue(a,{size:`s`,get icon(){return f(e)},onclick:()=>O(s,!f(s)),children:(e,t)=>{w();var r=S();n(()=>C(r,f(s)?`Stoppen`:`Starten`)),T(e,r)},$$slots:{default:!0}})}var c=o(a,2);{let e=r(()=>!f(s));N(c,{icon:`retry`,label:`Neu starten`,size:`s`,get disabled(){return f(e)}})}var l=o(c,2);V(l,{});var u=o(l,2);N(u,{icon:`download`,label:`Herunterladen`,size:`s`,onclick:()=>O(m,`Herunterladen`)});var d=o(u,2);N(d,{icon:`share`,label:`Teilen`,size:`s`,onclick:()=>O(m,`Teilen`)});var p=o(d,2);oe(p,{trigger:(e,t)=>{N(e,x(()=>t?.().props,{icon:`more`,label:`Weitere Aktionen`,size:`s`}))},children:(e,t)=>{var n=J(),r=_(n);M(r,{icon:`copy`,onSelect:()=>O(m,`Duplizieren`),children:(e,t)=>{w();var n=S(`Duplizieren`);T(e,n)},$$slots:{default:!0}});var i=o(r,2);M(i,{icon:`edit`,onSelect:()=>O(m,`Umbenennen`),children:(e,t)=>{w();var n=S(`Umbenennen`);T(e,n)},$$slots:{default:!0}}),T(e,n)},$$slots:{trigger:!0,default:!0}}),T(e,i)},$$slots:{default:!0}});var g=o(h,2),v=i(g);p(u),p(l);var y=o(l,2),b=o(t(y),4);P(t(b),{label:`Editor`,children:(e,t)=>{var n=X(),r=_(n);fe(r,{label:`Ansicht`,size:`s`,options:[{value:`blocks`,label:`Blöcke`},{value:`python`,label:`Python`}],get value(){return f(d)},set value(e){O(d,e,!0)}});var i=o(r,2);V(i,{});var a=o(i,2);N(a,{icon:`help`,label:`Hilfe`,size:`s`});var s=o(a,2);N(s,{icon:`settings`,label:`Einstellungen`,size:`s`}),T(e,n)},$$slots:{default:!0}}),p(b),p(y);var E=o(y,2),D=o(t(E),4);P(t(D),{label:`Ansicht`,orientation:`vertical`,children:(e,t)=>{var n=q(),r=_(n);N(r,{icon:`fullscreen`,label:`Vollbild`});var i=o(r,2);N(i,{icon:`expand`,label:`Vergrößern`});var a=o(i,2);N(a,{icon:`collapse`,label:`Verkleinern`});var s=o(a,2);V(s,{orientation:`horizontal`});var c=o(s,2);N(c,{icon:`settings`,label:`Einstellungen`}),T(e,n)},$$slots:{default:!0}}),p(D),p(E);var k=o(E,2);P(o(t(k),2),{label:`Serielle Ausgabe`,children:(e,t)=>{var n=X(),r=_(n);N(r,{icon:`pause`,label:`Anhalten`,size:`s`});var i=o(r,2);N(i,{icon:`delete`,label:`Leeren`,size:`s`});var a=o(i,2);V(a,{});var s=o(a,2);N(s,{icon:`download`,label:`Als CSV herunterladen`,size:`s`}),T(e,n)},$$slots:{default:!0}}),p(k);var A=o(k,2),j=o(t(A),2);ie(j,{dos:[`label nennt, wofür die Leiste ist („Programm“, „Serielle Ausgabe“).`,`Jeder Icon-Button hat ein label; der Tooltip zeigt es.`,`Gruppen mit ToolbarSeparator trennen.`],donts:[`Keine einzelnen Buttons als Toolbar: ab etwa drei Werkzeugen lohnt sie sich.`,`Keine Textfelder als Hauptinhalt: dort gehören die Pfeiltasten dem Feld.`],notFor:[`Navigation zwischen Seiten: Links oder Tabs.`,`Eine Auswahl aus zwei bis vier Ansichten allein: SegmentedControl.`]}),p(A),n(()=>C(v,`Zuletzt: ${f(m)??``}`)),T(e,c)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),T(e,g),l()}var G,K,q,J,Y,X,Z,Q,$,pe,me;function he(){return(he=e((()=>{y(),k(),te(),ne(),le(),ce(),ae(),se(),de(),B(),U(),b(),A(),G={title:`Navigation/Toolbar`,component:P,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Programm`,orientation:`horizontal`},argTypes:{orientation:{control:`inline-radio`,options:[`horizontal`,`vertical`]}}},{Story:K}=j(G),q=v(`<!> <!> <!> <!> <!>`,1),J=v(`<!> <!>`,1),Y=v(`<!> <!> <!> <!> <!> <!>`,1),X=v(`<!> <!> <!> <!>`,1),Z=v(`<section><h2>Editor-Leiste</h2> <p class="section-intro">Probier es: in die Leiste tabben, mit ← → wandern. Deaktivierte Buttons werden übersprungen,
				ein Menü-Auslöser öffnet mit Enter oder ↓.</p> <div class="frame svelte-7hekh8"><!> <p class="hint svelte-7hekh8"> </p></div></section> <section><h2>Mit Ansichtswechsel</h2> <p class="section-intro">Ein SegmentedControl in der Leiste behält seinen eigenen Tab-Stopp und seine Pfeiltasten
				(eine Radiogruppe): Tab erreicht ihn, ← → wechseln darin die Ansicht.</p> <div class="frame svelte-7hekh8"><!></div></section> <section><h2>Senkrecht</h2> <p class="section-intro">Am Rand einer Arbeitsfläche; hier wandern ↑ ↓.</p> <div class="frame narrow svelte-7hekh8"><!></div></section> <section data-theme="dark" class="dark-band svelte-7hekh8"><h2>Auf dunklen Bereichen</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),W.__docgen={data:[],name:`Toolbar.stories.svelte`},Q=ee(W,G),$=[`Spielwiese`,`Übersicht`],pe={...Q.Spielwiese,tags:[`svelte-csf-v5`]},me={...Q.Übersicht,tags:[`svelte-csf-v5`]}})))()}he();export{pe as Spielwiese,$ as __namedExportsOrder,G as default,me as Übersicht};