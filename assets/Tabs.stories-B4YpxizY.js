import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Gt as n,Pt as r,Vt as i,Xt as a,Zt as o,bt as s,cn as c,fn as l,jt as u,lt as d,mn as f,n as p,pt as m,sn as h,st as g,zt as _}from"./iframe-BsWRsydk.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-BWVMXit6.js";import{i as S,n as C,r as w,t as T}from"./Guidelines-B4Q9fRhg.js";import{n as ee,t as E}from"./Row-DwZNmfYl.js";import{a as D,c as te,i as ne,n as re,o as O,r as k,s as A,t as j}from"./Tabs-D_SwbM6k.js";function M(e,n){o(n,!0);let d=i(`dashboard`),f=i(`feeds`);var p=J(),v=u(p);F(v,{name:`Spielwiese`,template:(e,t=l)=>{j(e,{get value(){return t().value},children:(e,t)=>{N(e,()=>!1)},$$slots:{default:!0}})},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Tabs value={args.value}>{@render projectTabs(false)}</Tabs>`}}});var y=r(v,2);F(y,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Navigation" title="Tabs">
	{#snippet lead()}
		Wechselt zwischen Inhaltsbereichen derselben Seite (<code>tablist</code>, <code>tab</code>,
		<code>tabpanel</code>). Der aktive Tab trägt die 2px-Akzentlinie; Pfeiltasten, Pos1 und Ende
		wechseln sofort, Tab springt in den Inhalt.
	{/snippet}

	<section>
		<h2>Zustände</h2>
		<p class="section-intro">
			Hover legt den Hover-Ton hinter den Tab, Tastaturfokus zeigt den Fokusring innen am Tab und
			am Inhaltsbereich (mit Tab hineinspringen).
		</p>
		<Row label="Nur Text">
			<div class="frame"><Tabs bind:value={view}>{@render projectTabs(false)}</Tabs></div>
		</Row>
		<Row label="Mit Icons">
			<div class="frame"><Tabs value="feeds">{@render projectTabs(true)}</Tabs></div>
		</Row>
		<Row label="Ein Tab deaktiviert">
			<div class="frame">
				<Tabs value="live">
					<TabList label="Raum">
						<Tab value="live">Live-Ansicht</Tab>
						<Tab value="export" disabled>Export</Tab>
						<Tab value="history">Verlauf</Tab>
					</TabList>
					<TabPanel value="live"><p class="panel-text">Live-Werte der Klasse</p></TabPanel>
					<TabPanel value="export"><p class="panel-text">Export</p></TabPanel>
					<TabPanel value="history"><p class="panel-text">Werte der letzten Stunde</p></TabPanel>
				</Tabs>
			</div>
		</Row>
		<Row label="Schmal (scrollt)">
			<div class="frame narrow">
				<Tabs value="dashboard">{@render projectTabs(true)}</Tabs>
			</div>
		</Row>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Mit Icons">
			<div class="frame"><Tabs bind:value={darkView}>{@render projectTabs(true)}</Tabs></div>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Tabs wechseln Inhaltsbereiche, die nebeneinander stehen könnten: „Dashboard“, „Feeds“, „Einstellungen“.',
				'Kurze Labels aus ein bis zwei Wörtern; die Liste bekommt einen Namen (label), z. B. „Projektansicht“.',
				'Ein Tab ist immer gewählt; der erste Tab ist der Start.'
			]}
			donts={[
				'Keine Tabs für Schritte, die nacheinander kommen müssen.',
				'Keine Aktion hinter einem Tab („Speichern“ ist ein Button).',
				'Den aktiven Tab nicht nur über Farbe zeigen: die Akzentlinie gehört dazu.'
			]}
			notFor={[
				'Einen Modus oder Wert aus zwei bis vier Optionen wählen: SegmentedControl.',
				'Mehr als etwa sechs Bereiche oder Wechsel zwischen Seiten: Navigation der App.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,n)=>{w(e,{eyebrow:`Navigation`,title:`Tabs`,lead:e=>{h();var t=V();h(6),g(e,t)},children:(e,n)=>{var i=q(),a=u(i),o=r(t(a),4);E(o,{label:`Nur Text`,children:(e,n)=>{var r=H(),i=t(r);j(i,{get value(){return s(d)},set value(e){_(d,e,!0)},children:(e,t)=>{N(e,()=>!1)},$$slots:{default:!0}}),c(r),g(e,r)},$$slots:{default:!0}});var l=r(o,2);E(l,{label:`Mit Icons`,children:(e,n)=>{var r=H(),i=t(r);j(i,{value:`feeds`,children:(e,t)=>{N(e,()=>!0)},$$slots:{default:!0}}),c(r),g(e,r)},$$slots:{default:!0}});var p=r(l,2);E(p,{label:`Ein Tab deaktiviert`,children:(e,n)=>{var i=H(),a=t(i);j(a,{value:`live`,children:(e,t)=>{var n=B(),i=u(n);D(i,{label:`Raum`,children:(e,t)=>{var n=I(),i=u(n);A(i,{value:`live`,children:(e,t)=>{h();var n=m(`Live-Ansicht`);g(e,n)},$$slots:{default:!0}});var a=r(i,2);A(a,{value:`export`,disabled:!0,children:(e,t)=>{h();var n=m(`Export`);g(e,n)},$$slots:{default:!0}});var o=r(a,2);A(o,{value:`history`,children:(e,t)=>{h();var n=m(`Verlauf`);g(e,n)},$$slots:{default:!0}}),g(e,n)},$$slots:{default:!0}});var a=r(i,2);k(a,{value:`live`,children:(e,t)=>{var n=U();g(e,n)},$$slots:{default:!0}});var o=r(a,2);k(o,{value:`export`,children:(e,t)=>{var n=W();g(e,n)},$$slots:{default:!0}});var s=r(o,2);k(s,{value:`history`,children:(e,t)=>{var n=G();g(e,n)},$$slots:{default:!0}}),g(e,n)},$$slots:{default:!0}}),c(i),g(e,i)},$$slots:{default:!0}});var v=r(p,2);E(v,{label:`Schmal (scrollt)`,children:(e,n)=>{var r=K(),i=t(r);j(i,{value:`dashboard`,children:(e,t)=>{N(e,()=>!0)},$$slots:{default:!0}}),c(r),g(e,r)},$$slots:{default:!0}}),c(a);var y=r(a,2),b=r(t(y),2);E(b,{label:`Mit Icons`,children:(e,n)=>{var r=H(),i=t(r);j(i,{get value(){return s(f)},set value(e){_(f,e,!0)},children:(e,t)=>{N(e,()=>!0)},$$slots:{default:!0}}),c(r),g(e,r)},$$slots:{default:!0}}),c(y);var x=r(y,2),S=r(t(x),2);T(S,{dos:[`Tabs wechseln Inhaltsbereiche, die nebeneinander stehen könnten: „Dashboard“, „Feeds“, „Einstellungen“.`,`Kurze Labels aus ein bis zwei Wörtern; die Liste bekommt einen Namen (label), z. B. „Projektansicht“.`,`Ein Tab ist immer gewählt; der erste Tab ist der Start.`],donts:[`Keine Tabs für Schritte, die nacheinander kommen müssen.`,`Keine Aktion hinter einem Tab („Speichern“ ist ein Button).`,`Den aktiven Tab nicht nur über Farbe zeigen: die Akzentlinie gehört dazu.`],notFor:[`Einen Modus oder Wert aus zwei bis vier Optionen wählen: SegmentedControl.`,`Mehr als etwa sechs Bereiche oder Wechsel zwischen Seiten: Navigation der App.`]}),c(x),g(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),g(e,p),a()}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{f(),v(),S(),C(),ee(),te(),O(),ne(),re(),p(),y(),N=(e,t=l)=>{var i=B(),a=u(i);D(a,{label:`Projektansicht`,children:(e,i)=>{var a=I(),o=u(a);{let e=n(()=>t()?`device`:void 0);A(o,{value:`dashboard`,get icon(){return s(e)},children:(e,t)=>{h();var n=m(`Dashboard`);g(e,n)},$$slots:{default:!0}})}var c=r(o,2);{let e=n(()=>t()?`wifi`:void 0);A(c,{value:`feeds`,get icon(){return s(e)},children:(e,t)=>{h();var n=m(`Feeds`);g(e,n)},$$slots:{default:!0}})}var l=r(c,2);{let e=n(()=>t()?`settings`:void 0);A(l,{value:`settings`,get icon(){return s(e)},children:(e,t)=>{h();var n=m(`Einstellungen`);g(e,n)},$$slots:{default:!0}})}g(e,a)},$$slots:{default:!0}});var o=r(a,2);k(o,{value:`dashboard`,children:(e,t)=>{var n=L();g(e,n)},$$slots:{default:!0}});var c=r(o,2);k(c,{value:`feeds`,children:(e,t)=>{var n=R();g(e,n)},$$slots:{default:!0}});var d=r(c,2);k(d,{value:`settings`,children:(e,t)=>{var n=z();g(e,n)},$$slots:{default:!0}}),g(e,i)},P={title:`Navigation/Tabs`,component:j,tags:[`autodocs`],parameters:{layout:`padded`},args:{value:`dashboard`}},{Story:F}=b(P),I=d(`<!> <!> <!>`,1),L=d(`<p class="panel-text svelte-14sra7y">4 Widgets · zuletzt aktualisiert vor 2 Minuten</p>`),R=d(`<p class="panel-text svelte-14sra7y">Temperatur, Lautstärke und Helligkeit von 12 Geräten</p>`),z=d(`<p class="panel-text svelte-14sra7y">Raumcode, Aktualisierung und Geräte verwalten</p>`),B=d(`<!> <!> <!> <!>`,1),V=d(`Wechselt zwischen Inhaltsbereichen derselben Seite (<code>tablist</code>, <code>tab</code>, <code>tabpanel</code>). Der aktive Tab trägt die 2px-Akzentlinie; Pfeiltasten, Pos1 und Ende
			wechseln sofort, Tab springt in den Inhalt.`,1),H=d(`<div class="frame svelte-14sra7y"><!></div>`),U=d(`<p class="panel-text svelte-14sra7y">Live-Werte der Klasse</p>`),W=d(`<p class="panel-text svelte-14sra7y">Export</p>`),G=d(`<p class="panel-text svelte-14sra7y">Werte der letzten Stunde</p>`),K=d(`<div class="frame narrow svelte-14sra7y"><!></div>`),q=d(`<section><h2>Zustände</h2> <p class="section-intro">Hover legt den Hover-Ton hinter den Tab, Tastaturfokus zeigt den Fokusring innen am Tab und
				am Inhaltsbereich (mit Tab hineinspringen).</p> <!> <!> <!> <!></section> <section data-theme="dark" class="dark-band svelte-14sra7y"><h2>Auf dunklen Bereichen</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),J=d(`<!> <!>`,1),M.__docgen={data:[],name:`Tabs.stories.svelte`},Y=x(M,P),X=[`Spielwiese`,`Übersicht`],Z={...Y.Spielwiese,tags:[`svelte-csf-v5`]},Q={...Y.Übersicht,tags:[`svelte-csf-v5`]}})))()}$();export{Z as Spielwiese,X as __namedExportsOrder,P as default,Q as Übersicht};