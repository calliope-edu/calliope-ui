<script lang="ts">
	type TextStyle = {
		name: string;
		use: string;
		size: string;
		sizeLabel: string;
		weight: string;
		weightLabel: string;
		lineHeight: string;
		lineHeightLabel: string;
		sample: string;
	};

	// Scale taken over from Campus DESIGN.md.
	const scale: TextStyle[] = [
		{
			name: 'Display',
			use: 'Seitentitel auf Einstiegsseiten',
			size: 'display',
			sizeLabel: '2,5–3,8 rem',
			weight: 'extrabold',
			weightLabel: '800',
			lineHeight: 'tight',
			lineHeightLabel: '1,1',
			sample: 'Programmieren lernen'
		},
		{
			name: 'Headline',
			use: 'Abschnittsüberschrift',
			size: 'headline',
			sizeLabel: '1,5 rem',
			weight: 'semibold',
			weightLabel: '600',
			lineHeight: 'heading',
			lineHeightLabel: '1,25',
			sample: 'Meine Projekte'
		},
		{
			name: 'Title',
			use: 'Titel von Karten und Dialogen',
			size: 'title',
			sizeLabel: '1,25 rem',
			weight: 'semibold',
			weightLabel: '600',
			lineHeight: 'heading',
			lineHeightLabel: '1,25',
			sample: 'Lauflicht mit dem Calliope mini'
		},
		{
			name: 'Body',
			use: 'Fließtext',
			size: 'body',
			sizeLabel: '1 rem',
			weight: 'regular',
			weightLabel: '400',
			lineHeight: 'body',
			lineHeightLabel: '1,3',
			sample:
				'Verbinde den Calliope mini per USB oder Bluetooth und übertrage dein Programm mit einem Klick.'
		},
		{
			name: 'Label',
			use: 'Formularfelder, Tabellen, Metadaten',
			size: 'label',
			sizeLabel: '0,875 rem',
			weight: 'medium',
			weightLabel: '500',
			lineHeight: 'body',
			lineHeightLabel: '1,3',
			sample: 'Name des Projekts'
		},
		{
			name: 'Action',
			use: 'Beschriftung von Buttons',
			size: 'label',
			sizeLabel: '0,875 rem',
			weight: 'semibold',
			weightLabel: '600',
			lineHeight: 'body',
			lineHeightLabel: '1,3',
			sample: 'Auf den mini übertragen'
		},
		{
			name: 'Caption',
			use: 'Hinweise, Zeitstempel, Badges',
			size: 'caption',
			sizeLabel: '0,75 rem',
			weight: 'medium',
			weightLabel: '500',
			lineHeight: 'caption',
			lineHeightLabel: '1,33',
			sample: 'Zuletzt geändert vor 5 Minuten'
		}
	];

	const weights = [
		{ token: 'regular', label: 'Regular', value: '400' },
		{ token: 'medium', label: 'Medium', value: '500' },
		{ token: 'semibold', label: 'SemiBold', value: '600' },
		{ token: 'extrabold', label: 'ExtraBold', value: '800' }
	];

	const families = [
		{ id: 'base', name: 'Roboto', note: 'Heute in Campus und im Python-Editor.' },
		{
			id: 'condensed',
			name: 'Roboto Condensed',
			note: 'Aus dem Entwurf Calliope_UX_UI. Wäre eine zweite Webfont.'
		}
	];

	let beamer = $state(false);
</script>

<article class="page">
	<header class="intro">
		<p class="eyebrow">Foundations</p>
		<h1>Typografie</h1>
		<p class="lead">
			Roboto ist die Grundschrift. Die Skala stammt aus der Campus-<code>DESIGN.md</code> und steht
			als Tokens <code>--cui-font-*</code> und <code>--cui-line-height-*</code> bereit.
		</p>
	</header>

	<section aria-labelledby="scale">
		<h2 id="scale">Skala</h2>
		<ul class="scale">
			{#each scale as style (style.name)}
				<li class="step">
					<div class="spec">
						<p class="style-name">{style.name}</p>
						<p>{style.use}</p>
						<p class="numbers">
							{style.sizeLabel} · {style.weightLabel} · Zeilenhöhe {style.lineHeightLabel}
						</p>
						<code>--cui-font-size-{style.size}</code>
					</div>
					<p
						class="specimen"
						style:font-size="var(--cui-font-size-{style.size})"
						style:font-weight="var(--cui-font-weight-{style.weight})"
						style:line-height="var(--cui-line-height-{style.lineHeight})"
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
		<h2 id="condensed">Vergleich: Roboto Condensed</h2>
		<p class="section-intro">
			Der Entwurf setzt H1, H2 und die großen Buttons (Typ A) in Roboto Condensed SemiBold, in
			Großbuchstaben. Offen ist, ob sich das lohnt. Hier stehen beide Schriften nebeneinander. Die
			Beamer-Ansicht vergrößert alles auf das 1,5-Fache, um die Lesbarkeit aus der Ferne
			einzuschätzen.
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
						<span class="c-button c-button-l">Programmieren</span>
						<span class="c-button c-button-m">Übertragen</span>
						<span class="c-button c-button-s">Teilen</span>
					</div>
					<p class="c-body">
						H3 und Fließtext bleiben in beiden Varianten in Roboto, damit nur die Überschriften und
						Buttons wechseln.
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
		font-family: var(--cui-font-family-base);
		color: var(--cui-text-default);
	}

	p {
		margin: 0;
	}

	.eyebrow {
		font-size: var(--cui-font-size-label);
		font-weight: var(--cui-font-weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0.25rem 0 1rem;
		font-size: var(--cui-font-size-display);
		font-weight: var(--cui-font-weight-extrabold);
		line-height: var(--cui-line-height-tight);
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
		font-size: var(--cui-font-size-headline);
		font-weight: var(--cui-font-weight-semibold);
		line-height: var(--cui-line-height-heading);
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
		border-bottom: 1px solid var(--cui-border-default);
	}

	.spec {
		display: grid;
		gap: 0.125rem;
		font-size: var(--cui-font-size-label);
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

	.weights {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
		gap: 1rem;
	}

	.weights li {
		display: grid;
		gap: 0.125rem;
		padding: 1rem;
		border: 1px solid var(--cui-border-default);
		border-radius: 0.5rem;
		font-size: var(--cui-font-size-label);
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
		font-size: var(--cui-font-size-label);
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
		border: 1px solid var(--cui-border-default);
		border-radius: 0.5rem;
	}

	.family-name {
		font-size: var(--cui-font-size-label);
		font-weight: var(--cui-font-weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.family-note {
		margin-top: -0.5em;
		margin-bottom: 0.5em;
		font-size: var(--cui-font-size-label);
	}

	/* Heading and button sizes of the design draft: H1 26px, H2 20px, H3 18px, buttons 16/14/12px. */
	.c-h1,
	.c-h2 {
		font-family: var(--family);
		font-weight: var(--cui-font-weight-semibold);
		line-height: var(--cui-line-height-heading);
		text-transform: uppercase;
	}

	.c-h1 {
		font-size: 1.625em;
	}

	.c-h2 {
		font-size: 1.25em;
	}

	.c-h3 {
		font-size: 1.125em;
		font-weight: var(--cui-font-weight-semibold);
		line-height: var(--cui-line-height-heading);
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
