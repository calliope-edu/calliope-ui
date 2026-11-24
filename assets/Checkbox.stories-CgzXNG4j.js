import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Gt as n,H as r,It as i,Pt as a,Xt as o,Zt as s,bt as c,cn as l,jt as u,lt as d,mn as f,n as p,pt as m,sn as h,st as g}from"./iframe-BsWRsydk.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-BWVMXit6.js";import{i as x,n as S,r as C,t as w}from"./Guidelines-B4Q9fRhg.js";import{n as T,t as E}from"./Row-DwZNmfYl.js";import{n as D,t as O}from"./Checkbox-Dje2-2H3.js";function k(e,d){s(d,!0);let f=[`Gerät`,`Wert`,`Zeit`],p=i({Gerät:!0,Wert:!0,Zeit:!1}),_=n(()=>Object.values(p).filter(Boolean).length),v=n(()=>c(_)===f.length),y=n(()=>c(_)>0&&!c(v));function b(e){for(let t of f)p[t]=e}var x=M(),S=u(x);j(S,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<Checkbox {...args} />`}}});var T=a(S,2);j(T,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Checkbox">
	{#snippet lead()}
		Wählt eine oder mehrere Optionen, die erst mit dem Speichern gelten. 24 px Kästchen mit 2 px
		Rand; angehakt füllt es sich mit Tinte (hell) bzw. Weiß (dunkel), D2.
	{/snippet}

	<section>
		<h2>Zustände</h2>
		<Row label="Aus / an">
			<Checkbox label="Zeit anzeigen" />
			<Checkbox label="Zeit anzeigen" checked />
		</Row>
		<Row label="Teilweise">
			<Checkbox label="Alle Spalten" indeterminate />
		</Row>
		<Row label="Mit Hinweis">
			<Checkbox
				label="Gerät anzeigen"
				hint="Zeigt den Namen des Geräts neben dem Wert."
				checked
			/>
		</Row>
		<Row label="Fehler">
			<Checkbox
				label="Ich habe die Hinweise zum Datenschutz gelesen"
				error="Bitte bestätige die Hinweise, um den Raum zu erstellen."
				required
			/>
		</Row>
		<Row label="Deaktiviert">
			<Checkbox label="Zeit anzeigen" disabled />
			<Checkbox label="Zeit anzeigen" disabled checked />
		</Row>
	</section>

	<section>
		<h2>Gruppe mit „Alle“</h2>
		<p class="section-intro">
			Spalten der Tabellen-Kachel im IoT-Dashboard. Mehrere Checkboxen stehen in einem
			<code>&lt;fieldset&gt;</code> mit <code>&lt;legend&gt;</code>; „Alle“ zeigt „teilweise“,
			wenn nur ein Teil gewählt ist.
		</p>
		<fieldset class="group">
			<legend>Spalten</legend>
			<Checkbox
				label="Alle Spalten"
				checked={all}
				indeterminate={some}
				onCheckedChange={(checked) => setAll(checked)}
			/>
			<div class="nested">
				{#each columns as column (column)}
					<Checkbox label={column} bind:checked={shown[column]} />
				{/each}
			</div>
		</fieldset>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Aus / an / teilweise">
			<Checkbox label="Zeit anzeigen" />
			<Checkbox label="Zeit anzeigen" checked />
			<Checkbox label="Alle Spalten" indeterminate />
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Das Label beschreibt die Option positiv: „Zeit anzeigen“, nicht „Zeit nicht ausblenden“.',
				'Mehrere zusammengehörige Checkboxen stehen in einem fieldset mit legend.',
				'Ein Klick auf das Label schaltet mit; die Trefferfläche ist mehr als 24 px hoch.'
			]}
			donts={[
				'Keine Checkbox für eine Einstellung, die sofort wirkt: dafür gibt es den Switch.',
				'Keine Status- oder Identitätsfarbe für „angehakt“.'
			]}
			notFor={[
				'Genau eine aus mehreren Optionen: RadioGroup.',
				'Sofort wirkende Einstellung: Switch.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,n)=>{C(e,{eyebrow:`Primitives`,title:`Checkbox`,lead:e=>{h();var t=m(`Wählt eine oder mehrere Optionen, die erst mit dem Speichern gelten. 24 px Kästchen mit 2 px
			Rand; angehakt füllt es sich mit Tinte (hell) bzw. Weiß (dunkel), D2.`);g(e,t)},children:(e,n)=>{var i=P(),o=u(i),s=a(t(o),2);E(s,{label:`Aus / an`,children:(e,t)=>{var n=M(),r=u(n);O(r,{label:`Zeit anzeigen`});var i=a(r,2);O(i,{label:`Zeit anzeigen`,checked:!0}),g(e,n)},$$slots:{default:!0}});var d=a(s,2);E(d,{label:`Teilweise`,children:(e,t)=>{O(e,{label:`Alle Spalten`,indeterminate:!0})},$$slots:{default:!0}});var m=a(d,2);E(m,{label:`Mit Hinweis`,children:(e,t)=>{O(e,{label:`Gerät anzeigen`,hint:`Zeigt den Namen des Geräts neben dem Wert.`,checked:!0})},$$slots:{default:!0}});var h=a(m,2);E(h,{label:`Fehler`,children:(e,t)=>{O(e,{label:`Ich habe die Hinweise zum Datenschutz gelesen`,error:`Bitte bestätige die Hinweise, um den Raum zu erstellen.`,required:!0})},$$slots:{default:!0}});var _=a(h,2);E(_,{label:`Deaktiviert`,children:(e,t)=>{var n=M(),r=u(n);O(r,{label:`Zeit anzeigen`,disabled:!0});var i=a(r,2);O(i,{label:`Zeit anzeigen`,disabled:!0,checked:!0}),g(e,n)},$$slots:{default:!0}}),l(o);var x=a(o,2),S=a(t(x),4),C=a(t(S),2);O(C,{label:`Alle Spalten`,get checked(){return c(v)},get indeterminate(){return c(y)},onCheckedChange:e=>b(e)});var T=a(C,2);r(T,20,()=>f,e=>e,(e,t)=>{O(e,{get label(){return t},get checked(){return p[t]},set checked(e){p[t]=e}})}),l(T),l(S),l(x);var D=a(x,2),k=a(t(D),2);E(k,{label:`Aus / an / teilweise`,children:(e,t)=>{var n=N(),r=u(n);O(r,{label:`Zeit anzeigen`});var i=a(r,2);O(i,{label:`Zeit anzeigen`,checked:!0});var o=a(i,2);O(o,{label:`Alle Spalten`,indeterminate:!0}),g(e,n)},$$slots:{default:!0}}),l(D);var A=a(D,2),j=a(t(A),2);w(j,{dos:[`Das Label beschreibt die Option positiv: „Zeit anzeigen“, nicht „Zeit nicht ausblenden“.`,`Mehrere zusammengehörige Checkboxen stehen in einem fieldset mit legend.`,`Ein Klick auf das Label schaltet mit; die Trefferfläche ist mehr als 24 px hoch.`],donts:[`Keine Checkbox für eine Einstellung, die sofort wirkt: dafür gibt es den Switch.`,`Keine Status- oder Identitätsfarbe für „angehakt“.`],notFor:[`Genau eine aus mehreren Optionen: RadioGroup.`,`Sofort wirkende Einstellung: Switch.`]}),l(A),g(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),g(e,x),o()}var A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{f(),_(),x(),S(),T(),D(),p(),v(),A={title:`Primitives/Checkbox`,component:O,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Zeit anzeigen`,checked:!1,indeterminate:!1,disabled:!1}},{Story:j}=y(A),M=d(`<!> <!>`,1),N=d(`<!> <!> <!>`,1),P=d(`<section><h2>Zustände</h2> <!> <!> <!> <!> <!></section> <section><h2>Gruppe mit „Alle“</h2> <p class="section-intro">Spalten der Tabellen-Kachel im IoT-Dashboard. Mehrere Checkboxen stehen in einem <code>&lt;fieldset&gt;</code> mit <code>&lt;legend&gt;</code>; „Alle“ zeigt „teilweise“,
				wenn nur ein Teil gewählt ist.</p> <fieldset class="group svelte-j95y84"><legend class="svelte-j95y84">Spalten</legend> <!> <div class="nested svelte-j95y84"></div></fieldset></section> <section data-theme="dark" class="dark-band svelte-j95y84"><h2>Auf dunklen Bereichen</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),k.__docgen={data:[],name:`Checkbox.stories.svelte`},F=b(k,A),I=[`Spielwiese`,`Übersicht`],L={...F.Spielwiese,tags:[`svelte-csf-v5`]},R={...F.Übersicht,tags:[`svelte-csf-v5`]}})))()}z();export{L as Spielwiese,I as __namedExportsOrder,A as default,R as Übersicht};