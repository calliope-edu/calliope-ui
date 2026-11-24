import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Pt as n,Vt as r,Xt as i,Zt as a,bt as o,cn as s,fn as c,jt as l,lt as u,mn as d,n as f,o as p,pt as m,q as h,sn as g,st as _,zt as v}from"./iframe-BsWRsydk.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-BWVMXit6.js";import{i as C,n as w,r as T,t as E}from"./Guidelines-B4Q9fRhg.js";import{n as D,t as O}from"./ProgressBar-B3NKFXKI.js";import{n as k,t as A}from"./Button-BP41bGzH.js";import{n as j,t as M}from"./Banner-7nygGxlY.js";function N(e,u){a(u,!0);let d=r(!0);var f=R(),y=l(f);F(y,{name:`Spielwiese`,template:(e,t=c)=>{M(e,p(t,{children:(e,t)=>{g();var n=m(`Ein Gerät sendet Werte, für die es noch keinen Feed gibt.`);_(e,n)},$$slots:{default:!0}}))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Banner {...args}>Ein Gerät sendet Werte, für die es noch keinen Feed gibt.</Banner>`}}});var b=n(y,2);F(b,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Patterns" title="Banner">
	{#snippet lead()}
		Ein Hinweis im Seitenfluss. Oben stehen ein optionales Status-Icon, die Überschrift und das X;
		darunter der Text mit seinen Buttons, mittig dazu ausgerichtet. Die Statusfarbe steckt nur in
		der Icon-Scheibe: kein Farbstreifen, kein getönter Hintergrund, und Info hat gar kein Icon.
		Fehler sind <code>role="alert"</code>, alles andere <code>role="status"</code>.
	{/snippet}

	<section>
		<h2>Töne</h2>
		<div class="stack">
			<Banner tone="info" title="Neuer Feed „temperatur“">
				Ein Gerät sendet Werte, für die es noch keinen Feed gibt.
			</Banner>
			<Banner tone="success" title="Feeds zusammengeführt">
				„temp“ und „temperatur“ sind jetzt ein Feed.
			</Banner>
			<Banner tone="warning" title="Raum pausiert">
				Geräte können gerade keine Werte senden.
			</Banner>
			<Banner tone="error" title="Keine Verbindung zum Server">
				Neue Werte erscheinen, sobald die Verbindung wieder steht.
			</Banner>
		</div>
	</section>

	<section>
		<h2>Mit Aktion und Schließen</h2>
		<div class="stack">
			{#if hintVisible}
				<Banner
					tone="info"
					title="Neuer Feed „licht“"
					onDismiss={() => (hintVisible = false)}
					dismissLabel="Hinweis schließen"
				>
					Lege eine Kachel an, um die Werte zu sehen.
					{#snippet actions()}
						<Button size="s" variant="secondary" icon="add">Kachel anlegen</Button>
					{/snippet}
				</Banner>
			{:else}
				<Button variant="secondary" size="s" onclick={() => (hintVisible = true)}>
					Hinweis wieder zeigen
				</Button>
			{/if}
			<Banner tone="error"
				>Nur eine Zeile ohne Titel: Der Feed konnte nicht gelöscht werden.</Banner
			>
			<Banner tone="success" title="Feeds zusammengeführt" onDismiss={() => {}} />
		</div>
	</section>

	<section>
		<h2>Beschäftigt</h2>
		<p class="note">
			<code>busy</code> setzt einen Spinner an die Stelle des Status-Icons und
			<code>aria-busy="true"</code>. Der Text darf auch ein ProgressBar sein.
		</p>
		<div class="stack">
			<Banner busy title="Raum wird vorbereitet…" onDismiss={() => {}}>
				Das dauert ein paar Sekunden.
				{#snippet actions()}
					<Button size="s" variant="secondary">Abbrechen</Button>
				{/snippet}
			</Banner>
			<Banner busy title="Werte werden exportiert…">
				<ProgressBar label="Export" value={64} />
			</Banner>
		</div>
	</section>

	<section>
		<h2>Schwebend</h2>
		<p class="note">
			<code>floating</code> gibt die erhöhte Fläche mit Schatten und so viel Breite wie der Inhalt braucht,
			für einen Banner über der Seite. Die Position setzt die App.
		</p>
		<div class="stack floating-demo">
			<Banner floating tone="warning" title="Raum pausiert" onDismiss={() => {}}>
				Geräte können gerade keine Werte senden.
				{#snippet actions()}
					<Button size="s" variant="secondary">Fortsetzen</Button>
				{/snippet}
			</Banner>
		</div>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<div class="stack">
			<Banner tone="info" title="Neuer Feed" onDismiss={() => {}}>
				Ein Gerät sendet neue Werte.
				{#snippet actions()}
					<Button size="s" variant="secondary">Kachel anlegen</Button>
				{/snippet}
			</Banner>
			<Banner tone="success" title="Feeds zusammengeführt">Ein Feed statt zwei.</Banner>
			<Banner tone="warning" title="Raum pausiert">Geräte senden gerade nichts.</Banner>
			<Banner tone="error" title="Keine Verbindung">Neue Werte erscheinen später.</Banner>
			<Banner busy title="Verbinde…" floating>Bitte warten.</Banner>
		</div>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Titel nennt, was passiert ist; der Text, was man tun kann.',
				'Höchstens eine Aktion, als Button s secondary.',
				'Ein Banner, das schon beim Laden der Seite da ist, bekommt live="none".'
			]}
			donts={[
				'Keine eingefärbte Fläche, kein Farbstreifen, kein roter Text.',
				'Nicht mehrere Banner übereinander stapeln: zusammenfassen.'
			]}
			notFor={[
				'Rückmeldung zu einer gerade ausgeführten Aktion: Toast.',
				'Fehler eines einzelnen Feldes: TextField error.',
				'Eine leere Liste: EmptyState.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{T(e,{eyebrow:`Patterns`,title:`Banner`,lead:e=>{g();var t=I();g(4),_(e,t)},children:(e,r)=>{var i=L(),a=l(i),c=n(t(a),2),u=t(c);M(u,{tone:`info`,title:`Neuer Feed „temperatur“`,children:(e,t)=>{g();var n=m(`Ein Gerät sendet Werte, für die es noch keinen Feed gibt.`);_(e,n)},$$slots:{default:!0}});var f=n(u,2);M(f,{tone:`success`,title:`Feeds zusammengeführt`,children:(e,t)=>{g();var n=m(`„temp“ und „temperatur“ sind jetzt ein Feed.`);_(e,n)},$$slots:{default:!0}});var p=n(f,2);M(p,{tone:`warning`,title:`Raum pausiert`,children:(e,t)=>{g();var n=m(`Geräte können gerade keine Werte senden.`);_(e,n)},$$slots:{default:!0}});var y=n(p,2);M(y,{tone:`error`,title:`Keine Verbindung zum Server`,children:(e,t)=>{g();var n=m(`Neue Werte erscheinen, sobald die Verbindung wieder steht.`);_(e,n)},$$slots:{default:!0}}),s(c),s(a);var b=n(a,2),x=n(t(b),2),S=t(x),C=e=>{M(e,{tone:`info`,title:`Neuer Feed „licht“`,onDismiss:()=>v(d,!1),dismissLabel:`Hinweis schließen`,actions:e=>{A(e,{size:`s`,variant:`secondary`,icon:`add`,children:(e,t)=>{g();var n=m(`Kachel anlegen`);_(e,n)},$$slots:{default:!0}})},children:(e,t)=>{g();var n=m(`Lege eine Kachel an, um die Werte zu sehen.`);_(e,n)},$$slots:{actions:!0,default:!0}})},w=e=>{A(e,{variant:`secondary`,size:`s`,onclick:()=>v(d,!0),children:(e,t)=>{g();var n=m(`Hinweis wieder zeigen`);_(e,n)},$$slots:{default:!0}})};h(S,e=>{o(d)?e(C):e(w,-1)});var T=n(S,2);M(T,{tone:`error`,children:(e,t)=>{g();var n=m(`Nur eine Zeile ohne Titel: Der Feed konnte nicht gelöscht werden.`);_(e,n)},$$slots:{default:!0}});var D=n(T,2);M(D,{tone:`success`,title:`Feeds zusammengeführt`,onDismiss:()=>{}}),s(x),s(b);var k=n(b,2),j=n(t(k),4),N=t(j);M(N,{busy:!0,title:`Raum wird vorbereitet…`,onDismiss:()=>{},actions:e=>{A(e,{size:`s`,variant:`secondary`,children:(e,t)=>{g();var n=m(`Abbrechen`);_(e,n)},$$slots:{default:!0}})},children:(e,t)=>{g();var n=m(`Das dauert ein paar Sekunden.`);_(e,n)},$$slots:{actions:!0,default:!0}});var P=n(N,2);M(P,{busy:!0,title:`Werte werden exportiert…`,children:(e,t)=>{O(e,{label:`Export`,value:64})},$$slots:{default:!0}}),s(j),s(k);var F=n(k,2),I=n(t(F),4),R=t(I);M(R,{floating:!0,tone:`warning`,title:`Raum pausiert`,onDismiss:()=>{},actions:e=>{A(e,{size:`s`,variant:`secondary`,children:(e,t)=>{g();var n=m(`Fortsetzen`);_(e,n)},$$slots:{default:!0}})},children:(e,t)=>{g();var n=m(`Geräte können gerade keine Werte senden.`);_(e,n)},$$slots:{actions:!0,default:!0}}),s(I),s(F);var z=n(F,2),B=n(t(z),2),V=t(B);M(V,{tone:`info`,title:`Neuer Feed`,onDismiss:()=>{},actions:e=>{A(e,{size:`s`,variant:`secondary`,children:(e,t)=>{g();var n=m(`Kachel anlegen`);_(e,n)},$$slots:{default:!0}})},children:(e,t)=>{g();var n=m(`Ein Gerät sendet neue Werte.`);_(e,n)},$$slots:{actions:!0,default:!0}});var H=n(V,2);M(H,{tone:`success`,title:`Feeds zusammengeführt`,children:(e,t)=>{g();var n=m(`Ein Feed statt zwei.`);_(e,n)},$$slots:{default:!0}});var U=n(H,2);M(U,{tone:`warning`,title:`Raum pausiert`,children:(e,t)=>{g();var n=m(`Geräte senden gerade nichts.`);_(e,n)},$$slots:{default:!0}});var W=n(U,2);M(W,{tone:`error`,title:`Keine Verbindung`,children:(e,t)=>{g();var n=m(`Neue Werte erscheinen später.`);_(e,n)},$$slots:{default:!0}});var G=n(W,2);M(G,{busy:!0,title:`Verbinde…`,floating:!0,children:(e,t)=>{g();var n=m(`Bitte warten.`);_(e,n)},$$slots:{default:!0}}),s(B),s(z);var K=n(z,2),q=n(t(K),2);E(q,{dos:[`Titel nennt, was passiert ist; der Text, was man tun kann.`,`Höchstens eine Aktion, als Button s secondary.`,`Ein Banner, das schon beim Laden der Seite da ist, bekommt live="none".`],donts:[`Keine eingefärbte Fläche, kein Farbstreifen, kein roter Text.`,`Nicht mehrere Banner übereinander stapeln: zusammenfassen.`],notFor:[`Rückmeldung zu einer gerade ausgeführten Aktion: Toast.`,`Fehler eines einzelnen Feldes: TextField error.`,`Eine leere Liste: EmptyState.`]}),s(K),_(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),_(e,f),i()}var P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{d(),y(),C(),w(),k(),D(),j(),f(),b(),P={title:`Patterns/Banner`,component:M,tags:[`autodocs`],parameters:{layout:`padded`},args:{tone:`info`,title:`Neuer Feed „temperatur“`},argTypes:{tone:{control:`inline-radio`,options:[`info`,`success`,`warning`,`error`]},live:{control:`inline-radio`,options:[`status`,`alert`,`none`]}}},{Story:F}=x(P),I=u(`Ein Hinweis im Seitenfluss. Oben stehen ein optionales Status-Icon, die Überschrift und das X;
			darunter der Text mit seinen Buttons, mittig dazu ausgerichtet. Die Statusfarbe steckt nur in
			der Icon-Scheibe: kein Farbstreifen, kein getönter Hintergrund, und Info hat gar kein Icon.
			Fehler sind <code>role="alert"</code>, alles andere <code>role="status"</code>.`,1),L=u(`<section><h2>Töne</h2> <div class="stack svelte-texyeq"><!> <!> <!> <!></div></section> <section><h2>Mit Aktion und Schließen</h2> <div class="stack svelte-texyeq"><!> <!> <!></div></section> <section><h2>Beschäftigt</h2> <p class="note svelte-texyeq"><code>busy</code> setzt einen Spinner an die Stelle des Status-Icons und <code>aria-busy="true"</code>. Der Text darf auch ein ProgressBar sein.</p> <div class="stack svelte-texyeq"><!> <!></div></section> <section><h2>Schwebend</h2> <p class="note svelte-texyeq"><code>floating</code> gibt die erhöhte Fläche mit Schatten und so viel Breite wie der Inhalt braucht,
				für einen Banner über der Seite. Die Position setzt die App.</p> <div class="stack floating-demo svelte-texyeq"><!></div></section> <section data-theme="dark" class="dark-band svelte-texyeq"><h2>Auf dunklen Bereichen</h2> <div class="stack svelte-texyeq"><!> <!> <!> <!> <!></div></section> <section><h2>Richtlinien</h2> <!></section>`,1),R=u(`<!> <!>`,1),N.__docgen={data:[],name:`Banner.stories.svelte`},z=S(N,P),B=[`Spielwiese`,`Übersicht`],V={...z.Spielwiese,tags:[`svelte-csf-v5`]},H={...z.Übersicht,tags:[`svelte-csf-v5`]}})))()}U();export{V as Spielwiese,B as __namedExportsOrder,P as default,H as Übersicht};