import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Ot as n,Pt as r,Vt as i,Xt as a,Zt as o,bt as s,cn as c,fn as l,jt as u,lt as d,mn as f,n as p,o as m,pt as h,sn as g,st as _,zt as v}from"./iframe-BsWRsydk.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-BWVMXit6.js";import{i as C,n as w,r as T,t as E}from"./Guidelines-B4Q9fRhg.js";import{n as D,t as O}from"./Row-DwZNmfYl.js";import{n as k,t as A}from"./ProgressBar-B3NKFXKI.js";import{n as j,t as M}from"./Button-BP41bGzH.js";function N(e,d){o(d,!0);let f=i(0),p;function y(){clearInterval(p),v(f,0),p=setInterval(()=>{v(f,Math.min(s(f)+7,100),!0),s(f)===100&&clearInterval(p)},300)}n(()=>()=>clearInterval(p));var b=H(),x=u(b);I(x,{name:`Spielwiese`,template:(e,n=l)=>{var r=L(),i=t(r);A(i,m(n)),c(r),_(e,r)},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<div class="frame"><ProgressBar {...args} /></div>`}}});var S=r(x,2);I(S,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="ProgressBar">
	{#snippet lead()}
		Zeigt den Fortschritt eines Vorgangs, der länger als ein paar Sekunden dauert (<code
			>role="progressbar"</code
		>), z. B. das Übertragen der Firmware auf den Calliope mini. Ohne bekannten Umfang (<code
			>value=&#123;null&#125;</code
		>) läuft ein Abschnitt durch die Leiste.
	{/snippet}

	<section>
		<h2>Zustände</h2>
		<Row label="Läuft">
			<div class="frame"><ProgressBar label="Firmware wird übertragen" value={42} /></div>
		</Row>
		<Row label="Zum Ausprobieren">
			<div class="frame">
				<ProgressBar label="Firmware wird übertragen" value={flashing} />
			</div>
			<Button variant="secondary" size="s" onclick={flash}>Übertragen</Button>
		</Row>
		<Row label="Eigenes Format">
			<div class="frame">
				<ProgressBar label="Hochladen" value={3} max={12} formatValue={files} />
			</div>
		</Row>
		<Row label="Mit Hinweis">
			<div class="frame">
				<ProgressBar
					label="Firmware wird übertragen"
					value={68}
					hint="Calliope mini nicht trennen, bis die Übertragung fertig ist."
				/>
			</div>
		</Row>
		<Row label="Unbestimmt">
			<div class="frame"><ProgressBar label="Verbindung wird hergestellt" value={null} /></div>
		</Row>
		<Row label="Fertig / leer">
			<div class="frame"><ProgressBar label="Hochladen" value={100} /></div>
			<div class="frame"><ProgressBar label="Hochladen" value={0} /></div>
		</Row>
		<Row label="Ohne Wert">
			<div class="frame"><ProgressBar label="Hochladen" value={30} showValue={false} /></div>
		</Row>
		<p class="muted note">
			Bei „Bewegung reduzieren“ steht statt des laufenden Abschnitts eine gestrichelte Füllung
			über die ganze Breite: sichtbar beschäftigt, ohne einen Anteil vorzutäuschen.
		</p>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Läuft">
			<div class="frame"><ProgressBar label="Firmware wird übertragen" value={42} /></div>
		</Row>
		<Row label="Unbestimmt">
			<div class="frame"><ProgressBar label="Verbindung wird hergestellt" value={null} /></div>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Das Label sagt, was gerade passiert: „Firmware wird übertragen“.',
				'Den Anteil zeigen, wenn er bekannt ist; sonst value={null}.',
				'Am Ende eine Bestätigung oder den nächsten Schritt zeigen, nicht nur 100 %.'
			]}
			donts={[
				'Keine Status- oder Identitätsfarbe für die Füllung, auch nicht Grün für „fertig“.',
				'Keinen Fortschritt vortäuschen, der nicht gemessen wird.',
				'Keine Fehlermeldung in der Leiste: ein Fehler gehört in einen Banner oder FieldHint.'
			]}
			notFor={[
				'Kurz warten ohne Umfang, z. B. in einem Button: Spinner.',
				'Einen Wert einstellen: Slider.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,n)=>{T(e,{eyebrow:`Primitives`,title:`ProgressBar`,lead:e=>{g();var t=R();g(4),_(e,t)},children:(e,n)=>{var i=V(),a=u(i),o=r(t(a),2);O(o,{label:`Läuft`,children:(e,n)=>{var r=L(),i=t(r);A(i,{label:`Firmware wird übertragen`,value:42}),c(r),_(e,r)},$$slots:{default:!0}});var l=r(o,2);O(l,{label:`Zum Ausprobieren`,children:(e,n)=>{var i=z(),a=u(i),o=t(a);A(o,{label:`Firmware wird übertragen`,get value(){return s(f)}}),c(a);var l=r(a,2);M(l,{variant:`secondary`,size:`s`,onclick:y,children:(e,t)=>{g();var n=h(`Übertragen`);_(e,n)},$$slots:{default:!0}}),_(e,i)},$$slots:{default:!0}});var d=r(l,2);O(d,{label:`Eigenes Format`,children:(e,n)=>{var r=L(),i=t(r);A(i,{label:`Hochladen`,value:3,max:12,formatValue:P}),c(r),_(e,r)},$$slots:{default:!0}});var p=r(d,2);O(p,{label:`Mit Hinweis`,children:(e,n)=>{var r=L(),i=t(r);A(i,{label:`Firmware wird übertragen`,value:68,hint:`Calliope mini nicht trennen, bis die Übertragung fertig ist.`}),c(r),_(e,r)},$$slots:{default:!0}});var m=r(p,2);O(m,{label:`Unbestimmt`,children:(e,n)=>{var r=L(),i=t(r);A(i,{label:`Verbindung wird hergestellt`,value:null}),c(r),_(e,r)},$$slots:{default:!0}});var v=r(m,2);O(v,{label:`Fertig / leer`,children:(e,n)=>{var i=B(),a=u(i),o=t(a);A(o,{label:`Hochladen`,value:100}),c(a);var s=r(a,2),l=t(s);A(l,{label:`Hochladen`,value:0}),c(s),_(e,i)},$$slots:{default:!0}});var b=r(v,2);O(b,{label:`Ohne Wert`,children:(e,n)=>{var r=L(),i=t(r);A(i,{label:`Hochladen`,value:30,showValue:!1}),c(r),_(e,r)},$$slots:{default:!0}}),g(2),c(a);var x=r(a,2),S=r(t(x),2);O(S,{label:`Läuft`,children:(e,n)=>{var r=L(),i=t(r);A(i,{label:`Firmware wird übertragen`,value:42}),c(r),_(e,r)},$$slots:{default:!0}});var C=r(S,2);O(C,{label:`Unbestimmt`,children:(e,n)=>{var r=L(),i=t(r);A(i,{label:`Verbindung wird hergestellt`,value:null}),c(r),_(e,r)},$$slots:{default:!0}}),c(x);var w=r(x,2),T=r(t(w),2);E(T,{dos:[`Das Label sagt, was gerade passiert: „Firmware wird übertragen“.`,`Den Anteil zeigen, wenn er bekannt ist; sonst value={null}.`,`Am Ende eine Bestätigung oder den nächsten Schritt zeigen, nicht nur 100 %.`],donts:[`Keine Status- oder Identitätsfarbe für die Füllung, auch nicht Grün für „fertig“.`,`Keinen Fortschritt vortäuschen, der nicht gemessen wird.`,`Keine Fehlermeldung in der Leiste: ein Fehler gehört in einen Banner oder FieldHint.`],notFor:[`Kurz warten ohne Umfang, z. B. in einem Button: Spinner.`,`Einen Wert einstellen: Slider.`]}),c(w),_(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),_(e,b),a()}var P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{f(),y(),C(),w(),D(),j(),k(),p(),b(),P=(e,t)=>`${e} von ${t} Dateien`,F={title:`Primitives/ProgressBar`,component:A,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Firmware wird übertragen`,value:42,max:100,showValue:!0}},{Story:I}=x(F),L=d(`<div class="frame svelte-12zoo34"><!></div>`),R=d(`Zeigt den Fortschritt eines Vorgangs, der länger als ein paar Sekunden dauert (<code>role="progressbar"</code>), z. B. das Übertragen der Firmware auf den Calliope mini. Ohne bekannten Umfang (<code>value=&#123;null&#125;</code>) läuft ein Abschnitt durch die Leiste.`,1),z=d(`<div class="frame svelte-12zoo34"><!></div> <!>`,1),B=d(`<div class="frame svelte-12zoo34"><!></div> <div class="frame svelte-12zoo34"><!></div>`,1),V=d(`<section><h2>Zustände</h2> <!> <!> <!> <!> <!> <!> <!> <p class="muted note svelte-12zoo34">Bei „Bewegung reduzieren“ steht statt des laufenden Abschnitts eine gestrichelte Füllung
				über die ganze Breite: sichtbar beschäftigt, ohne einen Anteil vorzutäuschen.</p></section> <section data-theme="dark" class="dark-band svelte-12zoo34"><h2>Auf dunklen Bereichen</h2> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),H=d(`<!> <!>`,1),N.__docgen={data:[],name:`ProgressBar.stories.svelte`},U=S(N,F),W=[`Spielwiese`,`Übersicht`],G={...U.Spielwiese,tags:[`svelte-csf-v5`]},K={...U.Übersicht,tags:[`svelte-csf-v5`]}})))()}q();export{G as Spielwiese,W as __namedExportsOrder,F as default,K as Übersicht};