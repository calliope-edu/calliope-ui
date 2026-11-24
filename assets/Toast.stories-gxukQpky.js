import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Pt as n,Xt as r,Zt as i,cn as a,fn as o,jt as s,lt as c,mn as l,n as u,o as d,pt as f,sn as p,st as m}from"./iframe-BsWRsydk.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-BWVMXit6.js";import{i as y,n as b,r as x,t as S}from"./Guidelines-B4Q9fRhg.js";import{n as C,t as w}from"./Row-DwZNmfYl.js";import{n as T,t as E}from"./Button-BP41bGzH.js";import{i as D,n as O,r as k,t as A}from"./Toaster-D2fV0AVx.js";function j(){return new Promise(e=>setTimeout(e,1500))}function M(){return()=>{D.dismiss()}}async function N(){let e=()=>new Promise(e=>setTimeout(e,150));D.loading(`Wird gespeichert …`,{duration:1/0}),await e(),D(`Feed „licht“ gelöscht`,{duration:1/0,action:{label:`Rückgängig`,onClick:()=>{}}}),await e(),D.info(`Ein neues Gerät ist im Raum`,{duration:1/0}),await e(),D.success(`Dashboard gespeichert`,{description:`Alle Kacheln sind gesichert.`,duration:1/0}),await e(),D.warning(`Raum pausiert`,{description:`Geräte senden nichts.`,duration:1/0,action:{label:`Fortsetzen`,onClick:()=>{}}}),await e(),D.error(`Feed konnte nicht gelöscht werden`,{description:`Prüfe die Verbindung und versuche es noch einmal.`,duration:1/0})}function P(e,c){i(c,!0);var l=V(),u=s(l);I(u,{name:`Spielwiese`,template:(e,t=o)=>{var r=L(),i=s(r);A(i,d(t));var a=n(i,2);E(a,{onclick:()=>D.success(`Dashboard gespeichert`),children:(e,t)=>{p();var n=f(`Toast zeigen`);m(e,n)},$$slots:{default:!0}}),m(e,r)},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Toaster {...args} />
<Button onclick={() => toast.success('Dashboard gespeichert')}>Toast zeigen</Button>`}}});var h=n(u,2);I(h,{name:`Alle Arten`,tags:[`!autodocs`],args:{position:`top-left`,expand:!0,visibleToasts:6},beforeEach:M,play:N,template:(e,t=o)=>{A(e,d(t))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Toaster {...args} />`}}});var g=n(h,2);I(g,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Patterns" title="Toast">
	{#snippet lead()}
		Kurze Rückmeldung auf eine Aktion, die gerade passiert ist. Dünne Hülle um svelte-sonner:
		<code>&lt;Toaster /&gt;</code> einmal im Layout, dann <code>toast()</code>,
		<code>toast.success()</code> usw. Aussehen wie der schwebende Banner: Kopfzeile mit Status-Scheibe
		(nur Erfolg, Warnung, Fehler), Titel und X, darunter die Beschreibung mit den Buttons. Kein Farbstreifen,
		kein eingefärbter Hintergrund; beim Laden dreht ein Spinner.
	{/snippet}

	<Toaster />

	<section>
		<h2>Arten</h2>
		<Row label="Status">
			<Button variant="secondary" onclick={() => toast('CSV wird erstellt')}>Neutral</Button>
			<Button
				variant="secondary"
				onclick={() =>
					toast.success('Dashboard gespeichert', {
						description: 'Alle Kacheln sind gesichert.'
					})}>Erfolg</Button
			>
			<Button variant="secondary" onclick={() => toast.info('Ein neues Gerät ist im Raum')}
				>Info</Button
			>
			<Button
				variant="secondary"
				onclick={() => toast.warning('Raum pausiert', { description: 'Geräte senden nichts.' })}
				>Warnung</Button
			>
			<Button
				variant="secondary"
				onclick={() =>
					toast.error('Feed konnte nicht gelöscht werden', {
						description: 'Prüfe die Verbindung und versuche es noch einmal.',
						duration: Infinity
					})}>Fehler</Button
			>
		</Row>
		<Row label="Mit Aktion">
			<Button
				variant="secondary"
				onclick={() =>
					toast('Feed „licht“ gelöscht', {
						action: { label: 'Rückgängig', onClick: () => toast.success('Wiederhergestellt') }
					})}>Löschen mit Rückgängig</Button
			>
		</Row>
		<Row label="Mit Beschreibung und Aktion">
			<Button
				variant="secondary"
				onclick={() =>
					toast.warning('Raum pausiert', {
						description: 'Geräte senden nichts.',
						action: { label: 'Fortsetzen', onClick: () => toast.success('Raum läuft wieder') }
					})}>Pausieren</Button
			>
		</Row>
		<Row label="Mit Promise">
			<Button
				variant="secondary"
				onclick={() =>
					toast.promise(saveLater(), {
						loading: 'Wird gespeichert …',
						success: 'Gespeichert',
						error: 'Speichern fehlgeschlagen'
					})}>Speichern</Button
			>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Ein Satz im Perfekt: „Dashboard gespeichert“.',
				'Fehler bleiben stehen (duration: Infinity), bis man sie schließt.',
				'Löschen mit „Rückgängig“ statt einer Rückfrage, wo es geht.'
			]}
			donts={[
				'Keine Toasts für Dinge, die man nicht verpassen darf: sie verschwinden.',
				'Keine Toasts beim Laden der Seite.'
			]}
			notFor={[
				'Ein Zustand, der bleibt (Raum pausiert, offline): Banner.',
				'Eine Entscheidung vor dem Löschen: ConfirmDialog.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{x(e,{eyebrow:`Patterns`,title:`Toast`,lead:e=>{p();var t=R();p(6),m(e,t)},children:(e,r)=>{var i=B(),o=s(i);A(o,{});var c=n(o,2),l=n(t(c),2);w(l,{label:`Status`,children:(e,t)=>{var r=z(),i=s(r);E(i,{variant:`secondary`,onclick:()=>D(`CSV wird erstellt`),children:(e,t)=>{p();var n=f(`Neutral`);m(e,n)},$$slots:{default:!0}});var a=n(i,2);E(a,{variant:`secondary`,onclick:()=>D.success(`Dashboard gespeichert`,{description:`Alle Kacheln sind gesichert.`}),children:(e,t)=>{p();var n=f(`Erfolg`);m(e,n)},$$slots:{default:!0}});var o=n(a,2);E(o,{variant:`secondary`,onclick:()=>D.info(`Ein neues Gerät ist im Raum`),children:(e,t)=>{p();var n=f(`Info`);m(e,n)},$$slots:{default:!0}});var c=n(o,2);E(c,{variant:`secondary`,onclick:()=>D.warning(`Raum pausiert`,{description:`Geräte senden nichts.`}),children:(e,t)=>{p();var n=f(`Warnung`);m(e,n)},$$slots:{default:!0}});var l=n(c,2);E(l,{variant:`secondary`,onclick:()=>D.error(`Feed konnte nicht gelöscht werden`,{description:`Prüfe die Verbindung und versuche es noch einmal.`,duration:1/0}),children:(e,t)=>{p();var n=f(`Fehler`);m(e,n)},$$slots:{default:!0}}),m(e,r)},$$slots:{default:!0}});var u=n(l,2);w(u,{label:`Mit Aktion`,children:(e,t)=>{E(e,{variant:`secondary`,onclick:()=>D(`Feed „licht“ gelöscht`,{action:{label:`Rückgängig`,onClick:()=>D.success(`Wiederhergestellt`)}}),children:(e,t)=>{p();var n=f(`Löschen mit Rückgängig`);m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var d=n(u,2);w(d,{label:`Mit Beschreibung und Aktion`,children:(e,t)=>{E(e,{variant:`secondary`,onclick:()=>D.warning(`Raum pausiert`,{description:`Geräte senden nichts.`,action:{label:`Fortsetzen`,onClick:()=>D.success(`Raum läuft wieder`)}}),children:(e,t)=>{p();var n=f(`Pausieren`);m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var h=n(d,2);w(h,{label:`Mit Promise`,children:(e,t)=>{E(e,{variant:`secondary`,onclick:()=>D.promise(j(),{loading:`Wird gespeichert …`,success:`Gespeichert`,error:`Speichern fehlgeschlagen`}),children:(e,t)=>{p();var n=f(`Speichern`);m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),a(c);var g=n(c,2),_=n(t(g),2);S(_,{dos:[`Ein Satz im Perfekt: „Dashboard gespeichert“.`,`Fehler bleiben stehen (duration: Infinity), bis man sie schließt.`,`Löschen mit „Rückgängig“ statt einer Rückfrage, wo es geht.`],donts:[`Keine Toasts für Dinge, die man nicht verpassen darf: sie verschwinden.`,`Keine Toasts beim Laden der Seite.`],notFor:[`Ein Zustand, der bleibt (Raum pausiert, offline): Banner.`,`Eine Entscheidung vor dem Löschen: ConfirmDialog.`]}),a(g),m(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),m(e,l),r()}var F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{l(),h(),k(),y(),b(),C(),T(),O(),u(),g(),F={title:`Patterns/Toast`,component:A,tags:[`autodocs`],parameters:{layout:`padded`},args:{position:`bottom-right`,closeButton:!0},argTypes:{position:{control:`select`,options:[`top-left`,`top-center`,`top-right`,`bottom-left`,`bottom-center`,`bottom-right`]}}},{Story:I}=_(F),L=c(`<!> <!>`,1),R=c(`Kurze Rückmeldung auf eine Aktion, die gerade passiert ist. Dünne Hülle um svelte-sonner: <code>&lt;Toaster /&gt;</code> einmal im Layout, dann <code>toast()</code>, <code>toast.success()</code> usw. Aussehen wie der schwebende Banner: Kopfzeile mit Status-Scheibe
			(nur Erfolg, Warnung, Fehler), Titel und X, darunter die Beschreibung mit den Buttons. Kein Farbstreifen,
			kein eingefärbter Hintergrund; beim Laden dreht ein Spinner.`,1),z=c(`<!> <!> <!> <!> <!>`,1),B=c(`<!> <section><h2>Arten</h2> <!> <!> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),V=c(`<!> <!> <!>`,1),P.__docgen={data:[],name:`Toast.stories.svelte`},H=v(P,F),U=[`Spielwiese`,`AlleArten`,`Übersicht`],W={...H.Spielwiese,tags:[`svelte-csf-v5`]},G={...H.AlleArten,tags:[`!autodocs`,`svelte-csf-v5`]},K={...H.Übersicht,tags:[`svelte-csf-v5`]}})))()}q();export{G as AlleArten,W as Spielwiese,U as __namedExportsOrder,F as default,K as Übersicht};