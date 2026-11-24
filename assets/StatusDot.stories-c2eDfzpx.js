import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,H as r,Nt as i,Pt as a,Xt as o,Zt as s,bt as c,cn as l,jt as u,lt as d,mn as f,n as p,rt as m,sn as h,st as g}from"./iframe-BsWRsydk.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-BWVMXit6.js";import{i as x,n as S,r as C,t as w}from"./Guidelines-B4Q9fRhg.js";import{n as T,t as E}from"./Row-DwZNmfYl.js";import{n as D,t as O}from"./StatusDot-BwTRw03i.js";function k(e,d){s(d,!0);var f=L(),p=u(f);j(p,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<StatusDot {...args} />`}}});var _=a(p,2);j(_,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="StatusDot">
	{#snippet lead()}
		Zustand eines Geräts oder einer Verbindung: ein Punkt und ein Wort. Der Punkt hat je Status
		eine eigene Form (Kreis, Raute, Quadrat, Ring), damit er auch ohne Farbe unterscheidbar ist.
		Ein Punkt nur mit <code>title</code> ist keine Statusanzeige.
	{/snippet}

	<section>
		<h2>Status</h2>
		<Row label="Alle">
			<StatusDot status="success" label="Online" />
			<StatusDot status="warning" label="Pausiert" />
			<StatusDot status="error" label="Offline" />
			<StatusDot status="info" label="Wird verbunden" />
			<StatusDot status="neutral" label="Inaktiv" />
		</Row>
	</section>

	<section>
		<h2>Größen</h2>
		<Row label="s (12 px)"><StatusDot size="s" status="success" label="Online" /></Row>
		<Row label="m (14 px)"><StatusDot status="success" label="Online" /></Row>
		<Row label="l (16 px), Beamer"><StatusDot size="l" status="success" label="Online" /></Row>
	</section>

	<section>
		<h2>In einer Tabelle</h2>
		<p class="section-intro">
			Nur wo die Spalte „Status“ heißt, darf das Wort unsichtbar werden (<code>hideLabel</code>);
			es bleibt für Screenreader da, und die Form trägt den Unterschied.
		</p>
		<table class="table">
			<thead><tr><th>Gerät</th><th>Status</th><th>Status (kompakt)</th></tr></thead>
			<tbody>
				{#each devices as device (device.name)}
					<tr>
						<td>{device.name}</td>
						<td><StatusDot status={device.status} label={device.word} /></td>
						<td><StatusDot status={device.status} label={device.word} hideLabel /></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<Row label="Alle">
			<StatusDot status="success" label="Online" />
			<StatusDot status="warning" label="Pausiert" />
			<StatusDot status="error" label="Offline" />
			<StatusDot status="info" label="Wird verbunden" />
			<StatusDot status="neutral" label="Inaktiv" />
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Immer ein Wort dazu; „Online“ ist Grün (status.success), „Pausiert“ Amber.',
				'Auf Lehrkraft- und Beamer-Ansichten mindestens Größe m bzw. l.'
			]}
			donts={[
				'Kein Punkt nur mit title-Attribut.',
				'Kein Hellgrün für „online“: Hellgrün ist KI-Training. Kein Orange für „pausiert“: Orange ist Robotik.'
			]}
			notFor={['Ein Zustand als Etikett neben einem Titel: Badge.']}
		/>
	</section>
</ComponentPage>`}},children:(e,o)=>{C(e,{eyebrow:`Primitives`,title:`StatusDot`,lead:e=>{h();var t=N();h(2),g(e,t)},children:(e,o)=>{var s=I(),d=u(s),f=a(t(d),2);E(f,{label:`Alle`,children:(e,t)=>{var n=P(),r=u(n);O(r,{status:`success`,label:`Online`});var i=a(r,2);O(i,{status:`warning`,label:`Pausiert`});var o=a(i,2);O(o,{status:`error`,label:`Offline`});var s=a(o,2);O(s,{status:`info`,label:`Wird verbunden`});var c=a(s,2);O(c,{status:`neutral`,label:`Inaktiv`}),g(e,n)},$$slots:{default:!0}}),l(d);var p=a(d,2),h=a(t(p),2);E(h,{label:`s (12 px)`,children:(e,t)=>{O(e,{size:`s`,status:`success`,label:`Online`})},$$slots:{default:!0}});var _=a(h,2);E(_,{label:`m (14 px)`,children:(e,t)=>{O(e,{status:`success`,label:`Online`})},$$slots:{default:!0}});var v=a(_,2);E(v,{label:`l (16 px), Beamer`,children:(e,t)=>{O(e,{size:`l`,status:`success`,label:`Online`})},$$slots:{default:!0}}),l(p);var y=a(p,2),b=a(t(y),4),x=a(t(b));r(x,21,()=>M,e=>e.name,(e,r)=>{var o=F(),s=t(o),u=i(s,!0),d=a(s),f=t(d);O(f,{get status(){return c(r).status},get label(){return c(r).word}}),l(d);var p=a(d),h=t(p);O(h,{get status(){return c(r).status},get label(){return c(r).word},hideLabel:!0}),l(p),l(o),n(()=>m(u,c(r).name)),g(e,o)}),l(x),l(b),l(y);var S=a(y,2),C=a(t(S),2);E(C,{label:`Alle`,children:(e,t)=>{var n=P(),r=u(n);O(r,{status:`success`,label:`Online`});var i=a(r,2);O(i,{status:`warning`,label:`Pausiert`});var o=a(i,2);O(o,{status:`error`,label:`Offline`});var s=a(o,2);O(s,{status:`info`,label:`Wird verbunden`});var c=a(s,2);O(c,{status:`neutral`,label:`Inaktiv`}),g(e,n)},$$slots:{default:!0}}),l(S);var T=a(S,2),D=a(t(T),2);w(D,{dos:[`Immer ein Wort dazu; „Online“ ist Grün (status.success), „Pausiert“ Amber.`,`Auf Lehrkraft- und Beamer-Ansichten mindestens Größe m bzw. l.`],donts:[`Kein Punkt nur mit title-Attribut.`,`Kein Hellgrün für „online“: Hellgrün ist KI-Training. Kein Orange für „pausiert“: Orange ist Robotik.`],notFor:[`Ein Zustand als Etikett neben einem Titel: Badge.`]}),l(T),g(e,s)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),g(e,f),o()}var A,j,M,N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{f(),_(),x(),S(),T(),D(),p(),v(),A={title:`Primitives/StatusDot`,component:O,tags:[`autodocs`],parameters:{layout:`padded`},args:{status:`success`,label:`Online`,size:`m`,hideLabel:!1},argTypes:{status:{control:`inline-radio`,options:[`success`,`warning`,`error`,`info`,`neutral`]},size:{control:`inline-radio`,options:[`s`,`m`,`l`]}}},{Story:j}=y(A),M=[{name:`Calliope 1`,status:`success`,word:`Online`},{name:`Wetterstation`,status:`warning`,word:`Pausiert`},{name:`Calliope 3`,status:`error`,word:`Gesperrt`},{name:`Calliope 4`,status:`neutral`,word:`Inaktiv`}],N=d(`Zustand eines Geräts oder einer Verbindung: ein Punkt und ein Wort. Der Punkt hat je Status
			eine eigene Form (Kreis, Raute, Quadrat, Ring), damit er auch ohne Farbe unterscheidbar ist.
			Ein Punkt nur mit <code>title</code> ist keine Statusanzeige.`,1),P=d(`<!> <!> <!> <!> <!>`,1),F=d(`<tr><td class="svelte-1qpsiy0"> </td><td class="svelte-1qpsiy0"><!></td><td class="svelte-1qpsiy0"><!></td></tr>`),I=d(`<section><h2>Status</h2> <!></section> <section><h2>Größen</h2> <!> <!> <!></section> <section><h2>In einer Tabelle</h2> <p class="section-intro">Nur wo die Spalte „Status“ heißt, darf das Wort unsichtbar werden (<code>hideLabel</code>);
				es bleibt für Screenreader da, und die Form trägt den Unterschied.</p> <table class="table svelte-1qpsiy0"><thead><tr><th class="svelte-1qpsiy0">Gerät</th><th class="svelte-1qpsiy0">Status</th><th class="svelte-1qpsiy0">Status (kompakt)</th></tr></thead><tbody></tbody></table></section> <section data-theme="dark" class="dark-band svelte-1qpsiy0"><h2>Auf dunklen Bereichen</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),L=d(`<!> <!>`,1),k.__docgen={data:[],name:`StatusDot.stories.svelte`},R=b(k,A),z=[`Spielwiese`,`Übersicht`],B={...R.Spielwiese,tags:[`svelte-csf-v5`]},V={...R.Übersicht,tags:[`svelte-csf-v5`]}})))()}H();export{B as Spielwiese,z as __namedExportsOrder,A as default,V as Übersicht};