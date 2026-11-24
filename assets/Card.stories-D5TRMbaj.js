import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,D as n,Dt as r,H as i,Nt as a,P as o,Pt as s,S as c,T as l,Xt as u,Zt as d,a as f,cn as p,ct as m,et as h,fn as g,i as _,jt as v,lt as y,mn as b,n as x,o as S,pt as C,q as w,rt as T,sn as E,st as D,ut as O,y as k}from"./iframe-BsWRsydk.js";import{i as A,n as j,r as M,t as N}from"./create-runtime-stories-BWVMXit6.js";import{i as P,n as F,r as ee,t as te}from"./Guidelines-B4Q9fRhg.js";import{n as ne,t as re}from"./Menu-CTLJCgcZ.js";import{n as ie,t as I}from"./MenuItem-i0frKsX6.js";import{n as ae,t as oe}from"./IconButton-DZwsdOXG.js";import{n as se,t as ce}from"./Badge-BIs29jtc.js";import{n as le,t as L}from"./Button-BP41bGzH.js";import{n as ue,t as de}from"./StatusDot-BwTRw03i.js";function R(e,i){let l=_(i,`level`,3,3),u=_(i,`padding`,3,`m`),d=f(i,z);var g=G();k(g,()=>({class:`cui-card`,"data-padding":u(),"data-identity":i.identity,"data-interactive":i.href!==void 0||void 0,...d}),void 0,void 0,void 0,`svelte-gy5tl`);var y=t(g),b=e=>{var n=B(),r=t(n);h(r,()=>i.media),p(n),D(e,n)};w(y,e=>{i.media&&e(b)});var x=s(y,2),S=t(x),E=e=>{var t=V(),n=a(t,!0);r(()=>T(n,i.eyebrow)),D(e,t)};w(S,e=>{i.eyebrow&&e(E)});var O=s(S,2),A=e=>{var t=m(),s=v(t);o(s,()=>`h${l()}`,!1,(e,t)=>{n(e,0,`title svelte-gy5tl`);var o=m(),s=v(o),l=e=>{var t=H(),n=a(t,!0);r(()=>{c(t,`href`,i.href),T(n,i.title)}),D(e,t)},u=e=>{var t=C();r(()=>T(t,i.title)),D(e,t)};w(s,e=>{i.href===void 0?e(u,-1):e(l)}),D(t,o)}),D(e,t)};w(O,e=>{i.title&&e(A)});var j=s(O,2),M=e=>{var t=U(),n=a(t,!0);r(()=>T(n,i.description)),D(e,t)};w(j,e=>{i.description&&e(M)});var N=s(j,2),P=e=>{var n=fe(),r=t(n);h(r,()=>i.children),p(n),D(e,n)};w(N,e=>{i.children&&e(P)}),p(x);var F=s(x,2),ee=e=>{var n=W(),r=t(n);h(r,()=>i.actions),p(n),D(e,n)};w(F,e=>{i.actions&&e(ee)}),p(g),D(e,g)}var z,B,V,H,U,fe,W,G;function K(){return(K=e((()=>{b(),x(),z=new Set([`$$slots`,`$$events`,`$$legacy`,`title`,`level`,`eyebrow`,`description`,`href`,`identity`,`media`,`actions`,`children`,`padding`]),B=y(`<div class="media svelte-gy5tl"><!></div>`),V=y(`<p class="eyebrow svelte-gy5tl"> </p>`),H=y(`<a class="link svelte-gy5tl"> </a>`),U=y(`<p class="description svelte-gy5tl"> </p>`),fe=y(`<div class="content svelte-gy5tl"><!></div>`),W=y(`<div class="actions svelte-gy5tl"><!></div>`),G=y(`<div><!> <div class="body svelte-gy5tl"><!> <!> <!> <!></div> <!></div>`),R.__docgen={data:[{name:`title`,visibility:`public`,description:`Name of the thing the card stands for. Required when the card is a link.`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`level`,visibility:`public`,description:`Heading level of the title, to fit the page outline.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`number`,value:2,text:`2`},{kind:`const`,type:`number`,value:3,text:`3`},{kind:`const`,type:`number`,value:4,text:`4`}],text:`2 | 3 | 4`},static:!1,readonly:!1,defaultValue:`3`},{name:`eyebrow`,visibility:`public`,description:`Short line above the title: the kind of thing ("MakeCode-Programm").`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`description`,visibility:`public`,description:`One or two sentences under the title.`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`href`,visibility:`public`,description:`Makes the whole card a link: the title is the link, its hit area covers the card.`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`identity`,visibility:`public`,description:`A 4px line in an identity colour along the top edge, for a product or editor.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`ki-training`,text:`"ki-training"`},{kind:`const`,type:`string`,value:`teachable`,text:`"teachable"`},{kind:`const`,type:`string`,value:`iot`,text:`"iot"`},{kind:`const`,type:`string`,value:`robotik`,text:`"robotik"`},{kind:`const`,type:`string`,value:`makecode`,text:`"makecode"`},{kind:`const`,type:`string`,value:`python`,text:`"python"`},{kind:`const`,type:`string`,value:`blocks`,text:`"blocks"`},{kind:`const`,type:`string`,value:`markdown`,text:`"markdown"`}],text:`"ki-training" | "teachable" | "iot" | "robotik" | "makecode" | "python" | "blocks" | "markdown"`},static:!1,readonly:!1},{name:`media`,visibility:`public`,description:`Full-bleed image or preview above the text. Decorative: give images alt="".`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`actions`,visibility:`public`,description:`Footer row (Buttons, a Menu). Stays clickable above the card's link.`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`children`,visibility:`public`,description:`Free content under the description.`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`padding`,visibility:`public`,description:`m = 16px (default), l = 24px.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`m`,text:`"m"`},{kind:`const`,type:`string`,value:`l`,text:`"l"`}],text:`"m" | "l"`},static:!1,readonly:!1,defaultValue:`"m"`},{name:`data-sveltekit-preload-code`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`boolean`,text:`boolean`},{kind:`const`,type:`string`,value:``,text:`""`},{kind:`const`,type:`string`,value:`eager`,text:`"eager"`},{kind:`const`,type:`string`,value:`viewport`,text:`"viewport"`},{kind:`const`,type:`string`,value:`hover`,text:`"hover"`},{kind:`const`,type:`string`,value:`tap`,text:`"tap"`}],text:`boolean | "" | "eager" | "viewport" | "hover" | "tap"`},static:!1,readonly:!1},{name:`data-sveltekit-preload-data`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`boolean`,text:`boolean`},{kind:`const`,type:`string`,value:``,text:`""`},{kind:`const`,type:`string`,value:`hover`,text:`"hover"`},{kind:`const`,type:`string`,value:`tap`,text:`"tap"`}],text:`boolean | "" | "hover" | "tap"`},static:!1,readonly:!1},{name:`data-sveltekit-reload`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`boolean`,text:`boolean`},{kind:`const`,type:`string`,value:``,text:`""`}],text:`boolean | ""`},static:!1,readonly:!1},{name:`data-sveltekit-replacestate`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`boolean`,text:`boolean`},{kind:`const`,type:`string`,value:``,text:`""`}],text:`boolean | ""`},static:!1,readonly:!1},{name:`data-sveltekit-reset`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`boolean`,text:`boolean`},{kind:`const`,type:`string`,value:``,text:`""`}],text:`boolean | ""`},static:!1,readonly:!1}],name:`Card.svelte`}})))()}function q(e,n){d(n,!0);var a=Z(),o=v(a);X(o,{name:`Spielwiese`,template:(e,n=g)=>{var r=pe();R(t(r),S(n,{actions:e=>{var t=Z(),n=v(t);L(n,{size:`s`,children:(e,t)=>{E();var n=C(`Öffnen`);D(e,n)},$$slots:{default:!0}});var r=s(n,2);L(r,{size:`s`,variant:`ghost`,children:(e,t)=>{E();var n=C(`Teilen`);D(e,n)},$$slots:{default:!0}}),D(e,t)},$$slots:{actions:!0}})),p(r),D(e,r)},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<div style="max-width: 22rem">
	<Card {...args}>
		{#snippet actions()}
			<Button size="s">Öffnen</Button>
			<Button size="s" variant="ghost">Teilen</Button>
		{/snippet}
	</Card>
</div>`}}});var f=s(o,2);X(f,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Patterns" title="Card">
	{#snippet lead()}
		Eine Fläche für ein Ding: ein Programm, einen Raum, eine Lerneinheit. Flach mit 1px-Rahmen,
		ohne Schatten und ohne Anheben beim Darüberfahren. Ersetzt die ungenutzte Campus-<code
			>Card</code
		>.
	{/snippet}

	<section>
		<h2>Aufbau</h2>
		<p class="section-intro">
			Kennzeile, Titel, ein bis zwei Sätze, dann freier Inhalt und eine Aktionszeile. Alles ist
			optional; der Titel ist eine Überschrift (level), damit die Karte in die Gliederung passt.
		</p>
		<div class="grid">
			<Card
				eyebrow="MakeCode-Programm"
				title="Wetterstation"
				description="Misst Temperatur und Licht und zeigt beides auf der LED-Matrix."
				identity="makecode"
			>
				<div class="meta">
					<Badge size="s">Geändert vor 2 Tagen</Badge>
				</div>
				{#snippet actions()}
					<Button size="s">Öffnen</Button>
					<Menu>
						{#snippet trigger({ props })}
							<IconButton {...props} icon="more" label="Weitere Aktionen" size="s" />
						{/snippet}
						<MenuItem icon="edit">Umbenennen</MenuItem>
						<MenuItem icon="copy">Duplizieren</MenuItem>
						<MenuItem icon="delete" tone="negative">Löschen</MenuItem>
					</Menu>
				{/snippet}
			</Card>
			<Card title="Raum 7b" description="12 Teilnehmende, Code K7-PX2." padding="l">
				<StatusDot status="success" label="Offen" />
				{#snippet actions()}
					<Button size="s" variant="secondary">Raum betreten</Button>
				{/snippet}
			</Card>
			<Card title="Nur Inhalt">
				<p class="text">Ohne Beschreibung und ohne Aktionen, z. B. als Rahmen für eine Liste.</p>
			</Card>
		</div>
	</section>

	<section>
		<h2>Als Link</h2>
		<p class="section-intro">
			Mit <code>href</code> wird der Titel zum Link, dessen Klickfläche die ganze Karte bedeckt. Ein
			Tab-Stopp, der Name ist der Titel, der Fokusring liegt um die Karte. Buttons in der Aktionszeile
			bleiben eigenständig klickbar.
		</p>
		<div class="grid">
			<Card
				href="#lerneinheit"
				eyebrow="Lerneinheit"
				title="Der erste Sensor"
				description="In 45 Minuten vom Lichtsensor zur Nachtlampe."
				identity="blocks"
			/>
			<Card
				href="#iot"
				eyebrow="Projekt"
				title="Klimaprojekt 7b"
				description="3 Feeds, zuletzt aktiv vor 5 Minuten."
				identity="iot"
			>
				{#snippet actions()}
					<Button size="s" variant="ghost" icon="share">Teilen</Button>
				{/snippet}
			</Card>
		</div>
	</section>

	<section>
		<h2>Mit Vorschau</h2>
		<div class="grid">
			<Card
				href="#vorschau"
				title="Lauflicht"
				description="Python-Programm für den Calliope mini 3."
				identity="python"
			>
				{#snippet media()}
					<svg viewBox="0 0 320 140" role="presentation">
						<rect width="320" height="140" style:fill="var(--cui-surface-subtle)" />
						{#each Array.from({ length: 5 }, (_, i) => i) as i (i)}
							<rect
								x={98 + i * 26}
								y="58"
								width="20"
								height="20"
								rx="4"
								style:fill={i === 2 ? 'var(--cui-text-default)' : 'var(--cui-border-control)'}
							/>
						{/each}
					</svg>
				{/snippet}
			</Card>
		</div>
	</section>

	<section>
		<h2>Identitätslinie</h2>
		<p class="section-intro">
			Eine 4px-Linie oben in der Farbe des Produkts oder Editors. Die Fläche bleibt neutral: keine
			eingefärbten Hintergründe.
		</p>
		<div class="grid small">
			{#each identities as identity (identity)}
				<Card title={identity} {identity} level={4} />
			{/each}
		</div>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<div class="grid">
			<Card
				eyebrow="Gerät"
				title="Calliope 1"
				description="Sendet an „temperatur“ und „licht“."
				identity="iot"
			>
				{#snippet actions()}
					<Button size="s" variant="secondary">Details</Button>
				{/snippet}
			</Card>
			<Card href="#dunkel" title="Als Link" description="Fokus- und Hover-Zustand auf Dunkel." />
		</div>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Eine Karte steht für genau ein Ding; der Titel nennt es.',
				'Ganz klickbar nur über href (ein Link). Weitere Aktionen in die Aktionszeile.',
				'Die Überschriftenebene (level) passt zur Seite; Karten in einer Liste stehen in <ul>/<li>.'
			]}
			donts={[
				'Kein Schatten, kein Anheben beim Darüberfahren: Karten liegen flach.',
				'Keine eingefärbte Fläche; Identität nur als Linie oben.',
				'Keine Karte als Button für eine Auswahl im Dialog.'
			]}
			notFor={[
				'Eine Wahl zwischen zwei bis vier Wegen: ChoiceList.',
				'Hinweise und Fehler: Banner.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,n)=>{ee(e,{eyebrow:`Patterns`,title:`Card`,lead:e=>{E();var t=me();E(2),D(e,t)},children:(e,n)=>{var a=ye(),o=v(a),u=s(t(o),4),d=t(u);R(d,{eyebrow:`MakeCode-Programm`,title:`Wetterstation`,description:`Misst Temperatur und Licht und zeigt beides auf der LED-Matrix.`,identity:`makecode`,actions:e=>{var t=Z(),n=v(t);L(n,{size:`s`,children:(e,t)=>{E();var n=C(`Öffnen`);D(e,n)},$$slots:{default:!0}});var r=s(n,2);re(r,{trigger:(e,t)=>{oe(e,S(()=>t?.().props,{icon:`more`,label:`Weitere Aktionen`,size:`s`}))},children:(e,t)=>{var n=he(),r=v(n);I(r,{icon:`edit`,children:(e,t)=>{E();var n=C(`Umbenennen`);D(e,n)},$$slots:{default:!0}});var i=s(r,2);I(i,{icon:`copy`,children:(e,t)=>{E();var n=C(`Duplizieren`);D(e,n)},$$slots:{default:!0}});var a=s(i,2);I(a,{icon:`delete`,tone:`negative`,children:(e,t)=>{E();var n=C(`Löschen`);D(e,n)},$$slots:{default:!0}}),D(e,n)},$$slots:{trigger:!0,default:!0}}),D(e,t)},children:(e,n)=>{var r=ge(),i=t(r);ce(i,{size:`s`,children:(e,t)=>{E();var n=C(`Geändert vor 2 Tagen`);D(e,n)},$$slots:{default:!0}}),p(r),D(e,r)},$$slots:{actions:!0,default:!0}});var f=s(d,2);R(f,{title:`Raum 7b`,description:`12 Teilnehmende, Code K7-PX2.`,padding:`l`,actions:e=>{L(e,{size:`s`,variant:`secondary`,children:(e,t)=>{E();var n=C(`Raum betreten`);D(e,n)},$$slots:{default:!0}})},children:(e,t)=>{de(e,{status:`success`,label:`Offen`})},$$slots:{actions:!0,default:!0}}),R(s(f,2),{title:`Nur Inhalt`,children:(e,t)=>{var n=_e();D(e,n)},$$slots:{default:!0}}),p(u),p(o);var m=s(o,2),h=s(t(m),4),g=t(h);R(g,{href:`#lerneinheit`,eyebrow:`Lerneinheit`,title:`Der erste Sensor`,description:`In 45 Minuten vom Lichtsensor zur Nachtlampe.`,identity:`blocks`}),R(s(g,2),{href:`#iot`,eyebrow:`Projekt`,title:`Klimaprojekt 7b`,description:`3 Feeds, zuletzt aktiv vor 5 Minuten.`,identity:`iot`,actions:e=>{L(e,{size:`s`,variant:`ghost`,icon:`share`,children:(e,t)=>{E();var n=C(`Teilen`);D(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0}}),p(h),p(m);var _=s(m,2),y=s(t(_),2);R(t(y),{href:`#vorschau`,title:`Lauflicht`,description:`Python-Programm für den Calliope mini 3.`,identity:`python`,media:e=>{var n=ve(),a=t(n);l(a,``,{},{fill:`var(--cui-surface-subtle)`});var o=s(a);i(o,16,()=>Array.from({length:5},(e,t)=>t),e=>e,(e,t)=>{var n=Q();let i;r(()=>{c(n,`x`,98+t*26),i=l(n,``,i,{fill:t===2?`var(--cui-text-default)`:`var(--cui-border-control)`})}),D(e,n)}),p(n),D(e,n)},$$slots:{media:!0}}),p(y),p(_);var b=s(_,2),x=s(t(b),4);i(x,20,()=>J,e=>e,(e,t)=>{R(e,{get title(){return t},get identity(){return t},level:4})}),p(x),p(b);var w=s(b,2),T=s(t(w),2),O=t(T);R(O,{eyebrow:`Gerät`,title:`Calliope 1`,description:`Sendet an „temperatur“ und „licht“.`,identity:`iot`,actions:e=>{L(e,{size:`s`,variant:`secondary`,children:(e,t)=>{E();var n=C(`Details`);D(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0}}),R(s(O,2),{href:`#dunkel`,title:`Als Link`,description:`Fokus- und Hover-Zustand auf Dunkel.`}),p(T),p(w);var k=s(w,2),A=s(t(k),2);te(A,{dos:[`Eine Karte steht für genau ein Ding; der Titel nennt es.`,`Ganz klickbar nur über href (ein Link). Weitere Aktionen in die Aktionszeile.`,`Die Überschriftenebene (level) passt zur Seite; Karten in einer Liste stehen in <ul>/<li>.`],donts:[`Kein Schatten, kein Anheben beim Darüberfahren: Karten liegen flach.`,`Keine eingefärbte Fläche; Identität nur als Linie oben.`,`Keine Karte als Button für eine Auswahl im Dialog.`],notFor:[`Eine Wahl zwischen zwei bis vier Wegen: ChoiceList.`,`Hinweise und Fehler: Banner.`]}),p(k),D(e,a)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),D(e,a),u()}var J,Y,X,Z,pe,me,he,ge,_e,Q,ve,ye,$,be,xe,Se;function Ce(){return(Ce=e((()=>{b(),A(),P(),F(),se(),le(),ae(),ne(),ie(),ue(),K(),x(),j(),J=[`makecode`,`python`,`blocks`,`markdown`,`ki-training`,`teachable`,`iot`,`robotik`],Y={title:`Patterns/Card`,component:R,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Wetterstation`,eyebrow:`MakeCode-Programm`,description:`Misst Temperatur und Licht und zeigt beides auf der LED-Matrix.`,level:3,padding:`m`,identity:`makecode`},argTypes:{identity:{control:`select`,options:[void 0,...J]},padding:{control:`inline-radio`,options:[`m`,`l`]},level:{control:`inline-radio`,options:[2,3,4]}}},{Story:X}=M(Y),Z=y(`<!> <!>`,1),pe=y(`<div style="max-width: 22rem"><!></div>`),me=y(`Eine Fläche für ein Ding: ein Programm, einen Raum, eine Lerneinheit. Flach mit 1px-Rahmen,
			ohne Schatten und ohne Anheben beim Darüberfahren. Ersetzt die ungenutzte Campus-<code>Card</code>.`,1),he=y(`<!> <!> <!>`,1),ge=y(`<div class="meta svelte-euizmy"><!></div>`),_e=y(`<p class="text svelte-euizmy">Ohne Beschreibung und ohne Aktionen, z. B. als Rahmen für eine Liste.</p>`),Q=O(`<rect y="58" width="20" height="20" rx="4"></rect>`),ve=O(`<svg viewBox="0 0 320 140" role="presentation"><rect width="320" height="140"></rect><!></svg>`),ye=y(`<section><h2>Aufbau</h2> <p class="section-intro">Kennzeile, Titel, ein bis zwei Sätze, dann freier Inhalt und eine Aktionszeile. Alles ist
				optional; der Titel ist eine Überschrift (level), damit die Karte in die Gliederung passt.</p> <div class="grid svelte-euizmy"><!> <!> <!></div></section> <section><h2>Als Link</h2> <p class="section-intro">Mit <code>href</code> wird der Titel zum Link, dessen Klickfläche die ganze Karte bedeckt. Ein
				Tab-Stopp, der Name ist der Titel, der Fokusring liegt um die Karte. Buttons in der Aktionszeile
				bleiben eigenständig klickbar.</p> <div class="grid svelte-euizmy"><!> <!></div></section> <section><h2>Mit Vorschau</h2> <div class="grid svelte-euizmy"><!></div></section> <section><h2>Identitätslinie</h2> <p class="section-intro">Eine 4px-Linie oben in der Farbe des Produkts oder Editors. Die Fläche bleibt neutral: keine
				eingefärbten Hintergründe.</p> <div class="grid small svelte-euizmy"></div></section> <section data-theme="dark" class="dark-band svelte-euizmy"><h2>Auf dunklen Bereichen</h2> <div class="grid svelte-euizmy"><!> <!></div></section> <section><h2>Richtlinien</h2> <!></section>`,1),q.__docgen={data:[],name:`Card.stories.svelte`},$=N(q,Y),be=[`Spielwiese`,`Übersicht`],xe={...$.Spielwiese,tags:[`svelte-csf-v5`]},Se={...$.Übersicht,tags:[`svelte-csf-v5`]}})))()}Ce();export{xe as Spielwiese,be as __namedExportsOrder,Y as default,Se as Übersicht};