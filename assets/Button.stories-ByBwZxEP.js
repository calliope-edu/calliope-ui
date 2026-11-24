import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,H as r,Nt as i,Pt as a,S as o,Vt as s,Xt as c,Zt as l,bt as u,cn as d,ct as f,fn as p,jt as m,lt as h,mn as g,n as _,o as v,pt as y,rt as b,sn as x,st as S,zt as C}from"./iframe-BsWRsydk.js";import{i as w,n as T,r as E,t as D}from"./create-runtime-stories-BWVMXit6.js";import{i as O,n as k,r as A,t as ee}from"./Guidelines-B4Q9fRhg.js";import{n as j,t as M}from"./Row-DwZNmfYl.js";import{n as N,t as P}from"./IconButton-DZwsdOXG.js";import{a as F,i as I}from"./Icon-BM63usQV.js";import{n as L,t as R}from"./Button-BP41bGzH.js";function z(e,h){l(h,!0);let g=s(!1),_=s(!1);var w=q(),T=m(w);H(T,{name:`Spielwiese`,template:(e,t=p)=>{R(e,v(t,{children:(e,t)=>{x();var n=y(`Übertragen`);S(e,n)},$$slots:{default:!0}}))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Button {...args}>Übertragen</Button>`}}});var E=a(T,2);H(E,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Button">
	{#snippet lead()}
		Ein Button für alle Aktionen: <code>variant</code> sagt, wie wichtig sie ist,
		<code>tone</code> färbt nur die Fläche eines Primary-Buttons, <code>size</code> passt ihn an. Die
		Pille heißt „drück mich“.
	{/snippet}

	<section>
		<h2>Varianten und Größen</h2>
		<p class="section-intro">
			32 / 36 / 40 px hoch. Auf Flächen für Schülerinnen und Schüler ist <code>l</code> Standard (D6).
		</p>
		{#each sizes as size (size)}
			<Row label="Größe {size}">
				<Button {size}>Übertragen</Button>
				<Button {size} variant="secondary">Abbrechen</Button>
				<Button {size} variant="ghost">Mehr anzeigen</Button>
				<Button {size} variant="link">Anleitung öffnen</Button>
			</Row>
		{/each}
	</section>

	<section>
		<h2>Töne</h2>
		<p class="section-intro">
			Töne füllen nur. Text steht immer in der festen Paarfarbe auf der Fläche, nie farbig auf
			Weiß. Der Löschen-Button hat schwarze Schrift auf Rot (5,1:1).
		</p>
		<Row label="Status">
			<Button tone="positive" icon="check">Freigeben</Button>
			<Button tone="negative" icon="delete">Löschen</Button>
		</Row>
		<Row label="Identität">
			{#each identities as identity (identity)}
				<Button tone="identity" {identity}>{identity}</Button>
			{/each}
		</Row>
	</section>

	<section>
		<h2>Zustände</h2>
		<Row label="Mit Icon">
			<Button icon="download">Herunterladen</Button>
			<Button variant="secondary" iconEnd="chevron-down">Sortieren</Button>
			<Button variant="ghost" icon="add">Programm</Button>
		</Row>
		<Row label="Lädt">
			<Button loading>Übertragen</Button>
			<Button variant="secondary" loading>Abbrechen</Button>
			<Button tone="negative" loading>Löschen</Button>
		</Row>
		<Row label="Deaktiviert">
			<Button disabled>Übertragen</Button>
			<Button variant="secondary" disabled>Abbrechen</Button>
			<Button variant="ghost" disabled>Mehr anzeigen</Button>
			<Button variant="link" disabled>Anleitung öffnen</Button>
		</Row>
		<Row label="Fokussierbar deaktiviert">
			<Button disabled focusableWhenDisabled>Übertragen</Button>
			<span class="muted"
				>bleibt per Tab erreichbar (aria-disabled), damit ein Tooltip den Grund nennen kann</span
			>
		</Row>
		<Row label="Umschalter">
			<Button variant="secondary" pressed={paused} onclick={() => (paused = !paused)}>
				Raum pausieren
			</Button>
			<span class="muted"
				>aria-pressed={String(paused)}: die Beschriftung bleibt, der Zustand ist die Fläche</span
			>
		</Row>
		<Row label="Als Link">
			<Button href="#anleitung" variant="secondary" iconEnd="external-link">Zur Anleitung</Button>
		</Row>
	</section>

	<section>
		<h2>Leisten-Button</h2>
		<p class="section-intro">
			<code>variant="bar"</code> ist der Button der Editor-Leiste aus Campus (Teilen,
			Erweiterungen, Calliope mini rechts in der MakeCode- und IoT-Leiste): Schrift in normaler
			Schreibweise, halbfett, 8 px Ecken, kein Rahmen. Seine Fläche ist das jeweils andere Neutral
			seines Untergrunds, damit er sich abhebt: grau auf Weiß, weiß auf Grau, dunkelgrau auf
			Schwarz, schwarz auf Dunkelgrau. Auf einer grauen Fläche (<code>surface.subtle</code>) sagt
			ihm
			<code>data-surface="subtle"</code> am Container Bescheid; ohne Attribut gilt Seite oder Karte.
			Beim Überfahren legt sich der übliche Schleier darüber, auf der grauen Leiste ein Rand (der Schleier
			ließe ihn dort mit der Leiste verschmelzen); gedrückt wird er wie die anderen Umschalter invers.
			Vorläufig eine Variante neben den anderen, bis entschieden ist, welcher Weg bleibt.
		</p>
		{#each sizes as size (size)}
			<Row label="Größe {size}">
				<IconButton {size} variant="bar" icon="share" label="Teilen" />
				<Button {size} variant="bar" iconEnd="chevron-down">2 Erweiterungen</Button>
				<Button {size} variant="bar" iconEnd="chevron-down">Calliope mini 3</Button>
			</Row>
		{/each}
		<Row label="Zustände">
			<Button variant="bar" pressed={barPressed} onclick={() => (barPressed = !barPressed)}>
				Simulator
			</Button>
			<Button variant="bar" loading>Teilen</Button>
			<Button variant="bar" disabled>Calliope mini 3</Button>
			<IconButton variant="bar" icon="share" label="Teilen" disabled />
		</Row>
		<div class="bars">
			{#each ['light', 'dark'] as const as theme (theme)}
				<div class="bar-pair" data-theme={theme}>
					<div class="editor-bar" data-surface="subtle">
						<span
							>{theme === 'light' ? 'Graue Leiste' : 'Dunkelgraue Leiste'}
							<code>data-surface="subtle"</code></span
						>
						<IconButton variant="bar" icon="share" label="Teilen" />
						<Button variant="bar" iconEnd="chevron-down">2 Erweiterungen</Button>
						<Button variant="bar" pressed>Simulator</Button>
					</div>
					<div class="editor-bar" data-surface={theme === 'light' ? 'default' : 'page'}>
						<span>{theme === 'light' ? 'Weiße Fläche' : 'Schwarze Fläche'}</span>
						<IconButton variant="bar" icon="share" label="Teilen" />
						<Button variant="bar" iconEnd="chevron-down">2 Erweiterungen</Button>
						<Button variant="bar" pressed>Simulator</Button>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section>
		<h2>Breite</h2>
		<p class="section-intro">
			Ein Button ist so breit wie seine Beschriftung, auch in Spalten (Karten, Dialoge), die ihre
			Kinder sonst auf volle Breite ziehen. Die ganze Zeile füllt er nur mit
			<code>fullWidth</code>.
		</p>
		<Row label="In einer Spalte">
			<div class="stack">
				<span>Raum „Klasse 6b“</span>
				<Button variant="secondary">Einstellungen</Button>
			</div>
			<div class="stack">
				<span>Mit fullWidth</span>
				<Button fullWidth>Beitreten</Button>
			</div>
		</Row>
	</section>

	<section>
		<h2>Rahmenstärke (D3)</h2>
		<p class="section-intro">
			Entschieden: 2 px in jeder Größe (oben). Zum Vergleich darunter ein Rahmen, der mit der
			Größe wächst (1,5 / 2 / 2,5 px), angelehnt an die Strichstärke der Schrift.
		</p>
		<Row label="2 px (entschieden)">
			{#each sizes as size (size)}
				<Button {size} variant="secondary">Abbrechen</Button>
			{/each}
		</Row>
		<div class="scaled">
			<Row label="1,5 / 2 / 2,5 px">
				{#each sizes as size (size)}
					<Button {size} variant="secondary">Abbrechen</Button>
				{/each}
			</Row>
		</div>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="data-theme=dark">
			<Button>Übertragen</Button>
			<Button variant="secondary">Abbrechen</Button>
			<Button variant="ghost">Mehr anzeigen</Button>
			<Button variant="link">Anleitung öffnen</Button>
			<Button tone="negative">Löschen</Button>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Ein Verb als Beschriftung: „Speichern“, „Raum schließen“.',
				'Ein Primary-Button pro Bereich; die Hauptaktion steht rechts.',
				'Löschen und andere endgültige Aktionen mit tone="negative" und einer Rückfrage (ConfirmDialog).',
				'Bei Ladevorgängen loading setzen statt den Button zu deaktivieren.'
			]}
			donts={[
				'Keine farbige Schrift auf Weiß, auch nicht für Ghost- oder Link-Buttons.',
				'Nicht die Marke (Teal) als Fläche für Aktionen.',
				'Die Beschriftung eines Umschalters nicht mit dem Zustand wechseln („Pausieren“/„Fortsetzen“).',
				'Keinen deaktivierten Primary-Button ohne sichtbaren Grund.'
			]}
			notFor={[
				'Nur ein Icon: IconButton.',
				'Aktionen rechts in einer Editor-Leiste: variant="bar", nicht primary oder secondary.',
				'Navigation zu einer anderen Seite im Fließtext: ein normaler Link.',
				'Ein Zustand an/aus, der sofort gilt: Switch.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,s)=>{A(e,{eyebrow:`Primitives`,title:`Button`,lead:e=>{x();var t=G();x(6),S(e,t)},children:(e,s)=>{var c=oe(),l=m(c),p=a(t(l),4);r(p,16,()=>W,e=>e,(e,t)=>{M(e,{get label(){return`Größe ${t??``}`},children:(e,n)=>{var r=K(),i=m(r);R(i,{get size(){return t},children:(e,t)=>{x();var n=y(`Übertragen`);S(e,n)},$$slots:{default:!0}});var o=a(i,2);R(o,{get size(){return t},variant:`secondary`,children:(e,t)=>{x();var n=y(`Abbrechen`);S(e,n)},$$slots:{default:!0}});var s=a(o,2);R(s,{get size(){return t},variant:`ghost`,children:(e,t)=>{x();var n=y(`Mehr anzeigen`);S(e,n)},$$slots:{default:!0}});var c=a(s,2);R(c,{get size(){return t},variant:`link`,children:(e,t)=>{x();var n=y(`Anleitung öffnen`);S(e,n)},$$slots:{default:!0}}),S(e,r)},$$slots:{default:!0}})}),d(l);var h=a(l,2),v=a(t(h),4);M(v,{label:`Status`,children:(e,t)=>{var n=q(),r=m(n);R(r,{tone:`positive`,icon:`check`,children:(e,t)=>{x();var n=y(`Freigeben`);S(e,n)},$$slots:{default:!0}});var i=a(r,2);R(i,{tone:`negative`,icon:`delete`,children:(e,t)=>{x();var n=y(`Löschen`);S(e,n)},$$slots:{default:!0}}),S(e,n)},$$slots:{default:!0}});var w=a(v,2);M(w,{label:`Identität`,children:(e,t)=>{var i=f(),a=m(i);r(a,16,()=>U,e=>e,(e,t)=>{R(e,{tone:`identity`,get identity(){return t},children:(e,r)=>{x();var i=y();n(()=>b(i,t)),S(e,i)},$$slots:{default:!0}})}),S(e,i)},$$slots:{default:!0}}),d(h);var T=a(h,2),E=a(t(T),2);M(E,{label:`Mit Icon`,children:(e,t)=>{var n=J(),r=m(n);R(r,{icon:`download`,children:(e,t)=>{x();var n=y(`Herunterladen`);S(e,n)},$$slots:{default:!0}});var i=a(r,2);R(i,{variant:`secondary`,iconEnd:`chevron-down`,children:(e,t)=>{x();var n=y(`Sortieren`);S(e,n)},$$slots:{default:!0}});var o=a(i,2);R(o,{variant:`ghost`,icon:`add`,children:(e,t)=>{x();var n=y(`Programm`);S(e,n)},$$slots:{default:!0}}),S(e,n)},$$slots:{default:!0}});var D=a(E,2);M(D,{label:`Lädt`,children:(e,t)=>{var n=J(),r=m(n);R(r,{loading:!0,children:(e,t)=>{x();var n=y(`Übertragen`);S(e,n)},$$slots:{default:!0}});var i=a(r,2);R(i,{variant:`secondary`,loading:!0,children:(e,t)=>{x();var n=y(`Abbrechen`);S(e,n)},$$slots:{default:!0}});var o=a(i,2);R(o,{tone:`negative`,loading:!0,children:(e,t)=>{x();var n=y(`Löschen`);S(e,n)},$$slots:{default:!0}}),S(e,n)},$$slots:{default:!0}});var O=a(D,2);M(O,{label:`Deaktiviert`,children:(e,t)=>{var n=K(),r=m(n);R(r,{disabled:!0,children:(e,t)=>{x();var n=y(`Übertragen`);S(e,n)},$$slots:{default:!0}});var i=a(r,2);R(i,{variant:`secondary`,disabled:!0,children:(e,t)=>{x();var n=y(`Abbrechen`);S(e,n)},$$slots:{default:!0}});var o=a(i,2);R(o,{variant:`ghost`,disabled:!0,children:(e,t)=>{x();var n=y(`Mehr anzeigen`);S(e,n)},$$slots:{default:!0}});var s=a(o,2);R(s,{variant:`link`,disabled:!0,children:(e,t)=>{x();var n=y(`Anleitung öffnen`);S(e,n)},$$slots:{default:!0}}),S(e,n)},$$slots:{default:!0}});var k=a(O,2);M(k,{label:`Fokussierbar deaktiviert`,children:(e,t)=>{var n=te(),r=m(n);R(r,{disabled:!0,focusableWhenDisabled:!0,children:(e,t)=>{x();var n=y(`Übertragen`);S(e,n)},$$slots:{default:!0}}),x(2),S(e,n)},$$slots:{default:!0}});var A=a(k,2);M(A,{label:`Umschalter`,children:(e,t)=>{var r=ne(),o=m(r);R(o,{variant:`secondary`,get pressed(){return u(g)},onclick:()=>C(g,!u(g)),children:(e,t)=>{x();var n=y(`Raum pausieren`);S(e,n)},$$slots:{default:!0}});var s=a(o,2),c=i(s);n(e=>b(c,`aria-pressed=${e??``}: die Beschriftung bleibt, der Zustand ist die Fläche`),[()=>String(u(g))]),S(e,r)},$$slots:{default:!0}});var j=a(A,2);M(j,{label:`Als Link`,children:(e,t)=>{R(e,{href:`#anleitung`,variant:`secondary`,iconEnd:`external-link`,children:(e,t)=>{x();var n=y(`Zur Anleitung`);S(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),d(T);var N=a(T,2),F=a(t(N),4);r(F,16,()=>W,e=>e,(e,t)=>{M(e,{get label(){return`Größe ${t??``}`},children:(e,n)=>{var r=J(),i=m(r);P(i,{get size(){return t},variant:`bar`,icon:`share`,label:`Teilen`});var o=a(i,2);R(o,{get size(){return t},variant:`bar`,iconEnd:`chevron-down`,children:(e,t)=>{x();var n=y(`2 Erweiterungen`);S(e,n)},$$slots:{default:!0}});var s=a(o,2);R(s,{get size(){return t},variant:`bar`,iconEnd:`chevron-down`,children:(e,t)=>{x();var n=y(`Calliope mini 3`);S(e,n)},$$slots:{default:!0}}),S(e,r)},$$slots:{default:!0}})});var I=a(F,2);M(I,{label:`Zustände`,children:(e,t)=>{var n=K(),r=m(n);R(r,{variant:`bar`,get pressed(){return u(_)},onclick:()=>C(_,!u(_)),children:(e,t)=>{x();var n=y(`Simulator`);S(e,n)},$$slots:{default:!0}});var i=a(r,2);R(i,{variant:`bar`,loading:!0,children:(e,t)=>{x();var n=y(`Teilen`);S(e,n)},$$slots:{default:!0}});var o=a(i,2);R(o,{variant:`bar`,disabled:!0,children:(e,t)=>{x();var n=y(`Calliope mini 3`);S(e,n)},$$slots:{default:!0}});var s=a(o,2);P(s,{variant:`bar`,icon:`share`,label:`Teilen`,disabled:!0}),S(e,n)},$$slots:{default:!0}});var L=a(I,2);r(L,20,()=>[`light`,`dark`],e=>e,(e,r)=>{var s=re(),c=t(s),l=t(c),u=t(l);x(),d(l);var f=a(l,2);P(f,{variant:`bar`,icon:`share`,label:`Teilen`});var p=a(f,2);R(p,{variant:`bar`,iconEnd:`chevron-down`,children:(e,t)=>{x();var n=y(`2 Erweiterungen`);S(e,n)},$$slots:{default:!0}});var m=a(p,2);R(m,{variant:`bar`,pressed:!0,children:(e,t)=>{x();var n=y(`Simulator`);S(e,n)},$$slots:{default:!0}}),d(c);var h=a(c,2),g=t(h),_=i(g,!0),v=a(g,2);P(v,{variant:`bar`,icon:`share`,label:`Teilen`});var C=a(v,2);R(C,{variant:`bar`,iconEnd:`chevron-down`,children:(e,t)=>{x();var n=y(`2 Erweiterungen`);S(e,n)},$$slots:{default:!0}});var w=a(C,2);R(w,{variant:`bar`,pressed:!0,children:(e,t)=>{x();var n=y(`Simulator`);S(e,n)},$$slots:{default:!0}}),d(h),d(s),n(()=>{o(s,`data-theme`,r),b(u,`${r===`light`?`Graue Leiste`:`Dunkelgraue Leiste`} `),o(h,`data-surface`,r===`light`?`default`:`page`),b(_,r===`light`?`Weiße Fläche`:`Schwarze Fläche`)}),S(e,s)}),d(L),d(N);var z=a(N,2),B=a(t(z),4);M(B,{label:`In einer Spalte`,children:(e,n)=>{var r=ie(),i=m(r),o=a(t(i),2);R(o,{variant:`secondary`,children:(e,t)=>{x();var n=y(`Einstellungen`);S(e,n)},$$slots:{default:!0}}),d(i);var s=a(i,2),c=a(t(s),2);R(c,{fullWidth:!0,children:(e,t)=>{x();var n=y(`Beitreten`);S(e,n)},$$slots:{default:!0}}),d(s),S(e,r)},$$slots:{default:!0}}),d(z);var V=a(z,2),H=a(t(V),4);M(H,{label:`2 px (entschieden)`,children:(e,t)=>{var n=f(),i=m(n);r(i,16,()=>W,e=>e,(e,t)=>{R(e,{get size(){return t},variant:`secondary`,children:(e,t)=>{x();var n=y(`Abbrechen`);S(e,n)},$$slots:{default:!0}})}),S(e,n)},$$slots:{default:!0}});var G=a(H,2),Y=t(G);M(Y,{label:`1,5 / 2 / 2,5 px`,children:(e,t)=>{var n=f(),i=m(n);r(i,16,()=>W,e=>e,(e,t)=>{R(e,{get size(){return t},variant:`secondary`,children:(e,t)=>{x();var n=y(`Abbrechen`);S(e,n)},$$slots:{default:!0}})}),S(e,n)},$$slots:{default:!0}}),d(G),d(V);var X=a(V,2),Z=a(t(X),2);M(Z,{label:`data-theme=dark`,children:(e,t)=>{var n=ae(),r=m(n);R(r,{children:(e,t)=>{x();var n=y(`Übertragen`);S(e,n)},$$slots:{default:!0}});var i=a(r,2);R(i,{variant:`secondary`,children:(e,t)=>{x();var n=y(`Abbrechen`);S(e,n)},$$slots:{default:!0}});var o=a(i,2);R(o,{variant:`ghost`,children:(e,t)=>{x();var n=y(`Mehr anzeigen`);S(e,n)},$$slots:{default:!0}});var s=a(o,2);R(s,{variant:`link`,children:(e,t)=>{x();var n=y(`Anleitung öffnen`);S(e,n)},$$slots:{default:!0}});var c=a(s,2);R(c,{tone:`negative`,children:(e,t)=>{x();var n=y(`Löschen`);S(e,n)},$$slots:{default:!0}}),S(e,n)},$$slots:{default:!0}}),d(X);var Q=a(X,2),$=a(t(Q),2);ee($,{dos:[`Ein Verb als Beschriftung: „Speichern“, „Raum schließen“.`,`Ein Primary-Button pro Bereich; die Hauptaktion steht rechts.`,`Löschen und andere endgültige Aktionen mit tone="negative" und einer Rückfrage (ConfirmDialog).`,`Bei Ladevorgängen loading setzen statt den Button zu deaktivieren.`],donts:[`Keine farbige Schrift auf Weiß, auch nicht für Ghost- oder Link-Buttons.`,`Nicht die Marke (Teal) als Fläche für Aktionen.`,`Die Beschriftung eines Umschalters nicht mit dem Zustand wechseln („Pausieren“/„Fortsetzen“).`,`Keinen deaktivierten Primary-Button ohne sichtbaren Grund.`],notFor:[`Nur ein Icon: IconButton.`,`Aktionen rechts in einer Editor-Leiste: variant="bar", nicht primary oder secondary.`,`Navigation zu einer anderen Seite im Fließtext: ein normaler Link.`,`Ein Zustand an/aus, der sofort gilt: Switch.`]}),d(Q),S(e,c)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),S(e,w),c()}var B,V,H,U,W,G,K,q,J,te,ne,re,ie,ae,oe,Y,X,Z,Q;function $(){return($=e((()=>{g(),w(),F(),O(),k(),j(),N(),L(),_(),T(),B=[void 0,...Object.keys(I)],V={title:`Primitives/Button`,component:R,tags:[`autodocs`],parameters:{layout:`padded`},args:{variant:`primary`,tone:`neutral`,size:`m`,loading:!1,disabled:!1},argTypes:{variant:{control:`inline-radio`,options:[`primary`,`secondary`,`ghost`,`link`,`bar`]},tone:{control:`inline-radio`,options:[`neutral`,`positive`,`negative`,`identity`]},identity:{control:`select`,options:[`makecode`,`python`,`blocks`,`markdown`,`ki-training`,`teachable`,`iot`,`robotik`]},size:{control:`inline-radio`,options:[`s`,`m`,`l`]},icon:{control:`select`,options:B},iconEnd:{control:`select`,options:B},pressed:{control:`boolean`}}},{Story:H}=E(V),U=[`makecode`,`python`,`blocks`,`markdown`,`ki-training`,`teachable`,`iot`,`robotik`],W=[`s`,`m`,`l`],G=h(`Ein Button für alle Aktionen: <code>variant</code> sagt, wie wichtig sie ist, <code>tone</code> färbt nur die Fläche eines Primary-Buttons, <code>size</code> passt ihn an. Die
			Pille heißt „drück mich“.`,1),K=h(`<!> <!> <!> <!>`,1),q=h(`<!> <!>`,1),J=h(`<!> <!> <!>`,1),te=h(`<!> <span class="muted">bleibt per Tab erreichbar (aria-disabled), damit ein Tooltip den Grund nennen kann</span>`,1),ne=h(`<!> <span class="muted"> </span>`,1),re=h(`<div class="bar-pair svelte-130kznu"><div class="editor-bar svelte-130kznu" data-surface="subtle"><span class="svelte-130kznu"> <code>data-surface="subtle"</code></span> <!> <!> <!></div> <div class="editor-bar svelte-130kznu"><span class="svelte-130kznu"> </span> <!> <!> <!></div></div>`),ie=h(`<div class="stack svelte-130kznu"><span>Raum „Klasse 6b“</span> <!></div> <div class="stack svelte-130kznu"><span>Mit fullWidth</span> <!></div>`,1),ae=h(`<!> <!> <!> <!> <!>`,1),oe=h(`<section><h2>Varianten und Größen</h2> <p class="section-intro">32 / 36 / 40 px hoch. Auf Flächen für Schülerinnen und Schüler ist <code>l</code> Standard (D6).</p> <!></section> <section><h2>Töne</h2> <p class="section-intro">Töne füllen nur. Text steht immer in der festen Paarfarbe auf der Fläche, nie farbig auf
				Weiß. Der Löschen-Button hat schwarze Schrift auf Rot (5,1:1).</p> <!> <!></section> <section><h2>Zustände</h2> <!> <!> <!> <!> <!> <!></section> <section><h2>Leisten-Button</h2> <p class="section-intro"><code>variant="bar"</code> ist der Button der Editor-Leiste aus Campus (Teilen,
				Erweiterungen, Calliope mini rechts in der MakeCode- und IoT-Leiste): Schrift in normaler
				Schreibweise, halbfett, 8 px Ecken, kein Rahmen. Seine Fläche ist das jeweils andere Neutral
				seines Untergrunds, damit er sich abhebt: grau auf Weiß, weiß auf Grau, dunkelgrau auf
				Schwarz, schwarz auf Dunkelgrau. Auf einer grauen Fläche (<code>surface.subtle</code>) sagt
				ihm <code>data-surface="subtle"</code> am Container Bescheid; ohne Attribut gilt Seite oder Karte.
				Beim Überfahren legt sich der übliche Schleier darüber, auf der grauen Leiste ein Rand (der Schleier
				ließe ihn dort mit der Leiste verschmelzen); gedrückt wird er wie die anderen Umschalter invers.
				Vorläufig eine Variante neben den anderen, bis entschieden ist, welcher Weg bleibt.</p> <!> <!> <div class="bars svelte-130kznu"></div></section> <section><h2>Breite</h2> <p class="section-intro">Ein Button ist so breit wie seine Beschriftung, auch in Spalten (Karten, Dialoge), die ihre
				Kinder sonst auf volle Breite ziehen. Die ganze Zeile füllt er nur mit <code>fullWidth</code>.</p> <!></section> <section><h2>Rahmenstärke (D3)</h2> <p class="section-intro">Entschieden: 2 px in jeder Größe (oben). Zum Vergleich darunter ein Rahmen, der mit der
				Größe wächst (1,5 / 2 / 2,5 px), angelehnt an die Strichstärke der Schrift.</p> <!> <div class="scaled svelte-130kznu"><!></div></section> <section data-theme="dark" class="dark-band svelte-130kznu"><h2>Auf dunklen Bereichen</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),z.__docgen={data:[],name:`Button.stories.svelte`},Y=D(z,V),X=[`Spielwiese`,`Übersicht`],Z={...Y.Spielwiese,tags:[`svelte-csf-v5`]},Q={...Y.Übersicht,tags:[`svelte-csf-v5`]}})))()}$();export{Z as Spielwiese,X as __namedExportsOrder,V as default,Q as Übersicht};