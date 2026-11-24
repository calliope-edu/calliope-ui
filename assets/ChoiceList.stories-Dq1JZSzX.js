import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Pt as n,Xt as r,Zt as i,cn as a,fn as o,jt as s,lt as c,mn as l,n as u,o as d,pt as f,sn as p,st as m}from"./iframe-BsWRsydk.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-BWVMXit6.js";import{i as y,n as b,r as x,t as S}from"./Guidelines-B4Q9fRhg.js";import{i as C,n as w,r as T,t as E}from"./ChoiceList-BP9hPNcc.js";function D(e,c){i(c,!0);var l=M(),u=s(l);k(u,{name:`Spielwiese`,template:(e,n=o)=>{var r=A(),i=t(r);E(i,{label:`Übertragungsweg`,children:(e,t)=>{T(e,d(n))},$$slots:{default:!0}}),a(r),m(e,r)},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<div class="narrow">
	<ChoiceList label="Übertragungsweg">
		<ChoiceItem {...args} />
	</ChoiceList>
</div>`}}});var h=n(u,2);k(h,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Patterns" title="ChoiceList">
	{#snippet lead()}
		Zwei bis vier Wege, zwischen denen man sich entscheidet, als große Kacheln: Jede Kachel ist
		ein Button, der Klick ist die Wahl. Gedacht für Dialoge wie „Programm übertragen“, in denen
		die Frage schon im Titel steht.
	{/snippet}

	<section>
		<h2>Mit Icon und Erklärung</h2>
		<div class="narrow">
			<ChoiceList label="Übertragungsweg">
				<ChoiceItem
					icon="bluetooth"
					title="Per Bluetooth"
					detail="Drahtlos. Der Calliope muss eingeschaltet und in Reichweite sein."
				/>
				<ChoiceItem
					icon="usb"
					title="Per USB-Kabel"
					detail="Zuverlässig, funktioniert immer. Kabel an Calliope und Rechner anschließen."
				/>
				<ChoiceItem
					icon="download"
					title="Als Datei herunterladen"
					detail=".hex-Datei speichern und selbst auf den Calliope kopieren."
				/>
			</ChoiceList>
		</div>
	</section>

	<section>
		<h2>Kurz</h2>
		<p class="section-intro">
			Ohne Erklärung, wenn der Titel allein reicht. Eine nicht verfügbare Wahl bleibt sichtbar und
			ist deaktiviert, statt zu verschwinden.
		</p>
		<div class="narrow">
			<ChoiceList label="Welcher Calliope mini?">
				<ChoiceItem icon="device" title="Calliope mini 2" />
				<ChoiceItem icon="device" title="Calliope mini 1" />
				<ChoiceItem icon="bluetooth" title="Per Bluetooth" disabled />
			</ChoiceList>
		</div>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<div class="narrow">
			<ChoiceList label="Nach dem Fehler">
				<ChoiceItem
					icon="retry"
					title="Nochmal versuchen"
					detail="Übertragung über USB erneut starten."
				/>
				<ChoiceItem
					icon="download"
					title="Als Datei herunterladen"
					detail="Auf das Laufwerk „MINI“ ziehen, das klappt immer."
				/>
			</ChoiceList>
		</div>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Der Titel jeder Kachel ist der Weg („Per USB-Kabel“), die Erklärung sagt in einem Satz, was er braucht.',
				'Der wahrscheinlichste Weg steht oben.',
				'Abbrechen ist kein Weg: es gehört als Button in den Fuß des Dialogs.'
			]}
			donts={[
				'Keine Farben pro Kachel: die Wege unterscheiden sich durch Icon und Text.',
				'Keine Auswahl mit anschließendem „Weiter“: dafür gibt es RadioGroup.'
			]}
			notFor={[
				'Eine Einstellung, die bestehen bleibt: RadioGroup oder SegmentedControl.',
				'Nur eine Aktion: Button.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{x(e,{eyebrow:`Patterns`,title:`ChoiceList`,lead:e=>{p();var t=f(`Zwei bis vier Wege, zwischen denen man sich entscheidet, als große Kacheln: Jede Kachel ist
			ein Button, der Klick ist die Wahl. Gedacht für Dialoge wie „Programm übertragen“, in denen
			die Frage schon im Titel steht.`);m(e,t)},children:(e,r)=>{var i=N(),o=s(i),c=n(t(o),2),l=t(c);E(l,{label:`Übertragungsweg`,children:(e,t)=>{var r=j(),i=s(r);T(i,{icon:`bluetooth`,title:`Per Bluetooth`,detail:`Drahtlos. Der Calliope muss eingeschaltet und in Reichweite sein.`});var a=n(i,2);T(a,{icon:`usb`,title:`Per USB-Kabel`,detail:`Zuverlässig, funktioniert immer. Kabel an Calliope und Rechner anschließen.`});var o=n(a,2);T(o,{icon:`download`,title:`Als Datei herunterladen`,detail:`.hex-Datei speichern und selbst auf den Calliope kopieren.`}),m(e,r)},$$slots:{default:!0}}),a(c),a(o);var u=n(o,2),d=n(t(u),4),f=t(d);E(f,{label:`Welcher Calliope mini?`,children:(e,t)=>{var r=j(),i=s(r);T(i,{icon:`device`,title:`Calliope mini 2`});var a=n(i,2);T(a,{icon:`device`,title:`Calliope mini 1`});var o=n(a,2);T(o,{icon:`bluetooth`,title:`Per Bluetooth`,disabled:!0}),m(e,r)},$$slots:{default:!0}}),a(d),a(u);var p=n(u,2),h=n(t(p),2),g=t(h);E(g,{label:`Nach dem Fehler`,children:(e,t)=>{var r=M(),i=s(r);T(i,{icon:`retry`,title:`Nochmal versuchen`,detail:`Übertragung über USB erneut starten.`});var a=n(i,2);T(a,{icon:`download`,title:`Als Datei herunterladen`,detail:`Auf das Laufwerk „MINI“ ziehen, das klappt immer.`}),m(e,r)},$$slots:{default:!0}}),a(h),a(p);var _=n(p,2),v=n(t(_),2);S(v,{dos:[`Der Titel jeder Kachel ist der Weg („Per USB-Kabel“), die Erklärung sagt in einem Satz, was er braucht.`,`Der wahrscheinlichste Weg steht oben.`,`Abbrechen ist kein Weg: es gehört als Button in den Fuß des Dialogs.`],donts:[`Keine Farben pro Kachel: die Wege unterscheiden sich durch Icon und Text.`,`Keine Auswahl mit anschließendem „Weiter“: dafür gibt es RadioGroup.`],notFor:[`Eine Einstellung, die bestehen bleibt: RadioGroup oder SegmentedControl.`,`Nur eine Aktion: Button.`]}),a(_),m(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),m(e,l),r()}var O,k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{l(),h(),y(),b(),C(),w(),u(),g(),O={title:`Patterns/ChoiceList`,component:T,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Per USB-Kabel`,detail:`Zuverlässig, funktioniert immer. Kabel an Calliope und Rechner anschließen.`,icon:`usb`,disabled:!1}},{Story:k}=_(O),A=c(`<div class="narrow svelte-17uy9nw"><!></div>`),j=c(`<!> <!> <!>`,1),M=c(`<!> <!>`,1),N=c(`<section><h2>Mit Icon und Erklärung</h2> <div class="narrow svelte-17uy9nw"><!></div></section> <section><h2>Kurz</h2> <p class="section-intro">Ohne Erklärung, wenn der Titel allein reicht. Eine nicht verfügbare Wahl bleibt sichtbar und
				ist deaktiviert, statt zu verschwinden.</p> <div class="narrow svelte-17uy9nw"><!></div></section> <section data-theme="dark" class="dark-band svelte-17uy9nw"><h2>Auf dunklen Bereichen</h2> <div class="narrow svelte-17uy9nw"><!></div></section> <section><h2>Richtlinien</h2> <!></section>`,1),D.__docgen={data:[],name:`ChoiceList.stories.svelte`},P=v(D,O),F=[`Spielwiese`,`Übersicht`],I={...P.Spielwiese,tags:[`svelte-csf-v5`]},L={...P.Übersicht,tags:[`svelte-csf-v5`]}})))()}R();export{I as Spielwiese,F as __namedExportsOrder,O as default,L as Übersicht};