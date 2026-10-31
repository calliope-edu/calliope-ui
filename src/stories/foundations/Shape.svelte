<script lang="ts">
	import FoundationPage from './FoundationPage.svelte';
	import { entries } from './token-values.js';

	const radiusUse: Record<string, string> = {
		none: 'Kanten, die an andere Flächen stoßen',
		sm: 'Checkbox',
		md: 'Eingabefelder, Segmented Control, Badges und Tags',
		lg: 'Karten, Menüs, Popover, IoT-Widgets',
		xl: 'Große Panels',
		dialog: 'Dialoge',
		full: 'Buttons, Chips, Switches: alles, was man drücken kann'
	};

	const widthUse: Record<string, string> = {
		hairline: 'Trennlinien, Kartenrahmen, Eingabefelder',
		control: 'Checkbox, Radio, Rahmen des Switch',
		button: 'Outline-Button, in jeder Größe',
		accent: 'Aktive Navigation, Statusstreifen in Hinweisen',
		focus: 'Fokusring (plus 2 px Abstand)'
	};

	const radii = entries('radius-');
	const widths = entries('border-width-').filter((w) => !w.key.startsWith('button-scaled'));
	const sizes = [
		{ id: 's', label: 'Teilen' },
		{ id: 'm', label: 'Übertragen' },
		{ id: 'l', label: 'Programmieren' }
	];
</script>

<FoundationPage title="Formen und Rahmen">
	{#snippet lead()}
		Die Form sagt, was ein Element tut. <strong>Die Pille heißt „drück mich“:</strong> Buttons,
		Chips und Switches. <strong>Das abgerundete Rechteck heißt „lies mich“:</strong> Eingabefelder, Badges,
		Karten und Dialoge.
	{/snippet}

	<section aria-labelledby="pill">
		<h2 id="pill">Pille oder Rechteck</h2>
		<p class="section-intro">
			Ein Badge, das man nicht anklicken kann, ist nie eine Pille. So verwechselt niemand einen
			Status mit einem Button.
		</p>
		<div class="pill-demo">
			<figure>
				<span class="demo-pill">Übertragen</span>
				<figcaption>Button: <code>--cui-radius-full</code></figcaption>
			</figure>
			<figure>
				<span class="demo-badge">Verbunden</span>
				<figcaption>Badge: <code>--cui-radius-md</code></figcaption>
			</figure>
		</div>
	</section>

	<section aria-labelledby="radius">
		<h2 id="radius">Radien</h2>
		<ul class="radii">
			{#each radii as radius (radius.key)}
				<li>
					<span class="radius-sample" style:border-radius="var(--cui-{radius.name})"></span>
					<p class="label">{radius.key} <span class="numbers muted">{radius.value}</span></p>
					<code>--cui-{radius.name}</code>
					<p class="muted">{radiusUse[radius.key] ?? ''}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="widths">
		<h2 id="widths">Rahmenstärken</h2>
		<ul class="widths">
			{#each widths as width (width.key)}
				<li>
					<span class="line" style:height="var(--cui-{width.name})"></span>
					<p class="label">{width.key} <span class="numbers muted">{width.value}</span></p>
					<code>--cui-{width.name}</code>
					<p class="muted">{widthUse[width.key] ?? ''}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="outline">
		<h2 id="outline">Vergleich: Rahmen des Outline-Buttons <span class="comparison">D3</span></h2>
		<p class="section-intro">
			Entschieden sind 2 px in jeder Größe. Zum Vergleich darunter ein Rahmen, der mit dem Button
			wächst und sich an der Strichstärke der Beschriftung orientiert (1,5 / 2 / 2,5 px). Die
			Vergleichswerte liegen in <code>--cui-border-width-button-scaled-*</code>.
		</p>
		<div class="outline-compare">
			<div class="outline-row">
				<p class="label">2 px in jeder Größe (entschieden)</p>
				<div class="buttons">
					{#each sizes as size (size.id)}
						<span
							class="demo-outline size-{size.id}"
							style:border-width="var(--cui-border-width-button)">{size.label}</span
						>
					{/each}
				</div>
			</div>
			<div class="outline-row">
				<p class="label">Mit der Größe wachsend (Vergleich)</p>
				<div class="buttons">
					{#each sizes as size (size.id)}
						<span
							class="demo-outline size-{size.id}"
							style:border-width="var(--cui-border-width-button-scaled-{size.id})"
							>{size.label}</span
						>
					{/each}
				</div>
			</div>
		</div>
	</section>
</FoundationPage>

<style>
	.pill-demo {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cui-space-10);
	}

	figure {
		display: grid;
		justify-items: start;
		gap: var(--cui-space-2);
		margin: 0;
	}

	figcaption {
		font-size: var(--cui-font-size-sm);
	}

	.demo-pill {
		display: inline-flex;
		align-items: center;
		height: var(--cui-size-control-m);
		padding: 0 var(--cui-space-5);
		border-radius: var(--cui-radius-full);
		background: var(--cui-action-primary-bg);
		color: var(--cui-action-primary-fg);
		font-family: var(--cui-typography-action-font-family);
		font-size: var(--cui-typography-action-font-size);
		font-weight: var(--cui-typography-action-font-weight);
		letter-spacing: var(--cui-typography-action-letter-spacing);
		text-transform: uppercase;
	}

	.demo-badge {
		display: inline-flex;
		align-items: center;
		padding: var(--cui-space-1) var(--cui-space-2);
		border-radius: var(--cui-radius-md);
		background: var(--cui-status-success-fill);
		color: var(--cui-status-success-on);
		font-size: var(--cui-typography-label-font-size);
		font-weight: var(--cui-typography-label-font-weight);
	}

	.radii,
	.widths {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		gap: var(--cui-space-6) var(--cui-space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		align-content: start;
		gap: var(--cui-space-1);
		font-size: var(--cui-font-size-sm);
	}

	li p {
		margin: 0;
	}

	.label {
		font-weight: var(--cui-font-weight-semibold);
	}

	.radius-sample {
		display: block;
		width: 6rem;
		height: 4rem;
		margin-bottom: var(--cui-space-2);
		border: var(--cui-border-width-control) solid var(--cui-border-strong);
		background: var(--cui-surface-subtle);
	}

	.line {
		display: block;
		width: 6rem;
		margin: var(--cui-space-4) 0 var(--cui-space-3);
		background: var(--cui-text-default);
	}

	.outline-compare {
		display: grid;
		gap: var(--cui-space-6);
	}

	.outline-row .label {
		margin: 0 0 var(--cui-space-2);
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cui-space-3);
	}

	.demo-outline {
		display: inline-flex;
		align-items: center;
		border-style: solid;
		border-color: var(--cui-border-strong);
		border-radius: var(--cui-radius-full);
		color: var(--cui-text-default);
		font-family: var(--cui-typography-action-font-family);
		font-weight: var(--cui-typography-action-font-weight);
		letter-spacing: var(--cui-typography-action-letter-spacing);
		text-transform: uppercase;
	}

	.size-s {
		height: var(--cui-size-control-s);
		padding: 0 var(--cui-space-3);
		font-size: var(--cui-font-size-xs);
	}

	.size-m {
		height: var(--cui-size-control-m);
		padding: 0 var(--cui-space-4);
		font-size: var(--cui-font-size-sm);
	}

	.size-l {
		height: var(--cui-size-control-l);
		padding: 0 var(--cui-space-5);
		font-size: var(--cui-font-size-md);
	}
</style>
