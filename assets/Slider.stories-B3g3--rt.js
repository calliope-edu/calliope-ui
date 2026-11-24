import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Nt as r,Pt as i,Vt as a,Xt as o,Zt as s,bt as c,cn as l,fn as u,jt as d,lt as f,mn as p,n as m,o as h,rt as g,sn as _,st as v,zt as y}from"./iframe-BsWRsydk.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-BWVMXit6.js";import{i as w,n as T,r as E,t as D}from"./Guidelines-B4Q9fRhg.js";import{n as O,t as k}from"./Row-DwZNmfYl.js";import{n as A,t as j}from"./Slider-7AsnfK1Y.js";function M(e,f){s(f,!0);let p=a(128),m=a(5),b=a(5);var x=V(),S=d(x);F(S,{name:`Spielwiese`,template:(e,n=u)=>{var r=I(),i=t(r);j(i,h(n)),l(r),v(e,r)},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<div class="frame"><Slider {...args} /></div>`}}});var C=i(S,2);F(C,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Slider">
	{#snippet lead()}
		Stellt einen Zahlenwert in einem Bereich ein (<code>role="slider"</code>), z. B. die
		Helligkeit der LEDs. Das Label benennt den Regler, der aktuelle Wert steht am Ende der
		Label-Zeile. Pfeiltasten ändern um einen Schritt, Pos1 und Ende springen an die Grenzen.
	{/snippet}

	<section>
		<h2>Zustände</h2>
		<p class="section-intro">
			Hover legt einen 4px-Hof um den Regler wie beim Switch; Tastaturfokus zeigt den Fokusring
			außerhalb des hellen Rings. Die ganze 24px hohe Zeile nimmt Klicks an.
		</p>
		<Row label="Standard">
			<div class="frame">
				<Slider label="Helligkeit" min={0} max={255} bind:value={brightness} />
			</div>
		</Row>
		<Row label="Mit Einheit und Hinweis">
			<div class="frame">
				<Slider
					label="Aktualisierung"
					min={1}
					max={60}
					bind:value={interval}
					onValueCommit={(v) => (committed = v)}
					formatValue={seconds}
					hint="Wie oft die Geräte ihre Messwerte senden."
				/>
				<p class="muted note">Übernommen (onValueCommit): {committed} s</p>
			</div>
		</Row>
		<Row label="Mit Schritten">
			<div class="frame">
				<Slider label="Lautstärke" min={0} max={100} step={10} value={30} />
			</div>
		</Row>
		<Row label="Ohne Wert">
			<div class="frame">
				<Slider label="Empfindlichkeit" value={60} showValue={false} />
			</div>
		</Row>
		<Row label="Grenzen">
			<div class="frame"><Slider label="Helligkeit" min={0} max={255} value={0} /></div>
			<div class="frame"><Slider label="Helligkeit" min={0} max={255} value={255} /></div>
		</Row>
		<Row label="Deaktiviert">
			<div class="frame">
				<Slider
					label="Helligkeit"
					min={0}
					max={255}
					value={128}
					disabled
					hint="Im Raum pausiert."
				/>
			</div>
		</Row>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Standard">
			<div class="frame">
				<Slider label="Aktualisierung" min={1} max={60} value={15} formatValue={seconds} />
			</div>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Für Werte, bei denen die ungefähre Lage zählt und die man ausprobiert: Helligkeit, Lautstärke.',
				'Den Wert mit Einheit zeigen (formatValue); dieselbe Form wird vorgelesen.',
				'Teure Folgen (Senden an Geräte) an onValueCommit hängen, nicht an jede Bewegung.'
			]}
			donts={[
				'Kein Slider für genaue Werte, die man kennt (Raumcode, Port): Eingabefeld.',
				'Keine Farbe für den Bereich außer control.on (D2), auch nicht für „zu hoch“.',
				'Kein Slider ohne sichtbares Label.'
			]}
			notFor={[
				'Zwei bis vier feste Stufen: SegmentedControl.',
				'Fortschritt anzeigen, den man nicht einstellt: ProgressBar.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,a)=>{E(e,{eyebrow:`Primitives`,title:`Slider`,lead:e=>{_();var t=L();_(2),v(e,t)},children:(e,a)=>{var o=B(),s=d(o),u=i(t(s),4);k(u,{label:`Standard`,children:(e,n)=>{var r=I(),i=t(r);j(i,{label:`Helligkeit`,min:0,max:255,get value(){return c(p)},set value(e){y(p,e,!0)}}),l(r),v(e,r)},$$slots:{default:!0}});var f=i(u,2);k(f,{label:`Mit Einheit und Hinweis`,children:(e,a)=>{var o=R(),s=t(o);j(s,{label:`Aktualisierung`,min:1,max:60,onValueCommit:e=>y(b,e,!0),formatValue:N,hint:`Wie oft die Geräte ihre Messwerte senden.`,get value(){return c(m)},set value(e){y(m,e,!0)}});var u=i(s,2),d=r(u);l(o),n(()=>g(d,`Übernommen (onValueCommit): ${c(b)??``} s`)),v(e,o)},$$slots:{default:!0}});var h=i(f,2);k(h,{label:`Mit Schritten`,children:(e,n)=>{var r=I(),i=t(r);j(i,{label:`Lautstärke`,min:0,max:100,step:10,value:30}),l(r),v(e,r)},$$slots:{default:!0}});var _=i(h,2);k(_,{label:`Ohne Wert`,children:(e,n)=>{var r=I(),i=t(r);j(i,{label:`Empfindlichkeit`,value:60,showValue:!1}),l(r),v(e,r)},$$slots:{default:!0}});var x=i(_,2);k(x,{label:`Grenzen`,children:(e,n)=>{var r=z(),a=d(r),o=t(a);j(o,{label:`Helligkeit`,min:0,max:255,value:0}),l(a);var s=i(a,2),c=t(s);j(c,{label:`Helligkeit`,min:0,max:255,value:255}),l(s),v(e,r)},$$slots:{default:!0}});var S=i(x,2);k(S,{label:`Deaktiviert`,children:(e,n)=>{var r=I(),i=t(r);j(i,{label:`Helligkeit`,min:0,max:255,value:128,disabled:!0,hint:`Im Raum pausiert.`}),l(r),v(e,r)},$$slots:{default:!0}}),l(s);var C=i(s,2),w=i(t(C),2);k(w,{label:`Standard`,children:(e,n)=>{var r=I(),i=t(r);j(i,{label:`Aktualisierung`,min:1,max:60,value:15,formatValue:N}),l(r),v(e,r)},$$slots:{default:!0}}),l(C);var T=i(C,2),E=i(t(T),2);D(E,{dos:[`Für Werte, bei denen die ungefähre Lage zählt und die man ausprobiert: Helligkeit, Lautstärke.`,`Den Wert mit Einheit zeigen (formatValue); dieselbe Form wird vorgelesen.`,`Teure Folgen (Senden an Geräte) an onValueCommit hängen, nicht an jede Bewegung.`],donts:[`Kein Slider für genaue Werte, die man kennt (Raumcode, Port): Eingabefeld.`,`Keine Farbe für den Bereich außer control.on (D2), auch nicht für „zu hoch“.`,`Kein Slider ohne sichtbares Label.`],notFor:[`Zwei bis vier feste Stufen: SegmentedControl.`,`Fortschritt anzeigen, den man nicht einstellt: ProgressBar.`]}),l(T),v(e,o)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),v(e,x),o()}var N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{p(),b(),w(),T(),O(),A(),m(),x(),N=e=>`${e} s`,P={title:`Primitives/Slider`,component:j,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Helligkeit`,min:0,max:255,step:1,value:128,showValue:!0,disabled:!1}},{Story:F}=S(P),I=f(`<div class="frame svelte-v8yads"><!></div>`),L=f(`Stellt einen Zahlenwert in einem Bereich ein (<code>role="slider"</code>), z. B. die
			Helligkeit der LEDs. Das Label benennt den Regler, der aktuelle Wert steht am Ende der
			Label-Zeile. Pfeiltasten ändern um einen Schritt, Pos1 und Ende springen an die Grenzen.`,1),R=f(`<div class="frame svelte-v8yads"><!> <p class="muted note svelte-v8yads"> </p></div>`),z=f(`<div class="frame svelte-v8yads"><!></div> <div class="frame svelte-v8yads"><!></div>`,1),B=f(`<section><h2>Zustände</h2> <p class="section-intro">Hover legt einen 4px-Hof um den Regler wie beim Switch; Tastaturfokus zeigt den Fokusring
				außerhalb des hellen Rings. Die ganze 24px hohe Zeile nimmt Klicks an.</p> <!> <!> <!> <!> <!> <!></section> <section data-theme="dark" class="dark-band svelte-v8yads"><h2>Auf dunklen Bereichen</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),V=f(`<!> <!>`,1),M.__docgen={data:[],name:`Slider.stories.svelte`},H=C(M,P),U=[`Spielwiese`,`Übersicht`],W={...H.Spielwiese,tags:[`svelte-csf-v5`]},G={...H.Übersicht,tags:[`svelte-csf-v5`]}})))()}K();export{W as Spielwiese,U as __namedExportsOrder,P as default,G as Übersicht};