import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,H as n,It as r,Pt as i,Vt as a,Xt as o,Zt as s,bt as c,cn as l,ct as u,jt as d,lt as f,mn as p,n as m,sn as h,st as g,zt as _}from"./iframe-BsWRsydk.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-BWVMXit6.js";import{i as S,n as C,r as w,t as T}from"./Guidelines-B4Q9fRhg.js";import{n as E,t as D}from"./Row-DwZNmfYl.js";import{n as O,t as k}from"./Chip-T-KGKlog.js";function A(e,f){s(f,!0);let p=a(!0),m=r({"Calliope 1":!0,"Calliope 2":!1,Wetterstation:!0}),v={"Calliope 1":`var(--cui-data-series-1)`,"Calliope 2":`var(--cui-data-series-2)`,Wetterstation:`var(--cui-data-series-3)`},y=a(r([`Apfel`,`Biene`,`Delfin`]));var b=P(),x=d(b);M(x,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<Chip {...args} />`}}});var S=i(x,2);M(S,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Chip">
	{#snippet lead()}
		Eine Pille, die man drückt: als Filter zum An- und Abwählen (<code>aria-pressed</code>) oder
		als Wert mit einem Entfernen-Knopf. Gewählt füllt sie sich mit Tinte und zeigt einen Haken.
	{/snippet}

	<section>
		<h2>Filter</h2>
		<Row label="Aus / an">
			<Chip label="Nur online" selected={false} />
			<Chip label="Nur online" selected />
		</Row>
		<Row label="Geräte filtern">
			{#each Object.keys(devices) as name (name)}
				<Chip label={name} swatch={colours[name]} bind:selected={devices[name]} />
			{/each}
		</Row>
		<Row label="Mit Icon">
			<Chip label="Filter" icon="filter" bind:selected={online} />
		</Row>
		<Row label="Deaktiviert">
			<Chip label="Nur online" selected={false} disabled />
			<Chip label="Nur online" selected disabled />
		</Row>
	</section>

	<section>
		<h2>Entfernbare Werte</h2>
		<p class="section-intro">
			Zum Beispiel die Wörter eines Raumcodes. Ziel ist nur der 24 px Knopf; er heißt nach dem
			Chip („Apfel entfernen“).
		</p>
		<Row label="Wörter">
			{#each words as word (word)}
				<Chip label={word} onRemove={() => (words = words.filter((w) => w !== word))} />
			{:else}
				<span class="muted">Alle entfernt.</span>
			{/each}
		</Row>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Filter">
			<Chip label="Nur online" selected={false} />
			<Chip label="Nur online" selected />
			<Chip label="Calliope 1" swatch="var(--cui-data-series-1)" selected={false} />
		</Row>
		<Row label="Entfernbar">
			<Chip label="Apfel" onRemove={() => {}} />
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Kurze Labels; mehrere Chips stehen in einer Zeile und brechen um.',
				'Für Filter immer selected setzen (auch false), damit der Zustand vorgelesen wird.'
			]}
			donts={[
				'Kein Chip als reines Etikett: was man nicht drücken kann, ist ein Badge.',
				'Keine Statusfarbe für „gewählt“.'
			]}
			notFor={[
				'Reiner Zustand oder Zähler: Badge.',
				'Eine Aktion mit Wirkung („Speichern“): Button.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{w(e,{eyebrow:`Primitives`,title:`Chip`,lead:e=>{h();var t=N();h(2),g(e,t)},children:(e,r)=>{var a=L(),o=d(a),s=i(t(o),2);D(s,{label:`Aus / an`,children:(e,t)=>{var n=P(),r=d(n);k(r,{label:`Nur online`,selected:!1});var a=i(r,2);k(a,{label:`Nur online`,selected:!0}),g(e,n)},$$slots:{default:!0}});var f=i(s,2);D(f,{label:`Geräte filtern`,children:(e,t)=>{var r=u(),i=d(r);n(i,16,()=>Object.keys(m),e=>e,(e,t)=>{k(e,{get label(){return t},get swatch(){return v[t]},get selected(){return m[t]},set selected(e){m[t]=e}})}),g(e,r)},$$slots:{default:!0}});var h=i(f,2);D(h,{label:`Mit Icon`,children:(e,t)=>{k(e,{label:`Filter`,icon:`filter`,get selected(){return c(p)},set selected(e){_(p,e,!0)}})},$$slots:{default:!0}});var b=i(h,2);D(b,{label:`Deaktiviert`,children:(e,t)=>{var n=P(),r=d(n);k(r,{label:`Nur online`,selected:!1,disabled:!0});var a=i(r,2);k(a,{label:`Nur online`,selected:!0,disabled:!0}),g(e,n)},$$slots:{default:!0}}),l(o);var x=i(o,2),S=i(t(x),4);D(S,{label:`Wörter`,children:(e,t)=>{var r=u(),i=d(r);n(i,16,()=>c(y),e=>e,(e,t)=>{k(e,{get label(){return t},onRemove:()=>_(y,c(y).filter(e=>e!==t),!0)})},e=>{var t=F();g(e,t)}),g(e,r)},$$slots:{default:!0}}),l(x);var C=i(x,2),w=i(t(C),2);D(w,{label:`Filter`,children:(e,t)=>{var n=I(),r=d(n);k(r,{label:`Nur online`,selected:!1});var a=i(r,2);k(a,{label:`Nur online`,selected:!0});var o=i(a,2);k(o,{label:`Calliope 1`,swatch:`var(--cui-data-series-1)`,selected:!1}),g(e,n)},$$slots:{default:!0}});var E=i(w,2);D(E,{label:`Entfernbar`,children:(e,t)=>{k(e,{label:`Apfel`,onRemove:()=>{}})},$$slots:{default:!0}}),l(C);var O=i(C,2),A=i(t(O),2);T(A,{dos:[`Kurze Labels; mehrere Chips stehen in einer Zeile und brechen um.`,`Für Filter immer selected setzen (auch false), damit der Zustand vorgelesen wird.`],donts:[`Kein Chip als reines Etikett: was man nicht drücken kann, ist ein Badge.`,`Keine Statusfarbe für „gewählt“.`],notFor:[`Reiner Zustand oder Zähler: Badge.`,`Eine Aktion mit Wirkung („Speichern“): Button.`]}),l(O),g(e,a)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),g(e,b),o()}var j,M,N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{p(),v(),S(),C(),E(),O(),m(),y(),j={title:`Primitives/Chip`,component:k,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Nur online`,selected:!1,disabled:!1}},{Story:M}=b(j),N=f(`Eine Pille, die man drückt: als Filter zum An- und Abwählen (<code>aria-pressed</code>) oder
			als Wert mit einem Entfernen-Knopf. Gewählt füllt sie sich mit Tinte und zeigt einen Haken.`,1),P=f(`<!> <!>`,1),F=f(`<span class="muted">Alle entfernt.</span>`),I=f(`<!> <!> <!>`,1),L=f(`<section><h2>Filter</h2> <!> <!> <!> <!></section> <section><h2>Entfernbare Werte</h2> <p class="section-intro">Zum Beispiel die Wörter eines Raumcodes. Ziel ist nur der 24 px Knopf; er heißt nach dem
				Chip („Apfel entfernen“).</p> <!></section> <section data-theme="dark" class="dark-band svelte-o08ipe"><h2>Auf dunklen Bereichen</h2> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),A.__docgen={data:[],name:`Chip.stories.svelte`},R=x(A,j),z=[`Spielwiese`,`Übersicht`],B={...R.Spielwiese,tags:[`svelte-csf-v5`]},V={...R.Übersicht,tags:[`svelte-csf-v5`]}})))()}H();export{B as Spielwiese,z as __namedExportsOrder,j as default,V as Übersicht};