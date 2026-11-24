import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Pt as n,Xt as r,Zt as i,cn as a,jt as o,ln as s,lt as c,mn as l,n as u,o as d,pt as f,sn as p,st as m}from"./iframe-BsWRsydk.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-BWVMXit6.js";import{i as y,n as b,r as x,t as S}from"./Guidelines-B4Q9fRhg.js";import{n as C,t as w}from"./Row-DwZNmfYl.js";import{n as T,t as E}from"./IconButton-DZwsdOXG.js";import{n as D,t as O}from"./Popover-Cfrtd_V2.js";import{n as k,t as A}from"./Switch-B2NCx5Ko.js";import{n as j,t as M}from"./Button-BP41bGzH.js";function N(e,c){i(c,!0);var l=V(),u=o(l);F(u,{name:`Spielwiese`,template:(e,t)=>{O(e,d(()=>s(t?.(),[`children`]),{trigger:(e,t)=>{M(e,d(()=>t?.().props,{variant:`secondary`,children:(e,t)=>{p();var n=f(`Token zeigen`);m(e,n)},$$slots:{default:!0}}))},children:(e,t)=>{var n=I();m(e,n)},$$slots:{trigger:!0,default:!0}}))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Popover {...args}>
	{#snippet trigger({ props })}
		<Button {...props} variant="secondary">Token zeigen</Button>
	{/snippet}
	<p class="text">Mit diesem Token senden Geräte an dein Dashboard.</p>
</Popover>`}}});var h=n(u,2);F(h,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Overlays" title="Popover">
	{#snippet lead()}
		Ein kleines Panel am Auslöser, das auch Bedienelemente enthalten darf (anders als der
		Tooltip). Fokus geht hinein, Escape und ein Klick daneben schließen es, der Fokus kehrt zum
		Auslöser zurück.
	{/snippet}

	<section>
		<h2>Beispiele</h2>
		<Row label="Mit Titel">
			<Popover title="Token des Dashboards">
				{#snippet trigger({ props })}
					<Button {...props} variant="secondary" iconEnd="chevron-down">Token</Button>
				{/snippet}
				<p class="text">Mit diesem Token senden Geräte an dein Dashboard.</p>
				<code class="token">K7-PX2-QM9</code>
				<div class="actions"><Button size="s" icon="copy">Kopieren</Button></div>
			</Popover>
		</Row>
		<Row label="Mit Einstellungen">
			<Popover title="Kachel" showClose size="s" align="end">
				{#snippet trigger({ props })}
					<IconButton {...props} icon="settings" label="Kachel einstellen" />
				{/snippet}
				<div class="settings">
					<Switch label="Gerät anzeigen" checked labelPosition="start" />
					<Switch label="Zeit anzeigen" labelPosition="start" />
				</div>
			</Popover>
		</Row>
		<Row label="Ohne Titel">
			<Popover size="s">
				{#snippet trigger({ props })}
					<IconButton {...props} icon="help" label="Was ist ein Feed?" />
				{/snippet}
				<p class="text">Ein Feed sammelt die Werte, die Geräte unter einem Namen senden.</p>
			</Popover>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Für kurze Inhalte am Auslöser: ein Wert zum Kopieren, zwei, drei Einstellungen.',
				'Ein Titel, wenn das Panel Bedienelemente hat; er ist zugleich sein Name.'
			]}
			donts={[
				'Keine langen Formulare und keine Pflichtentscheidung: dafür gibt es den Dialog.',
				'Nicht auf Hover öffnen.'
			]}
			notFor={[
				'Nur eine kurze Beschriftung: Tooltip.',
				'Eine Liste von Befehlen: Menu.',
				'Ein Formular oder eine Entscheidung: Dialog.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{x(e,{eyebrow:`Overlays`,title:`Popover`,lead:e=>{p();var t=f(`Ein kleines Panel am Auslöser, das auch Bedienelemente enthalten darf (anders als der
			Tooltip). Fokus geht hinein, Escape und ein Klick daneben schließen es, der Fokus kehrt zum
			Auslöser zurück.`);m(e,t)},children:(e,r)=>{var i=B(),s=o(i),c=n(t(s),2);w(c,{label:`Mit Titel`,children:(e,r)=>{O(e,{title:`Token des Dashboards`,trigger:(e,t)=>{M(e,d(()=>t?.().props,{variant:`secondary`,iconEnd:`chevron-down`,children:(e,t)=>{p();var n=f(`Token`);m(e,n)},$$slots:{default:!0}}))},children:(e,r)=>{var i=L(),s=n(o(i),4),c=t(s);M(c,{size:`s`,icon:`copy`,children:(e,t)=>{p();var n=f(`Kopieren`);m(e,n)},$$slots:{default:!0}}),a(s),m(e,i)},$$slots:{trigger:!0,default:!0}})},$$slots:{default:!0}});var l=n(c,2);w(l,{label:`Mit Einstellungen`,children:(e,r)=>{O(e,{title:`Kachel`,showClose:!0,size:`s`,align:`end`,trigger:(e,t)=>{E(e,d(()=>t?.().props,{icon:`settings`,label:`Kachel einstellen`}))},children:(e,r)=>{var i=R(),o=t(i);A(o,{label:`Gerät anzeigen`,checked:!0,labelPosition:`start`});var s=n(o,2);A(s,{label:`Zeit anzeigen`,labelPosition:`start`}),a(i),m(e,i)},$$slots:{trigger:!0,default:!0}})},$$slots:{default:!0}});var u=n(l,2);w(u,{label:`Ohne Titel`,children:(e,t)=>{O(e,{size:`s`,trigger:(e,t)=>{E(e,d(()=>t?.().props,{icon:`help`,label:`Was ist ein Feed?`}))},children:(e,t)=>{var n=z();m(e,n)},$$slots:{trigger:!0,default:!0}})},$$slots:{default:!0}}),a(s);var h=n(s,2),g=n(t(h),2);S(g,{dos:[`Für kurze Inhalte am Auslöser: ein Wert zum Kopieren, zwei, drei Einstellungen.`,`Ein Titel, wenn das Panel Bedienelemente hat; er ist zugleich sein Name.`],donts:[`Keine langen Formulare und keine Pflichtentscheidung: dafür gibt es den Dialog.`,`Nicht auf Hover öffnen.`],notFor:[`Nur eine kurze Beschriftung: Tooltip.`,`Eine Liste von Befehlen: Menu.`,`Ein Formular oder eine Entscheidung: Dialog.`]}),a(h),m(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),m(e,l),r()}var P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{l(),h(),y(),b(),C(),j(),T(),k(),D(),u(),g(),P={title:`Overlays/Popover`,component:O,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Token`,side:`bottom`,align:`start`,size:`m`,showClose:!1},argTypes:{side:{control:`inline-radio`,options:[`top`,`right`,`bottom`,`left`]},align:{control:`inline-radio`,options:[`start`,`center`,`end`]},size:{control:`inline-radio`,options:[`s`,`m`,`l`]}}},{Story:F}=_(P),I=c(`<p class="text svelte-11h4awc">Mit diesem Token senden Geräte an dein Dashboard.</p>`),L=c(`<p class="text svelte-11h4awc">Mit diesem Token senden Geräte an dein Dashboard.</p> <code class="token svelte-11h4awc">K7-PX2-QM9</code> <div class="actions svelte-11h4awc"><!></div>`,1),R=c(`<div class="settings svelte-11h4awc"><!> <!></div>`),z=c(`<p class="text svelte-11h4awc">Ein Feed sammelt die Werte, die Geräte unter einem Namen senden.</p>`),B=c(`<section><h2>Beispiele</h2> <!> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),V=c(`<!> <!>`,1),N.__docgen={data:[],name:`Popover.stories.svelte`},H=v(N,P),U=[`Spielwiese`,`Übersicht`],W={...H.Spielwiese,tags:[`svelte-csf-v5`]},G={...H.Übersicht,tags:[`svelte-csf-v5`]}})))()}K();export{W as Spielwiese,U as __namedExportsOrder,P as default,G as Übersicht};