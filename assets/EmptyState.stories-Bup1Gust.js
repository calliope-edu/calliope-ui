import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Pt as n,Xt as r,Zt as i,cn as a,fn as o,jt as s,lt as c,mn as l,n as u,o as d,pt as f,sn as p,st as m}from"./iframe-BsWRsydk.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-BWVMXit6.js";import{i as y,n as b,r as x,t as S}from"./Guidelines-B4Q9fRhg.js";import{n as C,t as w}from"./Button-BP41bGzH.js";import{n as T,t as E}from"./EmptyState-CekqZRpY.js";function D(e,c){i(c,!0);var l=A(),u=s(l);k(u,{name:`Spielwiese`,template:(e,t=o)=>{E(e,d(t,{actions:e=>{w(e,{icon:`add`,children:(e,t)=>{p();var n=f(`Kachel anlegen`);m(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0}}))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<EmptyState {...args}>
	{#snippet actions()}
		<Button icon="add">Kachel anlegen</Button>
	{/snippet}
</EmptyState>`}}});var h=n(u,2);k(h,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Patterns" title="EmptyState">
	{#snippet lead()}
		Was an einer Stelle erscheint, solange es nichts zu zeigen gibt: ein Satz, was fehlt, ein
		Satz, wozu es da ist, und höchstens eine Hauptaktion für den ersten Schritt.
	{/snippet}

	<section>
		<h2>Erster Start</h2>
		<div class="frame">
			<EmptyState
				title="Noch keine Kacheln"
				description="Kacheln zeigen die Werte deiner Geräte oder steuern sie. Lege die erste an."
				icon="add"
			>
				{#snippet actions()}
					<Button icon="add">Kachel anlegen</Button>
					<Button variant="secondary">Beispiel laden</Button>
				{/snippet}
			</EmptyState>
		</div>
	</section>

	<section>
		<h2>Kompakt</h2>
		<p class="section-intro">
			In einer Tabelle oder einem kleinen Panel: linksbündig, ohne Icon.
		</p>
		<div class="frame">
			<EmptyState
				compact
				level={4}
				title="Noch keine Werte"
				description="Sobald ein Gerät an „temperatur“ sendet, erscheinen die Werte hier."
			/>
		</div>
	</section>

	<section>
		<h2>Kein Treffer</h2>
		<div class="frame">
			<EmptyState
				title="Keine Feeds mit „licht“"
				description="Prüfe die Schreibweise oder zeige alle Feeds."
				icon="filter-off"
			>
				{#snippet actions()}
					<Button variant="secondary">Filter zurücksetzen</Button>
				{/snippet}
			</EmptyState>
		</div>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<EmptyState
			title="Noch keine Werte"
			description="Sobald ein Gerät sendet, erscheint hier der Verlauf."
			icon="device"
		/>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Der Titel ist eine Feststellung („Noch keine Feeds“), keine Fehlermeldung.',
				'Die Aktion beginnt den ersten Schritt, mit Verb („Kachel anlegen“).',
				'Die Überschriftenebene (level) passt zur Seite.'
			]}
			donts={[
				'Keine Statusfarbe: eine leere Liste ist kein Fehler.',
				'Keine langen Anleitungen: höchstens zwei Sätze, Hilfe verlinken.'
			]}
			notFor={['Etwas ist schiefgegangen: Banner mit tone="error".']}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{x(e,{eyebrow:`Patterns`,title:`EmptyState`,lead:e=>{p();var t=f(`Was an einer Stelle erscheint, solange es nichts zu zeigen gibt: ein Satz, was fehlt, ein
			Satz, wozu es da ist, und höchstens eine Hauptaktion für den ersten Schritt.`);m(e,t)},children:(e,r)=>{var i=j(),o=s(i),c=n(t(o),2),l=t(c);E(l,{title:`Noch keine Kacheln`,description:`Kacheln zeigen die Werte deiner Geräte oder steuern sie. Lege die erste an.`,icon:`add`,actions:e=>{var t=A(),r=s(t);w(r,{icon:`add`,children:(e,t)=>{p();var n=f(`Kachel anlegen`);m(e,n)},$$slots:{default:!0}});var i=n(r,2);w(i,{variant:`secondary`,children:(e,t)=>{p();var n=f(`Beispiel laden`);m(e,n)},$$slots:{default:!0}}),m(e,t)},$$slots:{actions:!0}}),a(c),a(o);var u=n(o,2),d=n(t(u),4),h=t(d);E(h,{compact:!0,level:4,title:`Noch keine Werte`,description:`Sobald ein Gerät an „temperatur“ sendet, erscheinen die Werte hier.`}),a(d),a(u);var g=n(u,2),_=n(t(g),2),v=t(_);E(v,{title:`Keine Feeds mit „licht“`,description:`Prüfe die Schreibweise oder zeige alle Feeds.`,icon:`filter-off`,actions:e=>{w(e,{variant:`secondary`,children:(e,t)=>{p();var n=f(`Filter zurücksetzen`);m(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0}}),a(_),a(g);var y=n(g,2),b=n(t(y),2);E(b,{title:`Noch keine Werte`,description:`Sobald ein Gerät sendet, erscheint hier der Verlauf.`,icon:`device`}),a(y);var x=n(y,2),C=n(t(x),2);S(C,{dos:[`Der Titel ist eine Feststellung („Noch keine Feeds“), keine Fehlermeldung.`,`Die Aktion beginnt den ersten Schritt, mit Verb („Kachel anlegen“).`,`Die Überschriftenebene (level) passt zur Seite.`],donts:[`Keine Statusfarbe: eine leere Liste ist kein Fehler.`,`Keine langen Anleitungen: höchstens zwei Sätze, Hilfe verlinken.`],notFor:[`Etwas ist schiefgegangen: Banner mit tone="error".`]}),a(x),m(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),m(e,l),r()}var O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{l(),h(),y(),b(),C(),T(),u(),g(),O={title:`Patterns/EmptyState`,component:E,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Noch keine Kacheln`,description:`Kacheln zeigen die Werte deiner Geräte oder steuern sie.`,icon:`add`,compact:!1}},{Story:k}=_(O),A=c(`<!> <!>`,1),j=c(`<section><h2>Erster Start</h2> <div class="frame svelte-1szevpq"><!></div></section> <section><h2>Kompakt</h2> <p class="section-intro">In einer Tabelle oder einem kleinen Panel: linksbündig, ohne Icon.</p> <div class="frame svelte-1szevpq"><!></div></section> <section><h2>Kein Treffer</h2> <div class="frame svelte-1szevpq"><!></div></section> <section data-theme="dark" class="dark-band svelte-1szevpq"><h2>Auf dunklen Bereichen</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),D.__docgen={data:[],name:`EmptyState.stories.svelte`},M=v(D,O),N=[`Spielwiese`,`Übersicht`],P={...M.Spielwiese,tags:[`svelte-csf-v5`]},F={...M.Übersicht,tags:[`svelte-csf-v5`]}})))()}I();export{P as Spielwiese,N as __namedExportsOrder,O as default,F as Übersicht};