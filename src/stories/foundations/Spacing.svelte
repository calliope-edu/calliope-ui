<script lang="ts">
	import { tokens } from '#lib/tokens/index.js';
	import FoundationPage from './FoundationPage.svelte';
	import { entries, toPx } from './token-values.js';

	const uses: Record<string, string> = {
		'0-5': 'Haarfeine Lücken, z. B. zwischen Icon und Badge',
		'1': 'Innerhalb kleiner Elemente',
		'2': 'Icon und Beschriftung, enge Listen',
		'3': 'Zwischen zusammengehörigen Feldern',
		'4': 'Innenabstand von Komponenten (Standard)',
		'6': 'Innenabstand von Dialogen',
		'8': 'Zwischen Abschnitten einer Seite',
		'16': 'Großzügige Abschnitte auf Einstiegsseiten'
	};

	const steps = entries('space-').sort((a, b) => toPx(a.value) - toPx(b.value));
	const padding = tokens['space-4'];
</script>

<FoundationPage title="Abstände">
	{#snippet lead()}
		Alle Abstände liegen auf einem 4-px-Raster. 2 px gibt es nur für haarfeine Lücken. Die Namen
		zählen in Vielfachen von 4 px: <code>--cui-space-4</code> ist 16 px.
	{/snippet}

	<section aria-labelledby="scale">
		<h2 id="scale">Skala</h2>
		<table class="steps">
			<thead>
				<tr>
					<th scope="col">Token</th>
					<th scope="col">Wert</th>
					<th scope="col"><span class="visually-hidden">Vorschau</span></th>
					<th scope="col">Typischer Einsatz</th>
				</tr>
			</thead>
			<tbody>
				{#each steps as step (step.key)}
					<tr>
						<td><code>--cui-{step.name}</code></td>
						<td class="numbers">{toPx(step.value)} px · {step.value}</td>
						<td><span class="bar" style:width="var(--cui-{step.name})"></span></td>
						<td>{uses[step.key] ?? ''}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<section aria-labelledby="example">
		<h2 id="example">Im Einsatz</h2>
		<p class="section-intro">
			Eine Karte mit dem Standard-Innenabstand {toPx(padding)} px (<code>--cui-space-4</code>). Der
			Abstand zwischen Titel und Text ist <code>--cui-space-2</code>, zwischen den Karten
			<code>--cui-space-4</code>.
		</p>
		<div class="cards">
			{#each ['Lauflicht', 'Wetterstation'] as title (title)}
				<div class="card">
					<p class="card-title">{title}</p>
					<p class="muted">Zuletzt geändert vor 5 Minuten</p>
				</div>
			{/each}
		</div>
	</section>
</FoundationPage>

<style>
	.steps {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--cui-font-size-sm);
	}

	th {
		padding: var(--cui-space-2) var(--cui-space-3);
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		font-weight: var(--cui-font-weight-semibold);
		text-align: left;
	}

	td {
		padding: var(--cui-space-2) var(--cui-space-3);
		border-bottom: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		vertical-align: middle;
	}

	.bar {
		display: block;
		min-width: 1px;
		height: var(--cui-space-4);
		background: var(--cui-brand-strong);
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cui-space-4);
	}

	.card {
		width: 16rem;
		padding: var(--cui-space-4);
		border: var(--cui-border-width-hairline) solid var(--cui-border-subtle);
		border-radius: var(--cui-radius-lg);
		background: var(--cui-surface-default);
		outline: 1px dashed var(--cui-brand-default);
		outline-offset: calc(-1 * var(--cui-space-4));
	}

	.card p {
		margin: 0;
	}

	.card .card-title {
		margin-bottom: var(--cui-space-2);
		font-family: var(--cui-typography-h3-font-family);
		font-size: var(--cui-typography-h3-font-size);
		font-weight: var(--cui-typography-h3-font-weight);
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
