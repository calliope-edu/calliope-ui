import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Nt as r,Pt as i,Vt as a,Xt as o,Zt as s,bt as c,cn as l,jt as u,lt as d,mn as f,n as p,rt as m,sn as h,st as g,zt as _}from"./iframe-BsWRsydk.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-BWVMXit6.js";import{i as S,n as C,r as w,t as T}from"./Guidelines-B4Q9fRhg.js";import{n as E,t as D}from"./Row-DwZNmfYl.js";import{n as O,t as k}from"./LocaleSwitcher-BxT__zV1.js";function A(e,d){s(d,!0);let f=a(`de`),p=a(`uk`);var v=R(),y=u(v);P(y,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<LocaleSwitcher {...args} />`}}});var b=i(y,2);P(b,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Navigation" title="LocaleSwitcher">
	{#snippet lead()}
		Wechselt die Sprache der App. Ein Menü mit den Sprachen in ihrer eigenen Schreibweise; die
		aktuelle trägt den Haken. Die Bibliothek wechselt selbst nichts: die App setzt die Sprache in <code
			>onValueChange</code
		> (in Campus über Paraglide).
	{/snippet}

	<section>
		<h2>Varianten</h2>
		<Row label="ghost (Kopfzeile)">
			<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
		</Row>
		<Row label="secondary">
			<LocaleSwitcher {locales} label="Sprache" variant="secondary" bind:value={locale} />
		</Row>
		<Row label="size l (Schülerseiten)">
			<LocaleSwitcher {locales} label="Sprache" size="l" bind:value={locale} />
		</Row>
		<Row label="Gewählt">
			<span class="value">{locale}</span>
		</Row>
	</section>

	<section>
		<h2>Mehr Sprachen</h2>
		<p class="section-intro">
			Jede Sprache steht in ihrer eigenen Schrift und trägt <code>lang</code>, damit Screenreader
			sie richtig aussprechen.
		</p>
		<LocaleSwitcher locales={many} label="Sprache" align="start" bind:value={other} />
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>In der dunklen Kopfzeile</h2>
		<LocaleSwitcher {locales} label="Language" bind:value={locale} />
	</section>

	<section>
		<h2>Barrierefreiheit</h2>
		<p class="section-intro">
			Sichtbar steht nur das Kürzel. Vorgelesen wird „Sprache: Deutsch, DE“: der Name enthält das
			sichtbare Kürzel, so funktioniert auch die Sprachsteuerung („Klicke DE“).
		</p>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Sprachnamen in ihrer eigenen Sprache („English“, nicht „Englisch“).',
				'label in der aktuellen Sprache der App („Sprache“ / „Language“).',
				'Im Konto-Menü statt eines eigenen Auslösers: MenuRadioGroup mit denselben Einträgen.'
			]}
			donts={[
				'Keine Flaggen: Flaggen stehen für Länder, nicht für Sprachen.',
				'Die aktuelle Sprache nicht deaktivieren: sie ist gewählt, nicht gesperrt.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,a)=>{w(e,{eyebrow:`Navigation`,title:`LocaleSwitcher`,lead:e=>{h();var t=F();h(2),g(e,t)},children:(e,a)=>{var o=L(),s=u(o),d=i(t(s),2);D(d,{label:`ghost (Kopfzeile)`,children:(e,t)=>{k(e,{get locales(){return j},label:`Sprache`,get value(){return c(f)},set value(e){_(f,e,!0)}})},$$slots:{default:!0}});var h=i(d,2);D(h,{label:`secondary`,children:(e,t)=>{k(e,{get locales(){return j},label:`Sprache`,variant:`secondary`,get value(){return c(f)},set value(e){_(f,e,!0)}})},$$slots:{default:!0}});var v=i(h,2);D(v,{label:`size l (Schülerseiten)`,children:(e,t)=>{k(e,{get locales(){return j},label:`Sprache`,size:`l`,get value(){return c(f)},set value(e){_(f,e,!0)}})},$$slots:{default:!0}});var y=i(v,2);D(y,{label:`Gewählt`,children:(e,t)=>{var i=I(),a=r(i,!0);n(()=>m(a,c(f))),g(e,i)},$$slots:{default:!0}}),l(s);var b=i(s,2),x=i(t(b),4);k(x,{get locales(){return M},label:`Sprache`,align:`start`,get value(){return c(p)},set value(e){_(p,e,!0)}}),l(b);var S=i(b,2),C=i(t(S),2);k(C,{get locales(){return j},label:`Language`,get value(){return c(f)},set value(e){_(f,e,!0)}}),l(S);var w=i(S,4),E=i(t(w),2);T(E,{dos:[`Sprachnamen in ihrer eigenen Sprache („English“, nicht „Englisch“).`,`label in der aktuellen Sprache der App („Sprache“ / „Language“).`,`Im Konto-Menü statt eines eigenen Auslösers: MenuRadioGroup mit denselben Einträgen.`],donts:[`Keine Flaggen: Flaggen stehen für Länder, nicht für Sprachen.`,`Die aktuelle Sprache nicht deaktivieren: sie ist gewählt, nicht gesperrt.`]}),l(w),g(e,o)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),g(e,v),o()}var j,M,N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{f(),v(),S(),C(),E(),O(),p(),y(),j=[{code:`de`,name:`Deutsch`},{code:`en`,name:`English`}],M=[...j,{code:`fr`,name:`Français`},{code:`uk`,name:`Українська`},{code:`tr`,name:`Türkçe`}],N={title:`Navigation/LocaleSwitcher`,component:k,tags:[`autodocs`],parameters:{layout:`padded`},args:{locales:j,value:`de`,label:`Sprache`,variant:`ghost`,size:`s`,align:`end`},argTypes:{variant:{control:`inline-radio`,options:[`ghost`,`secondary`]},size:{control:`inline-radio`,options:[`s`,`m`,`l`]},align:{control:`inline-radio`,options:[`start`,`center`,`end`]}}},{Story:P}=b(N),F=d(`Wechselt die Sprache der App. Ein Menü mit den Sprachen in ihrer eigenen Schreibweise; die
			aktuelle trägt den Haken. Die Bibliothek wechselt selbst nichts: die App setzt die Sprache in <code>onValueChange</code> (in Campus über Paraglide).`,1),I=d(`<span class="value svelte-136394"> </span>`),L=d(`<section><h2>Varianten</h2> <!> <!> <!> <!></section> <section><h2>Mehr Sprachen</h2> <p class="section-intro">Jede Sprache steht in ihrer eigenen Schrift und trägt <code>lang</code>, damit Screenreader
				sie richtig aussprechen.</p> <!></section> <section data-theme="dark" class="dark-band svelte-136394"><h2>In der dunklen Kopfzeile</h2> <!></section> <section><h2>Barrierefreiheit</h2> <p class="section-intro">Sichtbar steht nur das Kürzel. Vorgelesen wird „Sprache: Deutsch, DE“: der Name enthält das
				sichtbare Kürzel, so funktioniert auch die Sprachsteuerung („Klicke DE“).</p></section> <section><h2>Richtlinien</h2> <!></section>`,1),R=d(`<!> <!>`,1),A.__docgen={data:[],name:`LocaleSwitcher.stories.svelte`},z=x(A,N),B=[`Spielwiese`,`Übersicht`],V={...z.Spielwiese,tags:[`svelte-csf-v5`]},H={...z.Übersicht,tags:[`svelte-csf-v5`]}})))()}U();export{V as Spielwiese,B as __namedExportsOrder,N as default,H as Übersicht};