import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,H as r,Nt as i,Pt as a,Vt as o,Xt as s,Zt as c,bt as l,cn as u,ct as d,jt as f,ln as p,lt as m,mn as h,n as g,o as _,q as v,rt as y,sn as b,st as x,zt as S}from"./iframe-BsWRsydk.js";import{i as C,n as w,r as T,t as E}from"./create-runtime-stories-BWVMXit6.js";import{i as D,n as O,r as k,t as A}from"./Guidelines-B4Q9fRhg.js";import{n as j,t as M}from"./Row-DwZNmfYl.js";import{i as N,n as P,r as F,t as I}from"./Radio-DuLte1Wm.js";function L(e,m){c(m,!0);let h=o(`line`),g=o(`auto`),C=o(`magenta`);var w=V(),T=f(w);z(T,{name:`Spielwiese`,template:(e,t)=>{let n=()=>p(t?.(),[`children`]);F(e,_(n,{children:(e,t)=>{var i=d(),o=f(i),s=e=>{var t=d(),n=f(t);r(n,17,()=>B,e=>e.value,(e,t)=>{I(e,{get value(){return l(t).value},get label(){return l(t).label},get swatch(){return`var(${l(t).token??``})`}})}),x(e,t)},c=e=>{var t=V(),n=f(t);I(n,{value:`time`,label:`Zeit`});var r=a(n,2);I(r,{value:`index`,label:`Reihenfolge`,hint:`Ein Schritt je Messwert`}),x(e,t)};v(o,e=>{n().variant===`swatch`?e(s):e(c,-1)}),x(e,i)},$$slots:{default:!0}}))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<RadioGroup {...args}>
	{#if args.variant === 'swatch'}
		{#each series as s (s.value)}
			<Radio value={s.value} label={s.label} swatch="var({s.token})" />
		{/each}
	{:else}
		<Radio value="time" label="Zeit" />
		<Radio value="index" label="Reihenfolge" hint="Ein Schritt je Messwert" />
	{/if}
</RadioGroup>`}}});var E=a(T,2);z(E,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Radio">
	{#snippet lead()}
		Genau eine aus mehreren sichtbaren Optionen. <code>RadioGroup</code> trägt die Frage als
		sichtbares Label, die Pfeiltasten wechseln die Auswahl. Die Variante
		<code>swatch</code> wählt eine Farbe, zum Beispiel für eine Kachel im IoT-Dashboard.
	{/snippet}

	<section>
		<h2>Zustände</h2>
		<Row label="Standard">
			<RadioGroup label="Darstellung" bind:value={kind}>
				<Radio value="line" label="Linie" />
				<Radio value="bars" label="Balken" hint="Ein Balken je Gerät" />
				<Radio value="table" label="Tabelle" />
			</RadioGroup>
		</Row>
		<Row label="Nebeneinander">
			<RadioGroup label="X-Achse" value="time" orientation="horizontal">
				<Radio value="time" label="Zeit" />
				<Radio value="index" label="Reihenfolge" />
			</RadioGroup>
		</Row>
		<Row label="Mit Hinweis und Fehler">
			<RadioGroup
				label="Wer darf Werte senden?"
				hint="Gilt für alle Feeds dieses Dashboards."
				error="Bitte wähle eine Option."
				required
			>
				<Radio value="all" label="Alle Geräte im Raum" />
				<Radio value="mine" label="Nur meine Geräte" />
			</RadioGroup>
		</Row>
		<Row label="Eine Option deaktiviert">
			<RadioGroup label="Darstellung" value="line">
				<Radio value="line" label="Linie" />
				<Radio value="stream" label="Verlauf" disabled />
			</RadioGroup>
		</Row>
		<Row label="Gruppe deaktiviert">
			<RadioGroup label="Darstellung" value="line" disabled>
				<Radio value="line" label="Linie" />
				<Radio value="bars" label="Balken" />
			</RadioGroup>
		</Row>
	</section>

	<section>
		<h2>Farbfelder</h2>
		<p class="section-intro">
			32 px Scheiben in den sechs Farben der Datenreihen (D4). Die Auswahl zeigt ein Ring mit
			Abstand, der auf jeder Farbe sichtbar bleibt. Der Name der Farbe ist der Accessible Name und
			erscheint als Titel. „A“ steht für die Farbe des Geräts.
		</p>
		<Row label="Kachelfarbe">
			<RadioGroup label="Farbe" variant="swatch" bind:value={colour}>
				<Radio value="auto" label="Automatisch (Gerätefarbe)" glyph="A" />
				{#each series as s (s.value)}
					<Radio value={s.value} label={s.label} swatch="var({s.token})" />
				{/each}
			</RadioGroup>
		</Row>
		<Row label="Gewählt">
			<span>{series.find((s) => s.value === colour)?.label ?? 'Automatisch'}</span>
		</Row>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Standard">
			<RadioGroup label="X-Achse" value="time" orientation="horizontal">
				<Radio value="time" label="Zeit" />
				<Radio value="index" label="Reihenfolge" />
			</RadioGroup>
		</Row>
		<Row label="Farbfelder">
			<RadioGroup label="Farbe" variant="swatch" bind:value={darkColour}>
				<Radio value="auto" label="Automatisch (Gerätefarbe)" glyph="A" />
				{#each series as s (s.value)}
					<Radio value={s.value} label={s.label} swatch="var({s.token})" />
				{/each}
			</RadioGroup>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Das Gruppen-Label stellt die Frage, die Optionen antworten.',
				'Eine sinnvolle Vorauswahl setzen, wenn es eine gibt.',
				'Farbfelder immer mit Namen (label), auch wenn er nur vorgelesen wird.'
			]}
			donts={[
				'Keine Radios für An/Aus: dafür gibt es Switch oder Checkbox.',
				'Keine Status- oder Identitätsfarben als Farbfeld anbieten.',
				'Kein Zeichen (glyph) auf einer farbigen Scheibe: es hätte keinen festen Kontrast.'
			]}
			notFor={[
				'Zwei bis vier kurze Modi in einer Zeile: SegmentedControl.',
				'Mehr als etwa sechs Optionen: Select.',
				'Mehrere Optionen zugleich: Checkbox.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,o)=>{k(e,{eyebrow:`Primitives`,title:`Radio`,lead:e=>{b();var t=H();b(4),x(e,t)},children:(e,o)=>{var s=G(),c=f(s),d=a(t(c),2);M(d,{label:`Standard`,children:(e,t)=>{F(e,{label:`Darstellung`,get value(){return l(h)},set value(e){S(h,e,!0)},children:(e,t)=>{var n=U(),r=f(n);I(r,{value:`line`,label:`Linie`});var i=a(r,2);I(i,{value:`bars`,label:`Balken`,hint:`Ein Balken je Gerät`});var o=a(i,2);I(o,{value:`table`,label:`Tabelle`}),x(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var p=a(d,2);M(p,{label:`Nebeneinander`,children:(e,t)=>{F(e,{label:`X-Achse`,value:`time`,orientation:`horizontal`,children:(e,t)=>{var n=V(),r=f(n);I(r,{value:`time`,label:`Zeit`});var i=a(r,2);I(i,{value:`index`,label:`Reihenfolge`}),x(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var m=a(p,2);M(m,{label:`Mit Hinweis und Fehler`,children:(e,t)=>{F(e,{label:`Wer darf Werte senden?`,hint:`Gilt für alle Feeds dieses Dashboards.`,error:`Bitte wähle eine Option.`,required:!0,children:(e,t)=>{var n=V(),r=f(n);I(r,{value:`all`,label:`Alle Geräte im Raum`});var i=a(r,2);I(i,{value:`mine`,label:`Nur meine Geräte`}),x(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var _=a(m,2);M(_,{label:`Eine Option deaktiviert`,children:(e,t)=>{F(e,{label:`Darstellung`,value:`line`,children:(e,t)=>{var n=V(),r=f(n);I(r,{value:`line`,label:`Linie`});var i=a(r,2);I(i,{value:`stream`,label:`Verlauf`,disabled:!0}),x(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var v=a(_,2);M(v,{label:`Gruppe deaktiviert`,children:(e,t)=>{F(e,{label:`Darstellung`,value:`line`,disabled:!0,children:(e,t)=>{var n=V(),r=f(n);I(r,{value:`line`,label:`Linie`});var i=a(r,2);I(i,{value:`bars`,label:`Balken`}),x(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),u(c);var b=a(c,2),w=a(t(b),4);M(w,{label:`Kachelfarbe`,children:(e,t)=>{F(e,{label:`Farbe`,variant:`swatch`,get value(){return l(g)},set value(e){S(g,e,!0)},children:(e,t)=>{var n=V(),i=f(n);I(i,{value:`auto`,label:`Automatisch (Gerätefarbe)`,glyph:`A`});var o=a(i,2);r(o,17,()=>B,e=>e.value,(e,t)=>{I(e,{get value(){return l(t).value},get label(){return l(t).label},get swatch(){return`var(${l(t).token??``})`}})}),x(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var T=a(w,2);M(T,{label:`Gewählt`,children:(e,t)=>{var r=W(),a=i(r,!0);n(e=>y(a,e),[()=>B.find(e=>e.value===l(g))?.label??`Automatisch`]),x(e,r)},$$slots:{default:!0}}),u(b);var E=a(b,2),D=a(t(E),2);M(D,{label:`Standard`,children:(e,t)=>{F(e,{label:`X-Achse`,value:`time`,orientation:`horizontal`,children:(e,t)=>{var n=V(),r=f(n);I(r,{value:`time`,label:`Zeit`});var i=a(r,2);I(i,{value:`index`,label:`Reihenfolge`}),x(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var O=a(D,2);M(O,{label:`Farbfelder`,children:(e,t)=>{F(e,{label:`Farbe`,variant:`swatch`,get value(){return l(C)},set value(e){S(C,e,!0)},children:(e,t)=>{var n=V(),i=f(n);I(i,{value:`auto`,label:`Automatisch (Gerätefarbe)`,glyph:`A`});var o=a(i,2);r(o,17,()=>B,e=>e.value,(e,t)=>{I(e,{get value(){return l(t).value},get label(){return l(t).label},get swatch(){return`var(${l(t).token??``})`}})}),x(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),u(E);var k=a(E,2),j=a(t(k),2);A(j,{dos:[`Das Gruppen-Label stellt die Frage, die Optionen antworten.`,`Eine sinnvolle Vorauswahl setzen, wenn es eine gibt.`,`Farbfelder immer mit Namen (label), auch wenn er nur vorgelesen wird.`],donts:[`Keine Radios für An/Aus: dafür gibt es Switch oder Checkbox.`,`Keine Status- oder Identitätsfarben als Farbfeld anbieten.`,`Kein Zeichen (glyph) auf einer farbigen Scheibe: es hätte keinen festen Kontrast.`],notFor:[`Zwei bis vier kurze Modi in einer Zeile: SegmentedControl.`,`Mehr als etwa sechs Optionen: Select.`,`Mehrere Optionen zugleich: Checkbox.`]}),u(k),x(e,s)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),x(e,w),s()}var R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{h(),C(),D(),O(),j(),P(),N(),g(),w(),R={title:`Primitives/Radio`,component:F,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`X-Achse`,value:`time`,variant:`default`,disabled:!1},argTypes:{variant:{control:`inline-radio`,options:[`default`,`swatch`]},orientation:{control:`inline-radio`,options:[`vertical`,`horizontal`]}}},{Story:z}=T(R),B=[{value:`cyan`,label:`Türkis`,token:`--cui-data-series-1`},{value:`magenta`,label:`Magenta`,token:`--cui-data-series-2`},{value:`lime`,label:`Hellgrün`,token:`--cui-data-series-3`},{value:`indigo`,label:`Indigo`,token:`--cui-data-series-4`},{value:`orange`,label:`Orange`,token:`--cui-data-series-5`},{value:`yellow`,label:`Gelb`,token:`--cui-data-series-6`}],V=m(`<!> <!>`,1),H=m(`Genau eine aus mehreren sichtbaren Optionen. <code>RadioGroup</code> trägt die Frage als
			sichtbares Label, die Pfeiltasten wechseln die Auswahl. Die Variante <code>swatch</code> wählt eine Farbe, zum Beispiel für eine Kachel im IoT-Dashboard.`,1),U=m(`<!> <!> <!>`,1),W=m(`<span> </span>`),G=m(`<section><h2>Zustände</h2> <!> <!> <!> <!> <!></section> <section><h2>Farbfelder</h2> <p class="section-intro">32 px Scheiben in den sechs Farben der Datenreihen (D4). Die Auswahl zeigt ein Ring mit
				Abstand, der auf jeder Farbe sichtbar bleibt. Der Name der Farbe ist der Accessible Name und
				erscheint als Titel. „A“ steht für die Farbe des Geräts.</p> <!> <!></section> <section data-theme="dark" class="dark-band svelte-1qjuq7g"><h2>Auf dunklen Bereichen</h2> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),L.__docgen={data:[],name:`Radio.stories.svelte`},K=E(L,R),q=[`Spielwiese`,`Übersicht`],J={...K.Spielwiese,tags:[`svelte-csf-v5`]},Y={...K.Übersicht,tags:[`svelte-csf-v5`]}})))()}X();export{J as Spielwiese,q as __namedExportsOrder,R as default,Y as Übersicht};