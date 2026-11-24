import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Pt as n,Vt as r,Xt as i,Zt as a,bt as o,cn as s,jt as c,lt as l,mn as u,n as d,sn as f,st as p,zt as m}from"./iframe-BsWRsydk.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-BWVMXit6.js";import{i as y,n as b,r as x,t as S}from"./Guidelines-B4Q9fRhg.js";import{n as C,t as w}from"./Row-DwZNmfYl.js";import{n as T,t as E}from"./Switch-B2NCx5Ko.js";function D(e,l){a(l,!0);let u=r(!0);var d=j(),h=c(d);k(h,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<Switch {...args} />`}}});var g=n(h,2);k(g,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Switch">
	{#snippet lead()}
		Schaltet eine Einstellung sofort an oder aus (<code>role="switch"</code>). Position und Größe
		des Knopfs zeigen den Zustand, nicht die Farbe allein.
	{/snippet}

	<section>
		<h2>Zustände</h2>
		<Row label="Aus / an">
			<Switch label="Chat erlauben" />
			<Switch label="Chat erlauben" checked />
		</Row>
		<Row label="Mit Hinweis">
			<Switch
				label="IoT-Projekt"
				bind:checked={iot}
				hint="Schülerinnen und Schüler können Geräte mit dem WLAN verbinden."
			/>
		</Row>
		<Row label="Label vorne">
			<div style="width: 18rem"><Switch label="Ton" labelPosition="start" checked /></div>
		</Row>
		<Row label="Deaktiviert">
			<Switch label="Chat erlauben" disabled />
			<Switch label="Chat erlauben" disabled checked />
		</Row>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Aus / an">
			<Switch label="Chat erlauben" />
			<Switch label="Chat erlauben" checked />
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Das Label nennt, was eingeschaltet wird: „Chat erlauben“.',
				'Die Änderung gilt sofort, ohne Speichern-Button.'
			]}
			donts={[
				'Kein Label, das den Zustand nennt („An“/„Aus“).',
				'Keine Status- oder Identitätsfarbe für „an“: an ist Tinte (hell) bzw. Weiß (dunkel), D2.'
			]}
			notFor={['Eine Auswahl, die erst mit „Speichern“ gilt: Checkbox (Welle 2).']}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{x(e,{eyebrow:`Primitives`,title:`Switch`,lead:e=>{f();var t=A();f(2),p(e,t)},children:(e,r)=>{var i=N(),a=c(i),l=n(t(a),2);w(l,{label:`Aus / an`,children:(e,t)=>{var r=j(),i=c(r);E(i,{label:`Chat erlauben`});var a=n(i,2);E(a,{label:`Chat erlauben`,checked:!0}),p(e,r)},$$slots:{default:!0}});var d=n(l,2);w(d,{label:`Mit Hinweis`,children:(e,t)=>{E(e,{label:`IoT-Projekt`,hint:`Schülerinnen und Schüler können Geräte mit dem WLAN verbinden.`,get checked(){return o(u)},set checked(e){m(u,e,!0)}})},$$slots:{default:!0}});var f=n(d,2);w(f,{label:`Label vorne`,children:(e,n)=>{var r=M(),i=t(r);E(i,{label:`Ton`,labelPosition:`start`,checked:!0}),s(r),p(e,r)},$$slots:{default:!0}});var h=n(f,2);w(h,{label:`Deaktiviert`,children:(e,t)=>{var r=j(),i=c(r);E(i,{label:`Chat erlauben`,disabled:!0});var a=n(i,2);E(a,{label:`Chat erlauben`,disabled:!0,checked:!0}),p(e,r)},$$slots:{default:!0}}),s(a);var g=n(a,2),_=n(t(g),2);w(_,{label:`Aus / an`,children:(e,t)=>{var r=j(),i=c(r);E(i,{label:`Chat erlauben`});var a=n(i,2);E(a,{label:`Chat erlauben`,checked:!0}),p(e,r)},$$slots:{default:!0}}),s(g);var v=n(g,2),y=n(t(v),2);S(y,{dos:[`Das Label nennt, was eingeschaltet wird: „Chat erlauben“.`,`Die Änderung gilt sofort, ohne Speichern-Button.`],donts:[`Kein Label, das den Zustand nennt („An“/„Aus“).`,`Keine Status- oder Identitätsfarbe für „an“: an ist Tinte (hell) bzw. Weiß (dunkel), D2.`],notFor:[`Eine Auswahl, die erst mit „Speichern“ gilt: Checkbox (Welle 2).`]}),s(v),p(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),p(e,d),i()}var O,k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{u(),h(),y(),b(),C(),T(),d(),g(),O={title:`Primitives/Switch`,component:E,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Chat erlauben`,checked:!1,disabled:!1},argTypes:{labelPosition:{control:`inline-radio`,options:[`end`,`start`]}}},{Story:k}=_(O),A=l(`Schaltet eine Einstellung sofort an oder aus (<code>role="switch"</code>). Position und Größe
			des Knopfs zeigen den Zustand, nicht die Farbe allein.`,1),j=l(`<!> <!>`,1),M=l(`<div style="width: 18rem"><!></div>`),N=l(`<section><h2>Zustände</h2> <!> <!> <!> <!></section> <section data-theme="dark" class="dark-band svelte-1afpagi"><h2>Auf dunklen Bereichen</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),D.__docgen={data:[],name:`Switch.stories.svelte`},P=v(D,O),F=[`Spielwiese`,`Übersicht`],I={...P.Spielwiese,tags:[`svelte-csf-v5`]},L={...P.Übersicht,tags:[`svelte-csf-v5`]}})))()}R();export{I as Spielwiese,F as __namedExportsOrder,O as default,L as Übersicht};