import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Gt as r,Nt as i,Pt as a,R as o,Vt as s,Xt as c,Zt as l,a as u,bt as d,cn as f,ct as p,et as m,fn as h,ft as g,i as _,jt as v,lt as y,mn as b,n as x,o as S,pt as C,q as ee,rt as w,sn as T,st as E,y as te,zt as D}from"./iframe-BsWRsydk.js";import{i as ne,n as re,r as ie,t as ae}from"./create-runtime-stories-BWVMXit6.js";import{i as oe,n as se,r as ce,t as le}from"./Guidelines-B4Q9fRhg.js";import{n as ue,t as O}from"./Row-DwZNmfYl.js";import{E as de,T as k,h as fe,m as pe,t as me}from"./create-id-D9kfF9LZ.js";import{n as he,o as ge,p as _e,t as A}from"./Menu-CTLJCgcZ.js";import{n as ve,t as j}from"./MenuItem-i0frKsX6.js";import{a as ye,i as be,n as xe,o as Se,r as M,t as N}from"./MenuRadioItem-mnsUvDOZ.js";import{n as Ce,t as P}from"./MenuSeparator-C76u0ste.js";import{n as we,t as Te}from"./IconButton-DZwsdOXG.js";import{n as Ee,t as F}from"./Button-BP41bGzH.js";function De(e,n){let i=g();l(n,!0);let a=_(n,`ref`,15,null),o=_(n,`id`,19,()=>me(i)),s=u(n,I),y=ge.create({id:k(()=>o()),ref:k(()=>a(),e=>a(e))}),b=r(()=>fe(s,y.props));var x=p(),S=v(x),C=e=>{var t=p(),r=v(t);m(r,()=>n.child,()=>({props:d(b)})),E(e,t)},w=e=>{var r=L();te(r,()=>({...d(b)}));var i=t(r);m(i,()=>n.children??h),f(r),E(e,r)};ee(S,e=>{n.child?e(C):e(w,-1)}),E(e,x),c()}var I,L;function R(){return(R=e((()=>{b(),x(),de(),pe(),_e(),I=new Set([`$$slots`,`$$events`,`$$legacy`,`children`,`child`,`ref`,`id`]),L=y(`<div><!></div>`)})))()}function z(e,t){var r=p(),i=v(r);o(i,()=>De,(e,r)=>{r(e,{class:`cui-menu-group`,children:(e,r)=>{var i=B(),s=v(i);o(s,()=>ye,(e,r)=>{r(e,{class:`cui-menu-heading`,children:(e,r)=>{T();var i=C();n(()=>w(i,t.label)),E(e,i)},$$slots:{default:!0}})});var c=a(s,2);m(c,()=>t.children),E(e,i)},$$slots:{default:!0}})}),E(e,r)}var B;function V(){return(V=e((()=>{b(),x(),R(),Se(),B=y(`<!> <!>`,1),z.__docgen={data:[{name:`label`,visibility:`public`,description:`Visible group heading; also names the group for screen readers.`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`MenuGroup.svelte`}})))()}function H(e,r){l(r,!0);let o=s(`–`),u=s(`name`),p=s(`de`);var m=q(),g=v(m);W(g,{name:`Spielwiese`,template:(e,t=h)=>{A(e,{get side(){return t().side},get align(){return t().align},trigger:(e,t)=>{F(e,S(()=>t?.().props,{variant:`secondary`,iconEnd:`chevron-down`,children:(e,t)=>{T();var n=C(`Aktionen`);E(e,n)},$$slots:{default:!0}}))},children:(e,t)=>{var n=G(),r=v(n);j(r,{icon:`edit`,children:(e,t)=>{T();var n=C(`Umbenennen`);E(e,n)},$$slots:{default:!0}});var i=a(r,2);j(i,{icon:`copy`,children:(e,t)=>{T();var n=C(`Duplizieren`);E(e,n)},$$slots:{default:!0}});var o=a(i,2);P(o,{});var s=a(o,2);j(s,{icon:`delete`,tone:`negative`,children:(e,t)=>{T();var n=C(`Löschen`);E(e,n)},$$slots:{default:!0}}),E(e,n)},$$slots:{trigger:!0,default:!0}})},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<Menu side={args.side} align={args.align}>
	{#snippet trigger({ props })}
		<Button {...props} variant="secondary" iconEnd="chevron-down">Aktionen</Button>
	{/snippet}
	<MenuItem icon="edit">Umbenennen</MenuItem>
	<MenuItem icon="copy">Duplizieren</MenuItem>
	<MenuSeparator />
	<MenuItem icon="delete" tone="negative">Löschen</MenuItem>
</Menu>`}}});var _=a(g,2);W(_,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Overlays" title="Menu">
	{#snippet lead()}
		Ersetzt <code>Dropdown</code> für Aktionen und Auswahlen. Der Auslöser ist ein eigener Button. Pfeiltasten,
		Pos1/Ende und Tippen eines Anfangsbuchstabens bewegen die Auswahl, Escape schließt und gibt den
		Fokus zurück.
	{/snippet}

	<section>
		<h2>Aktionen</h2>
		<p class="section-intro">
			Einträge tragen ihren Text allein. Hat kein Eintrag ein Icon, stehen die Beschriftungen
			bündig; sobald einer eins hat, rücken alle in dieselbe Spalte.
		</p>
		<Row label="Ohne Icons">
			<Menu>
				{#snippet trigger({ props })}
					<Button {...props} variant="secondary" iconEnd="chevron-down">Programm</Button>
				{/snippet}
				<MenuItem onSelect={() => (lastAction = 'Umbenennen')}>Umbenennen</MenuItem>
				<MenuItem onSelect={() => (lastAction = 'Duplizieren')}>Duplizieren</MenuItem>
				<MenuItem onSelect={() => (lastAction = 'Teilen')}>Teilen</MenuItem>
				<MenuGroup label="Exportieren">
					<MenuItem onSelect={() => (lastAction = 'Als .hex')}>Als .hex</MenuItem>
					<MenuItem onSelect={() => (lastAction = 'Als .zip')}>Als .zip</MenuItem>
				</MenuGroup>
			</Menu>
			<span class="muted">zuletzt gewählt: {lastAction}</span>
		</Row>
		<Row label="Mit Icons">
			<Menu>
				{#snippet trigger({ props })}
					<Button {...props} variant="secondary" iconEnd="chevron-down">Aktionen</Button>
				{/snippet}
				<MenuItem icon="edit" onSelect={() => (lastAction = 'Umbenennen')}>Umbenennen</MenuItem>
				<MenuItem icon="copy" onSelect={() => (lastAction = 'Duplizieren')}>Duplizieren</MenuItem>
				<MenuItem icon="download" onSelect={() => (lastAction = 'Herunterladen')}>
					Herunterladen
				</MenuItem>
				<MenuItem icon="upload" disabled>Hochladen</MenuItem>
				<MenuSeparator />
				<MenuItem icon="delete" tone="negative" onSelect={() => (lastAction = 'Löschen')}>
					Löschen
				</MenuItem>
			</Menu>
		</Row>
		<Row label="Mit IconButton">
			<Menu align="end">
				{#snippet trigger({ props })}
					<IconButton {...props} icon="more-vertical" label="Weitere Aktionen" />
				{/snippet}
				<MenuItem icon="edit">Umbenennen</MenuItem>
				<MenuItem icon="settings">Einstellungen</MenuItem>
			</Menu>
		</Row>
	</section>

	<section>
		<h2>Auswahl</h2>
		<p class="section-intro">
			Gewählt ist, was einen Haken hat (<code>menuitemradio</code>). Nie sieht eine Auswahl aus
			wie ein deaktivierter Eintrag.
		</p>
		<Row label="Sortieren">
			<Menu>
				{#snippet trigger({ props })}
					<Button {...props} variant="ghost" iconEnd="chevron-down">Sortieren</Button>
				{/snippet}
				<MenuRadioGroup label="Sortieren nach" bind:value={sort}>
					<MenuRadioItem value="name">Name</MenuRadioItem>
					<MenuRadioItem value="changed">Zuletzt geändert</MenuRadioItem>
					<MenuRadioItem value="editor">Editor</MenuRadioItem>
				</MenuRadioGroup>
			</Menu>
			<span class="muted">sort = {sort}</span>
		</Row>
		<Row label="Gruppen">
			<Menu>
				{#snippet trigger({ props })}
					<Button {...props} variant="secondary" iconEnd="chevron-down">Konto</Button>
				{/snippet}
				<MenuGroup label="Konto">
					<MenuItem icon="edit">Name ändern</MenuItem>
				</MenuGroup>
				<MenuSeparator />
				<MenuRadioGroup label="Sprache" bind:value={locale}>
					<MenuRadioItem value="de">Deutsch</MenuRadioItem>
					<MenuRadioItem value="en">English</MenuRadioItem>
				</MenuRadioGroup>
			</Menu>
		</Row>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Einträge als Verben („Umbenennen“), höchstens etwa sieben.',
				'Einträge in der Regel ohne Icon; ein Icon nur, wo es die Bedeutung wirklich stützt.',
				'Endgültige Einträge ans Ende, hinter einen Trenner, mit tone="negative" und ihrem Icon (auch in Menüs ohne Icons; das Icon trägt das Rot).'
			]}
			donts={[
				'Kein Menü als Tooltip oder Hinweis missbrauchen.',
				'Keine Links, Formulare oder Schalter im Menü.',
				'Keine rote Schrift für Löschen; das Icon trägt das Rot.'
			]}
			notFor={[
				'Erklärender Text beim Zeigen: Tooltip.',
				'Formularauswahl mit Label: Select (Welle 2).'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{ce(e,{eyebrow:`Overlays`,title:`Menu`,lead:e=>{T();var t=K();T(2),E(e,t)},children:(e,r)=>{var s=Z(),c=v(s),l=a(t(c),4);O(l,{label:`Ohne Icons`,children:(e,t)=>{var r=J(),s=v(r);A(s,{trigger:(e,t)=>{F(e,S(()=>t?.().props,{variant:`secondary`,iconEnd:`chevron-down`,children:(e,t)=>{T();var n=C(`Programm`);E(e,n)},$$slots:{default:!0}}))},children:(e,t)=>{var n=G(),r=v(n);j(r,{onSelect:()=>D(o,`Umbenennen`),children:(e,t)=>{T();var n=C(`Umbenennen`);E(e,n)},$$slots:{default:!0}});var i=a(r,2);j(i,{onSelect:()=>D(o,`Duplizieren`),children:(e,t)=>{T();var n=C(`Duplizieren`);E(e,n)},$$slots:{default:!0}});var s=a(i,2);j(s,{onSelect:()=>D(o,`Teilen`),children:(e,t)=>{T();var n=C(`Teilen`);E(e,n)},$$slots:{default:!0}}),z(a(s,2),{label:`Exportieren`,children:(e,t)=>{var n=q(),r=v(n);j(r,{onSelect:()=>D(o,`Als .hex`),children:(e,t)=>{T();var n=C(`Als .hex`);E(e,n)},$$slots:{default:!0}});var i=a(r,2);j(i,{onSelect:()=>D(o,`Als .zip`),children:(e,t)=>{T();var n=C(`Als .zip`);E(e,n)},$$slots:{default:!0}}),E(e,n)},$$slots:{default:!0}}),E(e,n)},$$slots:{trigger:!0,default:!0}});var c=a(s,2),l=i(c);n(()=>w(l,`zuletzt gewählt: ${d(o)??``}`)),E(e,r)},$$slots:{default:!0}});var m=a(l,2);O(m,{label:`Mit Icons`,children:(e,t)=>{A(e,{trigger:(e,t)=>{F(e,S(()=>t?.().props,{variant:`secondary`,iconEnd:`chevron-down`,children:(e,t)=>{T();var n=C(`Aktionen`);E(e,n)},$$slots:{default:!0}}))},children:(e,t)=>{var n=Y(),r=v(n);j(r,{icon:`edit`,onSelect:()=>D(o,`Umbenennen`),children:(e,t)=>{T();var n=C(`Umbenennen`);E(e,n)},$$slots:{default:!0}});var i=a(r,2);j(i,{icon:`copy`,onSelect:()=>D(o,`Duplizieren`),children:(e,t)=>{T();var n=C(`Duplizieren`);E(e,n)},$$slots:{default:!0}});var s=a(i,2);j(s,{icon:`download`,onSelect:()=>D(o,`Herunterladen`),children:(e,t)=>{T();var n=C(`Herunterladen`);E(e,n)},$$slots:{default:!0}});var c=a(s,2);j(c,{icon:`upload`,disabled:!0,children:(e,t)=>{T();var n=C(`Hochladen`);E(e,n)},$$slots:{default:!0}});var l=a(c,2);P(l,{});var u=a(l,2);j(u,{icon:`delete`,tone:`negative`,onSelect:()=>D(o,`Löschen`),children:(e,t)=>{T();var n=C(`Löschen`);E(e,n)},$$slots:{default:!0}}),E(e,n)},$$slots:{trigger:!0,default:!0}})},$$slots:{default:!0}});var h=a(m,2);O(h,{label:`Mit IconButton`,children:(e,t)=>{A(e,{align:`end`,trigger:(e,t)=>{Te(e,S(()=>t?.().props,{icon:`more-vertical`,label:`Weitere Aktionen`}))},children:(e,t)=>{var n=q(),r=v(n);j(r,{icon:`edit`,children:(e,t)=>{T();var n=C(`Umbenennen`);E(e,n)},$$slots:{default:!0}});var i=a(r,2);j(i,{icon:`settings`,children:(e,t)=>{T();var n=C(`Einstellungen`);E(e,n)},$$slots:{default:!0}}),E(e,n)},$$slots:{trigger:!0,default:!0}})},$$slots:{default:!0}}),f(c);var g=a(c,2),_=a(t(g),4);O(_,{label:`Sortieren`,children:(e,t)=>{var r=J(),o=v(r);A(o,{trigger:(e,t)=>{F(e,S(()=>t?.().props,{variant:`ghost`,iconEnd:`chevron-down`,children:(e,t)=>{T();var n=C(`Sortieren`);E(e,n)},$$slots:{default:!0}}))},children:(e,t)=>{M(e,{label:`Sortieren nach`,get value(){return d(u)},set value(e){D(u,e,!0)},children:(e,t)=>{var n=X(),r=v(n);N(r,{value:`name`,children:(e,t)=>{T();var n=C(`Name`);E(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{value:`changed`,children:(e,t)=>{T();var n=C(`Zuletzt geändert`);E(e,n)},$$slots:{default:!0}});var o=a(i,2);N(o,{value:`editor`,children:(e,t)=>{T();var n=C(`Editor`);E(e,n)},$$slots:{default:!0}}),E(e,n)},$$slots:{default:!0}})},$$slots:{trigger:!0,default:!0}});var s=a(o,2),c=i(s);n(()=>w(c,`sort = ${d(u)??``}`)),E(e,r)},$$slots:{default:!0}});var y=a(_,2);O(y,{label:`Gruppen`,children:(e,t)=>{A(e,{trigger:(e,t)=>{F(e,S(()=>t?.().props,{variant:`secondary`,iconEnd:`chevron-down`,children:(e,t)=>{T();var n=C(`Konto`);E(e,n)},$$slots:{default:!0}}))},children:(e,t)=>{var n=X(),r=v(n);z(r,{label:`Konto`,children:(e,t)=>{j(e,{icon:`edit`,children:(e,t)=>{T();var n=C(`Name ändern`);E(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=a(r,2);P(i,{});var o=a(i,2);M(o,{label:`Sprache`,get value(){return d(p)},set value(e){D(p,e,!0)},children:(e,t)=>{var n=q(),r=v(n);N(r,{value:`de`,children:(e,t)=>{T();var n=C(`Deutsch`);E(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{value:`en`,children:(e,t)=>{T();var n=C(`English`);E(e,n)},$$slots:{default:!0}}),E(e,n)},$$slots:{default:!0}}),E(e,n)},$$slots:{trigger:!0,default:!0}})},$$slots:{default:!0}}),f(g);var b=a(g,2),x=a(t(b),2);le(x,{dos:[`Einträge als Verben („Umbenennen“), höchstens etwa sieben.`,`Einträge in der Regel ohne Icon; ein Icon nur, wo es die Bedeutung wirklich stützt.`,`Endgültige Einträge ans Ende, hinter einen Trenner, mit tone="negative" und ihrem Icon (auch in Menüs ohne Icons; das Icon trägt das Rot).`],donts:[`Kein Menü als Tooltip oder Hinweis missbrauchen.`,`Keine Links, Formulare oder Schalter im Menü.`,`Keine rote Schrift für Löschen; das Icon trägt das Rot.`],notFor:[`Erklärender Text beim Zeigen: Tooltip.`,`Formularauswahl mit Label: Select (Welle 2).`]}),f(b),E(e,s)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),E(e,m),c()}var U,W,G,K,q,J,Y,X,Z,Q,Oe,ke,Ae;function $(){return($=e((()=>{b(),ne(),oe(),se(),ue(),Ee(),we(),he(),V(),ve(),be(),xe(),Ce(),x(),re(),U={title:`Overlays/Menu`,component:A,tags:[`autodocs`],parameters:{layout:`padded`},args:{side:`bottom`,align:`start`},argTypes:{side:{control:`inline-radio`,options:[`top`,`right`,`bottom`,`left`]},align:{control:`inline-radio`,options:[`start`,`center`,`end`]}}},{Story:W}=ie(U),G=y(`<!> <!> <!> <!>`,1),K=y(`Ersetzt <code>Dropdown</code> für Aktionen und Auswahlen. Der Auslöser ist ein eigener Button. Pfeiltasten,
			Pos1/Ende und Tippen eines Anfangsbuchstabens bewegen die Auswahl, Escape schließt und gibt den
			Fokus zurück.`,1),q=y(`<!> <!>`,1),J=y(`<!> <span class="muted"> </span>`,1),Y=y(`<!> <!> <!> <!> <!> <!>`,1),X=y(`<!> <!> <!>`,1),Z=y(`<section><h2>Aktionen</h2> <p class="section-intro">Einträge tragen ihren Text allein. Hat kein Eintrag ein Icon, stehen die Beschriftungen
				bündig; sobald einer eins hat, rücken alle in dieselbe Spalte.</p> <!> <!> <!></section> <section><h2>Auswahl</h2> <p class="section-intro">Gewählt ist, was einen Haken hat (<code>menuitemradio</code>). Nie sieht eine Auswahl aus
				wie ein deaktivierter Eintrag.</p> <!> <!></section> <section><h2>Richtlinien</h2> <!></section>`,1),H.__docgen={data:[],name:`Menu.stories.svelte`},Q=ae(H,U),Oe=[`Spielwiese`,`Übersicht`],ke={...Q.Spielwiese,tags:[`svelte-csf-v5`]},Ae={...Q.Übersicht,tags:[`svelte-csf-v5`]}})))()}$();export{ke as Spielwiese,Oe as __namedExportsOrder,U as default,Ae as Übersicht};