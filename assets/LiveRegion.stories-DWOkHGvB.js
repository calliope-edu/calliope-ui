import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Gt as n,Ht as r,Pt as i,Vt as a,Xt as o,Zt as s,bt as c,cn as l,jt as u,lt as d,mn as f,n as p,pt as m,sn as h,st as g,zt as _}from"./iframe-BsWRsydk.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-BWVMXit6.js";import{i as S,n as C,r as w,t as T}from"./Guidelines-B4Q9fRhg.js";import{n as E,t as D}from"./Row-DwZNmfYl.js";import{n as O,t as k}from"./Button-BP41bGzH.js";import{n as A,t as j}from"./VisuallyHidden-DgNbW6qK.js";import{n as M,t as N}from"./StatusDot-BwTRw03i.js";import{n as P,t as F}from"./LiveRegion-BIzpBPTB.js";function I(e,d){s(d,!0);let f=a(2),p=n(()=>`${c(f)} ${c(f)===1?`Gerät`:`Geräte`} verbunden`);var v=B(),y=u(v);R(y,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<LiveRegion {...args} />`}}});var b=i(y,2);R(b,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Hilfsmittel" title="LiveRegion und VisuallyHidden">
	{#snippet lead()}
		Zwei Bausteine ohne eigenes Aussehen. <code>LiveRegion</code> sagt Änderungen an, die man
		nicht sieht oder leicht übersieht. <code>VisuallyHidden</code> gibt Screenreadern Text, der auf
		dem Bildschirm schon anders gezeigt wird.
	{/snippet}

	<section>
		<h2>LiveRegion</h2>
		<p class="section-intro">
			Die Region steht von Anfang an im DOM; neue Nachrichten werden höflich (<code>polite</code>)
			angesagt. Hier ist sie sichtbar (<code>visible</code>), damit man sieht, was ein
			Screenreader hört.
		</p>
		<Row label="Geräte im Raum">
			<Button variant="secondary" size="s" onclick={() => devices++}>Gerät verbinden</Button>
			<Button
				variant="secondary"
				size="s"
				disabled={devices === 0}
				onclick={() => (devices = Math.max(0, devices - 1))}>Gerät trennen</Button
			>
		</Row>
		<Row label="Angesagt">
			<LiveRegion {message} visible />
		</Row>
	</section>

	<section>
		<h2>VisuallyHidden</h2>
		<Row label="Zusatz zum Icon">
			<span class="count">
				12 <VisuallyHidden>neue Werte</VisuallyHidden>
			</span>
			<span class="muted">Vorgelesen: „12 neue Werte“</span>
		</Row>
		<Row label="In StatusDot">
			<StatusDot status="success" label="Online" hideLabel />
			<span class="muted">Vorgelesen: „Online“</span>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Kurze, vollständige Sätze ansagen: „3 Geräte verbunden“.',
				'assertive nur für Fehler, die die Arbeit unterbrechen.',
				'Eine Region pro Zweck, nicht pro Wert.'
			]}
			donts={[
				'Keine Live-Messwerte im Sekundentakt ansagen.',
				'VisuallyHidden nicht nutzen, um sichtbare Beschriftungen zu ersetzen.'
			]}
			notFor={[
				'Feldfehler: TextField und Checkbox haben ihre eigene Region.',
				'Sichtbare Rückmeldung: Toast oder Banner (sie sind schon Live-Regionen).'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,a)=>{w(e,{eyebrow:`Hilfsmittel`,title:`LiveRegion und VisuallyHidden`,lead:e=>{h();var t=z();h(4),g(e,t)},children:(e,a)=>{var o=U(),s=u(o),d=i(t(s),4);D(d,{label:`Geräte im Raum`,children:(e,t)=>{var a=B(),o=u(a);k(o,{variant:`secondary`,size:`s`,onclick:()=>r(f),children:(e,t)=>{h();var n=m(`Gerät verbinden`);g(e,n)},$$slots:{default:!0}});var s=i(o,2);{let e=n(()=>c(f)===0);k(s,{variant:`secondary`,size:`s`,get disabled(){return c(e)},onclick:()=>_(f,Math.max(0,c(f)-1),!0),children:(e,t)=>{h();var n=m(`Gerät trennen`);g(e,n)},$$slots:{default:!0}})}g(e,a)},$$slots:{default:!0}});var v=i(d,2);D(v,{label:`Angesagt`,children:(e,t)=>{F(e,{get message(){return c(p)},visible:!0})},$$slots:{default:!0}}),l(s);var y=i(s,2),b=i(t(y),2);D(b,{label:`Zusatz zum Icon`,children:(e,n)=>{var r=V(),a=u(r),o=i(t(a));j(o,{children:(e,t)=>{h();var n=m(`neue Werte`);g(e,n)},$$slots:{default:!0}}),l(a),h(2),g(e,r)},$$slots:{default:!0}});var x=i(b,2);D(x,{label:`In StatusDot`,children:(e,t)=>{var n=H(),r=u(n);N(r,{status:`success`,label:`Online`,hideLabel:!0}),h(2),g(e,n)},$$slots:{default:!0}}),l(y);var S=i(y,2),C=i(t(S),2);T(C,{dos:[`Kurze, vollständige Sätze ansagen: „3 Geräte verbunden“.`,`assertive nur für Fehler, die die Arbeit unterbrechen.`,`Eine Region pro Zweck, nicht pro Wert.`],donts:[`Keine Live-Messwerte im Sekundentakt ansagen.`,`VisuallyHidden nicht nutzen, um sichtbare Beschriftungen zu ersetzen.`],notFor:[`Feldfehler: TextField und Checkbox haben ihre eigene Region.`,`Sichtbare Rückmeldung: Toast oder Banner (sie sind schon Live-Regionen).`]}),l(S),g(e,o)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),g(e,v),o()}var L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{f(),v(),S(),C(),E(),O(),M(),A(),P(),p(),y(),L={title:`Hilfsmittel/LiveRegion und VisuallyHidden`,component:F,tags:[`autodocs`],parameters:{layout:`padded`},args:{message:`3 Geräte verbunden`,politeness:`polite`,visible:!0},argTypes:{politeness:{control:`inline-radio`,options:[`polite`,`assertive`]}}},{Story:R}=b(L),z=d(`Zwei Bausteine ohne eigenes Aussehen. <code>LiveRegion</code> sagt Änderungen an, die man
			nicht sieht oder leicht übersieht. <code>VisuallyHidden</code> gibt Screenreadern Text, der auf
			dem Bildschirm schon anders gezeigt wird.`,1),B=d(`<!> <!>`,1),V=d(`<span class="count svelte-sjkira">12 <!></span> <span class="muted">Vorgelesen: „12 neue Werte“</span>`,1),H=d(`<!> <span class="muted">Vorgelesen: „Online“</span>`,1),U=d(`<section><h2>LiveRegion</h2> <p class="section-intro">Die Region steht von Anfang an im DOM; neue Nachrichten werden höflich (<code>polite</code>)
				angesagt. Hier ist sie sichtbar (<code>visible</code>), damit man sieht, was ein
				Screenreader hört.</p> <!> <!></section> <section><h2>VisuallyHidden</h2> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),I.__docgen={data:[],name:`LiveRegion.stories.svelte`},W=x(I,L),G=[`Spielwiese`,`Übersicht`],K={...W.Spielwiese,tags:[`svelte-csf-v5`]},q={...W.Übersicht,tags:[`svelte-csf-v5`]}})))()}J();export{K as Spielwiese,G as __namedExportsOrder,L as default,q as Übersicht};