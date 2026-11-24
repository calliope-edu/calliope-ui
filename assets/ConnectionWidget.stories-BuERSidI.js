import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,D as n,Dt as r,Gt as i,H as a,It as o,Nt as s,Pt as c,S as l,T as u,Vt as d,Xt as f,Zt as p,bt as m,cn as h,ct as g,ht as _,i as v,jt as y,lt as b,mn as x,mt as S,n as C,o as w,pt as T,q as E,rt as D,sn as O,st as k,zt as A}from"./iframe-BsWRsydk.js";import{i as j,n as M,r as N,t as P}from"./create-runtime-stories-BWVMXit6.js";import{n as F,t as I}from"./Dialog-GqHJwAOK.js";import{n as L,t as ee}from"./IconButton-DZwsdOXG.js";import{n as R,t as z}from"./Popover-Cfrtd_V2.js";import{n as B,t as te}from"./ProgressBar-B3NKFXKI.js";import{n as ne,t as re}from"./Icon-BM63usQV.js";import{n as ie,t as ae}from"./Spinner-BeA3b-MI.js";import{n as oe,t as V}from"./Button-BP41bGzH.js";import{n as se,t as ce}from"./StatusDot-BwTRw03i.js";import{n as H,t as U}from"./Banner-7nygGxlY.js";import{i as le,n as ue,r as W,t as G}from"./ChoiceList-BP9hPNcc.js";import{n as de,t as fe}from"./TextField-CFfQIyHg.js";function pe(e,t){p(t,!0);let i=v(t,`size`,3,132),o=v(t,`disabled`,3,!1),s=[0,1,2,3,4],c=[0,1,2,3,4],d=(e,n)=>!!t.value[e]?.[n];function m(e,n){o()||t.onchange?.(s.map(t=>c.map(r=>r===e?t>=n:d(t,r))))}var b=he();let x;a(b,20,()=>s,e=>e,(e,t)=>{var i=g(),s=y(i);a(s,16,()=>c,e=>e,(e,i)=>{var a=me();let s;r((e,r)=>{s=n(a,1,`cell svelte-1rg10dr`,null,s,{on:e}),l(a,`aria-label`,`Spalte ${i+1}, Höhe ${5-t}`),l(a,`aria-pressed`,r),a.disabled=o()},[()=>d(t,i),()=>d(t,i)]),_(`click`,a,()=>m(i,t)),k(e,a)}),k(e,i)}),h(b),r(()=>x=u(b,``,x,{"--size":`${i()??``}px`})),k(e,b),f()}var me,he;function ge(){return(ge=e((()=>{x(),C(),me=b(`<button type="button"></button>`),he=b(`<div class="pad svelte-1rg10dr"></div>`),S([`click`]),pe.__docgen={data:[{name:`value`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`array`,text:`boolean[][]`},static:!1,readonly:!1},{name:`onchange`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`(grid: boolean[][]) => void`},static:!1,readonly:!1},{name:`size`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`number`,text:`number`},static:!1,readonly:!1,defaultValue:`132`},{name:`disabled`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`}],name:`PatternPad.svelte`}})))()}function K(e,a){p(a,!0);let s=v(a,`usb`,3,`idle`),l=v(a,`ble`,3,`idle`),u=v(a,`embedded`,3,!1),g=d(o(a.pattern??Array.from({length:5},()=>[,,,,,].fill(!1)))),_=i(()=>[0,1,2,3,4].every(e=>m(g)[4][e])),y={idle:`neutral`,connecting:`info`,connected:`success`,error:`error`},b={idle:`Nicht verbunden`,connecting:`Verbinde…`,connected:`Verbunden`,error:`Fehler`},x=i(()=>s()===`connected`||l()===`connected`);var S=Se();let C;var w=c(t(S),2),D=t(w),j=t(D),M=t(j),N=t(M);re(N,{name:`usb`,size:`s`}),O(),h(M);var P=c(M,2);ce(P,{get status(){return y[s()]},get label(){return b[s()]},size:`s`});var F=c(P,2),I=t(F),L=e=>{V(e,{size:`s`,variant:`secondary`,children:(e,t)=>{O();var n=T(`Trennen`);k(e,n)},$$slots:{default:!0}})},ee=e=>{V(e,{size:`s`,variant:`secondary`,children:(e,t)=>{O();var n=T(`Abbrechen`);k(e,n)},$$slots:{default:!0}})},R=e=>{V(e,{size:`s`,tone:`positive`,children:(e,t)=>{O();var n=T(`Verbinden`);k(e,n)},$$slots:{default:!0}})};E(I,e=>{s()===`connected`?e(L):s()===`connecting`||s()===`error`?e(ee,1):e(R,-1)}),h(F),h(j),h(D);var z=c(D,2),B=t(z),ne=t(B),ie=t(ne);re(ie,{name:`bluetooth`,size:`s`}),O(),h(ne);var ae=c(ne,2);ce(ae,{get status(){return y[l()]},get label(){return b[l()]},size:`s`});var oe=c(ae,2),se=e=>{var n=_e(),r=t(n);V(r,{size:`s`,variant:`secondary`,children:(e,t)=>{O();var n=T(`Trennen`);k(e,n)},$$slots:{default:!0}}),h(n),k(e,n)};E(oe,e=>{l()===`connected`&&e(se)}),h(B);var H=c(B,2),U=t(H);{let e=i(()=>l()===`connected`||l()===`connecting`);pe(U,{get value(){return m(g)},onchange:e=>A(g,e,!0),get disabled(){return m(e)}})}var le=c(U,2),ue=e=>{var t=ve();k(e,t)};E(le,e=>{l()!==`connected`&&e(ue)}),h(H);var W=c(H,2),G=e=>{var n=ye(),r=t(n),a=e=>{V(e,{size:`s`,variant:`secondary`,children:(e,t)=>{O();var n=T(`Abbrechen`);k(e,n)},$$slots:{default:!0}})},o=e=>{{let t=i(()=>!m(_));V(e,{size:`s`,tone:`positive`,get disabled(){return m(t)},children:(e,t)=>{O();var n=T(`Verbinden`);k(e,n)},$$slots:{default:!0}})}};E(r,e=>{l()===`connecting`||l()===`error`?e(a):e(o,-1)}),h(n),k(e,n)};E(W,e=>{l()!==`connected`&&e(G)}),h(z),h(w);var de=c(w,2),fe=e=>{var n=be(),r=t(n);{let e=i(()=>`Übertragung per ${l()===`connected`?`Bluetooth`:`USB`}`);te(r,{get label(){return m(e)},get value(){return a.flashing},hint:`Nur geänderte Teile`})}h(n),k(e,n)},me=e=>{var n=xe(),r=t(n);V(r,{fullWidth:!0,icon:`upload`,children:(e,t)=>{O();var n=T(`Programm übertragen`);k(e,n)},$$slots:{default:!0}}),h(n),k(e,n)};E(de,e=>{a.flashing===void 0?m(x)&&e(me,1):e(fe)}),h(S),r(()=>C=n(S,1,`panel svelte-1joy5bs`,null,C,{embedded:u()})),k(e,S),f()}var _e,ve,ye,be,xe,Se;function Ce(){return(Ce=e((()=>{x(),C(),oe(),ne(),B(),se(),ge(),_e=b(`<span class="action svelte-1joy5bs"><!></span>`),ve=b(`<p class="hint svelte-1joy5bs">Zeichne das Muster, das dein Calliope mini anzeigt.</p>`),ye=b(`<div class="foot svelte-1joy5bs"><!></div>`),be=b(`<div class="flash svelte-1joy5bs"><!></div>`),xe=b(`<div class="wide svelte-1joy5bs"><!></div>`),Se=b(`<div data-theme="dark"><h2 class="title svelte-1joy5bs">Calliope mini Verbindung</h2> <div class="transports svelte-1joy5bs"><div class="card svelte-1joy5bs"><div class="head svelte-1joy5bs"><span class="name svelte-1joy5bs"><!>USB</span> <!> <span class="action svelte-1joy5bs"><!></span></div></div> <div class="card svelte-1joy5bs"><div class="head svelte-1joy5bs"><span class="name svelte-1joy5bs"><!>Bluetooth</span> <!> <!></div> <div class="pad svelte-1joy5bs"><!> <!></div> <!></div></div> <!></div>`),K.__docgen={data:[{name:`usb`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`idle`,text:`"idle"`},{kind:`const`,type:`string`,value:`connecting`,text:`"connecting"`},{kind:`const`,type:`string`,value:`connected`,text:`"connected"`},{kind:`const`,type:`string`,value:`error`,text:`"error"`}],text:`"idle" | "connecting" | "connected" | "error"`},static:!1,readonly:!1,defaultValue:`"idle"`},{name:`ble`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`idle`,text:`"idle"`},{kind:`const`,type:`string`,value:`connecting`,text:`"connecting"`},{kind:`const`,type:`string`,value:`connected`,text:`"connected"`},{kind:`const`,type:`string`,value:`error`,text:`"error"`}],text:`"idle" | "connecting" | "connected" | "error"`},static:!1,readonly:!1,defaultValue:`"idle"`},{name:`flashing`,visibility:`public`,description:`Percent while a program is being flashed; replaces the transfer button.`,keywords:[],kind:`let`,type:{kind:`type`,type:`number`,text:`number`},static:!1,readonly:!1},{name:`pattern`,visibility:`public`,description:`The Calliope's name pattern, drawn already (as after a USB connect).`,keywords:[],kind:`let`,type:{kind:`type`,type:`array`,text:`boolean[][]`},static:!1,readonly:!1,defaultValue:`...`},{name:`embedded`,visibility:`public`,description:`Covers the Popover's own padding, as the widget does inside ConnectButton.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`}],name:`ConnectionPanel.svelte`}})))()}function we(e,n){p(n,!0);let i=d(!1),a=d(!1),o=d(!1),l=d(!1),u=d(!1),_=d(!0),v=d(``),b=d(!1);function x(e,t){A(v,`${e}: ${t}`),A(i,A(a,A(o,A(l,!1),!0),!0),!0)}function S(){A(_,!0),A(u,!0),setTimeout(()=>A(_,!1),1200)}var C=De(),j=y(C);J(j,{name:`Dialoge`,asChild:!0,children:(e,n)=>{var d=je(),f=y(d),p=c(t(f),2),b=t(p);V(b,{variant:`secondary`,onclick:()=>A(i,!0),children:(e,t)=>{O();var n=T(`Programm übertragen`);k(e,n)},$$slots:{default:!0}});var C=c(b,2);V(C,{variant:`secondary`,onclick:()=>A(a,!0),children:(e,t)=>{O();var n=T(`USB-Übertragung fehlgeschlagen`);k(e,n)},$$slots:{default:!0}});var w=c(C,2);V(w,{variant:`secondary`,onclick:()=>A(o,!0),children:(e,t)=>{O();var n=T(`Welcher mini?`);k(e,n)},$$slots:{default:!0}});var j=c(w,2);V(j,{variant:`secondary`,onclick:()=>A(l,!0),children:(e,t)=>{O();var n=T(`Kabel anschließen`);k(e,n)},$$slots:{default:!0}});var M=c(j,2);V(M,{variant:`secondary`,icon:`share`,onclick:S,children:(e,t)=>{O();var n=T(`Programm teilen`);k(e,n)},$$slots:{default:!0}}),h(p);var N=c(p,2),P=s(N,!0);h(f);var F=c(f,2);I(F,{size:`s`,title:`Programm übertragen`,description:`Der Calliope ist gerade nicht verbunden. Wähle, wie „${X}“ aufs Gerät kommen soll.`,get open(){return m(i)},set open(e){A(i,e,!0)},actions:e=>{V(e,{variant:`secondary`,onclick:()=>A(i,!1),children:(e,t)=>{O();var n=T(`Abbrechen`);k(e,n)},$$slots:{default:!0}})},children:(e,t)=>{G(e,{children:(e,t)=>{var n=De(),r=y(n);W(r,{icon:`bluetooth`,title:`Per Bluetooth`,detail:`Drahtlos. Der Calliope muss eingeschaltet und in Reichweite sein.`,onclick:()=>x(`Übertragen`,`Bluetooth`)});var i=c(r,2);W(i,{icon:`usb`,title:`Per USB-Kabel`,detail:`Zuverlässig, funktioniert immer. Kabel an Calliope und Rechner anschließen.`,onclick:()=>x(`Übertragen`,`USB`)});var a=c(i,2);W(a,{icon:`download`,title:`Als Datei herunterladen`,detail:`.hex-Datei speichern und selbst auf den Calliope kopieren.`,onclick:()=>x(`Übertragen`,`Datei`)}),k(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}});var L=c(F,2);I(L,{size:`s`,title:`USB-Übertragung fehlgeschlagen`,description:`„${X}“ kam nach 2 Versuchen nicht auf den Calliope mini 2. Versuche es noch einmal oder lade die Datei herunter und ziehe sie selbst auf das Laufwerk „MINI“, das klappt immer.`,get open(){return m(a)},set open(e){A(a,e,!0)},actions:e=>{V(e,{variant:`secondary`,onclick:()=>A(a,!1),children:(e,t)=>{O();var n=T(`Abbrechen`);k(e,n)},$$slots:{default:!0}})},children:(e,t)=>{var n=Oe(),r=y(n);G(r,{children:(e,t)=>{var n=Q(),r=y(n);W(r,{icon:`retry`,title:`Nochmal versuchen`,detail:`Übertragung über USB erneut starten.`,onclick:()=>x(`Fehlgeschlagen`,`Nochmal`)});var i=c(r,2);W(i,{icon:`download`,title:`Als Datei herunterladen`,detail:`Im Datei-Explorer auf das Laufwerk „MINI“ ziehen.`,onclick:()=>x(`Fehlgeschlagen`,`Datei`)}),k(e,n)},$$slots:{default:!0}}),O(2),k(e,n)},$$slots:{actions:!0,default:!0}});var R=c(L,2);I(R,{size:`s`,title:`Welcher Calliope mini ist das?`,description:`„${X}“ braucht 32 KB RAM und läuft nur auf dem Calliope mini 2. Über Bluetooth lässt sich das nicht erkennen: Die Version steht auf der Rückseite des Boards.`,get open(){return m(o)},set open(e){A(o,e,!0)},actions:e=>{V(e,{variant:`secondary`,onclick:()=>A(o,!1),children:(e,t)=>{O();var n=T(`Abbrechen`);k(e,n)},$$slots:{default:!0}})},children:(e,t)=>{G(e,{children:(e,t)=>{var n=Q(),r=y(n);W(r,{icon:`device`,title:`Calliope mini 2`,detail:`32 KB RAM. Die Übertragung startet.`,onclick:()=>x(`Version`,`mini 2`)});var i=c(r,2);W(i,{icon:`device`,title:`Calliope mini 1`,detail:`16 KB RAM. Dieses Programm läuft darauf nicht.`,onclick:()=>x(`Version`,`mini 1`)}),k(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}});var z=c(R,2);I(z,{size:`s`,title:`Calliope per USB anschließen`,get open(){return m(l)},set open(e){A(l,e,!0)},actions:e=>{var t=Q(),n=y(t);V(n,{variant:`secondary`,onclick:()=>A(l,!1),children:(e,t)=>{O();var n=T(`Abbrechen`);k(e,n)},$$slots:{default:!0}});var r=c(n,2);V(r,{icon:`usb`,onclick:()=>x(`Kabel`,`Übertragen`),children:(e,t)=>{O();var n=T(`Übertragen`);k(e,n)},$$slots:{default:!0}}),k(e,t)},children:(e,t)=>{var n=ke();k(e,n)},$$slots:{actions:!0,default:!0}});var B=c(z,2);I(B,{size:`s`,title:`Programm teilen`,get open(){return m(u)},set open(e){A(u,e,!0)},actions:e=>{var t=Q(),n=y(t);V(n,{variant:`secondary`,onclick:()=>A(u,!1),children:(e,t)=>{O();var n=T(`Schließen`);k(e,n)},$$slots:{default:!0}});var r=c(n,2);V(r,{icon:`external-link`,get disabled(){return m(_)},href:Te,target:`_blank`,children:(e,t)=>{O();var n=T(`Öffnen`);k(e,n)},$$slots:{default:!0}}),k(e,t)},children:(e,t)=>{var n=g(),r=y(n),i=e=>{ae(e,{label:`Link wird erstellt…`})},a=e=>{var t=Ae(),n=c(y(t),2);fe(n,{label:`Link zum Programm`,value:Te,readonly:!0,end:e=>{ee(e,{icon:`copy`,label:`Link kopieren`,size:`s`})},$$slots:{end:!0}}),k(e,t)};E(r,e=>{m(_)?e(i):e(a,-1)}),k(e,n)},$$slots:{actions:!0,default:!0}}),r(()=>D(P,m(v)?`Gewählt: ${m(v)}`:``)),k(e,d)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="page">
	<header>
		<p class="eyebrow">Rezept</p>
		<h1>Verbindungs-Widget</h1>
		<p class="lead">
			Die Dialoge aus mini-connection-widget, gebaut aus Dialog, ChoiceList und Button. Jeder
			ersetzt einen selbstgebauten Hintergrund, eine eigene Karte und eigene Buttons; die Abläufe
			im Widget bleiben, wie sie sind.
		</p>
	</header>

	<div class="triggers">
		<Button variant="secondary" onclick={() => (choiceOpen = true)}>Programm übertragen</Button>
		<Button variant="secondary" onclick={() => (fallbackOpen = true)}>
			USB-Übertragung fehlgeschlagen
		</Button>
		<Button variant="secondary" onclick={() => (versionOpen = true)}>Welcher mini?</Button>
		<Button variant="secondary" onclick={() => (plugOpen = true)}>Kabel anschließen</Button>
		<Button variant="secondary" icon="share" onclick={openShare}>Programm teilen</Button>
	</div>
	<p class="last" aria-live="polite">{last ? \`Gewählt: \${last}\` : ''}</p>
</div>

<!-- ConnectionChoiceModal: also the copy Campus keeps for its own look and i18n. -->
<Dialog
	bind:open={choiceOpen}
	size="s"
	title="Programm übertragen"
	description={\`Der Calliope ist gerade nicht verbunden. Wähle, wie „\${fileName}“ aufs Gerät kommen soll.\`}
>
	<ChoiceList>
		<ChoiceItem
			icon="bluetooth"
			title="Per Bluetooth"
			detail="Drahtlos. Der Calliope muss eingeschaltet und in Reichweite sein."
			onclick={() => choose('Übertragen', 'Bluetooth')}
		/>
		<ChoiceItem
			icon="usb"
			title="Per USB-Kabel"
			detail="Zuverlässig, funktioniert immer. Kabel an Calliope und Rechner anschließen."
			onclick={() => choose('Übertragen', 'USB')}
		/>
		<ChoiceItem
			icon="download"
			title="Als Datei herunterladen"
			detail=".hex-Datei speichern und selbst auf den Calliope kopieren."
			onclick={() => choose('Übertragen', 'Datei')}
		/>
	</ChoiceList>
	{#snippet actions()}
		<Button variant="secondary" onclick={() => (choiceOpen = false)}>Abbrechen</Button>
	{/snippet}
</Dialog>

<!-- Mini2FlashFallbackModal -->
<Dialog
	bind:open={fallbackOpen}
	size="s"
	title="USB-Übertragung fehlgeschlagen"
	description={\`„\${fileName}“ kam nach 2 Versuchen nicht auf den Calliope mini 2. Versuche es noch einmal oder lade die Datei herunter und ziehe sie selbst auf das Laufwerk „MINI“, das klappt immer.\`}
>
	<ChoiceList>
		<ChoiceItem
			icon="retry"
			title="Nochmal versuchen"
			detail="Übertragung über USB erneut starten."
			onclick={() => choose('Fehlgeschlagen', 'Nochmal')}
		/>
		<ChoiceItem
			icon="download"
			title="Als Datei herunterladen"
			detail="Im Datei-Explorer auf das Laufwerk „MINI“ ziehen."
			onclick={() => choose('Fehlgeschlagen', 'Datei')}
		/>
	</ChoiceList>
	<p class="detail">Details: SEGGER MSD: write timed out</p>
	{#snippet actions()}
		<Button variant="secondary" onclick={() => (fallbackOpen = false)}>Abbrechen</Button>
	{/snippet}
</Dialog>

<!-- Mini12VersionModal -->
<Dialog
	bind:open={versionOpen}
	size="s"
	title="Welcher Calliope mini ist das?"
	description={\`„\${fileName}“ braucht 32 KB RAM und läuft nur auf dem Calliope mini 2. Über Bluetooth lässt sich das nicht erkennen: Die Version steht auf der Rückseite des Boards.\`}
>
	<ChoiceList>
		<ChoiceItem
			icon="device"
			title="Calliope mini 2"
			detail="32 KB RAM. Die Übertragung startet."
			onclick={() => choose('Version', 'mini 2')}
		/>
		<ChoiceItem
			icon="device"
			title="Calliope mini 1"
			detail="16 KB RAM. Dieses Programm läuft darauf nicht."
			onclick={() => choose('Version', 'mini 1')}
		/>
	</ChoiceList>
	{#snippet actions()}
		<Button variant="secondary" onclick={() => (versionOpen = false)}>Abbrechen</Button>
	{/snippet}
</Dialog>

<!-- UsbPlugRequestModal: a confirm step, so plain buttons, primary last. -->
<Dialog bind:open={plugOpen} size="s" title="Calliope per USB anschließen">
	<ol class="steps">
		<li>USB-Kabel mit dem Calliope verbinden.</li>
		<li>Auf „Übertragen“ klicken. Beim ersten Mal den Calliope im Browser-Dialog auswählen.</li>
	</ol>
	{#snippet actions()}
		<Button variant="secondary" onclick={() => (plugOpen = false)}>Abbrechen</Button>
		<Button icon="usb" onclick={() => choose('Kabel', 'Übertragen')}>Übertragen</Button>
	{/snippet}
</Dialog>

<!-- MakeCodeShareModal: loading, then the link to copy. -->
<Dialog bind:open={shareOpen} size="s" title="Programm teilen">
	{#if shareLoading}
		<Spinner label="Link wird erstellt…" />
	{:else}
		<p class="intro">Jeder mit diesem Link kann dieses Programm öffnen und kopieren.</p>
		<TextField label="Link zum Programm" value={shareUrl} readonly>
			{#snippet end()}
				<IconButton icon="copy" label="Link kopieren" size="s" />
			{/snippet}
		</TextField>
	{/if}
	{#snippet actions()}
		<Button variant="secondary" onclick={() => (shareOpen = false)}>Schließen</Button>
		<Button icon="external-link" disabled={shareLoading} href={shareUrl} target="_blank">
			Öffnen
		</Button>
	{/snippet}
</Dialog>`}}});var M=c(j,2);J(M,{name:`Verbindungs-Panel`,asChild:!0,children:(e,n)=>{var r=Me(),i=c(t(r),2),a=c(t(i),2);z(a,{side:`bottom`,align:`end`,size:`m`,get open(){return m(b)},set open(e){A(b,e,!0)},trigger:(e,t)=>{V(e,w(()=>t?.().props,{variant:`secondary`,size:`s`,children:(e,t)=>{ce(e,{status:`neutral`,label:`Nicht verbunden`})},$$slots:{default:!0}}))},children:(e,t)=>{K(e,{embedded:!0})},$$slots:{trigger:!0,default:!0}}),h(i);var o=c(i,4),s=t(o);K(t(s),{}),O(2),h(s);var l=c(s,2);K(t(l),{usb:`connected`,get pattern(){return Z}}),O(2),h(l);var u=c(l,2);K(t(u),{ble:`connecting`,get pattern(){return Z}}),O(2),h(u);var d=c(u,2);K(t(d),{usb:`connected`,ble:`connected`,get pattern(){return Z},flashing:64}),O(2),h(d),h(o),h(r),k(e,r)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="page wide">
	<header>
		<p class="eyebrow">Rezept</p>
		<h1>Verbindungs-Panel</h1>
		<p class="lead">
			Das Dropdown des ConnectButton: ein dunkles Panel mit einer gefüllten Karte je
			Übertragungsweg. Jede Karte trägt Icon und Namen, einen StatusDot mit Wort und genau eine
			Aktion. Verbinden ist der grüne Button (<code>tone="positive"</code>), Trennen und Abbrechen
			sind sekundär. In der Bluetooth-Karte zeichnet man das Muster des Calliope; erst dann geht
			Verbinden.
		</p>
	</header>

	<div class="bar">
		<span class="bar-name">Calliope Campus</span>
		<Popover bind:open={panelOpen} side="bottom" align="end" size="m">
			{#snippet trigger({ props })}
				<Button {...props} variant="secondary" size="s">
					<StatusDot status="neutral" label="Nicht verbunden" />
				</Button>
			{/snippet}
			<ConnectionPanel embedded />
		</Popover>
	</div>

	<h2>Zustände</h2>
	<div class="panels">
		<figure>
			<ConnectionPanel />
			<figcaption>Nichts verbunden: Verbinden wartet auf das Muster.</figcaption>
		</figure>
		<figure>
			<ConnectionPanel usb="connected" pattern={zuvig} />
			<figcaption>USB verbunden: Muster schon gezeichnet, Programm übertragen.</figcaption>
		</figure>
		<figure>
			<ConnectionPanel ble="connecting" pattern={zuvig} />
			<figcaption>Bluetooth verbindet: Abbrechen statt Verbinden.</figcaption>
		</figure>
		<figure>
			<ConnectionPanel usb="connected" ble="connected" pattern={zuvig} flashing={64} />
			<figcaption>Beide verbunden, Übertragung läuft.</figcaption>
		</figure>
	</div>
</div>`}}});var N=c(M,2);J(N,{name:`Verbindungshinweis`,asChild:!0,children:(e,n)=>{var r=Ne(),i=c(t(r),2),a=t(i);U(a,w({floating:!0,title:`Kein Calliope mini verbunden.`},()=>Y,{actions:e=>{var t=Q(),n=y(t);V(n,{size:`s`,variant:`secondary`,icon:`usb`,children:(e,t)=>{O();var n=T(`USB verbinden`);k(e,n)},$$slots:{default:!0}});var r=c(n,2);V(r,{size:`s`,variant:`secondary`,icon:`bluetooth`,children:(e,t)=>{O();var n=T(`Bluetooth verbinden`);k(e,n)},$$slots:{default:!0}}),k(e,t)},children:(e,t)=>{O();var n=T(`Verbinde deinen Calliope mini per USB-Kabel oder Bluetooth, um zu starten.`);k(e,n)},$$slots:{actions:!0,default:!0}}));var o=c(a,2);U(o,w({floating:!0,title:`Verbinde per Bluetooth…`,busy:!0},()=>Y,{actions:e=>{V(e,{size:`s`,variant:`secondary`,children:(e,t)=>{O();var n=T(`Abbrechen`);k(e,n)},$$slots:{default:!0}})},children:(e,t)=>{O();var n=T(`Calliope mini zuvig`);k(e,n)},$$slots:{actions:!0,default:!0}}));var s=c(o,2);U(s,w({floating:!0,title:`Calliope mini neu verbinden.`,tone:`warning`},()=>Y,{actions:e=>{V(e,{size:`s`,variant:`secondary`,icon:`retry`,children:(e,t)=>{O();var n=T(`Erneut verbinden`);k(e,n)},$$slots:{default:!0}})},children:(e,t)=>{O();var n=T(`Zieh den Calliope mini einmal vom USB-Kabel ab und steck ihn wieder ein. Klicke dann auf
				„Erneut verbinden“.`);k(e,n)},$$slots:{actions:!0,default:!0}}));var l=c(s,2);U(l,w({floating:!0,title:`Das hat nicht geholfen.`,tone:`error`},()=>Y,{actions:e=>{V(e,{size:`s`,variant:`secondary`,icon:`retry`,children:(e,t)=>{O();var n=T(`Seite neu laden`);k(e,n)},$$slots:{default:!0}})},children:(e,t)=>{O();var n=T(`Lade die Seite neu, um die USB-Verbindung zurückzusetzen.`);k(e,n)},$$slots:{actions:!0,default:!0}}));var u=c(l,2);U(u,w({floating:!0,title:`Programm wird übertragen…`},()=>Y,{children:(e,t)=>{te(e,{label:`Übertragung`,value:42})},$$slots:{default:!0}}));var d=c(u,2);U(d,w({floating:!0,title:`USB verbunden`,tone:`success`},()=>Y)),h(i),h(r),k(e,r)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="page">
	<header>
		<p class="eyebrow">Rezept</p>
		<h1>Hinweis im Kopf der Seite</h1>
		<p class="lead">
			ConnectionBanner zeigt, was mit der Verbindung los ist. In der Überschriftenzeile stehen ein
			optionales Status-Icon, die Überschrift und das X; darunter der Text mit seinen Buttons,
			mittig dazu ausgerichtet. Kein Farbstreifen und kein getönter Hintergrund: Die Statusfarbe
			steckt nur im Icon. USB und Bluetooth haben keine eigene Farbe, nur ihr Icon. Gebaut aus
			<code>Banner floating</code>; die feste Position oben in der Mitte setzt das Widget.
		</p>
	</header>
	<div class="banners">
		<Banner floating title="Kein Calliope mini verbunden." {...hint}>
			Verbinde deinen Calliope mini per USB-Kabel oder Bluetooth, um zu starten.
			{#snippet actions()}
				<Button size="s" variant="secondary" icon="usb">USB verbinden</Button>
				<Button size="s" variant="secondary" icon="bluetooth">Bluetooth verbinden</Button>
			{/snippet}
		</Banner>
		<Banner floating title="Verbinde per Bluetooth…" busy {...hint}>
			Calliope mini zuvig
			{#snippet actions()}
				<Button size="s" variant="secondary">Abbrechen</Button>
			{/snippet}
		</Banner>
		<Banner floating title="Calliope mini neu verbinden." tone="warning" {...hint}>
			Zieh den Calliope mini einmal vom USB-Kabel ab und steck ihn wieder ein. Klicke dann auf
			„Erneut verbinden“.
			{#snippet actions()}
				<Button size="s" variant="secondary" icon="retry">Erneut verbinden</Button>
			{/snippet}
		</Banner>
		<Banner floating title="Das hat nicht geholfen." tone="error" {...hint}>
			Lade die Seite neu, um die USB-Verbindung zurückzusetzen.
			{#snippet actions()}
				<Button size="s" variant="secondary" icon="retry">Seite neu laden</Button>
			{/snippet}
		</Banner>
		<Banner floating title="Programm wird übertragen…" {...hint}>
			<ProgressBar label="Übertragung" value={42} />
		</Banner>
		<Banner floating title="USB verbunden" tone="success" {...hint} />
	</div>
</div>`}}}),k(e,C),f()}var q,J,Y,X,Te,Ee,Z,De,Q,Oe,ke,Ae,je,Me,Ne,$,Pe,Fe,Ie,Le;function Re(){return(Re=e((()=>{x(),j(),H(),oe(),le(),ue(),F(),L(),R(),B(),ie(),se(),de(),Ce(),C(),M(),q={title:`Rezepte/Verbindungs-Widget`,parameters:{layout:`fullscreen`,docs:{description:{component:``}}}},{Story:J}=N(q),Y={onDismiss:()=>{},dismissLabel:`Ausblenden`},X=`blinken.hex`,Te=`https://makecode.calliope.cc/_hK7c3PxR0aWv`,Ee=[2,4,1,5,3],Z=[0,1,2,3,4].map(e=>Ee.map(t=>e>=5-t)),De=b(`<!> <!> <!>`,1),Q=b(`<!> <!>`,1),Oe=b(`<!> <p class="detail svelte-1bf335e">Details: SEGGER MSD: write timed out</p>`,1),ke=b(`<ol class="steps svelte-1bf335e"><li class="svelte-1bf335e">USB-Kabel mit dem Calliope verbinden.</li> <li class="svelte-1bf335e">Auf „Übertragen“ klicken. Beim ersten Mal den Calliope im Browser-Dialog auswählen.</li></ol>`),Ae=b(`<p class="intro svelte-1bf335e">Jeder mit diesem Link kann dieses Programm öffnen und kopieren.</p> <!>`,1),je=b(`<div class="page svelte-1bf335e"><header><p class="eyebrow svelte-1bf335e">Rezept</p> <h1 class="svelte-1bf335e">Verbindungs-Widget</h1> <p class="lead svelte-1bf335e">Die Dialoge aus mini-connection-widget, gebaut aus Dialog, ChoiceList und Button. Jeder
				ersetzt einen selbstgebauten Hintergrund, eine eigene Karte und eigene Buttons; die Abläufe
				im Widget bleiben, wie sie sind.</p></header> <div class="triggers svelte-1bf335e"><!> <!> <!> <!> <!></div> <p class="last svelte-1bf335e" aria-live="polite"> </p></div> <!> <!> <!> <!> <!>`,1),Me=b(`<div class="page wide svelte-1bf335e"><header><p class="eyebrow svelte-1bf335e">Rezept</p> <h1 class="svelte-1bf335e">Verbindungs-Panel</h1> <p class="lead svelte-1bf335e">Das Dropdown des ConnectButton: ein dunkles Panel mit einer gefüllten Karte je
				Übertragungsweg. Jede Karte trägt Icon und Namen, einen StatusDot mit Wort und genau eine
				Aktion. Verbinden ist der grüne Button (<code>tone="positive"</code>), Trennen und Abbrechen
				sind sekundär. In der Bluetooth-Karte zeichnet man das Muster des Calliope; erst dann geht
				Verbinden.</p></header> <div class="bar svelte-1bf335e"><span class="bar-name svelte-1bf335e">Calliope Campus</span> <!></div> <h2 class="svelte-1bf335e">Zustände</h2> <div class="panels svelte-1bf335e"><figure class="svelte-1bf335e"><!> <figcaption class="svelte-1bf335e">Nichts verbunden: Verbinden wartet auf das Muster.</figcaption></figure> <figure class="svelte-1bf335e"><!> <figcaption class="svelte-1bf335e">USB verbunden: Muster schon gezeichnet, Programm übertragen.</figcaption></figure> <figure class="svelte-1bf335e"><!> <figcaption class="svelte-1bf335e">Bluetooth verbindet: Abbrechen statt Verbinden.</figcaption></figure> <figure class="svelte-1bf335e"><!> <figcaption class="svelte-1bf335e">Beide verbunden, Übertragung läuft.</figcaption></figure></div></div>`),Ne=b(`<div class="page svelte-1bf335e"><header><p class="eyebrow svelte-1bf335e">Rezept</p> <h1 class="svelte-1bf335e">Hinweis im Kopf der Seite</h1> <p class="lead svelte-1bf335e">ConnectionBanner zeigt, was mit der Verbindung los ist. In der Überschriftenzeile stehen ein
				optionales Status-Icon, die Überschrift und das X; darunter der Text mit seinen Buttons,
				mittig dazu ausgerichtet. Kein Farbstreifen und kein getönter Hintergrund: Die Statusfarbe
				steckt nur im Icon. USB und Bluetooth haben keine eigene Farbe, nur ihr Icon. Gebaut aus <code>Banner floating</code>; die feste Position oben in der Mitte setzt das Widget.</p></header> <div class="banners svelte-1bf335e"><!> <!> <!> <!> <!> <!></div></div>`),we.__docgen={data:[],name:`ConnectionWidget.stories.svelte`},$=P(we,q),Pe=[`Dialoge`,`VerbindungsPanel`,`Verbindungshinweis`],Fe={...$.Dialoge,tags:[`svelte-csf-v5`]},Ie={...$.VerbindungsPanel,tags:[`svelte-csf-v5`]},Le={...$.Verbindungshinweis,tags:[`svelte-csf-v5`]}})))()}Re();export{Fe as Dialoge,Ie as VerbindungsPanel,Le as Verbindungshinweis,Pe as __namedExportsOrder,q as default};