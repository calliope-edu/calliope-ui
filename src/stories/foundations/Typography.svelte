<script lang="ts">
	import { tokens, type TokenName } from '#lib/tokens/index.js';

	type TextStyle = {
		/** Token group: --cui-typography-<id>-* */
		id: string;
		use: string;
		sample: string;
		uppercase?: boolean;
		tabular?: boolean;
	};

	// Text styles from typography.tokens.json (DESIGN.md, Typography).
	const scale: TextStyle[] = [
		{ id: 'display', use: 'Einstiegsseiten, einmal pro Seite', sample: 'Programmieren lernen' },
		{ id: 'h1', use: 'Seitentitel', sample: 'Meine Projekte' },
		{ id: 'h2', use: 'Abschnitt, Dialogtitel', sample: 'Neues Projekt anlegen' },
		{ id: 'h3', use: 'Titel von Panels und Karten', sample: 'Lauflicht mit dem Calliope mini' },
		{ id: 'subtitle', use: 'Abschnittslabel', sample: 'Zuletzt bearbeitet', uppercase: true },
		{
			id: 'body',
			use: 'Standardtext',
			sample:
				'Verbinde den Calliope mini per USB oder Bluetooth und übertrage dein Programm mit einem Klick.'
		},
		{
			id: 'prose',
			use: 'Fließtext über mehrere Zeilen',
			sample:
				'Der Calliope mini misst Licht, Temperatur und Bewegung. Mit wenigen Blöcken wird daraus eine Wetterstation, die ihre Werte ins Klassenzimmer funkt.'
		},
		{ id: 'label', use: 'Formularlabels, Menüeinträge', sample: 'Name des Projekts' },
		{
			id: 'caption',
			use: 'Badges, Zeitstempel (nicht für Text auf Distanz)',
			sample: 'Vor 5 Minuten'
		},
		{ id: 'action', use: 'Button-Beschriftung (Größe m)', sample: 'Übertragen', uppercase: true },
		{ id: 'readout', use: 'Live-Messwerte (IoT)', sample: '23,4 °C', tabular: true },
		{ id: 'code', use: 'Code, serielle Ausgabe, Raumcodes', sample: 'basic.showString("Hallo")' }
	];

	const value = (id: string, prop: string) =>
		String(tokens[`typography-${id}-${prop}` as TokenName] ?? '');

	/** "1.5rem" → "24 px"; fluid sizes stay as written. */
	function px(size: string): string {
		const rem = /^([\d.]+)rem$/.exec(size);
		return rem ? `${Number(rem[1]) * 16} px` : size.replace(/\./g, ',');
	}

	const numbers = (id: string) =>
		[
			px(value(id, 'font-size')),
			value(id, 'font-weight'),
			`Zeilenhöhe ${value(id, 'line-height').replace('.', ',')}`
		].join(' · ');

	const weights = [
		{ token: 'regular', label: 'Regular' },
		{ token: 'medium', label: 'Medium' },
		{ token: 'semibold', label: 'SemiBold' },
		{ token: 'bold', label: 'Bold' }
	].map((w) => ({ ...w, value: String(tokens[`font-weight-${w.token}` as TokenName]) }));

	const families = [
		{
			id: 'sans',
			name: 'Roboto (bisher)',
			note: 'So sahen Überschriften und Buttons bis jetzt aus.'
		},
		{
			id: 'condensed',
			name: 'Roboto Condensed (jetzt)',
			note: 'Aus dem Entwurf Calliope_UX_UI, für Überschriften und Buttons.'
		}
	];

	let beamer = $state(false);
</script>

<article class="page">
	<header class="intro">
		<p class="eyebrow">Foundations</p>
		<h1>Typografie</h1>
		<p class="lead">
			Roboto ist die Grundschrift für Text. Überschriften und Button-Beschriftungen stehen in Roboto
			Condensed (<code>--cui-font-family-condensed</code>). Jeder Textstil steht als Gruppe von
			Tokens bereit, zum Beispiel <code>--cui-typography-h1-font-size</code>. Die Bausteine darunter
			heißen <code>--cui-font-size-*</code>, <code>--cui-font-weight-*</code> und
			<code>--cui-font-line-height-*</code>.
		</p>
	</header>

	<section aria-labelledby="scale">
		<h2 id="scale">Skala</h2>
		<ul class="scale">
			{#each scale as style (style.id)}
				<li class="step">
					<div class="spec">
						<p class="style-name">{style.id}</p>
						<p>{style.use}</p>
						<p class="numbers">{numbers(style.id)}</p>
						<code>--cui-typography-{style.id}-*</code>
					</div>
					<p
						class="specimen"
						class:uppercase={style.uppercase}
						class:tabular={style.tabular}
						style:font-family="var(--cui-typography-{style.id}-font-family)"
						style:font-size="var(--cui-typography-{style.id}-font-size)"
						style:font-weight="var(--cui-typography-{style.id}-font-weight)"
						style:line-height="var(--cui-typography-{style.id}-line-height)"
						style:letter-spacing="var(--cui-typography-{style.id}-letter-spacing)"
					>
						{style.sample}
					</p>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="weights">
		<h2 id="weights">Schriftschnitte</h2>
		<ul class="weights">
			{#each weights as weight (weight.token)}
				<li>
					<p class="weight-sample" style:font-weight="var(--cui-font-weight-{weight.token})">Aa</p>
					<p class="style-name">{weight.label}</p>
					<p class="numbers">{weight.value}</p>
					<code>--cui-font-weight-{weight.token}</code>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="condensed">
		<h2 id="condensed">Roboto Condensed für Überschriften und Buttons</h2>
		<p class="section-intro">
			Überschriften (display bis h3) und alle Button-Beschriftungen stehen in Roboto Condensed, wie
			im Entwurf. Größe und Gewicht bleiben gleich, die Schrift läuft nur schmaler. So passen lange
			deutsche Wörter besser in Buttons und Titel. Zum Vergleich stehen hier beide Schriften
			nebeneinander. Die Beamer-Ansicht vergrößert alles auf das 1,5-Fache, um die Lesbarkeit aus
			der Ferne einzuschätzen.
		</p>
		<label class="toggle">
			<input type="checkbox" bind:checked={beamer} />
			Beamer-Ansicht
		</label>

		<div class="compare" class:beamer>
			{#each families as family (family.id)}
				<div class="column" style:--family="var(--cui-font-family-{family.id})">
					<p class="family-name">{family.name}</p>
					<p class="family-note">{family.note}</p>
					<p class="c-h1">Meine Projekte</p>
					<p class="c-h2">Neues Projekt anlegen</p>
					<p class="c-h3">Lauflicht mit dem Calliope mini</p>
					<div class="c-buttons">
						<span class="c-button c-button-l">Herunterladen</span>
						<span class="c-button c-button-m">Übertragen</span>
						<span class="c-button c-button-s">Teilen</span>
					</div>
					<p class="c-body">
						Fließtext bleibt in beiden Varianten in Roboto, nur Überschriften und Buttons wechseln.
					</p>
				</div>
			{/each}
		</div>
	</section>
</article>

<style>
	.page {
		max-width: 72rem;
		margin: 0 auto;
		padding: 3rem 2rem 4rem;
		font-family: var(--cui-font-family-sans);
		color: var(--cui-text-default);
	}

	p {
		margin: 0;
	}

	.eyebrow {
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0.25rem 0 1rem;
		font-family: var(--cui-typography-display-font-family);
		font-size: var(--cui-font-size-display);
		font-weight: var(--cui-font-weight-bold);
		line-height: var(--cui-typography-display-line-height);
		letter-spacing: -0.01em;
	}

	.lead {
		max-width: 46rem;
		font-size: 1.125rem;
		line-height: 1.5;
	}

	section {
		margin-top: 4rem;
	}

	h2 {
		margin: 0 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--cui-brand-strong);
		font-family: var(--cui-typography-h1-font-family);
		font-size: var(--cui-font-size-2xl);
		font-weight: var(--cui-font-weight-semibold);
		line-height: var(--cui-font-line-height-tight);
	}

	.section-intro {
		max-width: 46rem;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	code {
		font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
		font-size: 0.8125rem;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.step {
		display: grid;
		grid-template-columns: 15rem 1fr;
		gap: 2rem;
		align-items: start;
		padding: 1.25rem 0;
		border-bottom: 1px solid var(--cui-border-subtle);
	}

	.spec {
		display: grid;
		gap: 0.125rem;
		font-size: var(--cui-font-size-sm);
	}

	.style-name {
		font-weight: var(--cui-font-weight-semibold);
	}

	.numbers {
		font-variant-numeric: tabular-nums;
	}

	.specimen {
		max-width: 40rem;
	}

	.uppercase {
		text-transform: uppercase;
	}

	.tabular {
		font-variant-numeric: tabular-nums;
	}

	.weights {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
		gap: 1rem;
	}

	.weights li {
		display: grid;
		gap: 0.125rem;
		padding: 1rem;
		border: 1px solid var(--cui-border-subtle);
		border-radius: 0.5rem;
		font-size: var(--cui-font-size-sm);
	}

	.weight-sample {
		font-size: 3rem;
		line-height: 1.1;
	}

	.toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-medium);
		cursor: pointer;
	}

	.toggle input {
		width: 1.125rem;
		height: 1.125rem;
		accent-color: var(--cui-surface-inverse);
	}

	.compare {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: 1rem;
		font-size: 1rem;
	}

	.compare.beamer {
		font-size: 1.5rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 0.75em;
		padding: 1.5em;
		border: 1px solid var(--cui-border-subtle);
		border-radius: 0.5rem;
	}

	.family-name {
		font-size: var(--cui-font-size-sm);
		font-weight: var(--cui-font-weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.family-note {
		margin-top: -0.5em;
		margin-bottom: 0.5em;
		font-size: var(--cui-font-size-sm);
	}

	/* Heading and button sizes of the scale: H1 24px, H2 20px, H3 18px, buttons 16/14/12px. */
	.c-h1,
	.c-h2,
	.c-h3 {
		font-family: var(--family);
		font-weight: var(--cui-font-weight-semibold);
		line-height: var(--cui-font-line-height-tight);
	}

	.c-h1 {
		font-size: 1.5em;
	}

	.c-h2 {
		font-size: 1.25em;
	}

	.c-h3 {
		font-size: 1.125em;
	}

	.c-buttons {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5em;
	}

	.c-button {
		padding: 0.5em 1.25em;
		border-radius: 999px;
		background: var(--cui-surface-inverse);
		color: var(--cui-text-inverse);
		font-family: var(--family);
		font-weight: var(--cui-font-weight-semibold);
		line-height: 1.2;
		text-transform: uppercase;
	}

	.c-button-l {
		font-size: 1em;
	}

	.c-button-m {
		font-size: 0.875em;
	}

	.c-button-s {
		font-size: 0.75em;
	}

	.c-body {
		line-height: 1.5;
	}

	@media (max-width: 40rem) {
		.step {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}
	}
</style>
