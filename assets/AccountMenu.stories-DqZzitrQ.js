import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Gt as r,Nt as i,Pt as a,Vt as o,Xt as s,Zt as c,bt as l,cn as u,fn as d,jt as f,lt as p,mn as m,n as h,pt as g,rt as ee,sn as _,st as v,zt as y}from"./iframe-BsWRsydk.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-BWVMXit6.js";import{i as w,n as T,r as E,t as D}from"./Guidelines-B4Q9fRhg.js";import{n as O,t as k}from"./Row-DwZNmfYl.js";import{n as te,t as A}from"./MenuItem-i0frKsX6.js";import{i as ne,n as j,r as M,t as N}from"./MenuRadioItem-mnsUvDOZ.js";import{n as P,t as F}from"./MenuSeparator-C76u0ste.js";import{n as I,t as L}from"./AccountMenu-BdcPRDyo.js";function R(e,p){c(p,!0);let m=o(`de`),h=o(`–`);var b=W(),x=f(b);B(x,{name:`Spielwiese`,template:(e,t=d)=>{{let n=r(()=>t().label??`Konto`);L(e,{get name(){return t().name},get label(){return l(n)},get align(){return t().align},children:(e,t)=>{var n=V(),r=f(n);A(r,{icon:`settings`,children:(e,t)=>{_();var n=g(`Einstellungen`);v(e,n)},$$slots:{default:!0}});var i=a(r,2);F(i,{});var o=a(i,2);A(o,{icon:`logout`,children:(e,t)=>{_();var n=g(`Abmelden`);v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}})}},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<AccountMenu name={args.name} label={args.label ?? 'Konto'} align={args.align}>
	<MenuItem icon="settings">Einstellungen</MenuItem>
	<MenuSeparator />
	<MenuItem icon="logout">Abmelden</MenuItem>
</AccountMenu>`}}});var S=a(x,2);B(S,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Navigation" title="AccountMenu">
	{#snippet lead()}
		Das Konto-Menü rechts im Kopf: der Avatar ist der Auslöser, darin Einstellungen, Sprache und
		Abmelden. Abgemeldet zeigt der Auslöser das Personen-Icon und das Menü Anmelden und
		Registrieren. Die Einträge gibt die App vor.
	{/snippet}

	<section>
		<h2>Zustände</h2>
		<Row label="Angemeldet">
			<AccountMenu name="Mia Schneider" label="Konto" align="start">
				<MenuItem icon="settings" onSelect={() => (lastAction = 'Einstellungen')}>
					Einstellungen
				</MenuItem>
				<MenuSeparator />
				<MenuRadioGroup label="Sprache" bind:value={locale}>
					<MenuRadioItem value="de"><span lang="de">Deutsch</span></MenuRadioItem>
					<MenuRadioItem value="en"><span lang="en">English</span></MenuRadioItem>
				</MenuRadioGroup>
				<MenuSeparator />
				<MenuItem icon="logout" onSelect={() => (lastAction = 'Abmelden')}>Abmelden</MenuItem>
			</AccountMenu>
		</Row>
		<Row label="Mit eigener Farbe">
			<AccountMenu name="Mia Schneider" label="Konto" swatch="#42C8C8" align="start">
				<MenuItem icon="logout">Abmelden</MenuItem>
			</AccountMenu>
		</Row>
		<Row label="Abgemeldet">
			<AccountMenu label="Konto" align="start">
				<MenuItem icon="login" onSelect={() => (lastAction = 'Anmelden')}>Anmelden</MenuItem>
				<MenuItem icon="person" onSelect={() => (lastAction = 'Registrieren')}>
					Registrieren
				</MenuItem>
				<MenuSeparator />
				<MenuRadioGroup label="Sprache" bind:value={locale}>
					<MenuRadioItem value="de"><span lang="de">Deutsch</span></MenuRadioItem>
					<MenuRadioItem value="en"><span lang="en">English</span></MenuRadioItem>
				</MenuRadioGroup>
			</AccountMenu>
		</Row>
		<Row label="Zuletzt">
			<span class="value">{lastAction} · Sprache {locale}</span>
		</Row>
	</section>

	<section>
		<h2>Barrierefreiheit</h2>
		<p class="section-intro">
			Der Auslöser heißt „Konto: Mia Schneider“ (abgemeldet nur „Konto“) und kündigt das Menü an.
			Die Trefferfläche ist 40px rund um den 32px-Avatar; der Fokusring folgt dem Kreis.
		</p>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Abmelden steht zuletzt, nach einem Trenner.',
				'Die Sprache als MenuRadioGroup mit Sprachnamen in ihrer eigenen Sprache.'
			]}
			donts={[
				'Keine Hauptaktionen der Seite ins Konto-Menü.',
				'Abmelden nicht als negative (rote) Aktion: es zerstört nichts.'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{E(e,{eyebrow:`Navigation`,title:`AccountMenu`,lead:e=>{_();var t=g(`Das Konto-Menü rechts im Kopf: der Avatar ist der Auslöser, darin Einstellungen, Sprache und
			Abmelden. Abgemeldet zeigt der Auslöser das Personen-Icon und das Menü Anmelden und
			Registrieren. Die Einträge gibt die App vor.`);v(e,t)},children:(e,r)=>{var o=J(),s=f(o),c=a(t(s),2);k(c,{label:`Angemeldet`,children:(e,t)=>{L(e,{name:`Mia Schneider`,label:`Konto`,align:`start`,children:(e,t)=>{var n=G(),r=f(n);A(r,{icon:`settings`,onSelect:()=>y(h,`Einstellungen`),children:(e,t)=>{_();var n=g(`Einstellungen`);v(e,n)},$$slots:{default:!0}});var i=a(r,2);F(i,{});var o=a(i,2);M(o,{label:`Sprache`,get value(){return l(m)},set value(e){y(m,e,!0)},children:(e,t)=>{var n=W(),r=f(n);N(r,{value:`de`,children:(e,t)=>{var n=H();v(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{value:`en`,children:(e,t)=>{var n=U();v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}});var s=a(o,2);F(s,{});var c=a(s,2);A(c,{icon:`logout`,onSelect:()=>y(h,`Abmelden`),children:(e,t)=>{_();var n=g(`Abmelden`);v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var d=a(c,2);k(d,{label:`Mit eigener Farbe`,children:(e,t)=>{L(e,{name:`Mia Schneider`,label:`Konto`,swatch:`#42C8C8`,align:`start`,children:(e,t)=>{A(e,{icon:`logout`,children:(e,t)=>{_();var n=g(`Abmelden`);v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}});var p=a(d,2);k(p,{label:`Abgemeldet`,children:(e,t)=>{L(e,{label:`Konto`,align:`start`,children:(e,t)=>{var n=K(),r=f(n);A(r,{icon:`login`,onSelect:()=>y(h,`Anmelden`),children:(e,t)=>{_();var n=g(`Anmelden`);v(e,n)},$$slots:{default:!0}});var i=a(r,2);A(i,{icon:`person`,onSelect:()=>y(h,`Registrieren`),children:(e,t)=>{_();var n=g(`Registrieren`);v(e,n)},$$slots:{default:!0}});var o=a(i,2);F(o,{});var s=a(o,2);M(s,{label:`Sprache`,get value(){return l(m)},set value(e){y(m,e,!0)},children:(e,t)=>{var n=W(),r=f(n);N(r,{value:`de`,children:(e,t)=>{var n=H();v(e,n)},$$slots:{default:!0}});var i=a(r,2);N(i,{value:`en`,children:(e,t)=>{var n=U();v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var b=a(p,2);k(b,{label:`Zuletzt`,children:(e,t)=>{var r=q(),a=i(r);n(()=>ee(a,`${l(h)??``} · Sprache ${l(m)??``}`)),v(e,r)},$$slots:{default:!0}}),u(s);var x=a(s,4),S=a(t(x),2);D(S,{dos:[`Abmelden steht zuletzt, nach einem Trenner.`,`Die Sprache als MenuRadioGroup mit Sprachnamen in ihrer eigenen Sprache.`],donts:[`Keine Hauptaktionen der Seite ins Konto-Menü.`,`Abmelden nicht als negative (rote) Aktion: es zerstört nichts.`]}),u(x),v(e,o)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),v(e,b),s()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{m(),b(),w(),T(),O(),te(),ne(),j(),P(),I(),h(),x(),z={title:`Navigation/AccountMenu`,component:L,tags:[`autodocs`],parameters:{layout:`padded`},args:{name:`Mia Schneider`,label:`Konto`,align:`start`}},{Story:B}=S(z),V=p(`<!> <!> <!>`,1),H=p(`<span lang="de">Deutsch</span>`),U=p(`<span lang="en">English</span>`),W=p(`<!> <!>`,1),G=p(`<!> <!> <!> <!> <!>`,1),K=p(`<!> <!> <!> <!>`,1),q=p(`<span class="value svelte-1n55fgo"> </span>`),J=p(`<section><h2>Zustände</h2> <!> <!> <!> <!></section> <section><h2>Barrierefreiheit</h2> <p class="section-intro">Der Auslöser heißt „Konto: Mia Schneider“ (abgemeldet nur „Konto“) und kündigt das Menü an.
				Die Trefferfläche ist 40px rund um den 32px-Avatar; der Fokusring folgt dem Kreis.</p></section> <section><h2>Richtlinien</h2> <!></section>`,1),R.__docgen={data:[],name:`AccountMenu.stories.svelte`},Y=C(R,z),X=[`Spielwiese`,`Übersicht`],Z={...Y.Spielwiese,tags:[`svelte-csf-v5`]},Q={...Y.Übersicht,tags:[`svelte-csf-v5`]}})))()}$();export{Z as Spielwiese,X as __namedExportsOrder,z as default,Q as Übersicht};