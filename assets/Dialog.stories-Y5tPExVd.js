import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Gt as r,H as i,Pt as a,U as o,Vt as s,Xt as c,Zt as l,bt as u,cn as d,ct as ee,fn as f,jt as p,lt as m,mn as h,n as g,o as _,pt as v,rt as te,sn as y,st as b,zt as x}from"./iframe-BsWRsydk.js";import{i as S,n as C,r as w,t as T}from"./create-runtime-stories-BWVMXit6.js";import{i as E,n as D,r as O,t as ne}from"./Guidelines-B4Q9fRhg.js";import{n as k,t as A}from"./Row-DwZNmfYl.js";import{n as j,t as M}from"./Dialog-GqHJwAOK.js";import{n as N,t as re}from"./Switch-B2NCx5Ko.js";import{n as P,t as F}from"./Button-BP41bGzH.js";import{n as I,t as L}from"./TextField-CFfQIyHg.js";function R(e,m){l(m,!0);let h=s(!1),g=s(!1),S=s(null),C=s(!1),w=s(!1),T=s(``);var E=V(),D=p(E);B(D,{name:`Spielwiese`,template:(e,t=f)=>{M(e,_(t,{trigger:(e,t)=>{F(e,_(()=>t?.().props,{children:(e,t)=>{y();var n=v(`Dialog öffnen`);b(e,n)},$$slots:{default:!0}}))},actions:e=>{var t=V(),n=p(t);F(n,{variant:`secondary`,children:(e,t)=>{y();var n=v(`Abbrechen`);b(e,n)},$$slots:{default:!0}});var r=a(n,2);F(r,{children:(e,t)=>{y();var n=v(`Erstellen`);b(e,n)},$$slots:{default:!0}}),b(e,t)},children:(e,t)=>{var n=H();b(e,n)},$$slots:{trigger:!0,actions:!0,default:!0}}))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Dialog {...args}>
	{#snippet trigger({ props })}
		<Button {...props}>Dialog öffnen</Button>
	{/snippet}
	<p style="margin: 0">Inhalt des Dialogs.</p>
	{#snippet actions()}
		<Button variant="secondary">Abbrechen</Button>
		<Button>Erstellen</Button>
	{/snippet}
</Dialog>`}}});var k=a(D,2);B(k,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Overlays" title="Dialog">
	{#snippet lead()}
		Ersetzt <code>Modal</code>. Beim Öffnen springt der Fokus in den Dialog und bleibt dort, der
		Hintergrund ist gesperrt, Escape schließt, und beim Schließen kehrt der Fokus zum auslösenden
		Button zurück.
	{/snippet}

	<section>
		<h2>Mit Formular</h2>
		<Row label="Typischer Fall">
			<Button icon="add" onclick={() => (createOpen = true)}>Raum erstellen</Button>
		</Row>
		<Dialog
			bind:open={createOpen}
			title="Raum erstellen"
			description="Schülerinnen und Schüler treten mit dem Raumcode bei."
		>
			<div class="form">
				<TextField label="Name des Raums" bind:value={roomName} placeholder="z. B. Klasse 6b" />
				<Switch label="Chat erlauben" checked />
			</div>
			{#snippet actions()}
				<Button variant="secondary" onclick={() => (createOpen = false)}>Abbrechen</Button>
				<Button onclick={() => (createOpen = false)}>Erstellen</Button>
			{/snippet}
		</Dialog>
	</section>

	<section>
		<h2>Breiten</h2>
		<p class="section-intro">
			400 / 600 / 800 / 1200 px, <code>full</code> nimmt den ganzen Bildschirm bis auf einen Rand. Auf
			kleinen Bildschirmen immer volle Breite.
		</p>
		<Row label="size">
			{#each ['s', 'm', 'l', 'xl', 'full'] as const as size (size)}
				<Button variant="secondary" onclick={() => (sizeOpen = size)}>Größe {size}</Button>
			{/each}
		</Row>
		<Dialog
			open={sizeOpen !== null}
			onOpenChange={(open) => !open && (sizeOpen = null)}
			size={sizeOpen ?? 'm'}
			title="Dialog in Größe {sizeOpen}"
		>
			<p style="margin: 0">
				Kurze Rückfragen sind schmal, Formulare mittel, Vorschauen und Tabellen breit.
			</p>
		</Dialog>
	</section>

	<section>
		<h2>Vorschau im ganzen Fenster</h2>
		<p class="section-intro">
			<code>size="full"</code>: Kopf und Aktionen bleiben stehen, der Inhalt füllt die Höhe
			dazwischen als Spalte und scrollt selbst, wenn er höher wird. Was wachsen soll (eine
			Vorschau, ein Editor), bekommt <code>flex: 1</code>.
		</p>
		<Row label="full">
			<Button variant="secondary" icon="fullscreen" onclick={() => (fullOpen = true)}>
				Programm-Vorschau
			</Button>
		</Row>
		<Dialog bind:open={fullOpen} size="full" title="Vorschau: Ampel">
			<p style="margin: 0">Version vom 12. November, 10:42</p>
			<div class="preview">Vorschau füllt die restliche Höhe</div>
			{#snippet actions()}
				<Button variant="secondary" onclick={() => (fullOpen = false)}>Schließen</Button>
				<Button onclick={() => (fullOpen = false)}>Wiederherstellen</Button>
			{/snippet}
		</Dialog>
	</section>

	<section>
		<h2>Mit eigenen Spalten</h2>
		<p class="section-intro">
			<code>fill</code>: Der Dialog nimmt die ganze Höhe, der Inhalt füllt sie und scrollt seine
			Spalten selbst. Für Auswertungen und Vergleiche mit Diagrammen.
		</p>
		<Row label="fill">
			<Button variant="secondary" onclick={() => (fillOpen = true)}>Modell-Details</Button>
		</Row>
		<Dialog bind:open={fillOpen} size="xl" fill title="Modell-Details">
			<div class="columns">
				<div class="column">
					{#each { length: 30 } as _, i (i)}<p>Epoche {i + 1}</p>{/each}
				</div>
				<div class="column">
					{#each { length: 12 } as _, i (i)}<p>Klasse {i + 1}</p>{/each}
				</div>
			</div>
		</Dialog>
	</section>

	<section>
		<h2>Ohne Wegklicken</h2>
		<p class="section-intro">
			<code>dismissible=&#123;false&#125;</code> und <code>showClose=&#123;false&#125;</code>: nur
			wenn eine Entscheidung nötig ist. Escape und ein Klick auf den Hintergrund schließen dann
			nicht.
		</p>
		<Row label="Pflichtentscheidung">
			<Button variant="secondary" onclick={() => (requiredOpen = true)}>Name festlegen</Button>
		</Row>
		<Dialog
			bind:open={requiredOpen}
			title="Wie heißt du?"
			description="Dein Name ist für die Lehrkraft sichtbar."
			size="s"
			dismissible={false}
			showClose={false}
		>
			<TextField label="Dein Name" />
			{#snippet actions()}
				<Button size="l" onclick={() => (requiredOpen = false)}>Weiter</Button>
			{/snippet}
		</Dialog>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Ein Titel, der sagt, worum es geht; er benennt den Dialog für Screenreader.',
				'Die Hauptaktion rechts, „Abbrechen“ links daneben.',
				'Den Text für das Schließen-Kreuz über closeLabel aus den App-Übersetzungen.'
			]}
			donts={[
				'Keine Dialoge, die einen weiteren Dialog öffnen.',
				'Kein Wegklicken sperren, nur weil es einfacher ist.'
			]}
			notFor={[
				'Eine Rückfrage mit Ja/Nein: ConfirmDialog.',
				'Kurze Rückmeldung nach einer Aktion: Toast (Welle 2).'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,s)=>{O(e,{eyebrow:`Overlays`,title:`Dialog`,lead:e=>{y();var t=U();y(2),b(e,t)},children:(e,s)=>{var c=Y(),l=p(c),f=a(t(l),2);A(f,{label:`Typischer Fall`,children:(e,t)=>{F(e,{icon:`add`,onclick:()=>x(h,!0),children:(e,t)=>{y();var n=v(`Raum erstellen`);b(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var m=a(f,2);M(m,{title:`Raum erstellen`,description:`Schülerinnen und Schüler treten mit dem Raumcode bei.`,get open(){return u(h)},set open(e){x(h,e,!0)},actions:e=>{var t=V(),n=p(t);F(n,{variant:`secondary`,onclick:()=>x(h,!1),children:(e,t)=>{y();var n=v(`Abbrechen`);b(e,n)},$$slots:{default:!0}});var r=a(n,2);F(r,{onclick:()=>x(h,!1),children:(e,t)=>{y();var n=v(`Erstellen`);b(e,n)},$$slots:{default:!0}}),b(e,t)},children:(e,n)=>{var r=W(),i=t(r);L(i,{label:`Name des Raums`,placeholder:`z. B. Klasse 6b`,get value(){return u(T)},set value(e){x(T,e,!0)}});var o=a(i,2);re(o,{label:`Chat erlauben`,checked:!0}),d(r),b(e,r)},$$slots:{actions:!0,default:!0}}),d(l);var _=a(l,2),E=a(t(_),4);A(E,{label:`size`,children:(e,t)=>{var r=ee(),a=p(r);i(a,16,()=>[`s`,`m`,`l`,`xl`,`full`],e=>e,(e,t)=>{F(e,{variant:`secondary`,onclick:()=>x(S,t,!0),children:(e,r)=>{y();var i=v();n(()=>te(i,`Größe ${t??``}`)),b(e,i)},$$slots:{default:!0}})}),b(e,r)},$$slots:{default:!0}});var D=a(E,2);{let e=r(()=>u(S)!==null),t=r(()=>u(S)??`m`);M(D,{get open(){return u(e)},onOpenChange:e=>!e&&x(S,null),get size(){return u(t)},get title(){return`Dialog in Größe ${u(S)??``}`},children:(e,t)=>{var n=G();b(e,n)},$$slots:{default:!0}})}d(_);var O=a(_,2),k=a(t(O),4);A(k,{label:`full`,children:(e,t)=>{F(e,{variant:`secondary`,icon:`fullscreen`,onclick:()=>x(w,!0),children:(e,t)=>{y();var n=v(`Programm-Vorschau`);b(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var j=a(k,2);M(j,{size:`full`,title:`Vorschau: Ampel`,get open(){return u(w)},set open(e){x(w,e,!0)},actions:e=>{var t=V(),n=p(t);F(n,{variant:`secondary`,onclick:()=>x(w,!1),children:(e,t)=>{y();var n=v(`Schließen`);b(e,n)},$$slots:{default:!0}});var r=a(n,2);F(r,{onclick:()=>x(w,!1),children:(e,t)=>{y();var n=v(`Wiederherstellen`);b(e,n)},$$slots:{default:!0}}),b(e,t)},children:(e,t)=>{var n=K();y(2),b(e,n)},$$slots:{actions:!0,default:!0}}),d(O);var N=a(O,2),P=a(t(N),4);A(P,{label:`fill`,children:(e,t)=>{F(e,{variant:`secondary`,onclick:()=>x(C,!0),children:(e,t)=>{y();var n=v(`Modell-Details`);b(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var I=a(P,2);M(I,{size:`xl`,fill:!0,title:`Modell-Details`,get open(){return u(C)},set open(e){x(C,e,!0)},children:(e,n)=>{var r=J(),s=t(r);i(s,20,()=>({length:30}),o,(e,t,n)=>{var r=q();r.textContent=`Epoche ${n+1}`,b(e,r)}),d(s);var c=a(s,2);i(c,20,()=>({length:12}),o,(e,t,n)=>{var r=q();r.textContent=`Klasse ${n+1}`,b(e,r)}),d(c),d(r),b(e,r)},$$slots:{default:!0}}),d(N);var R=a(N,2),z=a(t(R),4);A(z,{label:`Pflichtentscheidung`,children:(e,t)=>{F(e,{variant:`secondary`,onclick:()=>x(g,!0),children:(e,t)=>{y();var n=v(`Name festlegen`);b(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var B=a(z,2);M(B,{title:`Wie heißt du?`,description:`Dein Name ist für die Lehrkraft sichtbar.`,size:`s`,dismissible:!1,showClose:!1,get open(){return u(g)},set open(e){x(g,e,!0)},actions:e=>{F(e,{size:`l`,onclick:()=>x(g,!1),children:(e,t)=>{y();var n=v(`Weiter`);b(e,n)},$$slots:{default:!0}})},children:(e,t)=>{L(e,{label:`Dein Name`})},$$slots:{actions:!0,default:!0}}),d(R);var H=a(R,2),U=a(t(H),2);ne(U,{dos:[`Ein Titel, der sagt, worum es geht; er benennt den Dialog für Screenreader.`,`Die Hauptaktion rechts, „Abbrechen“ links daneben.`,`Den Text für das Schließen-Kreuz über closeLabel aus den App-Übersetzungen.`],donts:[`Keine Dialoge, die einen weiteren Dialog öffnen.`,`Kein Wegklicken sperren, nur weil es einfacher ist.`],notFor:[`Eine Rückfrage mit Ja/Nein: ConfirmDialog.`,`Kurze Rückmeldung nach einer Aktion: Toast (Welle 2).`]}),d(H),b(e,c)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),b(e,E),c()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;function ie(){return(ie=e((()=>{h(),S(),E(),D(),k(),P(),N(),I(),j(),g(),C(),z={title:`Overlays/Dialog`,component:M,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Raum erstellen`,description:`Schülerinnen und Schüler treten mit dem Raumcode bei.`,size:`m`,dismissible:!0,showClose:!0},argTypes:{size:{control:`inline-radio`,options:[`s`,`m`,`l`,`xl`,`full`]}}},{Story:B}=w(z),V=m(`<!> <!>`,1),H=m(`<p style="margin: 0">Inhalt des Dialogs.</p>`),U=m(`Ersetzt <code>Modal</code>. Beim Öffnen springt der Fokus in den Dialog und bleibt dort, der
			Hintergrund ist gesperrt, Escape schließt, und beim Schließen kehrt der Fokus zum auslösenden
			Button zurück.`,1),W=m(`<div class="form svelte-a2usce"><!> <!></div>`),G=m(`<p style="margin: 0">Kurze Rückfragen sind schmal, Formulare mittel, Vorschauen und Tabellen breit.</p>`),K=m(`<p style="margin: 0">Version vom 12. November, 10:42</p> <div class="preview svelte-a2usce">Vorschau füllt die restliche Höhe</div>`,1),q=m(`<p class="svelte-a2usce"></p>`),J=m(`<div class="columns svelte-a2usce"><div class="column svelte-a2usce"></div> <div class="column svelte-a2usce"></div></div>`),Y=m(`<section><h2>Mit Formular</h2> <!> <!></section> <section><h2>Breiten</h2> <p class="section-intro">400 / 600 / 800 / 1200 px, <code>full</code> nimmt den ganzen Bildschirm bis auf einen Rand. Auf
				kleinen Bildschirmen immer volle Breite.</p> <!> <!></section> <section><h2>Vorschau im ganzen Fenster</h2> <p class="section-intro"><code>size="full"</code>: Kopf und Aktionen bleiben stehen, der Inhalt füllt die Höhe
				dazwischen als Spalte und scrollt selbst, wenn er höher wird. Was wachsen soll (eine
				Vorschau, ein Editor), bekommt <code>flex: 1</code>.</p> <!> <!></section> <section><h2>Mit eigenen Spalten</h2> <p class="section-intro"><code>fill</code>: Der Dialog nimmt die ganze Höhe, der Inhalt füllt sie und scrollt seine
				Spalten selbst. Für Auswertungen und Vergleiche mit Diagrammen.</p> <!> <!></section> <section><h2>Ohne Wegklicken</h2> <p class="section-intro"><code>dismissible=&#123;false&#125;</code> und <code>showClose=&#123;false&#125;</code>: nur
				wenn eine Entscheidung nötig ist. Escape und ein Klick auf den Hintergrund schließen dann
				nicht.</p> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),R.__docgen={data:[],name:`Dialog.stories.svelte`},X=T(R,z),Z=[`Spielwiese`,`Übersicht`],Q={...X.Spielwiese,tags:[`svelte-csf-v5`]},$={...X.Übersicht,tags:[`svelte-csf-v5`]}})))()}ie();export{Q as Spielwiese,Z as __namedExportsOrder,z as default,$ as Übersicht};