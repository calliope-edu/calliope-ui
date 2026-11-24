import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Ht as n,K as r,Pt as i,Vt as a,Xt as o,Zt as s,bt as c,cn as l,jt as u,lt as d,mn as f,n as p,pt as m,sn as h,st as g}from"./iframe-BsWRsydk.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-BWVMXit6.js";import{i as x,n as S,r as C,t as w}from"./Guidelines-B4Q9fRhg.js";import{n as T,t as E}from"./Row-DwZNmfYl.js";import{n as D,t as O}from"./Spinner-BeA3b-MI.js";import{n as k,t as A}from"./Button-BP41bGzH.js";function j(e,d){s(d,!0);let f=a(0);var p=L(),_=u(p);N(_,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<Spinner {...args} />`}}});var v=i(_,2);N(v,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Spinner">
	{#snippet lead()}
		Zeigt, dass etwas läuft. Mit <code>label</code> ist er eine Statusmeldung (<code
			>role="status"</code
		>), ohne ist er Dekoration, etwa im ladenden Button.
	{/snippet}

	<section>
		<h2>Größen</h2>
		<Row label="s / m / l">
			<Spinner size="s" label="Wird geladen" />
			<Spinner size="m" label="Wird geladen" />
			<Spinner size="l" label="Wird geladen" />
		</Row>
		<Row label="Mit Text">
			<span class="inline"><Spinner size="s" /> Programm wird übertragen …</span>
		</Row>
	</section>

	<section>
		<h2>Verzögerung</h2>
		<p class="section-intro">
			Mit <code>delay</code> erscheint er erst nach der Wartezeit. Kurze Vorgänge blitzen dann nicht
			auf.
		</p>
		<Row label="delay=300">
			{#key run}<Spinner label="Wird geladen" delay={300} size="l" />{/key}
			<Button variant="secondary" size="s" onclick={() => run++}>Neu starten</Button>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={['Ein label, das sagt, worauf gewartet wird.', 'Bei längeren Vorgängen Text daneben.']}
			donts={['Nicht mehrere Spinner gleichzeitig auf einer Seite.']}
			notFor={['Bekannter Fortschritt (z. B. Übertragung in Prozent): ProgressBar (Welle 2).']}
		/>
	</section>
</ComponentPage>`}},children:(e,a)=>{C(e,{eyebrow:`Primitives`,title:`Spinner`,lead:e=>{h();var t=P();h(4),g(e,t)},children:(e,a)=>{var o=R(),s=u(o),d=i(t(s),2);E(d,{label:`s / m / l`,children:(e,t)=>{var n=F(),r=u(n);O(r,{size:`s`,label:`Wird geladen`});var a=i(r,2);O(a,{size:`m`,label:`Wird geladen`});var o=i(a,2);O(o,{size:`l`,label:`Wird geladen`}),g(e,n)},$$slots:{default:!0}});var p=i(d,2);E(p,{label:`Mit Text`,children:(e,n)=>{var r=I(),i=t(r);O(i,{size:`s`}),h(),l(r),g(e,r)},$$slots:{default:!0}}),l(s);var _=i(s,2),v=i(t(_),4);E(v,{label:`delay=300`,children:(e,t)=>{var a=L(),o=u(a);r(o,()=>c(f),e=>{O(e,{label:`Wird geladen`,delay:300,size:`l`})});var s=i(o,2);A(s,{variant:`secondary`,size:`s`,onclick:()=>n(f),children:(e,t)=>{h();var n=m(`Neu starten`);g(e,n)},$$slots:{default:!0}}),g(e,a)},$$slots:{default:!0}}),l(_);var y=i(_,2),b=i(t(y),2);w(b,{dos:[`Ein label, das sagt, worauf gewartet wird.`,`Bei längeren Vorgängen Text daneben.`],donts:[`Nicht mehrere Spinner gleichzeitig auf einer Seite.`],notFor:[`Bekannter Fortschritt (z. B. Übertragung in Prozent): ProgressBar (Welle 2).`]}),l(y),g(e,o)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),g(e,p),o()}var M,N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{f(),_(),x(),S(),T(),k(),D(),p(),v(),M={title:`Primitives/Spinner`,component:O,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Wird geladen`,size:`l`,delay:0},argTypes:{size:{control:`inline-radio`,options:[`s`,`m`,`l`]}}},{Story:N}=y(M),P=d(`Zeigt, dass etwas läuft. Mit <code>label</code> ist er eine Statusmeldung (<code>role="status"</code>), ohne ist er Dekoration, etwa im ladenden Button.`,1),F=d(`<!> <!> <!>`,1),I=d(`<span class="inline svelte-fe9c1g"><!> Programm wird übertragen …</span>`),L=d(`<!> <!>`,1),R=d(`<section><h2>Größen</h2> <!> <!></section> <section><h2>Verzögerung</h2> <p class="section-intro">Mit <code>delay</code> erscheint er erst nach der Wartezeit. Kurze Vorgänge blitzen dann nicht
				auf.</p> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),j.__docgen={data:[],name:`Spinner.stories.svelte`},z=b(j,M),B=[`Spielwiese`,`Übersicht`],V={...z.Spielwiese,tags:[`svelte-csf-v5`]},H={...z.Übersicht,tags:[`svelte-csf-v5`]}})))()}U();export{V as Spielwiese,B as __namedExportsOrder,M as default,H as Übersicht};