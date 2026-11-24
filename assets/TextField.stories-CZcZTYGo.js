import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Gt as n,Pt as r,Vt as i,Xt as a,Zt as o,bt as s,cn as c,fn as l,jt as u,lt as d,mn as f,n as p,o as m,sn as h,st as g,zt as _}from"./iframe-BsWRsydk.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-BWVMXit6.js";import{i as S,n as C,r as w,t as T}from"./Guidelines-B4Q9fRhg.js";import{n as E,t as D}from"./IconButton-DZwsdOXG.js";import{n as O,t as k}from"./TextField-CFfQIyHg.js";function A(e,d){o(d,!0);let f=i(!1),p=i(``),v=n(()=>s(p).length>0&&s(p).length<3?`Mindestens 3 Zeichen.`:void 0);var y=I(),b=u(y);M(b,{name:`Spielwiese`,template:(e,n=l)=>{var r=N(),i=t(r);k(i,m(n)),c(r),g(e,r)},$$slots:{template:!0},parameters:{__svelteCsf:{rawCode:`<div style="max-width: 24rem"><TextField {...args} /></div>`}}});var x=r(b,2);M(x,{name:`Übersicht`,asChild:!0,parameters:{layout:`fullscreen`,__svelteCsf:{rawCode:`<ComponentPage eyebrow="Primitives" title="TextField">
	{#snippet lead()}
		Eingabefeld mit sichtbarem Label, Hinweis und Fehlermeldung. Hinweis und Fehler sind über
		<code>aria-describedby</code> verknüpft; ein Platzhalter ersetzt nie das Label.
	{/snippet}

	<section>
		<h2>Zustände</h2>
		<div class="grid">
			<TextField label="Name des Raums" placeholder="z. B. Klasse 6b" />
			<TextField label="Name des Raums" hint="Sehen alle, die den Raum betreten." />
			<TextField label="Name des Raums" required hint="Pflichtfeld" />
			<TextField
				label="Raumcode"
				value="apfel-baum"
				error="Diesen Raum gibt es nicht. Prüfe die Schreibweise."
			/>
			<TextField label="Name des Raums" value="Klasse 6b" disabled />
			<TextField label="Passwort" type={showPassword ? 'text' : 'password'} value="geheim123">
				{#snippet end()}
					<IconButton
						size="s"
						icon={showPassword ? 'hide' : 'show'}
						label="Passwort anzeigen"
						pressed={showPassword}
						onclick={() => (showPassword = !showPassword)}
					/>
				{/snippet}
			</TextField>
		</div>
	</section>

	<section>
		<h2>Fehler beim Tippen</h2>
		<p class="section-intro">
			Die Meldung erscheint in einer höflichen Live-Region: Screenreader lesen sie vor, ohne zu
			unterbrechen. Der Text bleibt dunkel, das Rot tragen die Icon-Scheibe und der Rahmen.
		</p>
		<div class="grid">
			<TextField
				label="Dein Name"
				bind:value={name}
				error={nameError}
				hint="Tippe ein oder zwei Zeichen."
			/>
		</div>
	</section>

	<section data-theme="dark" class="dark-band">
		<h2>Auf dunklen Bereichen</h2>
		<div class="grid">
			<TextField label="Name des Raums" hint="Sehen alle, die den Raum betreten." />
			<TextField label="Raumcode" value="apfel-baum" error="Diesen Raum gibt es nicht." />
		</div>
	</section>

	<section>
		<h2>Richtlinien</h2>
		<Guidelines
			dos={[
				'Ein kurzes Label, das sagt, was hineingehört.',
				'Fehler sagen, wie es richtig geht: „Mindestens 3 Zeichen.“'
			]}
			donts={[
				'Kein Platzhalter als einziges Label.',
				'Keine rote Fehlerschrift; die Farbe gehört zur Icon-Scheibe.'
			]}
			notFor={[
				'Auswahl aus festen Werten: Select (Welle 2).',
				'Raumcode-Wörter: Combobox (Welle 2).'
			]}
		/>
	</section>
</ComponentPage>`}},children:(e,i)=>{w(e,{eyebrow:`Primitives`,title:`TextField`,lead:e=>{h();var t=P();h(2),g(e,t)},children:(e,i)=>{var a=F(),o=u(a),l=r(t(o),2),d=t(l);k(d,{label:`Name des Raums`,placeholder:`z. B. Klasse 6b`});var m=r(d,2);k(m,{label:`Name des Raums`,hint:`Sehen alle, die den Raum betreten.`});var h=r(m,2);k(h,{label:`Name des Raums`,required:!0,hint:`Pflichtfeld`});var y=r(h,2);k(y,{label:`Raumcode`,value:`apfel-baum`,error:`Diesen Raum gibt es nicht. Prüfe die Schreibweise.`});var b=r(y,2);k(b,{label:`Name des Raums`,value:`Klasse 6b`,disabled:!0});var x=r(b,2);{let e=e=>{{let t=n(()=>s(f)?`hide`:`show`);D(e,{size:`s`,get icon(){return s(t)},label:`Passwort anzeigen`,get pressed(){return s(f)},onclick:()=>_(f,!s(f))})}},t=n(()=>s(f)?`text`:`password`);k(x,{label:`Passwort`,get type(){return s(t)},value:`geheim123`,end:e,$$slots:{end:!0}})}c(l),c(o);var S=r(o,2),C=r(t(S),4),w=t(C);k(w,{label:`Dein Name`,get error(){return s(v)},hint:`Tippe ein oder zwei Zeichen.`,get value(){return s(p)},set value(e){_(p,e,!0)}}),c(C),c(S);var E=r(S,2),O=r(t(E),2),A=t(O);k(A,{label:`Name des Raums`,hint:`Sehen alle, die den Raum betreten.`});var j=r(A,2);k(j,{label:`Raumcode`,value:`apfel-baum`,error:`Diesen Raum gibt es nicht.`}),c(O),c(E);var M=r(E,2),N=r(t(M),2);T(N,{dos:[`Ein kurzes Label, das sagt, was hineingehört.`,`Fehler sagen, wie es richtig geht: „Mindestens 3 Zeichen.“`],donts:[`Kein Platzhalter als einziges Label.`,`Keine rote Fehlerschrift; die Farbe gehört zur Icon-Scheibe.`],notFor:[`Auswahl aus festen Werten: Select (Welle 2).`,`Raumcode-Wörter: Combobox (Welle 2).`]}),c(M),g(e,a)},$$slots:{lead:!0,default:!0}})},$$slots:{default:!0}}),g(e,y),a()}var j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{f(),v(),S(),C(),E(),O(),p(),y(),j={title:`Primitives/TextField`,component:k,tags:[`autodocs`],parameters:{layout:`padded`},args:{label:`Name des Raums`,hint:`Sehen alle, die den Raum betreten.`,value:``},argTypes:{type:{control:`select`,options:[`text`,`email`,`password`,`search`,`url`,`tel`,`number`]}}},{Story:M}=b(j),N=d(`<div style="max-width: 24rem"><!></div>`),P=d(`Eingabefeld mit sichtbarem Label, Hinweis und Fehlermeldung. Hinweis und Fehler sind über <code>aria-describedby</code> verknüpft; ein Platzhalter ersetzt nie das Label.`,1),F=d(`<section><h2>Zustände</h2> <div class="grid svelte-lmhyrk"><!> <!> <!> <!> <!> <!></div></section> <section><h2>Fehler beim Tippen</h2> <p class="section-intro">Die Meldung erscheint in einer höflichen Live-Region: Screenreader lesen sie vor, ohne zu
				unterbrechen. Der Text bleibt dunkel, das Rot tragen die Icon-Scheibe und der Rahmen.</p> <div class="grid svelte-lmhyrk"><!></div></section> <section data-theme="dark" class="dark-band svelte-lmhyrk"><h2>Auf dunklen Bereichen</h2> <div class="grid svelte-lmhyrk"><!> <!></div></section> <section><h2>Richtlinien</h2> <!></section>`,1),I=d(`<!> <!>`,1),A.__docgen={data:[],name:`TextField.stories.svelte`},L=x(A,j),R=[`Spielwiese`,`Übersicht`],z={...L.Spielwiese,tags:[`svelte-csf-v5`]},B={...L.Übersicht,tags:[`svelte-csf-v5`]}})))()}V();export{z as Spielwiese,R as __namedExportsOrder,j as default,B as Übersicht};