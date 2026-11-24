import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,H as n,Pt as r,Xt as i,Zt as a,cn as o,fn as s,jt as c,lt as l,mn as u,n as d,o as f,sn as p,st as m}from"./iframe-BsWRsydk.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-BWVMXit6.js";import{i as y,n as b,r as x,t as S}from"./Guidelines-B4Q9fRhg.js";import{i as C,n as w,r as T,t as E}from"./StartCardGrid-B7SQox_Y.js";function D(e,l){a(l,!0);var u=N(),d=c(u);A(d,{name:`Spielwiese`,template:(e,n=s)=>{var r=j(),i=t(r);T(i,f(n)),o(r),m(e,r)},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<div style="max-width: 36rem">
	<StartCard {...args} />
</div>`}}});var h=r(d,2);A(h,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Patterns" title="StartCard">
	{#snippet lead()}
		Die große Karte, mit der etwas Neues beginnt: ein Programm, ein Feed, eine Trainingssitzung.
		Flach und eckig auf <code>surface.subtle</code>, links Titel und ein bis zwei Sätze, rechts
		ein quadratisches Farbfeld mit großem Plus. Die ganze Karte ist ein Button.
	{/snippet}

	<section>
		<h2>Leeres IoT-Dashboard</h2>
		<p class="section-intro">
			Zwei Wege in ein leeres Dashboard. Die Karte, die das Produkt weiterbringt, trägt seine
			Identitätsfarbe; die Nebenaufgabe bleibt neutral.
		</p>
		<StartCardGrid label="So geht es los">
			<StartCard
				color="makecode"
				title="Programmierung"
				description="Erstelle ein neues MakeCode-Programm und sende Daten vom Calliope mini an das Dashboard."
			/>
			<StartCard
				title="Feed anlegen"
				description="Wenn du das Dashboard schon einrichten willst, bevor ein Programm sendet. Sonst nicht nötig: Ein Programm legt seine Feeds selbst an."
			/>
		</StartCardGrid>
	</section>

	<section>
		<h2>KI-Training</h2>
		<p class="section-intro">
			Mit <code>icon</code> zeigt das Feld ein anderes Zeichen, etwa für „weitermachen“ oder „aus Datei
			öffnen“. Das Plus bleibt dem Neuanfang vorbehalten.
		</p>
		<StartCardGrid label="Sitzung">
			<StartCard
				color="ki-training"
				icon="retry"
				title="Letzte Sitzung fortsetzen"
				description="Mach dort weiter, wo du aufgehört hast: Gesten, Daten und Modell sind noch da."
			/>
			<StartCard
				color="ki-training"
				icon="upload"
				title="Aus Datei öffnen"
				description="Lade eine gespeicherte Sitzung oder ein Projekt von deinem Rechner."
			/>
			<StartCard
				color="ki-training"
				title="Neue Sitzung"
				description="Lege Gesten an, nimm Daten auf und trainiere ein neues Modell."
			/>
		</StartCardGrid>
	</section>

	<section>
		<h2>Feldfarben</h2>
		<p class="section-intro">
			<code>color</code> nimmt eine Identität (Produkt oder Editor), <code>highlight</code> oder
			<code>neutral</code> (Standard). Das Plus nimmt die passende Vordergrundfarbe der Füllung, auf
			hellen Füllungen also Tinte statt Weiß. Der Text bleibt schwarz bzw. weiß.
		</p>
		<div class="colors">
			{#each colors as color (color)}
				<StartCard {color} title={color} />
			{/each}
		</div>
	</section>

	<section>
		<h2>Zustände</h2>
		<StartCardGrid>
			<StartCard
				color="makecode"
				disabled
				title="Programmierung"
				description="Deaktiviert, solange das Dashboard noch vorbereitet wird."
			/>
			<StartCard
				color="teachable"
				title="Ein neues Projekt mit einem ziemlich langen Titel, der umbricht"
				description="Wird der Text höher als das Feld, wächst das Farbfeld mit, damit die Farbe die ganze Höhe einnimmt. Das Plus bleibt in der Mitte."
			/>
		</StartCardGrid>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<StartCardGrid>
			<StartCard color="iot" title="Neues Dashboard" description="Für ein neues Projekt." />
			<StartCard title="Neutral" description="Auf Dunkel wird das neutrale Feld hell." />
		</StartCardGrid>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Für den Einstieg: etwas Neues anlegen, eine Sitzung beginnen oder fortsetzen.',
				'Mehrere Karten in ein StartCardGrid mit label; die wahrscheinlichste zuerst.',
				'Die Hauptkarte in der Identitätsfarbe des Produkts, Nebenwege neutral.'
			]}
			donts={[
				'Keine Rundung, kein Rahmen, kein Schatten: die Karte liegt flach.',
				'Kein farbiger Text; Farbe nur im Feld.',
				'Keine Links oder Buttons in der Karte: sie ist selbst der Button.'
			]}
			notFor={[
				'Eine Wahl zwischen zwei bis vier Wegen in einem Dialog: ChoiceList.',
				'Ein Ding, das es schon gibt (Programm, Raum): Card.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,i)=>{x(e,{eyebrow:`Patterns`,title:`StartCard`,lead:e=>{p();var t=M();p(2),m(e,t)},children:(e,i)=>{var a=F(),s=c(a),l=r(t(s),4);E(l,{label:`So geht es los`,children:(e,t)=>{var n=N(),i=c(n);T(i,{color:`makecode`,title:`Programmierung`,description:`Erstelle ein neues MakeCode-Programm und sende Daten vom Calliope mini an das Dashboard.`});var a=r(i,2);T(a,{title:`Feed anlegen`,description:`Wenn du das Dashboard schon einrichten willst, bevor ein Programm sendet. Sonst nicht nötig: Ein Programm legt seine Feeds selbst an.`}),m(e,n)},$$slots:{default:!0}}),o(s);var u=r(s,2),d=r(t(u),4);E(d,{label:`Sitzung`,children:(e,t)=>{var n=P(),i=c(n);T(i,{color:`ki-training`,icon:`retry`,title:`Letzte Sitzung fortsetzen`,description:`Mach dort weiter, wo du aufgehört hast: Gesten, Daten und Modell sind noch da.`});var a=r(i,2);T(a,{color:`ki-training`,icon:`upload`,title:`Aus Datei öffnen`,description:`Lade eine gespeicherte Sitzung oder ein Projekt von deinem Rechner.`});var o=r(a,2);T(o,{color:`ki-training`,title:`Neue Sitzung`,description:`Lege Gesten an, nimm Daten auf und trainiere ein neues Modell.`}),m(e,n)},$$slots:{default:!0}}),o(u);var f=r(u,2),p=r(t(f),4);n(p,20,()=>O,e=>e,(e,t)=>{T(e,{get color(){return t},get title(){return t}})}),o(p),o(f);var h=r(f,2),g=r(t(h),2);E(g,{children:(e,t)=>{var n=N(),i=c(n);T(i,{color:`makecode`,disabled:!0,title:`Programmierung`,description:`Deaktiviert, solange das Dashboard noch vorbereitet wird.`});var a=r(i,2);T(a,{color:`teachable`,title:`Ein neues Projekt mit einem ziemlich langen Titel, der umbricht`,description:`Wird der Text höher als das Feld, wächst das Farbfeld mit, damit die Farbe die ganze Höhe einnimmt. Das Plus bleibt in der Mitte.`}),m(e,n)},$$slots:{default:!0}}),o(h);var _=r(h,2),v=r(t(_),2);E(v,{children:(e,t)=>{var n=N(),i=c(n);T(i,{color:`iot`,title:`Neues Dashboard`,description:`Für ein neues Projekt.`});var a=r(i,2);T(a,{title:`Neutral`,description:`Auf Dunkel wird das neutrale Feld hell.`}),m(e,n)},$$slots:{default:!0}}),o(_);var y=r(_,2),b=r(t(y),2);S(b,{dos:[`Für den Einstieg: etwas Neues anlegen, eine Sitzung beginnen oder fortsetzen.`,`Mehrere Karten in ein StartCardGrid mit label; die wahrscheinlichste zuerst.`,`Die Hauptkarte in der Identitätsfarbe des Produkts, Nebenwege neutral.`],donts:[`Keine Rundung, kein Rahmen, kein Schatten: die Karte liegt flach.`,`Kein farbiger Text; Farbe nur im Feld.`,`Keine Links oder Buttons in der Karte: sie ist selbst der Button.`],notFor:[`Eine Wahl zwischen zwei bis vier Wegen in einem Dialog: ChoiceList.`,`Ein Ding, das es schon gibt (Programm, Raum): Card.`]}),o(y),m(e,a)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),m(e,u),i()}var O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{u(),h(),y(),b(),C(),w(),d(),g(),O=[`neutral`,`highlight`,`makecode`,`python`,`blocks`,`markdown`,`ki-training`,`teachable`,`iot`,`robotik`],k={title:`Patterns/StartCard`,component:T,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Programmierung`,description:`Erstelle ein neues MakeCode-Programm und sende Daten vom Calliope mini an das Dashboard.`,color:`makecode`,disabled:!1},argTypes:{color:{control:`select`,options:O},icon:{control:`select`,options:[void 0,`retry`,`upload`,`add`,`chevron-right`]}}},{Story:A}=_(k),j=l(`<div style="max-width: 36rem"><!></div>`),M=l(`Die große Karte, mit der etwas Neues beginnt: ein Programm, ein Feed, eine Trainingssitzung.
			Flach und eckig auf <code>surface.subtle</code>, links Titel und ein bis zwei Sätze, rechts
			ein quadratisches Farbfeld mit großem Plus. Die ganze Karte ist ein Button.`,1),N=l(`<!> <!>`,1),P=l(`<!> <!> <!>`,1),F=l(`<section><h2>Leeres IoT-Dashboard</h2> <p class="section-intro">Zwei Wege in ein leeres Dashboard. Die Karte, die das Produkt weiterbringt, trägt seine
				Identitätsfarbe; die Nebenaufgabe bleibt neutral.</p> <!></section> <section><h2>KI-Training</h2> <p class="section-intro">Mit <code>icon</code> zeigt das Feld ein anderes Zeichen, etwa für „weitermachen“ oder „aus Datei
				öffnen“. Das Plus bleibt dem Neuanfang vorbehalten.</p> <!></section> <section><h2>Feldfarben</h2> <p class="section-intro"><code>color</code> nimmt eine Identität (Produkt oder Editor), <code>highlight</code> oder <code>neutral</code> (Standard). Das Plus nimmt die passende Vordergrundfarbe der Füllung, auf
				hellen Füllungen also Tinte statt Weiß. Der Text bleibt schwarz bzw. weiß.</p> <div class="colors svelte-1pro9yk"></div></section> <section><h2>Zustände</h2> <!></section> <section data-theme="dark" class="dark-band svelte-1pro9yk"><h2>Auf dunklen Bereichen</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),D.__docgen={data:[],name:`StartCard.stories.svelte`},I=v(D,k),L=[`Spielwiese`,`Übersicht`],R={...I.Spielwiese,tags:[`svelte-csf-v5`]},z={...I.Übersicht,tags:[`svelte-csf-v5`]}})))()}B();export{R as Spielwiese,L as __namedExportsOrder,k as default,z as Übersicht};