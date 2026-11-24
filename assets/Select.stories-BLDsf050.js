import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Nt as r,Pt as i,Vt as a,Xt as o,Zt as s,bt as c,cn as l,fn as u,jt as d,lt as f,mn as p,n as m,o as h,pt as g,rt as _,sn as v,st as y,zt as b}from"./iframe-BsWRsydk.js";import{i as x,n as S,r as C,t as w}from"./create-runtime-stories-BWVMXit6.js";import{i as T,n as E,r as D,t as O}from"./Guidelines-B4Q9fRhg.js";import{n as k,t as A}from"./Row-DwZNmfYl.js";import{n as j,t as M}from"./Select--3GqDnkt.js";function N(e,f){s(f,!0);let p=a(`temperature`);var m=U(),x=d(m);z(x,{name:`Spielwiese`,template:(e,n=u)=>{var r=B(),i=t(r);M(i,h(n)),l(r),y(e,r)},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<div style="max-width: 24rem"><Select {...args} /></div>`}}});var S=i(x,2);z(S,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Select">
	{#snippet lead()}
		Auswahl eines Werts aus einer festen Liste, mit sichtbarem Label. Pfeiltasten bewegen die
		Auswahl, Enter wählt, ein Anfangsbuchstabe springt zum passenden Eintrag; Escape schließt und
		lässt den Fokus auf dem Feld.
	{/snippet}

	<section>
		<h2>Zustände</h2>
		<div class="grid">
			<Select label="Zeitraum" items={periods} placeholder="Zeitraum wählen" />
			<Select label="Messwert" items={metrics} value="light" />
			<Select
				label="Gerät"
				items={devices}
				placeholder="Gerät wählen"
				hint="Nur Geräte, die gerade verbunden sind."
			/>
			<Select
				label="Gerät"
				items={devices}
				placeholder="Gerät wählen"
				error="Wähle ein Gerät, damit Messwerte ankommen."
			/>
			<Select label="Zeitraum" items={periods} value="day" disabled />
			<Select label="Messwert" items={metrics} placeholder="Messwert wählen" required />
		</div>
	</section>

	<section>
		<h2>Auswahl</h2>
		<p class="section-intro">
			Gewählt ist, was im Feld steht und in der Liste einen Haken hat. Deaktivierte Einträge
			bleiben sichtbar, lassen sich aber nicht wählen.
		</p>
		<Row label="Gebunden">
			<div class="field"><Select label="Messwert" items={metrics} bind:value={metric} /></div>
			<span class="muted">value = {metric ?? '–'}</span>
		</Row>
	</section>

	<section>
		<h2>Gruppen</h2>
		<p class="section-intro">
			Einträge mit derselben <code>group</code> stehen unter einer gemeinsamen Überschrift, wie
			<code>&lt;optgroup&gt;</code>. Nur, wenn die Gruppen beim Finden helfen; sonst eine flache
			Liste.
		</p>
		<div class="field">
			<Select label="Messwert" items={feeds} placeholder="Messwert wählen" />
		</div>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<div class="grid">
			<Select label="Zeitraum" items={periods} value="hour" hint="Gilt für alle Diagramme." />
			<Select
				label="Gerät"
				items={devices}
				placeholder="Gerät wählen"
				error="Dieses Gerät ist offline."
			/>
		</div>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Für etwa 4 bis 15 feste Einträge, die sich nicht nach dem Tippen sortieren müssen.',
				'Das Label bleibt immer sichtbar; der Platzhalter sagt nur, was zu tun ist („Gerät wählen“).',
				'Einträge kurz und unterscheidbar am Anfang („Letzte Stunde“, „Letzter Tag“).'
			]}
			donts={[
				'Kein Select zur Navigation: Seitenwechsel gehören in Links, Tabs oder ein Menü.',
				'Kein Platzhalter als einziges Label.',
				'Keine Aktionen als Einträge („Löschen“); dafür gibt es das Menu.'
			]}
			notFor={[
				'Zwei bis drei Optionen: RadioGroup oder SegmentedControl, alle auf einen Blick.',
				'Lange oder durchsuchbare Listen (Raumcode-Wörter): Combobox.',
				'Aktionen an einem Element: Menu.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,a)=>{D(e,{eyebrow:`Primitives`,title:`Select`,lead:e=>{v();var t=g(`Auswahl eines Werts aus einer festen Liste, mit sichtbarem Label. Pfeiltasten bewegen die
			Auswahl, Enter wählt, ein Anfangsbuchstabe springt zum passenden Eintrag; Escape schließt und
			lässt den Fokus auf dem Feld.`);y(e,t)},children:(e,a)=>{var o=H(),s=d(o),u=i(t(s),2),f=t(u);M(f,{label:`Zeitraum`,get items(){return P},placeholder:`Zeitraum wählen`});var m=i(f,2);M(m,{label:`Messwert`,get items(){return F},value:`light`});var h=i(m,2);M(h,{label:`Gerät`,get items(){return I},placeholder:`Gerät wählen`,hint:`Nur Geräte, die gerade verbunden sind.`});var g=i(h,2);M(g,{label:`Gerät`,get items(){return I},placeholder:`Gerät wählen`,error:`Wähle ein Gerät, damit Messwerte ankommen.`});var v=i(g,2);M(v,{label:`Zeitraum`,get items(){return P},value:`day`,disabled:!0});var x=i(v,2);M(x,{label:`Messwert`,get items(){return F},placeholder:`Messwert wählen`,required:!0}),l(u),l(s);var S=i(s,2),C=i(t(S),4);A(C,{label:`Gebunden`,children:(e,a)=>{var o=V(),s=d(o),u=t(s);M(u,{label:`Messwert`,get items(){return F},get value(){return c(p)},set value(e){b(p,e,!0)}}),l(s);var f=i(s,2),m=r(f);n(()=>_(m,`value = ${c(p)??`–`??``}`)),y(e,o)},$$slots:{default:!0}}),l(S);var w=i(S,2),T=i(t(w),4),E=t(T);M(E,{label:`Messwert`,get items(){return L},placeholder:`Messwert wählen`}),l(T),l(w);var D=i(w,2),k=i(t(D),2),j=t(k);M(j,{label:`Zeitraum`,get items(){return P},value:`hour`,hint:`Gilt für alle Diagramme.`});var N=i(j,2);M(N,{label:`Gerät`,get items(){return I},placeholder:`Gerät wählen`,error:`Dieses Gerät ist offline.`}),l(k),l(D);var R=i(D,2),z=i(t(R),2);O(z,{dos:[`Für etwa 4 bis 15 feste Einträge, die sich nicht nach dem Tippen sortieren müssen.`,`Das Label bleibt immer sichtbar; der Platzhalter sagt nur, was zu tun ist („Gerät wählen“).`,`Einträge kurz und unterscheidbar am Anfang („Letzte Stunde“, „Letzter Tag“).`],donts:[`Kein Select zur Navigation: Seitenwechsel gehören in Links, Tabs oder ein Menü.`,`Kein Platzhalter als einziges Label.`,`Keine Aktionen als Einträge („Löschen“); dafür gibt es das Menu.`],notFor:[`Zwei bis drei Optionen: RadioGroup oder SegmentedControl, alle auf einen Blick.`,`Lange oder durchsuchbare Listen (Raumcode-Wörter): Combobox.`,`Aktionen an einem Element: Menu.`]}),l(R),y(e,o)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),y(e,m),o()}var P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{p(),x(),T(),E(),k(),j(),m(),S(),P=[{value:`hour`,label:`Letzte Stunde`},{value:`day`,label:`Letzter Tag`},{value:`week`,label:`Letzte Woche`},{value:`month`,label:`Letzter Monat`},{value:`all`,label:`Gesamte Aufzeichnung`,disabled:!0}],F=[{value:`temperature`,label:`Temperatur`},{value:`light`,label:`Helligkeit`},{value:`sound`,label:`Lautstärke`},{value:`acceleration`,label:`Beschleunigung`},{value:`compass`,label:`Kompass`}],I=[{value:`mini-1`,label:`Calliope mini „Tisch 1“`},{value:`mini-2`,label:`Calliope mini „Tisch 2“`},{value:`mini-3`,label:`Calliope mini „Fensterbank“`},{value:`mini-4`,label:`Calliope mini „Schulgarten“`}],L=[{value:`temperatur`,label:`temperatur`,group:`Aus dem Programm`},{value:`licht`,label:`licht`,group:`Aus dem Programm`},{value:`lautstaerke`,label:`lautstaerke`,group:`Aus dem Programm`},{value:`test`,label:`test`,group:`Schon empfangen`},{value:`wert2`,label:`wert2`,group:`Schon empfangen`}],R={title:`Primitives/Select`,component:M,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Zeitraum`,items:P,placeholder:`Zeitraum wählen`,hint:`Gilt für alle Diagramme dieser Seite.`}},{Story:z}=C(R),B=f(`<div style="max-width: 24rem"><!></div>`),V=f(`<div class="field svelte-isl856"><!></div> <span class="muted"> </span>`,1),H=f(`<section><h2>Zustände</h2> <div class="grid svelte-isl856"><!> <!> <!> <!> <!> <!></div></section> <section><h2>Auswahl</h2> <p class="section-intro">Gewählt ist, was im Feld steht und in der Liste einen Haken hat. Deaktivierte Einträge
				bleiben sichtbar, lassen sich aber nicht wählen.</p> <!></section> <section><h2>Gruppen</h2> <p class="section-intro">Einträge mit derselben <code>group</code> stehen unter einer gemeinsamen Überschrift, wie <code>&lt;optgroup&gt;</code>. Nur, wenn die Gruppen beim Finden helfen; sonst eine flache
				Liste.</p> <div class="field svelte-isl856"><!></div></section> <section data-theme="dark" class="dark-band svelte-isl856"><h2>Auf dunklen Bereichen</h2> <div class="grid svelte-isl856"><!> <!></div></section> <section><h2>Richtlinien</h2> <!></section>`,1),U=f(`<!> <!>`,1),N.__docgen={data:[],name:`Select.stories.svelte`},W=w(N,R),G=[`Spielwiese`,`Übersicht`],K={...W.Spielwiese,tags:[`svelte-csf-v5`]},q={...W.Übersicht,tags:[`svelte-csf-v5`]}})))()}J();export{K as Spielwiese,G as __namedExportsOrder,R as default,q as Übersicht};