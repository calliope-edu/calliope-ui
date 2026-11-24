import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Gt as r,H as i,Pt as a,S as o,Vt as s,Xt as c,Zt as l,bt as u,cn as d,ct as ee,jt as f,lt as p,mn as m,n as h,sn as g,st as _,zt as v}from"./iframe-BsWRsydk.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-BWVMXit6.js";import{i as C,n as w,r as T,t as te}from"./Guidelines-B4Q9fRhg.js";import{n as E,t as D}from"./Row-DwZNmfYl.js";import{n as O,t as k}from"./SegmentedControl-CIk5WKUi.js";function A(e,p){l(p,!0);let m=s(`dashboard`),h=s(`train`),y=s(`dashboard`),b=s(`blocks`);var x=H(),S=f(x);I(S,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<SegmentedControl {...args} />`}}});var C=a(S,2);I(C,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="SegmentedControl">
	{#snippet lead()}
		Wählt einen Modus oder eine Ansicht aus zwei bis vier Optionen (<code>radiogroup</code>). Die
		Wahl gilt sofort. Ein Tab-Stopp für die ganze Gruppe; Pfeiltasten wechseln die Option.
	{/snippet}

	<section>
		<h2>Varianten</h2>
		<p class="section-intro">
			Zwei Varianten, vorerst beide: <code>frame</code> (Standard) ist das Rechteck mit Rahmen,
			<code>pill</code> die schwarze Pille mit weißer Wahl, der Ansichts-Umschalter aus Campus
			(Editor-Kopf, IoT-Dashboard, MakeCode-Leiste, Live Wall). Beide sind dieselbe
			<code>radiogroup</code> mit denselben Größen; die Pille kehrt sich im dunklen Theme um. Dazu
			kommt zum Vergleich <code>bar</code>.
		</p>
		<Row label="frame (Standard)">
			<SegmentedControl label="Ansicht" options={views} bind:value={view} />
		</Row>
		<Row label="pill">
			<SegmentedControl label="Ansicht" variant="pill" options={views} bind:value={view} />
		</Row>
		<Row label="bar">
			<SegmentedControl label="Ansicht" variant="bar" options={views} bind:value={view} />
			<span class="muted"
				>Die Pille in der Fläche der Leisten-Buttons (siehe Button, Leisten-Button), zum Vergleich
				mit <code>pill</code>; auf einer grauen Leiste mit <code>data-surface="subtle"</code> weiß bzw.
				schwarz.</span
			>
		</Row>
		<div class="bars">
			{#each ['light', 'dark'] as const as theme (theme)}
				{#each ['subtle', theme === 'light' ? 'default' : 'page'] as surface (surface)}
					<div class="bar" data-theme={theme} data-surface={surface}>
						<SegmentedControl
							label="Ansicht"
							variant="bar"
							size="s"
							options={views}
							value="feeds"
						/>
						<SegmentedControl
							label="Ansicht"
							variant="pill"
							size="s"
							options={views}
							value="feeds"
						/>
					</div>
				{/each}
			{/each}
		</div>
	</section>

	<section>
		<h2>Zustände</h2>
		<p class="section-intro">
			Die gewählte Option ist gefüllt (Tinte, auf dunklen Bereichen Weiß). Hover legt den
			Hover-Ton hinter eine nicht gewählte Option; der Fokusring liegt im 2px-Rand um die Option.
		</p>
		<Row label="Zwei Optionen">
			<SegmentedControl label="Ansicht" options={views} bind:value={view} />
		</Row>
		<Row label="Drei Optionen">
			<SegmentedControl label="Modus" options={modes} bind:value={mode} />
		</Row>
		<Row label="Mit Icons">
			<SegmentedControl
				label="Ansicht"
				value="dashboard"
				options={[
					{ value: 'dashboard', label: 'Dashboard', icon: 'device' },
					{ value: 'feeds', label: 'Feeds', icon: 'wifi' }
				]}
			/>
		</Row>
		<Row label="Sichtbares Label">
			<SegmentedControl label="Modus" labelVisible options={modes} value="apply" />
		</Row>
		<Row label="Größen s / m / l">
			<SegmentedControl label="Ansicht" size="s" options={views} value="dashboard" />
			<SegmentedControl label="Ansicht" size="m" options={views} value="dashboard" />
			<SegmentedControl label="Ansicht" size="l" options={views} value="dashboard" />
		</Row>
		<Row label="Volle Breite">
			<div style="width: 28rem; max-width: 100%">
				<SegmentedControl label="Modus" fullWidth options={modes} value="code" />
			</div>
		</Row>
		<Row label="Option deaktiviert">
			<SegmentedControl
				label="Modus"
				value="train"
				options={[modes[0], { ...modes[1], disabled: true }, modes[2]]}
			/>
		</Row>
		<Row label="Deaktiviert">
			<SegmentedControl label="Modus" disabled options={modes} value="train" />
		</Row>
	</section>

	<section>
		<h2>Pille</h2>
		<p class="section-intro">
			Die Spur trägt die Füllung von <code>control.on</code>, die gewählte Option springt in
			<code>control.on-mark</code> heraus, wie Knopf und Spur eines Switches. Halbfette Schrift. Der
			Fokusring liegt um die ganze Spur auf der Seitenfläche, nicht auf der dunklen Spur; der Fokus
			steht immer auf der gewählten Option.
		</p>
		<Row label="IoT-Dashboard">
			<SegmentedControl label="Ansicht" variant="pill" options={views} bind:value={pillView} />
		</Row>
		<Row label="MakeCode-Leiste">
			<SegmentedControl
				label="Programmiersprache"
				variant="pill"
				options={languages}
				bind:value={language}
			/>
		</Row>
		<Row label="Live Wall">
			<SegmentedControl label="Ansicht" variant="pill" options={codeViews} value="svg" />
		</Row>
		<Row label="Mit Icons">
			<SegmentedControl
				label="Ansicht"
				variant="pill"
				value="dashboard"
				options={[
					{ value: 'dashboard', label: 'Dashboard', icon: 'device' },
					{ value: 'feeds', label: 'Feeds', icon: 'wifi' }
				]}
			/>
		</Row>
		<Row label="Größen s / m / l">
			<SegmentedControl label="Ansicht" variant="pill" size="s" options={views} value="feeds" />
			<SegmentedControl label="Ansicht" variant="pill" size="m" options={views} value="feeds" />
			<SegmentedControl label="Ansicht" variant="pill" size="l" options={views} value="feeds" />
		</Row>
		<Row label="Volle Breite">
			<div style="width: 28rem; max-width: 100%">
				<SegmentedControl label="Modus" variant="pill" fullWidth options={modes} value="code" />
			</div>
		</Row>
		<Row label="Option deaktiviert">
			<SegmentedControl
				label="Modus"
				variant="pill"
				value="train"
				options={[modes[0], { ...modes[1], disabled: true }, modes[2]]}
			/>
		</Row>
		<Row label="Deaktiviert">
			<SegmentedControl label="Modus" variant="pill" disabled options={modes} value="train" />
		</Row>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Drei Optionen">
			<SegmentedControl label="Modus" options={modes} value="apply" />
		</Row>
		<Row label="Mit Icons">
			<SegmentedControl
				label="Ansicht"
				value="feeds"
				options={[
					{ value: 'dashboard', label: 'Dashboard', icon: 'device' },
					{ value: 'feeds', label: 'Feeds', icon: 'wifi' }
				]}
			/>
		</Row>
		<Row label="Pille">
			<SegmentedControl label="Ansicht" variant="pill" options={views} value="dashboard" />
			<SegmentedControl
				label="Programmiersprache"
				variant="pill"
				options={languages}
				value="js"
			/>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Zwei bis vier kurze Optionen, die sich gegenseitig ausschließen: „Dashboard / Feeds“.',
				'Immer einen Namen für die Gruppe (label), auch wenn er nicht sichtbar ist.',
				'Eine Option ist immer gewählt; die Wahl gilt sofort.',
				'Pille für den Ansichts-Umschalter in einer Kopf- oder Werkzeugleiste, Rahmen für eine Wahl in Formularen und Panels.',
				'In Ansichten für Schülerinnen und Schüler Größe l (40px).'
			]}
			donts={[
				'Keine Aktionen als Optionen („Speichern“, „Löschen“): das sind Buttons.',
				'Keine Status- oder Identitätsfarbe für die gewählte Option (D2).',
				'Keine langen Labels, die abgeschnitten werden.'
			]}
			notFor={[
				'Zwischen Inhaltsbereichen mit eigenem Inhalt wechseln: Tabs.',
				'Mehr als vier Optionen: Select.',
				'Eine Einstellung an/aus: Switch.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,s)=>{T(e,{eyebrow:`Primitives`,title:`SegmentedControl`,lead:e=>{g();var t=L();g(2),_(e,t)},children:(e,s)=>{var c=U(),l=f(c),p=a(t(l),4);D(p,{label:`frame (Standard)`,children:(e,t)=>{k(e,{label:`Ansicht`,get options(){return j},get value(){return u(m)},set value(e){v(m,e,!0)}})},$$slots:{default:!0}});var x=a(p,2);D(x,{label:`pill`,children:(e,t)=>{k(e,{label:`Ansicht`,variant:`pill`,get options(){return j},get value(){return u(m)},set value(e){v(m,e,!0)}})},$$slots:{default:!0}});var S=a(x,2);D(S,{label:`bar`,children:(e,t)=>{var n=R(),r=f(n);k(r,{label:`Ansicht`,variant:`bar`,get options(){return j},get value(){return u(m)},set value(e){v(m,e,!0)}}),g(2),_(e,n)},$$slots:{default:!0}});var C=a(S,2);i(C,20,()=>[`light`,`dark`],e=>e,(e,r)=>{var s=ee(),c=f(s);i(c,16,()=>[`subtle`,r===`light`?`default`:`page`],e=>e,(e,i)=>{var s=z(),c=t(s);k(c,{label:`Ansicht`,variant:`bar`,size:`s`,get options(){return j},value:`feeds`});var l=a(c,2);k(l,{label:`Ansicht`,variant:`pill`,size:`s`,get options(){return j},value:`feeds`}),d(s),n(()=>{o(s,`data-theme`,r),o(s,`data-surface`,i)}),_(e,s)}),_(e,s)}),d(C),d(l);var w=a(l,2),T=a(t(w),4);D(T,{label:`Zwei Optionen`,children:(e,t)=>{k(e,{label:`Ansicht`,get options(){return j},get value(){return u(m)},set value(e){v(m,e,!0)}})},$$slots:{default:!0}});var E=a(T,2);D(E,{label:`Drei Optionen`,children:(e,t)=>{k(e,{label:`Modus`,get options(){return M},get value(){return u(h)},set value(e){v(h,e,!0)}})},$$slots:{default:!0}});var O=a(E,2);D(O,{label:`Mit Icons`,children:(e,t)=>{k(e,{label:`Ansicht`,value:`dashboard`,options:[{value:`dashboard`,label:`Dashboard`,icon:`device`},{value:`feeds`,label:`Feeds`,icon:`wifi`}]})},$$slots:{default:!0}});var A=a(O,2);D(A,{label:`Sichtbares Label`,children:(e,t)=>{k(e,{label:`Modus`,labelVisible:!0,get options(){return M},value:`apply`})},$$slots:{default:!0}});var F=a(A,2);D(F,{label:`Größen s / m / l`,children:(e,t)=>{var n=B(),r=f(n);k(r,{label:`Ansicht`,size:`s`,get options(){return j},value:`dashboard`});var i=a(r,2);k(i,{label:`Ansicht`,size:`m`,get options(){return j},value:`dashboard`});var o=a(i,2);k(o,{label:`Ansicht`,size:`l`,get options(){return j},value:`dashboard`}),_(e,n)},$$slots:{default:!0}});var I=a(F,2);D(I,{label:`Volle Breite`,children:(e,n)=>{var r=V(),i=t(r);k(i,{label:`Modus`,fullWidth:!0,get options(){return M},value:`code`}),d(r),_(e,r)},$$slots:{default:!0}});var L=a(I,2);D(L,{label:`Option deaktiviert`,children:(e,t)=>{{let t=r(()=>[M[0],{...M[1],disabled:!0},M[2]]);k(e,{label:`Modus`,value:`train`,get options(){return u(t)}})}},$$slots:{default:!0}});var W=a(L,2);D(W,{label:`Deaktiviert`,children:(e,t)=>{k(e,{label:`Modus`,disabled:!0,get options(){return M},value:`train`})},$$slots:{default:!0}}),d(w);var G=a(w,2),K=a(t(G),4);D(K,{label:`IoT-Dashboard`,children:(e,t)=>{k(e,{label:`Ansicht`,variant:`pill`,get options(){return j},get value(){return u(y)},set value(e){v(y,e,!0)}})},$$slots:{default:!0}});var q=a(K,2);D(q,{label:`MakeCode-Leiste`,children:(e,t)=>{k(e,{label:`Programmiersprache`,variant:`pill`,get options(){return N},get value(){return u(b)},set value(e){v(b,e,!0)}})},$$slots:{default:!0}});var J=a(q,2);D(J,{label:`Live Wall`,children:(e,t)=>{k(e,{label:`Ansicht`,variant:`pill`,get options(){return P},value:`svg`})},$$slots:{default:!0}});var Y=a(J,2);D(Y,{label:`Mit Icons`,children:(e,t)=>{k(e,{label:`Ansicht`,variant:`pill`,value:`dashboard`,options:[{value:`dashboard`,label:`Dashboard`,icon:`device`},{value:`feeds`,label:`Feeds`,icon:`wifi`}]})},$$slots:{default:!0}});var X=a(Y,2);D(X,{label:`Größen s / m / l`,children:(e,t)=>{var n=B(),r=f(n);k(r,{label:`Ansicht`,variant:`pill`,size:`s`,get options(){return j},value:`feeds`});var i=a(r,2);k(i,{label:`Ansicht`,variant:`pill`,size:`m`,get options(){return j},value:`feeds`});var o=a(i,2);k(o,{label:`Ansicht`,variant:`pill`,size:`l`,get options(){return j},value:`feeds`}),_(e,n)},$$slots:{default:!0}});var Z=a(X,2);D(Z,{label:`Volle Breite`,children:(e,n)=>{var r=V(),i=t(r);k(i,{label:`Modus`,variant:`pill`,fullWidth:!0,get options(){return M},value:`code`}),d(r),_(e,r)},$$slots:{default:!0}});var Q=a(Z,2);D(Q,{label:`Option deaktiviert`,children:(e,t)=>{{let t=r(()=>[M[0],{...M[1],disabled:!0},M[2]]);k(e,{label:`Modus`,variant:`pill`,value:`train`,get options(){return u(t)}})}},$$slots:{default:!0}});var ne=a(Q,2);D(ne,{label:`Deaktiviert`,children:(e,t)=>{k(e,{label:`Modus`,variant:`pill`,disabled:!0,get options(){return M},value:`train`})},$$slots:{default:!0}}),d(G);var $=a(G,2),re=a(t($),2);D(re,{label:`Drei Optionen`,children:(e,t)=>{k(e,{label:`Modus`,get options(){return M},value:`apply`})},$$slots:{default:!0}});var ie=a(re,2);D(ie,{label:`Mit Icons`,children:(e,t)=>{k(e,{label:`Ansicht`,value:`feeds`,options:[{value:`dashboard`,label:`Dashboard`,icon:`device`},{value:`feeds`,label:`Feeds`,icon:`wifi`}]})},$$slots:{default:!0}});var ae=a(ie,2);D(ae,{label:`Pille`,children:(e,t)=>{var n=H(),r=f(n);k(r,{label:`Ansicht`,variant:`pill`,get options(){return j},value:`dashboard`});var i=a(r,2);k(i,{label:`Programmiersprache`,variant:`pill`,get options(){return N},value:`js`}),_(e,n)},$$slots:{default:!0}}),d($);var oe=a($,2),se=a(t(oe),2);te(se,{dos:[`Zwei bis vier kurze Optionen, die sich gegenseitig ausschließen: „Dashboard / Feeds“.`,`Immer einen Namen für die Gruppe (label), auch wenn er nicht sichtbar ist.`,`Eine Option ist immer gewählt; die Wahl gilt sofort.`,`Pille für den Ansichts-Umschalter in einer Kopf- oder Werkzeugleiste, Rahmen für eine Wahl in Formularen und Panels.`,`In Ansichten für Schülerinnen und Schüler Größe l (40px).`],donts:[`Keine Aktionen als Optionen („Speichern“, „Löschen“): das sind Buttons.`,`Keine Status- oder Identitätsfarbe für die gewählte Option (D2).`,`Keine langen Labels, die abgeschnitten werden.`],notFor:[`Zwischen Inhaltsbereichen mit eigenem Inhalt wechseln: Tabs.`,`Mehr als vier Optionen: Select.`,`Eine Einstellung an/aus: Switch.`]}),d(oe),_(e,c)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),_(e,x),c()}var j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{m(),y(),C(),w(),E(),O(),h(),b(),j=[{value:`dashboard`,label:`Dashboard`},{value:`feeds`,label:`Feeds`}],M=[{value:`train`,label:`Trainieren`},{value:`apply`,label:`Anwenden`},{value:`code`,label:`Programmieren`}],N=[{value:`blocks`,label:`Blöcke`},{value:`js`,label:`JavaScript`},{value:`py`,label:`Python`}],P=[{value:`svg`,label:`Blöcke`},{value:`ts`,label:`Code`}],F={title:`Primitives/SegmentedControl`,component:k,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Modus`,labelVisible:!1,options:M,value:`train`,size:`l`,variant:`frame`,fullWidth:!1,disabled:!1},argTypes:{size:{control:`inline-radio`,options:[`s`,`m`,`l`]},variant:{control:`inline-radio`,options:[`frame`,`pill`,`bar`]}}},{Story:I}=x(F),L=p(`Wählt einen Modus oder eine Ansicht aus zwei bis vier Optionen (<code>radiogroup</code>). Die
			Wahl gilt sofort. Ein Tab-Stopp für die ganze Gruppe; Pfeiltasten wechseln die Option.`,1),R=p(`<!> <span class="muted svelte-etlci8">Die Pille in der Fläche der Leisten-Buttons (siehe Button, Leisten-Button), zum Vergleich
					mit <code>pill</code>; auf einer grauen Leiste mit <code>data-surface="subtle"</code> weiß bzw.
					schwarz.</span>`,1),z=p(`<div class="bar svelte-etlci8"><!> <!></div>`),B=p(`<!> <!> <!>`,1),V=p(`<div style="width: 28rem; max-width: 100%"><!></div>`),H=p(`<!> <!>`,1),U=p(`<section><h2>Varianten</h2> <p class="section-intro">Zwei Varianten, vorerst beide: <code>frame</code> (Standard) ist das Rechteck mit Rahmen, <code>pill</code> die schwarze Pille mit weißer Wahl, der Ansichts-Umschalter aus Campus
				(Editor-Kopf, IoT-Dashboard, MakeCode-Leiste, Live Wall). Beide sind dieselbe <code>radiogroup</code> mit denselben Größen; die Pille kehrt sich im dunklen Theme um. Dazu
				kommt zum Vergleich <code>bar</code>.</p> <!> <!> <!> <div class="bars svelte-etlci8"></div></section> <section><h2>Zustände</h2> <p class="section-intro">Die gewählte Option ist gefüllt (Tinte, auf dunklen Bereichen Weiß). Hover legt den
				Hover-Ton hinter eine nicht gewählte Option; der Fokusring liegt im 2px-Rand um die Option.</p> <!> <!> <!> <!> <!> <!> <!> <!></section> <section><h2>Pille</h2> <p class="section-intro">Die Spur trägt die Füllung von <code>control.on</code>, die gewählte Option springt in <code>control.on-mark</code> heraus, wie Knopf und Spur eines Switches. Halbfette Schrift. Der
				Fokusring liegt um die ganze Spur auf der Seitenfläche, nicht auf der dunklen Spur; der Fokus
				steht immer auf der gewählten Option.</p> <!> <!> <!> <!> <!> <!> <!> <!></section> <section data-theme="dark" class="dark-band svelte-etlci8"><h2>Auf dunklen Bereichen</h2> <!> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),A.__docgen={data:[],name:`SegmentedControl.stories.svelte`},W=S(A,F),G=[`Spielwiese`,`Übersicht`],K={...W.Spielwiese,tags:[`svelte-csf-v5`]},q={...W.Übersicht,tags:[`svelte-csf-v5`]}})))()}J();export{K as Spielwiese,G as __namedExportsOrder,F as default,q as Übersicht};