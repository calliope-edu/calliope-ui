import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Gt as r,H as i,Pt as a,Xt as o,Zt as s,bt as c,cn as l,ct as u,jt as d,ln as f,lt as p,mn as m,n as h,o as g,pn as _,pt as v,rt as y,sn as b,st as x}from"./iframe-BsWRsydk.js";import{i as S,n as C,r as w,t as T}from"./create-runtime-stories-BWVMXit6.js";import{i as E,n as D,r as O,t as k}from"./Guidelines-B4Q9fRhg.js";import{n as A,t as j}from"./Row-DwZNmfYl.js";import{n as M,t as N}from"./Badge-BIs29jtc.js";function P(e,p){s(p,!0);var m=R(),h=d(m);I(h,{name:`Spielwiese`,template:(e,t)=>{N(e,g(()=>f(t?.(),[`children`]),{children:(e,t)=>{b();var n=v(`Pausiert`);x(e,n)},$$slots:{default:!0}}))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Badge {...args}>Pausiert</Badge>`}}});var S=a(h,2);I(S,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Badge">
	{#snippet lead()}
		Ein kurzes Etikett zum Lesen, nicht zum Drücken: deshalb ein abgerundetes Rechteck (6 px),
		keine Pille. Jede Fläche trägt ihre feste Textfarbe; Status-Badges haben zusätzlich ein Icon.
	{/snippet}

	<section>
		<h2>Töne</h2>
		<Row label="Neutral">
			<Badge>3 Geräte</Badge>
			<Badge>Entwurf</Badge>
		</Row>
		<Row label="Status">
			<Badge tone="success" icon="check">Verbunden</Badge>
			<Badge tone="warning" icon="pause">Pausiert</Badge>
			<Badge tone="error" icon="error">Gesperrt</Badge>
			<Badge tone="info" icon="info">Neu im Raum</Badge>
		</Row>
		<Row label="Auszeichnung">
			<Badge tone="highlight">Neu</Badge>
		</Row>
		<Row label="Identität">
			{#each identities as [identity, name] (identity)}
				<Badge tone="identity" {identity}>{name}</Badge>
			{/each}
		</Row>
		<Row label="Gerätefarbe">
			<Badge swatch="var(--cui-data-series-1)">Calliope 1</Badge>
			<Badge swatch="var(--cui-data-series-2)">Calliope 2</Badge>
			<Badge swatch="var(--cui-data-series-3)">Wetterstation</Badge>
		</Row>
	</section>

	<section>
		<h2>Größen</h2>
		<Row label="s (12 px)">
			<Badge tone="warning" icon="pause">Pausiert</Badge>
			<Badge>Gestern, 14:03</Badge>
		</Row>
		<Row label="m (14 px)">
			<Badge size="m" tone="warning" icon="pause">Pausiert</Badge>
			<Badge size="m">3 Geräte</Badge>
		</Row>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Neutral und Status">
			<Badge>3 Geräte</Badge>
			<Badge tone="success" icon="check">Verbunden</Badge>
			<Badge tone="warning" icon="pause">Pausiert</Badge>
			<Badge tone="error" icon="error">Gesperrt</Badge>
			<Badge tone="highlight">Neu</Badge>
		</Row>
		<Row label="Gerätefarbe">
			<Badge swatch="var(--cui-data-series-1)">Calliope 1</Badge>
			<Badge swatch="var(--cui-data-series-4)">Calliope 4</Badge>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Ein bis zwei Wörter; der Zustand steht im Text („Pausiert“), nicht nur in der Farbe.',
				'Größe m auf allem, was eine Lehrkraft aus Entfernung liest.',
				'Den Raum pausieren ist ein Button; der Zustand daneben ein Badge (DESIGN.md, Button).'
			]}
			donts={[
				'Kein Badge zum Klicken: was man drückt, ist eine Pille (Chip, Button).',
				'Keine Identitätsfarbe für einen Status, keine Statusfarbe für ein Produkt.',
				'Keine eingefärbten Hintergründe: die Fläche ist voll oder neutral.'
			]}
			notFor={[
				'Klickbare Filter oder entfernbare Werte: Chip.',
				'Online/Offline in Listen und Tabellen: StatusDot.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,o)=>{O(e,{eyebrow:`Primitives`,title:`Badge`,lead:e=>{b();var t=v(`Ein kurzes Etikett zum Lesen, nicht zum Drücken: deshalb ein abgerundetes Rechteck (6 px),
			keine Pille. Jede Fläche trägt ihre feste Textfarbe; Status-Badges haben zusätzlich ein Icon.`);x(e,t)},children:(e,o)=>{var s=H(),f=d(s),p=a(t(f),2);j(p,{label:`Neutral`,children:(e,t)=>{var n=R(),r=d(n);N(r,{children:(e,t)=>{b();var n=v(`3 Geräte`);x(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{children:(e,t)=>{b();var n=v(`Entwurf`);x(e,n)},$$slots:{default:!0}}),x(e,n)},$$slots:{default:!0}});var m=a(p,2);j(m,{label:`Status`,children:(e,t)=>{var n=z(),r=d(n);N(r,{tone:`success`,icon:`check`,children:(e,t)=>{b();var n=v(`Verbunden`);x(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{tone:`warning`,icon:`pause`,children:(e,t)=>{b();var n=v(`Pausiert`);x(e,n)},$$slots:{default:!0}});var o=a(i,2);N(o,{tone:`error`,icon:`error`,children:(e,t)=>{b();var n=v(`Gesperrt`);x(e,n)},$$slots:{default:!0}});var s=a(o,2);N(s,{tone:`info`,icon:`info`,children:(e,t)=>{b();var n=v(`Neu im Raum`);x(e,n)},$$slots:{default:!0}}),x(e,n)},$$slots:{default:!0}});var h=a(m,2);j(h,{label:`Auszeichnung`,children:(e,t)=>{N(e,{tone:`highlight`,children:(e,t)=>{b();var n=v(`Neu`);x(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var g=a(h,2);j(g,{label:`Identität`,children:(e,t)=>{var a=u(),o=d(a);i(o,17,()=>L,([e,t])=>e,(e,t)=>{var i=r(()=>_(c(t),2));let a=()=>c(i)[0],o=()=>c(i)[1];N(e,{tone:`identity`,get identity(){return a()},children:(e,t)=>{b();var r=v();n(()=>y(r,o())),x(e,r)},$$slots:{default:!0}})}),x(e,a)},$$slots:{default:!0}});var S=a(g,2);j(S,{label:`Gerätefarbe`,children:(e,t)=>{var n=B(),r=d(n);N(r,{swatch:`var(--cui-data-series-1)`,children:(e,t)=>{b();var n=v(`Calliope 1`);x(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{swatch:`var(--cui-data-series-2)`,children:(e,t)=>{b();var n=v(`Calliope 2`);x(e,n)},$$slots:{default:!0}});var o=a(i,2);N(o,{swatch:`var(--cui-data-series-3)`,children:(e,t)=>{b();var n=v(`Wetterstation`);x(e,n)},$$slots:{default:!0}}),x(e,n)},$$slots:{default:!0}}),l(f);var C=a(f,2),w=a(t(C),2);j(w,{label:`s (12 px)`,children:(e,t)=>{var n=R(),r=d(n);N(r,{tone:`warning`,icon:`pause`,children:(e,t)=>{b();var n=v(`Pausiert`);x(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{children:(e,t)=>{b();var n=v(`Gestern, 14:03`);x(e,n)},$$slots:{default:!0}}),x(e,n)},$$slots:{default:!0}});var T=a(w,2);j(T,{label:`m (14 px)`,children:(e,t)=>{var n=R(),r=d(n);N(r,{size:`m`,tone:`warning`,icon:`pause`,children:(e,t)=>{b();var n=v(`Pausiert`);x(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{size:`m`,children:(e,t)=>{b();var n=v(`3 Geräte`);x(e,n)},$$slots:{default:!0}}),x(e,n)},$$slots:{default:!0}}),l(C);var E=a(C,2),D=a(t(E),2);j(D,{label:`Neutral und Status`,children:(e,t)=>{var n=V(),r=d(n);N(r,{children:(e,t)=>{b();var n=v(`3 Geräte`);x(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{tone:`success`,icon:`check`,children:(e,t)=>{b();var n=v(`Verbunden`);x(e,n)},$$slots:{default:!0}});var o=a(i,2);N(o,{tone:`warning`,icon:`pause`,children:(e,t)=>{b();var n=v(`Pausiert`);x(e,n)},$$slots:{default:!0}});var s=a(o,2);N(s,{tone:`error`,icon:`error`,children:(e,t)=>{b();var n=v(`Gesperrt`);x(e,n)},$$slots:{default:!0}});var c=a(s,2);N(c,{tone:`highlight`,children:(e,t)=>{b();var n=v(`Neu`);x(e,n)},$$slots:{default:!0}}),x(e,n)},$$slots:{default:!0}});var O=a(D,2);j(O,{label:`Gerätefarbe`,children:(e,t)=>{var n=R(),r=d(n);N(r,{swatch:`var(--cui-data-series-1)`,children:(e,t)=>{b();var n=v(`Calliope 1`);x(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{swatch:`var(--cui-data-series-4)`,children:(e,t)=>{b();var n=v(`Calliope 4`);x(e,n)},$$slots:{default:!0}}),x(e,n)},$$slots:{default:!0}}),l(E);var A=a(E,2),M=a(t(A),2);k(M,{dos:[`Ein bis zwei Wörter; der Zustand steht im Text („Pausiert“), nicht nur in der Farbe.`,`Größe m auf allem, was eine Lehrkraft aus Entfernung liest.`,`Den Raum pausieren ist ein Button; der Zustand daneben ein Badge (DESIGN.md, Button).`],donts:[`Kein Badge zum Klicken: was man drückt, ist eine Pille (Chip, Button).`,`Keine Identitätsfarbe für einen Status, keine Statusfarbe für ein Produkt.`,`Keine eingefärbten Hintergründe: die Fläche ist voll oder neutral.`],notFor:[`Klickbare Filter oder entfernbare Werte: Chip.`,`Online/Offline in Listen und Tabellen: StatusDot.`]}),l(A),x(e,s)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),x(e,m),o()}var F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{m(),S(),E(),D(),A(),M(),h(),C(),F={title:`Primitives/Badge`,component:N,tags:[`autodocs`],parameters:{layout:`padded`},args:{tone:`neutral`,size:`s`},argTypes:{tone:{control:`select`,options:[`neutral`,`success`,`warning`,`error`,`info`,`highlight`,`identity`]},size:{control:`inline-radio`,options:[`s`,`m`]}}},{Story:I}=w(F),L=[[`ki-training`,`KI-Training`],[`teachable`,`Teachable`],[`iot`,`IoT-WiFi`],[`robotik`,`Robotik`],[`makecode`,`MakeCode`],[`python`,`Python`],[`blocks`,`Blocks`],[`markdown`,`Markdown`]],R=p(`<!> <!>`,1),z=p(`<!> <!> <!> <!>`,1),B=p(`<!> <!> <!>`,1),V=p(`<!> <!> <!> <!> <!>`,1),H=p(`<section><h2>Töne</h2> <!> <!> <!> <!> <!></section> <section><h2>Größen</h2> <!> <!></section> <section data-theme="dark" class="dark-band svelte-11sfpcc"><h2>Auf dunklen Bereichen</h2> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),P.__docgen={data:[],name:`Badge.stories.svelte`},U=T(P,F),W=[`Spielwiese`,`Übersicht`],G={...U.Spielwiese,tags:[`svelte-csf-v5`]},K={...U.Übersicht,tags:[`svelte-csf-v5`]}})))()}q();export{G as Spielwiese,W as __namedExportsOrder,F as default,K as Übersicht};