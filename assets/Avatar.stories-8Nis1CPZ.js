import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Pt as n,Xt as r,Zt as i,cn as a,jt as o,lt as s,mn as c,n as l,sn as u,st as d}from"./iframe-BsWRsydk.js";import{i as f,n as p,r as m,t as h}from"./create-runtime-stories-BWVMXit6.js";import{i as g,n as _,r as v,t as y}from"./Guidelines-B4Q9fRhg.js";import{n as b,t as x}from"./Row-DwZNmfYl.js";import{n as S,t as C}from"./Avatar-BXpONL89.js";import{n as w,t as T}from"./StatusDot-BwTRw03i.js";function E(e,s){i(s,!0);var c=j(),l=o(c);k(l,{name:`Spielwiese`,parameters:{__svelteCsf:{rawCode:`<Avatar {...args} />`}}});var f=n(l,2);k(f,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="Avatar">
	{#snippet lead()}
		Bild oder Initialen einer Person. Die Fläche ist für alle gleich neutral: Farbe trägt in
		Calliope Status und Identität, nicht die Unterscheidung von Personen. Ersetzt <code
			>UserAvatar</code
		> mit seinen Zufallsfarben.
	{/snippet}

	<section>
		<h2>Größen</h2>
		<Row label="s · 24px">
			<Avatar name="Mia Schneider" size="s" />
			<Avatar name="Ada" size="s" />
		</Row>
		<Row label="m · 32px">
			<Avatar name="Mia Schneider" size="m" />
			<Avatar name="Ada" size="m" />
		</Row>
		<Row label="l · 40px">
			<Avatar name="Mia Schneider" size="l" />
			<Avatar name="Ada" size="l" />
		</Row>
		<Row label="xl · 64px">
			<Avatar name="Mia Schneider" size="xl" />
			<Avatar name="Ada" size="xl" />
		</Row>
	</section>

	<section>
		<h2>Inhalt</h2>
		<Row label="Initialen">
			<Avatar name="Mia Schneider" />
			<Avatar name="Özlem Çelik" />
			<Avatar name="Lena Marie von Berg" />
		</Row>
		<Row label="Bild">
			<Avatar name="Mia Schneider" src={picture} />
			<Avatar name="Mia Schneider" src={picture} size="xl" />
		</Row>
		<Row label="Bild lädt nicht">
			<Avatar name="Mia Schneider" src="/gibt-es-nicht.png" />
		</Row>
		<Row label="Ohne Namen">
			<Avatar />
			<Avatar size="xl" />
		</Row>
	</section>

	<section>
		<h2>Eigene Farbe als Ring</h2>
		<p class="section-intro">
			Wo eine Person schon eine Farbe hat (Cursor im gemeinsamen Editor), zeigt <code>swatch</code
			> sie als 2px-Ring. Die Fläche bleibt neutral, der Name steht daneben.
		</p>
		<div class="people">
			<span class="person"
				><Avatar name="Mia Schneider" swatch="#42C8C8" decorative />Mia Schneider</span
			>
			<span class="person"
				><Avatar name="Ada Lovelace" swatch="#E4007E" decorative />Ada Lovelace</span
			>
			<span class="person"
				><Avatar name="Max Planck" swatch="#F8C526" decorative />Max Planck</span
			>
		</div>
	</section>

	<section>
		<h2>In einer Teilnehmerliste</h2>
		<p class="section-intro">
			Name steht daneben, also <code>decorative</code>. Der Status kommt als StatusDot mit Wort,
			nie als Farbe oder Transparenz des Avatars.
		</p>
		<ul class="list">
			<li>
				<Avatar name="Mia Schneider" decorative /><span class="name">Mia Schneider</span>
				<StatusDot status="success" label="Online" />
			</li>
			<li>
				<Avatar name="Ada Lovelace" decorative /><span class="name">Ada Lovelace</span>
				<StatusDot status="warning" label="Wartet" />
			</li>
			<li>
				<Avatar name="Max Planck" decorative /><span class="name">Max Planck</span>
				<StatusDot status="neutral" label="Offline" />
			</li>
		</ul>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<div class="people">
			<Avatar name="Mia Schneider" />
			<Avatar name="Ada" swatch="#42C8C8" />
			<Avatar />
			<Avatar name="Mia Schneider" src={picture} />
		</div>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'name immer setzen, wenn es eine Person gibt: daraus kommen Initialen und Name für Screenreader.',
				'decorative, wenn der Name direkt daneben steht.',
				'Status und Rolle als Wort daneben (StatusDot, Badge).'
			]}
			donts={[
				'Keine Zufallsfarben als Fläche: neue Farbtöne außerhalb der Palette.',
				'Keinen Status über Transparenz oder Graustufen des Avatars zeigen.'
			]}
			notFor={['Konto-Menü im Kopf: AccountMenu (Avatar als Auslöser).']}
		/>
	</section>
</ComponentPage>`}},children:(e,r)=>{v(e,{eyebrow:`Primitives`,title:`Avatar`,lead:e=>{u();var t=A();u(2),d(e,t)},children:(e,r)=>{var i=N(),s=o(i),c=n(t(s),2);x(c,{label:`s · 24px`,children:(e,t)=>{var r=j(),i=o(r);C(i,{name:`Mia Schneider`,size:`s`});var a=n(i,2);C(a,{name:`Ada`,size:`s`}),d(e,r)},$$slots:{default:!0}});var l=n(c,2);x(l,{label:`m · 32px`,children:(e,t)=>{var r=j(),i=o(r);C(i,{name:`Mia Schneider`,size:`m`});var a=n(i,2);C(a,{name:`Ada`,size:`m`}),d(e,r)},$$slots:{default:!0}});var f=n(l,2);x(f,{label:`l · 40px`,children:(e,t)=>{var r=j(),i=o(r);C(i,{name:`Mia Schneider`,size:`l`});var a=n(i,2);C(a,{name:`Ada`,size:`l`}),d(e,r)},$$slots:{default:!0}});var p=n(f,2);x(p,{label:`xl · 64px`,children:(e,t)=>{var r=j(),i=o(r);C(i,{name:`Mia Schneider`,size:`xl`});var a=n(i,2);C(a,{name:`Ada`,size:`xl`}),d(e,r)},$$slots:{default:!0}}),a(s);var m=n(s,2),h=n(t(m),2);x(h,{label:`Initialen`,children:(e,t)=>{var r=M(),i=o(r);C(i,{name:`Mia Schneider`});var a=n(i,2);C(a,{name:`Özlem Çelik`});var s=n(a,2);C(s,{name:`Lena Marie von Berg`}),d(e,r)},$$slots:{default:!0}});var g=n(h,2);x(g,{label:`Bild`,children:(e,t)=>{var r=j(),i=o(r);C(i,{name:`Mia Schneider`,get src(){return D}});var a=n(i,2);C(a,{name:`Mia Schneider`,get src(){return D},size:`xl`}),d(e,r)},$$slots:{default:!0}});var _=n(g,2);x(_,{label:`Bild lädt nicht`,children:(e,t)=>{C(e,{name:`Mia Schneider`,src:`/gibt-es-nicht.png`})},$$slots:{default:!0}});var v=n(_,2);x(v,{label:`Ohne Namen`,children:(e,t)=>{var r=j(),i=o(r);C(i,{});var a=n(i,2);C(a,{size:`xl`}),d(e,r)},$$slots:{default:!0}}),a(m);var b=n(m,2),S=n(t(b),4),w=t(S),E=t(w);C(E,{name:`Mia Schneider`,swatch:`#42C8C8`,decorative:!0}),u(),a(w);var O=n(w,2),k=t(O);C(k,{name:`Ada Lovelace`,swatch:`#E4007E`,decorative:!0}),u(),a(O);var A=n(O,2),P=t(A);C(P,{name:`Max Planck`,swatch:`#F8C526`,decorative:!0}),u(),a(A),a(S),a(b);var F=n(b,2),I=n(t(F),4),L=t(I),R=t(L);C(R,{name:`Mia Schneider`,decorative:!0});var z=n(R,3);T(z,{status:`success`,label:`Online`}),a(L);var B=n(L,2),V=t(B);C(V,{name:`Ada Lovelace`,decorative:!0});var H=n(V,3);T(H,{status:`warning`,label:`Wartet`}),a(B);var U=n(B,2),W=t(U);C(W,{name:`Max Planck`,decorative:!0});var G=n(W,3);T(G,{status:`neutral`,label:`Offline`}),a(U),a(I),a(F);var K=n(F,2),q=n(t(K),2),J=t(q);C(J,{name:`Mia Schneider`});var Y=n(J,2);C(Y,{name:`Ada`,swatch:`#42C8C8`});var X=n(Y,2);C(X,{});var Z=n(X,2);C(Z,{name:`Mia Schneider`,get src(){return D}}),a(q),a(K);var Q=n(K,2),$=n(t(Q),2);y($,{dos:[`name immer setzen, wenn es eine Person gibt: daraus kommen Initialen und Name für Screenreader.`,`decorative, wenn der Name direkt daneben steht.`,`Status und Rolle als Wort daneben (StatusDot, Badge).`],donts:[`Keine Zufallsfarben als Fläche: neue Farbtöne außerhalb der Palette.`,`Keinen Status über Transparenz oder Graustufen des Avatars zeigen.`],notFor:[`Konto-Menü im Kopf: AccountMenu (Avatar als Auslöser).`]}),a(Q),d(e,i)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),d(e,c),r()}var D,O,k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{c(),f(),g(),_(),b(),w(),S(),l(),p(),D=`data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%2342C8C8%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2226%22%20r%3D%2212%22%20fill%3D%22%231B1C1D%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%2242%22%20width%3D%2240%22%20height%3D%2230%22%20rx%3D%2215%22%20fill%3D%22%231B1C1D%22%2F%3E%3C%2Fsvg%3E`,O={title:`Primitives/Avatar`,component:C,tags:[`autodocs`],parameters:{layout:`padded`},args:{name:`Mia Schneider`,size:`l`,decorative:!1},argTypes:{size:{control:`inline-radio`,options:[`s`,`m`,`l`,`xl`]},swatch:{control:`color`}}},{Story:k}=m(O),A=s(`Bild oder Initialen einer Person. Die Fläche ist für alle gleich neutral: Farbe trägt in
			Calliope Status und Identität, nicht die Unterscheidung von Personen. Ersetzt <code>UserAvatar</code> mit seinen Zufallsfarben.`,1),j=s(`<!> <!>`,1),M=s(`<!> <!> <!>`,1),N=s(`<section><h2>Größen</h2> <!> <!> <!> <!></section> <section><h2>Inhalt</h2> <!> <!> <!> <!></section> <section><h2>Eigene Farbe als Ring</h2> <p class="section-intro">Wo eine Person schon eine Farbe hat (Cursor im gemeinsamen Editor), zeigt <code>swatch</code> sie als 2px-Ring. Die Fläche bleibt neutral, der Name steht daneben.</p> <div class="people svelte-fb6o5c"><span class="person svelte-fb6o5c"><!>Mia Schneider</span> <span class="person svelte-fb6o5c"><!>Ada Lovelace</span> <span class="person svelte-fb6o5c"><!>Max Planck</span></div></section> <section><h2>In einer Teilnehmerliste</h2> <p class="section-intro">Name steht daneben, also <code>decorative</code>. Der Status kommt als StatusDot mit Wort,
				nie als Farbe oder Transparenz des Avatars.</p> <ul class="list svelte-fb6o5c"><li class="svelte-fb6o5c"><!><span class="name svelte-fb6o5c">Mia Schneider</span> <!></li> <li class="svelte-fb6o5c"><!><span class="name svelte-fb6o5c">Ada Lovelace</span> <!></li> <li class="svelte-fb6o5c"><!><span class="name svelte-fb6o5c">Max Planck</span> <!></li></ul></section> <section data-theme="dark" class="dark-band svelte-fb6o5c"><h2>Auf dunklen Bereichen</h2> <div class="people svelte-fb6o5c"><!> <!> <!> <!></div></section> <section><h2>Richtlinien</h2> <!></section>`,1),E.__docgen={data:[],name:`Avatar.stories.svelte`},P=h(E,O),F=[`Spielwiese`,`Übersicht`],I={...P.Spielwiese,tags:[`svelte-csf-v5`]},L={...P.Übersicht,tags:[`svelte-csf-v5`]}})))()}R();export{I as Spielwiese,F as __namedExportsOrder,O as default,L as Übersicht};