import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Dt as n,Nt as r,Pt as i,S as a,Vt as o,Xt as s,Zt as c,a as l,bt as u,cn as d,ct as f,et as p,fn as m,i as h,jt as g,lt as _,mn as v,n as y,o as b,pt as x,q as S,rt as C,sn as w,st as T,ut as E,y as ee,zt as D}from"./iframe-BsWRsydk.js";import{i as O,n as k,r as A,t as te}from"./create-runtime-stories-BWVMXit6.js";import{i as j,n as ne,r as M,t as N}from"./Guidelines-B4Q9fRhg.js";import{n as re,t as P}from"./MenuItem-i0frKsX6.js";import{i as ie,n as ae,r as oe,t as se}from"./MenuRadioItem-mnsUvDOZ.js";import{n as ce,t as F}from"./MenuSeparator-C76u0ste.js";import{n as le,t as I}from"./IconButton-DZwsdOXG.js";import{n as ue,t as L}from"./AccountMenu-BdcPRDyo.js";import{n as de,t as fe}from"./Badge-BIs29jtc.js";import{n as pe,t as R}from"./LocaleSwitcher-BxT__zV1.js";import{n as me,t as z}from"./SegmentedControl-CIk5WKUi.js";function B(e,o){c(o,!0);let u=e=>{var a=U(),s=g(a),c=t(s),l=e=>{var t=f(),n=g(t);p(n,()=>o.logo),T(e,t)},u=e=>{var t=H();T(e,t)};S(c,e=>{o.logo?e(l):e(u,-1)}),d(s);var m=i(s,2),h=r(m,!0);n(()=>C(h,o.title)),T(e,a)},_=h(o,`href`,3,`/`),v=h(o,`sticky`,3,!1),y=l(o,V);var b=ge();ee(b,()=>({class:`cui-app-header`,"data-theme":`dark`,"data-sticky":v()||void 0,"data-has-center":o.center?``:void 0,...y}),void 0,void 0,void 0,`svelte-4j9s4f`);var x=t(b),w=e=>{var t=W(),i=r(t,!0);n(()=>{a(t,`href`,o.skipLink.href),C(i,o.skipLink.label)}),T(e,t)};S(x,e=>{o.skipLink&&e(w)});var E=i(x,2),D=t(E),O=t(D),k=e=>{var n=he(),r=t(n);u(r),d(n),T(e,n)},A=e=>{var r=G(),i=t(r);u(i),d(r),n(()=>a(r,`href`,_())),T(e,r)};S(O,e=>{_()===null?e(k):e(A,-1)});var te=i(O,2);p(te,()=>o.start??m),d(D);var j=i(D,2),ne=e=>{var n=K(),r=t(n);p(r,()=>o.center),d(n),T(e,n)};S(j,e=>{o.center&&e(ne)});var M=i(j,2),N=t(M);p(N,()=>o.end??m),d(M),d(E),d(b),T(e,b),s()}var V,H,U,W,he,G,K,ge;function _e(){return(_e=e((()=>{v(),y(),V=new Set([`$$slots`,`$$events`,`$$legacy`,`title`,`href`,`logo`,`start`,`center`,`end`,`sticky`,`skipLink`]),H=E(`<svg viewBox="0 0 27 26" fill="currentColor"><path d="M24.83.52h-4.62c-.69 0-1.26.56-1.26 1.26v3.48A5.26 5.26 0 0 0 13.69 0c-2.9 0-5.26 2.36-5.26 5.26v5.78L2.19 15.72c-4.21 3.21-1.94 9.93 3.36 9.93H6.8c.53-3.87 1.74-8.66 4.19-11.56h5.71c2.49 2.94 3.55 7.67 4.06 11.56h1.77c1.96 0 3.56-1.59 3.56-3.56V1.78c0-.69-.56-1.26-1.26-1.26M11.67 3.37h4.34V6.3c0 .95-.77 1.71-1.71 1.71h-.91c-.95 0-1.71-.77-1.71-1.71V3.37zm-1.03 8.49 1.97-3.76 1.17 3.76zm3.24 0 1.18-3.79 1.96 3.79zm11.25-3.25h-5.22V2.18h5.22zM11.13 14.09v11.56h6.91c-2.79-2-5.07-7.24-6.91-11.56"></path></svg>`),U=_(`<span class="mark svelte-4j9s4f" aria-hidden="true"><!></span> <span class="title svelte-4j9s4f"> </span>`,1),W=_(`<a class="skip svelte-4j9s4f"> </a>`),he=_(`<span class="brand svelte-4j9s4f"><!></span>`),G=_(`<a class="brand svelte-4j9s4f"><!></a>`),K=_(`<div class="center svelte-4j9s4f"><!></div>`),ge=_(`<header><!> <div class="bar svelte-4j9s4f"><div class="start svelte-4j9s4f"><!> <!></div> <!> <div class="end svelte-4j9s4f"><!></div></div></header>`),B.__docgen={data:[{name:`title`,visibility:`public`,description:`Name of the app ("Calliope Campus"). Not the page title: that is the page's own h1.`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`href`,visibility:`public`,description:"Where the brand links to. `null` shows it without a link.",keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"/"`},{name:`logo`,visibility:`public`,description:`Own mark instead of the Calliope figure; drawn at 24px height in the text colour.`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`start`,visibility:`public`,description:`After the brand: room name, breadcrumb, a back link.`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`center`,visibility:`public`,description:`Centred whatever the sides hold, usually a SegmentedControl. Drops to its own row below 640px.`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`end`,visibility:`public`,description:`Actions, LocaleSwitcher, the user menu.`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`sticky`,visibility:`public`,description:`Stick to the top of the scrolling page (z-index header).`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`skipLink`,visibility:`public`,description:`First tab stop, visible on focus: jumps past the header to the main content.`,keywords:[],kind:`let`,type:{kind:`type`,type:`object`,text:`{ href: string; label: string; }`},static:!1,readonly:!1}],name:`AppHeader.svelte`}})))()}function ve(e,n){c(n,!0);let r=o(`de`),a=o(`dashboard`),l=o(`train`);var f=Z(),p=g(f);Y(p,{name:`Spielwiese`,template:(e,t=m)=>{B(e,b(t,{end:e=>{var t=Z(),n=g(t);R(n,{get locales(){return q},label:`Sprache`,get value(){return u(r)},set value(e){D(r,e,!0)}});var a=i(n,2);L(a,{name:`Mia Schneider`,label:`Konto`,children:(e,t)=>{var n=X(),r=g(n);P(r,{icon:`settings`,children:(e,t)=>{w();var n=x(`Einstellungen`);T(e,n)},$$slots:{default:!0}});var a=i(r,2);F(a,{});var o=i(a,2);P(o,{icon:`logout`,children:(e,t)=>{w();var n=x(`Abmelden`);T(e,n)},$$slots:{default:!0}}),T(e,n)},$$slots:{default:!0}}),T(e,t)},$$slots:{end:!0}}))},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<AppHeader {...args}>
	{#snippet end()}
		<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
		<AccountMenu name="Mia Schneider" label="Konto">
			<MenuItem icon="settings">Einstellungen</MenuItem>
			<MenuSeparator />
			<MenuItem icon="logout">Abmelden</MenuItem>
		</AccountMenu>
	{/snippet}
</AppHeader>`}}});var h=i(p,2);Y(h,{name:`Übersicht`,asChild:!0,children:(e,n)=>{M(e,{eyebrow:`Patterns`,title:`AppHeader`,lead:e=>{w();var t=ye();w(2),T(e,t)},children:(e,n)=>{var o=we(),s=g(o),c=i(t(s),4);B(t(c),{title:`Calliope Campus`,href:`#campus`,skipLink:{href:`#inhalt`,label:`Zum Inhalt springen`},end:e=>{var t=Z(),n=g(t);R(n,{get locales(){return q},label:`Sprache`,get value(){return u(r)},set value(e){D(r,e,!0)}});var a=i(n,2);L(a,{name:`Mia Schneider`,label:`Konto`,children:(e,t)=>{var n=X(),r=g(n);P(r,{icon:`settings`,children:(e,t)=>{w();var n=x(`Einstellungen`);T(e,n)},$$slots:{default:!0}});var a=i(r,2);F(a,{});var o=i(a,2);P(o,{icon:`logout`,children:(e,t)=>{w();var n=x(`Abmelden`);T(e,n)},$$slots:{default:!0}}),T(e,n)},$$slots:{default:!0}}),T(e,t)},$$slots:{end:!0}}),w(2),d(c),d(s);var f=i(s,2),p=i(t(f),4);B(t(p),{title:`Calliope Campus`,href:`#campus`,start:e=>{var t=be(),n=i(g(t),2);fe(n,{size:`s`,children:(e,t)=>{w();var n=x(`K7-PX2`);T(e,n)},$$slots:{default:!0}}),T(e,t)},center:e=>{z(e,{label:`Ansicht`,size:`s`,options:[{value:`dashboard`,label:`Dashboard`,icon:`device`},{value:`feeds`,label:`Feeds`,icon:`wifi`}],get value(){return u(a)},set value(e){D(a,e,!0)}})},end:e=>{var t=Z(),n=g(t);I(n,{icon:`help`,label:`Hilfe`});var r=i(n,2);L(r,{name:`Mia Schneider`,label:`Konto`,children:(e,t)=>{P(e,{icon:`logout`,children:(e,t)=>{w();var n=x(`Abmelden`);T(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),T(e,t)},$$slots:{start:!0,center:!0,end:!0}}),d(p),d(f);var m=i(f,2),h=i(t(m),2);B(t(h),{title:`Calliope Campus`,href:`#campus`,end:e=>{L(e,{label:`Konto`,children:(e,t)=>{var n=Ce(),a=g(n);P(a,{icon:`login`,children:(e,t)=>{w();var n=x(`Anmelden`);T(e,n)},$$slots:{default:!0}});var o=i(a,2);P(o,{icon:`person`,children:(e,t)=>{w();var n=x(`Registrieren`);T(e,n)},$$slots:{default:!0}});var s=i(o,2);F(s,{});var c=i(s,2);oe(c,{label:`Sprache`,get value(){return u(r)},set value(e){D(r,e,!0)},children:(e,t)=>{var n=Z(),r=g(n);se(r,{value:`de`,children:(e,t)=>{var n=xe();T(e,n)},$$slots:{default:!0}});var a=i(r,2);se(a,{value:`en`,children:(e,t)=>{var n=Se();T(e,n)},$$slots:{default:!0}}),T(e,n)},$$slots:{default:!0}}),T(e,n)},$$slots:{default:!0}})},$$slots:{end:!0}}),d(h),d(m);var _=i(m,2),v=i(t(_),4),y=t(v);B(t(y),{title:`Calliope Docs`,href:`#docs`,end:e=>{var t=Z(),n=g(t);I(n,{icon:`search`,label:`Suchen`});var a=i(n,2);R(a,{get locales(){return q},label:`Sprache`,get value(){return u(r)},set value(e){D(r,e,!0)}}),T(e,t)},$$slots:{end:!0}}),d(y);var b=i(y,2);B(t(b),{title:`Teachable`,href:`#teachable`,center:e=>{z(e,{label:`Schritt`,size:`s`,options:[{value:`train`,label:`Trainieren`},{value:`use`,label:`Anwenden`},{value:`code`,label:`Programmieren`}],get value(){return u(l)},set value(e){D(l,e,!0)}})},end:e=>{R(e,{get locales(){return q},label:`Sprache`,get value(){return u(r)},set value(e){D(r,e,!0)}})},$$slots:{center:!0,end:!0}}),d(b),d(v),d(_);var S=i(_,2),C=i(t(S),4);B(t(C),{title:`Calliope Campus`,href:`#campus`,center:e=>{z(e,{label:`Ansicht`,size:`s`,options:[{value:`dashboard`,label:`Dashboard`},{value:`feeds`,label:`Feeds`}],get value(){return u(a)},set value(e){D(a,e,!0)}})},end:e=>{var t=Z(),n=g(t);R(n,{get locales(){return q},label:`Sprache`,get value(){return u(r)},set value(e){D(r,e,!0)}});var a=i(n,2);L(a,{name:`Mia Schneider`,label:`Konto`,children:(e,t)=>{P(e,{icon:`logout`,children:(e,t)=>{w();var n=x(`Abmelden`);T(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),T(e,t)},$$slots:{center:!0,end:!0}}),d(C),d(S);var E=i(S,2),ee=i(t(E),2);N(ee,{dos:[`Einmal pro Seite, ganz oben; sticky, wenn die Seite lang scrollt.`,`skipLink setzen und das Ziel (main) mit tabindex="-1" fokussierbar machen.`,`Rechts höchstens drei Dinge: eine Aktion, Sprache, Konto.`],donts:[`Den App-Namen nicht als h1: die h1 ist der Titel der Seite.`,`Kein eigenes Grau: das Band ist immer surface.default im dunklen Thema.`],notFor:[`Leiste über einem Editor mit Programmname und Werkzeugen: Toolbar im Inhalt.`]}),d(E),T(e,o)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<ComponentPage eyebrow="Patterns" title="AppHeader">
	{#snippet lead()}
		Der Kopf jeder Calliope-App: ein dunkles Band mit Marke links, Werkzeugen in der Mitte und
		Konto rechts. Ersetzt <code>BrandedHeader</code> in Campus und ist die Vorlage für calliope-docs
		und Teachable. Der App-Name ist Link zur Startseite, aber keine Überschrift: die h1 gehört der Seite.
	{/snippet}

	<section>
		<h2>Campus, angemeldet</h2>
		<p class="section-intro">
			Rechts die Sprache und das Konto-Menü. Der erste Tab-Stopp ist der Link „Zum Inhalt
			springen“, sichtbar erst mit Fokus.
		</p>
		<div class="frame">
			<AppHeader
				title="Calliope Campus"
				href="#campus"
				skipLink={{ href: '#inhalt', label: 'Zum Inhalt springen' }}
			>
				{#snippet end()}
					<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
					<AccountMenu name="Mia Schneider" label="Konto">
						<MenuItem icon="settings">Einstellungen</MenuItem>
						<MenuSeparator />
						<MenuItem icon="logout">Abmelden</MenuItem>
					</AccountMenu>
				{/snippet}
			</AppHeader>
			<div class="content" id="inhalt" tabindex="-1"><h1>Meine Räume</h1></div>
		</div>
	</section>

	<section>
		<h2>Im Raum, mit Ansichtswechsel</h2>
		<p class="section-intro">
			<code>start</code> trägt den Raum, <code>center</code> den Wechsel, der immer mittig bleibt, wie
			lang die Seiten auch sind. Unter 640px rutscht die Mitte in eine eigene Zeile.
		</p>
		<div class="frame">
			<AppHeader title="Calliope Campus" href="#campus">
				{#snippet start()}
					<span class="room">Klimaprojekt 7b</span>
					<Badge size="s">K7-PX2</Badge>
				{/snippet}
				{#snippet center()}
					<SegmentedControl
						label="Ansicht"
						size="s"
						options={[
							{ value: 'dashboard', label: 'Dashboard', icon: 'device' },
							{ value: 'feeds', label: 'Feeds', icon: 'wifi' }
						]}
						bind:value={view}
					/>
				{/snippet}
				{#snippet end()}
					<IconButton icon="help" label="Hilfe" />
					<AccountMenu name="Mia Schneider" label="Konto">
						<MenuItem icon="logout">Abmelden</MenuItem>
					</AccountMenu>
				{/snippet}
			</AppHeader>
		</div>
	</section>

	<section>
		<h2>Abgemeldet, Sprache im Konto-Menü</h2>
		<div class="frame">
			<AppHeader title="Calliope Campus" href="#campus">
				{#snippet end()}
					<AccountMenu label="Konto">
						<MenuItem icon="login">Anmelden</MenuItem>
						<MenuItem icon="person">Registrieren</MenuItem>
						<MenuSeparator />
						<MenuRadioGroup label="Sprache" bind:value={locale}>
							<MenuRadioItem value="de"><span lang="de">Deutsch</span></MenuRadioItem>
							<MenuRadioItem value="en"><span lang="en">English</span></MenuRadioItem>
						</MenuRadioGroup>
					</AccountMenu>
				{/snippet}
			</AppHeader>
		</div>
	</section>

	<section>
		<h2>Andere Apps</h2>
		<p class="section-intro">
			Gleicher Kopf, anderer Name. Eine eigene Marke kommt über <code>logo</code>.
		</p>
		<div class="stack">
			<div class="frame">
				<AppHeader title="Calliope Docs" href="#docs">
					{#snippet end()}
						<IconButton icon="search" label="Suchen" />
						<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
					{/snippet}
				</AppHeader>
			</div>
			<div class="frame">
				<AppHeader title="Teachable" href="#teachable">
					{#snippet center()}
						<SegmentedControl
							label="Schritt"
							size="s"
							options={[
								{ value: 'train', label: 'Trainieren' },
								{ value: 'use', label: 'Anwenden' },
								{ value: 'code', label: 'Programmieren' }
							]}
							bind:value={mode}
						/>
					{/snippet}
					{#snippet end()}
						<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
					{/snippet}
				</AppHeader>
			</div>
		</div>
	</section>

	<section>
		<h2>Schmal</h2>
		<p class="section-intro">
			Unter 480px bleibt vom Namen nur die Marke sichtbar; vorgelesen wird er weiter.
		</p>
		<div class="frame narrow">
			<AppHeader title="Calliope Campus" href="#campus">
				{#snippet center()}
					<SegmentedControl
						label="Ansicht"
						size="s"
						options={[
							{ value: 'dashboard', label: 'Dashboard' },
							{ value: 'feeds', label: 'Feeds' }
						]}
						bind:value={view}
					/>
				{/snippet}
				{#snippet end()}
					<LocaleSwitcher {locales} label="Sprache" bind:value={locale} />
					<AccountMenu name="Mia Schneider" label="Konto">
						<MenuItem icon="logout">Abmelden</MenuItem>
					</AccountMenu>
				{/snippet}
			</AppHeader>
		</div>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Einmal pro Seite, ganz oben; sticky, wenn die Seite lang scrollt.',
				'skipLink setzen und das Ziel (main) mit tabindex="-1" fokussierbar machen.',
				'Rechts höchstens drei Dinge: eine Aktion, Sprache, Konto.'
			]}
			donts={[
				'Den App-Namen nicht als h1: die h1 ist der Titel der Seite.',
				'Kein eigenes Grau: das Band ist immer surface.default im dunklen Thema.'
			]}
			notFor={['Leiste über einem Editor mit Programmname und Werkzeugen: Toolbar im Inhalt.']}
		/>
	</section>
</ComponentPage>`}}}),T(e,f),s()}var q,J,Y,X,Z,ye,be,xe,Se,Ce,we,Q,Te,Ee,De;function $(){return($=e((()=>{v(),O(),j(),ne(),ue(),de(),le(),pe(),re(),ie(),ae(),ce(),me(),_e(),y(),k(),q=[{code:`de`,name:`Deutsch`},{code:`en`,name:`English`}],J={title:`Patterns/AppHeader`,component:B,tags:[`autodocs`],parameters:{layout:`fullscreen`},args:{title:`Calliope Campus`,href:`#`,sticky:!1}},{Story:Y}=A(J),X=_(`<!> <!> <!>`,1),Z=_(`<!> <!>`,1),ye=_(`Der Kopf jeder Calliope-App: ein dunkles Band mit Marke links, Werkzeugen in der Mitte und
			Konto rechts. Ersetzt <code>BrandedHeader</code> in Campus und ist die Vorlage für calliope-docs
			und Teachable. Der App-Name ist Link zur Startseite, aber keine Überschrift: die h1 gehört der Seite.`,1),be=_(`<span class="room svelte-nyi5cg">Klimaprojekt 7b</span> <!>`,1),xe=_(`<span lang="de">Deutsch</span>`),Se=_(`<span lang="en">English</span>`),Ce=_(`<!> <!> <!> <!>`,1),we=_(`<section><h2>Campus, angemeldet</h2> <p class="section-intro">Rechts die Sprache und das Konto-Menü. Der erste Tab-Stopp ist der Link „Zum Inhalt
				springen“, sichtbar erst mit Fokus.</p> <div class="frame svelte-nyi5cg"><!> <div class="content svelte-nyi5cg" id="inhalt" tabindex="-1"><h1 class="svelte-nyi5cg">Meine Räume</h1></div></div></section> <section><h2>Im Raum, mit Ansichtswechsel</h2> <p class="section-intro"><code>start</code> trägt den Raum, <code>center</code> den Wechsel, der immer mittig bleibt, wie
				lang die Seiten auch sind. Unter 640px rutscht die Mitte in eine eigene Zeile.</p> <div class="frame svelte-nyi5cg"><!></div></section> <section><h2>Abgemeldet, Sprache im Konto-Menü</h2> <div class="frame svelte-nyi5cg"><!></div></section> <section><h2>Andere Apps</h2> <p class="section-intro">Gleicher Kopf, anderer Name. Eine eigene Marke kommt über <code>logo</code>.</p> <div class="stack svelte-nyi5cg"><div class="frame svelte-nyi5cg"><!></div> <div class="frame svelte-nyi5cg"><!></div></div></section> <section><h2>Schmal</h2> <p class="section-intro">Unter 480px bleibt vom Namen nur die Marke sichtbar; vorgelesen wird er weiter.</p> <div class="frame narrow svelte-nyi5cg"><!></div></section> <section><h2>Richtlinien</h2> <!></section>`,1),ve.__docgen={data:[],name:`AppHeader.stories.svelte`},Q=te(ve,J),Te=[`Spielwiese`,`Übersicht`],Ee={...Q.Spielwiese,tags:[`svelte-csf-v5`]},De={...Q.Übersicht,tags:[`svelte-csf-v5`]}})))()}$();export{Ee as Spielwiese,Te as __namedExportsOrder,J as default,De as Übersicht};