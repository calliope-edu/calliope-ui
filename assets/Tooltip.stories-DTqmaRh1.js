import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,H as r,Pt as i,Xt as a,Zt as o,cn as s,ct as c,fn as l,jt as u,lt as d,mn as f,n as p,o as m,pt as h,rt as g,sn as _,st as v}from"./iframe-BsWRsydk.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-BWVMXit6.js";import{i as C,n as w,r as T,t as E}from"./Guidelines-B4Q9fRhg.js";import{n as D,t as O}from"./Row-DwZNmfYl.js";import{i as k,n as A,r as j,t as M}from"./IconButton-DZwsdOXG.js";import{n as N,t as P}from"./Button-BP41bGzH.js";function F(e,d){o(d,!0);var f=H(),p=u(f);L(p,{name:`Spielwiese`,template:(e,t=l)=>{j(e,m(t,{trigger:(e,t)=>{P(e,m(()=>t?.().props,{icon:`download`,children:(e,t)=>{_();var n=h(`Übertragen`);v(e,n)},$$slots:{default:!0}}))},$$slots:{trigger:!0}}))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
	{#snippet trigger({ props })}
		<Button {...props} icon="download">Übertragen</Button>
	{/snippet}
</Tooltip>`}}});var y=i(p,2);L(y,{name:`Geöffnet`,asChild:!0,children:(e,n)=>{var r=R(),i=t(r);j(i,{text:`Einstellungen`,open:!0,trigger:(e,t)=>{M(e,m(()=>t?.().props,{icon:`settings`,label:`Einstellungen`,tooltip:!1}))},$$slots:{trigger:!0}}),s(r),v(e,r)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div style="padding: 4rem">
	<Tooltip text="Einstellungen" open>
		{#snippet trigger({ props })}
			<IconButton {...props} icon="settings" label="Einstellungen" tooltip={false} />
		{/snippet}
	</Tooltip>
</div>`}}});var b=i(y,2);L(b,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Overlays" title="Tooltip">
	{#snippet lead()}
		Kurzer Text beim Zeigen mit der Maus oder beim Fokus per Tastatur. Escape schließt ihn. Ein
		Tooltip enthält nie Bedienelemente und ist nie der einzige Name eines Buttons.
	{/snippet}

	<section>
		<h2>Auslöser</h2>
		<Row label="IconButton">
			<IconButton icon="settings" label="Einstellungen" />
			<IconButton icon="fullscreen" label="Vollbild" />
			<span class="muted">IconButton bringt den Tooltip schon mit</span>
		</Row>
		<Row label="Button">
			<Tooltip text="Programm auf den Calliope mini übertragen">
				{#snippet trigger({ props })}
					<Button {...props} icon="download">Übertragen</Button>
				{/snippet}
			</Tooltip>
		</Row>
		<Row label="Grund fürs Deaktivieren">
			<Tooltip text="Erst einen Calliope mini verbinden">
				{#snippet trigger({ props })}
					<Button {...props} disabled focusableWhenDisabled>Übertragen</Button>
				{/snippet}
			</Tooltip>
			<span class="muted">bleibt per Tab erreichbar, damit der Grund lesbar ist</span>
		</Row>
	</section>

	<section>
		<h2>Seiten</h2>
		<Row label="side">
			{#each ['top', 'right', 'bottom', 'left'] as const as side (side)}
				<Tooltip text="Tooltip {side}" {side}>
					{#snippet trigger({ props })}
						<Button {...props} variant="secondary" size="s">{side}</Button>
					{/snippet}
				</Tooltip>
			{/each}
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Ein paar Wörter, die ergänzen, was der Button tut.',
				'Den Grund nennen, warum etwas gerade nicht geht.'
			]}
			donts={[
				'Keine Links, Buttons oder Formulare im Tooltip.',
				'Keine wichtigen Informationen nur im Tooltip: auf Touch-Geräten sieht ihn niemand.'
			]}
			notFor={[
				'Auswahl oder Aktionen: Menu.',
				'Längere Erklärungen mit Bedienelementen: Popover (Welle 2).'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,a)=>{T(e,{eyebrow:`Overlays`,title:`Tooltip`,lead:e=>{_();var t=h(`Kurzer Text beim Zeigen mit der Maus oder beim Fokus per Tastatur. Escape schließt ihn. Ein
			Tooltip enthält nie Bedienelemente und ist nie der einzige Name eines Buttons.`);v(e,t)},children:(e,a)=>{var o=V(),l=u(o),d=i(t(l),2);O(d,{label:`IconButton`,children:(e,t)=>{var n=z(),r=u(n);M(r,{icon:`settings`,label:`Einstellungen`});var a=i(r,2);M(a,{icon:`fullscreen`,label:`Vollbild`}),_(2),v(e,n)},$$slots:{default:!0}});var f=i(d,2);O(f,{label:`Button`,children:(e,t)=>{j(e,{text:`Programm auf den Calliope mini übertragen`,trigger:(e,t)=>{P(e,m(()=>t?.().props,{icon:`download`,children:(e,t)=>{_();var n=h(`Übertragen`);v(e,n)},$$slots:{default:!0}}))},$$slots:{trigger:!0}})},$$slots:{default:!0}});var p=i(f,2);O(p,{label:`Grund fürs Deaktivieren`,children:(e,t)=>{var n=B(),r=u(n);j(r,{text:`Erst einen Calliope mini verbinden`,trigger:(e,t)=>{P(e,m(()=>t?.().props,{disabled:!0,focusableWhenDisabled:!0,children:(e,t)=>{_();var n=h(`Übertragen`);v(e,n)},$$slots:{default:!0}}))},$$slots:{trigger:!0}}),_(2),v(e,n)},$$slots:{default:!0}}),s(l);var y=i(l,2),b=i(t(y),2);O(b,{label:`side`,children:(e,t)=>{var i=c(),a=u(i);r(a,16,()=>[`top`,`right`,`bottom`,`left`],e=>e,(e,t)=>{j(e,{get text(){return`Tooltip ${t??``}`},get side(){return t},trigger:(e,r)=>{P(e,m(()=>r?.().props,{variant:`secondary`,size:`s`,children:(e,r)=>{_();var i=h();n(()=>g(i,t)),v(e,i)},$$slots:{default:!0}}))},$$slots:{trigger:!0}})}),v(e,i)},$$slots:{default:!0}}),s(y);var x=i(y,2),S=i(t(x),2);E(S,{dos:[`Ein paar Wörter, die ergänzen, was der Button tut.`,`Den Grund nennen, warum etwas gerade nicht geht.`],donts:[`Keine Links, Buttons oder Formulare im Tooltip.`,`Keine wichtigen Informationen nur im Tooltip: auf Touch-Geräten sieht ihn niemand.`],notFor:[`Auswahl oder Aktionen: Menu.`,`Längere Erklärungen mit Bedienelementen: Popover (Welle 2).`]}),s(x),v(e,o)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),v(e,f),a()}var I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{f(),y(),C(),w(),D(),N(),A(),k(),p(),b(),I={title:`Overlays/Tooltip`,component:j,tags:[`autodocs`],parameters:{layout:`centered`},args:{text:`Programm auf den Calliope mini übertragen`,side:`top`,delay:400},argTypes:{side:{control:`inline-radio`,options:[`top`,`right`,`bottom`,`left`]}}},{Story:L}=x(I),R=d(`<div style="padding: 4rem"><!></div>`),z=d(`<!> <!> <span class="muted">IconButton bringt den Tooltip schon mit</span>`,1),B=d(`<!> <span class="muted">bleibt per Tab erreichbar, damit der Grund lesbar ist</span>`,1),V=d(`<section><h2>Auslöser</h2> <!> <!> <!></section> <section><h2>Seiten</h2> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),H=d(`<!> <!> <!>`,1),F.__docgen={data:[],name:`Tooltip.stories.svelte`},U=S(F,I),W=[`Spielwiese`,`Geöffnet`,`Übersicht`],G={...U.Spielwiese,tags:[`svelte-csf-v5`]},K={...U.Geöffnet,tags:[`svelte-csf-v5`]},q={...U.Übersicht,tags:[`svelte-csf-v5`]}})))()}J();export{K as Geöffnet,G as Spielwiese,W as __namedExportsOrder,I as default,q as Übersicht};