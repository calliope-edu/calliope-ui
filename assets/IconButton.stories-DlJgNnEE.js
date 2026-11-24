import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Gt as r,H as i,Nt as a,Pt as o,Vt as s,Xt as c,Zt as l,bt as u,cn as d,jt as f,lt as p,mn as m,n as h,rt as g,sn as _,st as v,zt as y}from"./iframe-BsWRsydk.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-BWVMXit6.js";import{i as w,n as T,r as E,t as D}from"./Guidelines-B4Q9fRhg.js";import{n as O,t as k}from"./Row-DwZNmfYl.js";import{n as A,t as j}from"./IconButton-DZwsdOXG.js";import{a as M,i as N}from"./Icon-BM63usQV.js";function P(e,p){l(p,!0);let m=s(!0);var h=V(),b=f(h);I(b,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<IconButton {...args} />`}}});var x=o(b,2);I(x,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="IconButton">
	{#snippet lead()}
		Ein runder Button nur mit Icon. Das Pflicht-Prop <code>label</code> wird zum
		<code>aria-label</code> und zum Tooltip, das Icon selbst ist für Screenreader unsichtbar.
	{/snippet}

	<section>
		<h2>Varianten und Größen</h2>
		<p class="section-intro">
			32 / 36 / 40 px Kreis. Die Trefferfläche ist nie kleiner als 24 px (D6). Zeig mit der Maus
			oder per Tab auf einen Button, um den Tooltip zu sehen.
		</p>
		{#each sizes as size (size)}
			<Row label="Größe {size}">
				<IconButton {size} icon="settings" label="Einstellungen" />
				<IconButton {size} icon="edit" label="Umbenennen" variant="secondary" />
				<IconButton {size} icon="add" label="Programm hinzufügen" variant="primary" />
				<IconButton {size} icon="share" label="Teilen" variant="bar" />
			</Row>
		{/each}
		<p class="section-intro">
			<code>bar</code> ist der Leisten-Button ohne Beschriftung, etwa Teilen in der MakeCode-Leiste:
			gefüllt mit dem jeweils anderen Neutral seines Untergrunds, 8 px Ecken statt Kreis (siehe Button,
			Leisten-Button).
		</p>
	</section>

	<section>
		<h2>Zustände</h2>
		<Row label="Umschalter">
			<IconButton
				icon={hidden ? 'show' : 'hide'}
				label="Passwort anzeigen"
				pressed={!hidden}
				onclick={() => (hidden = !hidden)}
			/>
			<span class="muted">aria-pressed={String(!hidden)}</span>
		</Row>
		<Row label="Lädt">
			<IconButton icon="download" label="Herunterladen" loading />
			<IconButton icon="download" label="Herunterladen" variant="primary" loading />
		</Row>
		<Row label="Deaktiviert">
			<IconButton icon="delete" label="Löschen" disabled />
			<IconButton icon="delete" label="Löschen" variant="secondary" disabled />
		</Row>
		<Row label="Ohne Tooltip">
			<IconButton icon="close" label="Schließen" tooltip={false} />
			<span class="muted">z. B. das Schließen-Kreuz im Dialog</span>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Nur für Aktionen, deren Icon allgemein bekannt ist (Schließen, Einstellungen, Löschen).',
				'Ein label, das die Aktion benennt: „Programm löschen“, nicht „Mülleimer“.'
			]}
			donts={[
				'Keinen Namen nur über title oder den Tooltip.',
				'Keine Icon-Buttons dicht an dicht auf Touch-Flächen.'
			]}
			notFor={['Aktionen, die man erst lesen muss: Button mit Icon und Text.']}
		/>
	</section>
</ComponentPage>`}},children:(e,s)=>{E(e,{eyebrow:`Primitives`,title:`IconButton`,lead:e=>{_();var t=R();_(4),v(e,t)},children:(e,s)=>{var c=U(),l=f(c),p=o(t(l),4);i(p,16,()=>L,e=>e,(e,t)=>{k(e,{get label(){return`Größe ${t??``}`},children:(e,n)=>{var r=z(),i=f(r);j(i,{get size(){return t},icon:`settings`,label:`Einstellungen`});var a=o(i,2);j(a,{get size(){return t},icon:`edit`,label:`Umbenennen`,variant:`secondary`});var s=o(a,2);j(s,{get size(){return t},icon:`add`,label:`Programm hinzufügen`,variant:`primary`});var c=o(s,2);j(c,{get size(){return t},icon:`share`,label:`Teilen`,variant:`bar`}),v(e,r)},$$slots:{default:!0}})}),_(2),d(l);var h=o(l,2),b=o(t(h),2);k(b,{label:`Umschalter`,children:(e,t)=>{var i=B(),s=f(i);{let e=r(()=>u(m)?`show`:`hide`),t=r(()=>!u(m));j(s,{get icon(){return u(e)},label:`Passwort anzeigen`,get pressed(){return u(t)},onclick:()=>y(m,!u(m))})}var c=o(s,2),l=a(c);n(e=>g(l,`aria-pressed=${e??``}`),[()=>String(!u(m))]),v(e,i)},$$slots:{default:!0}});var x=o(b,2);k(x,{label:`Lädt`,children:(e,t)=>{var n=V(),r=f(n);j(r,{icon:`download`,label:`Herunterladen`,loading:!0});var i=o(r,2);j(i,{icon:`download`,label:`Herunterladen`,variant:`primary`,loading:!0}),v(e,n)},$$slots:{default:!0}});var S=o(x,2);k(S,{label:`Deaktiviert`,children:(e,t)=>{var n=V(),r=f(n);j(r,{icon:`delete`,label:`Löschen`,disabled:!0});var i=o(r,2);j(i,{icon:`delete`,label:`Löschen`,variant:`secondary`,disabled:!0}),v(e,n)},$$slots:{default:!0}});var C=o(S,2);k(C,{label:`Ohne Tooltip`,children:(e,t)=>{var n=H(),r=f(n);j(r,{icon:`close`,label:`Schließen`,tooltip:!1}),_(2),v(e,n)},$$slots:{default:!0}}),d(h);var w=o(h,2),T=o(t(w),2);D(T,{dos:[`Nur für Aktionen, deren Icon allgemein bekannt ist (Schließen, Einstellungen, Löschen).`,`Ein label, das die Aktion benennt: „Programm löschen“, nicht „Mülleimer“.`],donts:[`Keinen Namen nur über title oder den Tooltip.`,`Keine Icon-Buttons dicht an dicht auf Touch-Flächen.`],notFor:[`Aktionen, die man erst lesen muss: Button mit Icon und Text.`]}),d(w),v(e,c)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),v(e,h),c()}var F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{m(),b(),M(),w(),T(),O(),A(),h(),x(),F={title:`Primitives/IconButton`,component:j,tags:[`autodocs`],parameters:{layout:`padded`},args:{icon:`settings`,label:`Einstellungen`,variant:`ghost`,size:`m`,tooltip:!0},argTypes:{icon:{control:`select`,options:Object.keys(N)},variant:{control:`inline-radio`,options:[`ghost`,`secondary`,`primary`,`bar`]},size:{control:`inline-radio`,options:[`s`,`m`,`l`]},pressed:{control:`boolean`}}},{Story:I}=S(F),L=[`s`,`m`,`l`],R=p(`Ein runder Button nur mit Icon. Das Pflicht-Prop <code>label</code> wird zum <code>aria-label</code> und zum Tooltip, das Icon selbst ist für Screenreader unsichtbar.`,1),z=p(`<!> <!> <!> <!>`,1),B=p(`<!> <span class="muted"> </span>`,1),V=p(`<!> <!>`,1),H=p(`<!> <span class="muted">z. B. das Schließen-Kreuz im Dialog</span>`,1),U=p(`<section><h2>Varianten und Größen</h2> <p class="section-intro">32 / 36 / 40 px Kreis. Die Trefferfläche ist nie kleiner als 24 px (D6). Zeig mit der Maus
				oder per Tab auf einen Button, um den Tooltip zu sehen.</p> <!> <p class="section-intro"><code>bar</code> ist der Leisten-Button ohne Beschriftung, etwa Teilen in der MakeCode-Leiste:
				gefüllt mit dem jeweils anderen Neutral seines Untergrunds, 8 px Ecken statt Kreis (siehe Button,
				Leisten-Button).</p></section> <section><h2>Zustände</h2> <!> <!> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),P.__docgen={data:[],name:`IconButton.stories.svelte`},W=C(P,F),G=[`Spielwiese`,`Übersicht`],K={...W.Spielwiese,tags:[`svelte-csf-v5`]},q={...W.Übersicht,tags:[`svelte-csf-v5`]}})))()}J();export{K as Spielwiese,G as __namedExportsOrder,F as default,q as Übersicht};